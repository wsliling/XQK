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
				<view @click="open('model')" class="foot-item active-model flex-center-center">
					<view class="img-box active-model-img-box">
						<image class="active-model-img" :src="activeModel.img" mode="widthFix"></image>
					</view>
					<view class="text">
						{{ activeModel.value }}
					</view>
				</view>
			</view>
		</view>
		<!-- 弹窗 -->
		<uni-popup ref='model' type="bottom">
			<view class="popup">
				<view @click="changModel(item,index)" class="popup-item" v-for="(item,index) in modelList" :key='index'>
					<view class="img-box flex-center-center">
						<image :src="item.img" mode="widthFix"></image>

					</view>
					<view class="text">
						{{ item.value }}
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				activeModel: {
						img: '/static/xingkong/yuedu0.png',
						value: '阅读模式',
						active: true,
					},
				modelList: [{
						img: '/static/xingkong/yuedu0.png',
						value: '阅读模式',
						active: true,
					},
					{
						img: '/static/xingkong/bulb.png',
						value: '明亮模式',
						active: false,
					},
					{
						img: '/static/xingkong/love.png',
						value: '浪漫模式',
						active: false,
					},
					{
						img: '/static/xingkong/sleep.png',
						value: '睡眠模式',
						active: false,
					}
				],
				lamplightList: [
					'/static/xingkong/brightness0.png',
					'/static/xingkong/brightness1.png',
					'/static/xingkong/brightness2.png',
					'/static/xingkong/brightness3.png',
				],
			};
		},
		methods: {
			// 开关灯
			switchDeng(){
				
			},
			open(ref) {
				this.$refs[ref].open()
			},
			close(ref) {
				this.$refs[ref].close()
			},
			// 切换模式
			changModel(item,index) {
				for (let i = 0; i < this.modelList.length; i++) {
					this.modelList[i].active = false
					if(index === i ){
							this.modelList[i].active = true
							this.activeModel = this.modelList[i]
					}
				}
				// 关闭弹窗
				this.close('model')
			},
		}
	}
</script>


<style lang="scss" scoped>
	@import './style';
</style>
