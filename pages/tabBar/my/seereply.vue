<template>
	<!-- 查看回复 -->
	<view class="seereply">
		<view class="tab flex">
			<view class="flex1 flexc" :class="{ 'active': tabIndex == index }" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{ item }}</view>
			<span :style="'left:'+tabStyle+'rpx'"></span>
			<view class="activered" v-if="false"></view>
		</view>
		<view class="focus">
			<view class="focusleft" v-for="(val,key) in replyList" :key="key" @click="navigate('starLangSon/detail',{Id:val.FkId})">
				<view class="forcusimg">
					<image :src="val.MemberHead" mode=""></image>
				</view>
				<view class="focuscenter">
					<view class="focusbox">
						<view class="focusname">{{val.MemberName}}<span v-if="false"></span></view>
						<view class="focusfz22">{{val.AddTime}}</view>
						<view class="focusfz28">{{val.Comment}}</view>
						<view class="focusfz24">回复了{{val.NickName}}的星语</view>
					</view>
					<view class="focusright">
						<image :src="'http://xqk.wtvxin.com' + val.PicNo" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<noData v-if="noDataIsShow"></noData>
		<view class="uni-tab-bar-loading">
			<uni-load-more :loadingType="loadingType" v-if="noDataIsShow == false"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import { post, navigate } from '@/utils'
	import noData from '@/components/notData.vue'; //暂无数据
export default{
		components:{noData},
		data(){
			return{
				navigate,
				tabList: ['我的回复', '回复我的'],
				tabIndex: 0,
				Type:0,  //0-我的回复 1-回复我的
				Page:1,
				PageSize:10,
				replyList:[],
				noDataIsShow: false, //没有数据的提示是否显示
				loadingType: 0, //0加载前，1加载中，2没有更多了
			}
		},
		computed: {
			tabStyle() {
				return (750 / this.tabList.length) * this.tabIndex + (750 / this.tabList.length - 50) / 2;
			}
		},
		onLoad() {
			this.getReplyList()
		},
		methods: {
			tolick(url){
				uni.navigateTo({
					url:url
				})
			},
			cliTab(index) {
				this.Type = index;
				this.tabIndex = index;
				this.getReplyList()
			},
			// 我/他人的评论回复
			getReplyList(){
				post('Find/UserReplyList',{
					UserId : uni.getStorageSync('userId'),
					Token : uni.getStorageSync('token'),
					Page : this.Page,
					PageSize : this.PageSize,
					Type :this.Type,    //0-我的回复 1-回复我的
				}).then( res=> {
					if(res.code === 0){
						if (res.data.length > 0) {
							this.noDataIsShow = false;
						}
						if (res.data.length === 0 && this.Page === 1) {
							this.noDataIsShow = true;
						}
						if (this.Page === 1) {
							this.replyList = res.data;
						}
						if (this.Page > 1) {
							this.replyList = this.replyList.concat(res.data);
						}
						if (res.data.length < this.PageSize) {
							this.isLoad = false;
							this.loadingType = 2;
						} else {
							this.isLoad = true;
							this.loadingType = 0;
						}
					}
				})
			}
		},
		// 上拉加载
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.Page++;
				this.getReplyList()
			} else {
				this.loadingType = 2;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.seereply{
		.tab{
		  height: 92upx;
		  background-color: #fff;
		  position: relative;
		  .active{
		    color: #5CC69A;
		  }
		  span{
		    position: absolute;
		    bottom: 0;
		    transition: all .2s;
		    height: 5upx;
		    width: 50upx;
		    background-color: #5CC69A;
		  }
		}
		.flex{
			display: flex;
			.flex1{
				flex: 1;
				overflow: hidden;
			}
			.flexc{
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.activered{
				width:10upx;
				height:10upx;
				background:rgba(255,51,51,1);
				border-radius:50%;
				position: absolute;
				right: 16%;
				top: 35%;
			}
		}
		.focus{
			background: #fff;
			margin-top: 30upx;
			.focusleft{
				padding: 30upx 30upx 0;
				display: flex;
				border-bottom: 1upx solid #ECECEC;
				.forcusimg{
					height:88upx;
					border-radius:50%;
					padding-right:30upx;
					image{
						width:88upx;
						height:88upx;
						border-radius: 50%;
					}
				}
				.focuscenter{
					display: flex;
					justify-content: space-between;
					width: 100%;
					padding-bottom: 20upx;
					.focusbox{
						font-size:28upx;
						.focusname{
							font-weight:bold;
							position: relative;
							span{
								width:10upx;
								height:10upx;
								background:rgba(255,51,51,1);
								border-radius:50%;
								position: absolute;
								right: 50%;
								top: 22%;
							}
						}
						.focusfz22{
							font-size:22upx;
							color:rgba(153,153,153,1);
							line-height: 22upx;
						}
						.focusfz28{
							color:rgba(72,72,72,1);
							line-height: 40upx;
							padding: 10upx 0;
						}
						.focusfz24{
							font-size:24upx;
							color:rgba(153,153,153,1);
						}
					}
					.focusright{
						padding-left: 50upx;
						image{
							width:168upx;
							height:168upx;
							border-radius:10upx;
						}
					}
				}
				&:last-child{
					border-bottom:none;
				}
			}
		}
	}
</style>
