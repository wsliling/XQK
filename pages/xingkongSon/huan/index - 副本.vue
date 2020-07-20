<template>
	<view>
		<sliding-loop-progress-bar id="wxzxCirclePlate" class="mr100"></sliding-loop-progress-bar>
	</view>
</template>

<script>
	import slidingLoopProgressBar from '@/components/sliding-loop-progress-bar/sliding-loop-progress-bar.vue'
	export default {
		components:{
			slidingLoopProgressBar,
		},
		data() {
			return {
			};
		},
		onLoad() {
			this.initCanvas()
		},
		methods:{
			// 初始化canvas
			initCanvas() {
				// this.wxzxCirclePlate = this.selectComponent("#wxzxCirclePlate");
				// this.wxzxCirclePlate.data.drawInit(0.99);
				// console.log(this.wxzxCirclePlate,this.wxzxCirclePlate.drawInit)
			},
		},
	}
</script>

<style lang="scss" scoped>
	// .mr100 {
	// 	padding:100upx 0 0 100upx;
	// }
</style>
