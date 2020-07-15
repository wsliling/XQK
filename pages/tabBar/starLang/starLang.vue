<template>
	<view class="bgfff">
		<view class="search">
			<view class="searchbox flex-start">
				<view class="iconfont icon-sousuo"></view>
				<!-- <view class="txt">搜索目的地/景点/星语</view> -->
				<input confirm-type="send" @confirm="confirm()" type="text" placeholder="搜索目的地/景点/星语" v-model="SearchKey">
			</view>
		</view>
		<div class="area flex-center-between">
			<scroll-view class="area-scroll" scroll-x>
				<div class="list  flex-center">
					<div class="item" v-for="(item,index) in areaList" :key="index"
						:class="{'active':areaActive ==item.Name}"
						@click="tabArea(item)"
					>{{item.Name}}</div>
				</div>
			</scroll-view>
			<div class="addArea" @click="showAreaWin"><span>+</span></div>
			<uni-popup ref="areaWin">
				<div class="areaWin">
					<div class="tit">地区</div>
					<div class="list flex-center">
						<div class="item" v-for="(item,index) in areaList" :key="index" 
							@click="tabArea(item)">
							{{item.Name}}	
						</div>
					</div>
				</div>
			</uni-popup>
		</div>
		<div class="classify">
			<scroll-view class="classify-scrollr" scroll-x>
				<div class="list  flex-center">
					<div class="item" v-for="(item,index) in classify" :key="index"
						:class="{'active':classifyActive ==item.Id}"
						@click="tabClassify(item)"
					>{{item.Name}}</div>
				</div>
			</scroll-view>
		</div>
		<div class="plr30">
			<star-lang-list :list="datalist"  @onCollect="onCollect" @onLike="onLike"></star-lang-list>
		</div>
		<view class="topbtn iconfont icon-totop" @click="Top" v-if="isTop"></view>
		<!-- 发布按钮 -->
		<view class="fubuBtn iconfont icon-bianji1"  @click="navigate('starLangSon/release')"></view>
		<!-- 数据判断显示 -->
		<not-data v-if="datalist.length<1"></not-data>
		<div class="plr30">
			<star-lang-list :list="recommendList"  @onCollect="onCollect" @onLike="onLike"></star-lang-list>
		</div>
		<uni-load-more :loadingType="loadMore"  v-if="datalist.length||recommendList.length"></uni-load-more>
		<view style="height: 120upx;"></view>
		<tabbar :current="1"></tabbar>
	</view>
</template>

<script>
	import {post,get,navigate} from '@/utils';
	import tabbar from '@/components/tabbar.vue';
	import starLangList from '@/components/starLangList.vue';
	import notData from '@/components/notData.vue';
	export default {
		components: {
			tabbar,starLangList,notData
		},
		data() {
			return {
				navigate,
				userId:'',
				token:'',
				SearchKey:'',
				loadMore:0,//0-loading前；1-loading中；2-没有更多了
				Page: 1,
				PageSize: 8,
				isTop:false,//是否显示置顶
				datalist:[],
				classify:[],
				areaList:[],
				areaActive:'',
				classifyActive:'',
				recommendList:[],//推荐列表
			}
		},
		onLoad() {
			// console.log('星语列表onload')
			// this.getFindList()
			this.datalist = []
			this.Page = 1;
			this.getUserInfo();
			this.getClassify();
			this.getArea();
		},
		onShow() {
			// this.SearchKey = ''
			this.getUserInfo();
			// 如果更改了城市
			if(this.$store.state.cityName!==this.areaActive){
				this.getArea();
			}
		},
		methods: {
			// 显示地区分类选择
			showAreaWin(){
				this.$refs.areaWin.open();
			},
			//返回顶部
			Top(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
			},
			// 获取用户id以及token
			getUserInfo () {
				this.userId = uni.getStorageSync('userId');
				this.token = uni.getStorageSync('token');
			},
			// 获取分类
			getClassify(){
				post('Find/FindClassList').then(res=>{
					const data = res.data;
					this.classify = data;
				})
			},
			getArea(){
				get('Area/AreaList').then(res=>{
					const data = res.data;
					this.areaActive = this.$store.state.cityName;
					const that =this;
					data.sort(function(a,b){
						if(a.Name===that.areaActive){
							return -1;
						}else if(b.Name===that.areaActive){
							return 1;
						}
						else{
							return b.Istop-a.Istop;
						}
					})
					this.areaList = res.data;
					this.getFindList();
				})
			},
			// 获取星语列表
			async getFindList() {
				this.loadMore =1;
				let res = await post('Find/FindList',{
						userId: this.userId,
						token: this.token,
						myType:4,
						SearchKey:this.SearchKey,
						PageSize:this.PageSize,
						Page:this.Page,
						AreaSite:this.areaActive,
						ClassId:this.classifyActive,
					})
				if(this.Page===1){
					this.datalist=[];
					this.recommendList=[];
					if(!res.data.length){
						this.getRecommendList();
					}
					console.log(this.datalist)
				}
				this.datalist.push(...res.data)
				if(res.data.length<this.PageSize){
					this.loadMore =2;
				}else{
					this.loadMore =0;
				}
			},
			// 没有数据-获取推荐星语列表
			async getRecommendList() {
				this.loadMore =1;
				let res = await post('Find/FindList',{
						userId: this.userId,
						token: this.token,
						myType:2,
						SearchKey:'',
						PageSize:this.PageSize,
						Page:this.Page,
						AreaSite:'',
						ClassId:'',
					})
				if(this.Page===1){
					this.recommendList=[];
					console.log(this.recommendList)
				}
				this.recommendList.push(...res.data)
				if(res.data.length<this.PageSize){
					this.loadMore =2;
				}else{
					this.loadMore =0;
				}
			},
			// 键盘确定按钮事件
			confirm (){
					// 需要重置Page并且清空列表
					this.Page = 1
					this.datalist = []
					this.getFindList()
			},
			tabArea(item){
				if(this.areaActive!=item.Name){
					this.areaActive = item.Name
				}else{
					this.areaActive = ''
				}
				this.Page=1;
				this.$refs.areaWin&&this.$refs.areaWin.close();
				this.getFindList();
			},
			tabClassify(item){
				if(this.classifyActive!=item.Id){
					this.classifyActive = item.Id
				}else{
					this.classifyActive = ''
				}
				this.Page=1;
				this.getFindList();
			},

			// 点击了星语收藏
			async onCollect(item){
				this.datalist.map(async(tem)=>{
					if(tem.Id===item.Id){
						tem.CollectNum = item.CollectNum;
						tem.CollectionId = item.CollectionId;
					}
				})

			},
			// 点击了星语点赞
			async onLike(item){
				this.datalist.map(async(tem)=>{
					if(tem.Id===item.Id){
						tem.IsLike = item.IsLike;
						tem.LikeNum = item.LikeNum;
					}
				})
			}
		},
		onPageScroll(e){
			if(e.scrollTop>300){
				this.isTop=true;
			}else{
				this.isTop=false;
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.datalist = []
			this.recommendList=[];
			this.Page = 1
			this.getFindList()
			// 停止下拉动画
			uni.stopPullDownRefresh()
		},
		// 上拉加载更多
		onReachBottom(){
			if(this.loadMore===2)return;
			this.Page+=1;
			if(this.datalist.length){
				this.getFindList()
			}
			if(this.recommendList.length){
				this.getRecommendList();
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import './style';
</style>
