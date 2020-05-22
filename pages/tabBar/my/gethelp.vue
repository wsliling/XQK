<template>
	<!-- 获取帮助 -->
	<view class="get_help">
		<view class="gethelp">
			<view class="gethelp-flex" @click="tolick('/pages/tabBar/my/bookinghelp')">
				<view class="">取消预订</view>
				<image  src="../../../static/icons/arrow.png" mode=""></image>
			</view>
			<view class="gethelp-flex" @click="tolick('/pages/tabBar/my/bookinghelp')">
				<view class="">预订帮助</view>
				<image  src="../../../static/icons/arrow.png" mode=""></image>
			</view>
			<view class="gethelp-flex" @click="tolick('/pages/tabBar/my/bookinghelp')">
				<view class="">您的账号</view>
				<image  src="../../../static/icons/arrow.png" mode=""></image>
			</view>
			<view class="gethelp-flex" @click="tolick('/pages/tabBar/my/bookinghelp')">
				<view class="">订单支付</view>
				<image  src="../../../static/icons/arrow.png" mode=""></image>
			</view>
			<view class="gethelp-flex" @click="tolick('/pages/tabBar/my/bookinghelp')">
				<view class="">预定类型</view>
				<image  src="../../../static/icons/arrow.png" mode=""></image>
			</view>
			<view class="gethelp-flex" @click="tolick('/pages/tabBar/my/bookinghelp')">
				<view class="">预定与入住</view>
				<image  src="../../../static/icons/arrow.png" mode=""></image>
			</view>
			<view class="gethelp-flex" @click="tolick('/pages/tabBar/my/bookinghelp')">
				<view class="">账号与评价</view>
				<image  src="../../../static/icons/arrow.png" mode=""></image>
			</view>
		</view>
		<view class="gh_flex">
			<view class="help">仍然需要帮助?</view>
			<view class="service">联系客服</view>
		</view>
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

<style scoped>
	.get_help{
		background: #fff;
		height: 100vh;
		padding: 0 30upx;
		color:rgba(51,51,51,1);
	}
	.gethelp{
		margin-top: 20upx;
	}
	.gethelp-flex{
		background: #fff;
		padding: 40upx 0;
		border-bottom: 1upx solid #ECECEC;
		display: flex;
		justify-content: space-between;
	}
	image{
		width:12upx;
		height:20upx;
		margin-top: 12upx;
	}
	.gh_flex{
		background: #fff;
		position: fixed;
		bottom: 20upx;
		display: flex;
		justify-content: space-between;
		text-align: center;
	}
	.help{
		margin-top: 12upx;
		float: left;
	}
	.service{
		width:200upx;
		height:80upx;
		background:rgba(92,198,154,1);
		border-radius:10upx;
		font-size:28upx;
		color:rgba(255,255,255,1);
		line-height: 80upx;
	}
</style>
