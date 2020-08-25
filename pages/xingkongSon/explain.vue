<template>
	<view class="comment">
		<div class="newsInfo" v-html="constnt" v-if="constnt"></div>
	</view>
</template>
  
<script>
	import {post} from '@/utils';
	import uParse from '@/components/uParse/src/wxParse.vue';
	export default {
		components:{uParse},
		data() {
			return {
				constnt:'',
			}
		},
		onLoad: function(e) {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			post('System/GetAboutUs').then(res=>{
				let  data = res.data.Content;
				data = data.replace(/[\r]/g,'<br>');
				data = data.replace(/[\t]/g,'&emsp;');
				console.log(data,'data')
				this.constnt = data;
			})
		},
		onShow(){
		},
		methods: {
			
		}
	}
</script>

<style scoped>

.comment{ padding: 0; margin: 0 auto; background: #fff; min-height: 100%;}
.newsInfo{ padding: 30upx;}
.newsInfo .title{ font-size: 30upx;}
.newsInfo .desc{ color: #666; margin: 20upx 0;}
.newsInfo .time{ color: #999; font-size: 26upx;}
.comment {
	height: 100%;
	width: 750upx;
	overflow-x: hidden!important;
	position:relative;
	word-break:break-all; 
}
</style>
