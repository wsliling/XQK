<template>
	<view class="bgfff">
		<view class="search">
			<view class="searchbox flex-start">
				<view class="iconfont icon-sousuo"></view>
				<!-- <view class="txt">搜索目的地/景点/星语</view> -->
				<input confirm-type="send" @confirm="confirm()" type="text" placeholder="搜索目的地/景点/星语" v-model="SearchKey">
			</view>
		</view>
		<div class="plr30">
			<star-lang-list :list="datalist"  @onCollect="onCollect" @onLike="onLike"></star-lang-list>
		</div>
		<view class="topbtn iconfont icon-totop" @click="Top" v-if="isTop"></view>
		<!-- 发布按钮 -->
		<view class="fubuBtn iconfont icon-bianji1"  @click="navigate('starLangSon/release')"></view>
		<!-- 数据判断显示 -->
		<not-data v-if="CommnetList.length<1"></not-data>
		<uni-load-more :loadingType="loadMore" v-else></uni-load-more>
		<view style="height: 120upx;"></view>
		<tabbar-copy :current="1"></tabbar-copy>
	<!-- 	<tabbar :current="1"></tabbar>
		<cover-view style="height: 120rpx;"  @click="switchTab('tabBar/xingkong/xingkong')" class="xingkong-box">
			<cover-image class="xingkong-img" src="/static/tabbar/f.png"></cover-image>
		</cover-view> -->
	</view>
</template>

<script>
	import {post,navigate} from '@/utils';
	import tabbar from '@/components/tabbar.vue';
	import starLangList from '@/components/starLangList.vue';
	import notData from '@/components/notData.vue';
	import tabbarCopy from '@/components/tabbarCopy.vue';
	export default {
		components: {
			tabbar,starLangList,notData,tabbarCopy
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
				datalist:[]
			}
		},
		onLoad() {
			// console.log('星语列表onload')
			// this.getFindList()
		},
		onShow() {
			// this.SearchKey = ''
			this.datalist = []
			this.Page = 1
			this.getFindList()
		},
		methods: {
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
			// 获取星语列表
			async getFindList() {
				this.loadMore =1;
				let res = await post('Find/FindList',{
						userId: this.userId,
						token: this.token,
						myType:4,
						SearchKey:this.SearchKey,
						PageSize:this.PageSize,
						Page:this.Page
					})
				if(res.data.length<this.PageSize){
					this.loadMore =2;
				}else{
					this.loadMore =0;
				}
				// if(res.code == 0) {
				// 	// 清空输入框
				// 	this.SearchKey = ""
				// 	// 如果搜索成功清空
				// }
				if(res.code ===0 ){
					this.datalist.push(...res.data)
					// 停止下拉动画
					uni.stopPullDownRefresh()
				}
				// console.log('搜索页面用户发现赋值的datalist：',this.datalist)
			},
			// 键盘确定按钮事件
			confirm (){
					// 需要重置Page并且清空列表
					this.Page = 1
					this.datalist = []
					this.getFindList()
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
			this.Page = 1
			this.getFindList()
		},
		// 上拉加载更多
		onReachBottom(){
			if(this.loadMore===2)return;
			this.Page+=1;
			this.getFindList()
		},
	}
</script>

<style lang="scss" scoped>
	@import './style';
</style>
