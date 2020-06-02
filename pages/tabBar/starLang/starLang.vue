<template>
	<view>
		<view class="search">
			<view class="searchbox flex-start">
				<view class="iconfont icon-sousuo"></view>
				<view class="txt">搜索目的地/景点/星语</view>
			</view>
		</view>
		<div class="plr30">
			<star-lang-list :list="datalist"></star-lang-list>
		</div>
		<view class="topbtn iconfont icon-totop" @click="Top" v-if="isTop"></view>
		<!-- 发布按钮 -->
		<view class="fubuBtn iconfont icon-bianji1"  @click="tolick('/pages/starLangSon/release')"></view>
		<view style="height: 120upx;"></view>
		<tabbar :current="1"></tabbar>
	</view>
</template>

<script>
	import {post,get,toLogin} from '@/common/util.js';
	import tabbar from '@/components/tabbar.vue';
	import starLangList from '@/components/starLangList.vue';
	export default {
		components: {
			tabbar,starLangList
		},
		data() {
			return {
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
