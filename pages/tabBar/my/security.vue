<template>
	<!-- 安全中心(星球客旅行保障) -->
	<view>
		<view class="tab flex">
			<view class="flex1 flexc" :class="{ 'active': tabIndex == index }" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{ item }}</view>
			<span :style="'left:' +tabStyle + 'rpx'"></span>
		</view>
		<view class="security" v-if="tabIndex == 0">
			<view class="security-box">
				<!-- <view class="headline"></view> -->
				<view v-html="OneContent" class="content">{{OneContent}}</view>
			</view>
		</view>
		<view class="security" v-if="tabIndex == 1">
			<view class="security-box">
				<view v-html="TwoContent" class="content">{{TwoContent}}</view>
			</view>
		</view>
		<view class="security" v-if="tabIndex == 2">
			<view class="security-box">
				<view v-html="ThreeContent" class="content">{{ThreeContent}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {post} from '@/utils'
	export default {
		data() {
			return {
				tabList: [],
				tabIndex: 0,
				OneContent:'',
				TwoContent:'',
				ThreeContent:'',
			}
		},
		computed: {
			tabStyle() {
				return (750 / this.tabList.length) * this.tabIndex + (750 / this.tabList.length - 100) / 2;
			}
		},
		onShow() {
			this.getAboutUs()
		},
		methods:{
			cliTab(index) {
				this.tabIndex = index;
			},
			getAboutUs(){
				post('/About/AboutUs',{
					Id:2,
					Type: 1
				}).then(res=>{
					if(res.code === 0){
						this.tabList.push(res.data.OneTitle,res.data.TwoTitle,res.data.ThreeTitle)
						if(res.data.Title){
							uni.setNavigationBarTitle({
							    title: res.data.Title
							});
						}
						this.OneContent = res.data.OneContent.replace(/<img/g, '<img style="max-width:100%;"');
						this.TwoContent = res.data.TwoContent.replace(/<img/g, '<img style="max-width:100%;"');
						this.ThreeContent = res.data.ThreeContent.replace(/<img/g, '<img style="max-width:100%;"');
					}
					
				})
			},
			
		},
		
	}
</script>

<style scoped lang='scss'>
	*{
		margin: 0;
		width: 100%;
		height: 100vh;
	}
	img{
		width: 100%;
	}
	rich-text{
		width: 100%;
	}
	.tab{
		  height: 92upx;
		  background-color: #fff;
		  position: relative;
		  .active{
			color: #5CC69A
		  }
		  span{
			position: absolute;
			bottom: 0;
			transition: all .2s;
			height: 5upx;
			width: 100upx;
			background-color: #5CC69A
		  }
	}
	.flex{
		display: flex;
	}
	.flex1{
		flex: 1;
		overflow: hidden;
	}
	.flexc{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.security{
		margin-top: 20upx;
		background: #fff;
		padding: 0 30upx 30upx;
		.securityimg{
			padding:30upx 0;
			image{
				width: 100%;
				margin: 0 auto;
			}
		}
		.security-box{
			padding-top: 30upx;
			.headline{
				font-size:32upx;
				font-weight:bold;
				color:rgba(51,51,51,1);
				padding-bottom: 10upx;
			}
			.content{
				font-size:28upx;
				color:rgba(102,102,102,1);
				line-height:40upx;
				padding-bottom: 10upx;
				text-aliv:center;
				display: flex;
				justify-content: center;
				margin: 0 auto;
				
			}
		}
	}
	
	
</style>
