<template>
	<div class="bgfff">
		<!--轮播图-->
		<view class="index_swiper" v-if="detail.ImgList.length">
			<swiper class="swiper" :indicator-dots="false" autoplay :interval="5000" :duration="500" @change="changeSwiper">
				<swiper-item v-for="(item,index) in detail.ImgList" :key="index">
					<view class="swiper-item">
						<!-- <image class="img" src="/static/of/banner.jpg" mode="aspectFill"></image> -->
						<image class="img" :src="item.PicUrl" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="dots">
				<view v-for="(item,index) in detail.ImgList" :key="index" :class="['dot',currentSwiper==index?'active':'']"></view>
			</view>
		</view>
		<div class="p30">
			<div class="user flex-center-between">
				<div class="info flex-center">
					<!-- <img src="/static/of/banner.jpg" alt=""> -->
					<img :src="detail.Avatar" alt="">
					<h5>{{ detail.NickName }}</h5>
				</div>
				<div class="btnBox flex-center" @click="toFolloow">
					<div class="btn-min" v-if='detail.IsFollow'>已关注</div>
					<div class="btn-min" v-else>关注</div>
					<!-- <div class="iconfont icon-fenxiang"></div> -->
					<button class="iconfont icon-fenxiang1" open-type="share"></button>
				</div>
			</div>
			<div class="detail bb1 pb20">
				<h2>{{ detail.Title}}</h2>
				<div class="content" v-show="isShowAll" v-html="detail.ContentAbstract + detail.ContentDetails"></div>
				<div class="content" v-show="!isShowAll" v-html="detail.ContentAbstract"></div>
				
				<div class="more flex-center" @click="changeIsShowAll" v-show="!isShowAll">展开全部 <uni-icons type="arrowdown" color="#5cc69a"></uni-icons></div>
				<!-- <p>2020-04-28发布</p> -->
				<p>{{ formatTime(detail.Addtime)}}发布</p>
			</div>
			<div class="pro" v-if="detail.ExternalLink">
				<h4>文中提及</h4>
				<div class="shadow">
					<pro-item></pro-item>
				</div>
			</div>
			<div class="good bb1 pb30">
				<h4>点赞区</h4>
				<!-- <div v-if="LikeList.length" class="flex-center-between"> -->
				<div class="flex-center-between">
					<div v-if="LikeList.length >0" class="avatar flex-center">
						<block v-for="(item,index) in LikeList" :key="index">
							<!-- <img src="/static/of/banner.jpg" alt=""> -->
							<image :src="item.Avatar" mode=""></image>
						</block>
					</div>
					<div v-else class="avatar flex-center">
							<image src="/static/default.png" mode=""></image>
					</div>
					<div class="zan-icon flex-center" :class="{active: detail.IsLike}" @click="toZan(Id)">
						<!-- <div class="iconfont icon-zan" :class="{active: detail.IsLike}"></div>{{ detail.LikeNum}} -->
						<div class="iconfont icon-zan" :class='{"icon-zan1" : detail.IsLike,"active" : detail.IsLike}'></div>
					</div>
				</div>
			</div>
			<div class="reply">
				<h4>回复</h4>
				<div class="add flex-center-between">
					<input confirm-type="send" @confirm="confirm(Id)" type="text" placeholder="写评论..." v-model="Comment">
					<div class="line1"></div>
					<div @click="toCollections" class="collect flex-column-center-center" :class="{active : detail.CollectionId}">
						<div class="iconfont icon-aixin2" :class='{"icon-aixin" : detail.CollectionId,"active" : detail.CollectionId}'></div>
						<!-- <div v-show='!detail.CollectionId' class="iconfont icon-aixin2"></div>
						<div v-show='detail.CollectionId' class="iconfont icon-aixin active"></div> -->
						{{ detail.CollectNum}}
					</div>
				</div>
				<reply-item  v-for="(item,index) in CommnetList" :key="index" :index="index" :item="item" @changeItem="changeItem"></reply-item>
				<div class="more" @click="navigate('starLangSon/reply',{Id:Id})">查看{{ detail.CommentNum}}条回复</div>
			</div>
		</div>
		<div class="gap20"></div>
		<div class="other plr30 pb30">
			<h4>其他推荐星语</h4>
			<div class="flex-center-between">
				<starLangItem :item="item"  v-for="(item,index) in findList" :key="index"></starLangItem>
			</div>
			<div class="btn-max">查看更多星语</div>
		</div>
	</div>
</template>

<script>
	import proItem from '@/components/productItem.vue';
	import starLangItem from '@/components/starLangItem.vue';
	import replyItem from './replyItem.vue';
	import {navigate,post} from '@/utils';
	import { formatTime } from '@/common/util.js'
	export default {
		components:{proItem,replyItem,starLangItem},
		data() {
			return {
				navigate,
				currentSwiper :0,
				content:`风景是真的美，但走起来真的累！而且！最近是帐篷节，周末人多到爆！无论是等缆车！还是徒步！都会把你挤哭的！要去的记得选好时间
					门票：可以买门票+一级索道往返票=170元，索道往返价格有些微差异，具体可美团（据说一级索道途经的风景一般，建议保存体力选择搭乘缆车。本人觉得二级索道沿途风景也很一般啊......缺乏运动的小伙伴
					`,
				datalist:[
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p2.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗窗，这扇窗~',
					},
				],
				detail: {},
				isShowAll: false,
				Id:0,
				LikeList:[],
				CommnetList:{},
				userId:'',
				token:'',
				// 评论内容
				Comment:'',
				findList:[]
			}
		},
		onLoad(options) {
			let Id = options.Id
			this.Id = Id
			this.getUserInfo()
			// console.log('我是传递过来的Id',options)
			this.getDetail(Id)
			// this.getDataList()
			this.getLikeList(Id)
			this.getCommnetList(Id)
			this.getFindList()
		},
		methods: {
			// 组件点赞
			changeItem(res){
				// console.log('我是子组件传递过来的：',res)
				this.CommnetList[res.index].IsLike = !this.CommnetList[res.index].IsLike 
				if(res.count === true) {
					this.CommnetList[res.index].LikeNum++
				}else {
					this.CommnetList[res.index].LikeNum--
				}
				// console.log('我是子组件传递过来的处理过的：',this.CommnetList[res.index])
			},
			// 获取用户id以及token
			getUserInfo () {
				this.userId = uni.getStorageSync('userId');
				this.token = uni.getStorageSync('token');
			},
			changeSwiper(e){
				this.currentSwiper=e.detail.current;
			},
			// 星语详情
			async getDetail(Id){
				let res = await post('Find/FindNewsInfo',{FindId:Id})
				console.log('星语详情：',res)
				// 正则改变富文本
				res.data.ContentDetails = res.data.ContentDetails.replace(/<img/g, '<img style="max-width:100%;"');
				this.detail = res.data
			},
			changeIsShowAll(){
				this.isShowAll = !this.isShowAll
				console.log(this.isShowAll)
			},
			// // 推荐列表
			// async getDataList (){
			// 	let res = await post('Find/FindList',{myType:2})
			// 	this.datalist = res.data
			// },
			// 点赞
			async toZan (Id) {
				let res = await post('Find/FindlikeOperation',{UserId:this.userId,Token:this.token,FindId:Id})
				// console.log("点赞返回：",res)
				if (res.code === 0){
					this.detail.IsLike = !this.detail.IsLike
					if(this.detail.IsLike === true) {
						this.detail.LikeNum++
					}else {
						this.detail.LikeNum--
					}
				}
				uni.showToast({
				    title:res.msg,
				    icon:'none'
				});
			},
			// 发现点赞列表
			async getLikeList (Id){
				let res = await post('Find/FindLikesList',{FindId:Id,Page:1})
				console.log('发现点赞列表:',res)
				this.LikeList = res.data
			},
			// 发现评论列表
			async getCommnetList (Id){
				let res = await post('Find/CommnetList',{FkId:Id,PageSize:4})
				console.log('发现评论列表:',res)
				this.CommnetList = res.data
			},
			// 用户评论操作
			async toComment (Id){
				let res = await post('Find/CommentOperation',{UserId:this.userId,Token:this.token,FkId:Id,Comment:this.Comment})
				console.log('评论后返回:',res)
				if(res.code === 0){
					uni.showToast({
					    title: res.msg,
					    icon:'none'
					});
					// 清空输入框
					this.Comment = ""
					// 如果评论成功需要再次请求评论列表
					this.getCommnetList(this.Id)
				}
			},
			/* 评论 */
			confirm(Id) {
			   if (this.Comment.replace(/(^s*)|(s*$)/g, "").length ==0) {
					return uni.showToast({
					    title:'请输入评论内容',
					    icon:'none'
					});
				}
				this.toComment(Id)
			},
			// 收藏/取消收藏
			async toCollections() {
				if (this.detail.CollectionId === 0){
					// 收藏
					let res = await post('User/AddCollections',{UserId:this.userId,Token:this.token,Type:5,Id:this.Id})
					if(res.code === 0){
						this.detail.CollectionId = 1
						this.detail.CollectNum++
					}
				}else {
					let res = await post('User/ReCollections',{UserId:this.userId,Token:this.token,Type:5,Id:this.Id})
					// console.log('取消收藏：',res)
					if(res.code === 0){
						this.detail.CollectionId = 0
						this.detail.CollectNum--
					}
				}			
			},
			// 关注
			async toFolloow (){
				let res = await post('Find/FollowOperation',{UserId:this.userId,Token:this.token,ToMemberId:this.detail.MemberId})
				console.log('点击关注返回：',res)
				
				if(res.code ===0){
					this.detail.IsFollow = !this.detail.IsFollow
				}				
				uni.showToast({
					title: res.msg,
					icon:'none'
				})
			},
			// 星语列表
			async getFindList() {
				let res = await post('Find/FindList',{myType:2})
				console.log('用户发现list：',res)
				this.findList = res.data
			}
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
@import './detail.scss';
</style>