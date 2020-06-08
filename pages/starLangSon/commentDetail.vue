<template>
	<view class="p30">
		<replyItem v-for="(item,index) in headComment" :key="index" :item='item'></replyItem>
		<h3>全部回复</h3>
		<replyItem v-for="(item2,index2) in 6" :key="index2" :item2='item2' :isReply='isReply'></replyItem>
		<input class="replyItem" confirm-type="send" @confirm="confirm(Id)" type="text" placeholder="写回复..." v-model="Comment">
	
	</view>
</template>

<script>
	import replyItem from './replyItem.vue';
	import {navigate,post,switchTab,getCurrentPageUrlWithArgs} from '@/utils';
	export default {
		components:{
			replyItem
		},
		data() {
			return {
				userId: '',
				token: '',
				CommnetList: [],
				replyList: [],
				FkId: 0,
				Page: 1,
				PageSize: 4,
				ParentCommentId: 0,
				headComment:{},
				isReply: true
			};
		},
		onLoad(options) {
			this.getUserInfo()
			this.FkId = Number(options.FkId)
			this.ParentCommentId = Number(options.ParentCommentId)
			this.CommentId = Number(options.CommentId)
			this.headComment = this.$store.state.headComment
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
		methods:{
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
				let res = await post('Find/CommnetList',
				{
					UserId: this.userId,
					Token: this.token,
					Page: this.Page,
					PageSize: this.PageSize,
					FkId: this.FkId,
					ParentCommentId: this.ParentCommentId,
					CommentId: this.CommentId
				})
				console.log('回复详情页 --回复列表列表:',res)
				if(res.code === 0 ){
					this.replyList = res.data
				}
			},
			// 用户回复评论操作
			async toComment (Id){
				let res = await post(
				'Find/CommentOperation',
				{
					UserId:this.userId,
					Token:this.token,
					Page: this.Page,
					PageSize: this.PageSize,
					FkId: this.FkId,
					ParentCommentId: this.ParentCommentId,
					CommentId: this.CommentId
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
					this.getCommnetList(this.Id)
					// // 如果评论成功，需要给detail的回复+1
					this.detail.CommentNum++
				}
			},
			/* 评论 */
			confirm(Id) {
			   if (this.Comment.trim().length ==0) {
					return uni.showToast({
					    title:'请输入评论内容',
					    icon:'none'
					});
				}
				this.toComment(Id)
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.p30 {
		padding: 30upx;
	}
	.replyItem {
		position: fixed;
		left: 0;
		bottom: 0;
	}
</style>
