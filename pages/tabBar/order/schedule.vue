<template>
	<!-- 退款进度 -->
	<view class="schedule">
		<!-- <view class="refund">您的退款¥288.00已于2020-05-20 11:40处理完成，款项将退返到您的原支付方式 (微信)到账时长预计为0-5天</view> -->
		<view class="refund">{{data.RefundNote}}</view>
		<view class="rate">退款进度：{{data.RefundState}}</view>
		<view class="wechat">
			<view class="price">
				<view class="">微信</view>
				<view class="">¥{{data.RefundAmout}}</view>
			</view>
			<view class="">{{data.RefundData}}</view>
			<view class="">交易号：</view>
			<view class="">{{data.TransactionNo}}</view>
		</view>
		<view class="figure">
			<view class="">退款金额 (CNY)</view>
			<view class="">¥{{data.RefundAmout}}</view>
		</view>
		<view class="received">
			<view class="">仍未收到退款？</view>
			<view class="service" @click="tolick('/pages/tabBar/my/kefu')">联系客服</view>
		</view>
	</view>
</template>

<script>
	import { post,navigate } from '@/utils';
	export default{
		data(){
			return{
				userId: '',
				token: '',
				orderNo:'',
				data:{},
			}
		},
		onLoad(option){
			this.orderNo = option.orderNo;
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			this.getData();
		},
		methods:{
			getData(){
				post('Order/RefundInfo',{
					UserId: this.userId,
					Token: this.token,
					OrderNo:this.orderNo
				}).then(res=>{
					this.data =res.data;
				})
			},
			tolick(url){
				uni.navigateTo({
					url:url
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.schedule{
		background: #fff;
		height: 100vh;
		padding: 0 35upx;
		.refund{
			padding: 90upx 0 60upx;
			font-size:32upx;
			color:rgba(51,51,51,1);
			line-height:68upx;
		}
		.rate{
			font-size:32upx;
			font-weight:bold;
			padding: 30upx 0;
			border-top: 1upx solid #ECECEC;
			border-bottom: 1upx solid #ECECEC;
		}
		.wechat{
			font-size: 26upx;
			color: #666666;
			padding: 40upx 0;
			border-bottom: 1upx solid #ECECEC;
			.price{
				display: flex;
				justify-content: space-between;
				font-size:32upx;
				color: #333333;
			}
		}
		.figure{
			padding: 40upx 0 39%;
			display: flex;
			justify-content: space-between;
			font-size:32upx;
			font-weight:bold;
		}
		.received{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.service{
				width:200upx;
				height:80upx;
				background:rgba(92,198,154,1);
				border-radius:8upx 10upx 10upx 10upx;
				color: #fff;
				text-align: center;
				padding-top: 16upx;
			}
		}
	}
</style>
