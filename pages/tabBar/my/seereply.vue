<template>
	<!-- 查看回复 -->
	<view class="seereply">
		<view class="tab flex">
			<view class="flex1 flexc" :class="{ 'active': tabIndex == index }" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{ item }}</view>
			<span :style="'left:'+tabStyle+'rpx'"></span>
			<view class="activered"></view>
		</view>
		<view class="focus">
			<view class="focusleft" v-for="(val,key) in 2" :key="key">
				<view class="forcusimg">
					<image src="http://xqk.wtvxin.com/images/wxapp/default.png" mode=""></image>
				</view>
				<view class="focuscenter">
					<view class="focusbox">
						<view class="focusname">学会笑着面对 <span v-if="key*2 == 0"></span></view>
						<view class="focusfz22">2020-05-14</view>
						<view class="focusfz28">文艺、繁华、却不失自然本质浪漫温暖、又充满人文温情</view>
						<view class="focusfz24">回复了深漂小飞机的星语</view>
					</view>
					<view class="focusright">
						<image src="http://xqk.wtvxin.com/images/wxapp/of/banner.jpg" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tabList: ['我的回复', '回复我的'],
				tabIndex: 0,
			}
		},
		computed: {
			tabStyle() {
				console.log((750 / this.tabList.length) * this.tabIndex + (750 / this.tabList.length - 50) / 2);
				return (750 / this.tabList.length) * this.tabIndex + (750 / this.tabList.length - 50) / 2;
			}
		},
		methods: {
			cliTab(index) {
				this.tabIndex = index;
				// this.couponStatus = index + 1;
				// this.page = 1;
				// this.noDataIsShow = false;
				// this.hasData = false;
				
			},
		},
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
			}
			
			
		}
	}
	
</style>
