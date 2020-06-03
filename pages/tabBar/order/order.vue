<template>
	<!-- 订单 -->
	<view class="order">
		<view class="uni-bg-white tabList flex p_re">
			<view v-for="(item, index) in tabList" :key="index" class="item" :class="{ active: item.id == tabIndex }" @click="cliTab(item.id)">{{ item.name }}</view>
			<view class="bb_line" :style="'left:' + tabStyle + 'rpx'"></view>
		</view>
		<view class="list" style="padding-top: 80upx;">
			<view class="order_item" @click.stop="navigate('tabBar/order/orderdetails',{OrderNumber: val.OrderNumber})" v-for="(val, key) in orderList" :key="key">
				<view class="flex-between">
					<view class="txtbox">
						<view class="name">{{ val.ShopName }}</view>
						<view class="desc">{{ val.MakeDate }}•{{ val.MakePeople }}位房客</view>
						<view class="flex">
							<text :class="['staus', val.StatusName === '待付款'||val.StatusName === '已失效'||val.StatusName === '已取消' ? 'red' : '']"
								>订单{{ val.StatusName }}
							</text>
							<text class="price">￥{{ val.Total }}</text>
						</view>
						<view style="color: #999;">
							<text>{{ val.StatueNote }}</text>
						</view>
					</view>
					<view class="imgbox" v-for="(item, key1) in val.OrderDetails" :key="key1"><image :src="item.PicNo" mode="aspectFill"></image></view>
				</view>
				<!-- IsRefund,//按钮退款-取消预订 1-显示
					IsComment,//按钮评价 1-显示
					Ispay, //按钮付款 1-显示
					IsApplyInvoice,//按钮开票 1-显示
					IsDel,//删除订单 1-显示
					IsCancel,//取消订单 1-显示  -->
				<view class="btns flex" v-for="(items, key2) in val.OrderDetails" :key="key2">
					<view
						class="btn"
						v-if="val.IsRefund === 1"
						@click="
							navigate(
								'tabBar/order/cancel',{
									OrderNumber:val.OrderNumber,
									UnitPrice:items.UnitPrice,
									ActualPay:items.ActualPay,
									Total:val.Total}
							)"
					>
						取消预订
					</view>
					<view class="btn" v-if="val.IsCancel === 1" @click.stop="chooseOrders(val.OrderNumber, 1)">取消订单</view>
					<view class="btn" v-if="val.IsDel === 1" @click.stop="chooseOrders(val.OrderNumber, 2)">删除订单</view>
					<view class="btn btn_fill" v-if="val.IsComment === 1" @click.stop="navigate('tabBar/order/comment')">去评价</view>
					<view class="btn btn_fill" v-if="val.Ispay === 1" @click.stop="ConfirmWeiXinSmallPay(val.OrderNumber, val.Total)">立即支付</view>
				</view>
			</view>
		</view>
		<noData :isShow="noDataIsShow"></noData>
		<view class="uni-tab-bar-loading"><uni-load-more :loadingType="loadingType" v-if="noDataIsShow == false"></uni-load-more></view>
		<view style="height: 120upx;"></view>
		<tabbar :current="3"></tabbar>
	</view>
</template>

<script>
import { post,navigate,judgeLogin } from '@/utils';
import tabbar from '@/components/tabbar.vue';
import noData from '@/components/noData.vue'; //暂无数据
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'; //加载更多
export default {
	components: {
		tabbar,
		noData,
		uniLoadMore
	},
	data() {
		return {
			navigate,
			userId: '',
			token: '',
			tabList: [{ id: 0, name: '全部订单' }, { id: 1, name: '待支付' }, { id: 2, name: '有效订单' }], //{ id: 3, name: '待评价'}
			tabIndex: 0,
			noDataIsShow: false, //暂无数据
			loadingType: 0, //0加载前，1加载中，2没有更多了
			PageSize: 10,
			Page: 1,
			Type: 0, //默认0-全部订单
			Status: 0, //默认0-全部状态 1://待付款 2://有效订单 3://待评价
			orderList: [] //订单列表
		};
	},
	onLoad(){
		if(!judgeLogin())return;
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
		this.init();
	},
	onShow() {
		if(!this.userId||!this.token){
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
		}
	},
	computed: {
		tabStyle() {
			return (750 / this.tabList.length) * this.tabIndex + (750 / this.tabList.length - 80) / 2;
		}
	},
	methods: {
		init(){
			this.orderList = [];
			this.Page = 1;
			this.noDataIsShow = false;
			this.getorderList();
		},
		cliTab(index) {
			this.orderList = [];
			this.Page = 1;
			this.tabIndex = index;
			this.Status = index;
			this.getorderList();
		},
		// 订单列表
		getorderList() {
			post('Order/OrderList_yd', {
				UserId: this.userId,
				Token: this.token,
				Page: this.Page,
				PageSize: this.PageSize,
				// Type:this.Type,
				Status: this.Status
			}).then(res => {
				console.log(res, '订单列表');
				if (res.code === 0) {
					if (res.data.length > 0) {
						this.noDataIsShow = false;
					}
					if (res.data.length === 0 && this.Page === 1) {
						this.noDataIsShow = true;
					}
					if (this.Page === 1) {
						this.orderList = res.data;
					}
					if (this.Page > 1) {
						this.orderList = this.orderList.concat(res.data);
					}
					if (res.data.length < this.PageSize) {
						this.isLoad = false;
						this.loadingType = 2;
					} else {
						this.isLoad = true;
						this.loadingType = 0;
					}
				}
			});
		},
		//取消订单  订单列表
		chooseOrders(OrderNumber, type) {
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
							OrderNo: OrderNumber
						}).then(res => {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
							setTimeout(()=>{
								_this.init();
							},1500)
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		//微信支付需参数
		ConfirmWeiXinSmallPay(OrderNo, Total) {
			post('Order/WechatPay', {
				OrderNo: OrderNo,
				UserId: this.userId,
				Token: this.token,
				WxCode: uni.getStorageSync('wxCode'),
				WxOpenid: uni.getStorageSync('openId'),
				paytype: 4
			}).then(res => {
				let payData = JSON.parse(res.data.JsParam);
				if (res.code == 0) {
					let _this = this;
					wx.requestPayment({
						timeStamp: payData.timeStamp,
						nonceStr: payData.nonceStr,
						package: payData.package,
						signType: payData.signType,
						paySign: payData.paySign,
						success(res) {
							_this.getorderList();
							navigate('product/paysuccess/index', { OrderNo: OrderNo, money: Total });
						},
						fail(res) {
							_this.getorderList();
							navigate('product/paysuccess/index', { OrderNo: OrderNo, msg: 'fail', money: Total });
						}
					})
				} else if (res.code == 200) {
					_this.getorderList();
					navigate('product/paysuccess/index', { OrderNo: OrderNo, money: Total });
				}
			});
		}
	},
	onPullDownRefresh(){
		uni.stopPullDownRefresh()
		this.init();
	},
	// 上拉加载
	onReachBottom: function() {
		if (this.isLoad) {
			this.loadingType = 1;
			this.Page+=1;
			this.getorderList();
		} else {
			this.loadingType = 2;
		}
	},
};
</script>

<style lang="scss" scoped>
@import './style';
</style>
