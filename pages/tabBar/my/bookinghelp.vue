<template>
	<!-- 预订帮助 -->
	<view class="bookinghelp">
		<uni-collapse @change="change" accordion="true">
		    <uni-collapse-item title="怎么订星球客房间? " open="true"thumb="1">
		        <view style="padding: 30rpx;"> 选择首页的景区点击进入详情页，会有星球客的房间介绍，点击预定，选择时间，支付就可以了 </view>
		    </uni-collapse-item>
			<uni-collapse-item title="每个景区的星球客房间价格是否不同？" thumb="2">
			    <view class="rank"></view>
				<view style="padding: 30rpx;">
			        选择首页的景区点击进入详情页，会有星球客的房间介绍，点击预定，选择时间，支付就可以了
			    </view>
			</uni-collapse-item>
			<uni-collapse-item title="取消订房是否收取手续费?" thumb="3">
			    <view style="padding: 30rpx;">
			        选择首页的景区点击进入详情页，会有星球客的房间介绍，点击预定，选择时间，支付就可以了
			    </view>
			</uni-collapse-item>
			<uni-collapse-item title="是否需要评价?" thumb="4">
			    <view style="padding: 30rpx;">
			        选择首页的景区点击进入详情页，会有星球客的房间介绍，点击预定，选择时间，支付就可以了
			    </view>
			</uni-collapse-item>
		</uni-collapse>
		
	</view>
</template>

<script>
	import { post } from '@/utils'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
	import uniCollapseItem from '@/components/uni-collapse/uni-collapse-item.vue';
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		onLoad(e) {
			
		},
		data() {
			return {
				userId:'',
				token:'',
			}
		},
		onShow() {
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			// this.getHelpInfo()
		},
		methods: {
			tolick(url){
				uni.navigateTo({
					url:url
				})
			},
			// 获取帮助详细信息
			// getHelpInfo(){
			// 	post('/Help/GetHelpInfo',{
			// 		UserId: this.userId,
			// 		Token: this.token,
			// 		Id: this.Page,
			// 	}).then( res => {
			// 		console.log(res,'res2')
			// 	})
			// }
		}
	}
</script>

<style scoped>
	.bookinghelp{
		margin-top: 20upx;
		background: #fff;
	}
	.rank{
		width:38upx;
		height:38upx;
		background:rgba(92,198,154,0.3);
		border-radius:50%;
	}
</style>
