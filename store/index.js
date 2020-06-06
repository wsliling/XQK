import Vue from 'vue';
import Vuex from 'vuex';
// import {requestHideLoading} from '@/utils';

Vue.use(Vuex)
/*
	goodsDateTime: [
		{
			DayTime: "2020-05-29", // 其中一个日期，有很多个日期
			ProId: 492,//产品Id
			Price: 492, // 产品价格/间
			Stock: 666, // 当天库存
			SalesNum: undefined // 当天销量 nubmber,为了后面好判断才写undefined
		}
	],
*/
export default new Vuex.Store({
    state:{
        token:'',
        userId:'',
		ProIdArr: [], // 星语添加的关联星球客（预定产品的id组）
        cityName:'',//城市名称
        cityCode:'',//城市代码
        lng:'',
        lat:'',
		aduNum: 0,  // 成人数量
		kidNum: 0,	// 小孩数量
		chooseNum: 1,
		replyObj: {
			isMy: 0,
			index1: 0,
			index2: 0,
		},
		replyAll: {
			FkId: 0,
			CommentId: 0,
			ParentCommentId: 0
		},
        calendarOption:{
            currentRangeStartDate: '', //根默认显示初始时间，可为空,默认今天
            currentRangeEndDate: '', //根默认区间选择显示结束时间，可为空，默认明天
            initStartDate: '', //可选起始时间限制，可为空,默认今天
            initEndDate: '', //可选结束时间限制，可为空,默认4个月后'2020-06-08'
            isRange: true, //是否开启范围选择，必填
            isModal:true,//是否显示日历插件
            dateNum:1,//选择的总天数
            startDate:'',//展示的不带年份的开始日期
            endDate:'',//展示的不带年份的结束日期
        },
				goodsDateTime:[],//产品日期对应的数组
				place: '不显示位置' //发布星语的地址
    },
    getters:{
        getToken(state){
            if(!state.token&&wx.getStorageSync('token')){
                state.token=wx.getStorageSync('token')
            }
            return state.token
        },
        getUserId(state){
            if(!state.userId&&wx.getStorageSync('userId')){
                state.userId=wx.getStorageSync('userId')
            }
            return state.userId
        },
    },
    mutations: {
        /**
         * 在main.js例引入
         * import store from './store/index'
         * 把store挂载到全局
         * Vue.prototype.$store = store;
         */

        /**
         * 这里设置一个统一的方法,大部分用的vuex都是简单的改变一些状态,不需要写过多的mutations
         * 使用方法 例:
         * this.$store.update({"cityName":"北京"})
         * this.$store.commit('update',{"cityName":"北京"})
         * 
         *  config需要传入对象
         * @param {*} state 
         * @param {*Object} config 
         */
        update(state, config) {
            Object.keys(config).map((item, key) => {
                // if(item==='cityName'&&config[item]&&config[item]!=='未授权'){
                    
                // }
                state[item] = config[item]
            })
        },
        // 设置选择银行名称
        initCalendarOption(state, params) {
            state.calendarOption = params;
        },
        // 设置选择我的银行卡
        setSelectMyCard(state, params) {
            state.selectMyCard = params;
        }

    }
    
})

