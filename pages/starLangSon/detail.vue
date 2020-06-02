<template>
	<div class="bgfff">
		<!--轮播图-->
		<view class="index_swiper">
			<swiper class="swiper" :indicator-dots="false" autoplay :interval="5000" :duration="500" @change="changeSwiper">
				<swiper-item v-for="(item,index) in 3" :key="index">
					<view class="swiper-item">
						<image class="img" src="http://xqk.wtvxin.com/images/wxapp/of/banner.jpg" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="dots">
				<view v-for="(item,index) in 3" :key="index" :class="['dot',currentSwiper==index?'active':'']"></view>
			</view>
		</view>
		<div class="p30">
			<div class="user flex-center-between">
				<div class="info flex-center">
					<img src="http://xqk.wtvxin.com/images/wxapp/of/banner.jpg" alt="">
					<h5>名字</h5>
				</div>
				<div class="btnBox flex-center">
					<div class="btn-min">关注</div>
					<div class="iconfont icon-fenxiang"></div>
				</div>
			</div>
			<div class="detail bb1 pb20">
				<h2>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</h2>
				<div class="content">{{content}}</div>
				<div class="more flex-center">展开全部 <uni-icons type="arrowdown" color="#5cc69a"></uni-icons></div>
				<p>2020-04-28发布</p>
			</div>
			<div class="pro">
				<h4>文中提及</h4>
				<div class="shadow">
					<pro-item></pro-item>
				</div>
			</div>
			<div class="good bb1 pb30">
				<h4>点赞区</h4>
				<div class="flex-center-between">
					<div class="avatar flex-center">
						<block v-for="(item,index) in 5" :key="index">
							<img src="http://xqk.wtvxin.com/images/wxapp/of/banner.jpg" alt="">
						</block>
					</div>
					<div class="zan-icon flex-center">
						<div class="iconfont icon-zan"></div>333
					</div>
				</div>
			</div>
			<div class="reply">
				<h4>回复</h4>
				<div class="add flex-center-between">
					<input type="text" placeholder="写评论...">
					<div class="line1"></div>
					<div class="collect flex-column-center-center">
						<div class="iconfont icon-aixin2"></div>
						123
					</div>
				</div>
				<reply-item  v-for="(item,index) in 3" :key="index"></reply-item>
				<div class="more" @click="navigate('starLangSon/reply')">查看108条回复</div>
			</div>
		</div>
		<div class="gap20"></div>
		<div class="other plr30 pb30">
			<h4>其他推荐星语</h4>
			<div class="flex-center-between">
				<starLangItem :item="item"  v-for="(item,index) in datalist" :key="index"></starLangItem>
			</div>
			<div class="btn-max">查看更多星语</div>
		</div>
	</div>
</template>

<script>
	import proItem from '@/components/productItem.vue';
	import starLangItem from '@/components/starLangItem.vue';
	import replyItem from './replyItem.vue';
	import {navigate} from '@/utils';
	export default {
		components:{proItem,replyItem,starLangItem},
		data() {
			return {
				navigate,
				currentSwiper :0,
				content:`风景是真的美，但走起来真的累！而且！最近是帐篷节，周末人多到爆！无论是等缆车！还是徒步！都会把你挤哭的！要去的记得选好时间
					门票：可以买门票+一级索道往返票=170元，索道往返价格有些微差异，具体可美团（据说一级索道途经的风景一般，建议保存体力选择搭乘缆车。本人觉得二级索道沿途风景也很一般啊......缺乏运动的小伙伴
					`,
				datalist:[
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'http://xqk.wtvxin.com/images/wxapp/of/p2.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗窗，这扇窗~',
					},
				]
			}
		},
		onLoad() {

		},
		methods: {
			changeSwiper(e){
				this.currentSwiper=e.detail.current;
			},
		}
	}
</script>
<style scoped lang="scss">
@import './detail.scss';
</style>