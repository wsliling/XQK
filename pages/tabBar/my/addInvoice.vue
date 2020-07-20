<template>
	<!-- 新增常用发票 -->
	<view class="content">
		<view class="weui-cells addInvoice__weui-cells mb10">
			<view class="weui-cell">
				<view class="weui-cell__hd"><label class="weui-label">发票类型</label></view>
				<view class="weui-cell__bd">
					<view class="tag" :class="{ active: invoiceType === 1 }" @click="shiftInvoiceType(1)">个人</view>
					<view class="tag" :class="{ active: invoiceType === 2 }" @click="shiftInvoiceType(2)">公司</view>
				</view>
			</view>
			<view class="weui-cell">
				<view class="weui-cell__hd"><label class="weui-label">发票抬头</label></view>
				<view class="weui-cell__bd"><input type="text" class="weui-input" v-model="headerName" :placeholder="invoiceType===1?'请输入个人姓名':'请输入公司名称'" /></view>
			</view>
			<!-- 这个是公司的 -->
			<view class="weui-cell" v-if="invoiceType === 2">
				<view class="weui-cell__hd"><label class="weui-label">公司税号</label></view>
				<view class="weui-cell__bd"><input type="text" class="weui-input" v-model="taxNumber" placeholder="请输入公司纳税人识别号" /></view>
			</view>
			<view class="weui-cell">
				<view class="weui-cell__hd"><label class="weui-label">邮箱</label></view>
				<view class="weui-cell__bd"><input type="text" class="weui-input" v-model="email" placeholder="请输入收发票邮箱" /></view>
			</view>
		</view>
		<view class="weui-cells addInvoice__weui-cells mb10">
			<!-- 这个是个人的 -->
			<view class="weui-cell" v-if="invoiceType === 1">
				<view class="weui-cell__hd"><label class="weui-label">电话号码</label></view>
				<view class="weui-cell__bd"><input type="text" class="weui-input" v-model="regCall" placeholder="选填" /></view>
			</view>
			<!-- 以下是公司的 -->
			<view class="weui-cell" v-if="invoiceType === 2">
				<view class="weui-cell__bd">
					<view class="title">需要增值税专用发票</view>
					<view class="msg">请先与公司财务确认需要开具的是专用发票</view>
				</view>
				<view class="weui-cell__ft"><switch :checked="isOpen" @change="switchStatus" color="#5CC69A" /></view>
			</view>
			<!-- 以下是公司的开具增值税专用发票的时候 -->
			<view class="weui-cell" v-if="isOpen && invoiceType === 2">
				<view class="weui-cell__hd"><label class="weui-label">注册地址</label></view>
				<view class="weui-cell__bd"><input type="text" class="weui-input" v-model="regAddress" placeholder="请输入公司注册地址" value="" /></view>
			</view>
			<view class="weui-cell" v-if="isOpen && invoiceType === 2">
				<view class="weui-cell__hd"><label class="weui-label">公司电话</label></view>
				<view class="weui-cell__bd"><input type="text" class="weui-input" v-model="regCall" placeholder="请输入公司电话" value="" /></view>
			</view>
			<view class="weui-cell" v-if="isOpen && invoiceType === 2">
				<view class="weui-cell__hd"><label class="weui-label">开户银行</label></view>
				<view class="weui-cell__bd"><input type="text" class="weui-input" v-model="bankName" placeholder="请输入公司开户行名称" value="" /></view>
			</view>
			<view class="weui-cell" v-if="isOpen && invoiceType === 2">
				<view class="weui-cell__hd"><label class="weui-label">银行账号</label></view>
				<view class="weui-cell__bd"><input type="text" class="weui-input" v-model="bankAccount" placeholder="请输入公司银行账号" value="" /></view>
			</view>
			<!-- 以下是收件地址 -->
			<view class="weui-cell">
				<view class="weui-cell__bd">
					<view class="title">需要邮寄纸质发票</view>
					<view class="msg">邮寄方式为到付，请确认再开启</view>
				</view>
				<view class="weui-cell__ft"><switch :checked="mailStatus" @change="mailChange" color="#5CC69A" /></view>
			</view>
			<block v-if="mailStatus">
				<view class="weui-cell" >
					<view class="weui-cell__hd"><label class="weui-label">快递收件人</label></view>
					<view class="weui-cell__bd"><input type="text" class="weui-input" v-model="name" placeholder="请输入收货人的姓名" value="" /></view>
				</view>
				<view class="weui-cell">
					<view class="weui-cell__hd"><label class="weui-label">收件人电话</label></view>
					<view class="weui-cell__bd"><input type="text" class="weui-input" v-model="phone" placeholder="请输入收货人的姓名" value="" /></view>
				</view>
				<!-- <view class="weui-cell">
					<view class="weui-cell__hd"><label class="weui-label">收件地区</label></view>
					<view class="weui-cell__bd"><input type="text" class="weui-input" v-model="bankAccount" placeholder="请选择" value="" /></view>
				</view> -->
				<view class="weui-cell">
					<view class="weui-cell__hd"><label class="weui-label">详细地址</label></view>
					<view class="weui-cell__bd"><input type="text" class="weui-input" v-model="address" placeholder="请输入街道门牌等信息" value="" /></view>
				</view>
			</block>
			<view class="weui-cell">
				<view class="weui-cell__bd">设为默认发票</view>
				<view class="weui-cell__ft text_r"><switch :checked="checked" @change="tab" color="#5CC69A" /></view>
			</view>
		</view>
		<view class="save"><button type="primary" class="bg_89674c" @click="btnSure">保存</button></view>
	</view>
</template>

<script>
import {post } from '@/utils';

export default {
	onLoad(e) {
		if (e.id) {
			this.invoiceId = e.id;
			this.hasSetText="编辑常用发票信息"
		}
		uni.setNavigationBarTitle({
			title: this.hasSetText
		});
	},
	onShow() {
		console.log(this.userId)
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
		if (this.invoiceId) {
			this.getInvoiceInfo();
		}
	},
	data() {
		return {
			invoiceId: '', //编辑的时候传进来的id
			hasSetText: '新增常用发票信息',
			checked: true,
			isDefault: 1,
			invoiceType: 1, //1:个人；2：公司
			isOpen: false, //是否打开需要增值税专用发票
			isVATExclusive: 0, //0:不需要专用发票；1：需要
			userId: '',
			token: '',
			headerName: '', //抬头名称
			taxNumber: '', //税号
			bankName: '', //开户银行
			regCall: '', //注册电话
			bankAccount: '', //银行账号
			regAddress: '', //注册地址
			email:'',//邮箱
			
			mailStatus:false,//邮寄地址开启
			name:'',
			phone:'',
			address:'',
		};
	},
	methods: {
		shiftInvoiceType(index) {
			this.invoiceType = index;
		},
		mailChange(){
			this.mailStatus =!this.mailStatus;
		},
		switchStatus() {
			this.isOpen = !this.isOpen;
			if (this.isOpen) {
				this.isVATExclusive = 1;
			} else {
				this.isVATExclusive = 0;
			}
		},
		tab() {
			console.log(this.checked);
			//var isDefault = "";
			if (this.isDefault === 1) {
				this.isDefault = 0;
				this.checked = false;
			} else {
				this.isDefault = 1;
				this.checked = true;
			}
		},
		// 校验
		Authentication() {
			if (this.headerName == '') {
				uni.showToast({
					title: '请输入抬头名称！',
					icon: 'none',
					duration: 1500
				});
				return false;
			}
			if (this.email == '') {
				uni.showToast({
					title: '请输入收件邮箱！',
					icon: 'none',
					duration: 1500
				});
				return false;
			}
			const myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
			if(!myReg.test(this.email)){
				uni.showToast({
					title: '请输入正确的邮箱！',
					icon: 'none',
					duration: 1500
				});
				return false;
			}
			if (this.invoiceType === 1) {
				if (this.regCall != '') {
					if (!(/^0\d{2,3}-\d{7,8}$/.test(this.regCall) || /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.regCall))) {
						uni.showToast({
							title: '请输入正确的电话格式！',
							icon: 'none',
							duration: 1500
						});
						return false;
					}
				}
			}
			if (this.invoiceType === 2) {
				if (this.taxNumber == '') {
					uni.showToast({
						title: '请输入税号！',
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				if (this.isOpen) {
					if (this.regAddress == '') {
						uni.showToast({
							title: '请输入注册地址！',
							icon: 'none',
							duration: 1500
						});
						return false;
					}
					if (this.regCall == '') {
						uni.showToast({
							title: '请输入公司电话！',
							icon: 'none',
							duration: 1500
						});
						return false;
					}
					if (this.regCall != '') {
						if (!(/^0\d{2,3}-\d{7,8}$/.test(this.regCall) || /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.regCall))) {
							uni.showToast({
								title: '请输入正确的电话格式！',
								icon: 'none',
								duration: 1500
							});
							return false;
						}
					}
					if (this.bankName == '') {
						uni.showToast({
							title: '请输入开户银行！',
							icon: 'none',
							duration: 1500
						});
						return false;
					}
					if (this.bankAccount == '') {
						uni.showToast({
							title: '请输入银行账号！',
							icon: 'none',
							duration: 1500
						});
						return false;
					}
					//少了一个当银行卡号填写的时候，没有判断银行的卡号，需要拿到最新的h5代码
					if (this.bankAccount != '' && !/^([1-9]{1})(\d{15}|\d{16}|\d{18})$/.test(this.bankAccount)) {
						uni.showToast({
							title: '银行卡号格式错误！',
							icon: 'none',
							duration: 1500
						});
						return false;
					}
				}
			}
			if(this.mailStatus){
				if (this.name == '') {
					uni.showToast({
						title: '请输入收件人姓名！',
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				
				if (this.phone == '') {
					uni.showToast({
						title: '请输入电话！',
						icon: 'none',
						duration: 1500
					});
					return false;
				}
				if (this.phone != '') {
					if (!(/^0\d{2,3}-\d{7,8}$/.test(this.phone) || /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.phone))) {
						uni.showToast({
							title: '请输入正确的收件人电话格式！',
							icon: 'none',
							duration: 1500
						});
						return false;
					}
				}
				
				if (this.address == '') {
					uni.showToast({
						title: '请输入收件地址！',
						icon: 'none',
						duration: 1500
					});
					return false;
				}
			}
			return true;
		},
		btnSure() {
			//点击保存按钮
			if (!this.invoiceId) {
				if (this.Authentication()) {
					this.addInvoice();
				}
			} else {
				if (this.Authentication()) {
					this.updateInvoice();
				}
			}
		},
		async getInvoiceInfo() {
			//获取发票信息
			let result = await post('Invoice/GetInfo', {
				Id: this.invoiceId,
				UserId: this.userId,
				Token: this.token
			});
			const data = result.data;
			this.headerName = data.HeaderName;
			this.taxNumber = data.TaxNumber;
			this.bankName = data.BankName;
			this.email = data.Email;
			this.regCall = data.RegCall;
			this.bankAccount = data.BankAccount;
			this.bankName = data.BankName;
			this.regAddress = data.RegAddress;
			this.isVATExclusive = data.IsVATExclusive;
			this.mailStatus = Boolean(data.Invoiceformat*1);
			this.name = data.Consignee;
			this.phone = data.Phone;
			this.address = data.Address;
			if (this.regCall) {
				this.isOpen = true;
			}
			this.invoiceType = data.InvoiceTitle;
			this.isDefault = data.IsDefault;
			this.checked = Boolean(data.IsDefault);
		},
		async addInvoice() {
			//新增发票信息
			let result = await post('Invoice/Addinvoice', {
				UserId: this.userId,
				Token: this.token,
				InvoiceTitle: this.invoiceType,
				HeaderName: this.headerName,
				Email:this.email,
				RegCall: this.regCall,
				IsDefault: this.isDefault,
				TaxNumber: this.taxNumber,
				BankName: this.bankName,
				BankAccount: this.bankAccount,
				RegAddress: this.regAddress,
				IsVATExclusive: this.isOpen?1:0,
				Invoiceformat:this.mailStatus?1:0,
				Consignee:this.mailStatus?this.name:'',
				Address:this.mailStatus?this.address:'',
				Phone:this.mailStatus?this.phone:''
			});
			let _this = this;
			if (result.code === 0) {
				uni.showToast({
					title: '新增成功！',
					icon: 'none',
					duration: 1500,
					success: function() {
						setTimeout(function() {
							uni.navigateBack();
							// uni.redirectTo({
							// 	url:"/pages/member/invoiceList/invoiceList"
							// })
						}, 1500);
					}
				});
			}
		},
		async updateInvoice() {
			//编辑
			let result = await post('Invoice/UpdateInvoice', {
				Id: this.invoiceId,
				UserId: this.userId,
				Token: this.token,
				InvoiceTitle: this.invoiceType,
				IsVATExclusive: this.isOpen?1:0,
				HeaderName: this.headerName,
				Email:this.email,
				RegCall: this.regCall,
				IsDefault: this.isDefault,
				TaxNumber: this.taxNumber,
				BankName: this.bankName,
				BankAccount: this.bankAccount,
				RegAddress: this.regAddress,
				Invoiceformat:this.mailStatus?1:0,
				Consignee:this.mailStatus?this.name:'',
				Address:this.mailStatus?this.address:'',
				Phone:this.mailStatus?this.phone:''
			});
			let _this = this;
			if (result.code === 0) {
				uni.showToast({
					title: '保存成功！',
					icon: 'none',
					duration: 1500,
					success: function() {
						setTimeout(function() {
							uni.navigateBack();
							// uni.redirectTo({
							// 	url:"/pages/member/invoiceList/invoiceList"
							// })
						}, 1500);
					}
				});
			}
		}
	}
};
</script>

<style lang="scss">
@import '../../../common/dd_style.css';
 .save{
	 background: #5cc69a;
	 color: #fff;
	 width: 90%;
	 height: 88rpx;
	 line-height: 88rpx;
	 border-radius: 10rpx;
	 text-align: center;
	 margin: 60rpx 30rpx;
	button{
		border-radius: 10rpx;
	}
 }
</style>
