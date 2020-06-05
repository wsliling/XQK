<template>
	<!-- 订单详情 -->
	<view class="orderdetails">
		<view class="order">
			<view class="details">{{orderList.StatusName}}</view>
			<!-- <view class="">已确认</view> -->
			<!-- <view class="">待评价</view> -->
			<!-- <view class="">已完成</view> -->
			<!-- <view class="">已取消</view> -->
			<!-- <view class="">已失效</view> -->
			<view class="detailsbox">
				<view class="myrelease">
					<view class="collect-box" 
					v-for="(val,key) in orderList.OrderDetails" :key="key"
					@click="navigate('product/detail/detail',{Id : val.ProductId})">
						<view class="collect-left"><image :src="val.PicNo" mode=""></image></view>
						<view class="collect-right">
							<view class="collect-flex">
								<view class="name">{{val.ProductName}}</view>
								<view class="num">￥{{val.UnitPrice}}</view>
							</view>
							<view class="point" >
								<view class="pointkey" v-for="(item,index) in ServiceKeys" :key="index">{{item}}</view>
							</view>
							<view class="font">
								<view class="iconfont icon-collect"></view>
								<view class="fz12">{{val.CommentScore}}<span>({{val.CommentNum}})</span>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="check">
				<view class="checkbottom">
					<view class="">入住时间</view>
					<view class="">{{orderList.MakeStartTime}}</view>
				</view>
				<view class="checkbottom">
					<view class="">入住人</view>
					<view class="">{{orderList.ContactName}}</view>
				</view>
				<view class="checkbottom">
					<view class="">联系方式</view>
					<view class="">{{orderList.Tel}}</view>
				</view>
			</view>
		</view>
		<view class="place">
			<view class="placename">订单信息</view>
			<view class="placeflex">
				<view class="">订单编号</view>
				<view class="">{{orderList.OrderNumber}}</view>
			</view>
			<view class="placeflex">
				<view class="">下单时间</view>
				<view class="">{{orderList.OrderTime}}</view>
			</view>
		</view>
		<view class="place mb60">
			<view class="placeflex">
				<view class="">总金额：</view>
				<view class="">¥{{orderList.TotalAmount}}</view>
			</view>
			<view class="placeflex" v-if="false">
				<view class="">清洁费：</view>
				<view class="">¥0.00</view>
			</view>
			<view class="placeflex" v-if="false">
				<view class="">服务费：</view>
				<view class="">¥0.00</view>
			</view>
			<view class="placeflex">
				<view class="">优惠券：</view>
				<view class="">-¥{{orderList.YhPrice}}</view>
			</view>
			<view class="placeflex red">
				<view class="">实付金额：</view>
				<view class="">¥{{orderList.Total}}</view>
			</view>
		</view>
		<!-- IsRefund,//按钮退款-取消预订 1-显示
			IsComment,//按钮评价 1-显示
			Ispay, //按钮付款 1-显示
			IsApplyInvoice,//按钮开票 1-显示
			IsDel,//删除订单 1-显示
			IsCancel,//取消订单 1-显示  -->
		<view class="bottom" v-if="orderList.IsRefund||orderList.IsCancel||orderList.IsDel||orderList.RefundId||orderList.Ispay||orderList.IsComment">
			<view class="bottomfff" v-if="orderList.IsRefund" @click="goUrl(orderList.Total)">取消预订</view>
			<view class="bottomfff" v-if="orderList.IsCancel" @click="chooseOrders(1)">取消订单</view>
			<view class="bottomfff" v-if="orderList.IsDel" @click="chooseOrders(2)">删除订单</view>
			<view class="bottomfff" v-if="orderList.RefundId" @click="navigate('tabBar/order/schedule',{orderNo:orderList.OrderNumber})">退款进度</view>
			<view class="bottomblue" v-if="orderList.Ispay" @click="ConfirmWeiXinSmallPay()">立即支付</view>
			<view class="bottomblue" v-if="orderList.IsComment" @click.stop="goUrl()">去评价</view>
			<!-- <view class="bottomfff" v-if="orderList. ===1">查看退款进度</view> -->
			<!-- <view class="bottomblue" v-if="orderList. ===1">重新预订</view> -->
		</view>
	</view>
</template>

<script>
	import { post, navigateBack,navigate } from '@/utils'
	export default {
		data(){
			return{
				navigate,
				userId:'',
				token:'',
				OrderNumber:'',
				orderList: {},
				UnitPrice:'',
				ActualPay:'',
				ServiceKeys:[],
			}
		},
		onLoad(e) {
			this.OrderNumber = e.OrderNumber
		},
		onShow() {
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			this.getOrderDetails()
		},
		methods:{
			goUrl(Total) {
				if(Total){
					uni.navigateTo({
						url: '/pages/tabBar/order/cancel?OrderNumber='+ this.OrderNumber + '&UnitPrice=' + this.UnitPrice + '&ActualPay=' + this.ActualPay + '&Total=' + Total
					});
				}else{
					uni.navigateTo({
						url: '/pages/tabBar/order/comment',
					});
				}
			},
			// 订单详情
			getOrderDetails(){
				post('Order/OrderDetails_yd',{
					UserId: this.userId,
					Token: this.token,
					OrderNo: this.OrderNumber,
				}).then( res => {
					if(res.code === 0){
						this.orderList = res.data
						res.data.OrderDetails.forEach( val =>{
							this.UnitPrice = val.UnitPrice
							this.ActualPay= val.ActualPay
							this.ServiceKeys = val.ServiceKeys.split(",")
							console.log(this.ServiceKeys,'this.ServiceKeys')
						})
					}
				})
			},
			// //确认取消
			chooseOrders(type) {
				let _this = this;
				if (type == 1) {
					var content = '您确定要取消此订单吗？';
					var url = 'Order/CancelOrders';
				} else if (type == 2) {
					var content = '您确定要删除此订单吗？';
					var url = 'Order/DeleteOrders';
				}
				uni.showModal({
					title: content,
					cancelText: '取消',
					// content: content,
					cancelColor: '#999',
					confirmColor: '#5cc69a',
					success(res) {
						if (res.confirm) {
							post(url, {
								UserId: uni.getStorageSync('userId'),
								Token: uni.getStorageSync('token'),
								OrderNo: _this.OrderNumber
							}).then(res => {
								uni.showToast({
									title: res.msg,
									icon: 'none',
								});
								navigateBack()
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//微信支付需参数
			ConfirmWeiXinSmallPay(){
				post('Order/WechatPay',{
					OrderNo:this.OrderNumber,
					UserId: this.userId,
					Token: this.token,
					WxCode:uni.getStorageSync("wxCode"),
					WxOpenid:uni.getStorageSync("openId"),
					paytype:4
				}).then(res=>{
					let payData=JSON.parse(res.data.JsParam)
					if(res.code==0){
						let _this=this;
						wx.requestPayment({
						timeStamp: payData.timeStamp,
						nonceStr: payData.nonceStr,
						package: payData.package,
						signType: payData.signType,
						paySign: payData.paySign,
						success(res) {
							navigate('product/paysuccess/index',{OrderNo:_this.OrderNumber,money:_this.orderList.Total})
							},
						fail(res) {
							navigate('product/paysuccess/index',{OrderNo:_this.OrderNumber,msg:'fail',money:_this.orderList.Total})
						}
						})
					}else if(res.code==200){
						navigate('product/paysuccess/index',{OrderNo:_this.OrderNumber,money:_this.orderList.Total})
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.orderdetails{
		.order{
			.details{
				width:100%;
				height:192upx;
				background:rgba(92,198,154,1);
				font-size:36upx;
				color:rgba(255,255,255,1);
				line-height:192upx;
				text-align: center;
			}
			.detailsbox{
				background:rgba(92,198,154,1);
				.myrelease {
					background: #fff;
					padding-top: 30upx;
					border-radius: 15upx 15upx 0 0;
					width: 100%;
					.collect-box {
						background: #F8F8F8;
						display: flex;
						padding: 20upx 30upx;
						.item__hd {
							margin-top: 40upx;
						}
						.collect-left {
							width: 200upx;
							height: 150upx;
							border-radius: 8upx;
							padding-right: 20upx;
							image {
								width: 100%;
								height: 100%;
								margin: 0 auto;
								border-radius: 10upx;
							}
						}
						.collect-right {
							color: #333333;
							width: 71%;
							.collect-flex{
								display: flex;
								justify-content: space-between;
								.name {
									font-size: 28upx;
								}
								.num {
									font-size:32upx;
									font-weight:bold;
									color:rgba(51,51,51,1);
								}
							}
							.point {
								display: flex;
								.pointkey {
									height: 46upx;
									background: rgba(92, 198, 154, 0.08);
									border-radius: 4upx;
									font-size: 22upx;
									color: #5cc69a;
									padding: 0 10upx;
									line-height: 46upx;
									margin-right: 15upx;
								}
							}
							.font {
								display: flex;
								padding-top: 12upx;
								.iconfont {
									color: $primary;
									// margin: 0 6upx 0 40upx;
									line-height: 1.2;
								}
								.fz12 {
									span {
										font-size: 22upx;
										color: rgba(153, 153, 153, 1);
										padding-left: 6upx;
									}
								}
							}
						}
					}
				}
			}
			
			.check{
				background: #fff;
				padding: 0 30upx;
				.checkbottom{
					display: flex;
					justify-content: space-between;
					border-bottom: 1upx solid #ECECEC;
					padding: 20upx 0;
					&:last-child{
						border-bottom:none;
					}
				}
				
			}
			
		}
		.place{
			margin-top: 20upx;
			padding: 30upx;
			background: #fff;
			.placename{
				font-size:32upx;
				font-weight:bold;
			}
			.placeflex{
				display: flex;
				justify-content: space-between;
				color: #666666;
			}
			.red{
				font-size:32upx;
				font-weight:bold;
				color: #FF3333;
			}
		}
		.mb60{
			margin-bottom: 160upx;
		}
		.bottom{
			position: fixed;
			bottom: 0;
			width:100%;
			height:98upx;
			background:rgba(255,255,255,1);
			display: flex;
			justify-content: flex-end;
			align-items: center;
			text-align: center;
			padding: 0 30upx;
			.bottomfff{
				width:168upx;
				height:64upx;
				border:1upx solid rgba(204,204,204,1);
				border-radius:8upx;
				color: #666666;
				padding-top: 8upx;
				margin-left: 20upx;
			}
			.bottomblue{
				width:168upx;
				height:64upx;
				background:rgba(92,198,154,1);
				border-radius:8upx;
				color: #fff;
				margin-left: 20upx;
				padding-top: 8upx;
			}
		}
	}

</style>
