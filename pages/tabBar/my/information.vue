<template>
	<!-- 常用信息 -->
	<view class="content">
		<view class="defaultPage invoiceList__defaultPage">
			<view class="addressList invoiceList" v-for="(val,key) in 2" :key="key">
				<view class="item">
					<view class="item__bd"  @click="choseInvoice(index)">
						<view class="remarks">
							<text class="name">陈洛浩</text>
						</view>
						<view class="type">138****5678</view>
						<view class="type">41262819********99</view>
						<view class="type">122****278@qq.com</view>
					</view>
					<view class="item__ft flex">
						<view class="flexItem checkedLabel flex flexAlignCneter" @click="setDefaultInvoice(index,item.Id)">
							<!-- <view class="IconsCK IconsCK-radio" :class="{'checked':item.IsDefault===1}"></view><text v-if="item.IsDefault===1" style="color:#89674c;">已设为默认</text> -->
							<text class="default" v-if="key*2 ==0">默认</text>
							<!-- <text class="IconsCK IconsCK-radio">设为默认</text> -->
						</view>
						<view class="flexItem flex1 text_r">
							<view class="iconText inline-block"  @click="gotoAddInvoice(item.Id)">
								<view class="uni-icon uni-icon-compose"></view>编辑
							</view>
							<view class="iconText inline-block" @click="deleteBtn(index,item.Id)">
								<view class="iconfont icon-del"></view>删除
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 没有数据的时候 -->
			<view class="noConPage table bg_fff" v-if="false">
				<view class="table-cell">
					<view class="noDataImg">
						<image src="http://www.sc-mall.nethttp://shop.dadanyipin.com/static/noCart.png" mode="widthFix"></image>
					</view>
					<view class="tips">抱歉，您还没有常用信息哦~</view>
				</view>
			</view>
			<!-- 没有数据的时候 end -->
			<view class="ftBtn" style="height: 92upx;">
				<button type="primary" class="fixed bt0 btn-active radius0" @click="gotoAddInvoice()">
					<view class="uni-icon uni-icon-plus"></view>
					<text>添加常用信息</text>
				</button>
			</view>
		</view>


	</view>
</template>

<script>
	import {host,post,get,toLogin} from '@/common/util.js';
	export default {
		data() {
			return {
				InvoiceId:0,
				pagetype:"",//页面来源
				userId: "",
				token: "",
				list: [],
				shopIndex:0,
			};
		},
		// #ifdef APP-PLUS
		onLoad(e){
			this.pagetype=e.pagetype||'';
			this.shopIndex=e.shopIndex||0;
		},
		// #endif
		onShow() {
			this.list = [];
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			// #ifndef APP-PLUS
			this.pagetype=this.$root.$mp.query.pagetype||'';
			this.shopIndex=this.$root.$mp.query.shopIndex||0;
			// #endif
			// this.getInvoice();
		},
		methods: {
			choseInvoice(index){
				let _this=this;
				if(this.pagetype == 'confirm'){
					this.$set(_this.list[index],'shopIndex',_this.shopIndex);
					uni.setStorageSync("invoiceinfo",this.list[index]);
					uni.navigateBack()
				}
			},
			gotoAddInvoice(id) {
				let goUrl = '';
				if(id){
					// goUrl = '/pages/babBar/my/addInvoice?id='+id
				}else{
					goUrl = '/pages/tabBar/my/addinformation'
				}
				uni.navigateTo({
					url: goUrl
				})
			},
			async getInvoice() { //获取发票列表
				let result = await post("Invoice/invoiceList", {  //发票列表最多只能有10个，不用做分页
					userId: this.userId,
					token: this.token
				})
				let _this = this;
				if (result.code === 0) {
					if (result.data.length > 0) {
						_this.list = _this.list.concat(result.data);
					}
				} else if (result.code === 2) {
					uni.showToast({
						title: "登录超时！",
						icon: "none",
						duration: 1500,
						success: function() {
							uni.navigateTo({
								url: "/pages/login/login?askUrl=" + _this.curPage
							})
						}
					});
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
				}
			},
			async setDefaultInvoice(index,id){  //设为默认
				let result = await post("Invoice/SetDefaultInvoice",{
					UserId:this.userId,
					Token:this.token,
					Id:id
				});
				if(result.code===0){
					for(let i=0;i<this.list.length;i++){
						if(index===i){
							this.$set(this.list[i],'IsDefault',1);
						}else{
							this.$set(this.list[i],'IsDefault',0);
						}
					}
				}else{
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
				}
			},
			deleteBtn(index,fId){
				let _this=this;
				uni.showModal({
					title: '提示',
					content: '您确定要删除该发票信息吗？',
					cancelColor:'#999',
					confirmColor:'#ff6f00',
					success: function (res) {
							if (res.confirm) {
								_this.Deleteinvoice(index,fId);
							} else if (res.cancel) {

							}
					}
				});
			},
			async Deleteinvoice(index,fId) { //删除发票
				let result = await post("Invoice/Deleteinvoice", {
					userId: this.userId,
					token: this.token,
					Id: fId
				});
				if (result.code === 0) {
					let _this = this;
					uni.showToast({
						title: "删除成功！",
						icon: "none",
						duration: 1500,
						success: function() {
							_this.$nextTick(function() {
								_this.list.splice(index, 1);
							});
						}
					});
				} else if (result.code === 2) {
					uni.showToast({
						title: "登录超时！",
						icon: "none",
						duration: 1500,
						success: function() {
							uni.navigateTo({
								url: "/pages/login/login?askUrl=" + _this.curPage
							})
						}
					});
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
				}
			}
		}
	}
</script>

<style>
	@import "../../../common/dd_style.css";
	.content {
		height: 100%;
	}

	.defaultPage {
		height: 100%;
	}

	.noConPage {
		height: calc(100% - 92upx);
	}

	.icon-del {
		display: inline-block;
		vertical-align: middle;
		margin-right: 10upx;
		font-size: 38upx;
	}
	.addInvoice__weui-cells .tag.active{
		border-color: #ff6f00
	}
	.addressList .item .item__bd .type{
		color:#3C3C3C;
		padding-top: 10upx;
	}
	.name{
		font-weight:bold;
	}
	.default{
		width:60upx;
		height:34upx;
		background:rgba(92,198,154,1);
		border-radius:4upx;
		font-size:20upx;
		color:rgba(255,255,255,1);
		line-height:34upx;
		text-align: center;
	}
</style>
