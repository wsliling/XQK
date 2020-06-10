<template>
	<!-- 发布 -->
	<div>
		<view class="feed">
			<!-- <view class="feed-name">添加标题</view> -->
			<input maxlength="35" type="text" v-model="title" placeholder="添加标题" placeholder-style="font-size: 28upx;color: rgba(187, 188, 191, 1);"/>
			<textarea
				name=""
				id=""
				cols="30"
				placeholder-style="font-size:28upx;color:#CCCCCC;line-height: 37upx;"
				rows="100"
				maxlength= 3000
				adjust-position="true"
				class="fed_text"
				placeholder="分享你的故事和体验~"
				v-model="Content"
				style="line-height: 1.3;"
			></textarea>
			<view class="uploadimg">上传图片({{ PicList.length }}/{{maxPicLen}})</view>
			<div class="flex">
				<div class="picbox" v-for="(item, pindex) in PicList" :key="pindex">
					<!-- <img :src="item" class="pic_itim" /> -->
					<image :src="item" mode="aspectFill" class="pic_itim"></image>
					<span class="close" @click="delImg(pindex)">×</span>
				</div>
				<div class="picbox " @click="upLoadImg" v-if="isUploadBtn">
					<image src="http://jd.wtvxin.com/images/images/icons/add2.png" mode="aspectFill" class="pic_itim"></image>
					<!-- <img src="http://jd.wtvxin.com/images/images/icons/add2.png" alt="" class="pic_itim" /> -->
				</div>
			</div>
		</view>

		<div class="feedback">
			<view class="site" @click="tolick('/pages/starLangSon/location')">
				<view>所在位置</view>
				<view class="place">
					<!-- <view class="">展滔科技大厦</view> -->
					<view class="">
						{{ place }}
					</view>
					<!-- <input type="text" :placeholder="place" /> -->
					<img src="http://xqk.wtvxin.com/images/wxapp/icons/arrow.png" alt="" />
				</view>
			</view>
			<view class="myrelease">
				<view class="relevancy">
					<view>关联星球客 ({{ goodList.length }}/5)</view>
					<view class="addition" @click="tolick('/pages/starLangSon/relevance')">添加</view>
				</view>
				<related-product @del='del' :isAdd='false' :goodList='goodList'></related-product>
			</view>
			<view class="bottomBox">
				
			</view>
		</div>
		<div class="submit" @click="submit">发布</div>
		<pickers v-if="showEdit" :arr="typelist" :show.sync="showEdit" @success="gettype"></pickers>
	</div>
</template>

<script>
import { post, get, verifyPhone,navigate,debounce } from '@/utils';
import { pathToBase64 } from '@/utils/image-tools';
import pickers from '@/components/pickers';
import {startLevel} from '@/components/starLevel';
import {relatedProduct} from '@/components/relatedProduct';

let timer;
export default {
	components: { pickers,startLevel,relatedProduct },
	data() {
		return {
			navigate,
			showEdit: false,
			type: '',
			PicList: [],
			maxPicLen: 10, //最多上传
			isUploadBtn: true, //显示上传图片按钮
			// 分割线
			userId:'',
			token:'',
			title: '',
			Content: '',
			place:'不显示位置',
			goodList:[]
		};
	},
	onShow() {
		this.place = this.$store.state.place
		this.getUserInfo()
		this.getGoodsList()
		// console.log('我是发布页onshow的idarr：',this.$store.state.ProIdArr)
		
	},
	onLoad() {
		this.PicList = [];
		// this.Name = '';
		// this.Mobile = '';
		// this.Content = '';
		// this.typeTxt = '请选择';
		// this.getTypelist();
		// 分割线
		this.title = ''
		this.Content = ''
		this.place = '不显示位置'
		this.goodList = []
	},
	computed:{
		// toNum (str) {
		// 	return (str)=>{
		// 		// console.log('评分：',Math.round(str),'str')
		// 		return Math.round(str);
		// 	}
		// 	// Math.round(str)
		// },
		// 分数
		CommentScore (score) {
			return (score)=> {
				if(!score)return;
				if (score.length > 1) {
					return score
				}
				return score + ".0"
			}
		},
	},
	methods: {
		// 获取用户id以及token
		getUserInfo () {
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
		},
		gettype(e) {
			this.type = e.code;
			this.typeTxt = e.message;
		},
		getTypelist() {
			get('User/FeedBackType').then(res => {
				if (res.code === 0) {
					this.typelist = res.data;
				}
			});
		},
		tolick(url){
			uni.navigateTo({
				url:url
			})
		},
		del(id) {
			let tempArr = this.$store.state.ProIdArr
			for(let i =0; i < this.goodList.length;i++) {
				// console.log('id对比=============-',this.goodList[i],this.goodList[i].Id,id,this.$store.state.ProIdArr)
				if(this.goodList[i].Id === id) {
					// console.log('老铁对比--',this.goodList[i].id,id)
					this.goodList.splice(i,1)
					for(let j =0; j < tempArr.length;j++) {
						if(tempArr[j] === id) {
							// 删除成功之后，需要清除掉vuex关联产品id组
							tempArr.splice(j,1)
						}
					}
					
				}
			}
			this.$store.commit('update',{"ProIdArr": tempArr})
			// console.log('我删除了之后的数组：',this.$store.state.ProIdArr)
		},
		//提交意见反馈
		// 星语发布/提交发布
		async FeedBack(base64Arr) {
			let place = ''
			if(this.place === '不显示位置') {
				place = ''
			}else {
				place = this.place
			}
			// console.log(base64Arr)
			const res = await post(
				'Find/UserPublishFind',
				{
					UserId: this.userId,
					Token: this.token,
					Title: this.title,
					ContentDetails: this.Content,
					PicList: base64Arr,
					Location: place,
					ProIdArr: this.ProIdArr
				},
				// this.getData
			);
			// console.log('3333333');
			if (res.code == 0) {
				// 发布成功之后，需要清除掉vuex关联产品id组
				this.$store.commit('update',{"ProIdArr": []})
				wx.showToast({
					title: '发布成功'
				});
				setTimeout(() => {
					// wx.switchTab({
					//   url:"/pages/my/main"
					// });
					wx.navigateBack();
				}, 1500);
			}
		},
		
		verify() {
			if (this.title.trim().length === 0) {
				wx.showToast({
					title: '请输入标题！',
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			if (this.Content.trim().length === 0) {
				wx.showToast({
					title: '请输入发布内容！',
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			if (this.PicList.length == 0) {
				wx.showToast({
					title: '请上传至少一张图片！',
					icon: 'none',
					duration: 2000
				});
				return false;
			}

			return true;
		},
		// debounce(cb,wait =1000,res) {
		//     // 发送网络请求，就会发送很多次
		//     // 清除之前定时器
		// 	console.log('进来了',res,this,this.base64Img)
		//     return ()=>{
		//       clearTimeout(timer)
		//       timer = setTimeout(() => {
		// 		  console.log('我发不了啦啦啦啦啦啦啦',this.base64Img)
		//         return cb(this.base64Img)
		//       }, wait);
		//     }
		// 	console.log('出去了')
		//   },
		async submit() {
			if (this.verify()) {
				let base64Arr = [];
				if (this.PicList.length > 0) {
					base64Arr = await this.base64Img(this.PicList);
				}
				// console.log('点了发布')
				// 发布防抖
				clearTimeout(timer)
				timer = setTimeout(() => {
					// console.log('发布了')
				  return this.FeedBack(JSON.stringify(base64Arr))
				}, 1000)
				// debounce(this.FeedBack,1000,JSON.stringify(base64Arr))
				// console.log('我出来了') 
				// this.FeedBack(JSON.stringify(base64Arr));
				// this.debounce(this.FeedBack(JSON.stringify(base64Arr)))
				// this.debounce(this.FeedBack,1000,JSON.stringify(this.base64Img))
			}
		},
		upLoadImg() {
			//上传图片
			let _this = this;
			let num = _this.maxPicLen - _this.PicList.length;
			if (num > 0) {
				wx.chooseImage({
					//进入这里面的时候this发生了改变
					count: num,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// tempFilePath可以作为img标签的src属性显示图片
						_this.PicList = _this.PicList.concat(res.tempFilePaths);
						if (_this.PicList.length >= _this.maxPicLen) {
							_this.isUploadBtn = false;
						}
					}
				});
			} else {
				_this.isUploadBtn = false;
			}
		},
		delImg(index) {
			this.PicList.splice(index, 1);
			this.isUploadBtn = true;
		},
		async base64Img(arr) {
			let base64Arr = [];
			for (let i = 0; i < arr.length; i += 1) {
				const res = await pathToBase64(arr[i]);
				base64Arr.push({
					PicUrl: res
				});
			}
			return base64Arr;
		},
		// 获取预订产品列表
		async getGoodsList() {
			let temp = this.$store.state.ProIdArr
			// 获取vuex的产品idArr
			// console.log('获取vuex的产品idArr:', this.ProIdArr)
			this.ProIdArr = temp.join(',')
			if(!this.ProIdArr) {
				return false
			}
			this.getUserInfo()
			// console.log('vuex---',this.$store.state)
			// console.log('id',this.userId)
			// console.log('Token',this.token)
			
			let res = await post(
			'Goods/GoodsList_yd',
			{
				UserId:this.userId,
				Token:this.token,
				ProIdArr: this.ProIdArr
			})
			// console.log('获取预定产品列表：', res)
			// 处理字符串标签为数组,处理星星个数
			for(let i =0; i < res.data.length;i++){
				let tempArr = res.data[i].ServiceKeys.split(",")
				res.data[i].ServiceKeys = tempArr
				// console.log('处理产品列表：', res.data[i].ServiceKeys)
				// 不用处理分数
				// res.data[i].CommentScore = this.toNum(res.data[i].CommentScore)
			}
			this.goodList = res.data
		},
	}
};
</script>

<style scoped lang="scss">
// 添加标题和图片的样式
.feed {
	input{
		// background:#f5f5f5;
		border-radius:7upx;
		// line-height:60upx;
		height:80upx;
		// width:550upx;
		// border:1upx solid #e8e8e8;
		// padding:0 15upx;
		border-bottom: 1upx solid #ececec;
		&.placeholderStyle {
			line-height: 1.3;
		    font-size: 28upx;
			color: rgba(187, 188, 191, 1);
		}
	}
	background: #fff;
	padding: 0 30upx;
	padding-bottom: 40upx;
	.feed-name {
		font-size: 28upx;
		color: rgba(187, 188, 191, 1);
		padding: 30upx 0 10upx 0;
		border-bottom: 1upx solid #ececec;
	}
	.fed_text {
		padding-top: 15rpx;
		height: 200rpx;
		width: 100%;
		overflow: hidden;
	}
	.uploadimg {
		font-size: 28upx;
		color: #333333;
	}
	.flex {
		display: flex;
		flex-flow: row wrap;
		.picbox {
			flex: 0 0 auto;
			width: 25%;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			margin-top: 20rpx;
			position: relative;
			.pic_itim {
				width: 160upx;
				height: 160upx;
				border-radius: 7upx;
			}
			.close {
				position: absolute;
				width: 32rpx;
				height: 32rpx;
				right: 0;
				top: -16rpx;
				color: #fff;
				background: #b2b2b2;
				border-radius: 50%;
				text-align: center;
				line-height: 32rpx;
				font-size: 32rpx;
			}
		}
	}
}
// 所在位置样式
.site {
	margin: 20upx 0;
	display: flex;
	justify-content: space-between;
	background: #fff;
	height: 80upx;
	line-height: 80upx;
	padding: 0 30upx;
	.place {
		display: flex;
		color: rgba(153, 153, 153, 1);
		img {
			width: 14upx;
			height: 26upx;
			margin: 30upx 0 0 15upx;
		}
	}
}
// 关联系星球客样式
.myrelease {
	background: #fff;
	margin-bottom: 120upx;
	.relevancy {
		display: flex;
		justify-content: space-between;
		text-align: center;
		padding: 20upx 30upx;
		border-bottom: 1upx solid #ECECEC;
		.addition {
			width: 88upx;
			height: 44upx;
			border: 1upx solid rgba(92, 198, 154, 1);
			border-radius: 22upx;
			font-size: 24upx;
			color: rgba(92, 198, 154, 1);
		}
	}
	.collect-box {
		display: flex;
		padding: 30upx 30upx 30upx;
		.item__hd {
			margin-top: 40upx;
		}
		.collect-left {
			width: 200upx;
			height: 150upx;
			border-radius: 8upx;
			padding-right: 20upx;
			image {
				width: 100%;
				height: 100%;
				margin: 0 auto;
				border-radius: 10upx;
			}
		}
		.collect-right {
			color: #333333;
			flex: 1;
			.name {
				font-size: 28upx;
			}
			.point {
				display: flex;
				.pointkey {
					height: 46upx;
					background: rgba(92, 198, 154, 0.08);
					border-radius: 4upx;
					font-size: 22upx;
					color: #5cc69a;
					padding: 0 10upx;
					line-height: 46upx;
					margin-right: 15upx;
				}
			}
			.font {
				display: flex;
				justify-content: space-between;
				padding-top: 12upx;
				margin-right: 30upx;
				.del {
					image {
						width: 32upx;
						height: 32upx;
					}
				}
				.num {
					font-size: 24upx;
					color: rgba(255, 51, 51, 1);
					line-height: 40upx;
				}
				.iconfont {
					color: $primary;
					line-height: 1.2;
					display: flex;
				}
				.fz12 {
					margin-top: 8upx;
					padding-left: 6upx;
					span {
						font-size: 22upx;
						color: rgba(153, 153, 153, 1);
						padding-left: 6upx;
						
					}
				}
				.add{
					width:88upx;
					height:44upx;
					border:1upx solid rgba(255,51,51,1);
					border-radius:22upx;
					font-size:24upx;
					font-family:PingFang;
					font-weight:500;
					color:rgba(255,51,51,1);
					line-height:44upx;
					text-align: center;
				}
				// display: flex;
				// justify-content: space-between;
				// padding-top: 12upx;
				// .star {
				// 	margin: 0 0 0 30upx;
				// }
				// .delBox {}
				// .num {
				// 	font-size: 24upx;
				// 	color: rgba(255, 51, 51, 1);
				// 	line-height: 40upx;
				// }
				// .iconfont {
				// 	color: $primary;
				// 	margin: 0 6upx 0 40upx;
				// 	line-height: 1.2;
				// }
				// .fz12 {
				// 	span {
				// 		font-size: 22upx;
				// 		color: rgba(153, 153, 153, 1);
				// 		padding-left: 6upx;
				// 	}
				// }
			}
		}
	}
}

.bottomBox {
	height: 120upx;
}

.submit {
	width: 100%;
	height: 88upx;
	background: rgba(92, 198, 154, 1);
	font-size: 32upx;
	color: rgba(255, 255, 255, 1);
	line-height: 88upx;
	text-align: center;
	position: fixed;
	bottom: 0;
	z-index: 1;
}
</style>
