<template>
	<div class="plr30 bgfff pt10">
		<!-- <uni-search-bar :radius="100" placeholder="请输入城市名称" @input="searchInput" @cancel="searchInput"
		cancelButton="none"></uni-search-bar> -->
		<div class="search flex-center-center" @click="navigate('home/search')">
			<uni-icons type="search" color="#999"></uni-icons>
			<p>搜索目的地/景点/星球客等</p>
		</div>
		<product-item v-for="(item,index) in goodsList" :key="index" :item="item"></product-item>
		
		<not-data v-if="goodsList.length<1"></not-data>
		<uni-load-more :loadingType="loadMore" v-else></uni-load-more>
	</div>
</template>

<script>
	import productItem from '@/components/productItem.vue';
	import notData from '@/components/noData/noData.vue';
	// import { mapState } from "vuex"; //vuex辅助函数
	import {post,get,navigate} from '@/utils';
	export default {
		components: {productItem,notData},
		data() {
			return {
				navigate,
				userId: "",
				token: "",
				goodsList: [],
				loadMore:0,//0-loading前；1-loading中；2-没有更多了
			} 
		},
		onLoad() {
			this.getGoodsList()
		},
		computed:{
			// ...mapState(['lng','lat','cityName','cityCode'])
		},
		methods: {
			async getGoodsList () {
				// 热门推荐
				let GoodsList = await post("/Goods/GoodsList_yd",{
					// AreaCode:this.cityCode||'',
					// Lat:this.lat||0,
					// Lng:this.lng||0,
					IsRecommend:1
				}) 
				this.goodsList = GoodsList.data 
			},
		},
		onReachBottom(){

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