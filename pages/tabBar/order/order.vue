<template>
	<!-- 订单 -->
	<view class="order">
		<view class="uni-bg-white tabList flex p_re">
			<view v-for="(item, index) in tabList" :key="index" class="item" :class="{ active: item.id == tabIndex }" @click="cliTab(item.id)">{{ item.name }}</view>
			<view class="bb_line" :style="'left:' + tabStyle + 'rpx'"></view>
		</view>
		<view class="list" style="padding-top: 80upx;">
			<view class="order_item" @click.stop="goUrl('/pages/tabBar/order/orderdetails')">
				<view class="flex-between">
					<view class="txtbox">
						<view class="name">星球客</view>
						<view class="desc">2020/06/18-2020/06/19 •1位房客</view>
						<view class="flex">
							<text class="staus red">订单待支付</text>
							<text class="price">￥198.0</text>
						</view>
					</view>
					<view class="imgbox"><image src="/static/of/p3.jpg" mode="aspectFill"></image></view>
				</view>
				<view class="btns flex">
					<view class="btn" @click.stop="tiedphone()">取消订单</view>
					<view class="btn btn_fill" @click.stop="goUrl('/pages/tabBar/order/pay')">立即支付</view>
				</view>
			</view>
			<view class="order_item">
				<view class="flex-between">
					<view class="txtbox">
						<view class="name">星球客</view>
						<view class="desc">2020/06/18-2020/06/19 •1位房客</view>
						<view class="flex">
							<text class="staus">订单已确认</text>
							<text class="price">￥198.0</text>
						</view>
					</view>
					<view class="imgbox"><image src="/static/of/p3.jpg" mode="aspectFill"></image></view>
				</view>
				<view class="btns flex" @click="goUrl('/pages/tabBar/order/cancel')"><view class="btn">取消预订</view></view>
			</view>
			<view class="order_item">
				<view class="flex-between">
					<view class="txtbox">
						<view class="name">星球客</view>
						<view class="desc">2020/06/18-2020/06/19 •1位房客</view>
						<view class="flex">
							<text class="staus">订单已确认</text>
							<text class="price">￥198.0</text>
						</view>
					</view>
					<view class="imgbox"><image src="/static/of/p3.jpg" mode="aspectFill"></image></view>
				</view>
				<view class="btns flex" @click="goUrl('/pages/tabBar/order/schedule')"><view class="btn">查看退款进度</view></view>
			</view>
			<view class="order_item">
				<view class="flex-between">
					<view class="txtbox">
						<view class="name">星球客</view>
						<view class="desc">2020/06/18-2020/06/19 •1位房客</view>
						<view class="flex">
							<text class="staus">订单已完成</text>
							<text class="price">￥198.0</text>
						</view>
					</view>
					<view class="imgbox"><image src="/static/of/p3.jpg" mode="aspectFill"></image></view>
				</view>
				<view class="btns flex"><view class="btn">删除订单</view></view>
			</view>
			<view class="order_item">
				<view class="flex-between">
					<view class="txtbox">
						<view class="name">星球客</view>
						<view class="desc">2020/06/18-2020/06/19 •1位房客</view>
						<view class="flex">
							<text class="staus">订单待评价</text>
							<text class="price">￥198.0</text>
						</view>
					</view>
					<view class="imgbox"><image src="/static/of/p3.jpg" mode="aspectFill"></image></view>
				</view>
				<view class="btns flex" @click="goUrl('/pages/tabBar/order/comment')"><view class="btn btn_fill">去评价</view></view>
			</view>
		</view>
		<view class="uni-tab-bar-loading" v-if="hasData"><uni-load-more :loadingType="loadingType"></uni-load-more></view>
		<noData :isShow="noDataIsShow"></noData>
		<view style="height: 120upx;"></view>
		<tabbar :current="3"></tabbar>
		<!-- 取消定单弹框 -->
		<uni-popup type="center" ref="tiedphone">
			<view class="phonebox">
				<view class="callorder">您确定要取消定单吗？</view>
				<view class="boxflex">
					<view class="cancel" @click="close()">取消</view>
					<view class="affirm" @click="close()">确认</view>
				</view>
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { post, get, toLogin } from '@/common/util.js';
import tabbar from '@/components/tabbar.vue';
import popup from '@/components/uni-popup/uni-popup.vue'
import noData from '@/components/noData.vue'; //暂无数据
import uniLoadMore from '@/components/uni-load-more.vue'; //加载更多
export default {
	components: {
		tabbar,
		popup,
		noData,
		uniLoadMore
	},
	data() {
		return {
			tabList: [{ id: 0, name: '全部订单' }, { id: 1, name: '有效订单' }, { id: 2, name: '待支付' }],
			tabIndex: 0,
			hasData: false,
			noDataIsShow: false,
			loadingType: 0, //0加载前，1加载中，2没有更多了
			pageSize: 6,
			page: 1,
			isLoad: false,
			datalist: [] //数据
		};
	},
	onShow() {},
	computed: {
		tabStyle() {
			return (750 / this.tabList.length) * this.tabIndex + (750 / this.tabList.length - 80) / 2;
		}
	},
	methods: {
		goUrl(url) {
			uni.navigateTo({
				url: url
			});
		},
		cliTab(index) {
			this.tabIndex = index;
		},
		tiedphone(){
			this.$refs.tiedphone.open()
		},
		close(){
			this.$refs.tiedphone.close()
		},
	}
};
</script>

<style lang="scss" scoped>
@import './style';
	// 取消定单的样式
	.phonebox{
		background: #fff;
		border-radius: 16upx;
		font-size:38upx;
		.callorder{
			text-align: center;
			padding: 40upx 100upx;
			border-bottom: 1upx solid #ECECEC;
		}
		.boxflex{
			display: flex;
			justify-content: space-between;
			font-size: 34upx;
			width: 100%;
			.cancel{
				color: #999999;
				border-right: 1upx solid #ECECEC;
				width: 50%;
				height: 120upx;
				line-height: 120upx;
			}
			.affirm{
				color: #5CC69A;
				width: 50%;
				height: 120upx;
				line-height: 120upx;
			}
		}
	}
</style>
