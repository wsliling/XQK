<template>
	<!-- 发布 -->
	<div>
		<view class="feed">
			<!-- <view class="feed-name">添加标题</view> -->
			<input maxlength="35" type="text" v-model="title" placeholder="添加标题（1-34）" placeholder-style="font-size: 28upx;color: rgba(187, 188, 191, 1);"/>
			<!-- <textarea
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
			></textarea> -->
			<view class="container">
				<!-- 富文本输入按钮 -->
				<view class="btnBox" v-show="isEdit">
					<scroll-view :scroll-x="true" class="srcoll">
						<view class="toolbar" @click.stop="format" :style="'bottom: ' + (isIOS ? keyboardHeight : 0) + 'px'">
							<i class="iconfont icon-charutupian" @click.stop="insertImage"></i>
							<i :class="'iconfont icon-format-header-3 ' + (formats.header === 3 ? 'ql-active' : '')" data-name="header"
							:data-value="3"></i>
							<!-- 加粗 -->
							<i :class="'iconfont icon-zitijiacu ' + (formats.bold ? 'ql-active' : '')" data-name="bold"></i>
							<!-- 下划线 -->
							<i :class="'iconfont icon-zitixiahuaxian ' + (formats.underline ? 'ql-active' : '')" data-name="underline"></i>
							<!-- 对齐方式 -->
							<i :class="'iconfont icon-zuoduiqi ' + (formats.align === 'left' ? 'ql-active' : '')" data-name="align" data-value="left"></i>
							<i :class="'iconfont icon-juzhongduiqi ' + (formats.align === 'center' ? 'ql-active' : '')" data-name="align"
							data-value="center"></i>
							<i :class="'iconfont icon-youduiqi ' + (formats.align === 'right' ? 'ql-active' : '')" data-name="align" data-value="right"></i>
							<i :class="'iconfont icon-youxupailie ' + (formats.list === 'ordered' ? 'ql-active' : '')" data-name="list"
							data-value="ordered"></i>
							<i :class="'iconfont icon-wuxupailie ' + (formats.list === 'bullet' ? 'ql-active' : '')" data-name="list" data-value="bullet"></i>
							<!-- 分割线 -->
							<i class="iconfont icon-fengexian" @tap="insertDivider"></i>
							<i class="iconfont icon-shanchu" @tap="clear"></i>
							<i class="iconfont icon-baocun" @tap="store" id="1"></i>
						</view>
					</scroll-view> 
					<div class="right flex-center">
						<!-- 撤销or前进 -->
						<i class="iconfont icon-undo" @tap="undo"></i>
						<i class="iconfont icon-redo" @tap="redo"></i>
					</div>
				</view>
				<editor id="editor" show-img-size :read-only="isEdit" show-img-resize show-img-toolbar class="ql-container"
				:placeholder="placeholder" @statuschange="onStatusChange" @ready="onEditorReady">
				</editor>
			</view>
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
			
			<view class="site" @click="showTopic">
				<view>关联话题</view>
				<view class="place">
					<!-- <view class="">展滔科技大厦</view> -->
					<view class="">
						{{ tab.Name||'请选择' }}
					</view>
					<!-- <input type="text" :placeholder="place" /> -->
					<img src="http://xqk.wtvxin.com/images/wxapp/icons/arrow.png" alt="" />
				</view>
			</view>
			<uni-popup ref="topic" type="bottom">
				<view class="topicBox">
					<!-- <view class="btn-box flex-center-between">
						<view class="close">取消</view>
						<view class="confirm">确定</view>
					</view> -->
					<view class="content flex-center">
						<p v-for="(item,index) in tabList" :key="index"
							:class="{'active':tab.Name==item.Name}" @click="setTab(item)"
							>{{item.Name}}</p>
					</view>
					<view class="max-btn" @click="$refs.topic.close()">确定</view>
				</view>
			</uni-popup>
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
import { host,post, get, verifyPhone,navigate,debounce, } from '@/utils';
import { pathToBase64 } from '@/utils/image-tools';
import { getCityCode } from '@/utils/location';
import pickers from '@/components/pickers';
import {startLevel} from '@/components/starLevel';
import {relatedProduct} from '@/components/relatedProduct';

let timer;
let that;
export default {
	components: { pickers,startLevel,relatedProduct },
	data() {
		return {
			navigate,
			showEdit: false,
			type: '',
			PicList: [],
			maxPicLen: 9, //最多上传
			isUploadBtn: true, //显示上传图片按钮
			// 分割线
			userId:'',
			token:'',
			title: '',
			Content: '',
			place:'不显示位置',
			placeCode:'',//选择的定位城市代码
			goodList:[],
			isSubmit: false, // 是否已经发布

			// 富文本变量
			isEdit: false,
			fontColor: '#000',
			formats: {},
			readOnly: false,
			placeholder: '分享你的故事和体验',
			editorHeight: 300,
			keyboardHeight: 0,
			isIOS: false,
			editorCtx:null,
			
			// tab
			tabList:[],
			tab:{},
		};
	},
	onShow() {
		this.place = this.$store.state.place;
		this.placeCode = this.$store.state.placeCity;
		// 转城市码
		// const placeCity = this.$store.state.placeCity;
		// if(placeCity){
		// 	getCityCode(placeCity).then(res=>{
		// 		this.placeCode = res.data.Code;
		// 	})
		// }
		this.getUserInfo()
		this.getGoodsList()
		this.getTab();
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
		that = this;
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
		async FeedBack(base64Arr,content) {
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
					ContentDetails: content,
					PicList: base64Arr,
					Location: place,
					ProIdArr: this.ProIdArr,
					AreaSite:this.placeCode,
					ClassId:this.tab.Id
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
			}else {
				this.isSubmit = false
			}
		},
		
		verify() {
			if (!this.title.trim()) {
				wx.showToast({
					title: '请输入标题！',
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			if (this.title.trim().length>34) {
				wx.showToast({
					title: '标题不能大于34位！',
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
		async submit() {
			if (!this.verify()) return;
			// if (!this.verify() || this.isSubmit) return;
			// 获取富文本内容
			this.editorCtx.getContents({
				success: async function(res) {
					let content = res.html;
					console.log(content,'拿到的富文本内容')
					if (!content||content=='<p wx:nodeid="42"><br wx:nodeid="43"></p>') {
						wx.showToast({
							title: '请输入发布内容！',
							icon: 'none',
							duration: 2000
						});
						return false;
					}
					let imgArr=[];
					content = content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match,capture,index) {
						let id = `#&${index}&#`
						imgArr.push({url:capture,id});
						return match.replace(/src=['"]([^'"]+)/g,`src="${id}`)
					});
					let pathToBase64PromiseAll = [];//用于Promise.all的，图片转base64数组
					let uploadImgs = [];//用于Promise.all的，上传图片到后台数组
					imgArr.map(item=>{
						pathToBase64PromiseAll.push(pathToBase64(item.url))
					})
					// 图片转base64
					const base64Arr = await Promise.all(pathToBase64PromiseAll)
					base64Arr.map(base64ArrItem=>{
						uploadImgs.push(
							post('System/UploadBase64',{
								UserId:that.userId,
								Token:that.token,
								SignKey: 'img',
								Base64String:base64ArrItem
							})
						)
						
					})
					// 图片上传
					const upImgRes = await Promise.all(uploadImgs);
					upImgRes.map((upImgResItem,upImgResIndex)=>{
						imgArr[upImgResIndex].url = upImgResItem.data;
					})
					imgArr.map(imgArrItem=>{
						content = content.replace(imgArrItem.id,imgArrItem.url)
					})
					console.log(content,'富文本上传图片全部成功了')
					that.submitData(content);
				}
			});
		},
		// 上传数据
		async submitData(content){
			if (this.PicList.length > 0) {
				let base64Arr = [];
				this.PicList.map(item=>{
					base64Arr.push(pathToBase64(item))
				})
				const imgArr = await Promise.all(base64Arr)
				// 发布防抖
				this.isSubmit = true;
				let upImgArr = [];
				imgArr.map(item=>{
					upImgArr.push({
						PicUrl:item
					})
				})
				console.log('发布的轮播图',upImgArr)
				this.FeedBack(JSON.stringify(upImgArr),content)
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
		// 富文本
		readOnlyChange() {
				this.readOnly = !this.readOnly
		},
		onEditorReady() {
			uni.createSelectorQuery().select('#editor').context(function(res) {
				that.editorCtx = res.context;
			}).exec();
		},
		undo() {
			this.editorCtx.undo();
		},

		redo() {
			this.editorCtx.redo();
		},

		blur() {
			this.editorCtx.blur();
		},

		format(e) {
			// this.hideKey();
			let {
				name,
				value
			} = e.target.dataset;
			if (!name) return; // console.log('format', name, value)
			this.editorCtx.format(name, value);
		},

		onStatusChange(e) {
			this.formats = e.detail;
		},

		insertDivider() {
			this.editorCtx.insertDivider({
				success: function() {
					console.log('insert divider success');
				}
			});
		},

		store(e) {
			console.log(this.editorCtx,'editorCtx')
			this.editorCtx.getContents({
				success: function(res) {
					console.log('保存内容:', res.html)
				}
			});
		},

		clear() {
			const _this = this;
			uni.showModal({
				title:'输入内容将被全部清除',
				confirmColor:'#5cc69a',
				success(res){
					if(res.confirm){
						_this.editorCtx.clear();
					}
				}
			})
		},

		removeFormat() {
			this.editorCtx.removeFormat();
		},

		insertDate() {
			const date = new Date();
			const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
			this.editorCtx.insertText({
				text: formatDate
			});
		},

		insertImage() {
			// const that = this;
			uni.chooseImage({
				count: 1,
				success: function(res) {
					that.editorCtx.insertImage({
						src: res.tempFilePaths[0],
						data: {
							id: 'abcd',
							role: 'god'
						},
						width: '100%',
						success: function() {
							console.log('insert image success');
						}
					});
				}
			});
		},
		// 富文本end
		// 获取标签
		getTab(){
			post('Find/FindClassList').then(res=>{
				this.tabList = res.data;
			})
		},
		setTab(item){
			this.tab = item;
			this.$refs.topic.close();
		},
		//显示标签选择
		showTopic(){
			this.$refs.topic.open();
		}
	}
};
</script>

<style scoped lang="scss">
	@import url("./release/iconfont.css");
	@import "./release/editor.scss";
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
.topicBox{
	background:#fff;
	border-radius:10upx 10upx 0 0;
	width:100%;
	padding:20upx;
	.btn-box{
		line-height:3;
		view{
			padding:0 10upx;
		}
		.close{
			color:#999;
		}
		.confirm{
			color:$primary;
		}
	}
	.content{
		flex-flow:row wrap;
		padding:40upx 0 20upx;
		p{
			margin:0 20upx 20upx;
			padding:0 20upx;
			line-height:2.5;
			background:#f2f2f2;
			color:#666;
			border-radius:8upx;
			&.active{
				background:$primary;
				color:#fff;
			}
		}
	}
	.max-btn{
		width:100%;
		background:$primary;
		color:#fff;
		line-height:80upx;
		text-align:center;
		border-radius:8upx;
	}
}
</style>
