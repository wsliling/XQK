<template>
	<!-- 发票中心 -->
	<view class="content">
		<view class="defaultPage invoiceList__defaultPage">
			<view class="addressList invoiceList" >
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="item__bd"  @click="choseInvoice(index)">
						<view class="remarks">
							<text class="name">抬头名称：{{item.HeaderName}}</text>
						</view>
						<view class="type">类型：{{item.InvoiceTitleStr}}</view>
						<view class="type" v-if="item.TaxNumber">税号：{{item.TaxNumber}}</view>
						<!-- <view class="type">邮箱：{{item.Email}}</view> -->
					</view>
					<view class="item__ft flex">
						<view class="flexItem checkedLabel flex flexAlignCneter" @click="setDefaultInvoice(index,item.Id)">
							<view class="IconsCK IconsCK-radio" :class="{'checked':item.IsDefault===1}"></view>
							<text v-if="item.IsDefault===1" style="color:#89674c;">已设为默认</text>
							<text  v-else>设为默认</text>
							<!-- <text class="IconsCK IconsCK-radio" v-else>设为默认</text> -->
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
			<notData v-if="!list.length"></notData>
			<!-- 没有数据的时候 end -->
			<div class="fixed bt0 btn-active radius0 btn-max flex-center-center" @click="gotoAddInvoice()">
				<view class="uni-icon uni-icon-plus"></view>
				<text>新增发票信息</text>
			</div>
		</view>


	</view>
</template>

<script>
	import {post} from '@/utils';
	import notData from '@/components/notData.vue';
	export default {
		components:{notData},
		data() {
			return {
				userId: "",
				token: "",
				list: [],
			};
		},
		// #ifdef APP-PLUS
		onLoad(){
		},
		// #endif
		onShow() {
			this.list = [];
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.getInvoice();
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
					goUrl = '/pages/tabBar/my/addInvoice?id='+id
				}else{
					goUrl = '/pages/tabBar/my/addInvoice'
				}
				uni.navigateTo({
					url: goUrl
				})
			},
			async getInvoice() { //获取发票列表
				let result = await post("Invoice/invoiceList", {  //发票列表最多只能有10个，不用做分页
					userId: this.userId,
					token: this.token,
					Page:1,
					PageSize:10
				})
				this.list = result.data;
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
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	.btn-max{
		.uni-icon{
			color:#fff;
			margin-right:15upx;
		}
	}
</style>
