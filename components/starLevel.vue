<template>
	<view>
		<!-- <canvas style="width: 200rpx;height: 200rpx;" canvas-id="myCanvas"> </canvas> -->
		<!-- <canvas style="width: 160rpx; height: 56rpx;" canvas-id="myCanvas" class=""></canvas> -->
		<canvas style="width: 170rpx; height: 32rpx;" :canvas-id="myCanvasId" class=""></canvas>
		
	</view>
</template>

<script>
	export default {
		props: {
			total: {
				type: Number,
				default: 10,
			},
			size: {
				type: Number,
				default: 300
			},
			// 上面两个不传，下面两个必需传递，value接收从父组件传过来的score,也就是分数
			value: {
				type: Number,
				default: 4.3
			},
			// myCanvasId 接收唯一值，也就是id
			myCanvasId:{
				type: String,
				default: 'myCanvasId'
			}
		},
		mounted() {
			// this.xin(this.value)
			// this.xing()
			// this.prototype.xin = this.xin(this.value)
			this.$nextTick(()=>{
				// setTimeout(()=> {
						this.xin()
				// }, 3000);
				// console.log('this.value,星星数量',this.value)
			})
			// xin(this.value)
		},
		beforeUpdate() {
			// this.xing()
		},
		computed: {
			// xingxing() {
			// 	return this.xin(this.value)
			// }
		},
		methods: {},
		data() {
			return {
				// score: 2
			};
		},
		// 计算属性
		methods: {
			// xing(){
			// 	const ctx = uni.createCanvasContext('myCanvas')
				
			// 	// Create linear gradient
			// 	const grd = ctx.createLinearGradient(0, 0, 200, 0)
			// 	grd.addColorStop(0, 'green')
			// 	grd.addColorStop(1, 'white')
				
			// 	// Fill with gradient
			// 	ctx.setFillStyle(grd)
			// 	ctx.fillRect(10, 10, 150, 80)
			// 	ctx.draw()
			// 	console.log(ctx)
			// },
			xin() {
				let w = this.$store.state.SystemInfoWidth
				var score = parseFloat(this.value)
				var pscore = parseInt(this.value)
				var yscore = this.value % 1
				var scoreNum = 5 // 星星个数
				var spacing = 0 / 2 * w  // 间距
				var radius = 16 / 2 * w // 半径
				var diameter = radius * 2 // 直径
				// console.log('')
				// 开始画星星
				// var canvas = document.getElementById('myCanvas')
				// let canvas = uni.createCanvasContext('myCanvas');
				// var context = uni.createCanvasContext('#myCanvas', this);
				let context = uni.createCanvasContext(this.myCanvasId,this);
				
			
				// var context = canvas.getContext('2d')
				// context.width = (diameter + spacing) * scoreNum
				// context.height = diameter
				for (let j = 0; j < scoreNum; j++) {
					// console.log('j---------------',j)
					context.beginPath()
					for (let i = 0; i < scoreNum; i++) {
						// console.log('i---------------',i)
						var spotlarge = ((18 + i * 72) / 180) * Math.PI
						var spotsmall = ((54 + i * 72) / 180) * Math.PI
						context.lineTo(
							Math.cos(spotlarge) * radius + radius + (diameter + spacing) * j,
							-Math.sin(spotlarge) * radius + radius
						)
						context.lineTo(
							Math.cos(spotsmall) * (radius / 2) +
							radius +
							(diameter + spacing) * j,
							-Math.sin(spotsmall) * (radius / 2) + radius
						)
					}
					context.closePath()
					var grd = context.createLinearGradient(
						(diameter + spacing) * j,
						0,
						(diameter + spacing) * j + diameter,
						0
					)
					var per = 0
					if (j < pscore) {
						per = 1
					} else if (j == pscore) {
						per = yscore
					} else {
						per = 0
					}
					// grd.addColorStop(per, '#00bebf')
					grd.addColorStop(per, '#5CC69A')
					grd.addColorStop(per, '#ddd')
					context.fillStyle = grd
					// context.setStrokeStyle('red')
					// context.stroke();
					// context.setFillStyle(grd)
					// context.fillRect(10, 10, 150, 80)
					context.fill()
					context.draw(-88,-88)
					// console.log('context',context)
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	// main {
	// 	position: relative;
	// }

	// .star_line {
	// 	/*  设置强制不换行 */
	// 	width-space: nowrap;
	// 	overflow: hidden;
	// 	position: absolute;
	// 	left: 0;
	// 	top: 0;
	// }

	// .star {
	// 	display: inline-block;
	// 	/* 设置当鼠标放到星星上是变成小手样式 */
	// 	cursor: pointer
	// }
</style>
