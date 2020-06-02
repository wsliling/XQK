<template>
	<div class="flex-start-between ptb20">
		<div class="flex-start">
			<div class="avatar">
				<img src="http://xqk.wtvxin.com/images/wxapp/of/banner.jpg" alt="">
			</div>
			<div class="center">
				<div class="name ">
					<div class="bold">名字</div>
					<p>2020-05-14</p>
				</div>
				<div class="content pt10">文艺、繁华、却不失自然本质浪漫 温暖、又充满人文温情</div>
			</div>
		</div>
		<div class="zan">
			<div class="collect flex-center">
				<div class="iconfont icon-zan1"></div>
				123
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
		}
	}
</script>
<style scoped lang="scss">
	.avatar{
		img{
			width:76upx;height:76upx;
			margin-right:20upx;
			border-radius:50%;
		}
	}
	.center{
		text-align:left;
		line-height:1.5;
		.name{
			p{
				color:#999;
				font-size:22upx;
			}
		}
		.content{
			color:#484848;
		}
	}
	.zan{
		line-height:2;
		font-size:26upx;
		color:#666;
		.iconfont{
			margin-right:15upx;
		}
	}
</style>