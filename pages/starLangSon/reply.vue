<template>
	<div class="p30 bgfff">
		<reply-item  v-for="(item,index) in 12" :key="index"></reply-item>
		<div class="footer flex-center-between plr30 ptb20">
			<ans-input class="input"  placeholder="写评论..." @input="replyInput"></ans-input>
			<div class="btn-min" @click="submit">评论</div>
		</div>
	</div>
</template>

<script>
	import replyItem from './replyItem.vue';
	import ansInput from '@/components/ans-input/ans-input.vue';
	import {navigate} from '@/utils';
	export default {
		components:{replyItem,ansInput},
		data() {
			return {
				content:'',//评价内容
			}
		},
		onLoad() {
		},
		methods: {
			replyInput(e){
				this.content = e;
			},
			submit(){
				console.log(this.content,'评论内容')
			}
		},
		onReachBottom(){
		},
	}
</script>
<style scoped lang="scss">
.bgfff{
	padding-bottom:100upx;
}
.footer{
	position:fixed;
	bottom:0;
	left:0;
	background:#fff;
	width:100%;
	border-top:1upx solid #e8e8e8;
	.input{
		background:#f5f5f5;
		border:1upx solid #e8e8e8;
		border-radius:10upx;
		width:82%;
		height:60upx;
		line-height:60upx;
	}
	.btn-min{
		border-radius:7upx;
	}
}

</style>