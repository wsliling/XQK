<template>
	<view>
		<view class="big-box">
			<!-- 头部状态盒子 -->
			<!-- <view class="status-box"  :style="{background:`url(${bgImg}) no-repeat center / 100%`}"> -->
			<view class="status-box">
				<image class="bg-img" :src="bgImg" mode="widthFix"></image>
				<view class="mask">
					<view class="status-show-box">
						<view class="status-img-box">
							<image src="/static/xingkong/taiyang2.png" mode="widthFix"></image>
						</view>
						<view class="status">
							<view class="model">
								<view class="left">
									制冷模式
								</view>
								<view class="center">
									|
								</view>
								<view class="right">
									自动风
								</view>
							</view>
							<view class="describe">
								20°
							</view>
						</view>
					</view>

				</view>

			</view>
			<!-- 控制内容盒子 -->
			<view class="content-box">
				<!-- 开关盒子 -->
				<view class="switch-box flex-center-center">
					<view class="switch flex-center-center">
						<image src="/static/xingkong/switch0.png" mode="widthFix"></image>
					</view>
					<view class="switch-text">
						开/关
					</view>
				</view>
				<!-- 模式盒子 -->
				<view class="model-box flex-center-between">
					<view class="model-item" :class="[modelIndex === index ? 'active' : '',index === 0 ? 'w42' : '',index === 3 ? 'w39' : '']" v-for="(item,index) in modeList" :key='index'
					 @click="changeModel(item,index)">
						<image v-if="modelIndex !== index || modelIndex === -1" :src="item.img" mode="widthFix"></image>
						<image v-else :src="item.activeImg" mode="widthFix"></image>
						<view class="model-value">
							{{ item.value }}
						</view>
					</view>
				</view>
				<!-- 风速盒子 -->
				<view class="wind-speed-box">
					<view class="title">
						风速
					</view>
					<view class="content">
						<view class="left">
							<view class="wind-speed-grade">
								<view class="progress-bar">
									<view class="active-progress-bar">
									</view>
								</view>
								<view class="wind-speed-describe">
									<view class="wind-speed-describe-item" v-for="(item,index) in windSpeedList" :key='index'>
										{{ item }}
									</view>
								</view>
							</view>
						</view>
						<view class="right">
							<view class="huan flex-center-center">
								<view class="huan-yuan">
									
								</view>
							</view>
							<view class="auto-model">
								自动
							</view>
						</view>
					</view>
					

				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgImg: '/static/xingkong/bg1.png',
				modelIndex: -1,
				modeList: [{
						img: '/static/xingkong/cool0.png',
						activeImg: '/static/xingkong/cool1.png',
						value: '制冷',
					},
					{
						img: '/static/xingkong/zhire0.png',
						activeImg: '/static/xingkong/zhire1.png',
						value: '制热',
					},
					{
						img: '/static/xingkong/songfeng0.png',
						activeImg: '/static/xingkong/songfeng1.png',
						value: '送风',
					},
					{
						img: '/static/xingkong/chushi0.png',
						activeImg: '/static/xingkong/chushi1.png',
						value: '除湿',
					}
				],
				windSpeedList: [
					'低风',
					'中风',
					'高风'
				],
			};
		},
		methods: {
			changeModel(item, index) {
				this.modelIndex = index
				console.log(item, index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './style';
</style>
