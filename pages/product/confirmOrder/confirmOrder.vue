<template>
	<div class="bgfff" v-if="data.ProData">
		<div class="plr30">
			<div class="pro flex-center-between ptb40" v-if="data.ProData">
				<div class="info">
					<h4 class="name">{{data.ProData.Name}}</h4>
					<h4 class="price">￥{{data.ProData.Price}}</h4>
					<div class="score bold flex-center">
						<div class="iconfont icon-collect"></div>{{data.ProData.CommentScore}}<span>({{data.ProData.CommentNum}})</span>
					</div>
				</div>
				<img :src="data.ProData.PicNo" mode="widthFix" alt="">
			</div>
			<div class="date flex-center-between p30">
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
				<div class="right flex-center">
					<input type="text" placeholder="请选择" disabled />
					<uni-icons type="arrowright" color="#999"/>
				</div>
			</div>
		</div>
		<div class="gap20"></div>
		<div class="userInfo plr30 pt20">
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
					<input type="text" placeholder="添加入住人（选填）" disabled />
					<div class="btn-min" @click.stop="$refs.addCheckInInfo.open()">添加</div>
				</div>
			</div>
			<div class="detail-info plr30">
				<div>温如言</div>
				<p>手机号 186****7286</p>
				<p>身份证 41252819********99</p>
				<p>邮箱 122****278@qq.com</p>
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
					<input type="text" placeholder="请选择发票抬头" disabled />
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
		<div class="notice plr30 pb20 pt10">
			<div class="bold">预定须知</div>
			<p>退订规则</p>
			<span>入住前一天可免费取消；入住当天取消订单，扣除房费的60%作为违约金支付给平台。</span>
			<p>入住提示</p>
			<span>平台确认后，可自由入住星球客；平台提供7*24小时客服服务，确保您入住无忧。</span>
			<p>开具发票</p>
			<span>若需要开具房费发票，请您与星球客工作人员协商。</span>
		</div>
		<div class="btn-max" @click="submit">
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
						<p>成人</p>
						<uni-number-box @change="changePeopleNum($event,'l_AdultNum')" :value="l_AdultNum"></uni-number-box>
					</div>
					<div class="flex-center-between">
						<p>小孩</p>
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
						<input type="text" placeholder="请输入入住人姓名">
					</div>
					<div class="flex-center-between item">
						<p>手机号</p>
						<input type="number" placeholder="请输入入住人手机号">
					</div>
					<div class="flex-center-between item">
						<p>身份证</p>
						<input type="number" placeholder="请输入入住人身份证">
					</div>
					<div class="flex-center-between item">
						<p>邮箱</p>
						<input type="text" placeholder="请输入入住人邮箱">
					</div>
				</div>
				<view class="btn-max" @click="confirmPeopleNum">确定</view>
			</div>
		</uni-popup>
		<!-- 选择入住人信息 -->
		<uni-popup type="bottom" ref="selectCheckInInfo">
			<div class="selectCheckInInfo pop">
				<view class="title">
					填写入住人信息
					<view class="close" @click="$refs.selectCheckInInfo.close()">+</view>
				</view>
				<div class="content p30">
					<scroll-view scroll-y style="width: 100%;height: 560upx;">
						<view class="coupon">
							<view class="couponitem flex-center-between" v-for="(item,index) in 6" :key="index" @click="selectCoupon(item.Id)">
								<view class="couponname">
									item.Title
								</view>
							</view>
						</view>
					</scroll-view>
				</div>
				<view class="btn-max" @click="confirmPeopleNum">确定</view>
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
						<view class="couponitem flex-center-between" @click="selectCoupon(-1)">
							<view class="couponname">不使用</view>
							<view style="margin: 0;" :class="['IconsCK IconsCK-radio',llCouponId<0?'checked':'']"></view>
						</view>
						<view class="couponitem flex-center-between" v-for="(item,index) in 6" :key="index" @click="selectCoupon(item.Id)">
							<view class="couponname">
								{{item.Title}}
							</view>
							<view style="margin: 0;" :class="['IconsCK IconsCK-radio',llCouponId==item.Id?'checked':'']"></view>
						</view>
					</view>
				</scroll-view>
				<view class="btn-max" @click="selectCouponok">完成</view>
			</view>
		</uni-popup>
	</div>
</template>

<script>
	import {post,get,navigate,judgeLogin,navigateBack,verifyPhone,toast} from '@/utils';
	import { mapState, mapMutations } from "vuex"; //vuex辅助函数
	import wpicker from "@/components/w-picker/w-picker.vue";
	import ansInput from "@/components/ans-input/ans-input.vue";
	export default {
		components: {
			wpicker,ansInput
		},
		data() {
			return {
				navigate,
				userId: "",
				token: "",
				id:'',
				couponId:0,
				useCouponText:'',//使用的优惠券文本
				llCouponId:0,//临时优惠券id
				data:{},

				AdultNum:1,//成人入住人数
				l_AdultNum:1,//临时成人入住人数
				ChildNum:1,//小孩入住人数
				l_ChildNum:1,////临时成人入住人数
				l_people:1,//临时人数
				ContactName:'',//预订人
				Tel:'',//预订人电话
			}
		},
		onLoad(option) {
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			this.id = option.id;
			this.getData();
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
			async getData(){
				try{
					const res = await post('Order/BookOrder',{
						UserId: this.userId,
						Token: this.token,
						ProId:this.id,
						AdultNum:this.AdultNum*1,
						ChildNum:this.ChildNum*1,
						MinDate:this.calendarOption.currentRangeStartDate,
						MaxDate:this.calendarOption.currentRangeEndDate,
						CouponId:this.couponId,
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
					this.data = data;
				}catch{
					navigateBack();
				}
			},
			// 改变入住人数
			changePeopleNum(event,obj){
				this[obj] = event;
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
			// 提交订单
			submit(){
				let checkyuding = this.checkyuding()
				if(checkyuding){
					toast(checkyuding)
					return
				};
				post('Order/SubmitBookOrder',{
						UserId: this.userId,
						Token: this.token,
						ProId:this.id,
						AdultNum:this.adultNum,
						ChildNum:0,
						MinDate:this.calendarOption.currentRangeStartDate,
						MaxDate:this.calendarOption.currentRangeEndDate,
						CouponId:this.couponId,
						AreaCode:this.cityCode,
						ContactName:this.ContactName,
						Tel:this.Tel,
				})
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
				return false;
			}
		}
	}
</script>
<style scoped lang="scss">
@import './style.scss';
</style>