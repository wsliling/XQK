<template>
	<div class="p20 bb1">
		<div class="top flex-center-between">
			<div class="userInfo flex-center">
				<img src="http://xqk.wtvxin.com/images/wxapp/of/p2.jpg" alt="">
				<div class="info">
					<div class="name">{{ comment.NickName }}</div>
					<!-- <p>2020-01-20</p> -->
					<p>{{ comment.AddTime }}</p>
				</div>
			</div>
			<div class="score">
				<!-- <p>4.0</p> -->
				<p>{{ comment.Rank }}</p>
				<div class="star flex-center">
					<!-- <div class="iconfont icon-collect" v-for="(item,index) in 4" :key="index"></div>
					<div class="iconfont icon-collect1"></div> -->
					<div class="iconfont icon-collect" v-for="(item,index) in comment.Rank" :key="index"></div>
					<div class="iconfont icon-collect1" v-for="(item2,index2) in ( 5- comment.Rank)" :key="index2"></div>
				</div>
			</div>

		</div>
		<div class="content" v-html="comment.ContentText">
		</div>
		<div class="imgList flex-center-between">
			<!-- <img src="http://xqk.wtvxin.com/images/wxapp/of/p2.jpg" alt="" v-for="(item,index) in 4" :key="index"> -->
			<img :src="item.PicUrl" alt="" v-for="(item,index) in comment.PicData" :key="index">
		</div>
	</div>
</template>

<script>
	export default {
		props:["comment"],
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

	.userInfo{
		img{
			border-radius:50%;
			margin-right:20upx;
			width:100upx;height:100upx;
		}
		.info{
			.name{
				font-size:32upx;
				line-height:1.5;
			}
			p{
				font-size:24upx;color:#666;
			}
		}
	}
	.score{
		text-align:right;
		line-height:1.5;
		.star{
			div{
				margin-left:5upx;
				font-size:20upx;
			}
			.icon-collect{
				color:$primary;
			}
			.icon-collect1{
				color:#999;
			}
		}
	}
	.content{
		font-size:32upx;line-height:1.3;
		margin-top:20upx;word-break: break-all;
	}
	.imgList{
		margin-top:20upx;
		img{
			width:160upx;height:160upx;
			border-radius:10upx;
		}
	}
</style>