<template>
	<view class="order">
		<view class="uni-bg-white tabList flex">
			<view v-for="(item,index) in tabList" :key="index" class="item" :class="{'active':item.id==tabIndex}"  @click="cliTab(item.id)">{{item.name}}</view>
		</view>
		<view class="list" style="padding-top: 80upx;">
			<view class="order_item">
				<view class="flex-between">
					<view class="txtbox">
						<view class="name">
							星球客
						</view>
						<view class="desc">
							2020/06/18-2020/06/19 •1位房客
						</view>
						<view class="flex">
							<text class="staus red">订单待支付</text>
							<text class="price">￥198.0</text>
						</view>
					</view>
					<view class="imgbox">
						<image src="/static/of/p3.jpg" mode="aspectFill"></image>
					</view>
				</view>
				<view class="btns flex">
					<view class="btn">
						取消订单
					</view>
					<view class="btn btn_fill">
						立即支付
					</view>
				</view>
			</view>
			<view class="order_item">
				<view class="flex-between">
					<view class="txtbox">
						<view class="name">
							星球客
						</view>
						<view class="desc">
							2020/06/18-2020/06/19 •1位房客
						</view>
						<view class="flex">
							<text class="staus">订单已确认</text>
							<text class="price">￥198.0</text>
						</view>
					</view>
					<view class="imgbox">
						<image src="/static/of/p3.jpg" mode="aspectFill"></image>
					</view>
				</view>
				<view class="btns flex">
					<view class="btn">
						取消预定
					</view>
				</view>
			</view>
			<view class="order_item">
				<view class="flex-between">
					<view class="txtbox">
						<view class="name">
							星球客
						</view>
						<view class="desc">
							2020/06/18-2020/06/19 •1位房客
						</view>
						<view class="flex">
							<text class="staus">订单已完成</text>
							<text class="price">￥198.0</text>
						</view>
					</view>
					<view class="imgbox">
						<image src="/static/of/p3.jpg" mode="aspectFill"></image>
					</view>
				</view>
				<view class="btns flex">
					<view class="btn">
						删除订单
					</view>
				</view>
			</view>
			<view class="order_item">
				<view class="flex-between">
					<view class="txtbox">
						<view class="name">
							星球客
						</view>
						<view class="desc">
							2020/06/18-2020/06/19 •1位房客
						</view>
						<view class="flex">
							<text class="staus">订单待评价</text>
							<text class="price">￥198.0</text>
						</view>
					</view>
					<view class="imgbox">
						<image src="/static/of/p3.jpg" mode="aspectFill"></image>
					</view>
				</view>
				<view class="btns flex">
					<view class="btn btn_fill">
						去评价
					</view>
				</view>
			</view>
		</view>
		<view style="height: 120upx;"></view>
		<tabbar :current="3"></tabbar>
	</view>
</template>

<script>
	import tabbar from '@/components/tabbar.vue';
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				tabList:[{id:0,name:'全部订单'},{id:1,name:'有效订单'},{id:2,name:'待支付'}],
				tabIndex:0,
			}
		},
		onShow() {
			
		},
		methods: {
			goUrl(url){
			  uni.navigateTo({
				url:url
			  })
			},
			cliTab(index){
			  this.tabIndex = index
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './style';
</style>
