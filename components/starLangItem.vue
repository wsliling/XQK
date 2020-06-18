<template>
	<view class="item" @click="onClick">
		<div v-if="showSelect" class="checkBox">
			<div class='IconsCK IconsCK-radio' :class="{'checked':item.checked}"></div>
		</div>
		<view class="itembox">
			<view class="imgbox">
				<view class="like flex-center" v-if="item.CollectionId!=undefined" @click.stop="onCollect">
					<!-- <view class="iconfont bg" :class="item.CollectionId?'icon-aixin':'icon-aixin2'"> -->
					<text class="iconfont bg" :class="item.CollectionId?'icon-aixin':'icon-aixin2'"></text>
					<!-- </view> -->
					<!-- <text class="num" :class="{active : item.CollectionId }">{{ item.CollectNum }}</text> -->
					<text class="num" :class="{'active':item.CollectionId}">{{ item.CollectNum }}</text>
				</view>
				<image :src="item.PicImg" mode="aspectFill" class="pic" style="width: 336rpx;"></image>
			</view>
			<view class="txtbox">
				<view class="title uni-ellipsis uni-mb5">
					{{item.Title}}
				</view>
				<view class="flex-center-between">
					<view class="tx flex-center">
						<!-- <image src="/static/logo.png" mode="aspectFill"></image> -->
						<!-- <image :src="item.Avatar||'http://xqk.wtvxin.com/images/wxapp/default.png'" mode="aspectFill"></image> -->
						<image :src="isDefaultImg(item.Avatar)" mode="aspectFill"></image>
						<text class="author uni-ellipsis">{{ item.NickName }}</text>
					</view>
					<view class="zan flex-center" @click.stop="onLike">
						<text class="iconfont icon-zan" :class="{'icon-zan1': item.IsLike }"></text>
						<text class="num" :class="{ active: item.IsLike }">{{ item.LikeNum }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {navigate,requestHideLoading,judgeLogin} from '@/utils';
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
		computed:{
			isDefaultImg (src) {
				return (src)=>{
					// console.log('我是src',src)
					if (src.includes('输入的不是有效的')) {
					    // console.log("显示默认头像，src为",src)
						return 'http://xqk.wtvxin.com/images/wxapp/default.png'
					}else {
						return src
					}
				}
			},
		},
		methods: {
			onClick(){
				if(this.showSelect){
					// this.item.checked = !this.item.checked
					this.$emit('selectChange',this.item)
				}else{
					navigate('starLangSon/detail',{Id:this.item.Id})
				}
			},
			// 收藏
			async onCollect(){
			   if(!judgeLogin()){return;}
				const params = {
					UserId:this.$store.getters.getUserId,
					Token:this.$store.getters.getToken,
					Type:5,
					Id:this.item.Id
				}
				if(!this.item.CollectionId){
					await requestHideLoading('User/AddCollections',params,'post')
					this.item.CollectNum+=1
				}else{
					await requestHideLoading('User/ReCollections',params,'post')
					this.item.CollectNum-=1
				}
				this.item.CollectionId = !this.item.CollectionId;
				this.$emit('onCollect',this.item)
			},
			// 点赞
			async onLike(){
			   if(!judgeLogin()){return;}
				await requestHideLoading('Find/FindlikeOperation',{
					UserId:this.$store.getters.getUserId,
					Token:this.$store.getters.getToken,
					FindId:this.item.Id
				},'post')
				if(!this.item.IsLike){
					this.item.LikeNum+=1
				}else{
					this.item.LikeNum-=1
				}
				this.item.IsLike = !this.item.IsLike;
				this.$emit('onLike',this.item)
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
			// image {
			// 	height: auto;
			// }
			.like{
				position: absolute;
				// top: 12upx;
				top: 18rpx;
				right: 20upx;
				z-index: 2;
				// font-size: 28upx;
				font-size: 28upx;
				.iconfont.bg{
					color: #fff;
					// font-size: 36upx;
					font-size: 28upx;
					position: relative;
					line-height: 1;
					// .iconfont{
					// 	position: absolute;
					// 	// font-size: 32upx;
					// 	font-size: 28upx;
					// 	color: #fff;
					// 	line-height: 1;
					// 	// top: 2upx;
					// 	// left: 2upx;
					// 	top: 0upx;
					// 	left: 0upx;
					// }
					.iconfont.active{
						color: #ff6766;
					}
				}
				.num{ 
						font-size: 28upx;
						line-height: 1;
						color: #fff; 
						margin-left: 10upx;
						// &.active{
						// color: #ff6766;
						// }
						&.active{
							// color: #ff2213;
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
				.num.active {
					color: $primary;
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