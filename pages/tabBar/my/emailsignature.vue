<template>
	<!-- 账号管理 -> (头像) (昵称) (邮箱) (个性签名) -->
	<view class="emailsignature">
		<view class="email" v-if="emails == 0">
			<view class="avatar" @click.stop="upLoadImg()">
				<image :src="Avatar||'http://xqk.wtvxin.com/images/wxapp/default.png'"></image>
				<view class="">可更换头像哦~~</view>
			</view>
			<view class="confirm" @click="submit()">确定</view>
		</view>
		
		<view class="email" v-if="emails == 1">
			<view class="emails">
				<view class="">昵称：</view>
				<input type="text" value="" v-model="NickName" maxlength="16" placeholder="请输入" />
			</view>
			<view class="character">限1-16个字符</view>
			<view class="confirm" @click="getEditUserNick()">确定</view>
		</view>
		
		<view class="email" v-if="emails == 2">
			<view class="emails">
				<view class="">邮箱：</view>
				<input type="text" value="" v-model="Email" maxlength="16" placeholder="请输入" />
			</view>
			<view class="character">限1-16个字符</view>
			<view class="confirm" @click="getEditUserEmail()">确定</view>
		</view>
		
		<view class="ignature" v-if="emails == 3">
			<textarea v-model="Introduction" placeholder="请输入你的个性签名" maxlength="30" placeholder-style="color:#CCCCCC;font-size:28upx;"/>
			<view class="ignatures">{{ inputTxtLength }}/30</view>
			<view class="confirm" @click="getEditUserIntroduction()">确定</view>
		</view>
	</view>
</template>

<script>
import { post, navigateBack } from '@/utils'
import { pathToBase64 } from '@/utils/image-tools';
export default {
	data() {
		return {
			emails: 0 ,//0头像  1昵称  2邮箱 3个性签名
			UserId:'',
			Token:'',
			Avatar:'',     //头像
			NickName:'',   //昵称
			Email:'',      //邮箱
			Introduction:'', //个性签名
			inputTxtLength: 0, //当前输入字数
		};
	},
	onLoad(e) {
		this.Avatar = e.Avatar
		this.NickName = e.NickName
		this.Email = e.Email
		this.Introduction = e.Introduction
		this.emails = e.type
		if(e.type == 0){
			uni.setNavigationBarTitle({
			    title: '编辑个人信息'
			});
		}
		if(e.type == 1){
			uni.setNavigationBarTitle({
			    title: '编辑用户昵称'
			});
		}
		if(e.type == 3){
			uni.setNavigationBarTitle({
			    title: '编辑个性签名'
			});
		}
	},
	onShow() {
		this.UserId = uni.getStorageSync('userId');
		this.Token = uni.getStorageSync('token');
	},
	watch: {
		Introduction(e) {
			if(e){
				this.inputTxtLength = e.length;
			}
		}
	},
	methods: {
		// 上传头像
		upLoadImg() {
			let _this = this;
			wx.chooseImage({
				//进入这里面的时候this发生了改变
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
					// tempFilePath可以作为img标签的src属性显示图片
					_this.Avatar = res.tempFilePaths;
				}
			});
		},
		// 提交
		async submit() {
			let base64 = '';
			if(base64 === ''){
				uni.showToast({
					title: "你暂未更换头像!!!",
					icon: 'none',
					duration:1500,
				});
			}else{
				for (let i = 0; i < this.Avatar.length; i += 1) {
					const res = await pathToBase64(this.Avatar[i]);
					base64 = res
				}
				this.getUploadPhoto(JSON.stringify(base64));
			}
			
		},
		// 修改会员头像
		getUploadPhoto(base64){
			post('User/UploadPhoto',{
				UserId:this.UserId,
				Token:this.Token,
				Avatar:base64,
			}).then( res=>{
				if(res.code === 0){
					uni.showToast({
						title: res.msg,
						icon: 'none',
					});
					setTimeout(()=>{
						navigateBack();
					},500)
				}
			})
		},
		// 修改会员昵称
		getEditUserNick(){
			post('User/EditUserNick',{
				UserId:this.UserId,
				Token:this.Token,
				UserNick:this.NickName,
			}).then( res=>{
				if(res.code === 0){
					uni.showToast({
						title: res.msg,
						icon: 'none',
					});
					setTimeout(()=>{
						navigateBack();
					},500)
				}
			})
		},
		// 修改会员邮箱
		getEditUserEmail(){
			var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (this.Email == '') {
				uni.showToast({
					title: '请输入邮箱！',
					icon: 'none',
					duration: 1500
				});
				return false;
			} else if (!myreg.test(this.Email)) {
				uni.showToast({
					title: '请输入正确的邮箱！',
					icon: 'none',
					duration: 1500
				});
				return false;
			}
			post('User/EditUserEmail', {
				UserId:this.UserId,
				Token:this.Token,
				Email:this.Email,
			}).then( res=>{
				if(res.code === 0){
					uni.showToast({
						title: res.msg,
						icon: 'none',
					});
					setTimeout(() => {
						navigateBack();
					}, 500);
				}
			})
		},
		// 修改会员个性签名
		getEditUserIntroduction(){
			if(this.Introduction === ''){
				uni.showToast({
					title: "请输入个性签名！",
					icon: 'none',
					duration: 1500
				});
				return false;
			}
			post('User/EditUserIntroduction', {
				UserId:this.UserId,
				Token:this.Token,
				Introduction:this.Introduction,
			}).then( res=>{
				if(res.code === 0){
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 1500
					});
					setTimeout(() => {
						navigateBack();
					}, 500);
				}
			})
		},
	}
};
</script>

<style scoped lang="scss">
.emailsignature {
	margin-top: 30upx;
	.email{
		.avatar{
			padding-top: 200upx;
			text-align: center;
			color: #5CC69A;
			image{
				width: 128upx;
				height: 128upx;
				border-radius: 50%;
				margin: 0 auto;
				margin-bottom: 40upx;
			}
		}
		.emails {
			display: flex;
			background: #fff;
			padding: 30upx;
			input{
				font-size:28upx;
				padding-left: 30upx;
				margin-top: 8upx;
			}
		}
		.character{
			font-size: 24upx;
			color:rgba(153,153,153,1);
			padding: 20upx 30upx 0;
		}
	}
	.ignature{
		background: #fff;
		padding:30upx;
		.ignatures{
			font-size:24upx;
			color: #666666;
			display: flex;
			justify-content: flex-end;
		}
	}
	.confirm{
		width:90%;
		height:98upx;
		background:rgba(92,198,154,1);
		border-radius:10upx;
		font-size:32upx;
		color:#fff;
		line-height: 98upx;
		text-align: center;
		position: fixed;
		bottom: 80rpx;
		left: 30rpx;
	}
	
}
</style>
