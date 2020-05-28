<template>
	<view class="content uni-bg-white">
		<!-- #ifdef MP -->
		<view class="scan uni-icon uni-icon-scan" @click="scan"></view>
		<!-- #endif -->
		<!--轮播图-->
		<view class="index_swiper">
			<swiper class="swiper" :indicator-dots="false" autoplay :interval="5000" :duration="500" @change="changeSwiper">
				<swiper-item v-for="(item,index) in 3" :key="index">
					<view class="swiper-item">
						<image class="img" src="/static/of/banner.jpg" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="dots">
				<view v-for="(item,index) in 3" :key="index" :class="['dot',currentSwiper==index?'active':'']"></view>
			</view>
		</view>
		<view class="searchXQ uni-bg-white uni-mb10">
			<view class="item item-start flex-center-between" @click="navigate('location/cityList')">
				<view class="item-l location-name">
					{{cityName}}
				</view>
				<view class="item-r flex-column-center" @click.stop="getPosition">
					<view class="iconfont icon-dingwei"></view>
					<view class="fz12 c_999" >当前定位</view>
				</view>
			</view>
			<view class="item item-end flex-center-between" @click="onClassify">
				<view class="item-l uni-ellipsis c_999">
					{{classifyDefault}}
				</view>
				<view class="iconfont icon-arrow_down-copy"></view>
			</view>
			<!-- <calendar @change="change" :startDate="initStartDate" :endDate="initEndDate" :daysCount="daysCount"></calendar> -->
			<date-picker ref="datePicker" @change="changeDatePicker" :option="option"></date-picker>
			<view class="order-time flex-center-between" @click="$refs.datePicker.open()">
					<view class="flex-column-center">
						<text class="mintxt">入住</text>
						<text class="date-wrappper">{{option.currentRangeStartDate}}</text>
						<!-- <text class="goInHotel2">今天</text> -->
					</view>
					<text class="sumCount">共{{option.dateNum}}晚</text>
					<view class="flex-column-center">
						<text class="mintxt">离店</text>
						<text class="date-wrappper">{{option.currentRangeEndDate}}</text>
						<!-- <text class="goInHotel2">明天</text> -->
					</view>
					<view class="flex-column-center" @click.stop="showNumlayer = true">
						<text class="mintxt">人数</text>
						<text class="date-wrappper">{{nowNum}}人</text>
					</view>
			</view>
			<view class="number-layer" v-if="showNumlayer">
				<view class="layer-white-space" @tap="showNumlayer = false"></view>
				<view class="layer-content-number p30">
					<view class="h4">
						修改入住人数
					</view>
					<view class="numbox">
						<input type="number" v-model="inputNum" />
					</view>
					<view class="btns flex-center-between">
						<view class="btn btn_1 c_999" @click="showNumlayer = false">取消</view>
						<view class="btn btn_2" @click="numConfirm">确定</view>	
					</view>
				</view>
			</view>
			<view class="btn" @click="navigate('home/search')">
				搜索星球客
			</view>
		</view>
		<!-- 了解星球客 -->
		<view class="ljXQ pd15 uni-mb10">
			<view class="index_hd uni-mb10">
				<view class="flex-center-between">
					<view class="title">
						了解星球客
					</view>
					<view class="more flex-end" @click="navigate('home/introduction')">
						查看详情<text class="iconfont icon-you"></text>
					</view>
				</view>
				<view class="sutitle">
					全景智慧空间，开启您的非凡体验
				</view>
			</view>
			<view class="bd">
				<image class="xqbg" src="/static/of/1.jpg" mode="widthFix"></image>
				<image class="logo" src="/static/logo.png" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 热门推荐 -->
		<view class="hotrecomXQ pd15 uni-mb10">
			<view class="index_hd uni-mb10">
				<view class="flex-between">
					<view class="title">
						热门推荐
					</view>
				</view>
			</view>
			<product-item v-for="(item,index) in 4" :key="index" :item="item"></product-item>
			<view class="btn_line" @click="navigate('home/recommend')">
				查看更多推荐
			</view>
		</view>
		<!-- 服务保障 -->
		<view class="serveXQ pd15 uni-mb10">
			<image src="/static/of/2.jpg" mode="widthFix"></image>
		</view>
		<!-- 推荐星语 -->
		<view class="recomXQ pd15 uni-mb10">
			<view class="index_hd uni-mb10">
				<view class="flex-between">
					<view class="title">
						推荐星语
					</view>
				</view>
			</view>
			<view class="bd" style="margin-right: -20upx;">
				<view class="xylist">
					<view class="item" v-for="(item,index) in 4" :key="index">
						<view class="itembox">
							<view class="imgbox">
								<view class="like flex-end">
									<view class="iconfont icon-aixin bg">
										<view class="iconfont icon-aixin active"></view>
									</view>
									<text class="num">209</text>
								</view>
								<image src="/static/of/p1.jpg" mode="aspectFill"></image>
							</view>
							<view class="txtbox">
								<view class="title uni-ellipsis2 uni-mb5">
									旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~
								</view>
								<view class="flex-between">
									<view class="tx flex-start">
										<image src="/static/logo.png" mode="aspectFill"></image>
										<text>小星君</text>
									</view>
									<view class="zan flex-end">
										<text class="iconfont icon-zan"></text>
										<text class="num">30</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="btn_line uni-mb10">
				查看更多星语
			</view>
		</view>
		<!-- 景点选择 -->
		<wpicker
			mode="selector"
			:level="1" 
			:defaultVal="classifyDefault"
			@confirm="pickerclassOk"
			ref="selector"
			:options="classifyList"
			themeColor="#5cc69a"
			>
		</wpicker>
		<!--优惠弹窗-->
		<view class="popCoupon" v-if="showCoupon">
			<view class="mask"></view>
			<view class="popContent">
				<image class="bgimg" src="/static/popCouponbg.png" mode="widthFix"></image>
				<view class="couponlist">
					<view class="item flex" v-for="(item,index) in 3" :key="index">
						<view class="left flex-column">
							<view class="money flex-center">
								<text class="num">10</text>元
							</view>
						</view>
						<view class="right flex-between">
							<view>
								<view class="title">满300可用</view>
								<view class="desc">全场通用</view>
							</view>
							<view class="btn_re">
								立即领取
							</view>
						</view>
					</view>
					<view class="getAll">
						<image src="/static/rec_btn.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="close iconfont icon-guanbi" @click="hideCoupon"></view>
			</view>
		</view>
		<view style="height: 120upx;"></view>
		<tabbar :current="0"></tabbar>
	</view>
</template>

<script>
	import {post,get,navigate,judgeLogin} from '@/utils';
	import tabbar from '@/components/tabbar.vue';
	import datePicker from '@/components/good-date-picker/good-date-picker';
	import {hasPosition} from '@/utils/location';
	// #ifdef H5
	import {MP} from '@/common/map.js';//h5百度定位
	// #endif
	import wpicker from "@/components/w-picker/w-picker.vue";
	import { mapState, mapMutations } from "vuex"; //vuex辅助函数
	import productItem from '@/components/productItem.vue';
	export default {
		data() {
			return {
				navigate,
				userId: "",
				token: "",
				currentSwiper :0,
				showCaledar: false,
				dateStr: '',
				daysCount: 130,
				singleDate: true,
				
				//初始日期
				initStartDate: '2019-12-06',
				initEndDate: '2019-12-07',
				showCoupon:false,
				nowCity:"",//当前城市
				upCityName:'',//可改变的cityname
				AreaCode:"",//区域国家码
				AreaType:0,//1不限市，区
				classifyDefault:'深圳华侨城5A级景区',
				classifyList:[
						{
							label:"深圳华侨城5A级景区",
							value:"1",
						},
						{
							label:"深圳华小梅沙度假区",
							value:"2",
						},
						{
							label:"深圳华梧桐山景区",
							value:"3",
						}
					],
				//弹窗-区间模式配置：
				option:{
					currentRangeStartDate: '2019-12-07', //根默认显示初始时间，可为空,默认今天
					currentRangeEndDate: '2019-12-08', //根默认区间选择显示结束时间，可为空，默认明天
					initStartDate: '2019-12-07', //可选起始时间限制，可为空,默认今天
					initEndDate: '2020-06-08', //可选结束时间限制，可为空,默认4个月后
					isRange: true, //是否开启范围选择，必填
					isModal:true,
					dateNum:1,
				},
				showNumlayer:false,//人数弹窗
				inputNum:1,
				nowNum:1,
			}
		},
		components: {
			tabbar,
			datePicker,
			wpicker,productItem
		},
		computed:{
			...mapState(['lng','lat','cityName','cityCode'])
		},
		onLoad() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow(){
			this.getAreaCode();
			console.log(this.cityName,'更新的定位')
		},
		onBackPress() {
			if (this.showCaledar !== false) {
				this.showCaledar = false;
				return true;
			}
		},
		methods: {
			...mapMutations(['update']),
			getData(){
				
			},
			// 获取定位
			getPosition(){
				hasPosition().then(res=>{
					this.update({
						lat: res.lat,
						lng: res.lng,
						cityName:res.address_component.city
					});
					this.nowCity = this.cityName;
					console.log(this.lat,this.lng,this.cityName,'lacation')
				}).catch(err=>{
					this.update({
						cityName:err
					});
				});
			},
			scan() {
				uni.scanCode({
					success:function(res){
						console.log(JSON.stringify(res));
					}
				});
			},
			//跳转
			tolink(Url,islogin) {
				if(islogin=="login"){
					if(judgeLogin()){
						uni.navigateTo({
							url: Url
						})
					}
				}else{
					uni.navigateTo({
						url: Url
					})
				}
			},
			changeSwiper(e){
				this.currentSwiper=e.detail.current;
			},
			// 更改日历
			changeDatePicker(e) {
				console.log(e)
				this.option.currentRangeStartDate = e.startDate;
				this.option.currentRangeEndDate = e.endDate;
				this.option.dateNum = e.dateNum;
			},
			// 修改当前人数
			numConfirm(){
				this.nowNum = this.inputNum;
				this.showNumlayer = false;
			},
			hideCoupon(){
				this.showCoupon=false;
			},
			async getAreaCode() {
				if(this.cityName === this.upCityName)return;
				this.upCityName = this.cityName;
				const name = this.cityName;
				if(name&&name!='全国'){
					let result = await post("Area/GetCityCode", {
						Name:name
					});
					if (result.code === 0) {
						this.AreaCode = result.data.Code;
						this.AreaType = 1;
					}
				}else if(name=='全国'){
					this.AreaCode = "";
					this.AreaType = 0;
				}else{
					this.AreaCode = "";
					this.AreaType = 0;
				}
				uni.setStorageSync('AreaCode',this.AreaCode);
			},
			// 选择分类
			onClassify(){
				this.$refs['selector'].show();
			},
			pickerclassOk(e){
				this.classifyDefault=e.result;
			},
		},
		// #ifndef MP
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				uni.showToast({
					title: "点击了扫描",
					icon: "none",
					duration: 2000
				});
			}
		}
		// #endif
	}
</script>

<style lang="scss" scoped>
	@import './style';
</style>
