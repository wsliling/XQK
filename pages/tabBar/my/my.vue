<template>
	<!-- 我的 -->
	<view class="myPage uni-bg-white">
		<view class="pd15">
			<view>
				<view class="myset">
					<view class="hint iconfont icon-xiaoxi"  @click="navigate('message/messageClass')"> <span v-if="info.NewsRedDot"></span></view>
					<view class="set iconfont icon-shezhi" @click="navigate('tabBar/my/setting')"><span v-if="info.SetRedDot"></span></view>
				</view>
				
			</view>
			<view class="memberTop">
				<view class="info" @click="navigate('tabBar/my/account')">
					<view class="name uni-ellipsis">{{info.NickName}}</view>
					<view class="c_theme">查看并编辑个人资料</view>
					<view class="datanum flex-center">
						<view class="flex-center">
							关注<text class="num">{{info.Follow}}</text>
						</view>
						<view class="flex-center">
							粉丝<text class="num">{{info.Fans}}</text>
						</view>
					</view>
				</view>
				<view class="tx" @click="navigate('tabBar/my/account')">
					<image :src="info.Avatar||'http://xqk.wtvxin.com/images/wxapp/default.png'" mode="widthFix"></image>
				</view>
			</view>
			<!-- 消息中心 -->
			<view class="member_section border_bottom" v-if="false">
				<view class="section_hd">消息中心</view>
				<view class="section_bd">
					<view class="li_33">
						<view class="item">
							<view class="iconImg p_re">
								<view class="iconfont icon-xiaoxi"></view>
								<text class="circleNum"></text>
							</view>
							<view class="txt">未读消息</view>
						</view>
						<view class="item">
							<view class="iconImg">
								<view class="iconfont icon-youjian"></view>
							</view>
							<view class="txt">已读消息</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 我的圈子 -->
			<view class="member_section border_bottom">
				<view class="section_hd">我的圈子</view>
				<view class="section_bd">
					<view class="li_33">
						<view class="item" @click="navigate('tabBar/my/collect')">
							<view class="iconImg">
								<view class="iconfont icon-aixin2"></view>
							</view>
							<view class="txt">我的收藏</view>
						</view>
						<view class="item" @click="navigate('tabBar/my/myrelease')">
							<view class="iconImg">
								<view class="iconfont icon-xiangji"></view>
							</view>
							<view class="txt">我的发布</view>
						</view>
						<view class="item" @click="navigate('tabBar/my/myfocus')">
							<view class="iconImg">
								<view class="iconfont icon-guanzhu"></view>
							</view>
							<view class="txt">我的关注</view>
						</view>
						<view class="item" @click="navigate('tabBar/my/seereply')">
							<view class="iconImg" :class="{'dot':info.ReplyRedDot}">
								<view class="iconfont icon-pinglun1"></view>
							</view>
							<view class="txt">查看回复</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 更多服务 -->
			<view class="member_section">
				<view class="section_hd">更多服务</view>
				<view class="section_bd">
					<view class="li_33">
						<view class="item" @click="navigate('tabBar/my/coupon')">
							<view class="iconImg" :class="{'dot':info.CouponNum}">
								<view class="iconfont icon-youhuiquan"></view>
							</view>
							<view class="txt">优惠券</view>
						</view>
						<view class="item" @click="navigate('tabBar/my/invoiceList')">
							<view class="iconImg">
								<view class="iconfont icon-fapiao"></view>
							</view>
							<view class="txt">发票中心</view>
				
						</view>
						<view class="item" @click="navigate('tabBar/my/myAppraise')">
							<view class="iconImg" :class="{'dot':info.num_dpj}">
								<view class="iconfont icon-bianji"></view>
							</view>
							<view class="txt">我要评价</view>
						</view>
						<view class="item" @click="navigate('tabBar/my/information')">
							<view class="iconImg">
								<image class="myimg" src="http://xqk.wtvxin.com/images/wxapp/icons/info.png" mode=""></image>
							</view>
							<view class="txt">常用信息</view>
						</view>
						<view class="item" @click="navigate('tabBar/my/gethelp')">
							<view class="iconImg" :class="{'dot':info.HelpRedDot}">
								<view class="iconfont icon-help"></view>
							</view>
							<view class="txt">获取帮助</view>
						</view>
						<view class="item" @click="navigate('tabBar/my/feedback')">
							<view class="iconImg">
								<view class="iconfont icon-fankui"></view>
							</view>
							<view class="txt">意见反馈</view>
						</view>
						<view class="item" @click="navigate('tabBar/my/security')">
							<view class="iconImg" :class="{'dot':info.SafeRedDot}">
								<view class="iconfont icon-anquan1"></view>
							</view>
							<view class="txt">安全中心</view>
						</view>
						<view class="item" @click="navigate('tabBar/my/kefu')">
							<view class="iconImg">
								<view class="iconfont icon-kefu"></view>
							</view>
							<view class="txt">联系客服</view>
						</view>
					</view>
				</view>
			</view>
			<view class="ftbtn flex-column uni-mb10"  @click="navigate('tabBar/my/wantplanet')">
				我也想要星球客
			</view>
		</view>
		<view style="height: 120upx;"></view>
		<tabbar :current="4"></tabbar>
		<!-- 绑定手机号弹框 -->
		<!-- <uni-popup type="center" ref="tiedphone">
			<view class="phonebox">
				<view class="binding">绑定手机号</view>
				<view class="close" @click="close()">x</view>
				<view class="cell-phone">
					<image src="http://xqk.wtvxin.com/images/wxapp/icons/phones.png" mode=""></image>
					<input type="text" value="" placeholder="请绑定您的手机号码"/>
				</view>
				<view class="security">
					<view class="verification">
						<image src="http://xqk.wtvxin.com/images/wxapp/icons/code.png" mode=""></image>
						<input type="text" value="" placeholder="请输入手机验证码"/>
					</view>
					<view class="getcode">获取验证码</view>
				</view>
				<view class="confirm">确定</view>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	import {post,get,judgeLogin,navigate} from '@/utils';
	import tabbar from '@/components/tabbar.vue';
	import popup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			tabbar,
			popup
		},
		data() {
			return {
				navigate,
				userId:'',
				token:'',
				info:{},
			}
		},
		onLoad(){

		},
		onShow(){
			if(!judgeLogin())return;
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			this.getUserInfo();
		},
		methods: {
			tiedphone(){
				this.$refs.tiedphone.open()
			},
			close(){
				this.$refs.tiedphone.close()
			},
			async getUserInfo(){
				const res = await post('User/GetCenterInfo',{
					UserId:this.userId,
					Token:this.token,
				})
				this.info = res.data;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './style';
	.myimg{
		width:56upx;
		height:54upx;
	}
	.phonebox{
		background: #fff;
		padding: 45upx 48upx;
		.binding{
			text-align: center;
			font-size:32upx;
			font-weight:bold;
		}
		.close{
			position: absolute;
			width: 42upx;
			height: 42upx;
			right: 38upx;
			top: 50upx;
			color: #fff;
			background: #b2b2b2;
			-webkit-border-radius: 50%;
			border-radius: 50%;
			text-align: center;
			line-height: 32upx;
			font-size: 30upx;
		}
		.cell-phone{
			display: flex;
			justify-content: flex-start;
			border-bottom: 1upx solid #ECECEC;
			padding: 30upx 0;
			image{
				width:32upx;
				height:48upx;
				margin-right: 30upx;
			}
			input{
				font-size: 24upx;
				text-align: left;
				margin-top: 10upx;
			}
		}
		.security{
			display: flex;
			justify-content: space-between;
			border-bottom: 1upx solid #ECECEC;
			padding: 30upx 0;
			.verification{
				display: flex;
				justify-content: flex-start;
				image{
					width:37upx;
					height:40upx;
					margin-right: 30upx;
				}
				input{
					font-size: 24upx;
					text-align: left;
					margin-top: 10upx;
				}
			}
			.getcode{
				width:188upx;
				height:64upx;
				border:2upx solid rgba(92,198,154,1);
				border-radius:4upx;
				color: #5CC69A;
			}
		}
		.confirm{
			width:462upx;
			height:80upx;
			background:rgba(92,198,154,1);
			border-radius:8upx;
			font-size:28upx;
			color:#fff;
			line-height: 80upx;
			text-align: center;
			margin: 0 auto;
			margin-top: 56upx;
		}
	}
</style>
