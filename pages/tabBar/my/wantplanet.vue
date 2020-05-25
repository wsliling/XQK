<template>
	<!-- 我也想要星球客 -->
	<div>
		<div class="">
			<view class="elect">详细描述</view>
			<view class="feed">
				<textarea name="" id="" cols="30" placeholder-style="font-size:28upx;color:#CCCCCC" rows="10" adjust-position="true" class="fed_text" placeholder="请输入内容" v-model="Content"></textarea>
				<!-- <div>上传凭证（不超过5张）</div> -->
				<div class="">
					<div class="picbox" v-for="(item, pindex) in PicList" :key="pindex">
						<img :src="item" class="pic_itim" />
						<span class="close" @click="delImg(pindex)">×</span>
					</div>
					<div class="picbox " @click="upLoadImg" v-if="isUploadBtn"><img src="http://jd.wtvxin.com/images/images/icons/add2.png" alt="" class="pic_itim" /></div>
				</div>
			</view>
		</div>
		<div class="feedback">
			<view class="elect">请留下您的联系方式，我们会联系您</view>
			<div class="fed_title active">
				<view class="" style="width: 10%;">姓名</view>
				<input type="text" value="" placeholder="请输入您的姓名" placeholder-style="font-size:28upx;display: flex;justify-content: flex-end;"style="width: 87%;"/>
				
			</div>
			<div class="fed_title" @click="showEdit = true">
				<p>性名</p>
				<p class="">
					<span>{{ typeTxt }}</span>
					<icons type="success"size="26"></icons>
					<img src="../../../static/icons/arrow.png" alt="" />
				</p>
				
			</div>
			<div class="fed_title">
				<view class="" style="width: 10%;">电话</view>
				<input type="text" value="" placeholder="请输入您的电话号码" placeholder-style="font-size:28upx;display: flex;justify-content: flex-end;"style="width: 87%;"/>
			</div>
		</div>
		<div class="submit" @click="submit">提交</div>
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
.feedback {
}
.elect {
	width: 100%;
	height: 80upx;
	font-size: 28upx;
	color: rgba(153, 153, 153, 1);
	line-height: 80upx;
	padding: 0 30upx;
}
.fed_title {
	background: #fff;
	padding-bottom: 30rpx;
	border-bottom: 1rpx solid #f5f5f5;
	font-size: 28upx;
	color: rgba(51, 51, 51, 1);
	display: flex;
	justify-content: space-between;
	padding: 30upx;
	img {
		width:11upx;
		height:20upx;
		margin-top: 14upx;
		margin-left: 10upx;
	}
}
.active{
	color: #5CC69A;
}
.fed_text {
	padding-top: 30rpx;
	height: 200rpx;
	width: 100%;
}
.picbox {
	width: 25%;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	margin-top: 20rpx;
	position: relative;
	.pic_itim{
		width:200upx;
		height:200upx;
		padding-left: 10upx;
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
.feed{
	background: #fff;
	padding: 0 30upx;
	padding-bottom: 40upx;
}
.submit{
	width:90%;
	height:88upx;
	background:rgba(92,198,154,1);
	border-radius:10upx;
	font-size:32upx;
	color:rgba(255,255,255,1);
	line-height:88upx;
	text-align:center;
	margin: 180upx 35upx 0;
}
</style>
