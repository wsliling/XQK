<template>
	<cover-view class="TabBar bottomAuto">
		<cover-view class="tab" v-for="(item,index) in list" :key="index" @tap="navigatorTo(item.pagePath)">
			<!-- 判断是否有点击，如果没有就不是激活样式，点击就是激活的样式 -->
			<cover-image class="imgsize" v-if="item.type == 0" :src="current == index ? item.selectedIconPath : item.iconPath"
			 mode="widthFix"></cover-image>
			<!-- 设置一个状态值（type），判断加号是否展示 -->
			<cover-image class="addimgsize" v-if="item.type == 1" src="/static/tabbar/f.png" mode="widthFix"></cover-image>
			<cover-view :class="['text',current == index ?'active':'', index==2 ?'text-centent':'']">{{item.text}}</cover-view>
		</cover-view>
	</cover-view>
</template>

<script>
	export default {
		props: {
			current: {
				type: Number,
				default: 0 //默认第一个页面tabbar激活
			}
		},
		data() {
			return {
				list: [{
						"type": 0,
						"pagePath": "/pages/tabBar/index/index",
						"iconPath": "/static/tabbar/ft1.png",
						"selectedIconPath": "/static/tabbar/ft1_in.png",
						"text": "首页"
					},
					{
						"type": 0,
						"pagePath": "/pages/tabBar/starLang/starLang",
						"iconPath": "/static/tabbar/ft2.png",
						"selectedIconPath": "/static/tabbar/ft2_in.png",
						"text": "星语"
					},
					{
						"type": 1,
						"pagePath": "/pages/tabBar/xingkong/xingkong",
						"iconPath": "/static/tabbar/f.png",
						"selectedIconPath": "/static/tabbar/f.png",
						"text": "星控"
					},
					{
						"type": 0,
						"pagePath": "/pages/tabBar/order/order",
						"iconPath": "/static/tabbar/ft3.png",
						"selectedIconPath": "/static/tabbar/ft3_in.png",
						"text": "订单"
					},
					{
						"type": 0,
						"pagePath": "/pages/tabBar/my/my",
						"iconPath": "/static/tabbar/ft4.png",
						"selectedIconPath": "/static/tabbar/ft4_in.png",
						"text": "我的"
					},
				]
			}
        },
        onShow(){
            wx.hideTabBar()
        },
		methods: {
			navigatorTo(e) {
				uni.switchTab({
					url: e,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.TabBar {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 100upx;
		width: 750upx;
		background-color: #fff;//white
		// background-color: rgba(255, 255,255,0);
		// background-color: #FF3333;
		overflow: visible;
		// background: linear-gradient(bottom,  red 0%, red 89%, rgba(255,255,255,0)  98% , rgba(255,255,255,0)   100%);
		// background: linear-gradient(red, orange); 
		// display: flex;
		// justify-content: space-around;
		// align-items: center;
		// z-index: 9;
		z-index: 66;
	}
	.tab {
		// overflow: visible;
		// flex-direction: column;
		// align-items: center;
		// width: 80rpx;
		float: left;
		width: 150upx;
		height: 100upx;
		text-align: center;
		// margin-left: -28upx;
		// margin-left: -24upx;
		position: relative;

		// top: 0;
		.imgsize,
		.addimgsize {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}

		.text {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 10upx;
			text-align: center;
		}

		// transform: translateX(100%);

		// &:nth-child(1) {
		// 	left: 0%;
		// 	transform: translateX(50%);
		// }

		&:nth-child(2) {

			// 	left: 20%;
			// 	// margin-left: -38upx;
			// 	transform: translateX(50%);
			.imgsize,
			.text
				{
				margin-left: -8upx;
			}
		}

		&:nth-child(3) {
			width: 20%;
			// width: 80upx;
			height: 120upx;
			margin-top: -20upx;
			// left: 50%;
			// // margin-left: -8upx;
			// transform: translateX(-50%);
		}


		&:nth-child(4) {
			
			.imgsize,
			.text
				{
				margin-left: 8upx;
			}
			// 	left: 0%;
			// 	// margin-left: -18upx;
			// 	transform: translateX(50%);
			// 	margin-left: 8upx;
		}

		// &:nth-child(5) {
		// 	left: 80%;
		// 	transform: translateX(-50%);
		// }
	}

	.imgsize {
		width: 48upx;
		height: 48upx;
		// margin-top: 10upx;
		margin-top: 10upx;
		overflow: visible;
	}

	.addimgsize {
		width: 80upx;
		height: 80upx;
		// margin-top: -30upx;
		overflow: visible;
	}

	.text {
		font-size: 24upx;
		color: #8a8a8a;
		text-align: left;

	}

	.text-centent {
		text-align: center;
	}

	.text.active {
		color: #5cc69a;
	}
</style>
