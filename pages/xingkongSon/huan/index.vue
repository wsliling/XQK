<template>
<div>
	<view class="box">
		<canvas :style="{width:canvasWiidth+'rpx',height: canvasHeight +'rpx',background: 'rgba(255,255,155,0)'}" 
			:canvas-id="myCanvasId"
		 	class="" 
			 @touchstart='handleTouchStart' 
			 @touchmove='handletouchmove'>
		</canvas>
		<img src="@/static/icons/deng.png" alt="">
	</view>
</div>
</template>

<script>
	import dengImg from '@/static/icons/deng.png';
	export default {
		props: {
			canvasWiidth: {
				type: Number,
				default: 300
			},
			canvasHeight: {
				type: Number,
				default: 300
			},
			isOpen:{
				type:Boolean,
				default:false
			},
		},
		data() {
			return {
				myCanvasId: 'myCanvasId',
				properties:

				{
					startAngle: -Math.PI / 1, // 起始角度
					lastAngle: Math.PI / 0.2, // 终止角度
					// startAngle: Math.PI *0.8, // 起始角度
					// lastAngle: Math.PI *0.2, // 终止角度
					touchCircleR: 8, // 触摸圆的半径

					touchCircleColor: '#fff', // 触摸圆颜色
					isCanTouch: false, // 是否相应触摸事件


					circleR: 70, // 指定轨道上出现触摸圆，

					progressValue: 0, // 当前进度

					circleCenterX: 75, // 大圆圆心坐标X轴

					circleCenterY: 75, // 大圆圆心坐标Y轴

					circleCenterR: 60, // 大圆圆心半径

					circleCenterColor: 'rgba(255,255,255,.4)', // 大圆圆环颜色

					circleCenterWidth: 3, // 大圆圆环宽度

					progressCircleColor: 'rgba(255,255,255,1)', // 进度圆环颜色

					progressCircleWidth: 3, // 进度圆环宽度

					// gearWheelDefaultColor: '#45e03c', // 齿轮默认颜色
					gearWheelDefaultColor: 'rgba(144, 0, 120, 0)', // 齿轮默认颜色

					gearWheelActiveColor: 'rgba(144, 0, 120, 1.0)', // 齿轮激活颜色
					// gearWheelActiveColor: '#00FF95', // 齿轮激活颜色
					

				},

			};
		},
		mounted() {
			this.drawInit(0.68)

		},
		methods: {
			// 绘制外圈
			whiteRedCircle(context) {
				context.save();
				context.beginPath();
				context.lineWidth = this.properties.circleCenterWidth; //设置线宽
				context.strokeStyle = this.properties.circleCenterColor;
				context.arc(this.properties.circleCenterX, this.properties.circleCenterY, this.properties.circleCenterR, 0.8*Math.PI, Math.PI *
					0.2, false);
				context.stroke();
				context.closePath();
				context.restore();
				// context.drawImage(dengImg,0,0,100,100);
				// context.draw();
			},
			// 绘制进度外圈
			drawWhiteCircle(context, n) {
				context.save();
				context.strokeStyle = this.properties.progressCircleColor; //设置描边样式
				context.lineWidth = this.properties.progressCircleWidth; //设置线宽
				context.beginPath(); //路径开始
				console.log(n,'百分比？')
				// if(n>225){
				// 	n = n-225;
				// }else if(n<135){
				// 	n = n+135;
				// }
				let num = Math.PI *( (n-0.25)*2)
				context.arc(this.properties.circleCenterX, this.properties.circleCenterY, this.properties.circleCenterR, 
				0.8*Math.PI, num, false); //用于绘制圆弧           context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
				context.stroke(); //绘制
				context.closePath(); //路径结束
				context.restore();
			},
			// 绘制齿轮
			drawGearWheel(context, rateNum) {
				// context.translate(this.properties.circleCenterX, this.properties.circleCenterY);
				context.save();
				let hasOver = parseInt(rateNum * 100);
				for (let i = 0; i < 100; i++) {
					context.beginPath();
					context.setLineWidth(1);
					if (i > hasOver) {
						context.setStrokeStyle(this.properties.gearWheelDefaultColor);
						context.moveTo(0, -110);
					} else if (i >= hasOver - 2 && i <= hasOver + 1) {
						/*  这是进度末端部 */
						context.setStrokeStyle(this.properties.gearWheelActiveColor);
						context.moveTo(0, -115);
					} else {
						context.moveTo(0, -110);
						context.setStrokeStyle(this.properties.gearWheelActiveColor);
					}

					context.lineTo(0, -95);
					context.stroke();
					context.rotate(3.6 * Math.PI / 180);
				}
			},
			// 绘制触摸圆
			drawTouchCirclr(context, rateNum) {
				context.translate(this.properties.circleCenterX, this.properties.circleCenterY);
				context.save();
				context.beginPath();
				context.lineWidth = this.properties.touchCircleR * 1; //设置线宽
				context.strokeStyle = this.properties.touchCircleColor;
				context.arc(
						// this.properties.circleCenterX + this.properties.circleR * Math.sin(rateNum * Math.PI * 2), 
						// this.properties.circleCenterY - this.properties.circleR * Math.cos(rateNum * Math.PI * 2),
						1+58 * Math.sin(rateNum * Math.PI * 2), 
						1-58 * Math.cos(rateNum * Math.PI * 2),
						this.properties.touchCircleR, 
						0, Math.PI * 2, false);
				context.stroke();
				context.closePath();
				context.beginPath();
				context.fillStyle = "#5cc69a";
				context.arc(
						// this.properties.circleCenterX + this.properties.circleR * Math.sin(rateNum * Math.PI * 2), 
						// this.properties.circleCenterY - this.properties.circleR * Math.cos(rateNum * Math.PI * 2),
						1+58 * Math.sin(rateNum * Math.PI * 2), 
						1-58 * Math.cos(rateNum * Math.PI * 2),
						5, 
						0, Math.PI * 2, false);
				context.fill();
				context.closePath();
				context.restore();
			},
			// 写文字 
			drawText(ctx, str) {
				ctx.setFontSize(20);
				ctx.setTextAlign('center');
				let rel = parseInt((this.properties.startAngle + str * Math.PI * 2 + Math.PI / 2) * 100 / (2 * Math.PI));
				let showText = rel + '%';
				ctx.fillText(showText, this.properties.circleCenterX, 20);
			},
			// 重绘canvas
			drawInit(rateNum) {
				// 我在重绘了
				console.log('绘制角度/360',rateNum)
				// const ctx = wx.createCanvasContext('myCanvasId', this);
				let ctx = uni.createCanvasContext(this.myCanvasId, this);
				// ctx.clearRect(0, 0, this.canvasWiidth, this.canvasHeight)
				// this.drawText(ctx, rateNum);
				this.whiteRedCircle(ctx,rateNum);
				this.drawWhiteCircle(ctx, rateNum);
				this.drawTouchCirclr(ctx, rateNum);
				// this.drawGearWheel(ctx, rateNum);
				ctx.draw();
				this.properties.progressValue = rateNum
				this.properties.lastAngle = 360 * rateNum
				// console.log('最终角度',this.properties.progressValue,this.properties.lastAngle)
				// this.setData({
				// 	progressValue: rateNum,
				// 	lastAngle: 360 * rateNum
				// });
			},
			// 计算角度
			canculateRate(newX, newY) {
				const MathX = Math.abs(newX - this.properties.circleCenterX);
				const MathY = Math.abs(newY - this.properties.circleCenterY);
				// console.log(`计算之后的角度newX:${newX}`)
				// console.log(`计算之后的角度newY:${newY}`)
				// console.log(`计算之后的角度this.properties.circleCenterX:${this.properties.circleCenterX}`)
				// console.log(`计算之后的角度this.properties.circleCenterY:${this.properties.circleCenterY}`)
				// console.log(`计算之后的角度MathX:${MathX}`)
				// console.log(`计算之后的角度MathY:${MathY}`)
				if (MathX == 0 || MathY == 0) {
					return;
				}
				// 计算移动终点相对圆心转过的角度
				let angle;
				if (newX > this.properties.circleCenterX && newY < this.properties.circleCenterY) { //第一象限
				// console.log('第一象限')
					angle = Math.atan(MathX / MathY) * 180 / Math.PI;
				} else if (newX >= this.properties.circleCenterX && newY >= this.properties.circleCenterY) { // 第二象限
				// console.log('第二象限')
					angle = 180 - Math.atan(MathX / MathY) * 180 / Math.PI;
				} else if (newX <= this.properties.circleCenterX && newY >= this.properties.circleCenterY) { //第三象限
				// console.log('第三象限')
					angle = 180 + Math.atan(MathX / MathY) * 180 / Math.PI;
				} else { // 第四象限
				// console.log('第四象限')
					angle = 360 - Math.atan(MathX / MathY) * 180 / Math.PI;
				}
				console.log(angle,'转动的角度1',this.properties.lastAngle)
				// if(parseInt(angle) ==135){
				// 	angle = 135
				// }else if(parseInt(angle) ==225){
				// 	angle = 225
				// }
				if(angle<240&&angle>120){
					if(angle-this.properties.lastAngle>0||angle==120){
						
						angle = 120
					}else if(angle-this.properties.lastAngle<0||angle==240){
						
						angle = 240
					}
				}
				// if (angle - this.properties.lastAngle > 180) { // 当为零届点向左移动
				// 	// angle = 0;
				// 	angle = 135;
				// } else if (angle - this.properties.lastAngle < -180) { // 当为临届点向右移动
				// 	// angle = 360;
				// 	angle = 225;
				// }
				// 转动的进度
				let rateNum = angle / 360;

				this.drawInit(rateNum);
				// 转成百分比
				let percentage=angle;
				if(percentage<=360&&percentage>=240){
					percentage-=240;
				}else if(percentage>=0&&percentage<=120){
					percentage+=120;
				}
				console.log(percentage,'percentage')
				this.$emit('percentage',parseInt((percentage / 240)*100));
				// this.properties.progressValue = rateNum
				// this.properties.lastAngle =  angle
				// console.log('计算之后的:progressValue', this.properties.progressValue, '计算之后的:lastAngle',this.properties.lastAngle)
				

			},
			// 触摸移动方法
			handletouchmove(event) {
				if(!this.isOpen)return
				if (this.properties.isCanTouch) {
					// console.log(event)
					this.canculateRate(event.changedTouches[0].x, event.changedTouches[0].y);
					// let detail = event.changedTouches;
					// let option = {};
					// this.triggerEvent('handletouchmove', detail, option);
					// this.handletouch	move(event);
				}
			},
			// 触摸开始方法
			handleTouchStart(event) {
				let x = event.touches[0].x;
				let y = event.touches[0].y;

				let touchCircleX = 150 + this.properties.circleR * Math.sin(this.properties.progressValue * Math.PI * 2);
				let touchCircleY = 150 - this.properties.circleR * Math.cos(this.properties.progressValue * Math.PI * 2);

				if (touchCircleX + this.properties.touchCircleR * 2 < x || x < touchCircleX - this.properties.touchCircleR * 2 ||
					touchCircleY +
					this.properties.touchCircleR * 2 < y || y < touchCircleY - this.properties.touchCircleR * 2) {
					console.log('我拖不动了')
					this.properties.isCanTouch = true
				} else {
					console.log('我拖的动')
					this.properties.isCanTouch = true
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.rotate225 {
		transform: rotate(225deg);
	}
	.box{
		// margin-top:50upx;
		// margin-left:50upx;
		position:relative;
		img{
			position:absolute;
			z-index:-1;
			width:150upx;
			height:150upx;
			top:70upx;left:75upx;
		}
	}
</style>
