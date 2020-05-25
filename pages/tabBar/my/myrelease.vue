<template>
	<!-- 我的发布 -->
	<view class="myrelease">
		<view class="box" v-for="(val,key) in datalist" :key="key">
			<view class="boximg">
				<image :src="val.pic" mode=""></image>
			</view>
			<view class="boxname uni-ellipsis2">{{val.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				datalist:[
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p2.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗窗，这扇窗~',
					},
					{
						pic:'/static/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为这扇窗~',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了',
					},
					{
						pic:'/static/of/banner.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p2.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myrelease{
		background: #fff;
		padding:0 30upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.box{
			width: 48%;
			background:rgba(255,255,255,1);
			box-shadow:1upx 1upx 8upx 0px rgba(0, 0, 0, 0.1);
			border-radius:10upx;
			margin-bottom: 30upx;
			.boximg{
				height: auto;
				image{
					border-radius:10upx 10upx 0 0;
				}
			}
			.boxname{
				padding: 10upx 20upx 20upx 20upx;
				overflow: hidden;
			}
		}
	}
</style>
