<template>
	<!-- 常用信息 -->
	<view class="content">
		<view class="defaultPage invoiceList__defaultPage">
			<view class="addressList invoiceList" v-for="(val,key) in list" :key="key">
				<view class="item">
					<view class="item__bd">
						<view class="remarks">
							<text class="name">{{val.FullName}}</text>
						</view>
						<view class="info">
							<image class="imgphone" src="http://xqk.wtvxin.com/images/wxapp/icons/phone.png" mode=""></image>
							<view class="type" >{{val.Mobile}}</view>
						</view>
						<view class="info">
							<image class="imginfo" src="http://xqk.wtvxin.com/images/wxapp/icons/info1.png" mode=""></image>
							<view class="type iconfont icon-shenfenxinxi">{{val.Idcard}}</view>
						</view>
						<view class="info">
							<image class="imgyouxiang" src="http://xqk.wtvxin.com/images/wxapp/icons/youxiang.png" mode=""></image>
							<view class="type iconfont icon-youxiang">{{val.Email}}</view>
						</view>
					</view>
					<view class="item__ft flex">
						<view class="flexItem checkedLabel flex flexAlignCneter">
							<text class="default" v-if="val.IsDefault===1">默认</text>
						</view>
						<view class="flexItem flex1 text_r">
							<view class="iconText inline-block"  @click="gotoAddInvoice(val.Id,val.IsDefault)">
								<view class="uni-icon uni-icon-compose"></view>编辑
							</view>
							<view class="iconText inline-block" @click="deleteBtn(index,val.Id)">
								<view class="iconfont icon-del"></view>删除
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 没有数据的时候 -->
			<view class="noConPage table bg_fff" v-if="!list.length">
				<view style="margin-top: 20%;">  <!-- table-cell -->
					<view class="noDataImg">
						<image src="http://xqk.wtvxin.com/images/wxapp/notData.png" mode="widthFix"></image>
					</view>
					<view class="tips">抱歉，您还没有常用信息哦~</view>
				</view>
			</view>
			<!-- 没有数据的时候 end -->
			<view class="ftBtn" style="height: 92upx;">
				<button type="primary" class="infos bt0 btn-active radius0" @click="gotoAddInvoice()">
					<view class="uni-icon uni-icon-plus"></view>
					<text>添加常用信息</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {host,post,get,toLogin} from '@/utils';
	export default {
		data() {
			return {
				userId: "",
				token: "",
				list: [],
			};
		},
		onShow() {
			this.list = [];
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.getInvoice();
		},
		methods: {
			gotoAddInvoice(id,IsDefault) {
				let goUrl = '';
				if(id){
					goUrl = '/pages/tabBar/my/addinformation?id='+ id + '&IsDefault=' + IsDefault
				}else{
					goUrl = '/pages/tabBar/my/addinformation'
				}
				uni.navigateTo({
					url: goUrl
				})
			},
			//获取用户常用信息
			async getInvoice() { 
				let result = await post("User/GetUserInfo", {  //发票列表最多只能有10个，不用做分页
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
			deleteBtn(index,fId){
				let _this=this;
				uni.showModal({
					title: '提示',
					content: '您确定要删除该发票信息吗？',
					cancelColor:'#999',
					confirmColor:'#5cc69a',
					success: function (res) {
						if (res.confirm) {
							_this.Deleteinvoice(index,fId);
						} else if (res.cancel) {}
					}
				});
			},
			//删除用户常用信息
			async Deleteinvoice(index,fId) { 
				let result = await post("User/DelUserInfo", {
					userId: this.userId,
					token: this.token,
					Uid: fId
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
		border-color: #5cc69a
	}
	.addressList .item .item__bd .type{
		color:#3C3C3C;
		padding-top: 10upx;
	}
	.name{
		font-weight:bold;
	}
	.default{
		width:80upx;
		height:40upx;
		background:rgba(92,198,154,1);
		border-radius:4upx;
		font-size:24upx;
		color:rgba(255,255,255,1);
		line-height:40upx;
		text-align: center;
	}
	.info{
		display: flex;
	}
	.imgphone{
		width:30upx;
		height:30upx;
		margin:22upx 15upx 0 0;
	}
	.imginfo{
		width:32upx;
		height:32upx;
		margin:22upx 15upx 0 0;
	}
	.imgyouxiang{
		width:32upx;
		height:26upx;
		margin:24upx 15upx 0 0;
	}
	.infos{
		position: fixed;
		z-index: 4;
		width: 100%;
		height: 88upx;
		line-height: 88upx;
		font-size: 30upx;
	}
</style>
