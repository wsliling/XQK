<template>
	<!-- 订单详情 -->
	<view class="orderdetails">
		<view class="order">
			<view class="details">待支付</view>
			<!-- <view class="">已确认</view> -->
			<!-- <view class="">待评价</view> -->
			<!-- <view class="">已完成</view> -->
			<!-- <view class="">已取消</view> -->
			<!-- <view class="">已失效</view> -->
			<view class="detailsbox">
				<view class="myrelease">
					<view class="collect-box">
						<view class="collect-left"><image src="../../../static/of/p1.jpg" mode=""></image></view>
						<view class="collect-right">
							<view class="collect-flex">
								<view class="name">广州.从化温泉明月山溪</view>
								<view class="num">￥288.0</view>
							</view>
							<view class="point">
								<view class="pointkey">骑行</view>
								<view class="pointkey">游乐</view>
								<view class="pointkey">艺术</view>
							</view>
							<view class="font">
								<view class="iconfont icon-collect"></view>
								<view class="fz12">4.8<span>(20)</span>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="check">
				<view class="checkbottom">
					<view class="">入住时间</view>
					<view class="">5月28日至29日</view>
				</view>
				<view class="checkbottom">
					<view class="">入住人</view>
					<view class="">刘华强</view>
				</view>
				<view class="checkbottom">
					<view class="">联系方式</view>
					<view class="">18682276868</view>
				</view>
			</view>
		</view>
		<view class="place">
			<view class="placename">订单信息</view>
			<view class="placeflex">
				<view class="">订单编号</view>
				<view class="">20000054115841</view>
			</view>
			<view class="placeflex">
				<view class="">下单时间</view>
				<view class="">2020-05-20 09:18:30</view>
			</view>
		</view>
		<view class="place mb60">
			<view class="placeflex">
				<view class="">总金额：</view>
				<view class="">¥288.00</view>
			</view>
			<view class="placeflex">
				<view class="">清洁费：</view>
				<view class="">¥0.00</view>
			</view>
			<view class="placeflex">
				<view class="">服务费：</view>
				<view class="">¥0.00</view>
			</view>
			<view class="placeflex">
				<view class="">优惠券：</view>
				<view class="">-¥0.00</view>
			</view>
			<view class="placeflex red">
				<view class="">实付金额：</view>
				<view class="">¥288.00</view>
			</view>
		</view>
		<view class="bottom">
			<view class="bottomfff">取消订单</view>
			<view class="bottomblue">立即支付</view>
			<!-- <view class="bottomfff">取消预订</view> -->
			<!-- <view class="bottomblue">去评价</view> -->
			<!-- <view class="bottomfff">删除订单</view> -->
			<!-- <view class="bottomfff">查看退款进度</view> -->
			<!-- <view class="bottomblue">重新预订</view> -->
		</view>
	</view>
</template>

<script></script>

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
									margin: 0 6upx 0 40upx;
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
