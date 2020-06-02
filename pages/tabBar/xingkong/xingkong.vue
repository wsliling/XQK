<template>
	<view>
		<tabbar :current="2"></tabbar>
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
		<!-- <view class="handleBox" :style="{background:`url(${imageSrc}) no-repeat center / 100% 90%`}"> -->
		<view class="handleBox">
			<image class="bg2" :style="{background:`url(${imageSrc2}) no-repeat center / 100%`}"></image>
			<view class="top">
				<view class="left">
					<view class="lock">
						<image src="/static/xingkong-icon/lock.png" mode="widthFix"></image>
					</view>
					<view>已办理入住</view>
				</view>
				<view class="right">
					<view class="icon">
						<image src="/static/xingkong-icon/question.png" mode="widthFix"></image>
					</view>
					<view>使用说明</view>
				<view class="icon">
					<image src="/static/xingkong-icon/camera.png" mode="widthFix"></image>
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
								<image src="/static/xingkong-icon/yijianbaoxiu.png" mode="widthFix"></image>
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
								<image src="/static/xingkong-icon/yijianbaoxiu.png" mode="widthFix"></image>
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
								<image src="/static/xingkong-icon/yijianbaoxiu.png" mode="widthFix"></image>
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
											<image src="/static/xingkong-icon/switch.png" mode="widthFix"></image>
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
					<view class="left1 juzhong">
						<view class="dataBox juzhong">
							<view class="num">
								<!-- {{process}} -->
								<!-- 6 -->
								{{Rprocess}}
							</view>
							<view class="text">
								差
							</view>
						</view>
						<!-- <div class="process-circle rotate90 flipy flipx"> -->
						<div class="process-circle rotate90 flipy">
						  <div class="left">
						    <div class="left-process" :style="{transform: 'rotateZ('+leftProcess(Rprocess)+'deg)'}"></div>
						  </div>
						  <div class="right">
						    <div class="right-process" :style="{transform: 'rotateZ('+rightProcess(Rprocess)+'deg)'}"></div>
						  </div>	
						</div>
					</view>
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
		
	</view>
</template>

<script>
	import imageSrc from "@/static/xingkong-icon/wave1.png"
	import imageSrc2 from "@/static/xingkong-icon/wave2.png"
	import tabbar from '@/components/tabbar.vue';
	// import uCharts from '@'
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				imageSrc:imageSrc,
				imageSrc2:imageSrc2,
				process: 4
			}
		},
		onLoad() {
			// this.canvas()
		},
		computed: {
			Rprocess (){
				return 10 - this.process
			},
			leftProcess (process) {
					return (process)=>{
						return process > 5 ? ((process - 5) / 10 * 360 + 135) >> 0 : 135
						// return process < 5 ? process / 10 * 360 + 135 >> 0 : -45
					}
			},

			rightProcess (process) {
				return (process)=> {
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


<style lang="scss" scoped>
	@import './style';
</style>

