<template>
	<div class="plr30 bgfff pt10">
		<!-- <uni-search-bar :radius="100" placeholder="请输入城市名称" @input="searchInput" @cancel="searchInput"
		cancelButton="none"></uni-search-bar> -->
		<div class="search flex-center-center" @click="navigate('home/search')">
			<uni-icons type="search" color="#999"></uni-icons>
			<p>搜索目的地/景点/星球客等</p>
		</div>
		<product-item v-for="(item,index) in 12" :key="index" :item="item"></product-item>
	</div>
</template>

<script>
	import productItem from '@/components/productItem.vue';
	import {post,get,navigate} from '@/utils';
	export default {
		components: {productItem},
		data() {
			return {
				navigate,
				userId: "",
				token: "",
			} 
		},
		onLoad() {
		},
		methods: {
		}
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