<template>
	<view class="">
		<div  v-if="!isReply" class="flex-start-between ptb20" @click="toReply">
			<div class="flex-start">
				<div @click="navigate('starLangSon/homePage',{taUserId:item.MemberId})" class="avatar">
					<!-- <img src="/static/of/banner.jpg" alt=""> -->
					<image :src="item.MemberHead" mode=""></image>
				</div>
				<div class="center">
					<div class="name ">
						<div v-if='1' class="bold">{{ item.MemberName }}
						<!-- <text class="reply" @click="reply(item.Id)">回复</text> -->
						</div>
						<p>{{ formatTime(item.AddTime) }}</p>
					</div>
					<div class="content pt10">{{ item.Comment }}</div>
				</div>
			</div>
			<!-- <div class="zan" @click="toZan(item.Id,true,-1)" :class='{active : item.IsLike}'> -->
			<div class="zan" @click.stop="toZan(item)" :class='{active : item.IsLike}'>
				<div class="collect flex-center" :class='{active : item.IsLike}'>
					<div class="iconfont" :class='{"icon-zan":!item.IsLike,"icon-zan1" : item.IsLike,"active" : item.IsLike}'></div>
					{{ item.LikeNum }} 
					<!-- 我是is：{{item.IsLike}} -->
				</div>
			</div>
		</div>
		<!-- <div v-if="isReply">112e21</div> -->
		<div v-if="isReply" class="flex-start-between ptb20">
			<!-- 回复别人的 -->
			<div class="flex-start">
				<div @click="navigate('starLangSon/homePage',{taUserId:item2.MemberId})" class="avatar">
					<!-- <img src="/static/of/banner.jpg" alt=""> -->
					<image :src="item2.MemberHead" mode=""></image>
				</div>
				<div class="center">
					<div class="name ">
						<div class="bold">{{ item2.MemberName }}
						<text class="author"> (作者) 
						</text> <text class="reply2"> 回复 </text>
						{{ item.MemberName }}
						<!-- <text class="reply" @click="reply(val.Id)">回复</text> -->
						</div>
						<p>{{ formatTime(item2.AddTime) }}</p>
					</div>
					<div class="content pt10">{{ item2.Comment }}</div>
				</div>
			</div>
			<!-- <div class="zan" @click="toZan(item2.Id,false,index2)" :class='{active : item2.IsLike}'> -->
			<div class="zan" @click.stop="toZan(item2)" :class='{active : item2.IsLike}'>
				<div class="collect flex-center" :class='{active : item2.IsLike}'>
					<div class="iconfont" :class='{"icon-zan":!item2.IsLike,"icon-zan1" : item2.IsLike,"active" : item2.IsLike}'></div>
					{{ item2.LikeNum }} 
					<!-- 我是is：{{item.IsLike}} -->
				</div>
			</div>
		</div>
		
		
<!-- 		<uni-popup class="my-popup" ref="popup" type="center">
			<div class="content">
				<div class="title">回复：{{ item.MemberName }}</div>
				<div class="text">
					{{replyItem.Comment}}
				</div> 
				<div class="textarea">
					<textarea name="" id=""
					 cols="30" 
					 rows="10" 
					 v-model="replyContent" 
					 :maxlength="250" placeholder="输入回复内容" 
					 :cursor-spacing="30" 
					 @confirm="replaysubmit"></textarea>
				</div>
				<div class="btn flex-center-between">
					<p @click="$refs.popup.close()">取消</p>
					<p @click="replaysubmit">回复</p>
				</div>
			</div>
		</uni-popup> -->
	</view>
	
		

		
		
</template>

<script>
	import { mapState, mapMutations } from "vuex"; //vuex辅助函数
	import { formatTime } from '@/common/util.js'
	import {post,navigate,toast} from '@/utils';
	export default {
		props: {
			isReply:{
				type: Boolean,
				default: false,
			},
			isToReply:{
				type: Boolean,
				default: true,
			},
			item:{
				type: Object,
				default: {}
			},
			item2:{
				type: Object,
				default: {}
			},
			index: {
				type: Number,
				default: 0
			},
			MemberId: {
				type: String,
				default: ''
			}
		}, //配置参数
		// props:[
		// 	'isReply',
		// 	'item',
		// 	'index',
		// 	'detail'
		// ],
		data() {
			return {
				navigate,
				userId:'',
				token:'',
				replyContent:'',//评论内容
				headComment: {},
				toZanComment: {}
			}
		},
		onLoad() {
			
			// this.item = 
		},
		mounted() {
			this.$nextTick()
				.then(function () {
					// console.log('是不是我',this.detail)
			// DOM 更新了
			})
		},
		// watch: {
		//     a: function (val, oldVal) {
		//       console.log('new: %s, old: %s', val, oldVal)
		//     },
		// } 
		// beforeUpdate() {
		// 	console.log('我是评论组件更新')
		// },
		// watch: {
		//   '$store.state.headComment': {
		//     handler(newName, oldName) {
		//       console.log('$store.state.headComment changed:',newName,this.$store.state.headComment);
		// 	  this.headComment = this.$store.state.headComment
		//     },
		//     immediate: true,
		//     // deep: true
		//   },
		//   'headComment': {
		//     handler(newName, oldName) {
		//       console.log('headComment changed:',newName,this.$store.state.headComment);
		//   			 // this.$store.state.headComment = this.headComment
		// 			 this.$store.commit('update',{"headComment":this.headComment})
		//     },
		//     immediate: true,
		//     // deep: true
		//   },
		//   '$store.state.toZanComment': {
		//     handler(newName, oldName) {
		// 		console.log('$store.state.toZanComment changed:',newName,this.$store.state.toZanComment);
		// 		this.toZanComment = this.$store.state.toZanComment
		//     },
		//     immediate: true,
		//     // deep: true
		//   },
		//   'toZanComment': {
		//     handler(newName, oldName) {
		//   			console.log('toZanComment changed:',newName,this.$store.state.toZanComment);
		// 			// this.$store.state.toZanComment = this.toZanComment
		// 			this.$store.commit('update',{"toZanComment":this.toZanComment})
		//     },
		//     immediate: true,
		//     // deep: true
		//   },
		// },
		methods: {
			toReply () {
				if(!this.isToReply){
					return false
				}
				console.log('我是item',this.item)
				navigate('starLangSon/commentDetail',{
					FkId: this.item.FkId,
					CommentId: this.item.Id,
					ParentCommentId: this.item.Id,
				})
				this.$store.commit('update',{"headComment":[this.item]})
			},
			// 获取用户id以及token
			getUserInfo () {
				this.userId = uni.getStorageSync('userId');
				this.token = uni.getStorageSync('token');
			},
			// 点击回复
			reply(item){
				this.$refs.popup.open();
				// this.replyItem = item;
				this.getUserInfo()
			},
			// 提交回复
			async replaysubmit(){
				const res = await post('Find/CommentOperation',{
					"UserId": this.userId,
					"Token": this.token,
					FkId:this.item.FkId,
					ParentCommentId:this.item.Id,
					// NoticeId:this.replyItem.Id,
					Comment:this.replyContent
				})
				if(res.code === 0 ) {
					toast('回复成功',{icon:true})
					this.$refs.popup.close()
					this.$parent.Page = 1
					this.$parent.getCommnetList(this.item.FkId)
				}
				
			},
			// 获取用户id以及token
			getUserInfo () {
				this.userId = uni.getStorageSync('userId');
				this.token = uni.getStorageSync('token');
			},
			// 点赞
			// async toZan (Id,isItem,val) {
			async toZan (item) {
				this.toZanComment = item
				// this.$store.commit('update',{"toZanComment":item})
				this.getUserInfo()
				// console.log('当前id',Id)
				let res = await post(
					'Find/FindlikeOperation',
					{
						UserId:this.userId,
						Token:this.token,
						FindId:item.Id,
						TypeStatu:2,
					})
				console.log("点赞返回：",res)
				if (res.code === 0){
					this.toZanComment.IsLike = !this.toZanComment.IsLike
					if(res.msg === "点赞成功！") {
						this.toZanComment.LikeNum++
						// console.log(this.item.LikeNum)
						// this.$emit("changeItem",{index: this.index,data: this.item,count:true});
						// this.$emit("changeItem",{index: this.index,data: this.item,count:true,isItem:isItem,val:val});
						this.$emit("changeItem",{data: this.toZanComment,count:true,isReply:this.isReply,index:this.index});
						
					}else {
						this.toZanComment.LikeNum--
						// console.log(this.item.LikeNum)
						// this.$emit("changeItem",{index: this.index,data: this.item,count:false});
						// this.$emit("changeItem",{index: this.index,data: this.item,count:false,isItem:isItem,val:val});
						this.$emit("changeItem",{data: this.toZanComment,count:false,isReply:this.isReply,index:this.index});
					}
					// this.$store.commit('update',{"toZanComment":this.toZanComment})
					// if(this.isReply){
					// 	this.item2 = this.toZanComment
					// }else {
					// 	this.item = this.toZanComment
					// }
					// if(isItem) {
					// 	this.item.IsLike = !this.item.IsLike
					// }else {
					// 	this.item.MyCommnetList[val].IsLike = !this.item.MyCommnetList[val].IsLike
					// }
					// // 调用父组件的方法
					// // this.$parent.Page =1
					// // this.$parent.CommnetList=[]
					// // this.$parent.getCommnetList(this.$parent.Id)
					// if(res.msg === "点赞成功！") {
					// 	// this.item.LikeNum++
					// 	console.log(this.item.LikeNum)
					// 	// this.$emit("changeItem",{index: this.index,data: this.item,count:true});
					// 	this.$emit("changeItem",{index: this.index,data: this.item,count:true,isItem:isItem,val:val});
						
					// }else {
					// 	// this.item.LikeNum--
					// 	console.log(this.item.LikeNum)
					// 	// this.$emit("changeItem",{index: this.index,data: this.item,count:false});
					// 	this.$emit("changeItem",{index: this.index,data: this.item,count:false,isItem:isItem,val:val});
					// }
				}
				// 返回提示
				uni.showToast({
				    title:res.msg,
				    icon:'none'
				})
			},
		},
		computed:{
			formatTime (time){
				return (time)=>{
					// console.log('格式化时间：',time,formatTime(time))
					return formatTime(time)
				}
			},
		}
	}
</script>
<style scoped lang="scss">
	.avatar{
		image{
			width:76upx;height:76upx;
			margin-right:20upx;
			border-radius:50%;
		}
	}
	.center{
		text-align:left;
		line-height:1.5;
		.name{
			p{
				color:#999;
				font-size:22upx;
			}
			.author {
				color: #BEBFC3;
			}
			.reply2 {
				color: #999999;
			}
		}
		.content{
			color:#484848;
		}
	}
	.reply {
		color: $primary;
		margin-left: 20upx;
	}
	.zan{
		line-height:2;
		font-size:26upx;
		color:#666;
		.collect {
			&.active {
				color: $primary;
				// color: red;
			}
		}
		.iconfont{
			margin-right:15upx;
			&.active {
				color: red;
			}
		}
	}
	// 弹窗样式
	.my-popup{
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
	}
	
</style>