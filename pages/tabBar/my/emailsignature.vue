<template>
	<!-- 账号管理 -> (邮箱) (个性签名) -->
	<view class="emailsignature">
		<view class="email" v-if="emails == 0">
			<view class="emails">
				<view class="">邮箱：</view>
				<input type="text" value="" placeholder="请输入" />
			</view>
			<view class="character">限1-16个字符</view>
		</view>
		
		<view class="ignature" v-if="emails == 1">
			<textarea placeholder-style="color:#CCCCCC;font-size:28upx;" placeholder="请输入你的个性签名"/>
			<view class="ignatures">0/30</view>
		</view>
		
		<view class="confirm">确定</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			emails: 0 //0 邮箱  1 个性签名
		};
	},
	onLoad(e) {
		console.log(e);
		this.emails = e.type
		if(e.type == 1){
			uni.setNavigationBarTitle({
			    title: '个性签名'
			});
		}
	},
	methods: {
		tolick(url) {
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style scoped lang="scss">
.emailsignature {
	margin-top: 30upx;
	.email{
		.emails {
			display: flex;
			background: #fff;
			padding: 30upx;
			input{
				font-size:28upx;
				padding-left: 30upx;
				margin-top: 8upx;
			}
		}
		.character{
			font-size: 24upx;
			color:rgba(153,153,153,1);
			padding: 20upx 30upx 0;
		}
	}
	.ignature{
		background: #fff;
		padding:30upx;
		.ignatures{
			font-size:24upx;
			color: #666666;
			display: flex;
			justify-content: flex-end;
		}
	}
	.confirm{
		width:90%;
		height:98upx;
		background:rgba(92,198,154,1);
		border-radius:10upx;
		font-size:32upx;
		color:#fff;
		line-height: 98upx;
		text-align: center;
		position: fixed;
		bottom: 80rpx;
		left: 30rpx;
	}
	
}
</style>
