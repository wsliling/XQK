<template>
	<div class="plr30 bgfff pt10">
		<!-- <uni-search-bar :radius="100" placeholder="请输入城市名称" @input="searchInput" @cancel="searchInput"
		cancelButton="none"></uni-search-bar> -->
		<div class="search flex-center-center" @click="redirect('home/search')">
			<uni-icons type="search" color="#999"></uni-icons>
			<p >{{searchTips}}</p>
		</div>
		<product-item v-for="(item,index) in goodsList" :key="index" :item="item"></product-item>
		
		<not-data v-if="goodsList.length<1"></not-data>
		<uni-load-more :loadingType="loadMore" v-else></uni-load-more>
	</div>
</template>

<script>
	import productItem from '@/components/productItem.vue';
	import notData from '@/components/notData.vue';
	import { mapState, mapMutations} from "vuex"; //vuex辅助函数
	// import { mapState } from "vuex"; //vuex辅助函数
	import {post,get,redirect} from '@/utils';
	export default {
		// name:'推荐列表',
		components: {productItem,notData},
		data() {
			return {
				redirect,
				userId: "",
				token: "",
				page:1,
				pageSize:10,
				loadMore:0,//0-loading前；1-loading中；2-没有更多了
				goodsList: [],
				searchTips:'',
			} 
		},
		onLoad() {
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			this.getGoodsList();
			this.searchTips = this.$store.state.commonSetting.SearchBox;
		},
		onShow(){
			if(!this.userId||!this.token){
				this.userId = uni.getStorageSync('userId');
				this.token = uni.getStorageSync('token');
			}
		},
		computed:{
			...mapState(['lng','lat','cityName','cityCode','calendarOption','commonSetting'])
		},
		methods: {
			// 热门推荐
			async getGoodsList () {
				this.loadMore =1;
				let GoodsList = await post("/Goods/GoodsList_yd",{
					UserId:this.userId,
					Token:this.token,
					IsRecommend:1,
					Page:this.page,
					PageSize:this.pageSize,
					MinDate:this.calendarOption.currentRangeStartDate,
					MaxDate:this.calendarOption.currentRangeEndDate
				}) 
				if(this.page===1){
					this.goodsList = [];
				}
				if(GoodsList.data.length<this.pageSize){
					this.loadMore =2;
				}else{
					this.loadMore =0;
				}
				this.goodsList.push(...GoodsList.data);
			},
		},
		onReachBottom(){
			if(this.loadMore===2)return;
			this.page+=1;
			this.getGoodsList();
		},

	}
</script>
<style scoped lang="scss">
.search{
	width:100%;
	border-radius:40upx;
	background:#f2f2f2;
	margin-bottom: 30upx;
	line-height:2;
	color:#888;
	p{
		font-size:24upx;
	}
}
</style>