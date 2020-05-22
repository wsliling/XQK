<template>
	<div>
		<div class="banner">
			<img src="@/static/of/p1.jpg" alt="" mode="widthFix">
		</div>
		<div class="logoBox flex-column-center">
			<img src="@/static/logo.png" alt="">
			<div class="name bold">星球客</div>
		</div>
		<div class="content">
			<block v-for="(item,index) in 3" :key="index">
				<h3 class="bold flex-center">全景透明</h3>
				<div class="texts">
					<p>产品形态为直径三米的球体，上半部分是透明穹顶，可对景区景色一览无余，下半部分是智能底座，内置有床垫、卫生间用具及智能温控系统等现代化设施。星球客各个部件均已有成熟的供应链，可便捷组装各部件并放置在景区里的各个角落。</p>
					<img src="@/static/of/p1.jpg" alt="">
					<p>产品形态为直径三米的球体，上半部分是透明穹顶，可对景区景色一览无余，下半部分是智能底座，内置有床垫、卫生间用具及智能温控系统等现代化设施。星球客各个部件均已有成熟的供应链，可便捷组装各部件并放置在景区里的各个角落。</p>
				</div>
			</block>
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
.banner{
	img{
		width:100%;
	}
}
.logoBox{
	margin-top:-60upx;
	width:100%;
	img{
		width:120upx;height:120upx;
		border-radius:50%;
	}
	.name{
		line-height:2;
		font-size:36upx;
	}
}
.content{
	padding:0 30upx;
	h3{
		line-height:1;
		margin:40upx 0 30upx;
		color:$primary;
		font-size:30upx;
		padding-left:20upx;
		position:relative;
		&::before{
			content:'';
			display:block;
			width:6upx;
			height:100%;
			background:$primary;
			position:absolute;
			top:0;
			left:0;
		}
	}
	img{
		width:100%;
		margin:20upx 0;
	}
	p{
		color:#666;
		font-size:28upx;
		line-height:1.2;
	}
}
</style>