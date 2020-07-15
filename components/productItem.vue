<template>
        <view class="bigitem" @click="navigate('product/detail/detail',{Id: item.Id})">
            <view class="imgbox">
                <view class="like flex-center-end" @click.stop="onCollect">
                    <view class="iconfont bg" :class="item.CollectionId?'icon-aixin':'icon-aixin2'">
                        <!-- <view class="iconfont"></view> -->
                    </view>
                    <text class="num">{{ item.CollectNum }}</text>
                </view>
                <image :src="item.PicNo" mode="aspectFill"></image>
            </view>
            <view class="txtbox">
                <view class="flex-center-between">
                    <view class="title uni-ellipsis">
                        <!-- 广州.从化温泉明月山溪 -->
						{{ item.Name}}
                    </view>
                    <view class="location" v-if="item.AreaSit">
                        <text class="iconfont icon-weizhi"></text><!-- 广州.从化 -->{{ item.AreaSite }}
                    </view>
                </view>
                <view class="flex-center-between">
                    <view class="tags flex-center">
                        <!-- <text class="tag">旅行</text><text class="tag">游乐</text><text class="tag">艺术</text> -->
						<block v-for="(item,index) in tagInit" :key="index" class="tag">
							<text  class="tag" v-if="index<5">{{ item }}</text>
						</block>
                    </view>
                    <view class="score flex-center-end">
						<div class="star flex-center">
							<div class="star-no iconfont icon-collect1" v-for="(item2,index2) in 5" :key="index2"></div>
							<div class="star-active flex-center" :style="{width:(item.CommentScore/5)*100+'%'}">
								<div class="iconfont icon-collect" v-for="(item,index) in 5" :key="index"></div>
							</div>
						</div>
						<view class="num">{{ CommentScore(item.CommentScore) }}</view>
                        <view class="fz12 c_999">({{ item.CommentNum }})</view>
                    </view>
                </view>
                <view class="flex-center">
                    <view class="price">
                        <text class="yuan">￥</text>{{ item.Price}}
                    </view>
                    <view class="oldprice line-through fz12">
                        <text class="yuan">￥</text>{{ item.MarketPrice }}{{ item.Unit }}
                    </view>
                </view>
            </view>
        </view>
</template>

<script>
import {navigate,requestHideLoading,judgeLogin} from '@/utils'
	export default {
        props:{
            item:{
                type:Object,
                default(){
                    return {
					ServiceKeys:"",
					CollectionId: "",
					}
                }
            },
			// tagInit: [],
			index: 0
        },
		data() {
			return {
				navigate,
				score: 3,
				// tagList: [],
			}
		},
		mounted() {
			// this.$nextTick(()=>{
			// 	// setTimeout(()=> {
			// 			this.score =this.item.CommentScore
			// 	// }, 3000);
				
			// 	console.log('我的分数：',this.score)
			// })
			
		},
		computed:{
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
			toFloat (num) {
				return (num)=>{
					return parseFloat(num)
				}
			},
			toNum (str) {
				return (str)=>{
					console.log('评分：',Math.round(str),'str')
					return Math.round(str);
				}
				// Math.round(str)
			},
		   tagInit: function () {
			 // if(this.index === 0) {
				//  this.index++;
				 
				//  // this.tagList = Object.assign({},this.item.ServiceKeys.split(","))
				//  this.tagList = this.item.ServiceKeys.split(",")
				//  console.log("标签："this.tagList)
				//  return this.tagList
			 // }
			 // return this.item.ServiceKeys
			 if(!this.item.ServiceKeys)return;
			 let tab = this.item.ServiceKeys.split(",")
			 return tab
		   },
		},
		mounted() {
			// console.log("挂载组件",this.item)
		},
		onLoad() {
			
		},
		methods: {
		   async onCollect(){
			   console.log('userid',uni.getStorageSync("userId"));
			   if(!judgeLogin()){return;}
			   const params ={
					UserId:uni.getStorageSync("userId"),
					Token:uni.getStorageSync("token"),
					Type:0,
					Id: this.item.Id
			   }
			   if(this.item.CollectionId){
			   	   await requestHideLoading('User/ReCollections',params,'post')
				   this.item.CollectNum-=1;
			   }else{
			   	   await requestHideLoading('User/AddCollections',params,'post')
				   this.item.CollectNum+=1;
			   }
			   this.item.CollectionId = this.item.CollectionId?0:1;
			   this.$emit('onCollect',this.item)
		   }
		}
	}
</script>
<style scoped lang="scss">

	.bigitem{
		margin-bottom: 30upx;
		border-radius: 15upx;
		overflow: hidden;
		box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.1);

		.txtbox{
			padding: 10upx 20upx;
			.title{
				font-size: 30upx;
			}
			.location{
				color: #999;
				font-size: 24upx;
				.iconfont{ font-size: 26upx; margin-right: 4upx;}
			}
			.tags{
				.tag{
					color: $primary;
					font-size: 24upx;
					background-color: #f2fbf7;
					padding: 2upx 8upx;
					border-radius: 4upx;
					margin-right: 10upx;
				}
			}
			.score{
				position: relative;
				.canvas {
					position: absolute;
					top: 8upx;
					left:-162upx;
					z-index: 0;
				}
				.iconfont{
					color: $primary;
				}
				.num{margin: 0 4upx;}
			}
			.price{ font-size: 32upx; margin-right: 10upx;}
			.yuan{font-size: 24upx;}
			.oldprice{ color: #999;}
		}
	}
.imgbox{
	height: 360upx;
	overflow: hidden;
	image{
		width: 100%;
		height: 100%;
	}
	position: relative;
	.like{
		position: absolute;
		top: 12upx;
		right: 20upx;
		.iconfont.bg{
			color: #fff;
			font-size: 36upx;
			position: relative;
			line-height: 1;
			.iconfont{
				position: absolute;
				font-size: 32upx;
				color: #999;
				line-height: 1;
				top: 2upx;
				left: 2upx;
			}
			.iconfont.active{
				color: #ff6766;
			}
		}
		.num{ color: #fff; margin-left: 10upx;}
	}
}
.star{
	position:relative;
	.star-active{
		position:absolute;
		top:0;
		left:0;
		overflow:hidden;
		div{
			margin-right:7upx;
			font-size:28upx;
		}
	}
	.icon-collect{
		color:$primary;
	}
	.icon-collect1{
		color:#999;
	}
	.star-no{
		margin-right:7upx;
		font-size:28upx;
	}
}
</style>