<template>
	<view>
		<!-- <canvas :style="'width:'+canvasWiidth+'rpx; height:' +canvasHeight +'rpx;'" :canvas-id="myCanvasId" class=""></canvas> -->
		<!-- <div>
		      <canvas ref="canvas1" id="myCanvas" :style='{border: "1px solid #000000",width:"200px",height:"200px" }'/>
		   </div> -->
		<!-- 		<div class="circleProgress_wrapper">
		        <div class="wrapper right">
		            <div class="circleProgress rightcircle"></div>
		        </div>
		        <div class="wrapper left">
		            <div class="circleProgress leftcircle"></div>
		        </div>
		 </div> -->
		<!-- 上面盒子  background:url(bgimg.gif) no-repeat 5px 5px; -->
		<view class="handleBox" :style="{background:`url(${imageSrc}) no-repeat center / 100%`}">
			<!-- <view class="handleBox"> -->
			<!-- <image class="bg2" :style="{background:`url(http://xqk.wtvxin.com/images/wxapp/xingkong-icon/wave2.png) no-repeat center / 100%`}"></image> -->
			<!-- <image class="bg2" :style="{background:`url(${imageSrc}) no-repeat center / 100%`}"></image> -->
			<view class="top">
				<view class="left">
					<view class="lock">
						<image src="http://xqk.wtvxin.com/images/wxapp/xingkong-icon/lock.png" mode="widthFix"></image>
					</view>
					<view>已办理入住</view>
				</view>
				<view class="right">
					<view class="icon">
						<image src="http://xqk.wtvxin.com/images/wxapp/xingkong-icon/question.png" mode="widthFix"></image>
					</view>
					<view>使用说明</view>
					<view class="icon">
						<image src="http://xqk.wtvxin.com/images/wxapp/xingkong-icon/camera.png" mode="widthFix"></image>
					</view>
					<view>景区摄像头</view>
				</view>
			</view>
			<!-- 开关盒子 -->
			<view class="switchBox">
				<!-- 一键的三个盒子 -->
				<view class="oneKey">
					<!-- 报修 -->
					<view class="repairs">
						<view class="circle1 juzhong">
							<view class="circle2 juzhong">
								<image src="http://xqk.wtvxin.com/images/wxapp/xingkong-icon/yijianbaoxiu.png" mode="widthFix"></image>
								<view class="">
									一键报修
								</view>
							</view>
						</view>
					</view>
					<!-- 退房 -->
					<view class="check-out">
						<view class="circle1 juzhong">
							<view class="circle2 juzhong">
								<image src="http://xqk.wtvxin.com/images/wxapp/xingkong-icon/yijiantuifang.png" mode="widthFix"></image>
								<view class="">
									一键退房
								</view>
							</view>
						</view>
					</view>
					<!-- 打扫 -->
					<view class="sweep">
						<view class="circle1 juzhong">
							<view class="circle2 juzhong">
								<image src="http://xqk.wtvxin.com/images/wxapp/xingkong-icon/yijiandasao.png" mode="widthFix"></image>
								<view class="">
									一键打扫
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 开关按钮 -->
				<view class="switchCircleBox">
					<view class="switchCircle1 juzhong">
						<view class="switchCircle2 juzhong">
							<view class="switchCircle3 juzhong">
								<view class="switchCircle4 juzhong">
									<view class="switchCircle5">
										<view class="box juzhong">
											<image src="http://xqk.wtvxin.com/images/wxapp/xingkong-icon/switch.png" mode="widthFix"></image>
											<view class="">
												开门
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 下面盒子 -->
		<view class="infoBox">
			<view class="score">
				<view class="left2 juzhong">
					<circular-progress-bar :canvasWiidth='canvasWiidth' :canvasHeight='canvasHeight' :process='process' :describe='describe'
					 :color='color' :myCanvasId='myCanvasId'></circular-progress-bar>
					<!-- <view class="left1 juzhong">
						<view class="dataBox juzhong">
							<view class="num">
								{{Rprocess}}
							</view>
							<view class="text">
								差
							</view>
						</view>
						<div class="process-circle rotate90 flipy">
						  <div class="left">
						    <div class="left-process" :style="{transform: 'rotateZ('+leftProcess(Rprocess)+'deg)'}"></div>
						  </div>
						  <div class="right">
						    <div class="right-process" :style="{transform: 'rotateZ('+rightProcess(Rprocess)+'deg)'}"></div>
						  </div>	
						</div>
					</view> -->
				</view>
				<view class="right1 juzhong">
					建议提示变为“优”后，再进入星球客
				</view>
			</view>
			<view class="data">
				<view class="dataItem juzhong">
					<view class="text">
						温度
					</view>
					<view class="number">
						28
						<view class="unit">
							℃
						</view>
					</view>
					<view class="rectangle red1">
					</view>
				</view>
				<view class="dataItem juzhong">
					<view class="text">
						湿度
					</view>
					<view class="number">
						92
						<view class="unit">
							%
						</view>
					</view>
					<view class="rectangle green1">
					</view>
				</view>
				<view class="dataItem juzhong">
					<view class="text">
						PM2.5
					</view>
					<view class="number">
						45
					</view>
					<view class="rectangle blue1">
					</view>
				</view>
				<view class="dataItem juzhong">
					<view class="text">
						CO
						<text class="co2">
							2
						</text>
						浓度
					</view>
					<view class="number">
						28
					</view>
					<view class="rectangle yellow1">
					</view>
				</view>
			</view>
			<!-- 环形图测试 -->
			<!-- 			<div id="progress">
			      <span></span>
			</div> -->
		</view>
		<!-- <tabbar-copy :current="2"></tabbar-copy> -->
		<tabbar :current="2"></tabbar>
		<cover-view style="height: 120rpx;" @click="switchTab('tabBar/xingkong/xingkong')" class="xingkong-box bottomAuto">
			<cover-image class="xingkong-img" src="/static/tabbar/f.png"></cover-image>
		</cover-view>
	</view>
</template>

<script>
	// import imageSrc from "@/static/xingkong-icon/xingkong-bg.png"
	import circularProgressBar from '@/components/circularProgressBar.vue';
	import tabbar from '@/components/tabbar.vue';

	// import uCharts from '@'
	export default {
		components: {
			tabbar,
			circularProgressBar,
		},
		data() {
			return {
				imageSrc: 'http://xqk.wtvxin.com/images/wxapp/xingkong-icon/xingkong-bg.png',
				// 星控的环形图数据
				process: 1, // 分数 0 ~10
				describe: '优', // 描述
				color: '#ff0000', // 描述文字颜色
				canvasHeight: 222, // 固定的高度，不用改
				canvasWiidth: 222, // 固定的宽度，不用改
				myCanvasId: 'myCanvasId' // 固定的id，不用改
			}
		},
		onLoad() {
			// console.log('我要花花了')
			// this.canvas()
		},
		computed: {
			Rprocess() {
				return this.process
			},
			leftProcess(process) {
				return (process) => {
					return process > 5 ? ((process - 5) / 10 * 360 + 135) >> 0 : 135
					// return process < 5 ? process / 10 * 360 + 135 >> 0 : -45
				}
			},

			rightProcess(process) {
				return (process) => {
					return process < 5 ? (process / 10 * 360 + 135) >> 0 : -45
					// return process > 5 ? (process - 5)/ 10 * 360 + 135 >> 0 : 135
				}
			},
			// leftProcess (process) {
			// 		return ()=>{
			// 			return process > 50 ? (process - 50) / 100 * 360 + 135 >> 0 : 135
			// 		}
			// },
			// rightProcess () {
			// 	return this.process < 50 ? this.process / 100 * 360 + 135 >> 0 : -45
			// }
		},
		methods: {
			// add () {
			// 	this.process--
			// 	console.log(this.process)
			// },
			// 获取屏幕宽度
			getRatio() {
				let w = 0;
				uni.getSystemInfo({
					success: function(res) {
						console.log(res)
						w = res.windowWidth / 375; //按照750的屏宽
					},
				})
				return w
			},
			canvas() {
				//百分比
				// var w =  this.getRatio();
				let w = this.$store.state.SystemInfoWidth
				// var w = 1
				console.log(w)
				let percent = this.process;
				let color = this.color
				let value = percent * 10
				let c_width = this.canvasWiidth / 2 / 2 * w
				let c_height = this.canvasHeight / 2 / 2 * w
				let radius1 = 87 / 2 * w
				let radius2 = 52 / 2 * w
				let radius3 = 66 / 2 * w
				let lineWidth = 14 / 2 * w
				let fontSize1 = 40 / 2 * w
				let fontSize2 = 28 / 2 * w
				let text = this.process
				let describe = this.describe
				let offsetY = 22 / 2 * w
				// const ctx = document.getElementById("myCanvas").getContext("2d");
				let ctx = uni.createCanvasContext(this.myCanvasId, this);
				ctx.save()
				// 阴影的x偏移
				ctx.shadowOffsetX = 0;
				// 阴影的y偏移
				ctx.shadowOffsetY = 0;
				// 阴影颜色
				ctx.shadowColor = 'rgba(0,0,0,0.3)';
				// 阴影的模糊半径
				ctx.shadowBlur = 30 / 2 * w;
				//外圆环
				ctx.beginPath();
				ctx.arc(c_width, c_height, radius1, 0, 2 * Math.PI);
				ctx.strokeStyle = "#fff";
				ctx.fillStyle = "#fff";
				ctx.fill();

				ctx.stroke();
				ctx.restore();
				//内圆环
				ctx.beginPath();
				ctx.arc(c_width, c_height, radius3, 0, 2 * Math.PI);
				// ctx.strokeStyle = "#fff";
				// ctx.fillStyle = "#EDEDED";
				ctx.lineWidth = lineWidth;
				ctx.lineCap = "round";
				ctx.strokeStyle = "#EDEDED";
				// ctx.fill();
				ctx.stroke();
				//内圆环
				ctx.beginPath();
				ctx.arc(c_width, c_height, radius2, 0, 2 * Math.PI);
				ctx.strokeStyle = "#fff";
				ctx.fillStyle = "#fff";
				ctx.fill();
				ctx.stroke();
				//环形图的进度条
				ctx.beginPath();
				ctx.arc(c_width, c_height, radius3, -Math.PI / 2, -Math.PI / 2 + percent / 10 * (Math.PI * 2), false);
				ctx.lineWidth = lineWidth;
				ctx.lineCap = "round";
				ctx.strokeStyle = "rgb(255, 127, 105)";
				ctx.stroke();
				//在中间写字  
				// ctx.font = "bold 40rpx 微软雅黑";  // 字体大小，样式
				// ctx.fillStyle = color;  // 颜色
				// ctx.textAlign = 'center';  // 位置
				// ctx.textBaseline = 'middle';  
				// ctx.moveTo(c_width/2, c_height/2);  // 文字填充位置
				// ctx.fillText(value+"%", c_width/2, c_height/2-20);
				// ctx.fillText("正确率", c_width/2, c_height/2+20);

				ctx.setFontSize(fontSize1);
				// ctx.setFillStyle('#666666');
				ctx.fillStyle = color; // 颜色
				ctx.textAlign = 'center'; // 位置
				ctx.textBaseline = 'middle';
				ctx.fillText(text, c_width, c_height - offsetY)
				ctx.save();
				ctx.restore();

				ctx.setFontSize(fontSize2);
				// ctx.setFillStyle('#666666');
				ctx.fillStyle = color; // 颜色
				ctx.textAlign = 'center'; // 位置
				ctx.textBaseline = 'middle';
				ctx.fillText(describe, c_width, c_height + offsetY)
				ctx.save();
				ctx.restore();
				// 绘制
				ctx.draw(0, 0)

			}
			// canvas () {
			// 	let percent=0.7;

			//     // const ctx = document.getElementById("myCanvas").getContext("2d");
			// 	const ctx = this.$refs.canvas1.getContext("2d");

			//     //外圆环
			//     ctx.beginPath();
			//     ctx.arc(100, 100, 50, 0, 2 * Math.PI);
			//     ctx.strokeStyle = "#fff";
			//     ctx.fillStyle = "#EDEDED";
			//     ctx.fill();
			//     ctx.stroke();
			//     //内圆环
			//     ctx.beginPath();
			//     ctx.arc(100, 100, 40, 0, 2 * Math.PI);
			//     ctx.strokeStyle = "#fff";
			//     ctx.fillStyle = "#fff";
			//     ctx.fill();
			//     ctx.stroke();
			//     //环形图的进度条
			//     ctx.beginPath();
			//     ctx.arc( 100,100, 44, -Math.PI / 2,-Math.PI / 2 + percent * (Math.PI * 2),false);
			//     ctx.lineWidth = 8;
			//     ctx.lineCap = "round";
			//     ctx.strokeStyle = "rgb(255, 127, 105)";
			//     ctx.stroke();
			// }
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
</style>
<style lang="scss" scoped>
	@import './style';
</style>
