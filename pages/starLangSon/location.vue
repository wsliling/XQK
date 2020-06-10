<template>
	<!--发布 -> 所在位置 -->
	<view class="location">
		<view class="seek">
			<input @confirm="confirm" v-model="keyword" type="text" placeholder="搜索附近的位置" />
		</view>
		<view class="mark" @click="choicePlace(0)">
			<image src="http://xqk.wtvxin.com/images/wxapp/icons/no-location.png" mode=""></image>
			<view class="">不显示位置</view>
		</view>
		<view class="mark" @click="choicePlace(1)">
			<image src="http://xqk.wtvxin.com/images/wxapp/icons/location.png" mode=""></image>
			<view class="">我的位置</view>
		</view>
		<view @click="choicePlace(item)" class="mark" v-for="(item,index) in placeList" :key="index">
			<image class="mark-img" :src="item.imgUrl" mode=""></image>
			<view class="">
				<view class="">{{ item.placeName }}</view>
				<view class="address">{{ item.address }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import { hasPosition,getMyPosition } from '@/utils/location.js';
	import {
		navigateBack,
		get
	} from '@/utils/index.js'
	import QQMapWX from "@/utils/qqmap-wx-jssdk"; //腾讯地图，reverseGeocoder逆地址转码
	let qqmapsdk = new QQMapWX({
		key: "LJTBZ-A5SWU-ZDGVJ-2OV5E-SOKAJ-HIBQI" // 必填
	});
	export default {
		data() {
			return {
				keyword: '',
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
		methods: {
			choicePlace(parameter) {
				if (parameter === 0) {
					this.$store.commit('update', {
						"place": "不显示位置"
					})
				} else if (parameter === 1) {
					this.getMyLocation()
					// this.$store.commit('update', {
					// 	"place": this.$store.state.cityName
					// })
				} else {
					this.$store.commit('update', {
						"place": parameter.placeName
					})
				}
				console.log(this.$store.state.place)
				navigateBack(100)
			},
			confirm() {
				// qqmapsdk.search({keyword:this.keyword});
				this.getCircum(true)
			},
			getMyLocation() {
				let {
					lng,
					lat
				} = this.$store.state
				var _this = this;
				qqmapsdk.reverseGeocoder({
					//位置坐标，默认获取当前位置，非必须参数

				   location: {
				     latitude: lat,
				     longitude: lng
				   },
					success: function(res) { //成功后的回调
						console.log('我是我的位置：',res);
						var res = res.result;
						var mks = [];
						// this.$store.address = res.address
						_this.$store.commit('update', {
							"place": res.address
						})
						console.log('我是点了我的位置的vuex:',_this.$store.state)
					},
					fail: function(error) {
						console.error(error);
					},
					complete: function(res) {
						console.log(res);
					}
				})
			},
			getLocation() {
				// let {
				// 	lng,
				// 	lat
				// } = this.$store.state
				// let res = await get(`https://apis.map.qq.com/ws/geocoder/v1/?location=${lat},${lng}&key=LJTBZ-A5SWU-ZDGVJ-2OV5E-SOKAJ-HIBQI&get_poi=1`)
				// console.log('我的周边啊：',res)
				// 逆地址解析
				let {
					lng,
					lat
				} = this.$store.state
				var _this = this;
				qqmapsdk.reverseGeocoder({
					//位置坐标，默认获取当前位置，非必须参数
					/**
					 * 
					 //Object格式
					  // location: {
					  //   latitude: 39.984060,
					  //   longitude: 116.307520
					  // },
					*/
				   location: {
				     latitude: lat,
				     longitude: lng
				   },
					/**
					 *
					 //String格式
					  location: '39.984060,116.307520',
					*/
					// location: e.detail.value.reverseGeo || '', //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
					get_poi: 1, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
					success: function(res) { //成功后的回调
						console.log(res);
						var res = res.result;
						var mks = [];
						/**
						 *  当get_poi为1时，检索当前位置或者location周边poi数据并在地图显示，可根据需求是否使用
						 *
						    for (var i = 0; i < result.pois.length; i++) {
						    mks.push({ // 获取返回结果，放到mks数组中
						        title: result.pois[i].title,
						        id: result.pois[i].id,
						        latitude: result.pois[i].location.lat,
						        longitude: result.pois[i].location.lng,
						        iconPath: './resources/placeholder.png', //图标路径
						        width: 20,
						        height: 20
						    })
						    }
						*
						**/
						//当get_poi为0时或者为不填默认值时，检索目标位置，按需使用
						for (var i = 0; i < res.pois.length; i++) {
							mks.push({
								placeName: res.pois[i].title,
								address: res.pois[i].address,
								imgUrl: 'http://xqk.wtvxin.com/images/wxapp/icons/location.png'
							})
						}
						// mks.push({ // 获取返回结果，放到mks数组中
						// 	placeName: res.data[i].title,
						// 	address: res.data[i].address,
						// 	imgUrl: 'http://xqk.wtvxin.com/images/wxapp/icons/location.png'
						// 	// title: res.address,
						// 	// id: 0,
						// 	// latitude: res.location.lat,
						// 	// longitude: res.location.lng,
						// 	// iconPath: './resources/placeholder.png', //图标路径
						// 	// width: 20,
						// 	// height: 20,
						// 	// callout: { //在markers上展示地址名称，根据需求是否需要
						// 	// 	content: res.address,
						// 	// 	color: '#000',
						// 	// 	display: 'ALWAYS'
						// 	// }
						// });
						// _this.setData({ //设置markers属性和地图位置poi，将结果在地图展示
						// 	markers: mks,
						// 	poi: {
						// 		latitude: res.location.lat,
						// 		longitude: res.location.lng
						// 	}
						// });
						_this.placeList = mks
						console.log('我是开始周边地址列表', _this.placeList,mks)
					},
					fail: function(error) {
						console.error(error);
					},
					complete: function(res) {
						console.log(res);
					}
				})
			},
			// 获取周边地点
			getCircum(isSearch) {
				let keyword = ''
				let filter = ''
				if (isSearch) {
					// filter = this.filter
					keyword = this.keyword
					if (this.keyword.trim().length === 0) {
						return uni.showToast({
							title: '搜索不能为空！',
							icon: "none"
						})
					}
					let _this = this
					let {
						lng,
						lat
					} = this.$store.state
					console.log(lng, lat)
					// 调用接口
					qqmapsdk.search({
						keyword: keyword, //搜索关键词
						location: {
							latitude: lat,
							longitude: lng
						},
						//设置周边搜索中心点
						// 'category=景点'
						boundary: 'nearby(' + lat + ', ' + lng + ', 1000)',
						// filter:this.filter,
						success: function(res) { //搜索成功后的回调
							console.log('成功！', res)
							var mks = []
							for (var i = 0; i < res.data.length; i++) {
								mks.push({
									placeName: res.data[i].title,
									address: res.data[i].address,
									imgUrl: 'http://xqk.wtvxin.com/images/wxapp/icons/location.png'
								})
							}
							_this.placeList = mks
							console.log('我是地址列表', _this.placeList)
						},
						fail: function(res) {
							console.log(res);
						},
						complete: function(res) {
							console.log(res);
						}
					});
				} else {
					keyword = this.$store.state.cityName
					this.getLocation()
				}

			}
		},
		onLoad() {
			console.log('位置页面：', this.$store.state)
			// this.getMyPosition()
			this.getCircum(false)
		}
	}
</script>

<style scoped lang="scss">
	.location {
		background: #fff;
		height: 100vh;
		padding-top: 20upx;
		padding: 0 30upx;
		color: rgba(33, 33, 33, 1);
		font-size: 28upx;

		.seek {
			padding: 30upx 0;

			input {
				font-size: 24upx;
				height: 64upx;
				line-height: 64upx;
				width: 90%;
				background: rgba(242, 242, 242, 1);
				border-radius: 32upx;
				margin-left: 4%;
				padding-left: 30upx;
			}
		}

		.mark {
			font-size: 28upx;
			display: flex;
			padding: 30upx 0;
			border-bottom: 1upx solid #ECECEC;

			image {
				width: 31upx;
				height: 35upx;
				margin: 10upx 30upx 0 0;
			}

			.mark-img {
				width: 25upx;
				height: 35upx;
				margin: 40upx 30upx 0 0;
			}

			.address {
				color: rgba(153, 153, 153, 1);
				font-size: 24upx;
			}
		}
	}
</style>
