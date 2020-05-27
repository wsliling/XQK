<template>
	<view class="item" @click="navigate('starLangSon/detail')">
		<view class="itembox">
			<view class="imgbox">
				<view class="like flex-center">
					<view class="iconfont icon-aixin bg">
						<view class="iconfont icon-aixin"></view>
					</view>
					<text class="num">209</text>
				</view>
				<image :src="item.pic" mode="aspectFill" class="pic"></image>
			</view>
			<view class="txtbox">
				<view class="title uni-ellipsis2 uni-mb5">
					{{item.name}}
				</view>
				<view class="flex-center-between">
					<view class="tx flex-center">
						<image src="/static/logo.png" mode="aspectFill"></image>
						<text class="author uni-ellipsis">小星君</text>
					</view>
					<view class="zan flex-center active">
						<text class="iconfont icon-zan1"></text>
						<text class="num">30</text>
					</view>
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
		onLoad() {
		},
		methods: {
		}
	}
</script>
<style scoped lang="scss">
	
	.item{
		display: flex;
		flex-direction: column;
		width: 336upx;
		margin-bottom: 20upx;
		.itembox{
			background-color: #fff;
			border-radius: 12upx;
			overflow: hidden;
			box-shadow: 0 4upx 12upx rgba(0,0,0,0.1);
		}
		.imgbox{
			height: auto;
			position: relative;
			.like{
				position: absolute;
				top: 12upx;
				right: 20upx;
				z-index: 2;
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
			.pic{
				height:440upx;
			}
		}
		.txtbox{
			padding: 20upx;
			.title{
				line-height: 1.4;
			}
			.tx{
				image{ height: 48upx; width: 48upx; border-radius: 50%; margin-right: 10upx; background-color: #eee;}
				text{
					font-size: 24upx;
					color: #555;
				}
			}
			.zan{
				font-size: 24upx;
				color: #555;
				line-height: 1.1;
				.iconfont{
					font-size:28upx;
					margin-right:10upx;
				}
			}
			.zan.active{
				color: $primary;
				.iconfont.active{
					color: $primary;
				}
			}
			.author{ display: block; max-width: 160upx;}
		}
	}
</style>