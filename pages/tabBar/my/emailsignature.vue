<template>
	<!-- 账号管理 -> (邮箱) (个性签名) -->
	<view class="emailsignature">
		<view class="email" v-if="emails == 0">
			<view class="emails">
				<view class="">邮箱：</view>
				<input type="text" value="" v-model="Email" maxlength="16" placeholder="请输入" />
			</view>
			<view class="character">限1-16个字符</view>
			<view class="confirm" @click="getEditUserEmail()">确定</view>
		</view>
		
		<view class="ignature" v-if="emails == 1">
			<textarea v-model="Introduction" placeholder="请输入你的个性签名" maxlength="30" placeholder-style="color:#CCCCCC;font-size:28upx;"/>
			<view class="ignatures">{{ inputTxtLength }}/30</view>
			<view class="confirm" @click="getEditUserIntroduction()">确定</view>
		</view>
	</view>
</template>

<script>
	import { post, navigateBack } from '@/utils'
export default {
	data() {
		return {
			emails: 0 ,//0 邮箱  1 个性签名
			UserId:'',
			Token:'',
			Email:'',
			Introduction:'',
			inputTxtLength: 0, //当前输入字数
		};
	},
	onLoad(e) {
		this.emails = e.type
		this.Email = e.Email
		this.Introduction = e.Introduction
		if(e.type == 1){
			uni.setNavigationBarTitle({
			    title: '个性签名'
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
		tolick(url) {
			uni.navigateTo({
				url: url
			});
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
