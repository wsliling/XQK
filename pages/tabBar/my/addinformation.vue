<template>
	<!-- 添加常用信息 -->
	<view class="content">
		<view class="weui-cells addInvoice__weui-cells mb10">
			<view class="weui-cell">
				<view class="weui-cell__hd"><label class="weui-label">入住人</label></view>
				<view class="weui-cell__bd"><input type="text" class="weui-input" v-model="FullName" placeholder="请输入入住人的姓名" value="" /></view>
			</view>
			<view class="weui-cell">
				<view class="weui-cell__hd"><label class="weui-label">证件类型</label></view>
				<view class="weui-cell__bd">身份证</view>
			</view>
			<view class="weui-cell">
				<view class="weui-cell__hd"><label class="weui-label">证件号码</label></view>
				<view class="weui-cell__bd"><input type="text" class="weui-input" maxlength="19" v-model="Idcard" placeholder="请输入证件信息" value="" /></view>
			</view>
			<view class="weui-cell">
				<view class="weui-cell__hd"><label class="weui-label">手机号</label></view>
				<view class="weui-cell__bd"><input type="text" class="weui-input" maxlength="11" v-model="Mobile" placeholder="请输入入住人的手机号" value="" /></view>
			</view>
			<view class="weui-cell">
				<view class="weui-cell__hd"><label class="weui-label">邮箱</label></view>
				<view class="weui-cell__bd"><input type="text" class="weui-input" v-model="Email" placeholder="请输入入住人的邮箱" value="" /></view>
			</view>
			<view class="weui-cell">
				<checkbox :checked="checked" color="#5CC69A" style="transform:scale(0.7)" @click="tab" />
				<view class="weui-cell__bd">设为默认</view>
			</view>
		</view>
		<view class="btnBox" style="padding:60upx 20upx"><button type="primary" class="infos" @click="btnSure">保存</button></view>
	</view>
</template>

<script>
import { post, get, getCurrentPageUrlWithArgs, verifyPhone } from '@/utils';

export default {
	data() {
		return {
			invoiceId: '', //编辑的时候传进来的id
			curPage: '',
			hasSetText: '编辑常用发票信息',
			userId: '',
			token: '',
			checked: true,
			IsDefault: 1, // 是否默认 1=是
			FullName: '', // 入住人姓名
			Type: 0, // 0-身份证
			Idcard: '', // 证件号码
			Mobile: '', // 手机号
			Email: '' // 邮箱
		};
	},
	onLoad(e) {
		// 编辑传过来的id
		if (e.id) {
			this.invoiceId = e.id;
			uni.setNavigationBarTitle({
				title: this.hasSetText
			});
		}
		if (e.IsDefault === 1) {
			this.IsDefault = e.IsDefault;
			this.checked = true;
		} else {
			this.checked = false;
		}
	},
	onShow() {
		this.curPage = getCurrentPageUrlWithArgs()
			.replace(/\?/g, '%3F')
			.replace(/\=/g, '%3D')
			.replace(/\&/g, '%26');
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
		if (this.invoiceId) {
			this.getInvoiceInfo(); //根据用户常用信息Id返回详情
		}
	},
	methods: {
		tab() {
			if (this.IsDefault === 1) {
				this.IsDefault = 0;
				this.checked = false;
			} else {
				this.IsDefault = 1;
				this.checked = true;
			}
			this.tacitlyInvoice();
		},
		// 验证输入的信息
		Authentication() {
			var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (this.FullName == '') {
				uni.showToast({
					title: '请输入入住人的姓名！',
					icon: 'none',
					duration: 1500
				});
				return false;
			}
			if (this.Idcard == '') {
				uni.showToast({
					title: '请输入证件号码！',
					icon: 'none',
					duration: 1500
				});
				return false;
			}
			if (this.Mobile == '') {
				uni.showToast({
					title: '请输入入住人的手机号！',
					icon: 'none',
					duration: 1500
				});
				return false;
			} else if (!(/^0\d{2,3}-\d{7,8}$/.test(this.Mobile) || /^[1][3,4,5,6,7,8][0-9]{9}$/.test(this.Mobile))) {
				uni.showToast({
					title: '请输入正确的手机号！',
					icon: 'none',
					duration: 1500
				});
				return false;
			}
			if (this.Email == '') {
				uni.showToast({
					title: '请输入入住人的邮箱！',
					icon: 'none',
					duration: 1500
				});
				return false;
			} else if (!myreg.test(this.Email)) {
				uni.showToast({
					title: '请输入正确的邮箱！',
					icon: 'none',
					duration: 1500
				});
				return false;
			}
			return true;
		},
		// //点击保存按钮
		btnSure() {
			if (this.invoiceId == '') {
				if (this.Authentication()) {
					//验证输入的信息
					this.addInvoice(); //新增用户常用信息
				}
			} else {
				if (this.Authentication()) {
					this.updateInvoice(); //修改用户常用信息
				}
			}
		},
		//根据用户常用信息Id返回详情
		async getInvoiceInfo() {
			let result = await post('User/GetUserForInfo', {
				UserId: this.userId,
				Token: this.token,
				Uid: this.invoiceId
			});
			if (result.code === 0) {
				this.FullName = result.data.FullName; //入住人姓名
				this.Type = result.data.Type; //0-身份证
				this.Idcard = result.data.Idcard; //证件号码
				this.Mobile = result.data.Mobile; //手机号
				this.Email = result.data.Email; //邮箱
				this.IsDefault = result.data.IsDefault; //是否默认 1=是
				if (this.IsDefault === 1) {
					this.checked = true;
				}
			}
		},
		// 设置默认用户常用信息
		async tacitlyInvoice() {
			let result = await post('User/UserInfoDefault', {
				UserId: this.userId,
				Token: this.token,
				Uid: this.invoiceId
			});
			if (result.code === 0) {
				uni.showToast({
					title: result.msg,
					icon: 'none',
					duration: 1500
				});
			} else {
				uni.showToast({
					title: result.msg,
					icon: 'none',
					duration: 1500
				});
			}
		},
		//新增用户常用信息
		async addInvoice() {
			let UserInfo = {
				IsDefault: this.IsDefault, //是否默认 1=是
				Type: this.Type, //0-身份证
				FullName: this.FullName, //姓名
				Idcard: this.Idcard, //身份证号
				Mobile: this.Mobile, //手机号
				Email: this.Email //邮箱
			};
			let result = await post('User/AddUserInfo', {
				UserId: this.userId,
				Token: this.token,
				UserInfo: UserInfo
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
						}, 1500);
					}
				});
			} else if (result.code === 2) {
				uni.showToast({
					title: '登录超时！',
					icon: 'none',
					duration: 1500,
					success: function() {
						uni.navigateTo({
							url: '/pages/login/login?askUrl=' + _this.curPage
						});
					}
				});
			} else {
				uni.showToast({
					title: result.msg,
					icon: 'none',
					duration: 1500
				});
			}
		},
		//修改用户常用信息
		async updateInvoice() {
			let UserInfo = {
				Id: this.invoiceId, //修改的用户常用信息Id
				IsDefault: this.IsDefault, //是否默认 1=是
				Type: this.Type, //0-身份证
				FullName: this.FullName, //姓名
				Idcard: this.Idcard, //身份证号
				Mobile: this.Mobile, //手机号
				Email: this.Email //邮箱
			};
			let result = await post('User/EditUserInfo', {
				UserId: this.userId,
				Token: this.token,
				UserInfo: UserInfo
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
						}, 1500);
					}
				});
			} else if (result.code === 2) {
				uni.showToast({
					title: '登录超时！',
					icon: 'none',
					duration: 1500,
					success: function() {
						uni.navigateTo({
							url: '/pages/login/login?askUrl=' + _this.curPage
						});
					}
				});
			} else {
				uni.showToast({
					title: result.msg,
					icon: 'none',
					duration: 1500
				});
			}
		}
	}
};
</script>

<style lang="scss">
@import '../../../common/dd_style.css';
uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	color: #fff !important;
}
uni-checkbox .uni-checkbox-input {
	border: 1px solid #5cc69a;
}
uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	color: #5cc69a;
}
.infos {
	height: 88upx;
	line-height: 88upx;
	background: #5cc69a;
	color: #fff;
	border-radius: 10upx;
}
</style>
