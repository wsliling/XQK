<template>
	<!-- 发布 -> 关联星球客 -->
	<view class="relevance">
		<view class="seek">
			<input @confirm="confirm" v-model="Keywords" type="text" value="" placeholder="搜索星球客" />
			<!-- <span class="close" @click="delImg(pindex)">×</span> -->
			<span v-if="Keywords.length" class="close" @click ="emptyKeyWord">×</span>
		</view>
		<view class="releva">
		<!-- 	<view class="record" v-if="IsNearRecords">最近记录</view>
			<view class="record" v-else>推荐列表</view> -->
			<view class="record">{{ msg }}</view>
			<view class="collect-box" v-if="goodList.length" v-for="(val,index) in goodList" :key="index" @click="navigate('product/detail/detail',{Id: val.Id})">
				<!-- <view class="">
					没有更多数据了
				</view> -->
				<view class="collect-left">
					<!-- <image src="http://xqk.wtvxin.com/images/wxapp/of/p1.jpg" mode=""> -->
					<image :src="val.PicNo" mode="aspectFill">
					</image></view>
				<view class="collect-right">
					<view class="name">
						<!-- 广州.从化温泉明月山溪 -->
						{{ val.Name }}
					</view>
					<view class="point">
						<!-- <view class="pointkey">骑行</view>
						<view class="pointkey">游乐</view>
						<view class="pointkey">艺术</view> -->
						<block v-for="(item2,index2) in (val.ServiceKeys)" :key="index2">
							<view v-if="index2 < 5" class="pointkey">{{ item2 }}</view>
						</block>
					</view>
					<view class="font">
						<!-- <view class="num">￥288</view> -->
						<view class="num">￥{{ val.Price }}</view>
						<!-- <view class="iconfont icon-collect"><view class="fz12">4.8<span>(20)</span></view></view> -->
						<!-- <view class="iconfont icon-collect"><view class="fz12">{{ val.CommentScore }}<span>(20)</span></view></view> -->
						<view class="star flex-center">
							<start-level v-if='isStartShow' :myCanvasId="val.Id" :value="val.CommentScore"></start-level>
							<!-- <view class="iconfont icon-collect" v-for="(item3,index3) in val.CommentScore*1" :key="index3"></view>
							<view class="iconfont icon-collect1" v-for="(item4,index4) in (5-(val.CommentScore))" :key="index4"></view> -->
							<view class="fz12">{{ CommentScore(val.CommentScore) }}<span>({{ val.CommentNum }})</span></view>
						</view>
						<view @click.stop="add(index,val.Id)" class="add">添加</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- <view class="anonymous" v-if="goodList.length === 0">
			<view class="anonyimg">
				<image src="http://xqk.wtvxin.com/images/wxapp/of/p5.png" mode=""></image>
			</view>
			<view>暂无记录，可搜索其他星球客选择关联</view>
		</view> -->
		<!-- 数据判断显示 -->
		<!-- <not-data v-if="goodList.length <1"></not-data> -->
		<!-- <uni-load-more :loadingType="loadMore" v-else></uni-load-more> -->
			<!-- <not-data tipsText="小星君正在规划中，现在不如看看别的推荐" tipsTitle="暂无找到匹配的结果" /> -->
		<not-data v-if="!goodList.length && (loadMore==2)" tipsText="暂无记录,可搜索其他星球客选择关联" />
			 <!-- <not-data tipsTitle="" /> -->
		<uni-load-more :loadingType="loadMore" v-if="goodList.length"></uni-load-more>
		<view style="height: 120upx;"></view>
	</view>
</template>

<script>
	import {post,get,navigate,navigateBack} from '@/utils';
	import notData from '@/components/notData.vue';
	import {startLevel} from '@/components/starLevel';
	export default {
		components:{
			notData,
			startLevel
			},
		data() {
			 return {
					msg: '',
					navigate,
					userId: '',
					token: '',
					Keywords:'',
					Page: 1,
					PageSize: 6,
					keyword: '',
					goodList: [],
					RecommendList:[],//推荐列表
					tagList: [],
					notData: false,
					loadMore:0,//0-loading前；1-loading中；2-没有更多了
					IsNearRecords: 1,
					isStartShow: false
				}
			},
			onLoad() {
				console.log('我是关联onLoad的idarr：',this.$store.state.ProIdArr)
				// this.getUserInfo()
				// this.goodList = [1] //用来判断最近到底有没有入住记录
				this.IsNearRecords = 1
				this.msg = '最近入住'
				this.init()
				this.getGoodsList();
				if(this.IsNearRecords === 0){
					console.log('数组空了，准备请求推荐')
					this.IsNearRecords = 0
					this.msg = '为您推荐'
					this.init()
					this.getGoodsList();
				}
				
			},
			methods:{
				close() {
					this.keyword = ''
				},
				confirm() {
					this.goodList = []
					this.IsNearRecords = 0
					this.msg = '搜索结果'
					this.init()
					this.getGoodsList();
				},
				// 获取用户id以及token
				getUserInfo () {
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
				init(){
					this.getUserInfo()
					this.loadMore=0;
					this.Page = 1;
					// console.log('我初始化了-----')
					
				},
				// 获取预订产品列表
				async getGoodsList() {
					let res = {}
					// let res2 = {}
					this.loadMore =1;
					this.getUserInfo()
					// this.userId = this.$store.getters.getUserId;
					// this.token = this.$store.getters.getToken;
					// console.log('vuex---',this.$store.state)
					// console.log('id',this.userId)
					// console.log('Token',this.token)
					
					if(this.IsNearRecords){
						res = await post(
						'Goods/GoodsList_yd',
						// 'Order/OrderList_yd',
						{
							UserId:this.userId,
							Token:this.token,
							Keywords: this.Keywords,
							Page:this.Page,
							PageSize:this.PageSize,
							IsNearRecords: 1  // 最近入住记录
						})
						if(res.data.length === 0) {
							this.IsNearRecords = 0
							// this.msg = '为您推荐'
						}
						// console.log('我是最近入住：',res)
					}else {
						res = await post(
						'Goods/GoodsList_yd',
						{
							UserId:this.userId,
							Token:this.token,
							Keywords: this.Keywords,
							Page:this.Page,
							PageSize:this.PageSize,
							// Sort:3 ,//排序类型
								// 0-默认
								// 1-人气
								// 2-价格
								// 3-推荐
								// 4-距离
								// 5-好评
						})
						// console.log('搜索列表：',res)
					}
					// console.log('我是外面列表：',res)
					
					if(res.data.length<this.PageSize){
						this.loadMore =2;
					}else{
						this.loadMore =0;
					}
					if (!res.data.length) {
						return this.loadMore =2;
					}
					// console.log('获取预定产品列表：', res)
					let ProIdArr = this.$store.state.ProIdArr
					// 处理字符串标签为数组,处理星星个数
					for(let i =0; i < res.data.length;i++){
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

					this.goodList = [...this.goodList,...res.data]
					// this.goodList = res.data
					console.log('处理过goodList：', this.goodList)
					this.isStartShow = true
					
				},
				// 添加方法
				add(index,Id) {
					// 需要删除掉相应的渲染goodList的元素
					// this.goodList.splice(index,1)
					// 添加成功之后，需要去重vuex关联产品id组
					let tempArr = [...new Set( [...this.$store.state.ProIdArr,Id] )]
					if(tempArr.length >5) {
						return uni.showToast({
							title: '最多只能关联5个',
							icon: 'none'
						})
					}
					this.$store.commit('update',{"ProIdArr": tempArr})
					console.log('我是预定产品Id数组：',this.$store.state.ProIdArr)
					navigateBack(200)
					// uni.showToast({
					// 	title:'添加成功！'
					// })
				}
			},
			onReachBottom(){
				if(this.loadMore===2)return;
				this.Page++
				// console.log('我触底了')
				this.getGoodsList()
			},
			// onPullDownRefresh(){
			// 	uni.stopPullDownRefresh()
			// 	this.init();
			// },
			computed: {
				// toNum (str) {
				// 	return (str)=>{
				// 		console.log('评分：',Math.round(str),'str')
				// 		return Math.round(str);
				// 	}
				// 	// Math.round(str)
				// },
				// 分数
				CommentScore (score) {
					return (score)=> {
						// console.log('计算分数',score)
						if(!score)return;
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
	.relevance{
		color:rgba(33,33,33,1);
		font-size:28upx;
		.seek{
			width: 100%;
			background: #fff;
			padding: 30upx 0;
			input{
				font-size:24upx;
				height:64upx;
				line-height: 64upx;
				width:90%;
				background:rgba(242,242,242,1);
				border-radius:32upx;
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
		.releva{
			padding: 20upx 30upx;
			h3{
				font-size:32upx;
				font-weight:bold;
				line-height:3;
			}
			.record{
				padding-bottom: 20upx;
			}
			.collect-box {
				display: flex;
				padding: 30upx;
				background: #fff;
				border-radius:8upx;
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
						.add{
							width:88upx;
							height:44upx;
							border:1upx solid rgba(255,51,51,1);
							border-radius:22upx;
							font-size:24upx;
							font-family:PingFang;
							font-weight:500;
							color:rgba(255,51,51,1);
							line-height:44upx;
							text-align: center;
						}
					}
				}
			}
		}
		.anonymous{
			background: #fff;
			height: 100vh;
			padding: 50upx 0 0 13%;
			.anonyimg{
				width:526upx;
				image{
					width: 100%;
					margin: 0 auto;
				}
			}
		}
	}
</style>
