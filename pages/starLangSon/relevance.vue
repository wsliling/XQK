<template>
	<!-- 发布 -> 关联星球客 -->
	<view class="relevance">
		<view class="seek">
			<input type="text" value="" placeholder="搜索星球客" />
			<span class="close" @click="delImg(pindex)">×</span>
		</view>
		<view class="releva">
			<view class="record">最近记录</view>
			<view class="collect-box" v-for="(val,index) in 3" :key="index">
				<view class="collect-left"><image src="../../../static/of/p1.jpg" mode=""></image></view>
				<view class="collect-right">
					<view class="name">广州.从化温泉明月山溪</view>
					<view class="point">
						<view class="pointkey">骑行</view>
						<view class="pointkey">游乐</view>
						<view class="pointkey">艺术</view>
					</view>
					<view class="font">
						<view class="num">￥288</view>
						<view class="iconfont icon-collect"><view class="fz12">4.8<span>(20)</span></view></view>
						<view class="add">添加</view>
					</view>
				</view>
			</view>
		</view>
		<view class="anonymous" v-if="false">
			<view class="anonyimg">
				<image src="../../../static/of/p5.png" mode=""></image>
			</view>
			<view>暂无记录，可搜索其他星球客选择关联</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.relevance{
		color:rgba(33,33,33,1);
		font-size:28upx;
		.seek{
			width: 100%;
			background: #fff;
			padding: 30upx 0;
			input{
				font-size:24upx;
				height:64upx;
				line-height: 64upx;
				width:90%;
				background:rgba(242,242,242,1);
				border-radius:32upx;
				margin-left: 4%;
				padding-left: 30upx;
			}
			.close {
				position: absolute;
				width: 32rpx;
				height: 32rpx;
				right: 0;
				right: 72upx;
				top: 46upx;
				color: #fff;
				background: #b2b2b2;
				border-radius: 50%;
				text-align: center;
				line-height: 32rpx;
				font-size: 32rpx;
			}
		}
		.releva{
			padding: 20upx 30upx;
			.record{
				padding-bottom: 20upx;
			}
			.collect-box {
				display: flex;
				padding: 30upx;
				background: #fff;
				border-radius:8upx;
				margin-bottom: 30upx;
				.item__hd {
					margin-top: 40upx;
				}
				.collect-left {
					width: 200upx;
					height: 150upx;
					border-radius: 8upx;
					padding-right: 20upx;
					image {
						width: 100%;
						height: 100%;
						margin: 0 auto;
						border-radius: 10upx;
					}
				}
				.collect-right {
					color: #333333;
					width: 70%;
					.name {
						font-size: 28upx;
					}
					.point {
						display: flex;
						.pointkey {
							height: 46upx;
							background: rgba(92, 198, 154, 0.08);
							border-radius: 4upx;
							font-size: 22upx;
							color: #5cc69a;
							padding: 0 10upx;
							line-height: 46upx;
							margin-right: 15upx;
						}
					}
					.font {
						display: flex;
						justify-content: space-between;
						padding-top: 12upx;
						.num {
							font-size: 24upx;
							color: rgba(255, 51, 51, 1);
							line-height: 40upx;
						}
						.iconfont {
							color: $primary;
							line-height: 1.2;
							display: flex;
						}
						.fz12 {
							margin-top: 8upx;
							padding-left: 6upx;
							span {
								font-size: 22upx;
								color: rgba(153, 153, 153, 1);
								padding-left: 6upx;
								
							}
						}
						.add{
							width:88upx;
							height:44upx;
							border:1upx solid rgba(255,51,51,1);
							border-radius:22upx;
							font-size:24upx;
							font-family:PingFang;
							font-weight:500;
							color:rgba(255,51,51,1);
							line-height:44upx;
							text-align: center;
						}
					}
				}
			}
		}
		.anonymous{
			background: #fff;
			height: 100vh;
			padding: 50upx 0 0 13%;
			.anonyimg{
				width:526upx;
				image{
					width: 100%;
					margin: 0 auto;
				}
			}
		}
	}
</style>
