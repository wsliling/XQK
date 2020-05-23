<template>
	<div class="bgfff plr30">
		<div class="searchBox flex-center-between">
			<div class="left flex-center">
				<uni-icons type="search" color="#666" size="22" class="icons"></uni-icons>
				<div class="area ellipsis">{{this.cityName||'深圳市市市'}}</div>
				<div class="line"></div>
				<ans-input class="input" @confirm="searchInput" placeholder="搜索目的地/景点/星球客等"></ans-input>
			</div>
		</div>
		<div class="content">
			<div class="tabBlock">
				<div class="tit flex-center-between">
					<h3>历史</h3>
					<uni-icons type="trash" size="20"></uni-icons>
				</div>
				<div class="tab flex-center">
					<div class="item" v-for="(item,index) in 8" :key="index" @click="navigate('home/searchList')">武功山</div>
				</div>
			</div>
			<div class="tabBlock" v-for="(item,index) in 5" :key="index"> 
				<div class="tit flex-center-between">
					<h3>热门搜索</h3>
				</div>
				<div class="tab flex-center">
					<div class="item" v-for="(item,index) in 8" :key="index">武功山</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from "vuex"; //vuex辅助函数
	import {post,get,navigate,judgeLogin} from '@/utils';
	import ansInput from '@/components/ans-input/ans-input.vue'
	export default {
		components:{ansInput},
		data() {
			return {
				navigate,
				keyword:'',
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
			cancelInput(){

			}
		}
	}
</script>
<style scoped lang="scss">
	.searchBox{
		padding-left:20upx;
		height:64upx;
		overflow:hidden;
		font-size:28upx;
		background:#f5f5f5;
		border-radius:8upx;
		.left{
			width:100%;
			.line{
				width:4upx;
				height:64upx;
				background:#fff;
			}
			.input{
				width:550upx;
			}
			.icons{
				
			}
			.area{
				width:150upx;
				padding-left:10upx;
				color:$primary;
			}
		}
	}
	.content{
		.tabBlock{
			border-bottom:1upx solid #e8e8e8;
			padding-bottom:20upx;
			.tit{
				line-height:100upx;
				h3{
					font-size:32upx;
					font-weight:bold;
				}
			}
			.tab{
				flex-flow:wrap row;
				.item{
					padding:0 15upx;
					line-height:2;
					margin-right:20upx;
					margin-bottom:20upx;
					background:#eff3f6;
					border-radius:5upx;
				}
			}
		}
	}
</style>