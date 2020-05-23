<template>
	<div class="box">
		<input :type="type" v-model="content"
        	@input="$emit('input', content)" :placeholder="placeholder" 
			confirm-type="search" @confirm="confirm"
		>
		<div class="clear" @click="content=''" v-show="content">
			<uni-icons color="#999" class="" size="20" type="clear" />
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			type:{
				type:String,
				default:'text'
			},
			placeholder:{
				type:String,
				default:'搜索内容'
			}
		},
		data() {
			return {
				content:'',
			}
		},
		onLoad() {
		},
		methods: {
			confirm(){
				// #ifndef APP-PLUS
				uni.hideKeyboard();
				// #endif
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
				this.$emit("confirm",this.content)
			}
		}
	}
</script>
<style scoped lang="scss">
	.box{
		display:flex;
		align-items:center;
		justify-content:space-between;
		border-radius:5upx; 
		padding-left:20upx;
		padding-right:30upx;
		width:100%;
		position:relative;
	}
	input{
		line-height:1em;
		font-size:100%;
		color:#333;
		width:90%;
	}
	.clear{
		position:absolute;
		right:10upx;
		top:0;
		line-height:1;
		font-weight:100;
	}
</style>