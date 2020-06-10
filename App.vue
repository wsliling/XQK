<script>
	import {initDate,requestHideLoading,getSystemInfoWidth} from '@/utils';
	export default {
		onLaunch: function() {
			// 获取全局配置
			requestHideLoading('System/GetWebConfiguration',{},'get').then(res=>{
				this.$store.commit('update',{
					commonSetting:res.data
				})
			})
		},
		onShow: function() {
			// console.log('app展示了')
			// 获取屏幕宽度,方便适配
			this.$store.commit('update',{"SystemInfoWidth":getSystemInfoWidth()})
			// 初始化日历
			const option = this.$store.state.calendarOption;
			if(!option.currentRangeStartDate){
				const date = new Date();
				let arr = initDate(date);
				option.currentRangeStartDate = initDate(date,'-');
				option.currentRangeEndDate = initDate([arr[0],arr[1]-1,(arr[2]*1)+1],'-');
				option.initStartDate = initDate(date,'-');
				option.initEndDate = initDate([arr[0],(arr[1]*1)+2,arr[2]],'-');//3个月后的今天
				option.startDate = option.currentRangeStartDate.substring(option.currentRangeStartDate.indexOf('-')+1);
				option.endDate = option.currentRangeEndDate.substring(option.currentRangeEndDate.indexOf('-')+1);
			}
			this.$store.commit('update',{
				calendarOption:option
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	@import './common/iconfont.css';
	@import './common/common.scss';
	@import './common/style/main.scss';
	@import './components/uParse/src/wxParse.css';
	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #f8f8f8;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}
</style>
