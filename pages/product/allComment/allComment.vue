<template>
	<div class="comment bgfff pt10">
		<div class="plr30">
			<div class="score plr30 ptb20">
				<div class="top flex-center">
					<div class="score-num bold">
						4.9
					</div>
					<div class="right">
						<div class="tab">超赞</div>
						<div class="starBox flex-center">
							<div class="star flex-center">
								<div class="iconfont icon-collect" v-for="(item,index) in 4" :key="index"></div>
								<div class="iconfont icon-collect1"></div>
							</div>
							<div class="comment-num">249条评价</div>
						</div>
					</div>
				</div>
				<div class="bottom flex-center-between">
					<div class="item flex-center">
						<p>卫生</p>
						<span>5.0</span>
					</div>
					<div class="item flex-center">
						<p>体验</p>
						<span>5.0</span>
					</div>
					<div class="item flex-center">
						<p>服务</p>
						<span>5.0</span>
					</div>
					<div class="item flex-center">
						<p>设施</p>
						<span>5.0</span>
					</div>
				</div>
			</div>
		</div>
		<div class="tab-all flex-center-between">
			<div class="item" :class="{'active':index===1}" v-for="(item,index) in 5" :key="index">全部(200)</div>
		</div>
		<commentItem v-for="(item,index) in 12" :key="index"></commentItem>
	</div>
	<!-- <notData ></notData>
	<view class="uni-tab-bar-loading">
		<uni-load-more ></uni-load-more>
	</view> -->
</template>

<script>
	import notData from "@/components/notData"; //没有数据的通用提示
	import commentItem from './commentItem.vue';
	export default {
		components:{commentItem,notData,},
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
		},
		onReachBottom(){
		},
		onPullDownRefresh(){
			uni.stopPullDownRefresh()
		}
	}
</script>
<style scoped lang="scss">

.comment{
	.score{
		box-shadow:0 0 10upx #eee;
		.top{
			margin-bottom:10upx;
			.score-num{
				font-size:96upx;
				line-height:1;
				margin-right:20upx;
			}
			.right{
				.tab{
					background:$primary;
					color:#fff;
					display:inline-block;
					padding:0 20upx;
					line-height:40upx;
					font-size:22upx;
					border-radius:7upx;
					position:relative;
					&::before{
						content:'';
						position:absolute;
						left:-5upx;
						top:17upx;
						background:$primary;
						width:10upx;height:10upx;
						transform:rotate(45deg);
					}
				}
				.starBox{
					font-size:22upx;
					color:#999;
					.star{
						.icon-collect{
							color:$primary;
						}
						.icon-collect1{
							color:#999;
						}
						div{
							margin-right:7upx;
							font-size:28upx;
						}
					}
				}
			}
		}
		.bottom{
			.item{
				p{
					font-size:24upx;
					color:#999;
					margin-right:10upx;
				}
				span{
					font-size:36upx;
					color:#666;
				}
			}
		}
	}
	.tab-all{
		padding-top:30upx;
		padding-left:30upx;
		width:750upx;
		flex-flow:row wrap;
		.item{
			padding:0 20upx;
			line-height:57upx;
			font-size:24upx;
			margin-right:30upx;
			margin-bottom:20upx;
			background:#f1f1f1;
			border-radius:5upx;
			flex:0 0 auto;
			&.active{
				color:#fff;
				background:$primary;
			}
		}
	}
}
</style>