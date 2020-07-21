<template>
	<view>
		<view class="big-box">
			<!-- <view class="head-box close-bg"> -->
			<view class="head-box" :class="[ isDeng ? '' : 'close-bg']" :style="[isDeng ? activeModel.bgHead : '']">
				<image v-if="isDeng" class="bg" src="/static/xingkong/lamplight.png" mode="widthFix"></image>
				<view v-else class="close-deng">
					已关闭
				</view>
				<!-- 亮度盒子 -->
				<view class="lamplight-box">
					<view class="title"  :class="[ isDeng ? '' : 'close']">
						亮度
					</view>
					<view class="lamplight-grade">
						<view class="progress-bar">
							<!-- <view class="active-progress-bar">
							</view> -->
							<slider :value="slider.value" :aria-valuenow="slider.value" @change="windSliderChange" @changing="windSliderChangeIng"
							 :step="slider.step" :min="slider.min" :max="slider.max" :activeColor="isDeng ? activeModel.bgColor : '#D2D2D2'" :backgroundColor="slider.backgroundColor"
							 :block-size="slider.blockSize" :disabled="slider.disabled" />
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
			<view class="foot"  :class="[ isDeng ? '' : 'close']">
				<view @click="switchDeng()" class="foot-item flex-center-center">
					<view class="img-box switch-box" :class="[ isDeng ? '' : 'close-bg']">
						<image class="switch" src="/static/xingkong/switch0.png" mode="widthFix"></image>
					</view>
					<view class="text">
						开/关
					</view>
				</view>
				<view @click="open('model')" class="foot-item active-model flex-center-center">
					<view class="model-item" v-for="(item,index) in modelList" :key='index'>
						<block v-if="item.active">
							<view class="img-box active-model-img-box" :style="{background: isDeng ? item.bgColor : '#FAFAFA'}">
								<view class="sanjiao" :style="{'border-color':
								isDeng
								 ?  
								 `transparent transparent ${item.bgColor}` 
								 : 
								 'transparent'}
								 "></view>
								<image class="active-model-img" :src="isDeng ? item.activeImg : item.img " mode="widthFix"></image>
							</view>
							<view class="text">
								{{ item.value }}
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹窗 -->
		<uni-popup ref='model' type="bottom">
			<view class="popup">
				<view @click="changModel(item,index)" class="popup-item" v-for="(item,index) in modelList" :key='index'>
					<view class="img-box flex-center-center">
						<image :src="item.activeImg" mode="widthFix"></image>
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
	import {post,get,navigate,switchTab,judgeLogin,toast,throttle} from '@/utils';
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				userId: "",
				token: "",
				id:'',
				roomNo:'',
				// 是否关灯
				isDeng: false,
				// 滑动条对象
				slider: {
					step: 33, // 步长
					value: 0, // 当前值
					min: 0, // 最小值
					max: 99, // 最大值
					activeColor: '#5CC69A', // 活动条颜色
					backgroundColor: '#B9BABF', // 背景条颜色
					blockSize: 22, // 滑块大小	
					disabled: false,
				},
				activeModel: {
					img: '/static/xingkong/yuedu0.png',
					activeImg: '/static/xingkong/yuedu1.png',
					bgHead: {
						background: 'linear-gradient(180deg, #5CC69A 0%,#5CC69A 60%,#8DD4B7 80%,rgba(255,0,0,0)) 100%'
					},
					value: '阅读模式',
					bgColor: '#5CC69A',
					active: true,
				},
				modelList: [{
						img: '/static/xingkong/yuedu0.png',
						activeImg: '/static/xingkong/yuedu1.png',
						bgHead: {
							background: 'linear-gradient(180deg, #5CC69A 0%,#5CC69A 60%,#8DD4B7 80%,rgba(255,0,0,0)) 100%'
						},
						value: '阅读模式',
						bgColor: '#5CC69A',
						active: true,
					},
					{
						img: '/static/xingkong/bulb0.png',
						activeImg: '/static/xingkong/bulb1.png',
						bgHead: {
							background: 'linear-gradient(180deg, #FCBA88 0%,#FCBA88 60%,#FBCCA8 80%,rgba(255,0,0,0)) 100%'
						},
						value: '明亮模式',
						bgColor: '#FCBA88',
						active: false,
					},
					{
						img: '/static/xingkong/love0.png',
						activeImg: '/static/xingkong/love1.png',
						bgHead: {
							background: 'linear-gradient(180deg, #E7BBF9 0%,#E7BBF9 60%,#EED3F8 80%,rgba(255,0,0,0)) 100%'
						},
						value: '浪漫模式',
						bgColor: '#E7BBF9',
						active: false,
					},
					{
						img: '/static/xingkong/sleep0.png',
						activeImg: '/static/xingkong/sleep1.png',
						bgHead: {
							background: 'linear-gradient(180deg, #B4BEFB 0%,#B4BEFB 60%,#C6CDFA 80%,rgba(255,0,0,0)) 100%'
						},
						value: '睡眠模式',
						bgColor: '#B4BEFB',
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
		onLoad(e) {
			this.id = e.id;
			this.roomNo = e.roomNo;
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			// 禁用进度条
			this.closeSlider()
		},
		methods: {
			// 设备控制类型
			// 0://灯光（1-开 0-关）
			// 1://调光-亮度（0-100）（0-25-50-75-100）
			// 2://空调（1-开 0-关）
			// 3://空调-温度（16-30℃）
			// 4://空调-模式（1 冷2 热3 通风0 停止）
			// 5://空调-风速手动（1 低速，2 中速，3 高速，0 停止）
			onButton(type,typeVal){
				return post('Udp/RoomDeviceControl',{
					UserId:this.userId,
					Token:this.token,
					Id:this.id,
					RoomNo:this.roomNo,
					Type:type,
					TypeVal:typeVal
				})
			},
			// 开关灯
			async switchDeng() {
				await this.onButton(0,this.isDeng?0:1)
				this.isDeng = !this.isDeng
				if(!this.isDeng) {
					// 关闭
					this.closeModel()
					// 禁用进度条
					this.closeSlider()
				}else {
					// 开灯
					// 启用进度条
					this.openSlider()
				}
			},
			// 开关弹窗
			open(ref) {
				if(!this.isDeng) {
					return false
				}
				this.$refs[ref].open()
			},
			close(ref) {
				this.$refs[ref].close()
			},
			// 切换灯光模式
			async changModel(item, index) {
				if(!this.isDeng){
					return false
				}
				await this.onButton(2,index==0?25:index==1?50:index==2?75:index==3?100:0)
				for (let i = 0; i < this.modelList.length; i++) {
					this.modelList[i].active = false
					if (index === i) {
						this.modelList[i].active = true
						this.activeModel = this.modelList[i]
						// console.log('活动的模式：',this.activeModel.bgColor)
					}
				}
				// 关闭弹窗
				this.close('model')
			},
			// 拖动亮度变化的完成
			async windSliderChange(e) {
				let _this = this;
				let step = this.slider.step
				console.log('拖动完：', e.detail.value,step)
				// this.closeSpeedModel()
				if (e.detail.value === 0) {
					// this.$nextTick(() => {
					await this.onButton(1,25);
					this.slider.value = 0
					// console.log('我是无亮度', this.slider.value)
					// })
					// this.windSpeedList[0].active = true

				} else if (e.detail.value === step * 1) {
					await this.onButton(1,50);
					this.slider.value = step * 1
					// console.log('我是亮度0', this.slider.value)
					// this.windSpeedList[1].active = true
				} else if (e.detail.value === step * 2) {
					await this.onButton(1,75);
					this.slider.value = step * 2
					// console.log('我是亮度1', this.slider.value)
					// this.windSpeedList[2].active = true
				} else if (e.detail.value === step * 3) {
					await this.onButton(1,100);
					this.slider.value = step * 3
					// console.log('我是亮度2', this.slider.value)
					// this.windSpeedList[3].active = true
				}
			},
			// 拖动亮度中
			windSliderChangeIng(e) {
				// console.log('拖动中：', e.detail.value)
				// if (e.detail.value <= 33) {
				// 	this.slider.value = 33
				// 	this.$nextTick(() => {
				// 		console.log('我是亮度1', this.slider.value)
				// 	})

				// }
			},
			// 关闭所有模式
			closeModel() {
				// for (let i = 0; i < this.modelList.length; i++) {
				// 	this.modelList[i].active = false
				// }
			},
			// // 关闭所有风速
			// closeSpeedModel() {
			// 	for (let i = 0; i < this.modelList.length; i++) {
			// 		this.modelList[i].active = false
			// 	}
			// },
			// 禁用进度条
			closeSlider() {
				this.slider.activeColor = '#D2D2D2' // 活动条颜色
				this.slider.disabled = true
			},
			// 启用进度条
			openSlider() {
				this.slider.activeColor = '#5CC69A' // 活动条颜色
				this.slider.disabled = false
			},
		}
	}
</script>


<style lang="scss" scoped>
	@import './style';
</style>
