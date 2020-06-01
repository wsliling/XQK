<template>
	<!-- 获取帮助 -->
	<view class="get_help">
		<view class="gethelp">
			<view class="gethelp-flex" v-for="(val,key) in classList" :key='key' @click="tolick('/pages/tabBar/my/bookinghelp')">
				<view class="">{{val.Name}}</view>
				<image  src="../../../static/icons/arrow.png" mode=""></image>
			</view>
		</view>
		<view class="gh_flex">
			<view class="help">仍然需要帮助?</view>
			<view class="service" @click="tolick('/pages/tabBar/my/kefu')">联系客服</view>
		</view>
	</view>

</template>

<script>
	import { post } from '@/utils'
	export default {
		data() {
			return {
				UserId: '',
				Token: '',
				Page:0,
				classList:[],
			}
		},
		onShow() {
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			this.getHelpList()
			this.getClassList()
			// this.getHelpInfo()
		},
		methods: {
			tolick(url){
				uni.navigateTo({
					url:url
				})
			},
			// 帮助列表
			getHelpList(){
				post('Help/HelpList',{
					UserId: this.userId,
					Token: this.token,
					Page: this.Page,
				}).then( res => {
					console.log(res,'res')
				})
			},
			// 获取帮助分类
			getClassList(){
				post('Help/HelpClassList',{
				}).then( res => {
					if(res.code === 0) {
						this.classList = res.data
					}
				})
			},
			
		}
	}
</script>

<style scoped>
	.get_help{
		background: #fff;
		height: 100vh;
		padding: 0 30upx;
		color:rgba(51,51,51,1);
	}
	.gethelp{
		margin-top: 20upx;
	}
	.gethelp-flex{
		background: #fff;
		padding: 40upx 0;
		border-bottom: 1upx solid #ECECEC;
		display: flex;
		justify-content: space-between;
	}
	image{
		width:12upx;
		height:20upx;
		margin-top: 12upx;
	}
	.gh_flex{
		background: #fff;
		position: fixed;
		bottom: 20upx;
		display: flex;
		width: 100%;
		left: 0;
		z-index: 9;
		padding: 0 15px;
	}
	.help{
		margin-top: 16upx;
		float: left;
		width: 71%;
	}
	.service{
		width:200upx;
		height:80upx;
		background:rgba(92,198,154,1);
		border-radius:10upx;
		font-size:28upx;
		color:rgba(255,255,255,1);
		line-height: 80upx;
		text-align: center;
	}
</style>
