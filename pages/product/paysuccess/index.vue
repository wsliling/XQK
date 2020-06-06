<template>
  <div>
      <div class="tit_red flex flexColumn flexAlignCenter justifyContentCenter">
          <div class="flex flexAlignCenter status">
              <img v-if="paystaus!='fail'" src="http://jd.wtvxin.com/images/images/icons/gou_w.png" alt="" class="gou_w">
              <span class="font30 mr2">{{paystaus=="fail"?"支付失败":"支付成功"}}</span>
          </div>
          <div class="mt2"><span class="font20">￥</span><span class="font30 fb">{{TotalPrice}}</span></div>
          <div class="mt2 flex btn_tt justifyContentAround">
              <p class="btn_ccc" @click="goshop">返回首页</p>
              <!-- <p class="btn_ccc" v-if="GroupId" @click="goGroup">查看拼团</p> -->
              <p class="btn_ccc" @click="goOrder">查看订单</p>
          </div>
      </div>
      <div class="pp2 flex justifyContentCenter flexAlignCenter" v-if="hotRecommendList.length">
          <img src="http://jd.wtvxin.com/images/images/icons/ll_left.png" alt="" class="mm_ll">
          <span class="mm_cc fb">为你推荐</span>
          <img src="http://jd.wtvxin.com/images/images/icons/ll_right.png" alt="" class="mm_ll">
      </div>
      <div class="goods-box">
        <div class="goods jus-b flex-wrap" v-if="hotRecommendList.length">
			  <product-item v-for="(item,index) in hotRecommendList" :key="index" :item="item"></product-item>
        </div>
    </div>

  </div>
</template>

<script>
import {post,redirect} from '@/utils'
	import productItem from '@/components/productItem.vue';
export default {
		components: {
      productItem
		},
  data () {
    return {
      OrderNo:"",
      paystaus:"",
      TotalPrice:"",
      hotRecommendList:[],
    }
  },
  onLoad(options){
    this.OrderNo=options.OrderNo;
    this.paystaus=options.msg||'';
    this.TotalPrice= options.money||'未知错误';
    this.getHotGoodsList();
  },
  onShow(){
  },
  methods: {
			async getHotGoodsList () {
				// 热门推荐
				const res = await post("Goods/GoodsList_yd",{
					// AreaCode:this.cityCode||'',
					// Lat:this.lat||0,
					// Lng:this.lng||0,
					Page:1,
					PageSize:12,
					IsRecommend:1,
				}) 
				this.hotRecommendList = res.data 
      },
    goshop(){
      wx.switchTab({
        url: '/pages/tabBar/index/index'
      })
    },
    goOrder(){
      redirect('tabBar/order/orderdetails',{OrderNumber:this.OrderNo})
    },
  },
  onReachBottom: function() {
  }
}
</script>

<style scoped lang='scss'>
  .status{
    img{
      margin-right:20upx;
    }
  }
  .goods-box{
    .goods{
      padding: 10rpx 30rpx 30rpx;
        .list{
          width: 335rpx;
          border-radius: 10rpx;
          overflow: hidden;
          margin-bottom: 20rpx;
          background: #fff;
          box-shadow: 0rpx 2rpx 5rpx 0rpx rgba(0, 0, 0, 0.1);
          .text-box{
            padding: 0 20rpx;
          }
          .carda{
            span{
              font-size: 22rpx;
              color: #999999;
            }
            img{
              width: 50rpx;
              height: 50rpx;
            }
          }
          .img{
            width: 335rpx;
            height: 342rpx;
          }
          .tit{
            color: #000000;
            line-height: 70rpx;
          }
          .price span:nth-child(1){
            font-size: 20rpx;
            color: $primary;
            font-weight: 900;
          }
          .price span:nth-child(2){
            font-size: 36rpx;
            color: $primary;
            font-weight: 900;
          }
          .price span:nth-child(3){
            font-size: 22rpx;
            color: #999;
            text-decoration:line-through;
            margin-left: 15rpx;
          }
        }
    }
    .shai{
      height: 70rpx;
      color: #000;
      font-size: 28rpx;
      img{
        width: 13rpx;
        height: 22rpx;
        margin-left: 15rpx;
      }
    }
    .all{
      height: 100rpx;
      img{
        width: 378rpx;
        height: 32rpx;
      }
    }
  }
  .tit_red{
    background: $primary;width:100%;height:320rpx;
    color:#ffffff;
    .gou_w{
      width:48rpx;height:48rpx;
    }
    .font30{
      font-size:38rpx;
    }
    .btn_ccc{
      width:230rpx;height:66rpx;line-height: 66rpx;
      border:1rpx solid #f5f5f5;border-radius:30rpx;
      text-align: center;
    }
    .btn_tt{
      width:100%;
    }
  }
  .mm_ll{
    width:29rpx;height:24rpx;
  }
  .mm_cc{
    margin:0 40rpx;
  }
</style>
