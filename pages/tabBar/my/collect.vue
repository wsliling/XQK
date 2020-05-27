<template>
	<!-- 我的收藏 -->
	<view class="">
		<view class="uni-tab-bar">
			<scroll-view id="tab-bar" :class="['uni-swiper-tab tabList li_50',isMultipleStore>0?'':'w50']">
				<view :class="['swiper-tab-list',tabIndex==0 ? 'active' : '']" id="list0" @click="tapTab(0)">
					<view class="s">星球客</view>
				</view>
				<view v-if="isMultipleStore>0" :class="['swiper-tab-list',tabIndex==1 ? 'active' : '']" id="list1" @click="tapTab(1)">
					<view class="s">星语</view>
				</view>
			</scroll-view>
		</view>
		<view class="hasContentPage">
			<view v-if="tabIndex==0">
				<view class="collect-box" v-for="(val,index) in 4" :key="index">
					<view class="item__hd" v-if="isShowDel" @click="shiftChecked(index)">
						<view class='IconsCK IconsCK-radio checked'></view>
					</view>
					<view class="collect-left">
						<image src="../../../static/of/p1.jpg" mode=""></image>
					</view>
					<view class="collect-right">
						<view class="name">广州.从化温泉明月山溪</view>
						<view class="point">
							<view class="pointkey">骑行</view>
							<view class="pointkey">游乐</view>
							<view class="pointkey">艺术</view>
						</view>
						<view class="font">
							<view class="num">￥288</view>
							<view class="iconfont icon-collect"></view>
							<view class="fz12">4.8 <span>(20)</span> </view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="tabIndex==1">
				<view class="xylist">
					<view class="left-list">
						<view class="item" v-for="(item,index) in datalist" :key="index" v-if="index%2==0">
							<view class="itembox">
								<view class="imgbox">
									<!-- <view class="like flex-end"> -->
										<!-- <view class="iconfont icon-aixin bg">
											<view class="iconfont icon-aixin"></view>
										</view> -->
										<!-- <text class="num">209</text> -->
									<!-- </view> -->
									<image :src="item.pic" mode="widthFix"></image>
								</view>
								<view class="txtbox">
									<view class="title uni-ellipsis2 uni-mb5">
										{{item.name}}
									</view>
									<view class="flex-between">
										<view class="tx flex-start">
											<image src="/static/logo.png" mode="aspectFill"></image>
											<text class="author uni-ellipsis">小星君</text>
										</view>
										<view class="zan flex-end active">
											<text class="iconfont icon-zan1"></text>
											<text class="num">30</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="right-list">
						<view class="item" v-for="(item,index) in datalist" :key="index" v-if="index%2==1">
							<view class="itembox">
								<view class="imgbox">
									<!-- <view class="like flex-end">
										<view class="iconfont icon-aixin bg">
											<view class="iconfont icon-aixin active"></view>
										</view>
										<text class="num">209</text>
									</view> -->
									<image :src="item.pic" mode="widthFix"></image>
								</view>
								<view class="txtbox">
									<view class="title uni-ellipsis2 uni-mb5">
										{{item.name}}
									</view>
									<view class="flex-between">
										<view class="tx flex-start">
											<image src="/static/logo.png" mode="aspectFill"></image>
											<text class="author uni-ellipsis">小星君</text>
										</view>
										<view class="zan flex-end">
											<text class="iconfont icon-zan"></text>
											<text class="num">30</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			
			<!-- 没有更多数据了 -->
			<view class="uni-tab-bar-loading" v-if="hasData">
				<uni-load-more :loadingType="loadingType"></uni-load-more>
			</view>
			<noData :isShow="noDataIsShow"></noData>
		</view>
		<view class="dd_foot">
			<view class="foot-fixed bt0">
				<view class="flex flex-between">
					<block v-if="isShowDel">
						<view class="lab flex flex-start" @click="selectAll">
							<view :class="['IconsCK IconsCK-radio',allSelect?'checked':'' ]"></view>全选
						</view>
						<view class="btn0" @click="cancelDel">取消</view>
						<view class="btn0 btn1 active" @click="btnDel">删除</view>
					</block>
					<view class="compile" v-else @click="ShowDel">编辑</view>
				</view>
				<!-- <view class="flex" v-else>
					<view class="btn btn_100 red" @click="tolink('/pages/index/index',true)">
						去逛逛
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue'; //加载更多
	import {
		host,
		post,
		get,
		dateUtils,
		toLogin,
		getCurrentPageUrlWithArgs
	} from '@/common/util.js';
	export default {
		data() {
			return {
				barHeight: 0,
				tabIndex: 0, //0:产品收藏；1：商家收藏 2：众筹收藏
				curPage: "",
				userId: "",
				token: "",
				isMultipleStore: 1, //0表示没有店铺
				list: [],
				listLength: 0,
				page: 1,
				pageSize: 6,
				isLoad: false,
				isShowDel: false, //是否显示删除的底部
				hasData: false,
				noDataIsShow: false,
				loadingType: 0, //0加载前，1加载中，2没有更多了
				allSelect:false,//全选
				selectlen:0,
				datalist:[
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p2.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗窗，这扇窗~',
					},
					{
						pic:'/static/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为这扇窗~',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了',
					},
					{
						pic:'/static/of/banner.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p2.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/banner.jpg',
						name:'旅行为我门的生活打开了一扇窗',
					},
					{
						pic:'/static/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗一扇窗，这扇窗~',
					}
				]
			};
		},
		components: {
			noData,
			uniLoadMore
		},
		onLoad() {
			// #ifdef APP-PLUS
			var height = plus.navigator.getStatusbarHeight();
			this.barHeight = height;
			// #endif
			// #ifdef H5
			this.barHeight = 0;
			// #endif
			this.tabIndex = uni.getStorageSync("collectIndex")
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			// this.initData();
			// this.collectionsList();
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			
		},
		methods: {
			//跳转
			tolink(Url,tabBar) {
				if(tabBar){
					uni.switchTab({
						url: Url
					})
				}else{
					uni.navigateTo({
						url: Url
					})
				}
			},
			tapTab(index) { //点击tab-bar
				uni.setStorageSync('collectIndex',index)
				this.tabIndex = index;
				// this.initData();
				// this.collectionsList();
			},
			initData() {
				this.list = [];
				this.page = 1;
				this.isShowDel = false;
				this.loadingType = 0;
				this.noDataIsShow = false;
				this.hasData = false;
			},
			//全选
			selectAll(){
			  let that=this;
			  if(this.allSelect){
				this.allSelect=false;
				this.selectlen=0;
				this.list.forEach(function(item) {
				  that.$set(item,"checked",false)
				});
				
			  }else{
				this.allSelect=true;
				this.selectlen=this.list.length;
				this.list.forEach(function(item) {
				  that.$set(item,"checked",true)
				});
			  }
			},
			//单选择
			shiftChecked(index) {
				let _this=this;
				let selectId=!_this.list[index].checked;
				_this.$set(_this.list[index],"checked",selectId);
				if(selectId){
					_this.selectlen++
				}else{
					_this.selectlen--
				}
				let len=_this.list.length;
				if(_this.selectlen==len){
					_this.allSelect=true
				}else{
					_this.allSelect=false
				}
			},
			//点击编辑
			ShowDel() {
				this.isShowDel = true;
			},
			cancelDel() {
				this.isShowDel = false;
				this.allSelect=false;
				this.selectlen=0;
				this.list.forEach(function(item) {
					item.checked = false;
				})
			},
			btnDel() { //删除收藏的产品
				let _this = this,
				    proIdArr = [];
				this.list.forEach(function(item) {
					if (item.checked == true) {
						proIdArr.push(item.Id);
					}
				})
				if (proIdArr.length > 0) {
					uni.showModal({
					  content: "您确定要删除所选商品吗？",
					  confirmColor:"#ff6f00",
					cancelColor:'#999',
					confirmColor:'#ff6f00',
					  success: function(res) {
						if (res.confirm) {
							  _this.DeleteCollections(proIdArr.join(","))
							} else if (res.cancel) {
								
								}
							}
					}) 
				} else {
					uni.showToast({
						title: "请选择需要删除的项！",
						icon: "none",
						duration: 1500
					});
				}
			},
			async collectionsList() {
				let result = await post("User/MemberCollections", {
					UserId: this.userId,
					Token: this.token,
					Type: this.tabIndex,
					Page: this.page,
					PageSize: this.pageSize,
				});
				if (result.code === 0) {
					let _this = this;
					if (result.data.length > 0) {
						this.hasData = true;
						this.noDataIsShow = false;
						result.data.forEach(function(item) {
							_this.$set(item, "checked", false);
							_this.$set(item, "collectTxt", true);
						})
					}
					if (result.data.length == 0 && this.page == 1) {
						this.noDataIsShow = true;
						this.hasData = false;
					}
					if (this.page === 1) {
						this.list = result.data;
					}
					if (this.page > 1) {
						this.list = this.list.concat(
							result.data
						);
					}
					if (result.data.length < this.pageSize) {
						this.isLoad = false;
						this.loadingType = 2;
					} else {
						this.isLoad = true;
						this.loadingType = 0
					}
					this.listLength = this.list.length;
				}
			},
			async DeleteCollections(ids) { //取消产品收藏
				let result = await post("User/DelCollections", {
					UserId: this.userId,
					Token: this.token,
					IdArr: ids,
					Type:0
				});
				if (result.code === 0) {
					let _this = this;
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
					setTimeout(function(){
						_this.collectionsList();
					 },1500)
				}
			}
			
		},
		onPullDownRefresh() { //下拉刷新
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			let _this = this;
			_this.initData();
			setTimeout(function() {
				_this.collectionsList();
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		onReachBottom() { //上拉加载
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.collectionsList();
			} else {
				this.loadingType = 2;
			}
		},
	}
</script>

<style scoped lang="scss">
	.item__bd{
		width:100%;
	}
	.hasContentPage {
		position: relative;
		top:100upx;
		height: calc(100% - 88upx);
		overflow-y: auto;
		background: #fff;
	}
	.uni-tab-bar {
		height: 80upx;
		position: fixed;
		width:100%;
		z-index: 9;
		.tabList{
			width: 100%;
			height: 80upx;
		}
	}

	.li_50 .swiper-tab-list {
		width: 50%;
		margin: 0;
	}

	.li_33.w50 .swiper-tab-list {
		width: 50%;
	}

	.swiper-tab-list .s {
		display: inline-block;
		line-height: 80upx;
		height: 80upx;
		box-sizing: border-box;
	}

	.carthead {
		background-color: #ffffff;
		width: 750upx;
		padding: 0 20upx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 88upx;
		z-index: 8;
		position: fixed;
		top: 0;
		box-sizing: border-box;
	}

	.wxcarthead {
		background-color: #fff;
		width: 100%;
		padding: 0 20upx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 88upx;
		z-index: 8;
		position: fixed;
		top: 0;
		/* left: 20upx; */
	}

	
	.dd_foot {
		height: 90upx;
		.foot-fixed {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #fff;
			z-index: 10;
			.lab{ margin-left: 20upx;margin-top: 22upx;}
			.btn {
				font-size: 32upx;
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				color: #333;
			}
			.btn0{
				width: 48.5%;
				font-size: 32upx;
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				color: #333;
			}
			.btn1{
				width: 240upx;
			}
			.btn0.active {
				color: #fff;
				background: $primary;
			}

			.btn_100 {
				width: 100%;

			}

			.uni-icon {
				font-size: 60upx;
				color: #333;
			}
		}

	}
	.active .s{
		color: #5CC69A;
		border-bottom: 2px solid #5CC69A;
	}
	.compile{
		width:240upx !important;
		height:90upx !important;
		background:rgba(92,198,154,1)!important;
		color:rgba(255,255,255,1) !important;
		font-size: 32upx;
		text-align: center;
		line-height: 90upx;
		margin-left: 68%;
	}
	.flex-between{
		display: flex;
		justify-content: space-between;
	}
	// 星球客样式
	.collect-box{
		display: flex;
		padding: 30upx;
		border-bottom: 1upx solid #ECECEC;
		.item__hd{
			margin-top: 40upx;
		}
		.collect-left{
			width:200upx;
			height:150upx;
			border-radius:8upx;
			padding-right: 20upx;
			image{
				width: 100%;
				height: 100%;
				margin: 0 auto;
				border-radius: 10upx;
			}
		}
		.collect-right{
			color: #333333;
			.name{
				font-size:28upx;
			}
			.point{
				display: flex;
				.pointkey{
					height:46upx;
					background:rgba(92,198,154,0.08);
					border-radius:4upx;
					font-size:22upx;
					color: #5CC69A;
					padding: 0 10upx;
					line-height: 46upx;
					margin-right: 15upx;
				}
			}
			.font{
				display: flex;
				padding-top: 12upx;
				.num{
					font-size:24upx;
					color:rgba(255,51,51,1);
					line-height:40upx;
				}
				.iconfont{
					color: $primary;
					margin: 0 6upx 0 40upx;
					line-height: 1.2;
				}
				.fz12{
					span{
						font-size:22upx;
						color:rgba(153,153,153,1);
						padding-left: 6upx;
					}
				}
				
			}
		}
	}
	
	
	// 星语样式
	.xylist{
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		flex-direction: row;
		padding-left: 20upx;
		padding-top: 30upx;
		background: #fff !important;
		.left-list,.right-list{
			width: 50%;
		}
		.item{
			display: flex;
			flex-direction: column;
			width: 100%;
			padding-right: 20upx;
			margin-bottom: 20upx;
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
					.num{ color: #fff; margin-left: 10upx;}
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
	}
</style>
