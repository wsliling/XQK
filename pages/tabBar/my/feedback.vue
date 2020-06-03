<template>
	<!-- 意见反馈 -->
	<div>
		<div class="feedback">
			<view class="elect">选择类型</view>
			<div class="fed_title" @click="option(val.code,key)" v-if="options == key ? 'active' : 'fed_title'" v-for="(val,key) in backType" :key="key">
				<p>{{val.message}}</p>
				<img v-if="options == key" src="http://xqk.wtvxin.com/images/wxapp/icons/success.png" alt="" />
			</div>
		</div>
		<div class="">
			<view class="elect">详细描述</view>
			<view class="feed">
				<textarea name="" id="" cols="30" placeholder-style="font-size:28upx;color:#CCCCCC" rows="10" adjust-position="true" class="fed_text" placeholder="请输入内容" v-model="Content"></textarea>
				<!-- <div>上传凭证（不超过5张）</div> -->
				<div class="fed_pic flex flexWrap">
					<div class="picbox" v-for="(item, pindex) in PicList" :key="pindex">
						<img :src="item" class="pic_itim" @click="previewImage([item])"/>
						<span class="close" @click="delImg(pindex)">×</span>
					</div>
					<div class="picbox upBtnImg" @click="upLoadImg" v-if="isUploadBtn">
						<img src="http://jd.wtvxin.com/images/images/icons/add2.png" alt="" class="pic_itim" />
					</div>
				</div>
			</view>
		</div>
		<div class="submit" @click="submit">提交</div>
	</div>
</template>

<script>
import { post, get, navigateBack } from '@/utils';
import { pathToBase64, previewImage } from '@/utils/image-tools';
export default {
	data() {
		return {
			previewImage,
			backType: [],
			TypeStr: 0,
			Content: '',
			PicList: [],
			maxPicLen: 4, //最多上传
			isUploadBtn: true ,//显示上传图片按钮
			options:0
		};
	},
	onLoad() {
		this.PicList = [];
		this.Content = '';
		this.getBackType(); // 获取意见反馈类型
	},
	methods: {
		option(code,key){
			this.options = key
			this.TypeStr = code
		},
		// 获取意见反馈类型
		getBackType() {
			get('User/FeedBackType').then(res => {
				if (res.code === 0) {
					this.backType = res.data;
				}
			});
		},
		//提交意见反馈
		FeedBack(base64Arr) {
			post('User/MemberFeedBack',{
				UserId: wx.getStorageSync('userId'),
				Token: wx.getStorageSync('token'),
				CateGory: 0,           //0-意见反馈
				TypeStr: this.TypeStr, //所属类型名称
				Content: this.Content, //内容
				PicList: base64Arr,    //图片
			}).then( res =>{
				if (res.code == 0) {
					wx.showToast({
						title: '提交成功',
						icon: 'none',
					});
					setTimeout(() => {
						wx.navigateBack();
					}, 1500);
				}
			})
		},
		// 验证
		verify() {
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
			return true;
		},
		// 提交
		async submit() {
			if (this.verify()) {
				let base64Arr = [];
				if (this.PicList.length > 0) {
					base64Arr = await this.base64Img(this.PicList);
				}
				this.FeedBack(JSON.stringify(base64Arr));
			}
		},
		// 删除照片
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
		//上传图片
		upLoadImg() {
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
		width: 24upx;
		height: 20upx;
		margin-top: 14upx;
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
		width: 150upx;
		height: 150upx;
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
	margin: 80upx 35upx 0;
}
</style>
