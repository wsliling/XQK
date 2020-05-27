<template>
        <view class="bigitem" @click="navigate('product/detail/detail')">
            <view class="imgbox">
                <view class="like flex-center-end">
                    <view class="iconfont icon-aixin bg">
                        <view class="iconfont icon-aixin" :class="{active : item.CollectionId}"></view>
                    </view>
                    <text class="num">{{ item.CollectNum }}</text>
                </view>
                <image :src="item.PicNo" mode="aspectFill"></image>
            </view>
            <view class="txtbox">
                <view class="flex-center-between">
                    <view class="title uni-ellipsis">
                        <!-- 广州.从化温泉明月山溪 -->
						{{ item.KeywordName }}
                    </view>
                    <view class="location">
                        <text class="iconfont icon-weizhi"></text><!-- 广州.从化 -->{{ item.AreaSite }}
                    </view>
                </view>
                <view class="flex-center-between">
                    <view class="tags flex-center">
                        <!-- <text class="tag">旅行</text><text class="tag">游乐</text><text class="tag">艺术</text> -->
						<block v-for="(item,index) in tagInit" :key="index" class="tag">
							<text  class="tag" v-if="index<4">{{ item }}</text>
						</block>
                    </view>
                    <view class="score flex-center-end">
                        <view class="iconfont icon-collect"></view>
                        <view class="num">{{ item.CommentScore }}</view>
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
import {navigate} from '@/utils'
	export default {
        props:{
            item:{
                type:Object,
				ServiceKeys:"",
				CollectionId: "",
                default(){
                    return {}
                }
            },
			// tagInit: [],
			index: 0
        },
		data() {
			return {
				navigate,
				// tagList: [],
			}
		},
		computed:{
		   tagInit: function () {
			 // if(this.index === 0) {
				//  this.index++;
				 
				//  // this.tagList = Object.assign({},this.item.ServiceKeys.split(","))
				//  this.tagList = this.item.ServiceKeys.split(",")
				//  console.log("标签："this.tagList)
				//  return this.tagList
			 // }
			 console.log("标签2：",this.item)
			 // return this.item.ServiceKeys
			 let tab = this.item.ServiceKeys.split(",")
			 console.log(tab,'tab')
			 return tab
		   }
		},
		// filters:{
		// 	tagInit: function (value) {
		// 	// let arr = value.split(",")
		// 	console.log("标签：")
		// 	return value.split(",")
		// 	}
		// },
		mounted() {
			console.log("挂载组件")
		},
		onLoad() {
			
		},
		methods: {
		}
	}
</script>
<style scoped lang="scss">

	.bigitem{
		margin-bottom: 20upx;
		border-radius: 15upx;
		overflow: hidden;
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
</style>