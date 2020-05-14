<template>
	<view class="content">
		<calendar @change="change" :startDate="initStartDate" :endDate="initEndDate" :daysCount="daysCount"></calendar>
	</view>
</template>

<script>
	import calendar from '@/components/date-picker/date-picker';
	export default {
		data() {
			return {
				showCaledar: false,
				dateStr: '',
				daysCount: 130,
				singleDate: true,
				
				//初始日期
				initStartDate: '2019-12-06',
				initEndDate: '2019-12-07',
			}
		},
		components: {
			calendar
		},
		onLoad() {

		},
		onBackPress() {
			if (this.showCaledar !== false) {
				this.showCaledar = false;
				return true;
			}
		},
		methods: {
			change({
				choiceDate,
				dayCount
			}) {
				//参数解释
				//1.choiceDate 时间区间（开始时间和结束时间）
				//2.dayCount 共多少晚
			
				// console.log(choiceDate, dayCount);
				console.log('入住从 ' + choiceDate[0].re + '  到 ' + choiceDate[1].re + '  共 ' + dayCount + ' 晚');
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
