<template>
	<!-- 帮助内容详情页 -->
	<view class="help">
		<view class="Title">{{list.Title}}</view>
		<view v-html="list.Contents" class="Contents">{{list.Contents}}</view>
	</view>
</template>

<script>
	import { post } from '@/utils'
	export default {
		data(){
			return{
				Id :'',
				list:{},
			}
		},
		onLoad(e) {
			this.Id = e.Id
		},
		onShow() {
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			this.getHelpInfo()
		},
		methods:{
			// 获取帮助详细信息
			getHelpInfo(){
				post('/Help/GetHelpInfo',{
					UserId: this.userId,
					Token: this.token,
					Id: this.Id,
				}).then( res => {
					if(res.code === 0){
						this.list = res.data
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.help{
		background: #fff;
		padding: 30upx;
		.Title{
			font-size: 32upx;
			font-weight: bold;
			padding-bottom: 30upx;
		}
		.Contents{
			font-size: 28upx;
			color: #666;
		}
	}
</style>
