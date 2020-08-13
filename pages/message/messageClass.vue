<template>
	<view>
		<view class="uni-list">
			<block class="mt20" v-for="(item,index) in TypeList" :key="index">
				<view class="uni-list-cell" @click="navigate('message/messageList',{id:item.Id})">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">
							<image class="img" src="@/static/icons/inform.png" mode="aspectFill"></image>
							<!-- <image class="img" :src="item.TypeImg" mode="aspectFill"></image> -->
						</view>
						<view  class="uni-media-list-body">
							<view class="uni-media-list-text-top uni-ellipsis">{{item.MsgName}}</view>
							<view  class="uni-media-list-text-bottom uni-ellipsis" v-if="item.NoticeTitle">
								{{item.NoticeTitle}}
							</view>
						</view>
						<view class="uni-media-list-r">
							<view class="time">{{item.PubTime}}</view>
							<view class="uni-badge uni-badge-red" v-if="item.unCount*1"></view>
						</view>
					</view>
				</view>
			</block>
			<block class="mt20">
				<view class="uni-list-cell" @click="navigate('message/messageList',{id:-1})">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">
							<image class="img" src="@/static/icons/xxj.png" mode="aspectFill"></image>
						</view>
						<view  class="uni-media-list-body">
							<view class="uni-media-list-text-top uni-ellipsis">小星君</view>
							<view  class="uni-media-list-text-bottom uni-ellipsis" v-if="commonMessage.title" v-html="commonMessage.title">
							</view>
						</view>
						<view class="uni-media-list-r">
							<view class="time">{{commonMessage.PubTime}}</view>
							<view class="uni-badge uni-badge-red" v-if="commonMessage.unCount*1"></view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="uni-list">
			<block class="mt20" v-for="(item,index) in messageList" :key="index">
				<view class="uni-list-cell" @click="navigate('starLangSon/detail',{Id:item.FkId})">
					<view class="uni-media-list">
						<view class="uni-media-list-logo position officialBox" @click.stop="navigate('starLangSon/homePage',{taUserId:item.FromMemberId})">
							<image class="img" :src="item.FromHeadimgurl||'http://xqk.wtvxin.com/images/wxapp/default.png'" mode="aspectFill"></image>
							<div class="dot" v-if="!item.IsRead"></div>
							<view class="official" v-if="item.FromIsAuthor"><image src="@/static/icons/official.png"></image></view>
						</view>
						<view  class="uni-media-list-body">
							<view class="uni-media-list-text-top uni-ellipsis">{{item.Memo}}</view>
							<view  class="uni-media-list-text-bottom uni-ellipsis">
								{{item.Comment}}
							</view>
						</view>
						<view class="uni-media-list-r flex-column-end-between">
							<view class="time">{{item.PubTime}}</view>
							<!-- 红点 -->
							<!-- <view class="uni-badge uni-badge-red" v-if="!item.IsRead"></view> -->
							<view class="replyBtn"  @click.stop="reply(item)">查看并回复</view>
						</view>
					</view>
				</view>
			</block>
			<uni-load-more :loadingType="loadingType" v-if="messageList.length&&page>1"></uni-load-more>
		</view>
		<uni-popup ref="popup" type="center">
			<div class="content">
				<div class="title plr30">{{replyItem.Memo}}</div>
				<div class="text">
					{{replyItem.Comment}}
				</div>
				<div class="textarea">
					<textarea name="" id="" cols="30" rows="10" v-model="replyContent" :maxlength="250" placeholder="输入回复内容" :cursor-spacing="70" @confirm="replaysubmit"></textarea>
				</div>
				<div class="btn flex-center-between">
					<p @click="closeReplay">取消</p>
					<p @click="replaysubmit">回复</p>
				</div>
			</div>
		</uni-popup>
		<!-- <noData v-if="!messageList.length"></noData> -->
	</view>
</template>

<script>
	import {post,get,navigate,toast} from '@/utils';
	import noData from '@/components/notData.vue'; //暂无数据
	export default {
		components: {
			noData
		},
		data() {
			return {
				navigate,
				userId: "",
				token: "",
				page: 1,
				pageSize: 10,
				loadingType: 0, //0加载前，1加载中，2没有更多了
				
				TypeList:[],//系统消息
				commonMessage:{},//小星君
				messageList:[],//互动列表
				replyItem:{},
				replyContent:'',//评论内容
			};
		},
		onLoad() {
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.NoticeTypeList();
			this.getMessage();
			this.getCommonMessage();
		},
		methods:{
			getNotice(){
				
			},
			async NoticeTypeList() {
				let result = await post("News/NoticeTypeList", {
					"UserId": this.userId,
					"Token": this.token
				});
				this.TypeList = result.data;
			},
			// 小星君
			async getCommonMessage(){
				let result = await post("News/NoticeList", {
					"UserId": this.userId,
					"Token": this.token,
					Page:1,
					PageSize:1
				});
				this.commonMessage = result.data[0];
			},
			async getMessage(){
				this.loadingType=1;
				const res = await post('News/MyInteractList',{
					"UserId": this.userId,
					"Token": this.token,
					Page:this.page,
					PageSize:this.pageSize
				})
				const data = res.data;
				if (this.page === 1) {
					this.messageList = [];
				}
				this.messageList = this.messageList.concat(data);
				if (data.length < this.pageSize) {
					this.loadingType = 2;
				} else {
					this.loadingType = 0
				}
			},
			MessageList(type,keyname,shopid){
				uni.navigateTo({
					url: '/pages/Message/MessageList/MessageList?type='+type+'&keyname='+keyname+'&shopId='+shopid
				});
			},
			reply(item){
				this.$refs.popup.open();
				item.IsRead=1;
				this.replyItem = item;
				post('News/ReadNoticeInfo',{
					"UserId": this.userId,
					"Token": this.token,
					newsid:this.replyItem.Id,
				})
			},
			closeReplay(){
				this.$refs.popup.close();
				this.replyContent ='';
			},
			// 提交回复
			async replaysubmit(){
				this.replyContent ='';
				const replyItem = this.replyItem;
				const res = await post('Find/CommentOperation',{
					"UserId": this.userId,
					"Token": this.token,
					FkId:replyItem.FkId,
					ParentCommentId:replyItem.CommentId,
					NoticeId:replyItem.Id,
					CommentId:replyItem.FindId,
					Comment:this.replyContent
				})
				toast('回复成功',{icon:true})
				this.$refs.popup.close()
			},
			//跳转
			tolink(Url) {
				uni.navigateTo({
					url: Url
				})
			},
		},
		onReachBottom: function() {
			if (this.loadingType === 2)return;
			this.page+=1;
			this.getMessage();
		}
	}
</script>

<style scoped lang="scss">
	.uni-media-list-logo{ width: 80upx; height: 80upx;}
	.uni-media-list-body{}
	.uni-media-list-r{ text-align: right;
		.time{
			font-size:25upx;
		}
	}
	.uni-media-list-r .time{ color: #999; line-height: 36upx;}
	.uni-badge-red{ background: #fa3d34;padding:8upx;}
	.uni-list-cell::after{left: 150upx;}
	.img{width: 80upx;height: 80upx; border-radius: 50%;}
	.uni-list{margin-top: 20upx;}
	.content{
		background:#fff;
		width:700upx;
		text-align:center;
		border-radius:10upx;
		.title{
			font-size:30upx;
			line-height:2;
			padding-top:20upx;
		}
		.text{
			padding:0 30upx;
			word-break:break-all;
			word-wrap:break-word;/*支持IE，chrome，FF*/
			line-height:1.3;
			text-align:left;
			margin-top:20upx;
		}
		.textarea{
			margin:30upx;
			background:#f2f2f2;
			padding:15upx;
			border-radius:5upx;
			textarea{
				line-height:1.4;
				text-align:left;
				height:200upx;
			}
		}
		.btn{
			border-top:1upx solid #f2f2f2;
			p{
				width:50%;
				line-height:3.3;
				font-size:30upx;
				&:last-child{
					border-left:1upx solid #f2f2f2;
					color:$primary;
				}
			}
		}
	}
	.replyBtn{
		font-size:23upx;
		color:$primary;
		border-radius:30upx;
		border:1upx solid $primary;
		padding:0 15upx;
		line-height:1.8;
	}
	.position{
		position:relative;
	}
	.dot{
		position:absolute;
		left:0;top:0;
		width:13upx;height:13upx;
		background:#ff3333;
		border-radius:50%;
	}
	.official{
		top:35upx;
		left:-10upx;
	}
</style>
