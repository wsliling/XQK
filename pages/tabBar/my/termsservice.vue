<template>
	<!-- 设置 ->  (服务条款) (营业执照) (监督我们) -->
	<view class="termsservice">
		<view v-if="terms == 0">
			<view class="terms">
				<view v-html="list.ServiceTerms" class="termsname">{{list.ServiceTerms}}</view>
			</view>
		</view>
		<view v-if="terms == 1">
			<view class="business">
				<image :src="list.BusinessLicense" mode="aspectFill"></image>
			</view>
		</view>
		<view v-if="terms == 2">
			<view class="terms">
				<view class="termsfz">{{list.UsIntro}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { post } from '@/utils'
export default {
	data() {
		return {
			terms: 0 ,//0 服务条款  1 营业执照 2 监督我们
			list:{},
		};
	},
	onLoad(e) {
		this.terms = e.type
		if(this.terms == 1){ 
			uni.setNavigationBarTitle({
			    title: '关于我们'
			});
		}
		if(this.terms == 2){
			uni.setNavigationBarTitle({
			    title: '监督我们'
			});
		}
		this.getWebConfiguration()
	},
	methods: {
		getWebConfiguration(){
			post('System/GetWebConfiguration').then( res=> {
				this.list = res.data
				this.list.ServiceTerms = res.data.ServiceTerms.replace(/<img/g, '<img style="max-width:100%;"');
			})
		}
	}
};
</script>

<style scoped lang="scss">
	.termsservice{
		.terms{
			padding: 40upx 30upx 70upx;
			.termsname{
				font-size:32upx;
				font-weight:500;
				padding-bottom: 10upx;
			}
			.termsfz{
				color: #666666;
			}
		}
		.business{
			font-size: 40upx;
			text-align: center;
			image{
				width: 100%;
				height: 90vh;
			}
		}
	}
</style>
