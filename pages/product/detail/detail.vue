<template>
	<div class="bgfff">
		<!--轮播图-->
		<view class="index_swiper">
			<swiper class="swiper" :indicator-dots="false" autoplay :interval="5000" :duration="500" @change="changeSwiper">
				<swiper-item v-for="(item,index) in details.PicData" :key="index">
					<view class="swiper-item">
						<!-- <image class="img" src="/static/of/banner.jpg" mode="aspectFill"></image> -->
						<image class="img" :src="item.PicUrl" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="dots">
				<view v-for="(item,index) in details.PicData" :key="index" :class="['dot',currentSwiper==index?'active':'']"></view>
			</view>
		</view>
		<div class="topBlock p30">
			<div class="flex-center-between">
				<!-- <p>江西省 萍乡市</p> -->
				<p>{{ details.AreaSite }}</p>
				<!-- <div class="tab">5A景区</div> -->
				<div class="tab">{{ details.ShowArea }}</div>
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
		<div class="gap20"></div>
		<div class="scroll-block">
			<!-- <h3>推荐体验</h3> -->
			<h3>{{ details.RecTitle }}</h3>
			<scroll-view scroll-x class="">
				<div class="list flex-center ptb20">
					<div class="item flex-column-center-center" v-for="(item,index) in details.RecPicList" :key="index">
						<!-- <img src="/static/of/detail-icon.png" mode="widthFix" alt=""> -->
						<img :src="item.PicUrl" mode="widthFix" alt="">
						<!-- <h5>云海日出</h5> -->
					</div>
				</div>
			</scroll-view>
		</div>
		<div class="gap20"></div>
		<div class="scroll-block">
			<!-- <h3>星球客设施</h3> -->
			<h3>{{ details.DevTitle }}</h3>
			<scroll-view scroll-x class="">
				<div class="list flex-center ptb20">
					<div class="item flex-column-center-center" v-for="(item,index) in details.DevPicList" :key="index">
						<!-- <img src="/static/of/detail-icon.png" mode="widthFix" alt=""> -->
						<img :src="item.PicUrl" mode="widthFix" alt="">
						<!-- <h5>智能温控</h5> -->
					</div>
				</div>
			</scroll-view>
		</div>
		<div class="column-tab flex-start-between plr30 pb20" v-html="details.DevLogo">
			<!-- <image :src="details.DevLogo" mode="widthFix"></image> -->
			<!-- <div class="item">
			<div class="bold">基础设施</div>
				<div class="flex-center" v-for="(item,index) in 4" :key="index">
					<div class="iconfont icon-gou2"></div> 
					<div>新风空调</div>	
				</div> 
			</div> -->
			<!-- <div class="item">
				<div class="bold">智能设施</div>
				<div class="flex-center" v-for="(item,index) in 3" :key="index">
					<div class="iconfont icon-gou2"></div> 
					<div>新风空调</div>	
				</div>
			</div> -->
			<!-- <div class="item">
				<div class="bold">洗浴设施</div>
				<div class="flex-center" v-for="(item,index) in 4" :key="index">
					<div class="iconfont icon-gou2"></div> 
					<div>新风空调</div>	
				</div>
			</div> -->
		</div>
		<div class="gap20"></div>
		<div v-if="details.IsVideo" class="video plr30 pb30">
			<h3>实时摄像头</h3>
			<!-- <img src="/static/of/p2.jpg"  alt=""> -->
			<video :src="details.Video"></video>
		</div>
		<div class="gap20"></div>
		<div class="comment">
			<div class="plr30">
				<h3>用户评价</h3>
				<div class="score plr30 ptb20">
					<div class="top flex-center">
						<div class="score-num bold">
							<!-- 4.9 -->
							{{ CommentScore }}
						</div>
						<div class="right">
							<div class="tab">超赞</div>
							<div class="starBox flex-center">
								<div class="star flex-center">
									<div class="iconfont icon-collect" v-for="(item,index) in 4" :key="index"></div>
									<div class="iconfont icon-collect1"></div>
								</div>
								<div class="comment-num">{{ details.CommentNum }}条评价</div>
							</div>
						</div>
					</div>
					<div class="bottom flex-center-between">
						<div class="item flex-center">
							<p>卫生</p>
							<span>{{ CommentScore }}</span>
						</div>
						<div class="item flex-center">
							<p>体验</p>
							<span>{{ CommentScore }}</span>
						</div>
						<div class="item flex-center">
							<p>服务</p>
							<span>{{ CommentScore }}</span>
						</div>
						<div class="item flex-center">
							<p>设施</p>
							<span>{{ CommentScore }}</span>
						</div>
					</div>
				</div>
			</div>
			<commentItem v-for="(item,index) in 2" :key="index"></commentItem>
			<div class="more" @click="navigate('product/allComment/allComment')">阅读{{details.CommentNum }}条评论</div>
		</div>
		<div class="gap20"></div>
		<div class="position ptb30">
			<div class="plr30">
				<h3>星球客位置</h3>
				<!-- <h5 class="flex-center"><i class="iconfont icon-weizhi"></i>武功山风景名胜区麻田办事处大江边村</h5> -->
				<h5 class="flex-center"><i class="iconfont icon-weizhi"></i>{{ details.Address }}</h5>
			</div>
			<!-- <img src="/static/of/map-img.png" mode="widthFix" alt=""> -->
			<map 
			  id="myMap" 
			  style="width: 750upx"
			  :latitude="details.Lat"
			  :longitude="details.Lng"
			  :markers="markers">
			</map>
		</div>
		<div class="gap20"></div>
		<date-picker ref="datePicker" @change="changeDatePicker" :option="option"></date-picker>
		<div class="dateBox plr30 pb30">
			<h3>入住退房日期</h3>
			<div class="date-time flex-end-between" @click="$refs.datePicker.open()">
				<div class="start">
					<p>入住</p>
					<div class="text">{{option.currentRangeStartDate}}</div>
				</div>
				<p>- 最少一晚 -</p>
				<div class="end">
					<p>退房</p>
					<div class="text">{{option.currentRangeEndDate}}</div>
				</div>
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
		<div class="notice plr30" v-html="details.BookNote">
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
		<div class="footer plr30 flex-center-between">
			<div class="left flex-center">
				<div class="item flex-column-center">
					<!-- <div class="iconfont icon-fenxiang1"></div>分享 -->
					<button class="iconfont icon-fenxiang1" open-type="share"></button>分享
				</div>
				<div class="item flex-column-center">
					<!-- <div class="iconfont icon-aixin2"></div> -->
					<div @click="toCollection" class="iconfont icon-aixin1" :class="{active : details.CollectionId}"></div>
					收藏
				</div>
				<div class="item flex-column-center">
					<!-- <div class="iconfont icon-kefu"></div>客服 -->
					<button class="iconfont icon-kefu" open-type="contact"></button>客服
				</div>
			</div>
			<div class="priceBox">
				<div class="price flex-end">
					<!-- <h2>待定</h2> -->
					<h2>{{ details.Price }}</h2>
					<p>/晚</p>
				</div>
				<div class="o-price">
					￥{{ details.MarketPrice }}/晚
				</div>
			</div>
			<div class="btn disable" @click="navigate('product/confirmOrder/confirmOrder')"> 
				立即预定
			</div>
		</div>
		<!-- 价格说明 -->
		<uni-popup type="bottom" ref="priceExplainStatus">
			<div class="pop">
				<div class="title flex-center-between">
					<div></div>
					起价说明
					<div class="cancel" @click="priceExplainStatus(0)">+</div>
				</div>
				<div v-html="details.QJDesc">
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
	import datePicker from '@/components/good-date-picker/good-date-picker';
	import { post,navigate,formatTime } from '@/utils';
	export default {
		components:{
			commentItem,
			datePicker
		},
		data() {
			return {
				navigate,
				currentSwiper :0,
				details: {
					CommentScore: "",
					ServiceKeys: "",
					Lat: 0,
					Lng: 0
				},
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
			      iconPath: "../../../static/icons/house.png",
			      latitude: 0,
			      longitude: 0,
				  width:50,
				  height: 50,
				  anchor: {x: .5, y: .5}
			    }],
				// 日期
				option:{
					currentRangeStartDate: '', //根默认显示初始时间，可为空,默认今天
					currentRangeEndDate: '', //根默认区间选择显示结束时间，可为空，默认明天
					initStartDate: '', //可选起始时间限制，可为空,默认今天
					initEndDate: '', //可选结束时间限制，可为空,默认4个月后
					isRange: true, //是否开启范围选择，必填
					isModal:true,
					dateNum:1,
				},
			}
		},
		onLoad(options) {
			console.log("传递过来的参数:",options)
			this.getDetail(options.Id)
			console.log("日期：", formatTime(Date.parse(new Date())))
		},
		computed:{
			tabColor(index){
				console.log(index,'index')
				let str ='color1';
				if(index==1||index===2||index===7||index===8){
					str = 'color2'
				}
				if(index==3||index===4||index===9||index===10){
					str = 'color3'
				}
				return str
			},
			tagInit: function () {
				console.log("详情标签2：",this.details)
				if (!this.details) {
					return
				}
				// return this.item.ServiceKeys
				let tab = this.details.ServiceKeys.split(",")
				console.log('详情tab',tab)
				return tab
			},
			// 分数
			CommentScore: function () {
				if (this.details.CommentScore.length > 1) {
					return this.details.CommentScore
				}
				return this.details.CommentScore + ".0"
			},
			tabType: function () {
				console.log("我是类型",this.details[this.tabList[this.activeIndex].type])
				return 1
			}
		},
		methods: {
			// 收藏
			toCollection () {
				this.details.CollectionId = !this.details.CollectionId
			},
			// 产品亮点和景区介绍切换
			changeTab (index) {
				this.activeIndex = index
			},
			async getDetail(Id) {
				let res = await post('/Goods/Goodsxq_yd',{Id: Id})
				console.log(`详情返回:`,res)
				// 正则增加富文本的样式
				res.data.BookNote = res.data.BookNote.replace(/<img/g, '<img style="max-width:100%;"');
				res.data.QJDesc = res.data.QJDesc.replace(/<img/g, '<img style="max-width:100%;"');
				res.data.Synopsis = res.data.Synopsis.replace(/<img/g, '<img style="max-width:100%;"');
				res.data.ContentDetail = res.data.ContentDetail.replace(/<img/g, '<img style="max-width:100%;"');
				res.data.DevLogo = res.data.DevLogo.replace(/<img/g, '<img style="max-width:100%;"');
				// console.log("我是精度",parseFloat(res.data.Lng))
				res.data.Lng = parseFloat(res.data.Lng)
				res.data.Lat = parseFloat(res.data.Lat)
				this.markers[0].latitude = res.data.Lat
				this.markers[0].longitude = res.data.Lng
				this.details = res.data
			},
			changeSwiper(e){
				this.currentSwiper=e.detail.current;
			},
			// 价格说明
			priceExplainStatus(status){
				if(status){
					this.$refs['priceExplainStatus'].open();
				}else{
					this.$refs['priceExplainStatus'].close();
				}
			},
			// 更改日历
			changeDatePicker(e) {
				console.log(e)
				this.option.currentRangeStartDate = e.startDate;
				this.option.currentRangeEndDate = e.endDate;
				this.option.dateNum = e.dateNum;
			}

			// tabColor(index){
			// 	let str ='color1';
			// 	if(index==1||index===2||index===7||index===8){
			// 		str = 'color2'
			// 	}
			// 	if(index==3||index===4||index===9||index===10){
			// 		str = 'color3'
			// 	}
			// 	return {str}
			// }
		}
	}
</script>
<style scoped lang="scss">
@import './style.scss';
</style>