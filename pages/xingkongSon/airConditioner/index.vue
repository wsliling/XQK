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
							<view class="model" :class="[isAir ? 'canSee' : '']">
								<view class="left">
									<!-- 制冷模式 -->
									{{ nowAir.model }}模式
								</view>
								<view class="center">
									|
								</view>
								<view class="right">
									<!-- 自动风 -->
									{{ nowAir.wind }}
								</view>
							</view>
							<view v-if="isAir" class="describe">
								<!-- 20° -->
								{{ nowAir.wendu }}
							</view>
							<view v-else class="describe close-describe">
								已关机
							</view>
						</view>
					</view>

				</view>

			</view>
			<!-- 控制内容盒子 -->
			<view class="content-box">
				<!-- 开关盒子 -->
				<view @click="switchAir()" class="switch-box flex-center-center">
					<view class="switch flex-center-center" :class="[!isAir ? 'close-bg' : '']">
						<image src="/static/xingkong/switch0.png" mode="widthFix"></image>
					</view>
					<view class="switch-text">
						开/关
					</view>
				</view>
				<!-- 模式盒子 -->
				<view class="model-box flex-center-between">
					<view class="model-item" :class="[item.active ? 'active' : '',index === 0 ? 'w42' : '',index === 3 ? 'w39' : '']"
					 v-for="(item,index) in modelList" :key='index' @click="changeModel(item,index)">
						<!-- 	<image v-if="modelIndex !== index || modelIndex === -1" :src="item.img" mode="widthFix"></image>
						<image v-else :src="item.activeImg" mode="widthFix"></image> -->
						<image :src="item.active ? item.activeImg : item.img " mode=""></image>
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
									<view class="active-progress-bar"  :class="[isAir ? 'switch' : 'close-bg']">
									</view>
								</view>
								<view class="wind-speed-describe">
									<view class="wind-speed-describe-item" v-for="(item,index) in windSpeedList" :key='index'>
										{{ item }}
									</view>
								</view>
							</view>
						</view>
						<view @click="changeAutoModel()" class="right" :class="[autoModel.active ? 'active' : '']">
							<view class="huan flex-center-center">
								<view class="huan-yuan">

								</view>
							</view>
							<view class="auto-model">
								{{ autoModel.value }}
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
				isAir: false,
				modelIndex: 0,
				activeModel: {},
				modelList: [{
						img: '/static/xingkong/cool0.png',
						activeImg: '/static/xingkong/cool1.png',
						value: '制冷',
						active: true,
					},
					{
						img: '/static/xingkong/zhire0.png',
						activeImg: '/static/xingkong/zhire1.png',
						value: '制热',
						active: false,
					},
					{
						img: '/static/xingkong/songfeng0.png',
						activeImg: '/static/xingkong/songfeng1.png',
						value: '送风',
						active: false,
					},
					{
						img: '/static/xingkong/chushi0.png',
						activeImg: '/static/xingkong/chushi1.png',
						value: '除湿',
						active: false,
					},
				],
				autoModel: {
					value: '自动',
					active: false,
				},
				activeWindSpeed: {
					value: '低风'
				},
				windSpeedList: [
					'低风',
					'中风',
					'高风'
				],
			};
		},
		computed: {
			nowAir() {
				let model = this.activeModel.value;
				let wind = this.activeWindSpeed.value;
				let res = {
					model,
					wind,
					wendu: '20°'
				}
				// console.log('现在模式', res)
				return res
			}
		},
		methods: {
			// 开关空调
			switchAir() {
				this.isAir = !this.isAir
				// 关闭模式和风速
				if (!this.isAir) {
					this.closeAir()
				}else {
					this.initAll()
				}
			},
			// 模式切换
			changeModel(item, index) {
				// console.log(this.modelList)
				// console.log(Object.prototype.toString.call(this.modelList))
				// console.log(this.modelList.length)
				for (let i = 0; i < this.modelList.length; i++) {
					this.modelList[i].active = false
					if (index === i) {
						this.modelList[i].active = true
						this.activeModel = this.modelList[i]
					}
				}
				// this.modelIndex = index
				// console.log(item, index)
			},
			// 自动风
			changeAutoModel() {
				this.autoModel.active = !this.autoModel.active
				this.activeWindSpeed.value = this.autoModel.value
			},
			// 初始化模式风速
			initAll() {
				this.activeModel=  {
					img: '/static/xingkong/cool0.png',
					activeImg: '/static/xingkong/cool1.png',
					value: '制冷',
					active: true,
				}
				this.activeWindSpeed = {
					value:'低风'
				}
			},
			// 关闭
			closeAir() {
				this.closeModel()
				this.closeAutoModel()
			},
			// 关闭所有模式
			closeModel() {
				for (let i = 0; i < this.modelList.length; i++) {
					this.modelList[i].active = false
				}
			},
			// 关闭所有风速
			closeAutoModel() {
				this.autoModel.active = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './style';
</style>
