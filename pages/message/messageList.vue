<template>
	<view>
		<!-- :class="['uni-mt10',index==1?'uni-list':'Messagelist']" -->
		<view class="Messagelist">
			<block v-for="(item,index) in list" :key="index">
				<view class="list-item" @click="goDetail(item)">
					<view class="center uni-mb10">
						<text class="time">{{item.PubTime}}</text>
					</view>
					<view class="txtbox" :class="{'islook':item.Islook}">
						<view class="title position">
							{{item.title}}
							<div class="dot" v-if="!item.Islook"></div>
						</view>
						<view class="uni-list-cell-navigate uni-navigate-right">
							<view class="desc text-line2">
								<uParse :content="item.Memo" />
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="uni-tab-bar-loading" v-if="list.length&&page>1">
			<uni-load-more :loadingType="loadingType"></uni-load-more>
		</view>
		<noData v-if="!list.length"></noData>
	</view>
</template>

<script>
	import {post,navigate} from '@/utils';
	import uParse from '@/components/uParse/src/wxParse.vue';
	import noData from '@/components/notData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'; //加载更多
	export default {
		components: {
			noData,uParse
		},
		data() {
			return {
				navigate,
				userId: "",
				token: "",
				id:0,//0 系统消息 1 小星君
				loadingType: 0, //0加载前，1加载中，2没有更多了
				page: 1,
				pageSize: 10,
				list:[],
				
			}
		}, 
		onLoad: function(e) {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.id=e.id;
			if(e.id == -1){
				uni.setNavigationBarTitle({
					title: "小星君"
				})
			}
			this.NoticeList();
		},
		onShow(){
			// if (toLogin(this.curPage)) {
				// this.NoticeList();
				// uni.setNavigationBarTitle({
					// title: this.keyname
				// })
			// }
		},
		methods: {
			// Islook: 0
			// Memo: "<p>系统通知1系统通知1系统通知1系统通知1</p>"
			// MsgType: 0
			// NoticeType: 0
			// PubTime: "15小时前"
			// id: 6
			// title: "系统通知1"
			// unCount: 1
			/*获取消息列表*/
			async NoticeList() {
				this.loadingType = 1;
				let url = this.id==-1?'News/NoticeList':'News/MyNoticeList';
				let result = await post(url, {
					UserId: this.userId, 
					Token: this.token,
					page: this.page,
					pageSize: this.pageSize,
					MsgType: this.Msgtype,
					ShopId:this.id
				});
				const data = result.data;
					// if (result.data.length > 0) {
					// 	this.hasData = true;
					// 	result.data.forEach(function(item) {
					// 		item.PubTime=dateUtils.format(item.PubTime);
					// 		if(item.Islook==0){
					// 			_this.ReadNoticeInfo(item.id);
					// 		}
					// 	})
					// }
					if (this.page === 1) {
						this.list = [];
					}
					this.list = this.list.concat(data);
					if (data.length < this.pageSize) {
						this.loadingType = 2;
					} else {
						this.loadingType = 0
					}
			},
			goDetail(item){
				item.Islook =1;
				navigate('message/msgDetail',{id:item.id})
			},
			gotoMsg(id){
				uni.navigateTo({
					url:'/pages/Message/msgDetail/msgDetail?id='+id
				})
			},
			//添加阅读记录
			async ReadNoticeInfo(Msgid){
				let result = await post("News/ReadNoticeInfo",{
					 UserId: this.userId,
					 Token: this.token,
					 newsid:Msgid
				})
				if (result.code === 0) {
					
				}
			},
		},
		onReachBottom: function() {
			if (this.loadingType === 2)return;
			this.page+=1;
			this.NoticeList();
		}
	}
</script>

<style scoped lang="scss">
	.tabList .swiper-tab-list{ width: 50%;}
	.uni-swiper-tab .active .s{ display: inline-block;}
	.list-item{margin: 20upx 20upx 0;}
	.txtbox{ background: #fff; border-radius: 6px;}
	.txtbox .title{ border-bottom: 1px solid #eee; padding: 20upx; font-size: 30upx; line-height: 1.2;}
	.txtbox .desc{
		width: 100%;
		color: #666;
	}
	.txtbox .desc.text-line2{
		padding-right: 40upx;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.list-item .time{ color: #fff; background: #e2e2e2; font-size: 24upx; border-radius: 4px; padding: 4upx 10upx;}
	.uni-media-list{ align-items: center;}
	.uni-media-list-logo{ width: 100upx; height: 100upx; border-radius: 50%; overflow: hidden;}
	.uni-media-list .time{ color: #999; line-height: 36upx; font-size: 26upx;}
	.uni-badge-red{ background: #fa3d34;}
	.uni-list-cell::after{left: 150upx;}
	.islook{ 
		background: #fcfcfc;
		.title{
			color:#888;
		}
	}
	.position{
		position:relative;
	}
	.dot{
		position:absolute;
		left:10upx;top:10upx;
		width:13upx;height:13upx;
		background:#ff3333;
		border-radius:50%;
	}
</style>
