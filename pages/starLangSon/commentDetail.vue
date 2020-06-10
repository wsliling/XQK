<template>
	<view class="p30">
		<replyItem v-for="(item,index) in headComment" :key="index" :item='item' :isToReply="isToReply" @changeItem="changeItem"></replyItem>
		<h3>全部回复</h3>
		<replyItem v-for="(item2,index2) in replyList" 
			:key="index2" 
			:index='index2'
			:item='headComment[0]'
			:item2='item2' 
			:isReply='isReply' 
			:isToReply="isToReply"
			@changeItem="changeItem"></replyItem>
		<!-- 数据判断显示 -->
		<not-data v-if="replyList.length<1"></not-data>
		<uni-load-more :loadingType="loadMore" :contentText='contentText' v-else></uni-load-more>
		<view v-if="IsMy" class="seek-box">
			<view class="seek">
				<input class="replyItem" confirm-type="send" @confirm="confirm" type="text" placeholder="写回复..." v-model="Comment" />
				<span v-if="Comment.length" class="close" id='close' @click ="emptyComment">×</span>
			</view>
		</view>
	</view>
</template>

<script>
	import replyItem from './replyItem.vue';
	import {navigate,post,switchTab,getCurrentPageUrlWithArgs} from '@/utils';
	import notData from '@/components/notData.vue';
	export default {
		components:{
			replyItem,
			notData
		},
		data() {
			return {
				userId: '',
				token: '',
				CommnetList: [],
				replyList: [],
				FkId: 0,
				Page: 1,
				index: 0,
				PageSize: 8,
				loadMore:0,//0-loading前；1-loading中；2-没有更多了
				ParentCommentId: 0,
				headComment:{},
				isReply: true,
				isToReply: false,
				Comment: '',
				IsMy:0, // 是否是我发布的
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多回复了"
				}
			};
		},
		onLoad(options) {
			this.getUserInfo()
			this.FkId = Number(options.FkId)
			this.ParentCommentId = Number(options.ParentCommentId)
			console.log('传递过来的',options,'我是my',this.$store.state.IsMy)
			this.IsMy = this.$store.state.IsMy
			// this.isMy = Number(options.IsMy)
			// console.log('传递过来的',this.IsMy)
			this.CommentId = Number(options.CommentId)
			this.headComment = this.$store.state.headComment
			console.log('头部id：',this.CommentId)
			console.log('头部：',this.headComment)
			// this.getCommnetList()
			this.getReplyList()
		},
		computed:{
			// headComment (str) {
			// 	return (str)=>{
			// 		console.log('评分：',Math.round(str),'str')
			// 		return Math.round(str);
			// 	}
			// 	// Math.round(str)
			// },
		},
		onReachBottom(){
			console.log('触底了')
			if(this.loadMore===2)return;
			this.Page++
			this.getReplyList()
		},
		methods:{
			changeIndex(index) {
				this.index = index
			},
			// 组件点赞
			changeItem(item){
				console.log('我是子组件传递过来的：',item)
				if (!item.isReply) {
					// this.$set( this.CommnetList[res.index], 'IsLike', res.data.IsLike )
					// this.$set( this.CommnetList[res.index], 'LikeNum', res.data.LikeNum )
					this.CommnetList.map((tem)=>{
						if(tem.Id===item.data.Id){
							tem.IsLike = item.data.IsLike;
							tem.LikeNum = item.data.LikeNum;
						}
					})
				}else {
					// this.$set( this.replyList[res.index], 'IsLike', res.data.IsLike )
					// this.$set( this.replyList[res.index], 'LikeNum',res.data.LikeNum )
					this.replyList.map((tem)=>{
						if(tem.Id===item.data.Id){
							tem.IsLike = item.data.IsLike;
							tem.LikeNum =item.data.LikeNum;
						}
					})
				}
				
				// console.log('我是子组件传递过来的处理之后：',this.CommnetList,this.CommnetList[this.index])
			},
			// 获取用户id以及token
			getUserInfo () {
				this.userId = uni.getStorageSync('userId');
				this.token = uni.getStorageSync('token');
			},
			// 发现评论列表
			// async getCommnetList (){
				// let res = await post('Find/CommnetList',
				// {
				// 	UserId: this.userId,
				// 	Token: this.token,
				// 	PageSize: this.PageSize,
				// 	FkId: this.FkId,
				// 	ParentCommentId: this.ParentCommentId
				// })
				// console.log('回复详情页 --发现评论详情列表:',res)
				// let tempArr = []
				// if(res.code === 0 ){
				// 	for(let i =0; i < res.data.length;i++){
				// 		console.log('对上号了',res.data[i].Id,this.ParentCommentId)
				// 		if(res.data[i].Id === this.ParentCommentId) {
				// 			console.log('对上号了')
				// 			tempArr = [res.data[i]]
				// 		}
				// 	}
				// 	this.CommnetList = tempArr
				// 	console.log('回复详情页 --发现评论详情列表:',this.CommnetList)
				// }
			// },
			// 发现详情回复列表
			async getReplyList (){
				this.loadMore =1;
				let res = await post('Find/CommnetList',
				{
					UserId: this.userId,
					Token: this.token,
					Page: this.Page,
					PageSize: this.PageSize,
					FkId: this.FkId,
					CommentId: this.ParentCommentId
				})
				console.log('回复详情页 --回复列表列表:',res)
				if(res.code === 0 ){
					if(res.data.length<this.PageSize){
						this.loadMore =2;
					}else{
						this.loadMore =0;
					}
					this.replyList = [...this.replyList,...res.data]
					console.log('replyList----',this.replyList)
				}
			},
			// 用户回复评论操作
			async toComment (){
				let res = await post(
				'Find/CommentOperation',
				{
					UserId:this.userId,
					Token:this.token,
					Page: this.Page,
					PageSize: this.PageSize,
					FkId: this.FkId,
					ParentCommentId: this.ParentCommentId,
					CommentId: this.CommentId,
					Comment: this.Comment
				})
				// console.log('评论后返回:',res)
				if(res.code === 0){
					uni.showToast({
					    title: res.msg,
					    icon:'none'
					});
					// 清空输入框
					this.Comment = ""
					// 如果评论成功需要再次请求评论列表
					this.getReplyList()
					// // 如果评论成功，需要给detail的回复+1
					// this.detail.CommentNum++
				}
			},
			/* 评论 */
			confirm() {
			   if (this.Comment.trim().length ==0) {
					return uni.showToast({
					    title:'请输入评论内容',
					    icon:'none'
					});
				}
				this.toComment()
			},
			// 清空输入框
			emptyComment() {
				// console.log('点了chacha')
				// 我要清空
				this.Comment = ''
			},
			
		},
		
	}
</script>

<style lang="scss" scoped>
	.p30 {
		padding: 30upx;
		margin-bottom: 184upx;
	}
	.seek-box {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			background: #fff;
			padding: 30upx 0;
		.seek {
			// width: 100%;
			// background: #fff;
			input {
				font-size: 24upx;
				height: 64upx;
				line-height: 64upx;
				width: 90%;
				background: rgba(242, 242, 242, 1);
				border-radius: 32upx;
				margin-left: 4%;
				padding-left: 30upx;
			}
			// .clear.data-v-5902f8d2 {
			// 	top: 15rpx;
			// }
			#close {
				position: absolute;
				z-index: 9;
				width: 40rpx;
				height: 40rpx;
				right: 72upx;
				// top: 46upx;
				top: 40upx;
				color: #fff;
				background: #b2b2b2;
				border-radius: 50%;
				text-align: center;
				line-height: 40rpx;
				font-size: 28rpx;
				
			}
		}
		
	}
	
	
	// .seek{
	// 	position: fixed;
	// 	left: 0;
	// 	bottom: 0;
	// 	width: 100%;
	// 	background: #fff;
	// 	padding: 30upx 0;
	// 	.replyItem {
	// 		font-size:24upx;
	// 		height:64upx;
	// 		line-height: 64upx;
	// 		width:90%;
	// 		background:rgba(242,242,242,1);
	// 		border-radius:32upx;
	// 		margin-left: 4%;
	// 		padding-left: 30upx;
	// 	}
	// 	.close {
	// 		position: absolute;
	// 		z-index: 9;
	// 		width: 32rpx;
	// 		height: 64rpx;
	// 		right: 0;
	// 		right: 72upx;
	// 		top: 46upx;
	// 		color: #fff;
	// 		background: #b2b2b2;
	// 		border-radius: 50%;
	// 		text-align: center;
	// 		// line-height: 32rpx;
	// 		line-height: 64rpx;
	// 		font-size: 32rpx;
	// 	}
	// }
</style>
