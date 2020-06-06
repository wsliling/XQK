<template>
	<div class="bgfff">
		<div class="plr30 header pt30">
			<div class="user flex-center-between">
				<div class="info flex-center">
					<img :src="info.Headimgurl||'http://xqk.wtvxin.com/images/wxapp/default.png'" alt="">
					<div class="name">{{info.NickName}}</div>
				</div>
				<div class="btn-min" v-if="type" @click="navigate('tabBar/my/account')">编辑资料</div>
				<div class="ta" v-else @click="follow()">
					<view class="focusright" v-if="info.IsFollow*1">已关注</view>
					<view class="focusright active" v-else>关注</view>
				</div>
			</div>
			<div class="fans flex-center">
				<div class="item"><span>{{info.FollowNum}}</span>关注</div>
				<div class="item"><span>{{info.fansNum}}</span>粉丝</div>
			</div>
			<div class="intro">{{info.Introduction||'Ta很懒，什么也没留下'}}</div>
		</div>
		<div class="gap20"></div>
		<div class="listBox plr30">
			<h3>{{type?'我的':'Ta的'}}发布</h3>
			<div class="list">
				<star-lang-list :list="list" @onCollect="onCollect" @onLike="onLike"></star-lang-list>
			</div>
		</div>
		<not-data v-if="!list.length"  tipsTitle="暂无数据哦~" />
		<uni-load-more :loadingType="loadMore" v-if="list.length&&page>1" />
	</div>
</template>

<script>
	import { post,navigate} from '@/utils';
	import starLangList from '@/components/starLangList.vue';
	import notData from '@/components/notData.vue'
	export default {
		components:{starLangList,notData},
		data() {
			return {
				navigate,
				type:0,//1--我的主页；0--他人主页
				taUserId:'',//用户id
				userId: '',
				token: '',
				pageSize: 10,
				page: 1,
				loadingType: 0, //0加载前，1加载中，2没有更多了
				list:[],
				info:{},
			}
		},
		
		onLoad(options) {
			this.taUserId = options.taUserId;
			console.log(this.taUserId,'id')
		},
		onShow() {
			this.init();
		},
		methods: {
			setPage(){
				uni.setNavigationBarTitle({
					title:this.type?'我的主页':'他人主页'
				})
			},
			init(){
				this.userId = uni.getStorageSync('userId');
				this.token = uni.getStorageSync('token');
				this.loadMore=0;
				this.page = 1;
				this.getInfo();
			},
			async getInfo(){
				const res = await post('Find/UserHomePageInfo',{
					UserId: this.userId,
					Token: this.token,
					MemberId:this.taUserId,
				})
				const data= res.data;
				// 判断是否个人主页1还是他人0
				this.type=data.IsMy*1?1:0;
				this.info = res.data;
				this.setPage();
				this.getData();
			},
			async getData(){
				this.loadMore =1;
				const res = await post('Find/FindList',{
					UserId: this.userId,
					Token: this.token,
					Page:this.page,
					PageSize:this.pageSize,
					MemberId:this.taUserId,
					myType:this.type?0:1
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
			// 关注
			async follow(){
				await post('Find/FollowOperation',{UserId:this.userId,Token:this.token,ToMemberId:this.taUserId})
				this.info.IsFollow = this.info.IsFollow*1?0:1;
			},
			// 点击了星语收藏
			async onCollect(item){
				this.list.map(async(tem)=>{
					if(tem.Id===item.Id){
						tem.CollectNum = item.CollectNum;
						tem.CollectionId = item.CollectionId;
					}
				})

			},
			// 点击了星语点赞
			async onLike(item){
				this.list.map(async(tem)=>{
					if(tem.Id===item.Id){
						tem.IsLike = item.IsLike;
						tem.LikeNum = item.LikeNum;
					}
				})
			}
		},
		// 上拉加载
		onReachBottom: function() {
			if(this.loadMore===2)return;
			this.page+=1;
			this.getData();
		},
	}
</script>
<style scoped lang="scss">
.header{
	.user{
		.info{
			img{
				width:140upx;height:140upx;
				border-radius:50%;
				margin-right:20upx;
			}
			.name{
				font-size:34upx;
			}
		}
		.btn-min{
				font-size:24upx;
				color:#666;
				border-color:#ccc;
				background:#fff;
				border-radius:8upx;
				line-height:2;
				&.ta{
					color:#fff;
					background:$primary;
					border-color:#fff;
				}
		}
	}
	.fans{
		color:#999;
		line-height:3;
		&>div{
			margin:0 20upx;
		}
		span{
			font-size:32upx;
			color:#333;
		}
	}
	.intro{
		border-top:1upx solid #e8e8e8;
		padding:15upx 0;
		line-height:1.5;
		color:#666;
	}
}
.listBox{
	h3{
		line-height:3;
	}
	.list{
		width:100%;
		flex-flow:row wrap;
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
</style>