<template>
	<view class="content uni-bg-white">
		<!-- #ifdef MP -->
		<view class="scan uni-icon uni-icon-scan" :style="{'top':scanObj.top+'px'}" @click="scan"></view>
		<!-- #endif -->
		<!--轮播图-->
		<view class="index_swiper">
			<swiper v-if="commonSetting.SwitchSeconds" class="swiper" :indicator-dots="false" autoplay :interval="commonSetting.SwitchSeconds * 1000" :duration="500" @change="changeSwiper">
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
					{{classifyDefault.label}}
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
					<!-- <view class="flex-column-center" @click.stop="showNumlayer = true"> -->
					<view class="flex-column-center" @click.stop="toChooseNum">
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
			<view class="btn" @click="searchPro">
				搜索星球客
			</view>
		</view>
		<!-- 了解星球客 -->
		<view class="ljXQ pd15 mg-top20 uni-mb10" v-if="about.Title">
			<view class="index_hd uni-mb10">
				<view class="flex-center-between">
					<view @click="adds" class="title">{{about.Title}}</view>
					<!-- <view :style="'color:' +commonSetting.ThemeColor + ';'" class="more flex-end" @click="navigate('home/introduction',{title:about.Title})">
						查看详情<text :style="'color:' +commonSetting.ThemeColor + ';'" class="iconfont icon-you"></text>
					</view> -->
				</view>
				<view class="sutitle">{{about.SubTitle}}</view>
			</view>
			<view class="bd">
				<image class="xqbg" :src="about.Logo" mode="widthFix"  @click="navigate('home/introduction',{title:about.Title})"></image>
				<!-- <image class="logo" src="http://xqk.wtvxin.com/images/wxapp/logo.png" mode="aspectFill"></image> -->
			</view>
		</view>
		<!-- 热门推荐 -->
		<view class="hotrecomXQ pd15 mg-top20 uni-mb10" v-if="hotRecommendList.length">
			<view class="index_hd uni-mb10">
				<view class="flex-between">
					<view class="title">
						{{ commonSetting.HotRecTitle }}
					</view>
				</view>
			</view>
			<product-item v-for="(item,index) in hotRecommendList" :key="index" :item="item" @onCollect="onProCollect"></product-item>
			<view class="btn_line" @click="navigate('home/recommend')">
				查看更多
			</view>
		</view>
		<!-- 服务保障 -->
		<view class="serveXQ pd15 mg-top20 uni-mb10">
			<!-- <image  @click="navigate('tabBar/my/security')" src="http://xqk.wtvxin.com/images/wxapp/of/2.jpg" mode="widthFix"></image> -->
			<image  @click="navigate('tabBar/my/security')" :src="securityContent.Logo" mode="widthFix"></image>
			<!-- <view class="btn_line" @click="navigate('tabBar/my/security')">
				{{ securityContent.Title }}
			</view> -->
		</view>
		<!-- 推荐星语 -->
		<view class="recomXQ pd15 mg-top20 uni-mb10">
			<view class="index_hd uni-mb10">
				<view class="flex-between">
					<view class="title">
						{{ commonSetting.StarRecTitle }}
					</view>
				</view>
			</view>
			<view class="bd">
				<view class="xylist flex-center-between">
					<star-lang-item v-for="(item,index) in findList" :key="index" :item="item" @onCollect="onCollect" @onLike="onLike"></star-lang-item>
				</view>
			</view>
			<view class="btn_line uni-mb10" @click="switchTab('tabBar/starLang/starLang')">
				查看更多
			</view>
		</view>
		<!-- 景点选择 -->
		<wpicker
			mode="selector"
			:level="1" 
			:defaultVal="classifyDefault.label"
			@confirm="pickerclassOk"
			ref="selector"
			:options="classifyList"
			themeColor="#5cc69a"
			>
		</wpicker>
		<!--优惠弹窗-->
		<view class="popCoupon" v-if="showCoupon&&couponList.length">
			<view class="mask"></view>
			<view class="popContent">
				<image class="bgimg" src="http://xqk.wtvxin.com/images/wxapp/popCouponbg.png"></image>
				<view class="couponlist">
					<view class="item flex-center" v-for="(item,index) in couponList" :key="index">
						<view class="left flex-column">
							<view class="money flex-center-center">
								<text class="num">{{item.Denomination}}</text>元
							</view>
						</view>
						<view class="right flex-center-between">
							<view>
								<view class="title ellipsis">{{item.MeetConditions?`满${item.MeetConditions}可用`:'无限制条件'}}</view>
								<view class="desc ellipsis-col2">{{item.ScopeOfUse}}</view>
							</view>
							<view class="btn_re" @click="receiveCoupon(item.Id)">
								立即领取
							</view>
						</view>
					</view>
					<view class="getAll" @click="receiveCouponAll">
						<image src="http://xqk.wtvxin.com/images/wxapp/rec_btn.png"></image>
					</view>
				</view>
				<view class="close iconfont icon-guanbi" @click="hideCoupon"></view>
			</view>
		</view>
		<view style="height: 120upx;"></view>
			<!-- <start-level style="width: 170rpx; height: 32rpx;" class='canvas' :value="3"></start-level> -->
			<!-- <view @click="dian" class="canvas2">
				点击哥
			</view> -->
			<tabbar :current="0"></tabbar>
	</view>
</template>

<script>
	import {post,get,navigate,switchTab,judgeLogin,toast,throttle} from '@/utils';
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
	import {startLevel} from '@/components/starLevel';
	
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
				scanObj: {},
				top:0,
				
				nowCityName:'',//现在的国家
				classifyDefault:{label:'不限',value:0},
				classifyList:[
						{
							label:"不限",
							value:0,
						},
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
				findList:[], // 发现列表
				showCoupon:false,//领券中心
				couponList:[],//优惠券弹窗
				// myInterval: 0
			}
		},
		components: {
			tabbar,
			datePicker,
			wpicker,productItem,starLangItem,startLevel
		},
		computed:{
			...mapState(['lng','lat','cityName','cityCode','calendarOption','commonSetting']),
		},
		// watch:{
		// 	  '$store.state.commonSetting': {
		// 	    handler(newName, oldName) {
		// 			console.log('$store.state.commonSetting changed:',newName,this.$store.state.commonSetting.SwitchSeconds);
		// 			this.myInterval = newName.SwitchSeconds * 1000
		// 			console.log('我是间隔',this.myInterval)
		// 	    },
		// 	    immediate: true,
		// 	    // deep: true
		// 	  },
			
		// },
		onLoad() {
			this.getScan()
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.getBanner();
			this.getAbout();
			this.getPosition();
			this.getSecurity();
			this.getFindList();
			this.getCoupon();
			// this.initCalendarOption();// 初始化日历
		},
		onShow(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			if(this.nowCityName !== this.cityName){
				console.log(this.cityName,'更新的定位')
				this.upDateCityCode(this.cityName)
				this.nowCityName = this.cityName;
			}
			// 需要更新人数
			this.nowNum = this.$store.state.chooseNum
			this.getHotGoodsList();
		},
		onBackPress() {
			if (this.showCaledar !== false) {
				this.showCaledar = false;
				return true;
			}
		},
		methods: {
			...mapMutations(['update']),
			dian() {
				uni.showToast({
					title:'点我啊',
					icon:'none'
				})
			},
			// // 获取小程序右边菜单栏的宽高以及定位
			getScan (){
				// getSystemInfo,还是下面的好
				let res = uni.getMenuButtonBoundingClientRect()
				this.scanObj = res
				// this.top = this.scanObj.top
				console.log('我是菜单：',res)
			},
			// 安全保障
			async getSecurity (){
				let titleContent = await post("/About/AboutUs",{Id:2,type:0});
				this.securityContent = titleContent.data
				console.log("this.securityContent--",this.securityContent)
			},
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
					this.getOpsitionPro();
				};
			},
			// 更新城市代码
			async upDateCityCode(cityName){
				try{
					const codeData = await getCityCode(cityName);
					this.update({
						cityCode:codeData.data.Code
					});
					this.getOpsitionPro();
				}catch(err){
					this.getOpsitionPro();
				};
			},
			// 定位完成后执行的方法
			//获取根据市区定位的产品
			async getOpsitionPro(){
				
				this.classifyDefault={label:'不限',value:0};
				this.classifyList=[
						{label:"不限",
							value:0,
						}];
				const res = await post("Goods/GoodsList_yd",{
					AreaCode:this.cityCode||'',
					AreaType:1,
					Lat:this.lat||0,
					Lng:this.lng||0,
					UserId:this.userId,
					Token:this.token,
					Page:1,
					PageSize:20,
				}) 
				const data = res.data;
				data.map(item=>{
					this.classifyList.push({
						label:item.Name,
						value:item.Id,
					})
				})
			},
			// 点击搜索星球客
			searchPro(){
				if(this.classifyDefault.value*1){
					navigate('product/detail/detail',{Id: this.classifyDefault.value})
				}else{
					navigate('home/searchList')
				}
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
					PageSize:6,
					IsRecommend:1,
				}) 
				this.hotRecommendList = res.data 
			},
			// 推荐产品点击收藏
			onProCollect(params){
				this.hotRecommendList.map(item=>{
					if(params.Id===item.Id){
						item.CollectionId = params.CollectionId;
						item.CollectNum = params.CollectNum;
					}
				})
			},
			getAbout(){
				post('About/AboutUs',{
					id:1,
					type:0
				}).then(res=>{
					this.about = res.data;
				})
			},
			// 扫码
			scan() {
				uni.scanCode({
					success:function(res){
						navigate('home/scanResult',{
							result:res.result
						})
						console.log(JSON.stringify(res));
					},
					fail(err){
						toast('扫码失败，请重试！')
						console.log(err)
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
				this.classifyDefault=e.obj;
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
				const data = res.data;
				this.findList = data;
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
			},
			toChooseNum() {
				navigate('tabBar/index/chooseNum')
			},
			async getCoupon(){
				const res = await post('Coupon/CouponCenter',{
					UserId:this.userId,
					Token:this.token,
					Page:1,
					PageSize:3,
					ShopId:0,
					Category:-1
				})
				this.couponList = res.data;
				this.showCoupon = true;
			},
			// 领取优惠券
			async receiveCoupon(id){
				if(!judgeLogin())return;
				throttle(async ()=>{
					const res = await post('Coupon/GetCoupon',{
						UserId:this.userId,
						Token:this.token,
						CouponId:id
					})
					toast('领取成功',{icon:true})
				})
			},
			// 领取全部优惠券
			receiveCouponAll(){
				if(!judgeLogin())return;
				throttle(async ()=>{
					let arr =[];
					this.couponList.map(item=>{
						arr.push(
							post('Coupon/GetCoupon',{
								UserId:this.userId,
								Token:this.token,
								CouponId:item.Id
							})
						)
					})
					Promise.all(arr).then(res=>{
						toast('领取成功',{icon:true})
						this.hideCoupon();
					})
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
		onShareAppMessage(){
			return {
				title: '星球客微服务',
     			 path: '/pages/tabBar/index/index'
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	@import './style';
	// .canvas {
	// 	position: fixed;
	// 	bottom: 85upx;
	// 	left: 0;
	// }
	// .canvas2 {
	// 	position: fixed;
	// 	bottom: 1upx;
	// 	right: 0;
	// }
	// .xingkong-box {
	// 	position: fixed;
	// 	width: 20%;
	// 	height: 120upx;
	// 	left: 50%;
	// 	bottom: 0;
	// 	transform: translateX(-50%);
	// }
	// .xingkong-img {
	// 	position:	absolute;
	// 	left: 50%;
	// 	width: 80upx;
	// 	height: 80upx;
	// 	transform: translateX(-50%);
	// }
</style>
