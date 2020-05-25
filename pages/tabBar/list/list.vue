<template>
	<view>
		<view class="search">
			<view class="searchbox flex-start">
				<view class="iconfont icon-sousuo"></view>
				<view class="txt">搜索目的地/景点/星语</view>
			</view>
		</view>
		<view class="xylist">
			<view class="left-list">
				<view class="item" v-for="(item,index) in datalist" :key="index" v-if="index%2==0">
					<view class="itembox">
						<view class="imgbox">
							<view class="like flex-end">
								<view class="iconfont icon-aixin bg">
									<view class="iconfont icon-aixin"></view>
								</view>
								<text class="num">209</text>
							</view>
							<image :src="item.pic" mode="widthFix"></image>
						</view>
						<view class="txtbox">
							<view class="title uni-ellipsis2 uni-mb5">
								{{item.name}}
							</view>
							<view class="flex-between">
								<view class="tx flex-start">
									<image src="/static/logo.png" mode="aspectFill"></image>
									<text class="author uni-ellipsis">小星君</text>
								</view>
								<view class="zan flex-end active">
									<text class="iconfont icon-zan1"></text>
									<text class="num">30</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="right-list">
				<view class="item" v-for="(item,index) in datalist" :key="index" v-if="index%2==1">
					<view class="itembox">
						<view class="imgbox">
							<view class="like flex-end">
								<view class="iconfont icon-aixin bg">
									<view class="iconfont icon-aixin active"></view>
								</view>
								<text class="num">209</text>
							</view>
							<image :src="item.pic" mode="widthFix"></image>
						</view>
						<view class="txtbox">
							<view class="title uni-ellipsis2 uni-mb5">
								{{item.name}}
							</view>
							<view class="flex-between">
								<view class="tx flex-start">
									<image src="/static/logo.png" mode="aspectFill"></image>
									<text class="author uni-ellipsis">小星君</text>
								</view>
								<view class="zan flex-end">
									<text class="iconfont icon-zan"></text>
									<text class="num">30</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="topbtn iconfont icon-totop" @click="Top" v-if="isTop"></view>
		<!-- 发布按钮 -->
		<view class="fubuBtn iconfont icon-bianji1"  @click="tolick('/pages/tabBar/list/release')"></view>
		<view style="height: 120upx;"></view>
		<tabbar :current="1"></tabbar>
	</view>
</template>

<script>
	import {post,get,toLogin} from '@/common/util.js';
	import tabbar from '@/components/tabbar.vue';
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				isTop:false,//是否显示置顶
				datalist:[
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p2.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗窗，这扇窗~',
					},
					{
						pic:'/static/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为这扇窗~',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了',
					},
					{
						pic:'/static/of/banner.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p2.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/banner.jpg',
						name:'旅行为我门的生活打开了一扇窗',
					},
					{
						pic:'/static/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗一扇窗，这扇窗~',
					}
				]
			}
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
		},
		onPageScroll(e){
			if(e.scrollTop>300){
				this.isTop=true;
			}else{
				this.isTop=false;
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import './style';
</style>
