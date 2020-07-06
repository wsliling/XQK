<template>
	<view>
		<view class="big-box">
			<!-- <view class="head-box close-bg"> -->
			<view class="head-box">
				<image class="bg" src="/static/xingkong/lamplight.png" mode="widthFix"></image>
			<!-- 亮度盒子 -->
				<view class="lamplight-box">
					<view class="title">
						亮度
					</view>
					<view class="lamplight-grade">
						<view class="progress-bar">
							<view class="active-progress-bar">
							</view>
						</view>
						<view class="lamplight-describe">
							<view class="lamplight-describe-item" v-for="(item,index) in lamplightList" :key='index'>
								<image :src="item" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		<!-- 脚部 -->
		<view class="foot">
			<view class="foot-item flex-center-center">
				<view class="img-box">
				<image class="switch" src="/static/xingkong/switch0.png" mode="widthFix"></image>
				</view>
				<view class="text">
					开/关
				</view>
			</view>
			<view @click="open('model')" class="foot-item flex-center-center">
				<view class="img-box">
				<image class="yuedu" src="/static/xingkong/yuedu0.png" mode="widthFix"></image>
				</view>
				<view class="text">
				阅读模式
				</view>
			</view>
		</view>
		</view>
		<!-- 弹窗 -->
		<uni-popup ref='model' type="bottom">
			<view class="popup">
				<view class="popup-item">
					<image src="/static/xingkong/yuedu.png" mode="widthFix"></image>
					<view class="text">
						阅读模式
					</view>
				</view>
				<view class="popup-item">
					<image src="/static/xingkong/bulb.png" mode="widthFix"></image>
					<view class="text">
						明亮模式
					</view>
				</view>
				<view class="popup-item">
					<image src="/static/xingkong/love.png" mode="widthFix"></image>
					<view class="text">
						浪漫模式
					</view>
				</view>
				<view class="popup-item">
					<image src="/static/xingkong/sleep.png" mode="widthFix"></image>
					<view class="text">
						睡眠模式
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components:{
			uniPopup
		},
		data() {
			return {
				lamplightList: [
					'/static/xingkong/brightness0.png',
					'/static/xingkong/brightness1.png',
					'/static/xingkong/brightness2.png',
					'/static/xingkong/brightness3.png',
				],
			};
		},
		methods:{
			open(ref) {
				this.$refs[ref].open()
			},
			close(ref) {
				this.$refs[ref].close()
			},
		}
	}
</script>


<style lang="scss" scoped>
	@import './style';
</style>
