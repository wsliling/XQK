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
							<huan :isOpen="isAir" @percentage="onTemp"></huan>
							<!-- <image src="/static/xingkong/taiyang2.png" mode="widthFix"></image> -->
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
								{{temp}}°
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
				<view @click="switchAir()" class="switch-box flex-center-center"  :class="[!isAir ? 'close' : '']">
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
					<view class="title" :class="[!isAir ? 'close' : '']">
						风速
					</view>
					<view class="content">
						<view class="left">
							<view class="wind-speed-grade">
								<view class="progress-bar">
									<!-- <view class="active-progress-bar" :class="[!isAir ? 'close-bg' : '']">
									</view> -->
									<!-- 风速进度条 -->
									<slider :value="slider.value" :aria-valuenow="slider.value" @change="windSliderChange" @changing="windSliderChangeIng" :step="slider.step" :min="slider.min" :max="slider.max" :activeColor="slider.activeColor" :backgroundColor="slider.backgroundColor" :block-size="slider.blockSize" :disabled="slider.disabled"/>

								</view>
								<view class="wind-speed-describe" :class="[!isAir ? 'close' : '']">
									<view @click="changeWindSpeedModel(item,index)" v-for="(item,index) in threeWindSpeedList" :key='index' class="wind-speed-describe-item" :class="[item.active ? 'active' : '']">
										{{ item.value }}
									</view>
								</view>
							</view>
						</view>
						<view @click="changeWindSpeedModel({},4)" class="right" :class="[windSpeedList[4].active ? 'active' : '']">
							<view class="huan flex-center-center">
								<view class="huan-yuan">

								</view>
							</view>
							<view class="auto-model">
								<!-- {{ autoModel.value }} -->
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
	import {post,get,navigate,switchTab,judgeLogin,toast,debounce} from '@/utils';
	import huan from '../huan/index.vue'; 
	export default {
		components:{huan},
		data() {
			return {
				userId: "",
				token: "",
				id:'',
				roomNo:'',
				bgImg: '/static/xingkong/bg1.png',
				isAir: false,
				modelIndex: 0,
				temp:16,
				// windSliderValue: 33, // 风速拖动值
				// 滑动条对象
				slider: {
					step: 33, // 步长
					value: 0, // 当前值
					min: 0, // 最小值
					max: 100, // 最大值
					activeColor: '#5CC69A', // 活动条颜色
					backgroundColor: '#B9BABF', // 背景条颜色
					blockSize: 22, // 滑块大小	
					disabled: false,
				},
				activeModel: {},
				modelList: [{
						img: '/static/xingkong/cool0.png',
						activeImg: '/static/xingkong/cool1.png',
						value: '制冷',
						active: false,
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
					// {
					// 	img: '/static/xingkong/chushi0.png',
					// 	activeImg: '/static/xingkong/chushi1.png',
					// 	value: '除湿',
					// 	active: false,
					// },
				],
				autoModel: {
					value: '自动',
					active: false,
				},
				activeWindSpeed: {
					value: '低风'
				},
				threeWindSpeedList:[],
				windSpeedList: [
					{
						value: '无风',
						active: false,
					},
					{
						value: '低风',
						active: false,
					},
					{
						value: '中风',
						active: false,
					},
					{
						value: '高风',
						active: false,
					},
					{
						value: '自动',
						active: false,
					},
				],
				info:{},//空调的状态信息
			};
		},
		watch:{
			'windSpeedList': {
				immediate: true,
				handler: function(newVal) {
					// console.log('更新后的过滤条件：', newVal)
					// this.fliters = newVal
					// this.$set(this.fliters, this.fliters, newVal)
					// this.flitersArr = this.fliters.flitersArr
				  this.threeWindSpeedList =	this.windSpeedList.slice(0, 4)
				},
			},
		},
		computed: {
			// threeWindSpeedList() {
			// 	console.log('我在切风速数组')
			// 	return this.windSpeedList.slice(0, 3)
			// },
			nowAir() {
				let model = this.activeModel.value;
				let wind = this.activeWindSpeed.value;
				let res = {
					model,
					wind,
					wendu: '20'
				}
				console.log('现在模式', res)
				return res
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.roomNo = e.roomNo;
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.getInfo();
		},
		methods: {
			getInfo(){
				post('Udp/GetDeviceDetails',{
					UserId: this.userId,
					Token:this.token,
					Id:this.id,
					RoomNo:this.roomNo,
					Type:2
				}).then(res=>{
					if(!res.data)return;
					const data = res.data;
					this.isAir = data.onOff1;
					this.modelList[data.mode1-1].active = true;
					if(data.fan1*1){
						this.windSpeedList[data.fan1-1].active = true; 
					}
					// 自动
					if(data.auto1*1){
						this.changeWindSpeedModel({},4)
					}
					this.info = data;
				})
			},
			// 开关空调
			async switchAir() {
				const that= this;
				const res = await this.onButton(2,this.isAir?0:1)
				console.log(res,'rrr')
				that.isAir = !that.isAir
				if (!that.isAir) {
				// 关闭模式和风速
					that.closeAir()
				} else {
					// 开启
					that.initAll()
				}
			},
			// 设备控制类型
			// 0://灯光（1-开 0-关）
			// 1://调光-亮度（0-100）（0-25-50-75-100）
			// 2://空调（1-开 0-关）
			// 3://空调-温度（16-30℃）
			// 4://空调-模式（1 冷2 热3 通风0 停止）
			// 5://空调-风速手动（1 低速，2 中速，3 高速，0 停止）
			//9://开关门（1-开；0关）
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
			// 关机模式下无法点击
			// allDisable () {
			// 	if(!this.isAir) {
			// 		return false
			// 	}
			// },
			// 模式切换
			async changeModel(item, index) {
				// this.allDisable()
				if (!this.isAir) {
					return false
				}
				// console.log(this.modelList)
				// console.log(Object.prototype.toString.call(this.modelList))
				// console.log(this.modelList.length)
				let n=index*1+1;
				if(n==5){
					n =0;
				}
				await this.onButton(4,n)
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
			// 风速切换-点击切换风速
			async changeWindSpeedModel(item, index) {
				// this.allDisable()
				if (!this.isAir) {
					return false
				}
				await this.onButton(5,index)
				// this.autoModel.active = !this.autoModel.active
				// this.activeWindSpeed.value = this.autoModel.value
				for (let i = 0; i < this.windSpeedList.length; i++) {
					this.windSpeedList[i].active = false
					if (index === i) {
						if(index !== 4 ) {
							
							this.slider.value = i *this.slider.step
						}
						this.windSpeedList[i].active = true
						this.activeWindSpeed = this.windSpeedList[i]
					}
				}
			},
			// 拖动风速变化的
			async windSliderChange(e) {
				let _this = this;
				let step = this.slider.step
				console.log('拖动完：', e.detail.value)
				this.closeSpeedModel()
				if (e.detail.value === 0) {
					if (!this.isAir) {
						return;
					}
					await this.onButton(5,0)
					// this.$nextTick(() => {
					this.slider.value = 0
					// console.log('我是无风', this.slider.value)
					// })
					this.windSpeedList[0].active = true
					this.activeWindSpeed =this.windSpeedList[0]
				} else if (e.detail.value === step * 1) {
					if (!this.isAir) {
						return;
					}
					await this.onButton(5,1)
					this.slider.value = step * 1
					// console.log('我是低风', this.slider.value)
					this.windSpeedList[1].active = true
					this.activeWindSpeed =this.windSpeedList[1]
				} else if (e.detail.value === step * 2) {
					if (!this.isAir) {
						return;
					}
					await this.onButton(5,2)
					this.slider.value = step * 2
					// console.log('我是中风', this.slider.value)
					this.windSpeedList[2].active = true
					this.activeWindSpeed =this.windSpeedList[2]
				} else if (e.detail.value >= step * 3) {
					if (!this.isAir) {
						return;
					}
					await this.onButton(5,3)
					this.slider.value = step * 3
					// console.log('我是高风', this.slider.value)
					this.windSpeedList[3].active = true
					this.activeWindSpeed =this.windSpeedList[3]
				}
			},
			// 拖动风速中
			windSliderChangeIng(e) {
				// console.log('拖动中：', e.detail.value)
				// if (e.detail.value <= 33) {
				// 	this.slider.value = 33
				// 	this.$nextTick(() => {
				// 		console.log('我是低风', this.slider.value)
				// 	})

				// }
			},
			// 初始化模式风速
			initAll() {
				// 活动模式
				for (let i = 0; i < this.modelList.length; i++) {
					this.modelList[i].active = false
					if (i === 0) {
						this.modelList[i].active = true
						this.activeModel = this.modelList[i]
					}
				}

				// 活动风速
				// this.autoModel.active = true
				// this.activeWindSpeed.value = this.autoModel.value
				for (let i = 0; i < this.windSpeedList.length; i++) {
					this.windSpeedList[i].active = false
					if (i === 4) {
						this.windSpeedList[i].active = true
						this.activeWindSpeed = this.windSpeedList[i]
					}
				}
				// 进度条初始化
				this.openSlider()
			},
			// 调整温度
			async onTemp(e){
				console.log('调整温度',e)
				const that = this;
				let temp = parseInt(e/100*15+15)
				this.temp = temp
				debounce(
					function(){
						that.onButton(3,temp)
					}
				)
			},
			// 关闭所有
			closeAir() {
				this.closeModel()
				this.closeSpeedModel()
				// 进度条禁用
				this.closeSlider()
			},
			// 关闭所有模式
			closeModel() {
				for (let i = 0; i < this.modelList.length; i++) {
					this.modelList[i].active = false
				}
			},
			// 关闭所有风速
			closeSpeedModel() {
				for (let i = 0; i < this.windSpeedList.length; i++) {
					this.windSpeedList[i].active = false
				}
			},
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
