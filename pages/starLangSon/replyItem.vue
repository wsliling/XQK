<template>
	<div class="flex-start-between ptb20">
		<div class="flex-start">
			<div class="avatar">
				<!-- <img src="/static/of/banner.jpg" alt=""> -->
				<image :src="item.MemberHead" mode=""></image>

			</div>
			<div class="center">
				<div class="name ">
					<div class="bold">{{ item.MemberName }}</div>
					<p>{{ formatTime(item.AddTime) }}</p>
				</div>
				<div class="content pt10">{{ item.Comment }}</div>
			</div>
		</div>
		<div class="zan" @click="toZan(item.Id)" :class='{active : item.IsLike}'>
			<div class="collect flex-center" :class='{active : item.IsLike}'>
				<div class="iconfont icon-zan1" :class='{active : item.IsLike}'></div>
				{{ item.LikeNum }}
			</div>
		</div>
	</div>
</template>

<script>
	import { formatTime } from '@/common/util.js'
	import {post} from '@/utils';
	export default {
		props: [
			'item',
			'index'
			], //配置参数
		data() {
			return {
				userId:'',
				token:''
			}
		},
		onLoad() {
		},
		methods: {
			// 获取用户id以及token
			getUserInfo () {
				this.userId = uni.getStorageSync('userId');
				this.token = uni.getStorageSync('token');
			},
			// 点赞
			async toZan (Id) {
				this.getUserInfo()
				let res = await post('Find/FindlikeOperation',{UserId:this.userId,Token:this.token,FindId:Id,TypeStatu:2})
				console.log("点赞返回：",res)
				if (res.code === 0){
					// this.item.IsLike = !this.item.IsLike
					if(res.msg === "点赞成功！") {
						// this.item.LikeNum++
						console.log(this.item.LikeNum)
						// this.$emit("changeItem",{index: this.index,data: this.item,count:true});
						this.$emit("changeItem",{index: this.index,count:true});
						
					}else {
						// this.item.LikeNum--
						console.log(this.item.LikeNum)
						// this.$emit("changeItem",{index: this.index,data: this.item,count:false});
						this.$emit("changeItem",{index: this.index,count:false});
						
					}
				}
				uni.showToast({
				    title:res.msg,
				    icon:'none'
				});
			},
		},
		computed:{
			formatTime (time){
				return (time)=>{
					// console.log('格式化时间：',time,formatTime(time))
					return formatTime(time)
				}
			},
		}
	}
</script>
<style scoped lang="scss">
	.avatar{
		image{
			width:76upx;height:76upx;
			margin-right:20upx;
			border-radius:50%;
		}
	}
	.center{
		text-align:left;
		line-height:1.5;
		.name{
			p{
				color:#999;
				font-size:22upx;
			}
		}
		.content{
			color:#484848;
		}
	}
	.zan{
		line-height:2;
		font-size:26upx;
		color:#666;
		.collect {
			&.active {
				color: $primary;
				// color: red;
			}
		}
		.iconfont{
			margin-right:15upx;
			&.active {
				color: red;
			}
		}
	}
</style>