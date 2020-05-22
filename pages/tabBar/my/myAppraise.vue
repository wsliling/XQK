<template>
	<!-- 我要评价 -->
	<view class="myappraise">
		<view class="comment" v-for="(val,index) in 2" :key="index">
			<view class="comment-flex">
				<view>
					<view class="comment-name">星球客</view>
					<view class="comment-time">06/18/2020 - 06/19 ~ 1位房客</view>
					<view class="flex">
						<view class="comment-remain">订单待评价</view>
						<view class="">¥168.0</view>
					</view>
				</view>
				<view class="comment-img">
					<image src="../../../static/of/p3.jpg" mode=""></image>
				</view>
			</view>
			<view class="comment-to">去评价</view>
		</view>
		
		<view class="">
			<noData :isShow="noDataIsShow"></noData>
		</view>
	</view>
</template>

<script>
	import {host,post,get,toLogin} from '@/common/util.js';
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		components: {
			noData,
			uniLoadMore
		},
		onLoad(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow(){
			// if (toLogin()) {
				// this.getMemberInfo();
				// this.CommentList();
			// }
		},
		data() {
			return {
				userId: "",
				token: "",
				curPage:"",
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData: false,
				noDataIsShow: false,
				page: 1,
				pageSize: 6,
				allPage: 0,
				count: 0,
				Userinfo:{},//用户数据
				Commentlist:{}//评价列表
			};
		},
		methods:{
			//写评价
			gotoOrder(){
				uni.navigateTo({
					url:'/pages/member/order/order?tabIndex=4'
				})
			},
			gotoDetail(id){
				uni.navigateTo({
					url:'/pages/product/productDetail/productDetail?id='+id
				})
			},
			commentDetail(id){
				uni.navigateTo({
					url:'/pages/commentsDetail/commentsDetail?commentId='+id
				})
			},
			//获取用户信息
			async getMemberInfo() {
				let result = await post("User/GetCenterInfo", {
					"UserId": this.userId,
					"Token": this.token
				})
				if (result.code === 0) {
					this.Userinfo=result.data;
				} else if (result.code === 2) {
					let _this = this;
					uni.showToast({
						title: "登录超时，请重新登录!",
						icon: "none",
						duration: 2000,
						success: function() {
							setTimeout(function() {
								uni.redirectTo({
									url: "/pages/login/login?askUrl=" + _this.curPage
								});
							}, 2000);
						}
					}); //如果未登录则跳转到登陆页面
				}else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			//我的评价列表
			async CommentList(){
				let result = await post("User/CommentList", {
					"UserId": this.userId,
					"Token": this.token,
					"page": this.page,
					"pageSize": this.pageSize
				})
				if (result.code === 0) {
					let _this=this;
					if (result.data.length > 0) {
						this.hasData = true;
						result.data.forEach(function(item) {
							let arr = item.CommentPic.split(",");
							if(arr[arr.length-1] ==""){
								arr.splice(arr.length-1,1);
							}
							_this.$set(item, "imgArr",arr);
						})
					}
					this.count = result.count;
					if (this.count == 0) {
						this.noDataIsShow = true;
					}
					if (parseInt(this.count) % this.pageSize === 0) {
						this.allPage = this.count / this.pageSize;
					} else {
						this.allPage = parseInt(this.count / this.pageSize) + 1;
					}
					if (this.page === 1) {
						this.Commentlist = result.data;
					}
					if (this.page > 1) {
						this.Commentlist = this.Commentlist.concat(
							result.data
						);
					}
					if (this.allPage <= this.page) {
						this.isLoad = false;
						this.loadingType = 2;
					} else {
						this.isLoad = true;
						this.loadingType = 0
					}
				}else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			//预览图片
			previewImg(imgurls,index){
				uni.previewImage({
					current:imgurls[index],
					urls: imgurls,
					indicator:imgurls.length
				});
			},
		},
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.CommentList();
			} else {
				this.loadingType = 2;
			}
		},
		onPullDownRefresh() { //下拉刷新
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			let _this=this;
			_this.page = 1;
			_this.loadingType = 1;
			setTimeout(function () {
				// _this.getMemberInfo();
				// _this.CommentList();
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		},
	}
</script>

<style lang="scss">
	.myappraise{
		background: #fff;
		color:rgba(51,51,51,1);
		padding-top: 30upx;
	}
	.comment{
		padding: 40upx 30upx;
		border-bottom: 1upx solid #ECECEC;
	}
	.comment-flex{
		display: flex;
		justify-content: space-between;
	}
	.comment-img{
		width:200upx;
		height:150upx;
	}
	image{
		width: 100%;
		height: 100%;
		border-radius:10upx;
	}
	.comment-name{
		font-size:32upx;
		font-weight:bold;
	}
	.comment-time{
		font-size:28upx;
	}
	.flex{
		display: flex;
	}
	.comment-remain{
		color: #5CC69A;	
		padding-right: 20upx;
	}
	.comment-to{
		width:160upx;
		height:64upx;
		background:rgba(92,198,154,1);
		border-radius:6upx;
		font-size:14upx;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 64upx;
		margin-top: 40upx;
	}
</style>
