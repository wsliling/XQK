<template>
	<!-- 发布 -->
	<div>
		<view class="feed">
			<view class="feed-name">添加标题</view>
			<textarea
				name=""
				id=""
				cols="30"
				placeholder-style="font-size:28upx;color:#CCCCCC"
				rows="10"
				adjust-position="true"
				class="fed_text"
				placeholder="分享你的故事和体验~"
				v-model="Content"
			></textarea>
			<view class="uploadimg">上传图片/视频</view>
			<div class="flex">
				<div class="picbox" v-for="(item, pindex) in PicList" :key="pindex">
					<img :src="item" class="pic_itim" />
					<span class="close" @click="delImg(pindex)">×</span>
				</div>
				<div class="picbox " @click="upLoadImg" v-if="isUploadBtn"><img src="http://jd.wtvxin.com/images/images/icons/add2.png" alt="" class="pic_itim" /></div>
			</div>
		</view>

		<div class="feedback">
			<view class="site" @click="tolick('/pages/tabBar/list/location')">
				<view>所在位置</view>
				<view class="place">
					<view class="">展滔科技大厦</view>
					<img src="/static/icons/arrow.png" alt="" />
				</view>
			</view>
			<view class="myrelease">
				<view class="relevancy">
					<view>关联星球客 (1/5)</view>
					<view class="addition" @click="tolick('/pages/tabBar/list/relevance')">添加</view>
				</view>
				<view class="collect-box">
					<view class="collect-left"><image src="/static/of/p1.jpg" mode=""></image></view>
					<view class="collect-right">
						<view class="name">广州.从化温泉明月山溪</view>
						<view class="point">
							<view class="pointkey">骑行</view>
							<view class="pointkey">游乐</view>
							<view class="pointkey">艺术</view>
						</view>
						<view class="font">
							<view class="num">￥288</view>
							<view class="iconfont icon-collect"></view>
							<view class="fz12">
								4.8
								<span>(20)</span>
							</view>
						</view>
					</view>
				</view>
			</view>
		</div>
		<div class="submit" @click="submit">发布</div>
		<pickers v-if="showEdit" :arr="typelist" :show.sync="showEdit" @success="gettype"></pickers>
	</div>
</template>

<script>
// import { post, get, verifyPhone } from '@/utils';
// import { pathToBase64 } from '@/utils/image-tools';
import pickers from '@/components/pickers';
export default {
	// components: { pickers },
	data() {
		return {
			showEdit: false,
			typelist: [],
			type: '',
			typeTxt: '请选择',
			Mobile: '',
			Name: '',
			Content: '',
			PicList: [],
			maxPicLen: 5, //最多上传
			isUploadBtn: true //显示上传图片按钮
		};
	},
	onLoad() {
		this.PicList = [];
		this.Name = '';
		this.Mobile = '';
		this.Content = '';
		this.typeTxt = '请选择';
		this.getTypelist();
	},
	methods: {
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
		//提交意见反馈
		async FeedBack(base64Arr) {
			const res = await post(
				'User/MemberFeedBack',
				{
					UserId: wx.getStorageSync('userId'),
					Token: wx.getStorageSync('token'),
					Type: this.type,
					Content: this.Content,
					PicList: base64Arr,
					Mobile: this.Mobile,
					Name: this.Name
				},
				this.getData
			);
			console.log('3333333');
			if (res.code == 0) {
				wx.showToast({
					title: '提交成功'
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
			if (this.typeTxt == '请选择') {
				wx.showToast({
					title: '请选择问题类型！',
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			if (this.Content == '') {
				wx.showToast({
					title: '请输入建议内容！',
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
			if (this.Name == '') {
				wx.showToast({
					title: '请输入您的姓名！',
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			if (this.Mobile == '') {
				wx.showToast({
					title: '请输入联系方式！',
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			if (!verifyPhone(this.Mobile)) {
				return;
			}

			return true;
		},
		async submit() {
			if (this.verify()) {
				let base64Arr = [];
				if (this.PicList.length > 0) {
					base64Arr = await this.base64Img(this.PicList);
				}
				this.FeedBack(JSON.stringify(base64Arr));
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
		}
	}
};
</script>

<style scoped lang="scss">
// 添加标题和图片的样式
.feed {
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
	}
	.uploadimg {
		font-size: 28upx;
		color: #333333;
	}
	.flex {
		display: flex;
		.picbox {
			width: 25%;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			margin-top: 20rpx;
			position: relative;
			.pic_itim {
				width: 160upx;
				height: 160upx;
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
				padding-top: 12upx;
				.num {
					font-size: 24upx;
					color: rgba(255, 51, 51, 1);
					line-height: 40upx;
				}
				.iconfont {
					color: $primary;
					margin: 0 6upx 0 40upx;
					line-height: 1.2;
				}
				.fz12 {
					span {
						font-size: 22upx;
						color: rgba(153, 153, 153, 1);
						padding-left: 6upx;
					}
				}
			}
		}
	}
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
