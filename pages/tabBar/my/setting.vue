<template>
	<!-- 设置 -->
	<view class="get_help">
		<view class="gethelp">
			<view class="gethelp-flex" @click="tolick('/pages/tabBar/my/account')">
				<view class="">账号管理</view>
				<image  src="../../../static/icons/arrow.png" mode=""></image>
			</view>
			<view class="gethelp-flex" @click="tolick('/pages/tabBar/my/termsservice?type=0')">
				<view class="">服务条款</view>
				<image  src="../../../static/icons/arrow.png" mode=""></image>
			</view>
			<view class="gethelp-flex" @click="tolick('/pages/tabBar/my/termsservice?type=1')">
				<view class="">营业执照</view>
				<image  src="../../../static/icons/arrow.png" mode=""></image>
			</view>
			<view class="gethelp-flex">
				<view class="">监督我们</view>
				<image  src="../../../static/icons/arrow.png" mode=""></image>
			</view>
		</view>
		<view class="settingfz">
			<view class="">星球客关注和保障每一位用户的权益。如您对我们的政策条款或服务存在疑虑，或不甚满意，请通过一下方式向我们举报或投诉。</view>
			<view class="settingfzs">电话：+86 400-288-1262</view>
			<view class="">邮箱：cnjdhusaf@jasf.com</view>
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
	.gethelp-flex:last-child{
		border-bottom: none;
		padding-bottom: 20upx;
	}
	image{
		width:12upx;
		height:20upx;
		margin-top: 12upx;
	}
	.settingfz{
		font-size:26upx;
		color:rgba(102,102,102,1);
		line-height:38upx;
		padding-bottom: 40upx;
	}
	.settingfzs{
		padding: 20upx 0;
	}

</style>
