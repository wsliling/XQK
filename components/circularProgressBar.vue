<template>
	<view>
		<canvas :style="'width:'+canvasWiidth+'rpx; height:' +canvasHeight +'rpx;'" :canvas-id="myCanvasId" class=""></canvas>
	</view>
</template>

<script>
	export default {
		props: {
			canvasWiidth: {
				type: Number,
				default: 222
			},
			canvasHeight: {
				type: Number,
				default: 222
			},
			// 0~10
			process: {
				type: Number,
				default: 4
			},
			// 描述文字
			describe: {
				type: String,
				default: '好'
			},
			// 文字颜色
			color: {
				type: String,
				default: '#ff0000'
			},
			myCanvasId: {
				type: String,
				default: 'myCanvasId'
			},
		},
		data() {
			return {

			};
		},
		mounted() {
			this.canvas()
		},
		watch:{
			process(){
				this.canvas()
			}
		},
		methods: {
			canvas() {
				//百分比
				let w = this.$store.state.SystemInfoWidth
				// console.log(w)
				let c_width = this.canvasWiidth / 2 / 2 * w
				let c_height = this.canvasHeight / 2 / 2 * w
				let percent = this.process;
				let color = this.color
				let text = this.process
				let describe = this.describe
				let radius1 = 87 / 2 * w
				let radius2 = 52 / 2 * w
				let radius3 = 66 / 2 * w
				let lineWidth = 14 / 2 * w
				let fontSize1 = 40 / 2 * w
				let fontSize2 = 28 / 2 * w
				let offsetY = 22 / 2 * w
				// const ctx = document.getElementById("myCanvas").getContext("2d");
				let ctx = uni.createCanvasContext(this.myCanvasId, this);
				ctx.clearRect(0,0,this.canvasWiidth,this.canvasHeight)
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
				ctx.strokeStyle = color;
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
		}
	}
</script>

<style lang="scss">

</style>
