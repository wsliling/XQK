<template>
	<!-- 账号管理 -->
	<view class="account">
		<view class="management">
			<view class="accountflex" @click="tolick('/pages/tabBar/my/emailsignature?type=0'+ '&Avatar=' + myInfo.Avatar)">
				<view class="portrait">头像</view>
				<view class="accounthead">
					<image :src="myInfo.Avatar || 'http://xqk.wtvxin.com/images/wxapp/default.png'" mode="aspectFill"></image>
				</view>
			</view>
			<view class="accountflex" @click="tolick('/pages/tabBar/my/emailsignature?type=1'+ '&NickName=' + myInfo.NickName)">
				<view class="">昵称</view>
				<view class="account28">{{myInfo.NickName}}</view>
			</view>
			<view class="accountflex">
				<view class="">手机号</view>
				<view class="account28">{{myInfo.Mobile}}</view>
			</view>
			<view class="accountflex" @click="tolick('/pages/tabBar/my/emailsignature?type=2'+ '&Email=' + myInfo.Email)">
				<view class="">邮箱</view>
				<view class="account28" v-if="myInfo.Email">{{myInfo.Email}}</view>
				<view class="account28" v-else>请绑定</view>
			</view>
			<view class="accountflex" @click="tolick('/pages/tabBar/my/emailsignature?type=3' + '&Introduction=' + myInfo.Introduction)">
				<view class="">个性签名</view>
				<view class="accountimg">
					<view class="account28"v-if="myInfo.Introduction">{{myInfo.Introduction}}</view>
					<view class="account28" v-else>无</view>
					<image src="http://xqk.wtvxin.com/images/wxapp/icons/arrow.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- <view class="save">保存</view> -->
	</view>
</template>

<script>
	import { post } from '@/utils'
	export default {
		data() {
			return {
				UserId:'',
				Token:'',
				myInfo:{}
			}
		},
		onShow() {
			this.UserId = uni.getStorageSync('userId');
			this.Token = uni.getStorageSync('token');
			this.getMemInfo()
		},
		methods: {
			tolick(url){
				uni.navigateTo({
					url:url
				})
			},
			// 个人基本信息
			getMemInfo(){
				post('User/GetMemInfo', {
					UserId:this.UserId,
					Token:this.Token,
				}).then( res=>{
					if(res.code === 0){
						this.myInfo = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.account{
		margin-top: 30upx;
		.management{
			background: #fff;
			padding: 0 30upx;
			.accountflex{
				display: flex;
				justify-content: space-between;
				padding: 30upx 0;
				border-bottom: 1upx solid #ECECEC;
				.portrait{
					padding-top: 20upx;
				}
				.accounthead{
					image{
						width:80upx;
						height:80upx;
						border-radius:50%;
					}
				}
				.account28{
					color:rgba(153,153,153,1);
				}
				.accountimg{
					display: flex;
					justify-content: flex-end;
					image{
						width:11upx;
						height:20upx;
						margin: 18upx 0 0 15upx;
					}
				}
				&:last-child{
					border-bottom:none;
				}
			}
		}
		.save{
			width:90%;
			height:98upx;
			background:rgba(92,198,154,1);
			border-radius:10upx;
			font-size:32upx;
			color: #fff;
			line-height: 98upx;
			text-align: center;
			position: fixed;
			bottom: 80rpx;
			left: 30rpx;
		}
	}
</style>
