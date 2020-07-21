<template>
	<view>
		<video class="video" :src="url" id="myVideo"></video>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
			};
		},
		onLoad(e){
			console.log(e,'eee')
			this.url = e.url;
		}
	}
</script>

<style lang="scss" scoped>
.video{
	width:100%;
}
</style>
