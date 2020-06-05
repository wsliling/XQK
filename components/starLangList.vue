<template>
	
		<view class="xylist">
			<view class="left-list">
				<block v-for="(item,index) in list" :key="index" >
					<view class="item" v-if="index%2==0" @click="navigate('starLangSon/detail',{Id:item.Id})">
						<view class="itembox">
							<view class="imgbox">
								<view class="like flex-center" v-if="pageStr!=='issue'" @click.stop="onCollect(item)">
									<view class="iconfont bg" :class="item.CollectionId?'icon-aixin':'icon-aixin2'">
										<view class="iconfont" :class="item.CollectionId?'icon-aixin':'icon-aixin2'"></view>
									</view>
									<text class="num" :class="{active : item.CollectionId }">{{ item.CollectNum }}</text>
								</view>
								<view class="trash" v-if="pageStr==='issue'" @click.stop="$emit('remove',item)">
									<uni-icons type="trash" color="#fff" size="25"></uni-icons>
								</view>
								<image :src="item.PicImg" mode="aspectFill" class="pic"></image>
							</view>
							<view class="txtbox">
								<view class="title uni-ellipsis2 uni-mb5">
									{{item.Title}}
								</view>
								<view class="flex-center-between" v-if="pageStr!=='issue'">
									<view class="tx flex-center">
										<!-- <image :src="item.Avatar" mode="widthFix"></image> -->
										<image :src="item.Avatar||'http://xqk.wtvxin.com/images/wxapp/default.png'" mode="widthFix"></image>
										<text class="author uni-ellipsis">{{ item.NickName }}</text>
									</view>
									<view class="zan flex-center" @click.stop="onLike(item)">
										<text class="iconfont icon-zan" :class="{'icon-zan1': item.IsLike }"></text>
										<text class="num" :class="{ active: item.IsLike }">{{ item.LikeNum }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="right-list">
				<block v-for="(item,index) in list" :key="index" >
					<view class="item" v-if="index%2==1" @click="navigate('starLangSon/detail',{Id:item.Id})">
						<view class="itembox">
							<view class="imgbox">
								<view class="like flex-center" v-if="pageStr!=='issue'" @click.stop="onCollect(item)">
									<view class="iconfont bg" :class="item.CollectionId?'icon-aixin':'icon-aixin2'">
										<view class="iconfont" :class="item.CollectionId?'icon-aixin':'icon-aixin2'"></view>
									</view>
									<text class="num" :class="{active : item.CollectionId }">{{ item.CollectNum }}</text>
								</view>
								<view class="trash" v-if="pageStr==='issue'" @click.stop="$emit('remove',item)">
									<uni-icons type="trash" color="#fff" size="25"></uni-icons>
								</view>
								<!-- <image :src="item.pic" mode="aspectFill" class="pic"></image> -->
								<image :src="item.PicImg" mode="aspectFill" class="pic"></image>
							</view>
							<view class="txtbox">
								<view class="title uni-ellipsis2 uni-mb5">
									<!-- {{item.name}} -->
									{{item.Title}}
								</view>
								<view class="flex-center-between" v-if="pageStr!=='issue'">
									<view class="tx flex-center">
										<image :src="detail.Avatar||'http://xqk.wtvxin.com/images/wxapp/default.png'"></image>
										<text class="author uni-ellipsis">{{ item.NickName }}</text>
									</view>
									<view class="zan flex-center" @click.stop="onLike(item)">
										<text class="iconfont icon-zan" :class="{'icon-zan1': item.IsLike }"></text>
										<text class="num" :class="{ active: item.IsLike }">{{ item.LikeNum }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
</template>

<script>
	import {navigate,requestHideLoading} from '@/utils'
	export default {
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			},
			//issue--发布页面,list--列表页面
			pageStr:{
				type:String,
				default:'list'
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
			// 收藏
			async onCollect(item){
				const params = {
					UserId:this.$store.getters.getUserId,
					Token:this.$store.getters.getToken,
					Type:5,
					Id:item.Id
				}
				if(!item.CollectionId){
					await requestHideLoading('User/AddCollections',params,'post')
					item.CollectNum+=1
				}else{
					await requestHideLoading('User/ReCollections',params,'post')
					item.CollectNum-=1
				}
				item.CollectionId = !item.CollectionId;
				this.$emit('onCollect',item)
			},
			// 点赞
			async onLike(item){
				await requestHideLoading('Find/FindlikeOperation',{
					UserId:this.$store.getters.getUserId,
					Token:this.$store.getters.getToken,
					FindId:item.Id
				},'post')
				if(!item.IsLike){
					item.LikeNum+=1
				}else{
					item.LikeNum-=1
				}
				item.IsLike = !item.IsLike;
				this.$emit('onLike',item)
			}
		}
	}
</script>
<style scoped lang="scss">
	
.xylist{
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	flex-direction: row;
	.left-list,.right-list{
		width: 50%;
	}
	.item{
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-bottom: 20upx;
		padding-right: 20upx;
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
				.num{ color: #fff; margin-left: 10upx;
					&.active{
						color: #ff6766;
					}
				}
			}
			.trash{
				position:absolute;
				right:0;top:0upx;
				padding-right:10upx;
				padding-left:20upx;
				padding-bottom:20upx;
				// font-size:40upx;
				// color:#fff;
				
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
	.right-list{ 
		.item{
			padding-right: 0;
		}
		.pic{
			height:380upx!important;
		}
	}
}
</style>