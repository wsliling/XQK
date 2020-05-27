<template>
	<div class="box">
		<input :type="type" v-model="value"
        	@input="$emit('input', content)" :placeholder="placeholder" 
			confirm-type="search" @confirm="confirm"
		>
		<div class="clear" @click="content=''" v-if="content">
			<uni-icons color="#ccc" class="" size="20" type="clear" />
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
			value:{
				type:String,
				default:''
			},
			placeholder:{
				type:String,
				default:'搜索内容'
			}
		},
		data() {
			return {
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
				this.$emit("confirm",this.value)
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
		height:100%;
		line-height:100%;
		position:relative;
	}
	input{
		line-height:1em;
		font-size:100%;
		color:#333;
		width:95%;
		height:100%;
		line-height:100%;
	}
	.clear{
		position:absolute;
		right:10upx;
		top:0;
		height:100%;
		line-height:100%;
		font-weight:100;
		display:flex;
		align-items:center;
	}
</style>