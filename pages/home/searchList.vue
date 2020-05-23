<template>
	<div class="bgfff plr30">
		<div class="searchBox flex-center-between">
			<div class="city ellipsis bold">{{this.cityName||'深圳市'}}</div>
			<ans-input class="input bold" @confirm="searchInput" placeholder="输入搜索内容"></ans-input>
			<div class="date bold flex-column-center-center">
				<p>05/18</p>
				<span>-</span>
				<p>05/16</p>
			</div>
		</div>
		<div class="sort flex-center-between plr30">
			<div class="item flex-center" @click="showPicker">
				默认排序
			</div>
			<div class="item flex-center" @click="showPicker">
				人数
			</div>
			<div class="item flex-center" @click="showPicker">
				筛选
			</div>
		</div>
		<div class="list">
			<block>
				<not-data tipsText="小星君正在规划中，现在不如看看别的推荐" tipsTitle="暂无找到匹配的结果" />
				<h3>为你推荐</h3>
			</block>
			<product-item v-for="(item,index) in 12" :key="index"></product-item>
		</div>
		<w-picker
			mode="selector"
			:options="sortList"
			@confirm="sortConfirm"
			themeColor="#5cc69a"
			ref="selector"
		></w-picker>
	</div>
</template>

<script>
	import { mapState, mapMutations } from "vuex"; //vuex辅助函数
	import ansInput from '@/components/ans-input/ans-input.vue';
	import productItem from '@/components/productItem.vue'
	import notData from '@/components/notData.vue'
	import wPicker from '@/components/w-picker/w-picker.vue'
	export default {
		components:{ansInput,productItem,notData,wPicker},
		data() {
			return {
				sortList:[{label:"1",value:"2"},{label:"3",value:"4"}]
			}
		},
		computed:{
			...mapState(['lng','lat','cityName'])
		},
		onLoad() {
		},
		methods: {
			...mapMutations(['update']),
			searchInput(e){
				console.log(e,'eee')
			},
			showPicker(){
				this.$refs.selector.show()
			},
			sortConfirm(e){
				console.log(e)
			}
		}
	}
</script>
<style scoped lang="scss">
	.searchBox{
		font-size:32upx;
		height:100upx;
		border:1upx solid #f2f2f2;
		border-radius:7upx;
		box-shadow:0 5upx 10upx #f2f2f2;
		.city{
			width:180upx;
			line-height:100upx;
			padding:0 5upx;
			text-align:center;
			color:$primary;
			border-right:1upx solid #f2f2f2;
		}
		.date{
			color:$primary;
			font-size:28upx;
			width:85upx;
			text-align:center;
			line-height:0.9;
			margin-right:20upx;
		}
	}
	.sort{
		line-height:3;
		.item{
			font-size:24upx;
			&::after{
				content:'';
				display:block;
				border-right:8upx solid #fff;
				border-left:8upx solid #fff;
				border-bottom:15upx solid #666;
				margin-left:8upx;
			}
		}
	}
	.list{
		h3{
			font-size:32upx;
			font-weight:bold;
			line-height:3;
		}
	}
</style>