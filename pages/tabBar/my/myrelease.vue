<template>
	<!-- 我的发布 -->
	<view class="myrelease plr30 bgfff">
		<starLangList class="list p30" :list="list" pageStr="issue" @remove="remove"></starLangList>	
		<!-- 没有更多数据了 -->
		<notData v-if="!list.length"></notData>
		<uni-load-more :loadingType="loadingType" v-if="list.length&&page>1"></uni-load-more>
		
	</view>
</template>

<script>
	import starLangList from '@/components/starLangList.vue';
	import {post,navigate,toast} from '@/utils';
	import notData from '@/components/notData.vue'; //暂无数据
	export default {
		components:{starLangList,notData},
		data(){
			return{
				userId: "",
				token: "",
				list: [],
				page: 1,
				pageSize: 10,
				loadingType: 0, //0加载前，1加载中，2没有更多了
			}
		},
		onLoad(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.init();
			this.getData();
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		methods:{
			init() {
				this.list = [];
				this.page = 1;
				this.loadingType = 0;
			},
			async getData(){
				this.loadingType = 1;
				let result = await post("News/MyFindNewsList", {
					UserId: this.userId,
					Token: this.token,
					Page: this.page,
					PageSize:this.pageSize,
				});
				const data= result.data;
				data.map((item)=> {
					item.PicImg = item.PicNo
				})
				if (this.page === 1) {
					this.list =[];
				}
				this.list = this.list.concat(data);
				if (data.length < this.pageSize) {
					this.loadingType = 2;
				} else {
					this.loadingType = 0;
				}
			},
			remove(params){
				const that = this;
				uni.showModal({
					content:'您确定要取消该发布吗？',
					confirmColor:"#5cc69a",
					cancelColor:'#999',
					confirmColor:'#5cc69a',
					success(e){
						if(e.confirm){
							post('News/DelMyFind',{
								UserId: that.userId,
								Token: that.token,
								IdArr:params.Id
							}).then(res=>{
								toast('删除成功',{icon:true})
								setTimeout(()=>{
									that.init();
									that.getData();
								},1500)
							})
						}
					}
				})

			},
		},
		onPullDownRefresh() { //下拉刷新
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			this.init();
			this.getData();
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		},
		onReachBottom() { //上拉加载
			if (this.loadingType === 2)return;
			this.page+=1;
			this.getData();
		},
	}
</script>

<style lang="scss" scoped>
	.myrelease{
		background: #fff;
		.list{
			width:100%;
			flex-wrap: wrap; 
		}
		.box{
			width: 48%;
			background:rgba(255,255,255,1);
			box-shadow:1upx 1upx 8upx 0px rgba(0, 0, 0, 0.1);
			border-radius:10upx;
			margin-top: 30upx;
			.boximg{
				height: auto;
				image{
					border-radius:10upx 10upx 0 0;
				}
			}
			.boxname{
				padding: 10upx 20upx 20upx 20upx;
				overflow: hidden;
			}
		}
	}
</style>
