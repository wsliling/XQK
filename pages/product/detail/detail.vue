<template>
	<div class="bgfff">
		<!--轮播图-->
		<view class="index_swiper">
			<swiper class="swiper"  autoplay :interval="5000" :duration="500" circular @change="changeSwiper"
			indicator-active-color="#5cc69a">
				<swiper-item @click="previewImages(index)" v-for="(item,index) in details.PicData" :key="index">
					<view class="swiper-item">
						<!-- <image class="img" src="http://xqk.wtvxin.com/images/wxapp/of/banner.jpg" mode="aspectFill"></image> -->
						<image class="img" :src="item.PicUrl" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="dots">
				<block v-for="(item,index) in details.PicData" :key="index" >
					<view :class="['dot',currentSwiper==index?'active':'']"></view>
				</block>
			</view>
		</view>
		<div class="topBlock p30">
			<div class="flex-center-between">
				<!-- <p>江西省 萍乡市</p> -->
				<p>{{ details.AreaSite }}</p>
				<!-- <div class="tab">5A景区</div> -->
				<div class="tab" v-if="details.ShowArea">{{ details.ShowArea }}</div>
			</div>
			<!-- <h2>萍乡武功山风景区星球客生态度假</h2> -->
			<h2>{{ details.Name }}</h2>
			<!-- <p>万亩绿林环绕，原汁原味南加州建筑群 拷贝</p> -->
			<p>{{ details.SubTitle }}</p>
			<div class="priceBox flex-end-between ptb20">
				<div class="flex-end price">
					<!-- <h3>￥288</h3><p>/晚（含2成人）</p> -->
					<h3>{{ details.Price }}</h3><p>{{ details.Unit }}</p>
				</div>
				<div class="flex-center tishi" @click="priceExplainStatus(1)">
					<i class="icon-tishi iconfont"></i>
					<p>价格说明</p>
				</div>
			</div>
			<div class="tabList flex-center">
				<div class="tabItem color3" 
					:class="{'color1':index==1||index===2||index===7||index===8,
					'color2':index===3||index===4||index===9||index===10,
					}" 
					v-for="(item,index) in tagInit" :key="index" >{{ item }}</div>
			</div>
		</div>
		
		<!-- <div class="gap20"></div> -->
		<!-- <div class="dateBox plr30 pb30">
			<h3>入住退房日期</h3>
			<div class="date-time flex-end-between" @click="$refs.datePicker.open()">
				<div class="start">
					<p>入住</p>
					<div class="text">{{calendarOption.currentRangeStartDate}}</div>
				</div>
				<p>- 最少一晚 -</p>
				<div class="end">
					<p>退房</p>
					<div class="text">{{calendarOption.currentRangeEndDate}}</div>
				</div>
			</div>
		</div> -->
		<block v-if="details.RecPicList.length">
			<div class="gap20"></div>
			<div class="scroll-block">
				<!-- <h3>推荐体验</h3> -->
				<h3>{{ details.RecTitle }}</h3>
				<scroll-view scroll-x class="">
					<div class="list flex-center ptb20">
						<div class="item flex-column-center-center" v-for="(item,index) in details.RecPicList" :key="index">
							<!-- <img src="http://xqk.wtvxin.com/images/wxapp/of/detail-icon.png" mode="widthFix" alt=""> -->
							<img :src="item.PicUrl" mode="widthFix" alt="">
							<!-- <h5>云海日出</h5> -->
						</div>
					</div>
				</scroll-view>
			</div>
		</block>
		<block v-if="details.DevPicList.length">
			<div class="gap20"></div>
			<div class="scroll-block">
				<!-- <h3>星球客设施</h3> -->
				<h3>{{ details.DevTitle }}</h3>
				<scroll-view scroll-x class="">
					<div class="list flex-center ptb20">
						<div class="item flex-column-center-center" v-for="(item,index) in details.DevPicList" :key="index">
							<!-- <img src="http://xqk.wtvxin.com/images/wxapp/of/detail-icon.png" mode="widthFix" alt=""> -->
							<img :src="item.PicUrl" mode="widthFix" alt="">
							<!-- <h5>智能温控</h5> -->
						</div>
					</div>
				</scroll-view>
			</div>
		</block>
		<!-- <div class="column-tab flex-start-between plr30 pb20" v-html="details.DevLogo"> -->
		<div class="column-tab flex-start-between plr30 pb20" v-if="details.DevLogo">
			<image :src="details.DevLogo" mode="widthFix"></image>
		</div>
		<block v-if="details.IsVideo">
			<div class="gap20"></div>
			<div class="video plr30 pb30">
				<h3>实时摄像头</h3>
				<div class="videoImg" @click="onOpenVideo">
					<img :src="details.VideoCover" mode="widthFix"  alt="">
					<div class="mask">
						<img src="/static/icons/video.png" alt="">
					</div>
				</div>
			</div>
		</block>
		<div class="gap20"></div>
		<div class="comment pb20">
			<div class="plr30">
				<h3>用户评价</h3>
				<div class="score plr30 ptb20" v-if="OrderCommentInfo.RankScore">
					<div class="top flex-center">
						<div class="score-num bold">
							<!-- 4.9 -->
							{{ OrderCommentInfo.RankScore }}
						</div>
						<div class="right">
							<div class="tab" :class="{'isHidden': isHidden}">超赞</div>
							<div class="starBox flex-center"> 
								<div class="star flex-center">
									<!-- OrderCommentInfo.RankScore -->
									<div class="star-no iconfont icon-collect1" v-for="(item2,index2) in 5" :key="index2"></div>
									<div class="star-active flex-center" :style="{width:(OrderCommentInfo.RankScore/5)*100+'%'}">
										<div class="iconfont icon-collect" v-for="(item,index) in 5" :key="index"></div>
									</div>
									<!-- <start-level :value="OrderCommentInfo.RankScore"></start-level> -->
								</div>
								<div class="comment-num">{{ OrderCommentInfo.CommentNum }}条评价</div>
							</div>
						</div>
					</div>
					<div class="bottom flex-center-between">
						<div class="item flex-center">
							<p>卫生</p>
							<span>{{ OrderCommentInfo.HealthScore }}</span>
						</div>
						<div class="item flex-center">
							<p>体验</p>
							<span>{{ OrderCommentInfo.ProductScore }}</span>
						</div>
						<div class="item flex-center">
							<p>服务</p>
							<span>{{ OrderCommentInfo.ServiceScore }}</span>
						</div>
						<div class="item flex-center">
							<p>设施</p>
							<span>{{ OrderCommentInfo.FacilityScore }}</span>
						</div>
					</div>
				</div>
			</div>
			<commentItem v-for="(item,index) in commentList" :key="index" :comment="item"></commentItem>
			<div v-if="commentList.length" class="more" @click="navigate('product/allComment/allComment',{proId:Id})">阅读{{details.CommentNum }}条评论</div>
		</div>
		<div class="gap20"></div>
		<div class="position ptb30">
			<div class="plr30">
				<h3>星球客位置</h3>
				<!-- <h5 class="flex-center"><i class="iconfont icon-weizhi"></i>武功山风景名胜区麻田办事处大江边村</h5> -->
				<h5 class="flex-center" @click="toMap"><i class="iconfont icon-weizhi"></i>{{ details.Address }}</h5>
			</div>
			<!-- <img src="http://xqk.wtvxin.com/images/wxapp/of/map-img.png" mode="widthFix" alt=""> -->
			<div class="mapBox">
				<map 
				@click="toMap"
				id="myMap" 
				:scale="12"
				style="width: 750upx"
				:latitude="details.Lat"
				:longitude="details.Lng"
				:markers="markers"
				:bindmarkertap='toMap'
				:enable-scroll="0"
				v-if="details.Lat&&details.Lng"
				show-location>
				</map>
				<!-- <cover-view class="cover" @click="openLocation"></cover-view> -->
			</div>
		</div>
		<div class="gap20" v-if="couponList.length"></div>
		<uni-popup type="bottom" ref="couponWin">
			<div class="couponWin">
				<div class="masktitle">优惠券</div>
				<scroll-view scroll-y class="coupon-scroll">
					<div class="maskinfo">
						<div class="maskcouponlist" v-for="(item,couponIndex) in couponList" :key="couponIndex">
							<img src="/static/icons/pinkbg.png" class="pink" mode="widthFix">
							<div class="maskser flex-center-between">
							  <div>
								<p class="maskprice">￥{{item.Denomination}}</p>
								<p class="maskask">{{item.MeetConditions?`满${item.MeetConditions}可用`:'无限制条件'}}</p>
								<p class="maskask">有效期至{{item.EndTime}}</p>
							  </div>
							  <div class="maskget" @click="receiveCoupon(item.Id)">立即领取</div>
							</div>
						 </div>
					</div>
				</scroll-view>
				<div class="btnget" @click="$refs.couponWin.close()">完成</div>
			</div>
		</uni-popup>
		<div class="coupon flex-center-between" v-if="couponList.length" @click="showCouponWin">
			<h3>优惠券</h3>
			<div class="flex-center">
				<!-- <span>￥{{couponList[0].Denomination}}</span> -->
				您有未领取优惠券
				<i class="icon-arrow_r iconfont"></i>
			</div>
		</div>
		<div class="gap20" v-if="proSKUList.length"></div>
		<div class="sku plr30" v-if="proSKUList.length" id="room">
			<h3>星球客房型</h3>
			<div class="list">
				<div class="item ptb30 flex-center-between" v-for="(item,index) in showProSKUList" :key="index">
					<img :src="item.Logo" alt="" mode="aspectFill">
					<div class="content flex-column-start-between">
						<h5>{{item.Name}}</h5>
						<p class="ellipsis-col2">{{item.Intro}}</p>
						<div class="price">￥{{item.Price}}起</div>
					</div>
					<div class="btn" @click="submit(item.Id)">立即预定</div>
				</div>
			</div>
			<div class="more" v-if="proSKUList.length>3" @click="showProSku">
				<block v-if="showProSKUList.length!==proSKUList.length">
					<p>展示全部</p>	
					<i class="icon-shuangjiantouxia iconfont"></i>
				</block>
				<block v-else>
					<p>收起</p>	
					<i class="icon-shuangjiantouxia iconfont rotate"></i>
				</block>
			</div>
		</div>
		<div class="gap20"></div>
		<div class="detail plr30">
			<div class="nav bb1 flex-center">
				<!-- <div class="item avtive">产品亮点</div>
				<div class="item">景区介绍</div> -->
				<div @click="changeTab(index)" v-for="(item,index) in tabList" :key="index" class="item" :class="{avtive : activeIndex === index}">{{ item.title }}</div>
				<!-- <div class="item">景区介绍</div> -->
			</div>
			<div v-html="details[tabList[activeIndex].type]" class="content ptb20">
				<!-- {{ details[tabList[activeIndex]].type] }} -->
				<!-- 从化区位于广州市东北部，珠江三角洲边缘，古属番禺郡，明代建县，已有500多年历史。境内青山、绿水、蓝天等生态自然环境优美，风光 -->
			</div>
		</div>
		<div class="gap20"></div>
		<div class="notice plr30">
			<h3>预定及使用说明</h3>
			<p v-html="details.BookNote"></p>
		</div>
		<!-- <div class="notice plr30">
			<h3>预定须知</h3>
			<div class="tit">用户入住守则</div>
			<p>- 星球客用品及设施为企业财务所有，请妥善并合理使用，如有损坏，照价赔偿。-付费物品使用后将按实际价格扣除用户押金，多退少补。
				免费使用的物品请合理利用，务必不铺张浪费。
			</p>
			<div class="tit">星球客预订</div>
			<p>- 预定星球客需30分钟之内完成支付，超过30分钟则视用户自动放弃本次预约，即该订单失效；
- 预定星球客房间并已成功付款的订单，视为用户确认入住该订单房间，在预定入住当天时间12:00点之前可以免费取消及退款；超过预定入住当天时间12：00点，视为已入住或使用该房间，房间将整日预留，概不退款。
- 若遇特殊情况需要推迟入住请拨打客服热线咨询办理，实际以客服热线最终沟通结果为标准。</p>
			<div class="tit">退房</div>
			<p>- 用户预订日期期限次日中午12:00为酒店退房时间，超过退房时间30分钟仍未办理退房手续的，视为违约，需用户自己承担此行为为酒店带来的损失。
- 若需要推迟退房或续订房间需用户与客服沟通，最终以沟通结果为标准。</p>
		</div> -->
		<div class="safety p30">
			<h3>安全保障</h3>
			<div class="content flex-column-center-center" @click="navigate('tabBar/my/security')">
				<div class="tit">安心入住.专业客服.安全保障</div>
				<div class="icons flex-center">
					<div class="iconfont icon-bao"></div>星球客 安心住
				</div>
			</div>
		</div>
		<div class="footer flex-center-between">
			<div class="left flex-center-between">
				<div class="item  flex-column-center">
					<!-- <div class="iconfont icon-fenxiang1"></div>分享 -->
					<button class="shearch iconfont icon-fenxiang1" open-type="share"></button>分享
				</div>
				<div class="item collect flex-column-center" :class="{active: details.CollectionId}" @click="toCollection">
					<!-- <div class="iconfont icon-aixin2"></div> -->
					<div @click="toCollection" class="iconfont" :class="details.CollectionId?'icon-aixin':'icon-aixin2'"></div>
					收藏
				</div>
				<div class="item flex-column-center">
					<!-- <div class="iconfont icon-kefu"></div>客服 -->
					<button class="iconfont icon-kefu" open-type="contact"></button>客服
				</div>
			</div>
			<div class="btn" :class="{'disable':!(details.Price*1)||!(proSKUList.length)}" @click="viewRoom">
			{{details.Price*1&&proSKUList.length?'查看房型':'敬请期待'}}
			</div>
			<!-- 价格存在 -->
			<div class="priceBox" v-if="false">
				<div class="price flex-end">
					<!-- <h2>待定</h2> -->
					<h2>{{ totalPrice||details.Price }}</h2>
					<p>元/{{totalPrice&&calendarOption.dateNum>1?calendarOption.dateNum:''}}晚</p>
				</div>
				<div class="o-price">
					￥{{ details.MarketPrice }}/晚
				</div>
			</div>
			<!-- 价格不存在时 -->
			<div class="priceBox"  v-if="false">
				<div class="price flex-end">
					<!-- <h2>待定</h2> -->
					<!-- <h2>{{ totalPrice||details.Price }}</h2> -->
					<p>--/晚</p>
				</div>
			</div>
			<!--  -->
			<div class="btn" v-if="false" :class="{'disable':!isSubmit||!details.Price*1}" @click="viewRoom">{{details.Price*1?'查看房型':'敬请期待'}}</div>
		</div>
		<!-- 价格说明 -->
		<uni-popup type="bottom" ref="priceExplainStatus">
			<div class="pop">
				<div class="title flex-center-between">
					<div></div>
					起价说明
					<div class="cancel" @click="priceExplainStatus(0)">+</div>
				</div>
				<div v-html="details.QJDesc" class="p30">
				</div>
				<!-- <div v-else class="content">
					本起价指未包含附加服务 ( 如房间差价等 ) 的基本价格
					您最终确认的价格将会随所选出行日期、人数及服务项
					目而相应变化。<br/>
					因最低价实时变化，请以实际价格为准
				</div> -->
				<div class="btn" @click="priceExplainStatus(0)">确定</div>
			</div>
		</uni-popup>
	</div>
</template>

<script>
	import commentItem from '../allComment/commentItem.vue';
	import datepricePicker from '@/components/date-price-picker/date-price-picker';
	import { post,navigate,toast,debounce,getCurrentPageUrlWithArgs,judgeLogin,throttle} from '@/utils';
	import { mapState, mapMutations } from "vuex"; //vuex辅助函数
	import { previewImage } from '@/utils/image-tools';
	import {startLevel} from '@/components/starLevel';
	export default {
		components:{
			commentItem,
			datepricePicker,
			startLevel
		},
		data() {
			return {
				navigate,
				userId:'',
				token:'',
				Id:0,
				currentSwiper :0,
				details: {
					CommentScore: "",
					ServiceKeys: "",
					Lat: 0,
					Lng: 0,
				},
				proSKUList:[],//产品sku列表
				showProSKUList:[],//显示的sku列表
				isSubmit:false,//是否可以提交
				tabList:[
					{
						type: "Synopsis",
						title:"产品亮点"
					},
					{
						type: "ContentDetail",
						title: "景区介绍"
					}
				],
				// tab的活动索引
				activeIndex: 0,
				// 地图图标数组
			    markers: [{
			      iconPath: "http://xqk.wtvxin.com/images/wxapp/icons/house.png",
			      latitude: 0,
			      longitude: 0,
				  width:50,
				  height: 50,
				  anchor: {x: .5, y: .5}
			    }],
				// 产品日期对应价格数组
				goodsDateTime: [],
				// 产品评论列表
				commentList :[],
				// 订单评价汇总信息
				OrderCommentInfo: {},
				// 多少分才显示超赞
				maxScore: 4.5,
				VideoContext:null,//视频实例
				couponList:[],//优惠券列表
				fullScreen:false,
			}
		},
		onLoad(options) {
			let Id = options.Id;
			this.Id = options.Id;
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			this.VideoContext = uni.createVideoContext('myVideo');
			this.getDetail()
			this.getDetailSKU()
			this.getOrderCommentInfo(Id)
			this.getOrderCommentList();
			this.getProCouponList();
		},
		onShow(){
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
		},
		computed:{
			// 监听日历的变化
			...mapState(['lng','lat','cityName','cityCode','calendarOption']),
			tabColor(index){
				return (index)=>{
					let str ='color1';
					if(index==1||index===2||index===7||index===8){
						str = 'color2'
					}
					if(index==3||index===4||index===9||index===10){
						str = 'color3'
					}
					return str
				}
			},
			tagInit: function () {
				if (!this.details) {
					return
				}
				// return this.item.ServiceKeys
				let tab = this.details.ServiceKeys.split(",")
				return tab
			},
			tabType: function () {
				// console.log("我是类型",this.details[this.tabList[this.activeIndex].type])
				return 1
			},
			// toNum (str) {
			// 	return (str)=>{
			// 		console.log(Math.round(str),'str')
			// 		return 5;
			// 	}
			// 	// Math.round(str)
			// },
			totalPrice(){
				let calendarOption = this.calendarOption;
				let startDate = new Date(calendarOption.currentRangeStartDate);
				let endDate = new Date(calendarOption.currentRangeEndDate);
				let price = 0;
				this.goodsDateTime.map(item=>{
					let itemDate = new Date(item.DayTime);
					if(itemDate>=startDate&&itemDate<endDate){
						if(!item.Stock){return;}
						console.log(price,'price')
						price+=(item.Price*1);
					}
				})
				
				if(price){
					this.isSubmit = true;
					price = price.toFixed(2);
				}else{
					price=0;
					this.isSubmit = false;
				}
				return price;
			},
			isHidden() {
				let score = Number(this.CommentScore(this.OrderCommentInfo.RankScore))
				if(!score){
					return
				}
				let res = score < this.maxScore
				return  res
			},
			// 分数
			CommentScore (score) {
				    return function(score) {
						if(!score)return;
						score =  this.intToFloat(score,1)
						if (score.length > 1) {
							return score
							// return score
						}
						return score
				    }
					
			},
			intToFloat (num, decPlaces) {
				    return function(num, decPlaces) {
						return num + '.' + Array(decPlaces + 1).join('0'); 
					}
					
			},
		},
		methods: {
			toMap() {
				console.log('123',{
					latitude:this.details.Lat*1,
					longitude:this.details.Lng*1,
					address:this.details.Address
				})
				uni.openLocation({
					latitude:this.details.Lat*1,
					longitude:this.details.Lng*1,
					address:this.details.Address
				})
				// navigate('product/map/map',{Lat:this.details.Lat,Lng:this.details.Lng})
			},
			// 全屏预览图片
			previewImages(index) {
				console.log(this.details.PicData,index)
				previewImage(this.details.PicData,index)
			},
			...mapMutations(['update']),
			// 获取textarea的行数
			// getRow () {
			// 	console.log('我是富文本',this.$refs.)
			// 	this.$refs.textarea.val().split("\n").length
			// },
			
			// 获取订单评价汇总信息
			async getOrderCommentInfo (Id) {
				let res = await post('Order/OrderCommentInfo',{ProId:Id})
				// console.log("获取订单评价汇总信息：",res)
				this.OrderCommentInfo = res.data
			},
			// 获取订单评价信息列表
			async getOrderCommentList () {
				let res = await post('Order/OrderCommentList',{
					ProId:this.Id,
					Page: 1,
					PageSize:2,
					Type:0,
					})
				// console.log("产品评论列表：",res)
				res.data.map(item=>{
					item.AddTime = item.AddTime.substr(0,item.AddTime.indexOf(' '))
					item.ReplyTime = item.ReplyTime.substr(0,item.ReplyTime.indexOf(' '))
				})
				this.commentList = res.data
			},
			// 获取房型日期价格
			async getGoodsDateTime (Id){
				let res = await post('Goods/GoodsDateTime', {
					ProId:this.Id,
					RoomTypeId:Id
					})
				this.goodsDateTime = res.data;
			},
			// 收藏
			toCollection () {
				debounce(()=>{
					if(!this.details.CollectionId){
						// 添加
						post('User/AddCollections',{
							UserId:this.userId,
							Token:this.token,
							Type:0,
							Id: this.Id,
						}).then(res=>{
							this.details.CollectionId= 1;
						})
					
					}else{
						// 取消
						post('User/ReCollections',{
							UserId:this.userId,
							Token:this.token,
							Type:0,
							Id: this.Id,
						}).then(res=>{
							this.details.CollectionId= 0;
						})
					}
				},100)
			},
			// 产品亮点和景区介绍切换
			changeTab (index) {
				this.activeIndex = index
			},
			async getDetail() {
				let res = await post('Goods/Goodsxq_yd',{
					Id: this.Id,
					UserId:this.userId,
					Token:this.token,
					MinDate:this.calendarOption.currentRangeStartDate,
					MaxDate:this.calendarOption.currentRangeEndDate
				})
				// console.log(`详情返回:`,res)
				// 正则增加富文本的样式
				res.data.BookNote = res.data.BookNote.replace(/<img/g, '<img style="max-width:100%;"');
				res.data.QJDesc = res.data.QJDesc.replace(/<img/g, '<img style="max-width:100%;"');
				res.data.Synopsis = res.data.Synopsis.replace(/<img/g, '<img style="max-width:100%;"');
				res.data.ContentDetail = res.data.ContentDetail.replace(/<img/g, '<img style="max-width:100%;"');
				res.data.DevLogo = res.data.DevLogo.replace(/<img/g, '<img style="max-width:100%;"');
				// console.log("我是精度",parseFloat(res.data.Lng))
				// 经纬度
				// res.data.Lng = parseFloat(res.data.Lng)
				// res.data.Lat = parseFloat(res.data.Lat)
				// 地图标记
				this.markers[0].latitude = res.data.Lat
				this.markers[0].longitude = res.data.Lng
				// 住房价格
				this.details = res.data
			},
			async getDetailSKU(){
				let res = await post('Goods/GoodsList_Sku',{
					ProId:this.Id,
					UserId:this.userId,
					Token:this.token,
					MinDate:this.calendarOption.currentRangeStartDate,
					MaxDate:this.calendarOption.currentRangeEndDate
					
				})
				this.proSKUList = res.data;
				this.showProSKUList = res.data.slice(0,3);
			},
			// 显示全部房型
			showProSku(){
				if(this.showProSKUList.length!==this.proSKUList.length){
					this.showProSKUList = this.proSKUList;
				}else{
					this.showProSKUList = this.proSKUList.slice(0,3);
				}
			},
			async getProCouponList(){
				let res = await post('Coupon/CouponCenter',{
					ProId: this.Id,
					UserId:this.userId,
					Token:this.token
				})
				this.couponList = res.data;
			},
			// 显示优惠券弹窗
			showCouponWin(){
				this.$refs.couponWin.open();
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
			changeSwiper(e){
				this.currentSwiper=e.detail.current;
			},
			// // 分数
			// CommentScore (score) {
			// 		if(!score)return;
			// 		if (score.length > 1) {
			// 			return Number(score)
			// 		}
			// 		return Number(score + ".0")
			// },
			// 价格说明
			priceExplainStatus(status){
				if(status){
					this.$refs['priceExplainStatus'].open();
				}else{
					this.$refs['priceExplainStatus'].close();
				}
			},
			// 立即预订
			submit(roomId){
				// if(!this.isSubmit){
				// 	if(this.details.Price*1){
				// 		toast('请选择可预订的日期！');
				// 	}
				// 	return;
				// }
				navigate('product/confirmOrder/confirmOrder',{id:this.Id,roomId})
			},
			// 打开地图
			openLocation(){
				console.log(123)
				uni.openLocation({
					latitude:this.details.Lat*1,
					longitude:this.details.Lng*1,
					address:this.details.Address,
					success(res){
				console.log(res)
					},fail(err){
				console.log(err)
					}
				})
			},
			// 查看房型
			viewRoom(){
				if(!this.proSKUList.length)return;
				let that = this;
				  let query = wx.createSelectorQuery().in(that);
				  query.selectViewport().scrollOffset()
				  query.select("#room").boundingClientRect();
				  query.exec(function (res) {
					console.log(res);
					let miss = res[0].scrollTop + res[1].top - 10;
					wx.pageScrollTo({
					  scrollTop: miss,
					  duration: 300
					});
					 
				  });
			},
			// 打开视频
			onOpenVideo(){
				if(this.details.Video){
					navigate('product/detail/videoPlay',{url:this.details.Video})
					return;
					this.fullScreen = true;
					this.$nextTick(()=>{
						console.log('打开了全屏')
						this.VideoContext.requestFullScreen();
						this.VideoContext.play()
					})
				}
			},
			// 视频打开和退出全屏触发
			videoChange(e){
				console.log(e,'e')
				if(e.detail.fullScreen){
					this.fullScreen = false;
				}
			}

		},
		onShareAppMessage: function (res) {
		    return {
		      title: '星球客微服务',
		      path: getCurrentPageUrlWithArgs(),
		      success: function (res) {
			   	// 转发成功
			        uni.showToast({
			          title: "分享成功",
			          icon: 'success',
			          duration: 2000
			        })
		       },
		      fail: function (res) {
		        	// 分享失败
					uni.showToast({
						title: "分享失败",
						icon: 'none',
					duration: 2000
					})
				},
		    }
		},
	}
</script>
<style scoped lang="scss">
@import './style.scss';
.mapBox{
	position:relative;
}
.cover{
	position:absolute;
	width: 100%;
	height: 150px;
	top:0;left:0;
}
#myVideo{
	width:100upx;height:100upx;
}
.hide{
	display:none;
}
</style>