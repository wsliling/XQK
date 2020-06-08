<template>
	<div class="bgfff">
		<!--轮播图-->
		<view class="index_swiper" v-if="detail.ImgList.length">
			<swiper class="swiper" :indicator-dots="false" autoplay :interval="5000" :duration="500" @change="changeSwiper">
				<!-- <swiper-item v-for="(item,index) in detail.ImgList" :key="index"> -->
				<swiper-item @click='previewImage(index)' v-for="(item,index) in ImgList" :key="index">
					<view class="swiper-item">
						<!-- <image class="img" src="/static/of/banner.jpg" mode="aspectFill"></image> -->
						<image class="img" :src="item" mode="widthFix"></image>
						<!-- <image class="img" :src="detail.ImgList" mode="aspectFill"></image> -->
					</view>
				</swiper-item>
			</swiper>
			<view v-if="ImgList.length > 1" class="dots">
				<!-- <view v-for="(item,index) in detail.ImgList" :key="index" :class="['dot',currentSwiper==index?'active':'']"></view> -->
				<view v-for="(item,index) in ImgList" :key="index" :class="['dot',currentSwiper==index?'active':'']"></view>
			</view>
		</view>
		<div class="p30">
			<div class="user flex-center-between">
				<div class="info flex-center">
					<!-- <img src="/static/of/banner.jpg" alt=""> -->
					<!-- <img @click="navigate('starLangSon/homePage',{taUserId:detail.MemberId})" :src="detail.Avatar" alt=""> -->
					<image @click="navigate('starLangSon/homePage',{taUserId:detail.MemberId})" :src="detail.Avatar||'http://xqk.wtvxin.com/images/wxapp/default.png'"></image>
					<h5>{{ detail.NickName }}</h5>
				</div>
				<div class="btnBox flex-center" @click="toFolloow">
					<div class="btn-min solid" v-if='detail.IsFollow'>已关注</div>
					<div class="btn-min" v-else>关注</div>
					<!-- <div class="iconfont icon-fenxiang"></div> -->
					<button class="iconfont icon-fenxiang1" open-type="share"></button>
				</div>
			</div>
			<div class="detail bb1 pb20">
				<h2>{{ detail.Title}}</h2>
				<!-- <div class="content" v-show="isShowAll" v-html="detail.ContentAbstract + detail.ContentDetails"></div>
				<div class="content" v-show="!isShowAll" v-html="detail.ContentAbstract"></div> -->
				<!-- <div class="content uni-ellipsis2" :class="{allContent : !isShowAll}" v-html="detail.ContentAbstract + detail.ContentDetails"></div> -->
				<!-- <div class="content" v-show="!isShowAll" v-html="detail.ContentAbstract"></div> -->
				<!-- 'uni-ellipsis2': !isShowAll -->
				<!-- <view ref='content' id='content' class="content" :class="{'showAll': isShowAll }" v-html="detail.ContentAbstract + detail.ContentDetails"></view> -->
				 <view ref='content' 
				 id='content' 
				 class="content" 
				 :class="{'showAll': isShowAll }" 
				 v-html="detail.ContentDetails" 
				 :style="{'white-space': 'pre-wrap',height:textHeight+'rpx','font-size':'28rpx','line-hieght': '36rpx'}">
				 </view>
				<!-- <div class="more flex-center" @click="changeIsShowAll" v-show="(!isShowAll) && isToLong ">展开全部 <uni-icons type="arrowdown" color="#5cc69a"></uni-icons></div> -->
				<view v-if="isShowAll" class="shade" @click="changeIsShowAll">
					<view class="text">
						点击展开
					<!-- <image src="" mode=""></image> -->
					</view>
				</view>
				<!-- <p>2020-04-28发布</p> -->
				<p>{{ formatTime(detail.Addtime)}} 发布</p>
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
					<div v-if="LikeList.length > 0" class="avatar flex-center">
						<block v-for="(item2,index) in LikeList" :key="index">
							<!-- <img src="/static/of/banner.jpg" alt=""> -->
							<image :src="item2.Avatar ||'http://xqk.wtvxin.com/images/wxapp/default.png'"></image>
						</block>
					</div>
					<div v-else class="avatar flex-center">
							<!-- <img src="/static/of/banner.jpg" alt=""> -->
							<image src="http://xqk.wtvxin.com/images/wxapp/default.png" mode=""></image>
					</div>
					<div class="zan-icon flex-center" :class="{active: detail.IsLike}" @click="toZan(Id)">
						<!-- <div class="iconfont icon-zan" :class="{active: detail.IsLike}"></div>{{ detail.LikeNum}} -->
						<div class="iconfont icon-zan" :class='{"icon-zan1" : detail.IsLike,"active" : detail.IsLike}'></div>
						<text>{{ detail.LikeNum ? detail.LikeNum : 0 }}</text>
					</div>
				</div>
			</div>
			<div class="reply">
				<h4>回复</h4>
				<div class="add flex-center-between">
					<input confirm-type="send" @confirm="confirm(Id)" type="text" placeholder="写评论..." v-model="Comment">
					<div class="line1"></div>
					<div  @click="toCollections" class="collect flex-column-center-center" :class="{active : detail.CollectionId}">
						<div class="iconfont" :class='{"icon-aixin2": !detail.CollectionId,"icon-aixin" : detail.CollectionId,"active" : detail.CollectionId}'></div>
						<!-- <div v-show='!detail.CollectionId' class="iconfont icon-aixin2"></div>
						<div v-show='detail.CollectionId' class="iconfont icon-aixin active"></div> -->
						<text>{{ detail.CollectNum}}</text>
					</div>
				</div>
				<reply-item 
				v-for="(item,index2) in CommnetList" :key="index2" 
				:item="item"
				:index='index2'
				:MemberId='detail.MemberId' 
				@changeItem="changeItem"></reply-item>
				<div v-if='detail.CommentNum' class="more" @click="navigate('starLangSon/reply',{Id:Id})">查看{{ CommnetList.length }}条评论</div>
			</div>
		</div>
		<div class="gap20"></div>
		<div class="other plr30 pb30">
			<!-- <h4>其他推荐星语</h4> -->
			<h4>关联星球客</h4>
			<div class="flex-center-between2">
				<!-- <starLangItem :item="item"  v-for="(item,index) in findList" :key="index"></starLangItem> -->
				<product-item v-for="(item,index) in findList" :key="index" :item="item"></product-item>
				<!-- <starLangItem :item="item"  v-for="(item,index) in 6" :key="index"></starLangItem> -->
			</div>
			<div class="btn-max" @click="switchTab('tabBar/starLang/starLang')">查看更多星语</div>
		</div>
	</div>
</template>

<script>
	import proItem from '@/components/productItem.vue';
	import starLangItem from '@/components/starLangItem.vue';
	import replyItem from './replyItem.vue';
	import {navigate,post,switchTab,getCurrentPageUrlWithArgs} from '@/utils';
	import productItem from '@/components/productItem.vue';
	import { formatTime } from '@/common/util.js'
	import { previewImage } from '@/utils/image-tools';
	export default {
		components:{proItem,replyItem,starLangItem,productItem},
		data() {
			return {
				navigate,
				switchTab,
				Page:1,
				index: 0,
				ProIdArr:'',
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
				detail: {
					ImgList:''
				},
				isShowAll: false,
				Id:0,
				LikeList:[],
				CommnetList:[],
				userId:'',
				token:'',
				// 评论内容
				Comment:'',
				textHeight: 'auto',
				findList:[]
			}
		},
		onLoad(options) {
			let Id = options.Id
			this.Id = Number(Id)
			this.getUserInfo()
			// console.log('我是传递过星语详情的Id',options)
			// this.getDetail(Id)
			// this.getDataList()
			this.getLikeList(Id)
			// this.getCommnetList(Id)
			// this.getFindList()
			// 去了查看评论后,返回需要再次请求评论列表
			this.getCommnetList(this.Id)
			// 还需要再次请求detail信息
			this.getDetail(this.Id)
		},
		onShow() {
			// console.log('getCurrentPages()----------- ',getCurrentPageUrlWithArgs() )
			if(this.userId == '' || this.token == '') {
				this.getUserInfo()
			}
			// 去了查看评论后,返回需要再次请求评论列表
			this.getCommnetList(this.Id)
			
		},
		onShareAppMessage: function (res) {
		    // let gbid = res.target.dataset.info.order_id;
			// console.log('我触发分享了')
		    return {
		      title: '分享',
		      path: getCurrentPageUrlWithArgs(),
		      // imageUrl: 'https://......./img/groupshare.png',  //用户分享出去的自定义图片大小为5:4,
		      success: function (res) {
			   // 转发成功
					// console.log('成功分享')
			        uni.showToast({
			          title: "分享成功",
			          icon: 'success',
			          duration: 2000
			        })
		       },
		      fail: function (res) {
		        // 分享失败
					// console.log('分享失败')
					uni.showToast({
						title: "分享失败",
						icon: 'none',
					duration: 2000
					})
				},
		    }
		  },
			mounted() {
				//获取#content的高度
				// this.$nextTick()
				//   .then(() =>{
				// 		console.log('我是this------', this)
				//     // DOM 更新了
				// 		let view = uni.createSelectorQuery().select('#content');
				// 				view.fields({
				// 					size: true
				// 				},
				// 			    data => {
				// 					console.log('我是this------', this)
				// 					this.textHeight = data.height + 'upx';
				// 					console.log('查看this.$refs:',view,this.$refs)
				// 					console.log(this.$refs.content.$el.getBoundingClientRect())
				// 					console.log('我是行数------', data,this.textHeight,data.height)
				// 					if(data.height > 0) {
				// 						this.isShowAll = true
				// 					}
				// 		}).exec();
				//   })
				// 第二种方案
				// this.getReactBox({class:'content'})
			},
		onReady() {
		},
		methods: {
			// 全屏预览图片
			previewImage(index) {
				previewImage(this.ImgList,index)
			},
			// 获取富文本高度
			getReactBox(data) {
				// 第一
				this.$nextTick()
				  .then(() =>{
						console.log('我是this------', this)
				    // DOM 更新了
						let view = uni.createSelectorQuery().select('#content');
								view.fields({
									size: true
								},
							    data => {
									// console.log('我是this------', this)
									// console.log('查看this.$refs:',view,this.$refs)
									// console.log(this.$refs.content.$el.getBoundingClientRect())
									// console.log('我是行数------', data,this.textHeight,data.height)
									if(data.height > 216 ) {
										// this.textHeight = data.height;
										// console.log('改变后的行数--===----', data,this.textHeight)
										this.textHeight = 216
										this.isShowAll = true
									}
						}).exec();
				  })
				// 第二
				// uni.createSelectorQuery().select(`.${data.class}`).boundingClientRect.exec(res=>{
				// 	if(res[0]) {
				// 		data.tempReact = {
				// 			top: res[0].top,
				// 			left: res[0].left,
				// 			width: res[0].width,
				// 			height: res[0].height
				// 		}
				// 		data.viewReac = Object.assign({}, data.tempReact)
				// 		console.log('我是conten的呀', data)
				// 	}else {
				// 		// 如果获取失败,延迟到下次DOM更新循环之后再次获取
				// 		this.$nextTick(()=>{
				// 			this.getReactBox(data)
				// 		})
				// 	}
				// })
				
			},
			// 组件点赞
			// changeItem(res){
			// 	console.log('我是子组件传递过来的：',res)
			// 	if (res.isReply) {
			// 		this.CommnetList[res.index].IsLike = !this.CommnetList[res.index].IsLike 
			// 	}else {
			// 		this.CommnetList[res.index].MyCommnetList[res.val].IsLike = !this.CommnetList[res.index].MyCommnetList[res.val].IsLike
			// 	}
				
			// 	if(res.count === true) {
			// 		if (res.isReply) {
			// 			this.CommnetList[res.index].LikeNum++	
			// 		}else {
			// 			this.CommnetList[res.index].MyCommnetList[res.val].LikeNum++	
			// 		}
			// 	}else {
			// 		if (res.isReply) {
			// 			this.CommnetList[res.index].LikeNum--
			// 		}else {
			// 			this.CommnetList[res.index].MyCommnetList[res.val].LikeNum--
			// 		}
			// 	}
			// 	// console.log('我是子组件传递过来的处理过的：',this.CommnetList[res.index])
			// },
			// 组件点赞
			changeItem(res){
				console.log('我是子组件传递过来的：',res)
				if (!res.isReply) {
					this.CommnetList[res.index].IsLike = !this.CommnetList[res.index].IsLike
					// this.CommnetList[this.index] = JSON.parse(JSON.stringify(res.data))
				}else {
					this.replyList[res.index].IsLike = !this.replyList[res.index].IsLike
					// this.replyList[this.index] = JSON.parse(JSON.stringify(res.data))
				}
				// console.log('我是子组件传递过来的处理之后：',this.CommnetList,this.CommnetList[this.index])
				if(res.count === true) {
					if (!res.isReply) {
						this.CommnetList[res.index].LikeNum++	
						// this.CommnetList[this.index] = res.data
					}else {
						this.replyList[res.index].LikeNum++	
						// this.replyList[this.index] = res.data
					}
				}else {
					if (!res.isReply) {
						this.CommnetList[res.index].LikeNum--
					}else {
						this.replyList[res.index].LikeNum--
					}
				}
				// console.log('我是子组件传递过来的处理过的：',this.CommnetList[res.index])
				console.log('我是子组件传递过来的处理之后：',this.CommnetList,this.CommnetList[this.index])
				
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
				let res = await post('Find/FindNewsInfo',{UserId:this.userId,Token:this.token,FindId:Id})
				console.log('星语详情：',res)
				if(res.code ===0 ){
					// 正则改变富文本
					res.data.ContentDetails = res.data.ContentDetails.replace(/<img/g, '<img style="max-width:100%;"');
					this.detail = res.data
					// 异步需要在这个成功之后,才能根据这个ProIdArr请求
					this.getFindList()
					// 更新dom之后
					this.getReactBox()
				}
			},
			changeIsShowAll(){
				this.isShowAll = !this.isShowAll
				this.textHeight = 'auto'
				// console.log(this.isShowAll)
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
					this.getLikeList(this.Id)
				}
				// uni.showToast({
				//     title:res.msg,
				//     icon:'none'
				// });
			},
			// 发现点赞列表
			async getLikeList (Id){
				let res = await post('Find/FindLikesList',{FindId:Id,Page:1})
				// console.log('发现点赞列表:',res)
				if(res.code === 0 ){
					this.LikeList = res.data
				}
			},
			// 发现评论列表
			async getCommnetList (Id){
				let res = await post('Find/CommnetList',
				{
					UserId:this.userId,
					Token:this.token,
					FkId:Id,
					PageSize:4})
				console.log('发现评论列表:',res)
				if(res.code === 0 ){
					this.CommnetList = res.data
					this.$store.commit('update',{"allComment":this.CommnetList})
					console.log('发现评论列表vuex存储allComment：',this.$store.state.allComment)
				}
			},
			// 用户评论操作
			async toComment (Id){
				let res = await post('Find/CommentOperation',{UserId:this.userId,Token:this.token,FkId:Id,Comment:this.Comment})
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
				// console.log('点击关注返回：',res)
				
				if(res.code ===0){
					this.detail.IsFollow = !this.detail.IsFollow
				}				
				uni.showToast({
					title: res.msg,
					icon:'none'
				})
			},
			// 星语列表,根据返回的ProIdArr请求，发布时候的关联星球客
			async getFindList() {
				// let tempArr = this.detail.ProIdArr
				this.ProIdArr = this.detail.ProIdArr
				// console.log('this.ProIdArr---',this.ProIdArr,this.detail.ProIdArr)
				let res = await post('Goods/GoodsList_yd',{Page:this.Page,UserId:this.userId,Token:this.token,ProIdArr:this.ProIdArr})
				// console.log('下面-用户发现list：',res)
				if(res.code === 0 ){
					this.findList = res.data
				}
				
			}
		},
		computed:{
			formatTime (time){
				return (time)=>{
					if(!time) {
						return ''
					}
					// console.log('格式化时间：',time,formatTime(time))
					return formatTime(time)
				}
			},
			// 处理返回来的图片数组
			ImgList () {
				
				return this.detail.ImgList.split(',')
			},
			// 根据字符长度判断是否需要显示,展开全部
			isToLong() {
				return (this.detail.ContentAbstract + this.detail.ContentDetails).length>48
			}
		}
	}
</script>
<style scoped lang="scss">
@import './detail.scss';
</style>