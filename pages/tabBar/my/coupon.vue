<template>
	<!-- 优惠劵 -->
	<view class="ticket">
		<view class="tab flex">
			<view class="flex1 flexc" :class="{ active: tabIndex == index }" 
			v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{ item }}</view>
			<span :style="'left:' + tabStyle + 'rpx'"></span>
		</view>
		<block v-if="datalist.length">
			<block v-for="(item, index) in datalist" :key="index">
				<view class="list jus-b flex" v-if="tabIndex == 0" @click="navigeteTo(item.ProductId)">
					<view class="left flex-column-start-between">
						<view class="name">{{item.Title}}</view>
						<view class="subtitle ellipsis-col2" v-if="item.ProName">指定产品可用【{{item.ProName}}】</view>
						<view class="subtitle ellipsis-col2" v-else>{{item.ScopeOfUse}}</view>
						<view class="time">有效期至{{shijiantime(item.EndTime)}}</view>
					</view>
					<view class="right flexc">
						<view>
							<view class="num">{{item.Denomination}}元</view>
							<span>满{{item.MeetConditions}}元可使用</span>
						</view>
					</view>
				</view>
			</block>
			<block v-for="(item, index) in datalist" :key="index">
				<view class="list jus-b flex" 
					v-if="tabIndex == 1 || tabIndex == 2" @click="navigeteTo(item.ProductId)">
					<view class="left flex-column-start-between">
						<view class="name">{{item.Title}}</view>
						<view class="subtitle ellipsis-col2" v-if="item.ProName">指定产品可用【{{item.ProName}}】</view>
						<view class="subtitle ellipsis-col2" v-else>{{item.ScopeOfUse}}</view>
						<view class="time">有效期至{{shijiantime(item.EndTime)}}</view>
					</view>
					<view class="right flexc" v-if="tabIndex == 1 || tabIndex == 2" :style="{ background: '#D4D5D7' }">
						<view>
							<view class="num" style="color: #fff;">{{item.Denomination}}元</view>
							<span>满{{item.MeetConditions}}元可使用</span>
						</view>
					</view>
				</view>
			</block>
		</block>
		<noData v-if="noDataIsShow"></noData>
		<view class="uni-tab-bar-loading">
			<uni-load-more :loadingType="loadingType" v-if="noDataIsShow == false"></uni-load-more>
		</view>
	</view>
</template>
<script>
import { post,navigate } from '@/utils';
import noData from '@/components/notData'; //没有数据的通用提示
export default {
	data() {
		return {
			tabList: ['未使用', '已使用', '已失效'],
			tabIndex: 0,
			couponStatus: 1, //0全部，1可用，2已使用，3已失效
			userId: '',
			token: '',
			Page: 1,
			PageSize: 5,
			noDataIsShow: false, //没有数据的提示是否显示
			loadingType: 0, //0加载前，1加载中，2没有更多了
			datalist: [],
		};
	},
	computed: {
		tabStyle() {
			return (750 / this.tabList.length) * this.tabIndex + (750 / this.tabList.length - 50) / 2;
		}
	},
	onShow() {
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
		this.Page = 1;
		this.CouponList();
	},
	components: {
		noData,
	},
	methods: {
		goUrl(url) {
			uni.navigateTo({
				url: url
			});
		},
		navigeteTo(ProductId){ 
			if(ProductId){
				navigate('product/detail/detail',{Id:ProductId})
			}
		},
		cliTab(index) {
			this.tabIndex = index;
			this.couponStatus = index + 1;
			this.Page = 1;
			this.CouponList();
		},
		//我的优惠券
		CouponList() {
			post('User/CouponList', {
				UserId: this.userId,
				Token: this.token,
				Page: this.Page,
				PageSize: this.PageSize,
				Status: this.couponStatus
			}).then(res => {
				if (res.data.length > 0) {
					this.noDataIsShow = false;
				}
				if (res.data.length === 0 && this.Page === 1) {
					this.noDataIsShow = true;
				}
				if (this.Page === 1) {
					this.datalist = res.data;
				}
				if (this.Page > 1) {
					this.datalist = this.datalist.concat(res.data);
				}
				if (res.data.length < this.PageSize) {
					this.isLoad = false;
					this.loadingType = 2;
				} else {
					this.isLoad = true;
					this.loadingType = 0;
				}
			});
		},
		shijiantime(times){
		    var timearr = times.replace(" ", ":").replace(/\:/g, "-").split("-");
		    var timestr = ""+timearr[0]+"-" + timearr[1] + "-" + timearr[2]
		    return timestr
		},
	},
	// 上拉加载
	onReachBottom: function() {
		if (this.isLoad) {
			this.loadingType = 1;
			this.Page++;
			this.CouponList()
		} else {
			this.loadingType = 2;
		}
	}
};
</script>
<style scoped lang="scss">
.list::after {
	content: '';
	display: inline-block;
	position: absolute;
	top: -20upx;
	left: 440upx;
	width: 40upx;
	height: 40upx;
	border-radius: 50%;
	background-color: #f5f5f5;
}
.list::before {
	content: '';
	display: inline-block;
	position: absolute;
	bottom: -20upx;
	left: 440upx;
	width: 40upx;
	height: 40upx;
	border-radius: 50%;
	background-color: #f5f5f5;
}
.list {
	width: 690upx;
	height: 200upx;
	border-radius: 15upx;
	margin: 30upx;
	background-color: #fff;
	overflow: hidden;
	position: relative;
	.use {
		background-color: #d4d5d6 !important;
	}
	.left {
		width: 460upx;
		padding: 20upx 0 20upx 30upx;
		position: relative;
		.subtitle{
			color:#999;
			font-size:24upx;
			line-height: 1.4;
		}
		.time {
			font-size: 24upx;
			line-height: 50upx;
			color: #999;
		}
		.coupoutag {
			width: 128upx;
			height: 40upx;
			border-radius: 0 0 24px 0;
			position: absolute;
			top: 0;
			left: 0;
			font-size: 24upx;
			color: #fff;
		}
		.useinfo {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 93%;
			padding: 10upx 20upx;
			font-size: 24upx;
			color: #999;
			box-sizing: border-box;
			border-top: 1px dashed #eee;
		}
	}
	.right {
		width: 230upx;
		background-color: #5cc69a;
		text-align: center;
		.num {
			color: #fff;
			font-size: 56upx;
			font-weight: 900;
			span {
				font-size: 20upx;
			}
		}
		span {
			font-size: 20upx;
			color: #fff;
		}
	}
}
.tab {
	height: 92upx;
	background-color: #fff;
	position: relative;
	.active {
		color: #5cc69a;
	}
	span {
		position: absolute;
		bottom: 0;
		transition: all 0.2s;
		height: 5upx;
		width: 50upx;
		background-color: #5cc69a;
	}
}
.back_col {
	background-color: #5cc69a !important;
}
.btn_de {
	width: 100%;
	position: fixed;
	bottom: 0;
	height: 88upx;
	line-height: 88upx;
	background: #5cc69a;
	color: #ffffff;
	text-align: center;
}
.flex {
	display: flex;
}
.flex1 {
	flex: 1;
	overflow: hidden;
}
.flexc {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
