<template>
	<!--发布 -> 所在位置 -->
	<view class="location">
		<view class="seek">
			<input @confirm="confirm" v-model="keyword" type="text" placeholder="搜索附近的位置"/>
		</view>
		<view class="mark" @click="choicePlace(0)">
			<image src="http://xqk.wtvxin.com/images/wxapp/icons/no-location.png" mode=""></image>
			<view class="">不显示位置</view>
		</view>
		<view class="mark" @click="choicePlace(1)">
			<image src="http://xqk.wtvxin.com/images/wxapp/icons/location.png" mode=""></image>
			<view class="">我的位置</view>
		</view>
		<view  @click="choicePlace(item)" class="mark" v-for="(item,index) in placeList" :key="index">
			<image class="mark-img" :src="item.imgUrl" mode=""></image>
			<view class="">
				<view class="">{{ item.placeName }}</view>
				<view class="address">{{ item.address }}</view>
			</view>
		</view>
<!-- 		<view class="mark">
			<image class="mark-img" src="http://xqk.wtvxin.com/images/wxapp/icons/location.png" mode=""></image>
			<view class="">
				<view class="">深圳市</view>
				<view class="address">广东省深圳市福田区福中三路市民中心A区</view>
			</view>
		</view>
		<view class="mark">
			<image class="mark-img" src="http://xqk.wtvxin.com/images/wxapp/icons/no-location.png" mode=""></image>
			<view class="">
				<view class="">展滔科技大厦</view>
				<view class="address">广东省深圳市龙华区民治大道1079号A区</view>
			</view>
		</view>
		<view class="mark">
			<image class="mark-img" src="http://xqk.wtvxin.com/images/wxapp/icons/location.png" mode=""></image>
			<view class="">
				<view class="">998美食园</view>
				<view class="address">广东省深圳市福田区福中三路市民中心A区</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	// import { hasPosition,getMyPosition } from '@/utils/location.js';
	import {navigateBack} from '@/utils/index.js'
	import QQMapWX from "@/utils/qqmap-wx-jssdk"; //腾讯地图，reverseGeocoder逆地址转码
	let qqmapsdk = new QQMapWX({
	    key: "LJTBZ-A5SWU-ZDGVJ-2OV5E-SOKAJ-HIBQI" // 必填
	});
	export default {
		data() {
			return {
				keyword:'',
				filter: 'category=景点', //分类
				placeList: [
					// {
					// 	placeName: '不显示位置',
					// 	address:'',
					// 	imgUrl: 'http://xqk.wtvxin.com/images/wxapp/icons/no-location.png'
					// }
				]
			}
		},
		methods:{
			choicePlace(parameter) {
				if(parameter === 0) {
					this.$store.commit('update',{"place":"不显示位置"})
				} else if(parameter === 1) {
					this.$store.commit('update',{"place":this.$store.state.cityName})
				} else {
					this.$store.commit('update',{"place":parameter.placeName})
				}
				console.log(this.$store.state.place)
				navigateBack(0)
			},
			confirm() {
				// qqmapsdk.search({keyword:this.keyword});
				this.getCircum(true)
			},
			// 获取周边地点
			getCircum(isSearch) {
					let keyword = ''
					let filter = ''
					if(isSearch){
						filter = this.filter
						keyword = this.keyword
						if(this.keyword.trim().length ===0 ) {
							return uni.showToast({
								title:'搜索不能为空！',
								icon: "none"
							})
						}
					}else {
						keyword = this.$store.state.cityName
					}
				   let _this = this
				   let {lng,lat} = this.$store.state
				   console.log(lng,lat)
				   // 调用接口
				   qqmapsdk.search(
					 {
				      keyword: keyword,  //搜索关键词
					//     location: {
						// 	latitude: lat,
						// 	longitude: lng
						// },  
						//设置周边搜索中心点
						// 'category=景点'
						filter:this.filter,
				      success: function (res) { //搜索成功后的回调
						console.log('成功！',res)
				        var mks = []
						for (var i = 0; i < res.data.length; i++) {
						  mks.push({
							  placeName:res.data[i].title,
							  address:res.data[i].address,
							  imgUrl: 'http://xqk.wtvxin.com/images/wxapp/icons/location.png'
						  })
						}
						_this.placeList = mks
						console.log('我是地址列表',_this.placeList)
				      },
				      fail: function (res) {
				        console.log(res);
				      },
				      complete: function (res){
				        console.log(res);
				      }
				  });
			}
		},
		onLoad() {
			console.log('位置页面：',this.$store.state)
			// this.getMyPosition()
			this.getCircum(false)
		}
	}

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
