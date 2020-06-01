<template>
	<view>
		<view v-if="option.isModal" @touchmove.stop.prevent="catchtouchmove" :class="{ move: isShow }" @click="close" class="select_date_bg"></view>
		<view class="select_date" :class="{ move: isShow && option.isModal, init: !option.isModal }">
			<view v-if="option.isModal" class="head">
				<text>选择日期</text>
				<text @click="close">X</text>
			</view>
			<view class="week">
				<view :class="{ weekend: index == 0 || index == 6 }" v-for="(item, index) in weekData" :key="index">{{ item }}</view>
			</view>
			<scroll-view scroll-y class="main" :class="{ init: !option.isModal ,show_submit:option.isShowSubmit}">
				<view class="list" v-for="(item, index) in totalDate" :key="index">
					<view class="title">{{ titleDateFormat(item.info[0].date) }}</view>
					<view class="date">
						<view
							@click="clickDay(index, y,x)"
							:class="{
								range_space: x.isRangeStyle,
								choosed: (x.isChoosed || x.isRangeStart || x.isRangeEnd)  && !x.isSpace,
								disabled: x.isDisadled,
								weekend: x.isWeekend && !x.isDisadled
							}"
							v-for="(x, y) in item.info"
							:key="y"
						>
							<view v-if="!x.isDayOne && !x.isDayTwo && !x.isDayThree">{{x.day}}</view>
							<view v-if="x.isDayOne">今天</view>
							<view v-if="x.isDayTwo">明天</view>
							<view v-if="x.isDayThree">后天</view>
							<view v-if="x.isChoosed && !x.isSpace">选择</view>
							<view v-if="x.currentRangeStartDate && !x.isSpace">入住</view>
							<!-- <view v-if="startToEndDay(x.date,y)" class="totalPrices">{{option.price * y}}元</view> -->
							<!-- <view class="" v-for="(item2, index2) in priceDay"> -->
								<!-- <view v-if="(x.day && y>(innerIndex-currentDateNum-1)) || index>0" class="totalPrices">{{option.price * (x.day-priceDay+1)}}元</view> -->
								<!-- <view v-if="x.day && (y>(innerIndex-currentDateNum-1) || index>0)" class="totalPrices">{{option.price * (x.day-priceDay+1)}}元</view> -->
							<!-- <view v-if="x.day && (y>(innerIndex-currentDateNum-1) || index>0) && (nowPrice(x) >0)" 
								class="totalPrices" 
								:class="{
									red :((x.isChoosed || x.isRangeStart || x.isRangeEnd) && (x.isWeekend && !x.isDisadled) && !x.isSpace) || x.isRangeStyle
								}">
								¥{{nowPrice(x)}}
							</view> -->
							<view v-if="x.day && (y>(innerIndex-currentDateNum-1) || index>0) && (nowPrice(x) >0)"
								class="totalPrices" :class="{
									red : ((x.isChoosed || x.isRangeStart || x.isRangeEnd) && (x.isWeekend && !x.isDisadled) && !x.isSpace) || x.isRangeStyle }">
								¥{{nowPrice(x,index)}}
							</view>
							<!-- <view class="red totalPrice">
								¥{{nowPrice(x)}}
							</view> -->
								<!-- <view v-if="x.day && (y>(innerIndex-currentDateNum-1) || index>0)" class="totalPrices">{{option.price}}元</view> -->
							<!-- </view> -->
							<view v-if="x.currentRangeEndDate">离店</view>
							<view v-if="x.currentRangeEndDate" class="num">共{{ currentDateNum }}晚</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view v-if="(option.isModal || option.isShowSubmit) && isShow" @click="clickSubmit" class="footer"><view :class="{ disabled: isDisabledBtn }" hover-class="hover">确定</view></view>
		</view>
	</view>
</template>

<script>
export default {
/*	
	需要传入组件的参数
	option:{
		currentRangeStartDate: '2020-05-29', //根默认显示初始时间，可为空,默认今天
		currentRangeEndDate: '2020-05-30', //根默认区间选择显示结束时间，可为空，默认明天
		initStartDate: '', //可选起始时间限制，可为空,默认今天
		initEndDate: '', //可选结束时间限制，可为空,默认4个月后
		isRange: true, //是否开启范围选择，必填
		isModal:true,
		dateNum:1,
		price: 0,
		// 产品日期对应价格数组
		// start-外面传入进来的，产品日期对应价格对象的数组，可以去看 产品详情
		goodsDateTime: [
			{
				DayTime: "2020-05-29", // 其中一个日期，有很多个日期
				ProId: 492,//产品Id
				Price: 492, // 产品价格/间
				Stock: 666, // 当天库存
				SalesNum: undefined // 当天销量 nubmber,为了后面好判断才写undefined
			}
		],
		// end-外面传入进来的，产品日期对应价格对象的数组，可以去看 产品详情
	}, 
*/
	props: [
		'option',
		// 'goodsDateTimes',
		], //配置参数
	data() {
		return {
			weekData: ['日', '一', '二', '三', '四', '五', '六'],
			totalDate: [],
			chooseOneDate: '', //单选模式当前点击的日期
			currentRangeStartDate: '', //区域选择模式当前点击的开始日期
			currentRangeEndDate: '', //区域选择模式当前点击的结束日期
			initStartDate: '', //可选起始时间限制，可为空,默认今天
			initEndDate: '', //可选结束时间限制，可为空,默认4个月后
			outIndex: 0, //当前点击外索引
			innerIndex: 0, //当前点击内索引
			isShow: false,
			// 下面是自己添加的参数
			nowEndDate: "",
			startDate: "",
			// start-外面传入进来的，产品日期对应价格对象的数组，可以去看 产品详情，注释在上面
			// goodsDateTime: [],
			// end-外面传入进来的，产品日期对应价格对象的数组，可以去看 产品详情
			// 总价格数组，用来计算总价
			priceList: []
		};
	},
	mounted() {
		this.myInitDate();
		this.totalDateInit();
		this.dateFirstInit()
		
		// console.log("我是可选起初和结束",this.initStartDate,this.initEndDate)
		// console.log("我是产品日期价格数组",this.goodsDateTime)
		if(!this.option.isModal){
			setTimeout(()=>{
				this.open();
			},0)
		}
	},
	watch: {
		isShow(n) {
			if (n) {
				console.log("1我被挂在了",this.goodsDateTimes)
				this.myInitDate();
				this.totalDateInit();
				this.dateFirstInit();
				// 打印传入的参数看看
				console.log("传入的goodsDateTime-----",this.goodsDateTime)
				console.log("我是vuex的goodsDateTime-----",this.$store.state.goodsDateTime)
			}
		}
	},
	computed: {
		// 计算当天价格
		// nowPrice(day,y){
		// 	return (day,y) => {
		// 		// console.log("day是什么--",day)
		// 		if(!day.date){
		// 			return ""
		// 		}
		// 		// console.log("this.goodsDateTime------", this.goodsDateTime)
		// 		if(this.$store.state.goodsDateTime.length === 0){
		// 			return ""
		// 		}
		// 		// console.log("===============",this.dateSpace(this.initEndDate,day.date))
		// 		// let res1 = this.dateSpace(this.initStartDate,day.date) < 0
		// 		// let res2 = this.dateSpace(this.initEndDate,day.date) > 0
		// 		let res3 = y <= this.outIndex
		// 		let res4 = day <= this.innerIndex
		// 		if(res3 && res4){
		// 			// console.log("不在范围")
		// 			return ""
		// 		}
		// 		let price = null
		// 		let index = undefined;
		// 		for (let i = 0; i < this.goodsDateTime.length; i++) { 
		// 			if(this.goodsDateTime[i].DayTime === day.date){
		// 				index = i
		// 				price = this.goodsDateTime[i].Price
		// 				this.priceList.push(price)
		// 				// console.log("我是价格数组，算总价的：",this.priceList)
		// 				// if(index !== undefined){
		// 				// 	this.goodsDateTime.splice(index,1)
		// 				// 	// 更新goodsDateTime到 vuex
		// 				// 	// this.$store.commit('update',{"goodsDateTime":this.goodsDateTime})
		// 				// 	console.log("我是这天价格：",day.date,price)
		// 				// }
		// 				return price
		// 			}
		// 		 }
		// 		 return ""
				 
		// 	}
		// },
		currentDateNum() {
			// 当前起始日期与结束日期之间的天数
			return this.dateSpace(this.currentRangeStartDate, this.currentRangeEndDate);
		},
		isDisabledBtn() {
			if (this.option.isRange) {
				return !(this.currentRangeStartDate && this.currentRangeEndDate);
			} else {
				return !this.chooseOneDate;
			}
		},
	},
	methods: {
		nowPrice(day,y){
			return (day,y) => {
				// console.log("day是什么--",day)
				if(!day.date){
					return ""
				}
				// console.log("this.goodsDateTime------", this.goodsDateTime)
				if(this.$store.state.goodsDateTime.length === 0){
					return ""
				}
				// console.log("===============",this.dateSpace(this.initEndDate,day.date))
				// let res1 = this.dateSpace(this.initStartDate,day.date) < 0
				// let res2 = this.dateSpace(this.initEndDate,day.date) > 0
				let res3 = y <= this.outIndex
				let res4 = day <= this.innerIndex
				if(res3 && res4){
					// console.log("不在范围")
					return ""
				}
				let price = null
				let index = undefined;
				for (let i = 0; i < this.goodsDateTime.length; i++) { 
					if(this.goodsDateTime[i].DayTime === day.date){
						index = i
						// price = this.goodsDateTime[i].Price
						this.priceList.push(price)
						// console.log("我是价格数组，算总价的：",this.priceList)
						// if(index !== undefined){
						// 	this.goodsDateTime.splice(index,1)
						// 	// 更新goodsDateTime到 vuex
						// 	// this.$store.commit('update',{"goodsDateTime":this.goodsDateTime})
						// 	console.log("我是这天价格：",day.date,price)
						// }
						return price
					}
				 }
				 return ""
				 
			}
		},
		// 我的初始化
		myInitDate() {
			// 我是初始化
			this.initStartDate = this.option.initStartDate
			this.initEndDate = this.option.initEndDate
			// this.goodsDateTime = this.option.goodsDateTime
			console.log("vuex的1", this.$store.state.goodsDateTime)
			let arr = this.$store.state.goodsDateTime
			this.goodsDateTime = JSON.parse(JSON.stringify(arr))
			// console.log("我是初始化this.goodsDateTime:",this.option.goodsDateTime,this.goodsDateTime,this.initStartDate,this.initEndDate)
			console.log("我是初始化this.goodsDateTime:",this.$store.state.goodsDateTime)
		},
		catchtouchmove() {
			return;
		},
		titleDateFormat(date) {
			//2019年9月格式化
			const _arr = date.split('-');
			return `${_arr[0]}年${_arr[1] - 0}月`;
		},
		getNextMonth(AddDayCount = 6, date = new Date()) {
			//获取x个月后的日期
			if (typeof date !== 'object') {
				date = date.replace(/-/g, '/');
			}
			let dd = new Date(date);
			dd.setMonth(dd.getMonth() + AddDayCount);
			let y = dd.getFullYear();
			let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1;
			let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
			return y + '-' + m + '-' + d;
		},
		getNextDate(day = 1, date = new Date()) {
			var dd = new Date(date);
			dd.setDate(dd.getDate() + day);
			var y = dd.getFullYear();
			var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1;
			var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
			return y + '-' + m + '-' + d;
		},
		noModalSubmit() {
			if (!this.option.isModal && !this.option.isShowSubmit) {
				setTimeout(()=>{
					this.clickSubmit();
				},500)
			}
		},
		clickSubmit() {
			if (!this.isDisabledBtn) {
				//点击确定逻辑
				if (!this.option.isRange) {
					//单选
					this.$emit('change', {
						currentDate: this.chooseOneDate
					});
				} else {
					// 区域选择
					this.$emit('change', {
						startDate: this.currentRangeStartDate,
						endDate: this.currentRangeEndDate,
						dateNum: this.currentDateNum
					});
				}
				this.close();
			}
		},
		dateFirstInit() {
			//首次数据初始化
			if (!this.option.isRange) {
				//单选
				this.chooseOneDate = this.option.chooseOneDate ? this.option.chooseOneDate : this.getNextDate(0);
				this.oneChooseFirstInit();
			} else {
				//区间选择
				this.currentRangeStartDate =  this.option.currentRangeStartDate ? this.option.currentRangeStartDate : this.getNextDate(0);
				// 初始化我的开始
				this.startDate = this.option.currentRangeStartDate
				this.currentRangeEndDate = this.option.currentRangeEndDate ? this.option.currentRangeEndDate : this.getNextDate(1);
				this.rangeChooseFirstInit();
				this.spaceStyleRander();
			}
		},
		oneChooseFirstInit() {
			//首次引用单选初始化
			this.clearOneChoose();
			this.totalDate.forEach(x => {
				x.info.forEach(a => {
					if (a.date == this.chooseOneDate) {
						a.isChoosed = true;
					}
				});
			});
		},
		rangeChooseFirstInit() {
			//首次引用复选初始化
			this.clearRangeChoose();
			this.totalDate.forEach(x => {
				x.info.forEach(a => {
					if (a.date == this.currentRangeStartDate) {
						a.currentRangeStartDate = a.date;
						// 需要初始化当前日期
						this.currentRangeStartDate = a.date
						a.isRangeStart = true;
					}
					if (a.date == this.currentRangeEndDate) {
						a.currentRangeEndDate = a.date;
						// 需要初始化结束日期
						this.currentRangeEndDate = a.date
						a.isRangeEnd = true;
					}
				});
			});
		},

		close() {
			this.isShow = false;
		},
		open() {
			this.isShow = true;
		},
		clickDay(outIndex, innerIndex,x) {
			console.log("我是开始----------------:",this.startDate)
			console.log("我是结束----------------:",this.nowEndDate)
			
			console.log("我是x:",x)
			console.log("我是外索引:",outIndex)
			console.log("我是内索引",innerIndex)
			// 现在的结束日期
			this.nowEndDate = x.date
			this.outIndex = outIndex;
			this.innerIndex = innerIndex;
			if (this.option.isRange) {
				this.chooseRangeInit();
			} else {
				this.chooseOneInit();
			}
		},
		chooseRangeInit() {
			//区域选择点击逻辑
			const _item = this.totalDate[this.outIndex].info[this.innerIndex];
			if (!_item.isDisadled && !_item.isSpace) {
				console.log("我进来点击的第一个判断")
				if (!this.currentRangeStartDate && !this.currentRangeEndDate) {
					console.log("我进来点击的第1-1个判断--选择清空状态",)
					//选择清空状态
					_item.currentRangeStartDate = _item.date;
					_item.currentRangeEndDate = '';
					_item.isRangeStart = true;
					this.currentRangeStartDate = _item.currentRangeStartDate;
					this.currentRangeEndDate = '';
					return;
				}
				if (this.currentRangeStartDate && !this.currentRangeEndDate) {
					console.log("我进来点击的第1-2个判断--选择中")
					//选择中
					if (new Date(_item.date) > new Date(this.currentRangeStartDate)) {
						console.log("我进来点击的第1-2-1个判断--不知道--最后日期赋值")
						_item.currentRangeEndDate = _item.date;
						_item.isRangeEnd = true;
						// 我加的最后的日期
						this.nowEndDate = _item.currentRangeEndDate
						
						this.currentRangeEndDate = _item.currentRangeEndDate;
						this.spaceStyleRander();
						this.noModalSubmit();
						return;
					} else {
						console.log("我进来点击的第1-2-2个判断--最后--开始日期赋值")
						this.startDate =  _item.date
						this.clearRangeChoose();
						_item.currentRangeStartDate = _item.date;
						_item.currentRangeEndDate = '';
						_item.isRangeStart = true;
						this.currentRangeStartDate = _item.currentRangeStartDate;
						this.currentRangeEndDate = '';
						return;
					}
				}
				if (this.currentRangeStartDate && this.currentRangeEndDate) {
					console.log("我进来点击的第最后判断--开始日期赋值")
					// if(this.danxuan ===1){
						// if(this.dateSpace(this.startDate,this.nowEndDate))
						this.startDate =  _item.date
						// this.nowEndDate = _item.date
						console.log("我是开始日期aaa",this.startDate)
						console.log("我是结束日期aaa",this.nowEndDate)
					// }
					//选择好了
					this.clearRangeChoose();
					_item.currentRangeStartDate = _item.date;
					_item.currentRangeEndDate = '';
					_item.isRangeStart = true;
					this.currentRangeStartDate = _item.currentRangeStartDate;
					this.currentRangeEndDate = '';
					this.spaceStyleRander();
					return;
				}
			}
		},
		spaceStyleRander() {
			//区间样式渲染
			this.totalDate.forEach(x => {
				x.info.forEach(a => {
					if (!a.isSpace && new Date(a.date) > new Date(this.currentRangeStartDate) && new Date(a.date) < new Date(this.currentRangeEndDate)) {
						a.isRangeStyle = true;
					} else {
						a.isRangeStyle = false;
					}
				});
			});
		},
		chooseOneInit() {
			//单选点击逻辑
			const _item = this.totalDate[this.outIndex].info[this.innerIndex];
			if (!_item.isDisadled && !_item.isSpace) {
				this.clearOneChoose();
				this.chooseOneDate = _item.date;
				_item.isChoosed = true;
				this.noModalSubmit();
			}
		},
		clearRangeChoose() {
			//清楚区间选择状态
			this.totalDate.forEach(x => {
				x.info.forEach(a => {
					a.currentRangeStartDate = '';
					a.currentRangeEndDate = '';
					a.isRangeStart = false;
					a.isRangeEnd = false;
					a.isRangeStyle = false;
				});
			});
		},
		clearOneChoose() {
			//清楚单选选择状态
			this.totalDate.forEach(x => {
				x.info.forEach(a => {
					if (a.isChoosed) {
						a.isChoosed = false;
					}
					a.currentRangeStartDate = '';
					a.currentRangeEndDate = '';
				});
			});
		},
		getMaxDate(date) {
			//获取某一月份的最大日期数，参数传递类似2019-12-15，返回31
			let _arr = date.split('-');
			return new Date(_arr[0], _arr[1], 0).getDate();
		},
		getMonthBetween(date1, date2) {
			var _date1 = date1.split('-');
			_date1 = parseInt(_date1[0]) * 12 + parseInt(_date1[1]);
			var _date2 = date2.split('-');
			_date2 = parseInt(_date2[0]) * 12 + parseInt(_date2[1]);
			return Math.abs(_date1 - _date2) + 1;
		},
		weekInit(date) {
			//根据日期获得星期几
			var dateArray = date.split('-');
			var date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
			var week = '0123456'.charAt(date.getDay());
			return week;
		},
		totalDateInit() {
			let _dateArr = [];
			let _initStartDate = this.option.initStartDate ? this.option.initStartDate : this.getNextDate(0);
			let _initEndDate = this.option.initEndDate ? this.option.initEndDate : this.getNextMonth(4);
			const _dateNum = this.getMonthBetween(_initStartDate, _initEndDate);
			const _arrStart = _initStartDate.split('-');
			const _arrEnd = _initEndDate.split('-');
			let _year = _arrStart[0] - 0;
			let _month = _arrStart[1] - 0;
			let _day = _arrStart[2] - 0;
			let _dayEnd = _arrEnd[2] - 0;
			this.totalDate = [];
			this.totalDate[0] = {};
			this.totalDate[0]['info'] = [];
			let _objMonth = '';
			_dateArr[0] = `${_year}-${_month < 10 ? '0' + _month : _month}-${_day < 10 ? '0' + _day : _day}`;
			let _num = 0;
			let _objYear = _year;
			for (var i = 1; i < _dateNum; i++) {
				let _obj = {};
				let _objDay = _day;
				if (i == _dateNum - 1) {
					_objDay = _dayEnd;
				}
				if (_month < 12 && i < _dateNum) {
					_month++;
					_objMonth = _month;
					_dateArr.push(`${_objYear}-${_objMonth < 10 ? '0' + _objMonth : _objMonth}-${_objDay < 10 ? '0' + _objDay : _objDay}`);
				} else if (_month == 12 && i < _dateNum) {
					_month = 1;
					_objYear++;
					_dateArr.push(`${_objYear}-01-${_objDay < 10 ? '0' + _objDay : _objDay}`);
				}
				_obj['info'] = [];
				this.totalDate.push(_obj);
			}
			this.totalDate.forEach((x, y) => {
				const _arr = _dateArr[y].split('-');
				const _endDate = _arr[2] - 0;
				let _totalDate = this.getMaxDate(_dateArr[y]) - 0;
				for (var i = 1; i <= _totalDate; i++) {
					let _currentDate = `${_dateArr[y].split('-')[0]}-${_dateArr[y].split('-')[1]}-${i < 10 ? '0' + i : i}`;
					let _obj = {
						date: _currentDate,
						day: i,
						isDisadled: false,
						isChoosed: false,
						isRangeStart: false,
						isRangeEnd: false,
						currentRangeStartDate: '',
						currentRangeEndDate: '',
						isRangeStyle: false
					};
					// 处理今天明天后天
					if (this.getNextDate(0) == _obj.date) {
						_obj.isDayOne = true;
					} else if (this.getNextDate(1) == _obj.date) {
						_obj.isDayTwo = true;
					}
					if (this.getNextDate(2) == _obj.date) {
						_obj.isDayThree = true;
					}

					// 处理周末加亮
					if (this.weekInit(_currentDate) == 0 || this.weekInit(_currentDate) == 6) {
						_obj.isWeekend = true;
					}
					if (this.totalDate.length <= 1) {
						if (y == 0 && (i < _day || i > _dayEnd)) {
							_obj.isDisadled = true;
						}
					} else {
						if ((y == 0 && i < _day) || (y == this.totalDate.length - 1 && i > _dayEnd)) {
							_obj.isDisadled = true;
						}
					}

					x['info'].push(_obj);
				}
				// 处理星期
				let weekDate = `${_dateArr[y].split('-')[0]}-${_dateArr[y].split('-')[1]}-01`;
				for (var i = 0; i < this.weekInit(weekDate); i++) {
					x['info'].unshift({ date: '', date: _dateArr[y], isSpace: true });
				}
			});
		},
		dateSpace(sDate1, sDate2) {
			//sDate1和sDate2是2006-12-18格式 得出量日期之间的天数
			var dateSpan, tempDate, iDays;
			sDate1 = Date.parse(sDate1);
			sDate2 = Date.parse(sDate2);
			dateSpan = sDate2 - sDate1;
			// 我把绝对值absban
			// dateSpan = Math.abs(dateSpan);
			iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
			return iDays;
		}
	}
};
</script>

<style lang="scss" scoped>
.select_date_bg {
	position: fixed;
	top: -10vh;
	left: 0;
	width: 100%;
	height: 10vh;
	background-color: rgba(0, 0, 0, 0.2);
	z-index: 1000;
	transition: all 0.2s;
	&.move {
		top: 0vh;
	}
}
.select_date {
	width: 100%;
	height: 90vh;
	position: fixed;
	top: 100%;
	left: 0;
	background-color: #fff;
	z-index: 10001;
	transition: all 0.2s;
	&.move {
		top: 10vh;
	}
	&.init {
		top: 0;
		height: 100vh;
	}
	> .footer {
		height: 100rpx;
		width: 90%;
		margin: 0 auto;
		background-color: #fff;
		overflow: hidden;
		> view {
			background-color: $primary;
			color: #fff;
			font-size: 26rpx;
			height: 70rpx;
			line-height: 70rpx;
			margin-top: 15rpx;
			text-align: center;
			&.hover {
				background-color: $primary-hover;
			}
			&.disabled {
				background-color: #ccc;
			}
		}
	}

	> .head {
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		position: relative;
		> text {
			&:nth-child(1) {
			}
			&:nth-child(2) {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 20rpx;
				color: $primary;
			}
		}
	}

	> .main {
		height: calc(90vh - 240rpx);
		&.init {
			height: calc(100vh - 80rpx);
		}
		&.show_submit{
			height: calc(100vh - 180rpx);
		}
		.list {
			> .date {
				padding: 0 25rpx;
				display: flex;
				flex-wrap: wrap;
				// 总价格样式
				view {
					&.totalPrices {
						position: absolute;
						font-size: 22rpx;
						width: 80rpx;
						text-align: center;
						bottom: 14rpx;
						left: 10rpx;
						color: #5CC69A;
						&.red{
							color: #ff0000;
						}
					}
				}
				> view {
					width: 100rpx;
					height: 100rpx;
					text-align: center;
					padding: 10rpx 0;
					position: relative;
					> view {
						&:nth-child(1) {
							font-size: 30rpx;
							color: #333;
							height: 60rpx;
							line-height: 60rpx;
						}
					}
					&.disabled {
						background-color: #eee;
						> view {
							color: #999;
						}
					}
					&.weekend {
						> view {
							color: $primary;
						}
					}
					&.choosed {
						background-color: $primary;
						border-radius: 10rpx;
						
						> view {
							color: #fff;
							font-size: 22rpx;
							height: 50rpx;
							line-height: 50rpx;
							
							&.num {
								position: absolute;
								width: 80rpx;
								text-align: center;
								top: -50rpx;
								left: 10rpx;
								background-color: rgba(0, 0, 0, 0.5);
								color: #fff;
							}
						}
					}
					&.range_space {
						background: rgba($primary, 0.2);
						> view {
							color: #333;
						}
					}
				}
			}
			> .title {
				font-size: 30rpx;
				color: #000;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	> .week {
		height: 80rpx;
		padding: 0 25rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #ccc;
		> view {
			width: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: #333;
			&.weekend {
				color: $primary;
			}
		}
	}
}
</style>
