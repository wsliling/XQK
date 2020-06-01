<template>
	<view>
		<tabbar :current="2"></tabbar>
		<!-- 上面盒子  background:url(bgimg.gif) no-repeat 5px 5px; -->
		<view class="handleBox" :style="{background:`url(${imageSrc}) no-repeat center / 100%`}">
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
			
		</view>
	</view>
</template>

<script>
	import imageSrc from "@/static/xingkong-icon/wave1.png"
	import tabbar from '@/components/tabbar.vue';
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				imageSrc:imageSrc
			}
		},
		methods: {
			
		}
	}
</script>


<style lang="scss" scoped>
	@import './style';
</style>

