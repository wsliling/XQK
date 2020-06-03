<template>
	<!-- 我的关注 -->
	<view class="myfocus">
		<view class="focus" v-for="(val,key) in 6" :key="key">
			<view class="focusleft">
				<view class="forcusimg">
					<image src="http://xqk.wtvxin.com/images/wxapp/default.png" mode=""></image>
				</view>
				<view class="focuscenter">
					<view class="focusbox">
						<view class="">筱风月忆</view>
						<view class="focusfz">慈悲如月 温暖如阳</view>
					</view>
					<view class="focusright">已关注</view>
				</view>
			</view>
		</view>
		<view class="focus">
			<view class="focusleft next" v-for="(val,key) in 2" :key="key">
				<view class="forcusimg">
					<image src="http://xqk.wtvxin.com/images/wxapp/default.png" mode=""></image>
				</view>
				<view class="focuscenter">
					<view class="focusbox">
						<view class="">筱风月忆</view>
						<view class="focusfz">慈悲如月 温暖如阳</view>
					</view>
					<view class="focusright active">已关注</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { post,navigate} from '@/utils';
export default {
	data(){
		return {
			navigate,
			userId: '',
			token: '',
			PageSize: 10,
			Page: 1,
			loadingType: 0, //0加载前，1加载中，2没有更多了
			list:[],
		}
	},
	onLoad(){
		this.init();
	},
	methods:{
		init(){
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			this.loadMore===0;
			this.Page = 1;
			this.getData();
		},
		async getData(){
			this.loadMore =1;
			const res = await post('Find/UserFollowList',{
				UserId: this.userId,
				Token: this.token,
				Page:this.page,
				PageSize:this.pageSize,
				myType:0,//0--我的关注，1--我的粉丝
			})
			const data = res.data;
			if(data.length<this.pageSize){
				this.loadMore =2;
			}else{
				this.loadMore =0;
			}
			if(this.page===1){
				this.list = [];
			}
			this.list.push(...data);
		},
	},
	onPullDownRefresh(){
		uni.stopPullDownRefresh()
		this.init();
	},
	// 上拉加载
	onReachBottom: function() {
		if(this.loadMore===2)return;
		this.page+=1;
		this.getData();
	},
}
</script>

<style lang="scss" scoped>
	.myfocus{
		.focus{
			background: #fff;
			.next{
				margin-top: 20upx;
			}
			.focusleft{
				padding-top: 30upx;
				display: flex;
				.forcusimg{
					height:88upx;
					border-radius:50%;
					padding: 0 30upx;
					image{
						width:88upx;
						height:88upx;
					}
				}
				.focuscenter{
					display: flex;
					justify-content: space-between;
					width: 100%;
					padding-right: 30upx;
					border-bottom: 1upx solid #ECECEC;
					padding-bottom: 20upx;
					.focusbox{
						font-size:32upx;
						.focusfz{
							font-size:24upx;
							color:rgba(125,125,125,1);
						}
					}
					.focusright{
						width:140upx;
						height:56upx;
						background:rgba(246,247,251,1);
						border-radius:8upx;
						font-size:28upx;
						color:rgba(153,153,153,1);
						line-height: 56upx;
						text-align: center;
						margin-top: 16upx;
					}
					.active{
						background: #5CC69A;
						color: #fff;
					}
				}
				// .focuscenter:last-child{
				// 	border-bottom: none;
				// }
			}
			
		}
	}
	
</style>
