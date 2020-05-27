<template>
	<!-- 发表评价 -->
	<div class="foot_list">
		<div class="or_item">
			<view class="bg_fff uni-mt10">
				<view class="product-comment">
					<view class="pictrue"><image class="img" src="../../../static/of/p2.jpg" mode="aspectFill"></image></view>
					<view class="">
						<view class="title">星球客</view>
						<view class="title">06/18/2020 - 06/19 . 1位房客</view>
						<view class="title">¥288.0</view>
					</view>
				</view>
				<!--遇到的问题-->
				<!-- <div class="mt2">
		  	      <p class="cg font24">请选择您遇到的问题</p>
		  	      <div class="mt2 flex flexWrap">
		  	          <p v-for="(item,oll) in plist" :key="oll" class="pp_item" :class="{'active':oll==1}">{{item.name}}</p>
		  	      </div>
		  	  </div> -->
				<view class="commentflex">
					<view class="">评分</view>
					<div class="stars">
						<uni-rate size="18" margin="10" color="#E8E8E8" :starType="1" :showtxt="true" active-color="#5CC69A" value="5" @change="onChange($event, 1)"></uni-rate>
					</div>
					<view class="">非常满意</view>
				</view>

				<textarea cols="30" rows="10" maxlength="300" class="com_text" v-model="text" placeholder="填写您对星球客的评价~~"></textarea>
				<!-- <view class="counter">
					<text class="num">{{ inputTxtLength }}</text>/300
				</view> -->
				<div class="p3" style="padding-bottom: 30upx;">
					<!-- <div>上传图片（不超过5张）</div> -->
					<div class="fed_pic flex flexWrap">
						<div v-for="(item, index) in imageList" :key="index" class="picbox">
							<span class="" @click="delImg(index)">×</span>
							<image :src="item" alt="" class="pic_itim"></image>
						</div>
						<div class="picbox upBtnImg" @click="chooseImage()" v-if="isShowBtnUpload">
							<img src="http://jyy.wtvxin.com/static/images/icons/add2.png" alt="" class="pic_itim" />
						</div>
					</div>
				</div>
			</view>
			<view class="bg-white">
				<view class="appraiseContent__hd"><view class="title">店铺评分</view></view>
				<view class="rateContent">
					<view class="rate-item flex flex-start">
						<view class="title">卫生评分</view>
						<view class="grade star">
							<uni-rate size="18" margin="10" color="#E8E8E8" :starType="2" :showtxt="true" active-color="#5CC69A" value="4" @change="onChange($event, 2)"></uni-rate>
						</view>
					</view>
					<view class="rate-item flex flex-start">
						<view class="title">体验评分</view>
						<view class="grade star">
							<uni-rate size="18" margin="10" color="#E8E8E8" :starType="3" :showtxt="true" active-color="#5CC69A" value="3" @change="onChange($event, 3)"></uni-rate>
						</view>
					</view>
					<view class="rate-item flex flex-start">
						<view class="title">服务评分</view>
						<view class="grade star">
							<uni-rate size="18" margin="10" color="#E8E8E8" :starType="3" :showtxt="true" active-color="#5CC69A" value="2" @change="onChange($event, 3)"></uni-rate>
						</view>
					</view>
					<view class="rate-item flex flex-start">
						<view class="title">设施评分</view>
						<view class="grade star">
							<uni-rate size="18" margin="10" color="#E8E8E8" :starType="3" :showtxt="true" active-color="#5CC69A" value="1" @change="onChange($event, 3)"></uni-rate>
						</view>
					</view>
				</view>
			</view>
		</div>
		<div class="porela" @click="pub()">提交</div>
	</div>
</template>

<script>
import { switchPath, post } from '@/common/util.js';
import { pathToBase64, base64ToPath } from '@/common/image-tools.js';
import uniRate from '@/components/uni-rate/uni-rate.vue';
var sourceType = [['camera'], ['album'], ['camera', 'album']];
var sizeType = [['compressed'], ['original'], ['compressed', 'original']];
export default {
	components: {
		uniRate
	},
	data() {
		return {
			// plist:[{id:1,name:'商品问题'},{id:1,name:'客服问题'},{id:1,name:'包装问题'},{id:1,name:'物流问题'},{id:1,name:'其他'}],
			shopInfo: {},
			text: '',
			imageList: [],
			sourceTypeIndex: 2,
			sourceType: ['拍照', '相册', '拍照或相册'],
			sizeTypeIndex: 2,
			sizeType: ['压缩', '原图', '压缩或原图'],
			countIndex: 4,
			imgs: [],
			isShowBtnUpload: true,
			count: [1, 2, 3, 4, 5],
			proRank: 5, //产品评价等级
			serRank: 5, //服务评价等级
			logRank: 5, //物流评价等级
			inputTxtLength: 0, //当前输入字数
			OrderNo: '',
			OrderDetailId: ''
		};
	},
	onLoad(e) {
		this.imgList = [];
		console.log(e, 'e');
		// #ifdef APP-PLUS
		this.OrderNo = e.id;
		this.OrderDetailId = e.detailId;
		// #endif
	},
	onShow() {
		this.sourceTypeIndex = 2;
		this.sourceType = ['拍照', '相册', '拍照或相册'];
		this.sizeTypeIndex = 2;
		this.sizeType = ['压缩', '原图', '压缩或原图'];
		this.countIndex = 4;
		// #ifndef APP-PLUS
		(this.OrderNo = this.$mp.query.id), (this.OrderDetailId = this.$mp.query.detailId);
		// #endif
		// this.getDetail()
	},
	watch: {
		imgList(e) {
			console.log(e, ';;;;;;;;;;;;');
		},
		text(e) {
			console.log(e);
			this.inputTxtLength = e.length;
		}
	},
	methods: {
		async pub() {
			if (this.text) {
				let imgList = await this.base64Img(this.imageList);
				// console.log(imgList)
				post('Order/CommentProduct', {
					UserId: uni.getStorageSync('userId'),
					Token: uni.getStorageSync('token'),
					OrderNo: this.OrderNo,
					OrderDetailId: this.OrderDetailId,
					Content: this.text,
					PicList: JSON.stringify(imgList),
					ProductStarNum: this.proRank,
					ServiceStarNum: this.serRank,
					LogisticsStarNum: this.logRank
				}).then(res => {
					if (res.code === 0) {
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
						setTimeout(() => {
							uni.navigateBack();
						}, 300);
					}
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: '您还没输入评论内容呢~'
				});
			}
		},
		//删除图片
		delImg(index) {
			this.imageList.splice(index, 1);
			this.imgs.splice(index, 1);
			if (this.imageList.length < 5) {
				this.isShowBtnUpload = true;
			}
		},
		chooseImage: async function() {
			if (this.imageList.length >= 5) {
				let isContinue = await this.isFullImg();
				console.log('是否继续?', isContinue);
				if (!isContinue) {
					return;
				}
			}
			uni.chooseImage({
				sourceType: sourceType[this.sourceTypeIndex],
				sizeType: sizeType[this.sizeTypeIndex],
				count: this.imageList.length + this.count[this.countIndex] > 5 ? 5 - this.imageList.length : this.count[this.countIndex],
				success: res => {
					this.imageList = this.imageList.concat(res.tempFilePaths);
					if (this.imageList.length >= 5) {
						this.isShowBtnUpload = false;
						this.imageList.splice(5);
					}
				}
			});
		},
		async base64Img(arr) {
			let base64Arr = [];
			for (let i = 0; i < arr.length; i += 1) {
				const res = await pathToBase64(arr[i]);
				base64Arr.push({
					PicUrl: res
				});
			}
			return base64Arr;
		},
		isFullImg: function() {
			return new Promise(res => {
				uni.showModal({
					content: '已经有9张图片了,是否清空现有图片？',
					success: e => {
						if (e.confirm) {
							this.imageList = [];
							res(true);
						} else {
							res(false);
						}
					},
					fail: () => {
						res(false);
					}
				});
			});
		},
		//设置评价等级,type:1-描述，2-物流，3--服务
		onChange(e, type) {
			if (type === 1) {
				this.proRank = e.value;
			}
			if (type === 2) {
				this.serRank = e.value;
			}
			if (type === 3) {
				this.logRank = e.value;
			}
		},

		getDetail() {
			post('Order/OrderDetails', {
				UserId: uni.getStorageSync('userId'),
				Token: uni.getStorageSync('token'),
				OrderNo: this.OrderNo
			}).then(res => {
				res.data.OrderDetails.forEach(item => {
					if (item.Id == this.OrderDetailId) {
						this.shopInfo = item;
					}
				});
			});
		},
		goUrl(url, param) {
			uni.navigateTo({
				url: url + '?id=' + param
			});
		}
	}
};
</script>

<style scoped lang="scss">
.product-comment {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	border-bottom: 1px solid #f2f2f2;
	padding: 30upx;

	.pictrue {
		width: 200upx;
		height: 150upx;
		margin-right: 20upx;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		border-radius: 8upx;
		.img {
			width: 100%;
			height: 100%;
		}
	}
	.title {
		line-height: 50upx;
		&:first-child {
			font-size: 32upx;
			font-weight: bold;
		}
	}
	.uni-rate {
		height: 48upx;
	}
}
.commentflex{
	display: flex;
	justify-content: flex-start;
	padding: 30upx 30upx 0;
	font-size: 30upx;
	.stars{
		margin-top: 24upx;
		margin-right: 20upx;
	}
}

.pp_item {
	font-size: 24upx;
	padding: 8upx 20upx;
	border: 1upx solid #ededed;
	border-radius: 10upx;
	margin-right: 25upx;
	margin-top: 10upx;

	&:nth-child(4n) {
		margin-right: 0;
	}

	&.active {
		border: 1upx solid #ff6f00;
		color: #ff6f00;
	}
}

.com_text {
	padding: 30upx;
	height: 200upx;
	width: 100%;
	box-sizing: border-box;
}

.picbox {
	width: 33%;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 20upx;
	position: relative;

	span {
		position: absolute;
		width: 32upx;
		height: 32upx;
		background-color: #5CC69A;
		color: #fff;
		border-radius: 50%;
		top: -12upx;
		right: 0upx;
		/* transform: rotate(45deg);
      font-weight: 900; */
		font-size: 34upx;
		line-height: 24upx;
		text-align: center;
		z-index: 99;
	}
}

.pic_itim {
	width: 150upx;
	height: 150upx;
}

.porela {
	width: 90%;
	margin: 0 auto;
	background: #5CC69A;
	color: #ffffff;
	height: 80upx;
	line-height: 80upx;
	text-align: center;
	border-radius: 12upx;
	margin-top: 40upx;
}

.appraiseContent__hd {
	padding: 20upx 30upx 0;
	.title {
		font-size: 32upx;
		color: #333;
		font-weight:bold;
	}
}
.rateContent {
	padding: 0 30upx;
}

.rateContent .rate-item {
	margin: 10upx 0;
}

.rateContent .title {
	color: #333;
}

.counter {
	padding: 0 20upx;
	text-align: right;
	font-size: 24upx;
	color: #b2b2b2;
}
.star {
	margin-top: 12upx;
}
.rateContent {
	.star {
		margin-top: 24upx;
	}
}
.bg-white{
	background: #fff;
	margin-top: 30upx;
	padding-bottom: 30upx;
}
</style>
