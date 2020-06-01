<template>
	<!-- 预订帮助 -->
	<view class="bookinghelp">
		<view v-for="(val, key) in list" :key="key" >
			<uni-collapse accordion="true">
			    <uni-collapse-item :title="val.Title" thumb="1">
			        <view style="padding: 30rpx;" @click="tolick('/pages/tabBar/my/helpcontent?Id=' + val.Id)"> {{val.Jianjie}} </view>
			    </uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	import { post } from '@/utils'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue';
	import uniCollapseItem from '@/components/uni-collapse/uni-collapse-item.vue';
	export default {
		data() {
			return {
				userId:'',
				token:'',
				Cid :'',
				list:[],
			}
		},
		components: {
			uniCollapse,
			uniCollapseItem
		},
		onLoad(e) {
			this.Cid = e.Id
		},
		onShow() {
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			this.getHelpList()
		},
		methods: {
			tolick(url){
				console.log(url,'url')
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
					Cid: this.Cid,
				}).then( res => {
					if(res.code === 0){
						this.list = res.data
					}
				})
			},
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
