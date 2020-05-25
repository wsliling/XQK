<template>
	<!-- 优惠劵 -->
	<view class="ticket">
		<view class="tab flex">
			<view class="flex1 flexc" :class="{ 'active': tabIndex == index }" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{ item }}</view>
			<span :style="'left:'+tabStyle+'rpx'"></span>
		</view>
		<block>
			<view class="list jus-b flex" v-for="(item, index) in 3" :key="index">
				<view class="left">
					<view class="name">满100元减20元券</view>
					<view class="time">有效期至2020-01-12</view>
					<!-- <div class="useinfo oneline" style="left: 15upx;">仅可购买星求客店铺商品</div> -->
					<!-- <div class="useinfo oneline">说明：指定店铺使用</div> -->
					<!-- <view class="coupoutag flexc">'满减券':'折扣券'</view> -->
				</view>
				<view class="right flexc">
					<view>
						<view class="num">20元
							<!-- <span>'元':'折'</span> -->
						</view>
						<!-- <span>满100元可使用</span> -->
					</view>
				</view>
			</view>
		</block>
		<noData :isShow="noDataIsShow"></noData>
		<view class="loading" v-if="hasData"><load-more :loadingType="loadingType"></load-more></view>
		<!-- <view class="btn_de" @click="goUrl('/pages/member/couponCenter/couponCenter')">领券中心</view> -->
	</view>
</template>

<script>
import { post } from '@/common/util.js';
import noData from '@/components/noData'; //没有数据的通用提示
import LoadMore from '@/components/uni-load-more.vue';
export default {
	data() {
		return {
			tabList: ['未使用', '已使用', '已失效'],
			tabIndex: 0,
			couponStatus: 1, //0全部，1可用，2已使用，3已失效
			userId: '',
			token: '',
			hasData: false,
			noDataIsShow: false, //没有数据的提示是否显示
			page: 1,
			pageSize: 8,
			isLoad: false,
			isOved: false, //显示已经到底了
			loadingType: 0, //0加载前，1加载中，2没有更多了
			datalist: {}
		};
	},
	computed: {
		tabStyle() {
			console.log((750 / this.tabList.length) * this.tabIndex + (750 / this.tabList.length - 50) / 2);
			return (750 / this.tabList.length) * this.tabIndex + (750 / this.tabList.length - 50) / 2;
		}
	},
	onShow() {
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
		this.page = 1;
	},
	components: {
		noData,
		LoadMore
	},
	methods: {
		goUrl(url) {
			uni.navigateTo({
				url: url
			});
		},
		cliTab(index) {
			this.tabIndex = index;
			this.couponStatus = index + 1;
			this.page = 1;
			this.noDataIsShow = false;
			this.hasData = false;
			
		},
	},
	onReachBottom: function() {
		if (this.isLoad) {
			this.loadingType = 1;
			this.isOved = false;
			this.page++;
		} else {
			this.loadingType = 2;
			if (this.page > 1) {
				this.isOved = true;
			} else {
				this.isOved = false;
			}
		}
	}
};
</script>

<style scoped lang='scss'>
.list::after{
  content:'';
  display: inline-block;
  position: absolute;
  top: -20upx;
  left: 440upx;
  width: 40upx;
  height: 40upx;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.list::before{
  content:'';
  display: inline-block;
  position: absolute;
  bottom: -20upx;
  left: 440upx;
  width: 40upx;
  height: 40upx;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.list{
  width: 690upx;
  height: 200upx;
  border-radius: 15upx;
  margin: 30upx;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  .use{
    background-color: #d4d5d6!important
  }
  .left{
    width: 460upx;
    padding: 40upx 0 0 35upx;
    position: relative;
	
    .time{
      font-size: 24upx;
	  line-height: 60upx;
      color: #999;
    }
    .coupoutag{
      width: 128upx;
	  height: 40upx;
      border-radius: 0 0 24px 0;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 24upx;
      color: #fff
    }
	.useinfo{
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
  .right{
    width: 230upx;
    background-color: #5CC69A;
    text-align: center;
    .num{
      color: #fff;
      font-size: 56upx;
      font-weight: 900;
      span{
        font-size: 20upx
      }
    }
    span{
      font-size: 20upx;
      color: #fff;
    }
  }
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
    width: 50upx;
    background-color: #5CC69A
  }
}
.back_col{
  background-color:#5CC69A!important;
}
.btn_de{
  width:100%;position: fixed;bottom:0;
  height:88upx;line-height: 88upx;background: #5CC69A;
  color:#ffffff;text-align: center;
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
</style>
