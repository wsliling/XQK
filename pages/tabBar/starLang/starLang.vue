<template>
	<view>
		<view class="search">
			<view class="searchbox flex-start">
				<view class="iconfont icon-sousuo"></view>
				<!-- <view class="txt">搜索目的地/景点/星语</view> -->
				<input confirm-type="send" @confirm="confirm()" type="text" placeholder="搜索目的地/景点/星语" v-model="SearchKey">
			</view>
		</view>
		<div class="plr30">
			<star-lang-list :list="datalist"></star-lang-list>
		</div>
		<view class="topbtn iconfont icon-totop" @click="Top" v-if="isTop"></view>
		<!-- 发布按钮 -->
		<view class="fubuBtn iconfont icon-bianji1"  @click="tolick('/pages/starLangSon/release')"></view>
		<!-- 数据判断显示 -->
		<not-data v-if="CommnetList.length<1"></not-data>
		<uni-load-more :loadingType="loadMore" v-else></uni-load-more>
		<view style="height: 120upx;"></view>
		<tabbar :current="1"></tabbar>

	</view>
</template>

<script>
	import {post,get,toLogin} from '@/common/util.js';
	import tabbar from '@/components/tabbar.vue';
	import starLangList from '@/components/starLangList.vue';
	import notData from '@/components/notData.vue';
	export default {
		components: {
			tabbar,starLangList,notData
		},
		data() {
			return {
				userId:'',
				token:'',
				SearchKey:'',
				loadMore:0,//0-loading前；1-loading中；2-没有更多了
				Page: 1,
				PageSize: 8,
				isTop:false,//是否显示置顶
				datalist:[
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/p2.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗窗，这扇窗~',
					},
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为这扇窗~',
					},
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇一扇窗，这扇窗~',
					},
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/p3.jpg',
						name:'旅行为我门的生活打开了',
					},
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/banner.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我一扇窗，这扇窗~',
					},
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗扇窗，这扇窗~',
					},
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗一扇窗，这扇窗~',
					},
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/p2.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/banner.jpg',
						name:'旅行为我门的生活打开了一扇窗',
					},
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗',
					},
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗一扇窗，这扇窗~',
					}
				]
			}
		},
		onLoad() {
			// console.log('星语列表onload')
			// this.getFindList()
		},
		onShow() {
			console.log('星语列表onShow')
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
			tolick(url){
				uni.navigateTo({
					url:url
				})
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
				console.log('搜索页面用户发现list：',res)
				let tempList = res.data
				this.datalist = [...this.datalist,...tempList]
				// console.log('搜索页面用户发现赋值的datalist：',this.datalist)
			},
			// 键盘确定按钮事件
			confirm (){
					// 需要重置Page并且清空列表
					this.Page = 1
					this.datalist = []
					this.getFindList()
			}
		},
		onPageScroll(e){
			if(e.scrollTop>300){
				this.isTop=true;
			}else{
				this.isTop=false;
			}
		},
		onReachBottom(){
			if(this.loadMore===2)return;
			this.Page++
			this.getFindList()
		},
	}
</script>

<style lang="scss" scoped>
	@import './style';
</style>
