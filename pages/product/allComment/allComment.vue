<template>
	<div class="comment bgfff pt10">
		<div class="plr30">
			<div class="score plr30 ptb20" v-if="OrderCommentInfo.RankScore">
				<div class="top flex-center">
					<div class="score-num bold">
							{{ CommentScore(OrderCommentInfo.RankScore) }}
					</div>
					<div class="right">
						<div class="tab">超赞</div>
						<div class="starBox flex-center">
							<div class="star flex-center">
								<div class="iconfont icon-collect" v-for="(item,index) in OrderCommentInfo.RankScore*1" :key="index"></div>
								<div class="iconfont icon-collect1" v-for="(item2,index2) in (5-OrderCommentInfo.RankScore)" :key="index2"></div>
							</div>
							<div class="comment-num">{{ OrderCommentInfo.CommentNum }}条评价</div>
						</div>
					</div>
				</div>
				<div class="bottom flex-center-between">
					<div class="item flex-center">
						<p>卫生</p>
						<span>{{ CommentScore(OrderCommentInfo.HealthScore) }}</span>
					</div>
					<div class="item flex-center">
						<p>体验</p>
						<span>{{ CommentScore(OrderCommentInfo.ProductScore) }}</span>
					</div>
					<div class="item flex-center">
						<p>服务</p>
						<span>{{ CommentScore(OrderCommentInfo.ServiceScore) }}</span>
					</div>
					<div class="item flex-center">
						<p>设施</p>
						<span>{{ CommentScore(OrderCommentInfo.FacilityScore) }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="tab-all flex-center">
			<div class="item" :class="{'active':item.id===tagActive}" 
				v-for="(item,index) in tag" :key="index"
				@click="onTag(item)"
			>{{item.name}}</div>
		</div>
		<commentItem v-for="(item,index) in commentList" :key="index" :comment="item"></commentItem>
		<uni-load-more :loadingType="loadMore" v-if="commentList.length&&page>1" />
	</div>
	<!-- <notData ></notData>
	<view class="uni-tab-bar-loading">
		<uni-load-more ></uni-load-more>
	</view> -->
</template>

<script>
	import commentItem from './commentItem.vue';
	import { post } from '@/utils';
	export default {
		components:{commentItem,},
		data() {
			return {
				pageSize: 10,
				page: 1,
				loadingType: 0, //0加载前，1加载中，2没有更多了
				proId:'',
				tag:[
					{id:0,name:'全部'},
					{id:1,name:'有图'},
					{id:2,name:'最新'},
				],
				tagActive:0,
				OrderCommentInfo:{},
				commentList:[],
			}
		},
		onLoad(option) {
			this.proId = option.proId;
			this.getOrderCommentInfo()
			this.init()
		},
		methods: {
			init(){
				this.page=1;
				this.loadingType=0;
				this.commentList=[];
				this.getOrderCommentList()
			},
			// 获取订单评价汇总信息
			async getOrderCommentInfo () {
				let res = await post('Order/OrderCommentInfo',{ProId:this.proId})
				this.OrderCommentInfo = res.data
			},
			// 获取订单评价信息列表
			async getOrderCommentList () {
				this.loadMore =1;
				let res = await post('Order/OrderCommentList',{
					ProId:this.proId,
					Page: 1,
					PageSize:12,
					Type:this.tagActive,
					})
				const data = res.data;
				if(data.length<this.pageSize){
					this.loadMore =2;
				}else{
					this.loadMore =0;
				}
				if(this.page===1){
					this.commentList = [];
				}
				this.commentList.push(...data);
			},
			onTag(item){
				this.tagActive = item.id;
				this.init();
			},
			// 分数
			CommentScore (score) {
					if(!score)return;
					if (score.length > 1) {
						return score
					}
					return score + ".0"
			},
		},
		onReachBottom(){
			if(this.loadMore===2)return;
			this.page+=1;
			this.getOrderCommentList();
		},
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