<template>
	<!--发布 -> 所在位置 -->
	<view class="location">
		<view class="seek">
			<input type="text" value="" placeholder="搜索附近的位置"/>
		</view>
		<view class="mark">
			<image src="../../../static/icons/no-location.png" mode=""></image>
			<view class="">不显示位置</view>
		</view>
		<view class="mark">
			<image class="mark-img" src="../../../static/icons/location.png" mode=""></image>
			<view class="">
				<view class="">深圳市</view>
				<view class="address">广东省深圳市福田区福中三路市民中心A区</view>
			</view>
		</view>
		<view class="mark">
			<image class="mark-img" src="../../../static/icons/location.png" mode=""></image>
			<view class="">
				<view class="">展滔科技大厦</view>
				<view class="address">广东省深圳市龙华区民治大道1079号A区</view>
			</view>
		</view>
		<view class="mark">
			<image class="mark-img" src="../../../static/icons/location.png" mode=""></image>
			<view class="">
				<view class="">998美食园</view>
				<view class="address">广东省深圳市福田区福中三路市民中心A区</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.location{
		background: #fff;
		height: 100vh;
		padding-top: 20upx;
		padding: 0 30upx;
		color:rgba(33,33,33,1);
		font-size:28upx;
		.seek{
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
		}
		.mark{
			font-size:28upx;
			display: flex;
			padding: 30upx 0;
			border-bottom: 1upx solid #ECECEC;
			image{
				width:31upx;
				height:35upx;
				margin: 10upx 30upx 0 0;
			}
			.mark-img{
				width:25upx;
				height:35upx;
				margin: 40upx 30upx 0 0;
			}
			.address{
				color:rgba(153,153,153,1);
				font-size:24upx;
			}
		}
	}
	
</style>
