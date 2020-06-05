<template>
	<!-- 我要评价 -->
	<view class="myappraise">
		<view class="comment" v-for="(val, key) in orderList" :key="key">
			<view class="comment-flex" @click="goDetail(val.OrderDetails[0].ProductId)">
				<view>
					<view class="comment-name">{{ val.ShopName }}</view>
					<view class="comment-time">{{ val.MakeDate }}•{{ val.MakePeople }}位房客</view>
					<view class="flex">
						<view class="comment-remain">订单待评价</view>
						<view class="">¥{{ val.Total }}</view>
					</view>
				</view>
				<view class="comment-img" v-for="item in val.OrderDetails">
					<image :src="item.PicNo" mode=""></image>
				</view>
			</view>
			<view class="comment-to" @click="gocomment(val.OrderNumber,val.MakeDate,val.MakePeople)">去评价</view>
		</view>
		<noData :isShow="noDataIsShow"></noData>
		<view class="uni-tab-bar-loading"><uni-load-more :loadingType="loadingType" v-if="noDataIsShow == false"></uni-load-more></view>
	</view>
</template>

<script>
	import { post } from '@/utils';
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'; //加载更多
	export default {
		data() {
			return {
				userId: "",
				token: "",
				curPage:"",
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				noDataIsShow: false,
				Page: 1,
				PageSize: 6,
				count: 0,
				Status:3,  //待评价
				orderList:[],
			};
		},
		components: { noData, uniLoadMore },
		onLoad(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow(){
			this.getorderList();
		},
		methods:{
			//写评价
			gocomment(OrderNumber,MakeDate,MakePeople){
				uni.navigateTo({
					url:'/pages/tabBar/order/comment?OrderNumber=' + OrderNumber + '&MakeDate=' + MakeDate + '&MakePeople=' + MakePeople
				})
			},
			// 产品详情
			goDetail(ProductId){
				uni.navigateTo({
					url:'/pages/product/detail/detail?Id=' + ProductId
				})
			},
			// 订单评价列表
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
		},
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.getorderList();
			} else {
				this.loadingType = 2;
			}
		},
	}
</script>

<style lang="scss">
	.myappraise{
		background: #fff;
		color:rgba(51,51,51,1);
		padding-top: 30upx;
	}
	.comment{
		padding: 40upx 30upx;
		border-bottom: 1upx solid #ECECEC;
	}
	.comment-flex{
		display: flex;
		justify-content: space-between;
	}
	.comment-img{
		width:200upx;
		height:150upx;
		margin-left: 20upx;
	}
	image{
		width: 100%;
		height: 100%;
		border-radius:10upx;
	}
	.comment-name{
		font-size:32upx;
		font-weight:bold;
	}
	.comment-time{
		font-size:28upx;
	}
	.flex{
		display: flex;
	}
	.comment-remain{
		color: #5CC69A;	
		padding-right: 20upx;
	}
	.comment-to{
		width:160upx;
		height:64upx;
		background:rgba(92,198,154,1);
		border-radius:6upx;
		font-size:28upx;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 64upx;
		margin-top: 40upx;
	}
</style>
