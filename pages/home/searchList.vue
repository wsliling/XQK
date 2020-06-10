<template>
	<div class="bgfff plr30">
		<div class="searchBox flex-center-between">
			<div class="city ellipsis bold" @click="navigate('location/cityList')">{{cityName||'定位失败'}}</div>
			<ans-input class="input bold" @confirm="searchInput" :value="keyword" placeholder="输入搜索内容" align="left"></ans-input>
			<div class="date bold flex-column-center-center" @click="$refs.datePicker.open()">
				<p>{{calendarOption.startDate}}</p>
				<span>-</span>
				<p>{{calendarOption.endDate}}</p>
			</div>
		</div>
		<div class="sort flex-center-between plr30">
			<div class="item flex-center" @click="$refs.sort.show()">
				{{sort.label}}
			</div>
			<div class="item flex-center" @click="$refs.sortNum.open()">
				人数
			</div>
			<div class="item flex-center" @click="$refs.sortTag.open()">
				筛选
			</div>
		</div>
		<div class="list">
			<block v-if="!list.length">
				<not-data tipsText="小星君正在规划中，现在不如看看别的推荐" tipsTitle="暂无找到匹配的结果" />
				<h3>为你推荐</h3>
			</block>
			<product-item v-for="(item,index) in list" :key="index" :item="item"></product-item>
			<product-item v-for="(item,index) in recommendList" :key="index" :item="item"></product-item>
			<uni-load-more :loadingType="loadMore" v-if="list.length"></uni-load-more>
		</div>
		<!-- sort筛选 -->
		<w-picker
			mode="selector"
			:options="sortList"
			:value="sort.label"
			@confirm="sortConfirm"
			themeColor="#5cc69a"
			ref="sort"
		></w-picker>
		<!-- 人数 -->
		<uni-popup type="bottom" ref="sortNum">
			<div class="sortNum popup">
				<div class="head flex-center-between">
					<div class="close" @click="$refs.sortNum.close()">取消</div>
					<!-- <h3>人数</h3> -->
					<div class="confirm" @click="sortNumConfirm">确定</div>
				</div>
				<div class="content flex-center-between">
					<p>入住人数</p>
					<uni-number-box @change="changeNumber" :value="l_people"></uni-number-box>
				</div>
			</div>
		</uni-popup>
		<!--筛选特色标签 -->
		<uni-popup type="bottom" ref="sortTag">
			<div class="sortTag popup">
				<div class="head flex-center-between">
					<div class="close" @click="$refs.sortTag.close()">取消</div>
					<h5>筛选</h5>
					<div class="confirm" @click="sortTagConfirm">确定</div>
				</div>
				<div class="content plr30 pb30">
					<h3 v-if="commonSetting.TagsClass">{{commonSetting.TagsClass}}</h3>
					<div class="tag flex-center">
						<div class="item" :class="{'tabActive':index===l_tag}" 
							v-for="(item,index) in sortTagList" :key="index" @click="changeTag(index)"
							>
							{{item.Name}}
						</div>
					</div>
				</div>
			</div>
		</uni-popup>
		<!-- 日历 -->
		<date-picker ref="datePicker" @change="changeDatePicker" :option="calendarOption"></date-picker>
	</div>
</template>

<script>
	import { mapState, mapMutations} from "vuex"; //vuex辅助函数
	import {post,navigate} from '@/utils';
	import {getCityCode} from '@/utils/location';
	import ansInput from '@/components/ans-input/ans-input.vue';
	import productItem from '@/components/productItem.vue'
	import notData from '@/components/notData.vue'
	import wPicker from '@/components/w-picker/w-picker.vue'
	import datePicker from '@/components/date-picker/date-picker.vue';
	export default {
		components:{
			ansInput,productItem,notData,wPicker,
			datePicker},
		data() {
			return {
				navigate,
				userId: "",
				token: "",
				page:1,
				pageSize:10,
				loadMore:0,//0-loading前；1-loading中；2-没有更多了
				isLoad:false,//第一次进来还没有加载过数据，不执行onshow的方法

				keyword:'',
				list:[],
				recommendList:[],
				nowCityName:'',//现在的城市
				// 排序
				sortList:[
					{label:"默认排序",value:"0"},
					{label:"人气排序",value:"1"},
					{label:"价格排序",value:"2"},
					{label:"推荐排序",value:"3"},
					{label:"距离排序",value:"4"},
					{label:"好评排序",value:"5"},
				],
				sort:{label:"默认排序",value:"0"},
				l_people:0,//临时的人数值
				people:0,//人数
				sortTagList:[],//特色标签
				l_tag:'',//临时的特色标签
			}
		},
		computed:{
			// calendarOption--日历参数
			...mapState(['lng','lat','cityName','cityCode','calendarOption','commonSetting'])
		},
		onLoad(e) {
			this.keyword = e.keyword;
			this.nowCityName=this.cityName;
			this.initAllSort();
			this.sortTagList = uni.getStorageSync('tag')
		},
		onShow(){
			console.log(this.cityName)
			if((this.nowCityName!==this.cityName)&&this.isLoad){
				this.nowCityName=this.cityName;
				getCityCode(this.cityName).then((res)=>{
					this.update({
						cityCode:res.data.Code
					});
					this.initAllSort();
				})
			}
		},
		methods: {
			...mapMutations(['update']),
			async getData(){
				this.loadMore =1;
				const res = await post("/Goods/GoodsList_yd",{
					AreaCode:this.cityCode||'',
					Lat:this.lat||0,
					Lng:this.lng||0,
					Page:this.page,
					PageSize:this.pageSize,
					Sort:this.sort.value,
					People:this.people,
					Keywords:this.keyword,
					MinDate:this.calendarOption.currentRangeStartDate,
					MaxDate:this.calendarOption.currentRangeEndDate
				}) 
				this.isLoad||(this.isLoad=true);//加载了数据，如果城市更新了就执行getData
				const data = res.data;
				if(data.length<this.pageSize){
					this.loadMore =2;
				}else{
					this.loadMore =0;
				}
				if(this.page===1){
					this.list = [];
					if(!data.length){
						this.getRecommend();
						return;
					}
				}
				this.list.push(...data);
			},
			// 搜索关键词
			searchInput(e){
				this.keyword = e;
				this.initAllSort();
			},
			// 初始化筛选
			initAllSort(){
				this.page=1;
				this.sort={label:"默认排序",value:"0"};
				this.people=0;
				this.getData();
			},
			// 排序确认
			sortConfirm(e){
				this.sort = e.obj;
				this.page=1;
				this.getData();
			},
			// 改变人数
			changeNumber(e){
				this.l_people = e;
			},
			changeTag(index){
				this.l_tag =index;
			},
			// 人数确认
			sortNumConfirm(){
				this.page=1;
				this.people=this.l_people;
				this.getData();
				this.$refs.sortNum.close()
			},
			// 标签确认
			sortTagConfirm(){
				this.page=1;
				this.keyword=this.sortTagList[this.l_tag].Name;
				this.getData();
				this.$refs.sortTag.close();
			},
			// 获取推荐列表
			async getRecommend(){
				const res = await post("/Goods/GoodsList_yd",{
					Page:1,
					PageSize:12,
					IsRecommend:1,
				}) 
				this.recommendList = res.data;
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
				this.initAllSort();
			},

		},
		onReachBottom(){
			if(this.loadMore===2)return;
			this.page+=1;
			this.getData();
		},
	}
</script>
<style scoped lang="scss">
	.searchBox{
		font-size:32upx;
		height:100upx;
		border:1upx solid #f2f2f2;
		border-radius:7upx;
		box-shadow:0 5upx 10upx #f2f2f2;
		.city{
			width:180upx;
			line-height:100upx;
			padding:0 5upx;
			text-align:center;
			color:$primary;
			border-right:1upx solid #f2f2f2;
		}
		.date{
			color:$primary;
			font-size:28upx;
			width:85upx;
			text-align:center;
			line-height:0.9;
			margin-right:20upx;
		}
	}
	.sort{
		line-height:3;
		.item{
			font-size:24upx;
			&::after{
				content:'';
				display:block;
				border-right:8upx solid #fff;
				border-left:8upx solid #fff;
				border-bottom:15upx solid #666;
				margin-left:8upx;
			}
		}
	}
	.list{
		h3{
			font-size:32upx;
			font-weight:bold;
			line-height:3;
		}
	}
	.sortNum{
		background:#fff;
		.content{
			padding:150upx 30upx;
		}
	}
	.sortTag{
		min-height:450upx;
		.content{
			h3{
				line-height:2.5;
			}
			.tag{
				flex-flow:wrap row;
				.item{
					padding:0 15upx;
					line-height:2;
					margin-right:20upx;
					margin-bottom:20upx;
					background:#eff3f6;
					border-radius:5upx;
				}
			}
		}
	}
	.tabActive{
		background:$primary!important;
		color:#fff;
	}
</style>