<template>
	<div class="bgfff">
		<view class="index_swiper" v-if="detail.ImgList.length">
			<swiper class="swiper" :indicator-dots="false" circular autoplay :interval="5000" :duration="500" 
			@change="changeSwiper" :style="'height:'+imgHeight+'rpx'">
				<swiper-item @click="previewImage(detail.ImgList, index)" 
					v-for="(item, index) in detail.ImgList" :key="index">
					<view class="swiper-item"><image class="img" :src="item" mode="widthFix"></image></view>
				</swiper-item>
			</swiper>
			<view v-if="detail.ImgList.length > 1" class="dots">
				<view v-for="(item, index) in detail.ImgList" :key="index" :class="['dot', currentSwiper == index ? 'active' : '']"></view>
			</view>
		</view>
		<div class="p30">
			<div class="user flex-center-between">
				<div class="info flex-center">
					<view class="officialBox" @click="!detail.FindType ? navigate('starLangSon/homePage', { taUserId: detail.MemberId }) : ''">
						<!-- <view class="officialBox" @click="navigate('starLangSon/homePage',{taUserId:detail.MemberId})"> -->
						<image :src="detail.Avatar || 'http://xqk.wtvxin.com/images/wxapp/default.png'"></image>
						<view class="official" v-if="detail.IsAuthor"><image src="@/static/icons/official.png"></image></view>
					</view>
					<view>
						<h5>{{ detail.NickName }}</h5>
						<p>{{ editTime(detail.Addtime) }} 发布</p>
					</view>
				</div>
				<div class="btnBox flex-center">
					<block v-if="!detail.FindType">
						<div class="btn-min solid" v-if="detail.IsFollow" @click="toFolloow">已关注</div>
						<div class="btn-min" v-else @click="toFolloow">关注</div>
					</block>
					<button class="iconfont icon-fenxiang1" open-type="share"></button>
				</div>
			</div>
			<div class="detail bb1 pb20">
				<h2>{{ detail.Title }}</h2>
				<rich-text
					ref="content"
					id="content"
					class="content"
					:class="{ showAll: isShowAll }"
					:style="{ 'white-space': 'pre-wrap', height: textHeight + 'rpx', 'font-size': '28rpx', 'line-hieght': '36rpx' }"
					:nodes="detail.ContentDetails"
					:selectable="true"
				></rich-text>
				<view v-if="isShowAll" class="shade" @click="changeIsShowAll"><view class="text">点击展开</view></view>
			</div>
			<div class="pro" v-if="detail.ExternalLink">
				<h4>文中提及</h4>
				<div class="shadow"><pro-item></pro-item></div>
			</div>
			<div class="good bb1 ptb30">
				<!-- <h4>收藏</h4> -->
				<div class="flex-center-between">
					<div v-if="LikeList.length > 0" class="avatar flex-center">
						<block v-for="(item2, index) in LikeList" :key="index">
							<view class="officialBox">
								<image v-if="index < 6" :src="item2.Avatar || 'http://xqk.wtvxin.com/images/wxapp/default.png'"></image>
								<view class="official" v-if="item2.IsAuthor"><image src="@/static/icons/official.png"></image></view>
							</view>
						</block>
					</div>
					<div v-else class="avatar flex-center"><image src="http://xqk.wtvxin.com/images/wxapp/default.png" mode=""></image></div>
					<!-- <div class="zan-icon flex-center" :class="{active: detail.IsLike}" @click="toZan(Id)">
						<div class="iconfont icon-zan" :class='{"icon-zan1" : detail.IsLike,"active" : detail.IsLike}'></div>
						<text>{{ detail.LikeNum ? detail.LikeNum : 0 }}</text>
					</div> -->
					<div @click="toCollections" class="collect flex-center" :class="{ active: detail.CollectionId }">
						<div class="iconfont" :class="{ 'icon-aixin2': !detail.CollectionId, 'icon-aixin': detail.CollectionId, active: detail.CollectionId }"></div>
						<text>{{ detail.CollectNum }}</text>
					</div>
				</div>
			</div>
			<div class="reply">
				<h4>回复</h4>
				<div class="add flex-center-between">
					<ans-input @confirm="confirm(Id)" class="input" placeholder="写评论..." v-model="Comment" :align="left" maxlength="250"></ans-input>
				</div>
				<reply-item
					v-for="(item, index2) in CommnetList.data"
					:key="index2"
					:item="item"
					:index="index2"
					:isCheckReply="isCheckReply"
					@changeItem="changeItem"
				></reply-item>
				<div v-if="CommnetList.count" class="more" @click="navigate('starLangSon/reply', { Id: Id, IsMy: detail.IsMy })">点击查看{{ CommnetList.count }}条评论</div>
			</div>
		</div>
		<div class="gap20"></div>
		<div class="other plr30 pb30" v-if="findList.length">
			<!-- <h4>其他推荐星语</h4> -->
			<h4>{{ footTitle }}</h4>
			<div class="flex-center-between2"><product-item v-for="(item, index) in findList" :key="index" :item="item" @onCollect="onProCollect"></product-item></div>
			<div class="btn-max" @click="navigate('home/searchList')">查看更多</div>
		</div>
		<div class="gap20"></div>
		<div class="other plr30 pb30" v-if="proList.length">
			<!-- <h4>其他推荐星语</h4> -->
			<h4>推荐星语</h4>
			<div class="flex-center-between find-list">
				<starLangItem v-for="(item, index) in proList" :key="index" :item="item" @onCollect="onCollect" @onLike="onLike"></starLangItem>
			</div>
			<div class="btn-max" @click="switchTab('tabBar/starLang/starLang')">查看更多</div>
		</div>
	</div>
</template>

<script>
import proItem from '@/components/productItem.vue';
import starLangItem from '@/components/starLangItem.vue';
import replyItem from './replyItem.vue';
import ansInput from '@/components/ans-input/ans-input.vue';
import { navigate, post, switchTab, getCurrentPageUrlWithArgs, editTime } from '@/utils';
import productItem from '@/components/productItem.vue';
import { previewImage } from '@/utils/image-tools';
import { startLevel } from '@/components/starLevel';
export default {
	components: { proItem, replyItem, starLangItem, productItem, startLevel, ansInput },
	data() {
		return {
			editTime,
			previewImage,
			score: 3.4,
			navigate,
			switchTab,
			Page: 1,
			PageSize: 4, // 关联星球客的页容量
			index: 0,
			oneLoad: 1,
			ProIdArr: [],
			currentSwiper: 0,
			content: `风景是真的美，但走起来真的累！而且！最近是帐篷节，周末人多到爆！无论是等缆车！还是徒步！都会把你挤哭的！要去的记得选好时间
					门票：可以买门票+一级索道往返票=170元，索道往返价格有些微差异，具体可美团（据说一级索道途经的风景一般，建议保存体力选择搭乘缆车。本人觉得二级索道沿途风景也很一般啊......缺乏运动的小伙伴
					`,
			datalist: [
				{
					pic: '/static/of/p3.jpg',
					name: '旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~'
				},
				{
					pic: '/static/of/p2.jpg',
					name: '旅行为我门的生活打开了一扇窗，这扇窗窗，这扇窗~'
				}
			],
			detail: {
				ImgList: ''
			},
			imgHeightArr:[],//banner高度数组
			imgHeight:400,
			isShowAll: false,
			isCheckReply: true,
			Id: 0,
			LikeList: [],
			CommnetList: [],
			userId: '',
			token: '',
			// 评论内容
			Comment: '',
			textHeight: 'auto',
			findList: [],
			footTitle: '关联星球客',
			proList: []
		};
	},
	computed: {
		// 根据字符长度判断是否需要显示,展开全部
		isToLong() {
			return (this.detail.ContentAbstract + this.detail.ContentDetails).length > 48;
		}
	},
	onLoad(options) {
		let Id = options.Id;
		this.Id = Number(Id);
		this.getUserInfo();
		// console.log('我是传递过星语详情的Id',options)
		this.getLikeList(Id);
		// 去了查看评论后,返回需要再次请求评论列表
		this.getCommnetList(this.Id);
		// 还需要再次请求detail信息
		this.getDetail(this.Id);
	},
	onShow() {
		this.getUserInfo();
		// 去了查看评论后,返回需要再次请求评论列表
		if (!this.oneLoad) {
			this.getCommnetList(this.Id);
		}
	},
	mounted() {
	},
	onReady() {
	},
	methods: {
		// 点击了星语收藏
		async onCollect(item) {
			this.proList.map(async tem => {
				if (tem.Id === item.Id) {
					tem.CollectNum = item.CollectNum;
					tem.CollectionId = item.CollectionId;
				}
			});
		},
		// 点击了星语点赞
		async onLike(item) {
			this.proList.map(async tem => {
				if (tem.Id === item.Id) {
					tem.IsLike = item.IsLike;
					tem.LikeNum = item.LikeNum;
				}
			});
		},
		// 获取富文本高度
		getReactBox(data) {
			// 第一
			this.$nextTick().then(() => {
				// DOM 更新了
				let view = uni.createSelectorQuery().select('#content');
				view.fields(
					{
						size: true
					},
					data => {
						if (data.height > 216) {
							this.textHeight = 216;
							this.isShowAll = true;
						}
					}
				).exec();
			});
		},
		// 组件点赞
		changeItem(item) {
			if (!item.isReply) {
				this.CommnetList.data.map(tem => {
					if (tem.Id === item.data.Id) {
						tem.IsLike = item.data.IsLike;
						tem.LikeNum = item.data.LikeNum;
					}
				});
			} else {
				this.replyList.map(tem => {
					if (tem.Id === item.data.Id) {
						tem.IsLike = item.data.IsLike;
						tem.LikeNum = item.data.LikeNum;
					}
				});
			}
		},
		// 获取用户id以及token
		getUserInfo() {
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
		},
		changeSwiper(e) {
			this.currentSwiper = e.detail.current;
			this.imgHeight = this.imgHeightArr[e.detail.current];
		},
		// 星语详情
		async getDetail(Id) {
			let res = await post('Find/FindNewsInfo', {
				UserId: this.userId,
				Token: this.token,
				FindId: Id
			});
			console.log('星语详情：', res);
			if (res.code === 0) {
				// 确定是否是自己写的文章,并且存储到vuex中
				this.$store.commit('update', {
					IsMy: res.data.IsMy
				});
				// 正则改变富文本
				res.data.ContentDetails = res.data.ContentDetails.replace(/<img/g, '<img style="max-width:100%;"');
				this.detail = res.data;
				this.detail.ImgList = res.data.ImgList.split(',');
				const that = this;
				// this.detail.ImgList.map(item=>{
				// 	uni.getImageInfo({
				// 		src:item,
				// 		success(ret){
				// 			console.log(ret,'获取到的图片信息')
				// 			let height = ret.height/(ret.width/750)
				// 			that.imgHeightArr.push(height)
				// 		}
				// 	})
				// })
				let imgList = this.detail.ImgList
				console.log(imgList,'imgList')
				for(let i=0;i<imgList.length;i+=1){
					const height = await this.getImgPath(imgList[i])
					console.log(imgList[i],'url',height)
					this.imgHeightArr.push(height)
				}
				console.log(this.imgHeightArr, 'detail');
				// 异步需要在这个成功之后,才能根据这个ProIdArr请求
				this.getFindList();
				// 更新dom之后
				this.getReactBox();
				this.getProList(); //获取星语推荐
			}
			// 更新Dom之后
			this.$nextTick().then(() => {
				this.oneLoad = 0;
			});
		},
		getImgPath(url){
			return new Promise((resolve,reject)=>{
				uni.getImageInfo({
					src:url,
					success(ret){
						console.log(ret,'获取到的图片信息')
						let height = ret.height/(ret.width/750)
						resolve(height)
					}
				})
			
			})
		},
		changeIsShowAll() {
			this.isShowAll = !this.isShowAll;
			this.textHeight = 'auto';
		},
		// 点赞
		async toZan(Id) {
			let res = await post('Find/FindlikeOperation', {
				UserId: this.userId,
				Token: this.token,
				FindId: Id
			});
			if (res.code === 0) {
				this.detail.IsLike = !this.detail.IsLike;
				if (this.detail.IsLike === true) {
					this.detail.LikeNum++;
				} else {
					this.detail.LikeNum--;
				}
				this.getLikeList();
			}
		},
		// 发现点赞列表
		async getLikeList() {
			let res = await post('Find/FindCollectList', {
				FindId: this.Id,
				Page: 1,
				PageSize: 10
			});
			if (res.code === 0) {
				this.LikeList = res.data;
			}
		},
		// 发现评论列表
		async getCommnetList(Id) {
			let res = await post('Find/CommnetList', {
				UserId: this.userId,
				Token: this.token,
				FkId: Id,
				PageSize: 4
			});
			console.log('发现评论列表:', res);
			if (res.code === 0) {
				this.CommnetList = res;
				this.$store.commit('update', {
					allComment: this.CommnetList
				});
			}
		},
		// 用户评论操作
		async toComment(Id) {
			let res = await post('Find/CommentOperation', {
				UserId: this.userId,
				Token: this.token,
				FkId: Id,
				Comment: this.Comment
			});
			// console.log('评论后返回:',res)
			if (res.code === 0) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				// 清空输入框
				this.Comment = '';
				// 如果评论成功需要再次请求评论列表
				this.getCommnetList(this.Id);
				// // 如果评论成功，需要给detail的回复+1
				this.detail.CommentNum++;
			}
		},
		/* 评论 */
		confirm(Id) {
			if (this.Comment.trim().length == 0) {
				return uni.showToast({
					title: '请输入评论内容',
					icon: 'none'
				});
			}
			this.toComment(Id);
		},
		// 收藏/取消收藏
		async toCollections() {
			if (this.detail.CollectionId === 0) {
				// 收藏
				let res = await post('User/AddCollections', {
					UserId: this.userId,
					Token: this.token,
					Type: 5,
					Id: this.Id
				});
				if (res.code === 0) {
					this.detail.CollectionId = 1;
					this.detail.CollectNum++;
				}
			} else {
				let res = await post('User/ReCollections', {
					UserId: this.userId,
					Token: this.token,
					Type: 5,
					Id: this.Id
				});
				// console.log('取消收藏：',res)
				if (res.code === 0) {
					this.detail.CollectionId = 0;
					this.detail.CollectNum--;
				}
			}
			this.getLikeList();
		},
		// 关注
		async toFolloow() {
			let res = await post('Find/FollowOperation', {
				UserId: this.userId,
				Token: this.token,
				ToMemberId: this.detail.MemberId
			});
			// console.log('点击关注返回：',res)

			if (res.code === 0) {
				this.detail.IsFollow = !this.detail.IsFollow;
			}
			uni.showToast({
				title: res.msg,
				icon: 'none'
			});
		},
		// 关联星球客列表,根据返回的ProIdArr请求，发布时候的关联星球客
		async getFindList() {
			// let tempArr = this.detail.ProIdArr
			let res;
			this.ProIdArr = this.detail.ProIdArr;
			if (this.ProIdArr.length > 0) {
				this.footTitle = '关联星球客';
				// console.log('this.ProIdArr---',this.ProIdArr,this.detail.ProIdArr)
				res = await post('Goods/GoodsList_yd', {
					Page: this.Page,
					UserId: this.userId,
					Token: this.token,
					ProIdArr: this.ProIdArr
				});
				if (res.code === 0) {
					this.findList = res.data;
				}
			}
			// 如果没有关联就推荐
			//  else {
			// 	this.footTitle = '推荐星球客';
			// 	res = await post('Goods/GoodsList_yd', {
			// 		Page: this.Page,
			// 		PageSize: this.PageSize,
			// 		UserId: this.userId,
			// 		Token: this.token,
			// 		Sort: 3
			// 	});
			// }
		},
		// 推荐产品点击收藏
		onProCollect(params) {
			this.findList.map(item => {
				if (params.Id === item.Id) {
					item.CollectionId = params.CollectionId;
					item.CollectNum = params.CollectNum;
				}
			});
		},
		getProList() {
			post('Find/FindList', {
				Page: 1,
				PageSize: 12,
				UserId: this.userId,
				Token: this.token,
				myType: 2,
				AreaSite: this.detail.Location
			}).then(res => {
				this.proList = res.data;
			});
		}
	},
	onShareAppMessage: function(res) {
		// let gbid = res.target.dataset.info.order_id;
		// console.log('我触发分享了')
		return {
			title: '分享',
			path: getCurrentPageUrlWithArgs(),
			// imageUrl: 'https://......./img/groupshare.png',  //用户分享出去的自定义图片大小为5:4,
			success: function(res) {
				// 转发成功
				// console.log('成功分享')
				uni.showToast({
					title: '分享成功',
					icon: 'success',
					duration: 2000
				});
			},
			fail: function(res) {
				// 分享失败
				// console.log('分享失败')
				uni.showToast({
					title: '分享失败',
					icon: 'none',
					duration: 2000
				});
			}
		};
	}
};
</script>
<style scoped lang="scss">
@import './detail.scss';
</style>
