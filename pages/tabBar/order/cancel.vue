<template>
	<!-- 取消预订 -->
	<view>
		<view class="cancel" v-if="cancel == 0">
			<view class="policy">
				<view class="call">确认取消</view>
				<view class="stack">取消政策</view>
				<view class="limit">5月26日下午5点前可免费取消</view>
			</view>
			<view class="cancelflex">
				<view class="">预订价格</view>
				<view class="cancelcolor">¥288.00</view>
			</view>
			<view class="cancelflex">
				<view class="">已支付</view>
				<view class="cancelcolor">¥288.00</view>
			</view>
			<view class="cancelflex">
				<view class="figure">您的退款总金额</view>
				<view class="figure">¥288.00</view>
			</view>
			<view class="cancelflex">
				<view class="">取消原因</view>
				<view class="select">
					<view class="">请选择</view>
					<image src="../../../static/icons/arrow.png" mode=""></image>
				</view>
			</view>
			<view class="effect">取消立即生效</view>
			<view class="reserve" @click="cancellation(1)">取消预订</view>
		</view>
		<view class="refund" v-if="cancel == 1">
			<image src="../../../static/icons/cancel.png" mode=""></image>
			<view class="refund40">预订已取消</view>
			<view class="refund32">您将会收到¥288.00的退款。</view>
			<view class="refund32">退款将在3-5个工作日内完成</view>
			<view class="confirm" @click="cancellation(1)">确定</view>
		</view>
	</view>
	
</template>
<script>
	export default {
		data(){
			return{
				cancel:0,  //
			}
		},
		methods:{
			cancellation(e){
				this.cancel = e
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cancel{
		padding: 60upx 30upx;
		background: #fff;
		height: 100vh;
		.policy{
			border-bottom: 1upx solid #ECECEC;
			padding-bottom: 40upx;
			.call{
				font-size:40upx;
				font-weight:bold;
				padding-bottom: 20upx;
			}
			.stack{
				font-size:32upx;
			}
			.limit{
				font-size:28upx;
			}
			
		}
		.cancelflex{
			display: flex;
			justify-content: space-between;
			font-size:32upx;
			border-bottom: 1upx solid #ECECEC;
			padding: 40upx 0;
			.cancelcolor{
				color: #808080;
			}
			.figure{
				font-size:36upx;
				font-weight:bold;
			}
			.select{
				display: flex;
				justify-content: flex-end;
				image{
					width: 14upx;
					height: 24upx;
					margin: 9px 0 0 9px;
				}
			}
		}
		.effect{
			padding: 40upx 0 160upx;
			font-size:32upx;
		}
		.reserve{
			height:88upx;
			background:rgba(92,198,154,1);
			border-radius:8upx;
			font-size:32upx;
			color:rgba(255,255,255,1);
			line-height: 88upx;
			text-align: center;
		}
	}
	.refund{
		background: #fff;
		height: 100vh;
		text-align: center;
		padding-top: 158upx;
		image{
			width:144upx;
			height:144upx;
		}
		.refund40{
			font-size:40upx;
			font-weight:bold;
			padding: 50upx 0;
		}
		.refund32{
			font-size:32upx;
			line-height:68upx;
		}
		.confirm{
			height:88upx;
			background:rgba(92,198,154,1);
			border-radius:8upx;
			padding: 0 30upx;
			font-size:32upx;
			color: #fff;
			text-align: center;
			margin: 67% 30upx 0;
			padding-top: 14upx;
		}
	}
</style>
