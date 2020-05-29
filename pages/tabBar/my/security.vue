<template>
	<!-- 安全中心(星球客旅行保障) -->
	<view>
		<view class="tab flex">
			<view class="flex1 flexc" :class="{ 'active': tabIndex == index }" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{ item }}</view>
			<span :style="'left:' +tabStyle + 'rpx'"></span>
		</view>
		<view class="security">
			<view class="securityimg">
				<image src="../../../static/of/p4.jpg.png" mode=""></image>
				<!-- <image :src="titleContent.Logo" mode=""></image> -->
			</view>
			<view class="security-box" v-if="tabIndex===0">
				<view class="headline" v-html="detailContent.OneTitle">房源真实可靠</view>
				<view class="content" v-html="detailContent.OneContent">若发现房源严重不符合描述并影响入住，经核实与协调仍无法入住，我们将最高全额退款并补偿您相当于首晚房费的礼金券</view>
			</view>
			<view class="security-box" v-if="tabIndex===1">
				<view class="headline" v-html="detailContent.TwoTitle">房源真实可靠</view>
				<view class="content" v-html="detailContent.TwoContent">若发现房源严重不符合描述并影响入住，经核实与协调仍无法入住，我们将最高全额退款并补偿您相当于首晚房费的礼金券</view>
			</view>
			<view class="security-box" v-if="tabIndex===2">
				<view class="headline" v-html="detailContent.ThreeTitle">房源真实可靠</view>
				<view class="content" v-html="detailContent.ThreeContent">若发现房源严重不符合描述并影响入住，经核实与协调仍无法入住，我们将最高全额退款并补偿您相当于首晚房费的礼金券</view>
			</view>
			<!-- <view class="security-box">
				<view class="headline" >房源真实可靠</view>
				<view class="content">若发现房源严重不符合描述并影响入住，经核实与协调仍无法入住，我们将最高全额退款并补偿您相当于首晚房费的礼金券</view>
			</view>
			<view class="security-box">
				<view class="headline">旅居一尘不染</view>
				<view class="content">若入住时发现房间未经打扫或有明显清洁问题，经核实与协调仍无法入住，我们将最高全额退款并补偿您相当于首晚房费的礼金券</view>
			</view>
			<view class="security-box">
				<view class="headline">费用透明安全</view>
				<view class="content">若工作人员无故取消订单或提出不合理的站外收款，经核实与协调仍无法入住，我们将最高全额退款并补偿您相当于首晚房费的礼金券</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {post} from '@/utils';
	export default {
		data() {
			return {
				tabList: ['放心入住', '专业客服', '安全无忧'],
				tabIndex: 0,
				titleContent: "",
				detailContent: ""
			}
		},
		onLoad() {
			this.getSecurity()
		},
		computed: {
			tabStyle() {
				console.log((750 / this.tabList.length) * this.tabIndex + (750 / this.tabList.length - 50) / 2);
				return (750 / this.tabList.length) * this.tabIndex + (750 / this.tabList.length - 100) / 2;
			}
		},
		methods:{
			cliTab(index) {
				this.tabIndex = index;
				this.couponStatus = index + 1;
				this.page = 1;
				this.noDataIsShow = false;
				this.hasData = false;
			},
			async getSecurity(){
				let titleContent = await post("/About/AboutUs",{Id:2,type:0})
				let detailContent = await post("/About/AboutUs",{Id:2,type:1})
				// 正则增加富文本的样式
				detailContent.data.OneContent = detailContent.data.OneContent.replace(/<img/g, '<img style="max-width:100%;"');
				detailContent.data.TwoContent = detailContent.data.TwoContent.replace(/<img/g, '<img style="max-width:100%;"');
				detailContent.data.ThreeContent = detailContent.data.ThreeContent.replace(/<img/g, '<img style="max-width:100%;"');
				this.titleContent = titleContent.data
				this.detailContent = detailContent.data
				console.log("安全保障titleRes：---",titleContent)
				console.log("安全保障detailRes：---",detailContent)
			},
		},
		
	}
</script>

<style scoped lang='scss'>
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
		padding: 0 30upx;
		.securityimg{
			width:621upx;
			height:451upx;
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
			}
		}
	}
	
	
</style>
