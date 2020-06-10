<template>
	<div class="p30 bgfff">
		<div class="footer flex-center-between plr30 ptb20">
			<ans-input @confirm="confirm(Id)" class="input" placeholder="写评论..." v-model="Comment" :align='left'></ans-input>
			<div class="btn-min" @click="submit">评论</div>
		</div>
		<reply-item v-for="(item,index) in CommnetList" :key="index" :index="index" :item="item" :isCheckReply="isCheckReply"
		 @changeItem="changeItem"></reply-item>
		<!-- 数据判断显示 -->
		<!-- <not-data v-if="CommnetList.length<1"></not-data> -->
		<not-data v-if="CommnetList.length<1" :tipsTitle="tipsTitle" />
		<uni-load-more :loadingType="loadMore" :contentText='contentText' v-else></uni-load-more>

	</div>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"; //vuex辅助函数
	import replyItem from './replyItem.vue';
	import ansInput from '@/components/ans-input/ans-input.vue';
	import notData from '@/components/notData.vue';
	import {
		navigate,
		post
	} from '@/utils';
	export default {
		components: {
			replyItem,
			ansInput,
			notData
		},
		data() {
			return {
				content: '', //评价内容
				Id: 0,
				CommnetList: [],
				Page: 1,
				PageSize: 8,
				Comment: '',
				userId: '',
				token: '',
				loadMore: 0, //0-loading前；1-loading中；2-没有更多了
				isCheckReply: true,
				onLoad: 1,
				// IsMy:0,
				tipsTitle: '暂无回复',
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多回复了"
				}
			}
		},
		onLoad(options) {
			console.log("传递过来的：", options)
			this.Id = parseFloat(options.Id)
			// this.IsMy = Number(IsMy)
			this.init()
			this.getUserInfo()
			this.getCommnetList(this.Id)
		},
		computed: {
			...mapState(['lng', 'lat', 'cityName', 'cityCode'])
		},
		onShow() {
			this.getUserInfo()
			console.log('我是reply回复页面onshow111111111：')
			if (!this.oneLoad) {
				this.init()
				console.log('我是reply回复页面onshow：')
				this.getCommnetList(this.Id)
			}
		},
		methods: {
			...mapMutations(['update']),
			init() {
				this.Page = 1
				this.CommnetList = []
			},
			// 获取用户id以及token
			getUserInfo() {
				this.userId = uni.getStorageSync('userId');
				this.token = uni.getStorageSync('token');
			},
			// 用户评论操作
			async toComment(Id) {
				let res = await post('Find/CommentOperation', {
					UserId: this.userId,
					Token: this.token,
					FkId: Id,
					Comment: this.Comment
				})
				console.log('评论后返回:', res)
				if (res.code === 0) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					// 清空输入框
					this.Comment = ""
					// 如果评论成功需要再次请求评论列表
					// 需要重置Page并且清空列表
					this.Page = 1
					this.CommnetList = []
					this.getCommnetList(this.Id)
					console.log('66666', this.CommnetList)
				}
			},
			// 提交评论
			confirm(Id) {
				if (this.Comment.trim().length == 0) {
					return uni.showToast({
						title: '请输入评论内容',
						icon: 'none'
					});
				}
				this.toComment(Id)

			},
			// replyInput(e){
			// 	// console.log('输入中，',e)
			// 	this.Comment = e;
			// },
			submit() {
				console.log(this.Comment, '评论内容')
				this.confirm(this.Id)
			},
			// 发现评论列表
			async getCommnetList(Id) {
				this.loadMore = 1;
				let res = await post('Find/CommnetList', {
					UserId: this.userId,
					Token: this.token,
					FkId: Id,
					PageSize: this.PageSize,
					Page: this.Page
				})
				// console.log('发现评论列表:',res)
				// if(res.data.length === 0){
				// 	return uni.showToast({
				// 		title:"到底了~",
				// 		icon:'none'
				// 	});
				// }
				if (res.code === 0) {
					if (res.data.length < this.PageSize) {
						this.loadMore = 2;
					} else {
						this.loadMore = 0;
					}
					let tempList = [...this.CommnetList, ...res.data]
					// this.CommnetList = tempList
					this.$set(this, "CommnetList", tempList)
					console.log('我是set之后的commentList：======', this.CommnetList)
				}
				// // 更新Dom之后
				this.$nextTick().then(() => {
					console.log('我是回复，我更新了')
					this.oneLoad = 0
				})

				// this.$set(this.CommnetList,"age", 30)
				// // this.CommnetList = res.data
			},
			// // 组件点赞
			// changeItem(res){
			// 	// console.log('我是子组件传递过来的：',res)
			// 	this.CommnetList[res.index].IsLike = !this.CommnetList[res.index].IsLike 
			// 	if(res.count === true) {
			// 		this.CommnetList[res.index].LikeNum++
			// 	}else {
			// 		this.CommnetList[res.index].LikeNum--
			// 	}
			// 	// console.log('我是子组件传递过来的处理过的：',this.CommnetList[res.index])
			// },
			// 组件点赞
			// changeItem(res){
			// 	console.log('我是子组件传递过来的：',res)
			// 	this.CommnetList[res.index].IsLike = !this.CommnetList[res.index].IsLike 
			// 	if(res.count === true) {
			// 		this.CommnetList[res.index].LikeNum++
			// 	}else {
			// 		this.CommnetList[res.index].LikeNum--
			// 	}
			// 	// console.log('我是子组件传递过来的处理过的：',this.CommnetList[res.index])
			// },
			changeIndex(index) {
				this.index = index
			},
			// 组件点赞
			changeItem(item) {
				console.log('我是子组件传递过来的：', item)
				if (!item.isReply) {
					// this.$set( this.CommnetList[res.index], 'IsLike', res.data.IsLike )
					// this.$set( this.CommnetList[res.index], 'LikeNum', res.data.LikeNum )
					this.CommnetList.map((tem) => {
						if (tem.Id === item.data.Id) {
							tem.IsLike = item.data.IsLike;
							tem.LikeNum = item.data.LikeNum;
						}
					})
				} else {
					// this.$set( this.replyList[res.index], 'IsLike', res.data.IsLike )
					// this.$set( this.replyList[res.index], 'LikeNum',res.data.LikeNum )
					this.replyList.map((tem) => {
						if (tem.Id === item.data.Id) {
							tem.IsLike = item.data.IsLike;
							tem.LikeNum = item.data.LikeNum;
						}
					})
				}

				// console.log('我是子组件传递过来的处理之后：',this.CommnetList,this.CommnetList[this.index])
			},
		},
		onReachBottom() {
			if (this.loadMore === 2) return;
			this.Page++
			this.getCommnetList(this.Id)
		},
	}
</script>
<style scoped lang="scss">
	.bgfff {
		padding-bottom: 100upx;
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		background: #fff;
		width: 100%;
		border-top: 1upx solid #e8e8e8;

		.input {
			background: #f5f5f5;
			border: 1upx solid #e8e8e8;
			border-radius: 10upx;
			width: 82%;
			height: 60upx;
			line-height: 60upx;
		}

		.btn-min {
			border-radius: 7upx;
		}
	}
</style>
