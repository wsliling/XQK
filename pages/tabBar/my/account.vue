<template>
	<!-- 账号管理 -->
	<view class="account">
		<view class="management">
			<view class="accountflex">
				<view class="portrait">头像</view>
				<view class="accounthead">
					<image src="../../../static/default.png" mode=""></image>
				</view>
			</view>
			<view class="accountflex">
				<view class="">昵称</view>
				<view class="account28">心善若水</view>
			</view>
			<view class="accountflex">
				<view class="">手机号</view>
				<view class="account28">18228668698</view>
			</view>
			<view class="accountflex" @click="tolick('/pages/tabBar/my/emailsignature?type=0')">
				<view class="">邮箱</view>
				<view class="account28">请绑定</view>
			</view>
			<view class="accountflex" @click="tolick('/pages/tabBar/my/emailsignature?type=1')">
				<view class="">个性签名</view>
				<view class="accountimg">
					<view class="account28">书山有路勤为径，学海无涯苦作舟</view>
					<image src="../../../static/icons/arrow.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="save">保存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			tolick(url){
				uni.navigateTo({
					url:url
				})
			},
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
