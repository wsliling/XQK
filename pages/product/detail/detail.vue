<template>
	<div>
		<!--轮播图-->
		<view class="index_swiper">
			<swiper class="swiper" :indicator-dots="false" autoplay :interval="5000" :duration="500" @change="changeSwiper">
				<swiper-item v-for="(item,index) in 3" :key="index">
					<view class="swiper-item">
						<image class="img" src="/static/of/banner.jpg" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="dots">
				<view v-for="(item,index) in 3" :key="index" :class="['dot',currentSwiper==index?'active':'']"></view>
			</view>
		</view>
		<div class="topBlock p30">
			<div class="flex-center-between">
				<p>江西省 萍乡市</p>
				<div class="tab">5A景区</div>
			</div>
			<h2>萍乡武功山风景区星球客生态度假</h2>
			<p>万亩绿林环绕，原汁原味南加州建筑群 拷贝</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentSwiper :0,
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
@import './style.scss';
</style>