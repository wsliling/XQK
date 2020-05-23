<template>
        <view class="bigitem" @click="navigate('product/detail/detail')">
            <view class="imgbox">
                <view class="like flex-center-end">
                    <view class="iconfont icon-aixin bg">
                        <view class="iconfont icon-aixin active"></view>
                    </view>
                    <text class="num">209</text>
                </view>
                <image src="/static/of/p1.jpg" mode="aspectFill"></image>
            </view>
            <view class="txtbox">
                <view class="flex-center-between">
                    <view class="title uni-ellipsis">
                        广州.从化温泉明月山溪
                    </view>
                    <view class="location">
                        <text class="iconfont icon-weizhi"></text>广州.从化
                    </view>
                </view>
                <view class="flex-center-between">
                    <view class="tags flex-center">
                        <text class="tag">旅行</text><text class="tag">游乐</text><text class="tag">艺术</text>
                    </view>
                    <view class="score flex-center-end">
                        <view class="iconfont icon-collect"></view>
                        <view class="num">4.8</view>
                        <view class="fz12 c_999">(20)</view>
                    </view>
                </view>
                <view class="flex-center">
                    <view class="price">
                        <text class="yuan">￥</text>169
                    </view>
                    <view class="oldprice line-through fz12">
                        <text class="yuan">￥</text>280/晚
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
                default(){
                    return {}
                }
            }
        },
		data() {
			return {
				navigate
			}
		},
		mounted() {
		},
		methods: {
		}
	}
</script>
<style scoped lang="scss">

	.bigitem{
		margin-bottom: 20upx;
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		.txtbox{
			padding: 10upx 0;
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