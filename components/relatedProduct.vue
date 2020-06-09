<template>
	<view>
		<view class="main-box collect-box" v-for="(val,index) in goodList" :key="index" @click="navigate('product/detail/detail',{Id: val.Id})">
			<!-- <view class="">
				没有更多数据了
			</view> -->
			<view class="collect-left">
				<!-- <image src="http://xqk.wtvxin.com/images/wxapp/of/p1.jpg" mode=""> -->
				<image :src="val.PicNo" mode="aspectFill">
				</image>
			</view>
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
						<start-level :myCanvasId="val.Id" :value="val.CommentScore"></start-level>
						<!-- <view class="iconfont icon-collect" v-for="(item3,index3) in val.CommentScore*1" :key="index3"></view>
						<view class="iconfont icon-collect1" v-for="(item4,index4) in (5-(val.CommentScore))" :key="index4"></view> -->
						<view class="fz12">{{ CommentScore(val.CommentScore) }}<span>({{ val.CommentNum }})</span></view>
					</view>
					<view v-if="isAdd" @click.stop="add(index,val.Id)" class="add">添加</view>
					<view v-else @click.stop="del(val.Id,index)" class="del">
						<image src="@/static/delBox.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {startLevel} from '@/components/starLevel';
	import {
		post,
		get,
		navigate,
		navigateBack
	} from '@/utils';
	export default {
		components: {
			startLevel
		},
		props: {
			goodList:{
				type: Array,
				default: []
			},
			isAdd: {
				type: Boolean,
				default: true,
			}
		},
		data() {
			return {
				navigate,
			};
		},
		computed: {
			CommentScore(score) {
				return (score) => {
					console.log('计算分数', score)
					if (!score) return;
					if (score.length > 1) {
						return score
					}
					return score + ".0"
				}
			},
		},
		methods:{
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
			},
			del(id,index) {
				let tempArr = this.$store.state.ProIdArr
				for(let i =0; i < this.goodList.length;i++) {
					// console.log('id对比=============-',this.goodList[i],this.goodList[i].Id,id,this.$store.state.ProIdArr)
					if(this.goodList[i].Id === id) {
						// console.log('老铁对比--',this.goodList[i].id,id)
						this.goodList.splice(i,1)
						for(let j =0; j < tempArr.length;j++) {
							if(tempArr[j] === id) {
								// 删除成功之后，需要清除掉vuex关联产品id组
								tempArr.splice(j,1)
							}
						}
					}
				}
				this.$store.commit('update',{"ProIdArr": tempArr})
				// console.log('我删除了之后的数组：',this.$store.state.ProIdArr)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main-box {
		&.collect-box {
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
					.del {
						image {
							width: 32upx;
							height: 32upx;
						}
					}
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
</style>
