<template>
	<!-- 发表评价 -->
	<div class="foot_list">
		<div class="or_item">
			<view class="bg_fff uni-mt10">
				<view class="product-comment" v-for="(val, key) in OrderComment.OrderDetails" :key="key">
					<view class="pictrue">
						<image class="img" :src="val.PicNo" mode="aspectFill"></image>
					</view>
					<view @click="navigate('product/detail/detail',{Id :val.ProductId})">
						<view class="title">{{ val.ProductName }}</view>
						<view class="title">{{ MakeDate }}•{{ MakePeople }}位房客</view>
						<view class="title">￥{{ OrderComment.Total }}</view>
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
					<view v-if="Rank === 5">非常满意</view>
					<view v-if="Rank === 4">满意</view>
					<view v-if="Rank === 3">一般</view>
					<view v-if="Rank === 2">不满意</view>
					<view v-if="Rank === 1">非常不满意</view>
				</view>

				<textarea cols="30" rows="10" maxlength="300" class="com_text" v-model="text" placeholder="填写您对星球客的评价~~"></textarea>
				<view class="counter">
					<text class="num">{{ inputTxtLength }}</text>/300
				</view>
				<div class="p3" style="padding: 0 30upx 30upx;">
					<!-- <div>上传图片（不超过5张）</div> -->
					<div class="fed_pic flex flexWrap">
						<div v-for="(item, index) in imageList" :key="index" class="picbox">
							<span class="" @click="delImg(index)">×</span>
							<image :src="item" alt="" class="pic_itim" @click="previewImage([item])"></image>
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
							<uni-rate size="18" margin="10" color="#E8E8E8" :starType="2" :showtxt="true" active-color="#5CC69A" value="5" @change="onChange($event, 2)"></uni-rate>
						</view>
					</view>
					<view class="rate-item flex flex-start">
						<view class="title">体验评分</view>
						<view class="grade star">
							<uni-rate size="18" margin="10" color="#E8E8E8" :starType="3" :showtxt="true" active-color="#5CC69A" value="5" @change="onChange($event, 3)"></uni-rate>
						</view>
					</view>
					<view class="rate-item flex flex-start">
						<view class="title">服务评分</view>
						<view class="grade star">
							<uni-rate size="18" margin="10" color="#E8E8E8" :starType="3" :showtxt="true" active-color="#5CC69A" value="5" @change="onChange($event, 4)"></uni-rate>
						</view>
					</view>
					<view class="rate-item flex flex-start">
						<view class="title">设施评分</view>
						<view class="grade star">
							<uni-rate size="18" margin="10" color="#E8E8E8" :starType="3" :showtxt="true" active-color="#5CC69A" value="5" @change="onChange($event, 5)"></uni-rate>
						</view>
					</view>
				</view>
			</view>
		</div>
		<div class="porela" @click="submit()">提交</div>
	</div>
</template>

<script>
import { post, navigate } from '@/utils';
import { pathToBase64, base64ToPath, previewImage } from '@/utils/image-tools';
import uniRate from '@/components/uni-rate/uni-rate.vue';
var sourceType = [['camera'], ['album'], ['camera', 'album']];
var sizeType = [['compressed'], ['original'], ['compressed', 'original']];
export default {
	components: { uniRate },
	data() {
		return {
			navigate,
			previewImage,
			text: '',
			imageList: [],
			sourceTypeIndex: 2,
			sourceType: ['拍照', '相册', '拍照或相册'],
			sizeTypeIndex: 2,
			sizeType: ['压缩', '原图', '压缩或原图'],
			countIndex: 4,
			isShowBtnUpload: true,
			count: [1, 2, 3, 4, 5],
			Rank: 5, //总评价
			HealthRank: 5, //卫生评价等级
			ProductRank: 5, //体验评价等级
			ServiceRank: 5, //服务评价等级
			FacilityRank: 5, //设施评价等级
			inputTxtLength: 0, //当前输入字数
			Id:'',
			OrderNo: '',
			MakeDate: '',
			MakePeople:'',
			OrderComment:{}, //评价订单详情
		};
	},
	onLoad(e) {
		this.imgList = [];
		this.OrderNo = e.OrderNumber;    //订单号
		this.MakeDate = e.MakeDate;      //入住时间
		this.MakePeople = e.MakePeople;  //入住人数
	},
	onShow() {
		this.sourceTypeIndex = 2;
		this.sourceType = ['拍照', '相册', '拍照或相册'];
		this.sizeTypeIndex = 2;
		this.sizeType = ['压缩', '原图', '压缩或原图'];
		this.countIndex = 4;
		this.getOrderComment()  //获取待评价订单详情
	},
	watch: {
		imgList(e) {
			console.log(e, ';;;;;;;;;;;;');
		},
		text(e) {
			console.log(e,"text");
			this.inputTxtLength = e.length;
		}
	},
	methods: {
		// 获取待评价订单详情
		getOrderComment() {
			post('Order/GetOrderComment', {
				UserId: uni.getStorageSync('userId'),
				Token: uni.getStorageSync('token'),
				OrderNo: this.OrderNo
			}).then(res => {
				if(res.code === 0) {
					this.OrderComment = res.data
					res.data.OrderDetails.forEach( val =>{
						console.log(val.Id)
						this.Id = val.Id
					})
				}
			});
		},
		// 提交评价订单详情
		async submit() {
			if (this.text) {
				let imgList = await this.base64Img(this.imageList);
				let CommentList = [{
					Id: this.Id,                     //订单详情Id
					Title: "",                       //评价标题
					ContentText: this.text,          //评价内容
					Rank: this.Rank,                 //总评价星级
					HealthRank: this.HealthRank,     //卫生评分
					ProductRank: this.ProductRank,   //产品评分/体验评分
					ServiceRank: this.ServiceRank,   //服务评分
					FacilityRank: this.FacilityRank, //设施评分
					PicNo: JSON.stringify(imgList),  //图片base64字符串集
					Isanonymous: 0,                  // 1--匿名,1:是 0:否
				}]
				post('Order/OrderComment', {
					UserId: uni.getStorageSync('userId'),
					Token: uni.getStorageSync('token'),
					OrderNo: this.OrderNo,
					CommentList,
				}).then(res => {
					if (res.code === 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
						});
						setTimeout(() => {
							uni.navigateBack();
						}, 500);
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
			console.log(index,'index')
			this.imageList.splice(index, 1);
			if (this.imageList.length < 4) {
				this.isShowBtnUpload = true;
			}
		},
		// 选择图片 
		chooseImage: async function() {
			if (this.imageList.length >= 4) {
				let isContinue = await this.isFullImg();
				console.log('是否继续?', isContinue);
				if (!isContinue) {
					return;
				}
			}
			uni.chooseImage({
				sourceType: sourceType[this.sourceTypeIndex],
				sizeType: sizeType[this.sizeTypeIndex],
				count: this.imageList.length + this.count[this.countIndex] > 4 ? 4 - this.imageList.length : this.count[this.countIndex],
				success: res => {
					this.imageList = this.imageList.concat(res.tempFilePaths);
					if (this.imageList.length >= 4) {
						this.isShowBtnUpload = false;
						this.imageList.splice(4);
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
		//设置评价等级, type:1-总评分，2-卫生，3-体验，4-服务，5-设施
		onChange(e, type) {
			if (type === 1) {
				this.Rank = e.value;
			}
			if (type === 2) {
				this.HealthRank = e.value;
			}
			if (type === 3) {
				this.ProductRank = e.value;
			}
			if (type === 4) {
				this.ServiceRank = e.value;
			}
			if (type === 5) {
				this.FacilityRank = e.value;
			}
		},
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
	width: 25%;
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
	margin-top: 60upx;
	margin-bottom: 30upx;
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
