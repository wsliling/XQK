<template>
	<view>
		<map v-if="map.hasMarkers" style="width:100%;height:100vh;" :latitude="map.Lat" :longitude="map.Lng" :markers="map.markers"
		 :enable-scroll="1" show-location></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				map: {
					lat: 0,
					lng: 0,
					// scale: 0, // 默认值16，缩放级别，取值范围为3-20，指开始进入的时候缩放等级
					markers: [],
					hasMarkers: false //解决方案
				}
			}
		},
		onLoad(options) {
			this.map.Lat = options.Lat
			this.map.Lng = options.Lng
			// 地图标记
			this.map.markers = [{
				iconPath: "http://xqk.wtvxin.com/images/wxapp/icons/house.png",
				latitude: options.Lat,
				longitude: options.Lng,
				width: 50,
				height: 50,
				anchor: {
					x: .5,
					y: .5
				}
			}]
			this.map.hasMarkers = true
			// console.log('我是地图页面被传递的参数:',options,this.map)
		},
		methods: {

		}
	}
</script>

<style>

</style>
