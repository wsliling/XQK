<template>
	<div class="bgfff plr30">
		<div class="searchBox flex-center-between">
			<div class="left flex-center">
				<uni-icons type="search" color="#666" size="22" class="icons"></uni-icons>
				<div class="area ellipsis" @click="navigate('location/cityList')">{{cityName||'定位失败'}}</div>
				<div class="line"></div>
				<ans-input class="input" @confirm="searchInput" :placeholder="commonSetting.SearchBox" align="left"></ans-input>
			</div>
		</div>
		<div class="content">
			<div class="tabBlock">
				<div class="tit flex-center-between">
					<h3>历史</h3>
					<uni-icons type="trash" size="20" @click="removeHistorySerch" v-if="historySerch.length"></uni-icons>
				</div>
				<div class="tab flex-center">
					<block v-if="historySerch.length">
						<div class="item" v-for="(item,index) in historySerch" :key="index" @click="onSearch(item)">{{item}}</div>
					</block>
					<p v-else>空空如也~</p>
				</div>
			</div>
			<div class="tabBlock" v-if="hot.length"> 
				<div class="tit flex-center-between" v-if="commonSetting.HotSearch">
					<h3>{{commonSetting.HotSearch}}</h3>
				</div>
				<div class="tab flex-center">
					<div class="item" v-for="(item,index) in hot" :key="index" @click="navigate('product/detail/detail',{Id:item.Id})">{{item.Name}}</div>
				</div>
			</div>
			<div class="tabBlock" v-if="near.length">  
				<div class="tit flex-center-between" v-if="commonSetting.NearbyScene">
					<h3>{{commonSetting.NearbyScene}}</h3>
				</div>
				<div class="tab flex-center">
					<div class="item" v-for="(item,index) in near" :key="index" @click="navigate('product/detail/detail',{Id:item.Id})">{{item.Name}}</div>
				</div>
			</div>
			<div class="tabBlock" v-if="tab.length">  
				<div class="tit flex-center-between" v-if="commonSetting.TagsClass">
					<h3>{{commonSetting.TagsClass}}</h3>
				</div>
				<div class="tab flex-center">
					<div class="item" v-for="(item,index) in tab" :key="index" @click="onSearch(item,1)">{{item.Name}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from "vuex"; //vuex辅助函数
	import {post,get,navigate,judgeLogin,redirect,requestHideLoading} from '@/utils';
	import ansInput from '@/components/ans-input/ans-input.vue'
	export default {
		components:{ansInput},
		data() {
			return {
				navigate,
				keyword:'',
				pageSize:8,
				page:1,
				historySerch:[],//历史
				hot:[],//热门
				near:[],//附近
				tab:[],//特色
			}
		},
		computed:{
			...mapState(['lng','lat','cityName','cityCode','commonSetting'])
		},
		onLoad() {
			this.getTab();
		}, 
		onShow(){
			uni.getStorageSync('historySerch')&&(this.historySerch = uni.getStorageSync('historySerch')||[]);
		},
		methods: {
			...mapMutations(['update']),
			getTab(){
				post('Goods/GetSearch',{
					PageSize:this.pageSize,
					Page:this.page,
					Lat:this.lat,
					Lng:this.lng,
					AreaCode:this.cityCode
				}).then(res=>{
					const data = res.data;
					this.hot = data.hotlist;
					this.near = data.nearlist;
					this.tab = data.taglist;
					uni.setStorageSync('tag',data.taglist)
					console.log(res,'res')
				})
			},
			searchInput(val){
				console.log(val,'eee')
				if(val.length<9){
					this.historySerch.push(val);
					if(this.historySerch.length>8){
						this.historySerch.shift()
					}
					uni.setStorageSync('historySerch',this.historySerch)
				}
				redirect('home/searchList',{keyword:val})
			},
			cancelInput(){

			},
			onSearch(item,tabClass){
				// 特色标签存在的时候
				if(tabClass){
					requestHideLoading('Goods/TagHits',{Id:item.Id})
				}
				redirect('home/searchList',{keyword:item.Name})
			},
			removeHistorySerch(){

				if(this.historySerch.length){
					const that =this;
					uni.showModal({
						title:'是否删除历史搜索记录！',
						cancelColor:'#999',
						confirmColor:'#5cc69a',
						success(res){
							if(res.confirm){
								that.historySerch=[];
								uni.setStorageSync('historySerch',[])
							}
						}
					})
				}
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
				p{
					text-align:center;
					color:#999;
					width:100%;
				}
			}
		}
	}
</style>