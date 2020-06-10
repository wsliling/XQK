<template>
	<!-- 取消预订 -->
	<view>
		<view class="cancel" v-if="cancel == 0">
			<view class="policy">
				<view class="call">确认取消</view>
				<view class="stack">取消政策</view>
				<view class="limit">{{refundInfo.RefundNote}}</view>
			</view>
			<view class="cancelflex">
				<view class="">预订价格</view>
				<view class="cancelcolor">¥{{UnitPrice}}</view>
			</view>
			<view class="cancelflex">
				<view class="">已支付</view>
				<view class="cancelcolor">¥{{refundInfo.Total}}</view>
			</view>
			<view class="cancelflex">
				<view class="figure">您的退款总金额</view>
				<view class="figure">¥{{refundInfo.RefundAmout}}</view>
			</view>
			<view class="cancelflex" @click="showEdit = true">
				<view class="">取消原因</view>
				<view class="select">
					<view class="">{{ typeTxt }}</view>
					<image src="http://xqk.wtvxin.com/images/wxapp/icons/arrow.png" mode=""></image>
				</view>
			</view>
			<view class="effect">取消立即生效</view>
			<view class="reserve" @click="getCancelReservation()">取消预订</view>
		</view>
		
		<!-- 取消预订退款 -->
		<view class="refund" v-if="cancel == 1">
			<image src="http://xqk.wtvxin.com/images/wxapp/icons/cancel.png" mode=""></image>
			<view class="refund40">{{cancelInfo.msg}}</view>
			<view class="refund32">{{cancelInfo.RefundStr}}</view>
			<view class="refund32">{{cancelInfo.RefundNote}}</view>
			<view class="confirm" @click="cancellation(1)">确定</view>
		</view>
		<pickers v-if="showEdit" :arr="typelist" :show.sync="showEdit" @success="gettype"></pickers>
	</view>
	
</template>
<script>
	import { post, navigateBack,toast } from '@/utils'
	import pickers from '@/components/pickers';
	export default {
		data(){
			return{
				userId:'',
				token:'',
				cancel:0,  //
				typeTxt: '请选择',
				showEdit: false,
				typelist:[{code: 0, message: "请选择"}] ,//取消原因的数据
				OrderNumber:'', //订单号
				UnitPrice:'',   //一组产品的价格
				ActualPay:'',   //一组产品的实际支付
				cancelInfo:{
					RefundAmout: "0.10",
					RefundNote: "退款将在3-5个工作日内完成",
					RefundStr: "您将会收到￥0.10的退款。",
					msg: "预订已取消"
				},//取消成功
				refundInfo:{},//退款信息
			}
		},
		components: { pickers },
		onShow() {
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			this.getCancelReason()
		},
		onLoad(e) {
			this.OrderNumber = e.OrderNumber
			this.UnitPrice = e.UnitPrice
		},
		methods:{
			cancellation(e){
				this.cancel = e;
				navigateBack();
			},
			gettype(e) {
				console.log(e)
				// this.type = e.code;
				if(e.code*1){
					this.typeTxt = e.message;
				}
			},
			// 获取取消原因
			getCancelReason(){
				post('Order/CancelReason',{
				}).then(res=>{
					if(res.code === 0){
						this.typelist=[{code: 0, message: "请选择"}];
						this.typelist.push(...res.data);
					}
				})
				post('Order/RefundScreen',{OrderNo:this.OrderNumber}).then(res=>{
					this.refundInfo = res.data;
				})
			},
			// 订单取消预订
			getCancelReservation(){
				if(!this.typeTxt||this.typeTxt==='请选择'){
					toast('请选择取消原因');
				}
				post('Order/CancelReservation',{
					UserId: this.userId,
					Token: this.token,
					OrderNo: this.OrderNumber, // 订单号
					ReMarks: this.typeTxt, // 取消原因
				}).then(res=>{
					if(res.code === 0){
						this.cancelInfo = res.data;
						this.cancel = e;
					}
				})
			},
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
			padding-bottom: 30upx;
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
			padding: 30upx 0;
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
			padding: 30upx 0 200upx;
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
			margin: 59% 30upx 0;
			padding-top: 14upx;
		}
	}
</style>
