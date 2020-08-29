<template>
	<!-- 发布 -> 关联星球客 -->
	<view class="relevance">
		<view class="seek">
			<input @confirm="confirm" v-model="Keywords" type="text" value="" placeholder="搜索星球客" />
			<!-- <span class="close" @click="delImg(pindex)">×</span> -->
			<span v-if="Keywords.length" class="close" @click="emptyKeyWord">×</span>
		</view>
		<view class="releva">
			<!-- 	<view class="record" v-if="IsNearRecords">最近记录</view>
			<view class="record" v-else>推荐列表</view> -->
			<view class="record">{{ msg }}</view>
			<!-- 			<related-product :goodList='goodList'></related-product>
 -->
			<div class="list">
				<related-product :goodList='goodList'></related-product>
				<uni-load-more :loadingType="loadMore" v-if="goodList.length"></uni-load-more>
				<block v-if="!goodList.length">
					<!-- <not-data tipsText="暂无记录,可搜索其他星球客选择关联" tipsTitle="暂无找到匹配的结果" /> -->
					<not-data tipsText="暂无记录,可搜索其他星球客选择关联" />
				</block>
				<h3 v-if='RecommendList.length'>为你推荐</h3>
				<!-- <product-item v-for="(item,index) in list" :key="index" :item="item"></product-item> -->
				<!-- <product-item v-for="(item,index) in recommendList" :key="index" :item="item"></product-item> -->
				<related-product :goodList='RecommendList'></related-product>
				<uni-load-more :loadingType="loadMore2" v-if="RecommendList.length"></uni-load-more>
			</div>
		</view>

		<!-- <view class="anonymous" v-if="goodList.length === 0">
			<view class="anonyimg">
				<image src="http://xqk.wtvxin.com/images/wxapp/of/p5.png" mode=""></image>
			</view>
			<view>暂无记录，可搜索其他星球客选择关联</view>
		</view> -->
		<!-- 数据判断显示 -->

		<!-- <not-data v-if="!goodList.length && (loadMore==2)" tipsText="暂无记录,可搜索其他星球客选择关联" /> -->
		<!-- <not-data tipsTitle="" /> -->
		<!-- <uni-load-more :loadingType="loadMore" v-if="goodList.length"></uni-load-more> -->
		<view style="height: 60upx;"></view>
	</view>
</template>

<script>
	import {
		post,
		get,
		navigate,
		navigateBack
	} from '@/utils';
	import { mapState, mapMutations} from "vuex"; //vuex辅助函数
	import notData from '@/components/notData.vue';
	// import {startLevel} from '@/components/starLevel';
	import {
		relatedProduct
	} from '@/components/relatedProduct';
	export default {
		components: {
			notData,
			// startLevel,
			relatedProduct
		},
		data() {
			return {
				msg: '',
				navigate,
				userId: '',
				token: '',
				Keywords: '',
				Page: 1,
				PageSize: 4,
				keyword: '',
				goodList: [],
				RecommendList: [], //推荐列表
				tagList: [],
				notData: false,
				loadMore: 0, //0-loading前；1-loading中；2-没有更多了
				loadMore2: 0,
				Page2: 1,
				PageSize2: 4,
				IsNearRecords: 1,
				onlyRecommend: 0,
				// isStartShow: false
			}
		},
		onLoad() {
			console.log('我是关联onLoad的idarr：', this.$store.state.ProIdArr)
			// this.getUserInfo()
			// this.goodList = [1] //用来判断最近到底有没有入住记录
			this.IsNearRecords = 1
			this.msg = '最近入住'
			this.init()
			this.getGoodsList();
			// if(this.IsNearRecords === 0){
			// 	console.log('数组空了，准备请求推荐')
			// 	this.IsNearRecords = 0
			// 	this.msg = '为您推荐'
			// 	this.init()
			// 	this.getGoodsList();
			// }
		},
		methods: {
			// getRecommendList () {
			// 	if(this.IsNearRecords === 0){
			// 		console.log('数组空了，准备请求推荐')
			// 		this.IsNearRecords = 0
			// 		this.msg = '为您推荐'
			// 		this.init()
			// 		this.getGoodsList();
			// 	}
			// },
			close() {
				this.keyword = ''
			},
			confirm() {
				this.goodList = []
				this.RecommendList = []
				this.IsNearRecords = 0
				this.msg = '搜索结果'
				this.init()
				this.getGoodsList();
			},
			// 获取用户id以及token
			getUserInfo() {
				this.userId = uni.getStorageSync('userId');
				this.token = uni.getStorageSync('token');
			},
			// 清空输入框
			emptyKeyWord() {
				// console.log('点了chacha')
				// 我要清空
				this.Keywords = ''
			},
			// 初始化
			init() {
				this.getUserInfo()
				this.onlyRecommend = 0
				this.loadMore = 0;
				this.Page = 1;
				this.loadMore2 = 0;
				this.Page2 = 1;
				// console.log('我初始化了-----')

			},
			// 获取预订产品列表
			async getGoodsList() {
				let res = {}
				let res2 = {}
				// let res2 = {}
				this.getUserInfo()
				// this.userId = this.$store.getters.getUserId;
				// this.token = this.$store.getters.getToken;
				// console.log('vuex---',this.$store.state)
				// console.log('id',this.userId)
				// console.log('Token',this.token)

				if (this.IsNearRecords && !this.onlyRecommend) {
					this.loadMore = 1;
					this.msg = '最近入住'
					// 最近入住
					res = await post(
						'Goods/GoodsList_yd',
						// 'Order/OrderList_yd',
						{
							UserId: this.userId,
							Token: this.token,
							Keywords: this.Keywords,
							Page: this.Page,
							PageSize: this.PageSize,
							IsNearRecords: 1 ,// 最近入住记录
							MinDate:this.calendarOption.currentRangeStartDate,
							MaxDate:this.calendarOption.currentRangeEndDate
							
						})
					if (res.data.length === 0) {
						this.IsNearRecords = 0
						// this.msg = '为您推荐'
					}
					console.log('我是最近入住：', res)
				} else if (!this.IsNearRecords && !this.onlyRecommend) {
					if (this.Keywords || this.Keywords === '') {
						// 搜索;
						this.loadMore = 1;
						this.msg = '搜索结果'
						res = await post(
							'Goods/GoodsList_yd', {
								UserId: this.userId,
								Token: this.token,
								Keywords: this.Keywords,
								Page: this.Page,
								PageSize: this.PageSize,
								MinDate:this.calendarOption.currentRangeStartDate,
								MaxDate:this.calendarOption.currentRangeEndDate
								
								// Sort:3 ,//排序类型
								// 0-默认
								// 1-人气
								// 2-价格
								// 3-推荐
								// 4-距离
								// 5-好评
							})
						console.log('搜索结果：', res)
					}
				}
				console.log('我是外面列表：', res)
				if (res.data) {
					if (res.data.length < this.PageSize) {
						this.loadMore = 2;
					} else {
						this.loadMore = 0;
					}
					if (!res.data.length) {
						// 如果都是空
						this.loadMore = 2;
					} else {
						// console.log('获取预定产品列表：', res)
						let ProIdArr = this.$store.state.ProIdArr
						// 处理字符串标签为数组,处理星星个数
						for (let i = 0; i < res.data.length; i++) {
							// 处理tag
							let tempArr = res.data[i].ServiceKeys.split(",")
							res.data[i].ServiceKeys = tempArr
							console.log('处理产品列表：', res.data[i].ServiceKeys)
							// 不用处理分数
							// res.data[i].CommentScore = this.toNum(res.data[i].CommentScore)
							// for(let j =0; j < ProIdArr.length;j++){
							// 	if(ProIdArr[j] === res.data[i].Id) {
							// 		console.log('已经添加了',ProIdArr[j],res.data[i].Id)
							// 		res.data[i] = 0
							// 	}
							// }
						}
						switch (this.msg) {
							case '最近入住':
								this.goodList = [...this.goodList, ...res.data]
								console.log('最近入住dadada', this.goodList)
								break;
							case '搜索结果':
								console.log('搜索结果dadada')
								this.goodList = [...this.goodList, ...res.data]
								console.log('搜索结果dadada', this.goodList)
								break;
							default:
								this.RecommendList = [...this.RecommendList, ...res.data]
						}
						// this.goodList = [...this.goodList,...res.data]
					}
				}



				// 如果搜索或者最近入住的结果,都是空的话,再请求一次
				if (!this.goodList.length || this.msg === '最近入住') {
					this.loadMore2 = 1;
					this.onlyRecommend = 1
					// 为您推荐
					res2 = await post(
						'Goods/GoodsList_yd', {
							UserId: this.userId,
							Token: this.token,
							Page: this.Page2,
							PageSize: this.PageSize2,
							IsRecommend: 1,
							MinDate:this.calendarOption.currentRangeStartDate,
							MaxDate:this.calendarOption.currentRangeEndDate
							
							// Sort:3 ,//排序类型
							// 0-默认
							// 1-人气
							// 2-价格
							// 3-推荐
							// 4-距离
							// 5-好评
						})
					console.log('为您推荐：', res2)
					if (res2.data.length < this.PageSize2) {
						this.loadMore2 = 2;
					} else {
						this.loadMore2 = 0;
					}
					if (!res2.data.length) {
						// 如果都是空
						this.loadMore2 = 2;
					}
					for (let i = 0; i < res2.data.length; i++) {
						// 处理tag
						let tempArr = res2.data[i].ServiceKeys.split(",")
						res2.data[i].ServiceKeys = tempArr
						console.log('处理推荐列表：', res2.data[i].ServiceKeys)
					}
					this.RecommendList = [...this.RecommendList, ...res2.data]
					console.log('处理过RecommendList：', this.RecommendList)
				}



				// this.goodList = res.data
				console.log('处理过goodList：', this.goodList)
				// this.isStartShow = true

			},
		},
		onReachBottom() {
			console.log('我触底了')
			if (this.loadMore2 === 2) return
			this.Page2++
			console.log('我触底了11')
			this.getGoodsList()
			if (this.loadMore === 2) return;
			this.Page++
			console.log('我触底了22')
			this.getGoodsList()
		},
		// onPullDownRefresh(){
		// 	uni.stopPullDownRefresh()
		// 	this.init();
		// },
		computed: {
			...mapState(['lng','lat','cityName','cityCode','calendarOption','commonSetting']),
			// 分数
			CommentScore(score) {
				return (score) => {
					// console.log('计算分数',score)
					if (!score) return;
					if (score.length > 1) {
						return score
					}
					return score + ".0"
				}
			},
			// tagInit(item) {
			// 	// return this.item.ServiceKeys
			// 	return (item)=> {
			// 		// if(!item){
			// 		// 	return
			// 		// }
			// 		let tab = item.ServiceKeys.split(",")
			// 		console.log('我是计算后====',tab)
			// 		return tab
			// 	}
			// },
		}
	}
</script>

<style lang="scss" scoped>
	.relevance {
		color: rgba(33, 33, 33, 1);
		font-size: 28upx;

		.seek {
			width: 100%;
			background: #fff;
			padding: 30upx 0;

			input {
				font-size: 24upx;
				height: 64upx;
				line-height: 64upx;
				width: 90%;
				background: rgba(242, 242, 242, 1);
				border-radius: 32upx;
				margin-left: 4%;
				padding-left: 30upx;
			}

			.close {
				position: absolute;
				z-index: 9;
				width: 32rpx;
				height: 32rpx;
				right: 0;
				right: 72upx;
				top: 46upx;
				color: #fff;
				background: #b2b2b2;
				border-radius: 50%;
				text-align: center;
				line-height: 32rpx;
				font-size: 32rpx;
			}
		}

		.releva {
			padding: 20upx 30upx;

			h3 {
				font-size: 32upx;
				font-weight: bold;
				line-height: 3;
			}

			.record {
				padding-bottom: 20upx;
			}

			.collect-box {
				display: flex;
				padding: 30upx;
				background: #fff;
				border-radius: 8upx;
				margin-bottom: 30upx;

				.item__hd {
					margin-top: 40upx;
				}

				.collect-left {
					width: 200upx;
					height: 150upx;
					border-radius: 8upx;
					padding-right: 20upx;

					image {
						width: 100%;
						height: 100%;
						margin: 0 auto;
						border-radius: 10upx;
					}
				}

				.collect-right {
					color: #333333;
					width: 70%;

					.name {
						font-size: 28upx;
					}

					.point {
						display: flex;

						.pointkey {
							height: 46upx;
							background: rgba(92, 198, 154, 0.08);
							border-radius: 4upx;
							font-size: 22upx;
							color: #5cc69a;
							padding: 0 10upx;
							line-height: 46upx;
							margin-right: 15upx;
						}
					}

					.font {
						display: flex;
						justify-content: space-between;
						padding-top: 12upx;

						.num {
							font-size: 24upx;
							color: rgba(255, 51, 51, 1);
							line-height: 40upx;
						}

						.iconfont {
							color: $primary;
							line-height: 1.2;
							display: flex;
						}

						.fz12 {
							// margin-top: 8upx;
							padding-left: 6upx;

							span {
								font-size: 22upx;
								color: rgba(153, 153, 153, 1);
								padding-left: 6upx;

							}
						}

						.add {
							width: 88upx;
							height: 44upx;
							border: 1upx solid rgba(255, 51, 51, 1);
							border-radius: 22upx;
							font-size: 24upx;
							font-family: PingFang;
							font-weight: 500;
							color: rgba(255, 51, 51, 1);
							line-height: 44upx;
							text-align: center;
						}
					}
				}
			}
		}

		.anonymous {
			background: #fff;
			height: 100vh;
			padding: 50upx 0 0 13%;

			.anonyimg {
				width: 526upx;

				image {
					width: 100%;
					margin: 0 auto;
				}
			}
		}
	}
</style>
