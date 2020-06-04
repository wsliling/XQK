<template>
	<view class="item" @click="onClick">
		<div v-if="showSelect" class="checkBox">
			<div class='IconsCK IconsCK-radio' :class="{'checked':item.checked}"></div>
		</div>
		<view class="itembox">
			<view class="imgbox">
				<view class="like flex-center" v-if="details.CollectionId">
					<view class="iconfont bg" :class="details.CollectionId?'icon-aixin':'icon-aixin2'">
						<view class="iconfont" :class="details.CollectionId?'icon-aixin':'icon-aixin2'"></view>
					</view>
					<text class="num" :class="{active : details.CollectionId }">{{ item.CollectNum }}</text>
				</view>
				<image :src="item.PicImg" mode="aspectFill" class="pic"></image>
			</view>
			<view class="txtbox">
				<view class="title uni-ellipsis2 uni-mb5">
					{{item.Title}}
				</view>
				<view class="flex-center-between">
					<view class="tx flex-center">
						<!-- <image src="/static/logo.png" mode="aspectFill"></image> -->
						<image :src="item.Avatar" mode="aspectFill"></image>
						<text class="author uni-ellipsis">{{ item.NickName }}</text>
					</view>
					<view class="zan flex-center" :class="{ active: item.IsLike }">
						<text class="iconfont icon-zan" :class="{'icon-zan': item.IsLike }"></text>
						<text class="num" :class="{ active: item.IsLike }">{{ item.LikeNum }}</text>
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
			},
			// 是否展示选择框
			showSelect:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
			onClick(){
				if(this.showSelect){
					// this.item.checked = !this.item.checked
					this.$emit('selectChange',this.item)
				}else{
					navigate('starLangSon/detail',{Id:this.item.Id})
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	
	.item{
		display: flex;
		flex-direction: column;
		width: 336upx;
		margin-bottom: 20upx;
		position:relative;
		.checkBox{
			position:absolute;
			top:0;
			right:0;
			z-index:100;
			.IconsCK{
				&:after{
					font-size:60upx;
					color:$primary;
				}
			}
		}
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
				.num{ 
						color: #ccc; 
						margin-left: 10upx;
						&.active{
						color: #ff6766;
					}
				}
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
				.num.active{
					color: $primary;
				}
				.iconfont.active{
					color: $primary;
				}
			}
			.author{ display: block; max-width: 160upx;}
		}
	}
</style>