<template>
	<div class="bgfff" v-if="data.ProData">
		<div class="plr30">
			<div class="pro flex-center-between ptb40" v-if="data.ProData">
				<div class="info">
					<h4 class="name">{{data.ProData.Name}}</h4>
					<h5>房型：{{data.ProData.RoomTypeName}}</h5>
					<h4 class="price">￥{{data.TotalPrice||data.ProData.Price}}</h4>
					<div class="score bold flex-center">
						<div class="iconfont icon-collect"></div>{{data.ProData.CommentScore}}<span>({{data.ProData.CommentNum}})</span>
					</div>
				</div>
				<img :src="data.ProData.PicNo" mode="widthFix" alt="">
			</div>
			<div class="date flex-center-between p30" @click="$refs.datePicker.open()">
				<div class="start">
					<h3>{{calendarOption.startDate}}</h3>
					<p>入住日期</p>
				</div>
				<div class="total">共{{calendarOption.dateNum}}晚</div>
				<div class="end">
					<h3>{{calendarOption.endDate}}</h3>
					<p>离店日期</p></div>
			</div>
			<div class="row flex-center-between" @click="$refs.peopleNum.open()">
				<div class="left">入住人数</div>
				<div class="flex-center">
					<div  v-if="AdultNum">{{AdultNum}}成人<block v-if="ChildNum">-{{ChildNum}}小孩</block></div>
					<div class="c999" v-else>请选择</div>
					<uni-icons type="arrowright" color="#999"/>
				</div>
			</div>
		</div>
		<div class="gap20"></div>
		<div class=" plr30 pt20">
			<h5>预订人信息</h5>
			<div class="row flex-center-between">
				<div class="left">姓名</div>
				<div class="right flex-center">
					<input type="text" placeholder="请输入预订人姓名" v-model="ContactName"/>
				</div>
			</div>
			<div class="row flex-center-between">
				<div class="left">手机号</div>
				<div class="right flex-center">
					<input type="Number" placeholder="请输入预订人手机号"  v-model="Tel" />
				</div>
			</div>
		</div>
		<div class="gap20"></div>
		<div class="ceaseInfo plr30 pt20">
			<h5>入住人信息</h5>
			<div class="row flex-center-between">
				<div class="left">入住人</div>
				<div class="right flex-center" @click.stop="$refs.selectCheckInInfo.open()">
					<input type="text" placeholder="选择入住人（必填）" disabled />
					<div class="btn-min" @click.stop="$refs.addCheckInInfo.open()">添加</div>
				</div>
			</div>
			<div class="userInfo plr30" v-for="(item,index) in useUserInfo" :key="index">
				<div>{{item.FullName}}</div>
				<p>手机号 {{item.Mobile}}</p>
				<p>身份证 {{item.Idcard}}</p>
				<p>邮箱 {{item.Email}}</p>
			</div>
		</div>
		<div class="gap20"></div>
		<div class="coupon plr30">
			<div class="row flex-center-between" @click="showCouponWin">
				<div class="left">优惠券</div>
				<div class="right flex-center">
					<input type="text" placeholder="无可用" disabled v-model="useCouponText"/>
					<uni-icons type="arrowright" color="#999"/>
				</div>
			</div>
			<div class="row flex-center-between" @click="$refs.invoice.open()">
				<div class="left">发票</div>
				<div class="right flex-center">
					<input type="text" placeholder="请选择发票抬头" disabled  v-model="invoiceTitle"/>
					<uni-icons type="arrowright" color="#999"/>
				</div>
			</div>
		</div>
		<div class="gap20"></div>
		<div class="priceInfo plr30 ptb20">
			<div class="item flex-center-between">
				<p>总金额：</p>
				<p>¥{{data.TotalPrice}}</p>
			</div>
			<!-- <div class="item flex-center-between">
				<p>清洁费：</p>
				<p>¥0.00</p>
			</div>
			<div class="item flex-center-between">
				<p>服务费</p>
				<p>¥0.00</p>
			</div>  -->
			<div class="item flex-center-between">
				<p>优惠券</p>
				<p>-¥{{data.yhPrice}}</p>
			</div> 
			<div class="totalPrice bold flex-center-between">
				<p>实付金额</p>
				<p>¥{{data.AllPrice}}</p>
			</div>
		</div>
		<div class="gap20"></div>
		<div class="notice plr30 pb20 pt10" v-html="data.ProData.BookNote">
		<!-- 	<div class="bold">预定须知</div>
			<p>退订规则</p>
			<span>入住前一天可免费取消；入住当天取消订单，扣除房费的60%作为违约金支付给平台。</span>
			<p>入住提示</p>
			<span>平台确认后，可自由入住星球客；平台提供7*24小时客服服务，确保您入住无忧。</span>
			<p>开具发票</p>
			<span>若需要开具房费发票，请您与星球客工作人员协商。</span> -->
		</div>
		<div class="btn-max submit" @click="submit">
			提交订单
		</div>
		
		<!-- 人数 -->
		<uni-popup type="bottom" ref="peopleNum">
			<div class="couponbox pop peopleNum">
				<view class="title">
					填写人数
					<view class="close" @click="$refs.peopleNum.close()">+</view>
				</view>
				<div class="content">
					<div class="flex-center-between">
						<div>成人</div>
						<uni-number-box @change="changePeopleNum($event,'l_AdultNum')" :value="l_AdultNum"></uni-number-box>
					</div>
					<div class="flex-center-between">
						<div>小孩</div>
						<uni-number-box @change="changePeopleNum($event,'l_ChildNum')" :value="l_ChildNum"></uni-number-box>
					</div>
				</div>
				<view class="btn-max" @click="confirmPeopleNum">确定</view>
			</div>
		</uni-popup>
		<!-- 填写信息 -->
		<uni-popup type="bottom" ref="addCheckInInfo">
			<div class="addCheckInInfo pop">
				<view class="title">
					填写入住人信息
					<view class="close" @click="$refs.addCheckInInfo.close()">+</view>
				</view>
				<div class="content p30">
					<div class="flex-center-between item">
						<p>姓名</p>
						<input type="text" placeholder="请输入入住人姓名" v-model="UserInfo.FullName">
					</div>
					<div class="flex-center-between item">
						<p>手机号</p>
						<input type="number" placeholder="请输入入住人手机号" v-model="UserInfo.Mobile">
					</div>
					<div class="flex-center-between item">
						<p>身份证</p>
						<input type="number" placeholder="请输入入住人身份证" v-model="UserInfo.Idcard">
					</div>
					<div class="flex-center-between item">
						<p>邮箱</p>
						<input type="text" placeholder="请输入入住人邮箱" v-model="UserInfo.Email">
					</div>
				</div>
				<view class="btn-max" @click="addUserInfo">确定</view>
			</div>
		</uni-popup>
		<!-- 选择入住人信息 -->
		<uni-popup type="bottom" ref="selectCheckInInfo">
			<div class="selectCheckInInfo pop">
				<view class="title">
					选择入住人
					<view class="close" @click="$refs.selectCheckInInfo.close()">+</view>
				</view>
				<div class="content p30">
					<scroll-view scroll-y style="width: 100%;height: 560upx;">
						<view class="coupon">
							<view class="couponitem" v-for="(item,index) in userInfoList" :key="index" @click="selectCoupon(item.Id)">
								<label class="flex-center-between plr30 userInfo" @click="changeCheckInInfo(index)">
									<div class="">
										<div>{{item.FullName}}</div>
										<p>手机号 {{item.Mobile}}</p>
										<p>身份证 {{item.Idcard}}</p>
										<p>邮箱 {{item.Email}}</p>
									</div>
									<view style="margin: 0;" :class="['IconsCK IconsCK-radio',item.status?'checked':'']"></view>
								</label>
							</view>
						</view>
					</scroll-view>
				</div>
				<view class="btn-max" @click="selectCheckInInfo">确定</view>
			</div>
		</uni-popup>

		
		<!-- 优惠券弹窗 -->
		<uni-popup type="bottom" ref="coupon">
			<view class="couponbox pop" style="z-index: 10000;">
				<view class="title">
					选择优惠券
					<view class="close" @click="$refs.coupon.close()">+</view>
				</view>
				<scroll-view scroll-y style="width: 100%;height: 560upx;">
					<view class="coupon">
						<view class="couponitem flex-center-between" @click="selectCoupon(-1)">
							<view class="couponname">不使用</view>
							<view style="margin: 0;" :class="['IconsCK IconsCK-radio',llCouponId<1?'checked':'']"></view>
						</view>
						<view class="couponitem flex-center-between" v-for="(item,index) in data.UseCouponList" :key="index" @click="selectCoupon(item.Id)">
							<view class="couponname">
								{{item.Title}}
							</view>
							<view style="margin: 0;" :class="['IconsCK IconsCK-radio',llCouponId==item.Id?'checked':'']"></view>
						</view>
					</view>
				</scroll-view>
				<view class="btn-max" @click="confirCoupon">完成</view>
			</view>
		</uni-popup>
		<!-- 发票 -->
		<uni-popup type="bottom" ref="invoice">
			<view class="couponbox pop" style="z-index: 10000;">
				<view class="title">
					选择发票
					<view class="close" @click="$refs.invoice.close()">+</view>
				</view>
				<scroll-view scroll-y style="width: 100%;height: 560upx;">
					<view class="invoice">
						<view class="couponitem flex-center-between" @click="selectInvoice(-1)">
							<view class="couponname">不使用</view>
							<view style="margin: 0;" :class="['IconsCK IconsCK-radio',l_invoiceId<0?'checked':'']"></view>
						</view>
						<view class="couponitem flex-center-between" v-for="(item,index) in invoiceList" :key="index" @click="selectInvoice(item.Id)">
							<view class="couponname">
								<p>{{item.InvoiceTitleStr}}{{item.InvoiceTitleStr==='公司'?'增值税':''}}{{item.IsVATExclusive?'专用发票':'普通发票'}}{{item.Invoiceformat?' - 邮寄':''}}</p>
								<p>{{item.HeaderName}}</p>
							</view>
							<view style="margin: 0;" :class="['IconsCK IconsCK-radio',l_invoiceId==item.Id?'checked':'']"></view>
						</view>
					</view>
				</scroll-view>
				<view class="btn-max" @click="confirmInvoice">完成</view>
			</view>
		</uni-popup>
		<date-price-picker ref="datePicker" @change="changeDatePicker" 
			:option="calendarOption" :goodsDateTime="goodsDateTime">
		</date-price-picker>
	</div>
</template>

<script>
	import {post,get,navigate,judgeLogin,navigateBack,verifyPhone,toast,redirect} from '@/utils';
	import { mapState, mapMutations } from "vuex"; //vuex辅助函数
	import wpicker from "@/components/w-picker/w-picker.vue";
	import ansInput from "@/components/ans-input/ans-input.vue";
	import datepricePicker from '@/components/date-price-picker/date-price-picker';
	export default {
		components: {
			wpicker,ansInput,
			datepricePicker,
		},
		data() {
			return {
				navigate,
				userId: "",
				token: "",
				isSubmit:false,//是否已经点击了提交
				id:'',
				roomId:'',
				couponId:0,
				useCouponText:'',//使用的优惠券文本
				llCouponId:0,//临时优惠券id
				data:{},

				userInfoList:[],//常用人信息列表
				useUserInfo:[],// 使用的常用人信息列表
				UserInfo:{
					FullName:"",
					Idcard:"",
					Mobile:"",
					Email:""
				},// 添加的的常用人信息

				AdultNum:1,//成人入住人数
				l_AdultNum:1,//临时成人入住人数
				ChildNum:0,//小孩入住人数
				l_ChildNum:0,////临时成人入住人数
				l_people:1,//临时人数
				ContactName:'',//预订人
				Tel:'',//预订人电话
				invoiceList:[],//发票列表
				invoiceId:'',//发票id
				invoiceTitle:'',//发票抬头
				l_invoiceId:'',//临时发票id
				
				// 产品日期对应价格数组
				goodsDateTime: [],
			}
		},
		onLoad(option) {
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			this.AdultNum = this.$store.state.aduNum||1
			this.l_AdultNum = this.$store.state.aduNum||1
			this.ChildNum = this.$store.state.kidNum||0
			this.l_ChildNum = this.$store.state.kidNum||0
			this.id = option.id;
			this.roomId = option.roomId;
			this.getData();
			this.getGoodsDateTime();
			this.getCheckInInfo();//获取入住人常用信息
			this.getInvoice();//获取发票列表
		},
		onShow(){
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			// if(!this.data.TotalPrice){
			// 	this.getData();
			// }
		},
		computed:{
			...mapState(['lng','lat','cityName','cityCode','calendarOption'])
		},
		methods: {
			...mapMutations(['update']),
			// 获取房型日期价格
			async getGoodsDateTime (){
				let res = await post('Goods/GoodsDateTime', {
					ProId:this.id,
					RoomTypeId:this.roomId
					})
				this.goodsDateTime = res.data;
			},
			async getData(){
				try{
					const res = await post('Order/BookOrder',{
						UserId: this.userId,
						Token: this.token,
						ProId:this.id,
						RoomTypeId:this.roomId,
						AdultNum:this.AdultNum*1,
						ChildNum:this.ChildNum*1,
						MinDate:this.calendarOption.currentRangeStartDate,
						MaxDate:this.calendarOption.currentRangeEndDate,
						CouponId:this.couponId
					})
					const data= res.data;
					data.UseCouponList.map(item=>{
						if(data.CouponId ===item.Id){
							this.useCouponText = item.Title;
						}
					})
					this.couponId = data.CouponId;
					if(this.couponId<1){
						this.useCouponText = '不使用';
					}
					
					data.ProData.BookNote = data.ProData.BookNote.replace(/<img/g, '<img style="max-width:100%;"');
					this.data = data;
				}catch{
					this.calendarOption.currentRangeStartDate = '';
					this.calendarOption.currentRangeEndDate = '';
					this.getData();
					// navigateBack();
				}
			},
			// 获取用户常用信息
			async getCheckInInfo(){
				const res = await post('User/GetUserInfo',{
					UserId: this.userId,
					Token: this.token,
				})
				const data= res.data;
				data.map(item=>{
					item.status =0;
					if(item.IsDefault){
						item.status =1;
						this.useUserInfo.push(item)
					}
				})
				this.userInfoList = data;
			},
			// 改变选择
			changeCheckInInfo(index){
				this.userInfoList[index].status =!this.userInfoList[index].status;
			},
			// 选择信息
			selectCheckInInfo(){
				let arr =[];
				this.userInfoList.map(item=>{
					if(item.status){
						arr.push(item);
					}
				})
				this.useUserInfo=arr;
				this.$refs.selectCheckInInfo.close();
			},
			// 添加用户常用信息
			async addUserInfo(){
				const UserInfo = this.UserInfo;
				let checkUserInfo = this.checkUserInfo()
				if(checkUserInfo){
					toast(checkUserInfo)
					return;
				};
				const res = await post('User/AddUserInfo',{
					UserId: this.userId,
					Token: this.token,
					"UserInfo":{
						"IsDefault":0,
						"Type":0,
						"FullName":UserInfo.FullName,
						"Idcard":UserInfo.Idcard,
						"Mobile":UserInfo.Mobile,
						"Email":UserInfo.Email
					}
				})
				this.getCheckInInfo();
				this.UserInfo ={
					FullName:"",
					Idcard:"",
					Mobile:"",
					Email:""
				}
				this.$refs.addCheckInInfo.close();
				this.$refs.selectCheckInInfo.open();
			},
			
			// 更改日历
			changeDatePicker(e) {
				// console.log("我是日历出现变更",e)
				let calendarOption = this.calendarOption;
				calendarOption.currentRangeStartDate = e.startDate;
				calendarOption.startDate = e.startDate.substring(e.startDate.indexOf('-')+1);
				calendarOption.currentRangeEndDate = e.endDate;
				calendarOption.endDate = e.endDate.substring(e.endDate.indexOf('-')+1);
				calendarOption.dateNum = e.dateNum;
				this.update({
					calendarOption:calendarOption
				})
				this.getData();
			},
			// 校验常用信息添加
			checkUserInfo(){
				const UserInfo = this.UserInfo;
				var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if (UserInfo.FullName == '') {
					return '请输入入住人的姓名！';
				}
				if (UserInfo.Idcard == '') {
					return '请输入证件号码！';
				}
				if (UserInfo.Mobile == '') {
					return '请输入入住人的手机号！';
				} else if (!(/^0\d{2,3}-\d{7,8}$/.test(UserInfo.Mobile) || /^[1][3,4,5,6,7,8][0-9]{9}$/.test(UserInfo.Mobile))) {
					return '请输入正确的手机号！';
				}
				if (UserInfo.Email == '') {
					return '请输入入住人的邮箱！';
				} else if (!myreg.test(UserInfo.Email)) {
					return '请输入正确的邮箱！';
				}
				return false;
			},
			// 改变入住人数
			changePeopleNum(event,obj){
				this[obj] = event*1;
			},
			// 完成入住人数
			confirmPeopleNum(){
				this.AdultNum = this.l_AdultNum;
				this.ChildNum = this.l_ChildNum;
				this.getData();
				this.$refs.peopleNum.close();
			},
			// 显示优惠券弹窗
			showCouponWin(){
				this.llCouponId = this.couponId;
				this.$refs.coupon.open();
			},
			// 选择优惠券
			selectCoupon(id){
				this.llCouponId = id;
			},
			// 完成优惠券选择
			confirCoupon(){
				this.couponId = this.llCouponId;
				this.getData();
				this.$refs.coupon.close();
			},
			// 获取发票列表
			async getInvoice(){
				let result = await post("Invoice/invoiceList", {
					userId: this.userId,
					token: this.token,
					Page:1,
					PageSize:10
				})
				this.invoiceList = result.data;
			},
			// 选择优惠券
			selectInvoice(id){
				this.l_invoiceId = id;
			},
			confirmInvoice(){
				this.invoiceId = this.l_invoiceId;
				this.invoiceList.map(item=>{
					if(this.l_invoiceId === item.Id){
						this.invoiceTitle = item.HeaderName;
					}
				})
				this.$refs.invoice.close();
			},
			// 提交订单
			async submit(){
				let checkyuding = this.checkyuding()
				if(checkyuding){
					toast(checkyuding)
					return
				};
				// 是否已经点击了提交
				if(this.isSubmit){
					return;
				}
				this.isSubmit = true;
				let Uid=[];
				this.useUserInfo.map(item=>{
					Uid.push(item.Id)
				})
				try{
					const res = await post('Order/SubmitBookOrder',{
							UserId: this.userId,
							Token: this.token,
							ProId:this.id,
							RoomTypeId:this.roomId,
							AdultNum:this.AdultNum,
							ChildNum:this.ChildNum,
							MinDate:this.calendarOption.currentRangeStartDate,
							MaxDate:this.calendarOption.currentRangeEndDate,
							CouponId:this.couponId,
							AreaCode:this.cityCode,
							ContactName:this.ContactName,
							Tel:this.Tel,
							InvoiceId:this.invoiceId,
							Uid:Uid.join(',')
					})
					this.isSubmit = false;
					this.ConfirmWeiXinSmallPay(res.data);
				}catch(err){
					this.isSubmit = false;
				}
			},
			// 校验预订人
			checkyuding(){
				if(!this.ContactName){
					return '请输入预订人姓名'
				}
				if(!this.Tel){
					return '请输入预订人电话'
				}
				if(!verifyPhone(this.Tel)){
					return '请输入正确的预订人电话'
				}
				if(!this.useUserInfo.length){
					return '请填写入住人信息'
				}
				return false;
			},
			//微信支付需参数
			async ConfirmWeiXinSmallPay(OrderNo){

				let res = await post('Order/WechatPay',{
					OrderNo:OrderNo,
					UserId: this.userId,
					Token: this.token,
					WxCode:uni.getStorageSync("wxCode"),
					WxOpenid:uni.getStorageSync("openId"),
					paytype:4
				})
				let payData=JSON.parse(res.data.JsParam)
				if(res.code==0){
					let _this=this;
					wx.requestPayment({
					timeStamp: payData.timeStamp,
					nonceStr: payData.nonceStr,
					package: payData.package,
					signType: payData.signType,
					paySign: payData.paySign,
					success(res) {
						redirect('product/paysuccess/index',{OrderNo:OrderNo,money:_this.data.AllPrice})
						},
					fail(res) {
						redirect('product/paysuccess/index',{OrderNo:OrderNo,msg:'fail',money:_this.data.AllPrice})
					}
					})
				}else if(res.code==200){
					redirect('product/paysuccess/index',{OrderNo:OrderNo,money:_this.data.AllPrice})
				}
			},
		}
	}
</script>
<style scoped lang="scss">
@import './style.scss';
</style>