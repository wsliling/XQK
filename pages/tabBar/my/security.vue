<template>
	<!-- 安全中心 -->
	<view class="">
		<view class="tab flex">
			<view class="flex1 flexc" :class="{ 'active': tabIndex == index }" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{ item }}</view>
			<span :style="{ left: tabStyle + 'upx' }"></span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: ['放心入住', '专业客服', '安全无忧'],
				tabIndex: 0,
			}
		},
		computed: {
			tabStyle() {
				console.log((750 / this.tabList.length) * this.tabIndex + (750 / this.tabList.length - 50) / 2);
				return (750 / this.tabList.length) * this.tabIndex + (750 / this.tabList.length - 100) / 2;
			}
		},
		methods:{
			cliTab(index) {
				this.tabIndex = index;
				this.couponStatus = index + 1;
				this.page = 1;
				this.noDataIsShow = false;
				this.hasData = false;
				
			},
		},
		
	}
</script>

<style scoped lang='scss'>
	.tab{
	  height: 92upx;
	  background-color: #fff;
	  position: relative;
	  .active{
	    color: #5CC69A
	  }
	  span{
	    position: absolute;
	    bottom: 0;
	    transition: all .2s;
	    height: 5upx;
	    width: 100upx;
	    background-color: #5CC69A
	  }
	}
	.flex{
		display: flex;
	}
	.flex1{
		flex: 1;
		overflow: hidden;
	}
	.flexc{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
