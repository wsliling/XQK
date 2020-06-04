<template>
	<!-- 我也想要星球客 -->
	<div>
		<div>
			<view class="elect">详细描述</view>
			<view class="feed">
				<textarea
					maxlength="300"
					cols="30"
					placeholder-style="font-size:28upx;color:#CCCCCC"
					rows="10"
					class="fed_text"
					placeholder="请输入内容"
					v-model="Content"
				></textarea>
				<view class="counter">
					<text class="num">{{ inputTxtLength }}</text>/300
				</view>
				<!-- <div>上传凭证（不超过4张）</div> -->
				<div class="fed_pic flex flexWrap">
					<div class="picbox" v-for="(item, pindex) in PicList" :key="pindex">
						<img :src="item" class="pic_itim" @click="previewImage([item])" />
						<span class="close" @click="delImg(pindex)">×</span>
					</div>
					<div class="picbox " @click="upLoadImg" v-if="isUploadBtn"><img src="http://jd.wtvxin.com/images/images/icons/add2.png" alt="" class="pic_itim" /></div>
				</div>
			</view>
		</div>
		<div class="feedback">
			<view class="elect">请留下您的联系方式，我们会联系您</view>
			<div class="fed_title">
				<view style="width: 10%;">姓名</view>
				<input type="text" v-model="RealName" placeholder="请输入您的姓名" maxlength="8" style="text-align: right;" />
			</div>
			<div class="fed_title" @click="showEdit = true">
				<p>性别</p>
				<p>
					<span>{{ typeTxt }}</span>
					<icons type="success" size="26"></icons>
					<img src="http://xqk.wtvxin.com/images/wxapp/icons/arrow.png" alt="" />
				</p>
			</div>
			<div class="fed_title">
				<view style="width: 10%;">电话</view>
				<input type="text" v-model="Mobile" maxlength="13" placeholder="请输入您的电话号码" style="text-align: right;" />
			</div>
		</div>
		<div class="submit" @click="submit">提交</div>
		<pickers v-if="showEdit" :arr="typelist" :show.sync="showEdit" @success="gettype"></pickers>
	</div>
</template>

<script>
import { post, verifyPhone } from '@/utils';
import { pathToBase64, previewImage } from '@/utils/image-tools';
import pickers from '@/components/pickers';
export default {
	components: { pickers },
	data() {
		return {
			previewImage,
			showEdit: false,
			typelist: [{ code: 1, message: '男' }, { code: 2, message: '女' }],
			typeTxt: '请选择',
			Mobile: '',   //电话/联系方式
			RealName: '', //姓名/联系人
			Content: '',  //内容
			PicList: [],  //上图的图片
			maxPicLen: 4, //最多上传
			isUploadBtn: true, //显示上传图片按钮
			inputTxtLength: 0  //内容的字数
		};
	},
	watch: {
		Content(e) {
			this.inputTxtLength = e.length;
		}
	},
	methods: {
		gettype(e) {
			console.log(e);
			this.typeTxt = e.message;
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
		// 删除图片
		delImg(index) {
			this.PicList.splice(index, 1);
			this.isUploadBtn = true;
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
			if (this.RealName == '') {
				wx.showToast({
					title: '请输入您的姓名！',
					icon: 'none',
					duration: 2000
				});
				return false;
			}
			if (this.typeTxt == '请选择') {
				wx.showToast({
					title: '请选择性别！',
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
		//我也想要星球客
		FeedBack(base64Arr) {
			post('User/MemberFeedBack', {
				UserId: wx.getStorageSync('userId'),
				Token: wx.getStorageSync('token'),
				CateGory: 1, //1-我也想要星球客
				Content: this.Content, //内容
				PicList: base64Arr, //图片
				RealName: this.RealName, //姓名/联系人
				Gender: this.typeTxt, //性别
				Mobile: this.Mobile, //电话/联系方式
			}).then(res => {
				if (res.code == 0) {
					wx.showToast({
						title: '提交成功',
						icon: 'none'
					});
					setTimeout(() => {
						wx.navigateBack();
					}, 1500);
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
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
	input {
		margin-top: 5upx;
	}
	img {
		width: 11upx;
		height: 20upx;
		margin-top: -6upx;
		margin-left: 15upx;
	}
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
	.pic_itim {
		width: 200upx;
		height: 200upx;
		padding-left: 10upx;
	}
	.close {
		position: absolute;
		width: 32rpx;
		height: 32rpx;
		right: 0;
		top: -16rpx;
		color: #fff;
		background: #5cc69a;
		border-radius: 50%;
		text-align: center;
		line-height: 32rpx;
		font-size: 32rpx;
	}
}
.feed {
	background: #fff;
	padding: 0 30upx;
	padding-bottom: 40upx;
}
.submit {
	width: 90%;
	height: 88upx;
	background: rgba(92, 198, 154, 1);
	border-radius: 10upx;
	font-size: 32upx;
	color: rgba(255, 255, 255, 1);
	line-height: 88upx;
	text-align: center;
	margin: 94upx 35upx 0;
}
.counter {
	padding: 0 20upx;
	text-align: right;
	font-size: 24upx;
	color: #b2b2b2;
}
</style>
