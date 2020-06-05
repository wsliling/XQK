<template>
	<view class="content uni-bg-white">
		<!-- #ifdef MP -->
		<view class="scan uni-icon uni-icon-scan" @click="scan"></view>
		<!-- #endif -->
		<!--轮播图-->
		<view class="index_swiper">
			<swiper class="swiper" :indicator-dots="false" autoplay :interval="5000" :duration="500" @change="changeSwiper">
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<view class="swiper-item">
						<image class="img" :src="item.Pic" mode="aspectFill" @click="updateBannerHits(index)"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="dots">
				<view v-for="(item,index) in bannerList" :key="index" :class="['dot',currentSwiper==index?'active':'']"></view>
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
			<date-picker ref="datePicker" @change="changeDatePicker" :option="calendarOption"></date-picker>
			<view class="order-time flex-center-between" @click="$refs.datePicker.open()">
					<view class="flex-column-center">
						<text class="mintxt">入住</text>
						<text class="date-wrappper">{{calendarOption.startDate}}</text>
						<!-- <text class="goInHotel2">今天</text> -->
					</view>
					<text class="sumCount">共{{calendarOption.dateNum}}晚</text>
					<view class="flex-column-center">
						<text class="mintxt">离店</text>
						<text class="date-wrappper">{{calendarOption.endDate}}</text>
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
		<view class="ljXQ pd15 uni-mb10" v-if="about.Title">
			<view class="index_hd uni-mb10">
				<view class="flex-center-between">
					<view class="title">{{about.Title}}</view>
					<view class="more flex-end" @click="navigate('home/introduction',{title:about.Title})">
						查看详情<text class="iconfont icon-you"></text>
					</view>
				</view>
				<view class="sutitle">{{about.SubTitle}}</view>
			</view>
			<view class="bd">
				<image class="xqbg" :src="about.Logo" mode="widthFix"  @click="navigate('home/introduction',{title:about.Title})"></image>
				<!-- <image class="logo" src="http://xqk.wtvxin.com/images/wxapp/logo.png" mode="aspectFill"></image> -->
			</view>
		</view>
		<!-- 热门推荐 -->
		<view class="hotrecomXQ pd15 uni-mb10" v-if="hotRecommendList.length">
			<view class="index_hd uni-mb10">
				<view class="flex-between">
					<view class="title">
						热门推荐
					</view>
				</view>
			</view>
			<product-item v-for="(item,index) in hotRecommendList" :key="index" :item="item"></product-item>
			<view class="btn_line" @click="navigate('home/recommend')">
				查看更多推荐
			</view>
		</view>
		<!-- 服务保障 -->
		<view class="serveXQ pd15 uni-mb10">
			<!-- <image  @click="navigate('tabBar/my/security')" src="http://xqk.wtvxin.com/images/wxapp/of/2.jpg" mode="widthFix"></image> -->
			<image  @click="navigate('tabBar/my/security')" :src="securityContent.Logo" mode="widthFix"></image>
			<view class="btn_line" @click="navigate('tabBar/my/security')">
				{{ securityContent.Title }}
			</view>
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
			<view class="bd">
				<view class="xylist flex-center-between">
					<star-lang-item v-for="(item,index) in findList" :key="index" :item="item" @onCollect="onCollect" @onLike="onLike"></star-lang-item>
				</view>
			</view>
			<view class="btn_line uni-mb10" @click="switchTab('tabBar/starLang/starLang')">
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
				<image class="bgimg" src="http://xqk.wtvxin.com/images/wxapp/popCouponbg.png" mode="widthFix"></image>
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
						<image src="http://xqk.wtvxin.com/images/wxapp/rec_btn.png" mode="widthFix"></image>
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
	import {post,get,navigate,switchTab,judgeLogin} from '@/utils';
	import tabbar from '@/components/tabbar.vue';
	import datePicker from '@/components/date-picker/date-picker.vue';
	import {hasPosition,getCityCode} from '@/utils/location';
	// #ifdef H5
	// import {MP} from '@/common/map.js';//h5百度定位
	// #endif
	import wpicker from "@/components/w-picker/w-picker.vue";
	import { mapState, mapMutations } from "vuex"; //vuex辅助函数
	import productItem from '@/components/productItem.vue';
	import starLangItem from '@/components/starLangItem.vue';
	export default {
		data() {
			return {
				navigate,
				switchTab,
				userId: "",
				token: "",
				currentSwiper :0,
				showCaledar: false,
				dateStr: '',
				daysCount: 130,
				singleDate: true,
				
				nowCityName:'',//现在的国家
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
				// 轮播图
				bannerList: [],
				// 热门推荐
				hotRecommendList: [],
				// 了解星球客
				about:{},
				showNumlayer:false,//人数弹窗
				inputNum:1,
				nowNum:1,
				securityContent: "",
				findList:[] // 发现列表
			}
		},
		components: {
			tabbar,
			datePicker,
			wpicker,productItem,starLangItem
		},
		computed:{
			...mapState(['lng','lat','cityName','cityCode','calendarOption'])
		},
		onLoad() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.getBanner();
			this.getAbout();
			this.getHotGoodsList();
			this.getPosition();
			this.getSecurity();
			this.getFindList()
			this.initCalendarOption();// 初始化日历
		},
		onShow(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			if(this.nowCityName !== this.cityName){
				console.log(this.cityName,'更新的定位')
				this.upDateCityCode(this.cityName)
				this.nowCityName = this.cityName;
			}
		},
		onBackPress() {
			if (this.showCaledar !== false) {
				this.showCaledar = false;
				return true;
			}
		},
		methods: {
			// 安全保障
			async getSecurity (){
				let titleContent = await post("/About/AboutUs",{Id:2,type:0});
				this.securityContent = titleContent.data
				console.log("this.securityContent--",this.securityContent)
			},
			...mapMutations(['update']),
			// 获取定位,在所有首次会打开的页面执行，获取定位和code
			async getPosition(){
				try{
					const res = await hasPosition();
					const city = res.address_component;
					this.upDateCityCode(city.city);
					this.nowCityName = city.city;
					this.update({
						lat: res.lat,
						lng: res.lng,
						cityName:city.city
					});
				}catch(err){
					this.update({
						cityName:'定位失败'
					});
					this.getData();
				};
			},
			// 更新城市代码
			async upDateCityCode(cityName){
				try{
					const codeData = await getCityCode(cityName);
					this.update({
						cityCode:codeData.data.Code
					});
					this.getData();
				}catch(err){
					this.getData();
				};
			},
			// 定位完成后执行的方法
			async getData(){
			},
			// 轮播图请求
			async getBanner(){
				let bannerRes = await post("Banner/BannerList")
				this.bannerList = bannerRes.data
				// console.log("我是轮播图", this.bannerList)
			},
			async getHotGoodsList () {
				// 热门推荐
				const res = await post("Goods/GoodsList_yd",{
					// AreaCode:this.cityCode||'',
					// Lat:this.lat||0,
					// Lng:this.lng||0,
					UserId:this.userId,
					Token:this.token,
					Page:1,
					PageSize:12,
					IsRecommend:1,
				}) 
				this.hotRecommendList = res.data 
			},
			getAbout(){
				post('About/AboutUs',{
					id:1,
					type:0
				}).then(res=>{
					this.about = res.data;
				})
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
				// 每次选择日历的更改
				let calendarOption = this.calendarOption;
				calendarOption.currentRangeStartDate = e.startDate;
				calendarOption.currentRangeEndDate = e.endDate;
				calendarOption.dateNum = e.dateNum;
				calendarOption.startDate = e.startDate.substring(e.startDate.indexOf('-')+1);
				calendarOption.endDate = e.endDate.substring(e.endDate.indexOf('-')+1);
				this.update({
					calendarOption:calendarOption
				})
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
			// 更新广告图点击量
			async updateBannerHits(index) {
				let res = post("/Banner/BannerHits",{id:this.bannerList[index].Id}) 
				// console.log("广告图结果：",res)
			},
			// 星语
			async getFindList() {
				let res = await post('Find/FindList',{
					myType:2,
					UserId: this.userId,
					Token: this.token,
					})
				console.log('用户发现list：',res)
				this.findList = res.data
			},
			// 点击了星语收藏
			async onCollect(item){
				this.findList.map(async(tem)=>{
					if(tem.Id===item.Id){
						tem.CollectNum = item.CollectNum;
						tem.CollectionId = item.CollectionId;
					}
				})

			},
			// 点击了星语点赞
			async onLike(item){
				this.findList.map(async(tem)=>{
					if(tem.Id===item.Id){
						tem.IsLike = item.IsLike;
						tem.LikeNum = item.LikeNum;
					}
				})
			}
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
		},
		// #endif
		
	}
</script>

<style lang="scss" scoped>
	@import './style';
</style>
