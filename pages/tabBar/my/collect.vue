<template>
	<!-- 我的收藏 -->
	<view class="collect bgfff">
		<view class="uni-tab-bar">
			<!-- ,isMultipleStore>0?'':'w50' -->
			<scroll-view id="tab-bar" :class="['uni-swiper-tab tabList li_50']">
				<view :class="['swiper-tab-list',tabIndex==0 ? 'active' : '']" id="list0" @click="tapTab(0)">
					<view class="s">星球客</view>
				</view>
				<!-- v-if="isMultipleStore>0" -->
				<view  :class="['swiper-tab-list',tabIndex==5 ? 'active' : '']" id="list1" @click="tapTab(5)">
					<view class="s">星语</view>
				</view>
			</scroll-view>
		</view>
		<view class="hasContentPage">
			<view v-if="tabIndex==0">
				<view class="collect-box" v-for="(val,index) in list" :key="index" @click="onClickPro(val.ProId,index)">
					<view class="item__hd" v-if="isShowDel">
						<view class='IconsCK IconsCK-radio' :class="{'checked':val.checked}"></view>
					</view>
					<view class="collect-left">
						<image :src="val.PicNo" mode="aspectFill"></image>
					</view>
					<view class="collect-right">
						<view class="name">{{val.Name}}</view>
						<view class="point">
							<view class="pointkey" v-for="(item,index) in val.ServiceKeysArr" :key="index">{{item}}</view>
						</view>
						<view class="font">
							<view class="num">￥{{val.Price}}</view>
							<view class="iconfont icon-collect"></view>
							<view class="fz12">{{val.CommentScore}}<span>({{val.CommentNum}})</span> </view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="tabIndex==5">
				<view class="xylist flex-center-between">
					<starLangItem  v-for="(item,index) in list" :key="index" :item="item" 
						:showSelect="isShowDel" @selectChange="selectChange"></starLangItem>
				</view>
				
			</view>
			
			<!-- 没有更多数据了 -->
			<notData v-if="!list.length"></notData>
			<uni-load-more :loadingType="loadingType" v-if="list.length&&page>1"></uni-load-more>
		</view>
		<view class="dd_foot">
			<view class="foot-fixed bt0">
				<view class="flex flex-between">
					<block v-if="isShowDel">
						<view class="lab flex flex-start" @click="selectAll">
							<view :class="['IconsCK IconsCK-radio',allSelect?'checked':'' ]"></view>全选
						</view>
						<view class="btn0" @click="cancelDel">取消</view>
						<view class="btn0 btn1 active" @click="btnDel">取消收藏</view>
					</block>
					<view class="compile" v-else @click="isShowDel = true">编辑</view>
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
	import notData from '@/components/notData.vue'; //暂无数据
	import starLangItem from '@/components/starLangItem.vue'; 
	import {post,navigate} from '@/utils';
	export default {
		data() {
			return {
				tabIndex: 0, //0:产品收藏；5：星语
				userId: "",
				token: "",
				list: [],
				page: 1,
				pageSize: 10,
				isLoad: false,
				isShowDel: false, //是否显示删除的底部
				loadingType: 0, //0加载前，1加载中，2没有更多了
				allSelect:false,//全选
				selectlen:0,
			};
		},
		components: {
			notData,starLangItem
		},
		onLoad() {
			// this.tabIndex = uni.getStorageSync("collectIndex")
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.initData();
			this.collectionsList();
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
				// uni.setStorageSync('collectIndex',index)
				this.tabIndex = index;
				this.initData();
				this.collectionsList();
			},
			initData() {
				this.list = [];
				this.page = 1;
				this.isShowDel = false;
				this.loadingType = 0;
			},
			// 获取收藏数据
			async collectionsList() {
				this.loadingType = 1;
				this.isShowDel = false;
				let result = await post("User/MemberCollections", {
					UserId: this.userId,
					Token: this.token,
					Page: this.page,
					PageSize:this.pageSize,
					Type:this.tabIndex
				});
				const data= result.data;
				data.forEach((item)=> {
					this.$set(item, "checked", false);
					this.$set(item, "collectTxt", true);
					if(item.ServiceKeys){
						item.ServiceKeysArr = item.ServiceKeys.split(',',5)
					}
					if(this.tabIndex===5){
						item.Avatar = item.Headimgurl;
						item.PicImg = item.PicNo;
						item.cId = item.Id;//收藏id
						item.Id = item.FindId;//转成组件公用id跳转
					}
				})
				if (this.page === 1) {
					this.list =[];
				}
				this.list = this.list.concat(data);
				if (data.length < this.pageSize) {
					this.loadingType = 2;
				} else {
					this.loadingType = 0;
				}
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
			// 选择星语
			selectChange(e){
				console.log(e,'xuanz')
				let allStatus = true;
				this.list.map(item=>{
					if(item.Id ===e.Id){
						item.checked = !e.checked;
					}
					if(!item.checked){
						allStatus = false;
					}
				})
				this.allSelect = allStatus;
			},
			cancelDel() {
				this.isShowDel = false;
				this.allSelect=false;
				this.selectlen=0;
				this.list.forEach(function(item) {
					item.checked = false;
				})
			},
			btnDel() { //取消收藏的产品
				let _this = this,
				proIdArr = [];
				this.list.forEach(function(item) {
					if (item.checked == true) {
						if(_this.tabIndex==5){
							proIdArr.push(item.cId);
						}else{
							proIdArr.push(item.Id);
						}
					}
				})
				if (proIdArr.length) {
					uni.showModal({
					  content: "您确定要取消所选收藏吗？",
					  confirmColor:"#5cc69a",
					cancelColor:'#999',
					confirmColor:'#5cc69a',
					  success: function(res) {
						if (res.confirm) {
							  _this.DeleteCollections(proIdArr.join(","))
						} else if (res.cancel) {}
						}
					}) 
				}
			},
			onClickPro(ProId,index){
				// 编辑产品
				if(this.isShowDel){
					this.shiftChecked(index)
				}else{
					// 跳转产品
					navigate('product/detail/detail',{Id:ProId})
				}
			},
			async DeleteCollections(ids) { //取消产品收藏
				let result = await post("User/DelCollections", {
					UserId: this.userId,
					Token: this.token,
					IdArr: ids,
					Type:this.tabIndex
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
			this.initData();
			this.collectionsList();
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		},
		onReachBottom() { //上拉加载
			if (this.loadingType === 2||this.isShowDel)return;
			this.page+=1;
			this.collectionsList();
		},
	}
</script>

<style scoped lang="scss">
	.collect{
		padding-bottom:90upx;
	}
	.item__bd{
		width:100%;
	}
	.hasContentPage {
		position: relative;
		top:80upx;
		height: calc(100% - 88upx);
		overflow-y: auto;
		background: #fff;
		border-top:20upx solid #f2f2f2;
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
		width: 100%;
		flex-wrap: wrap;
		flex-direction: row;
		padding: 30upx;
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
