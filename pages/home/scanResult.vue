<template>
	<div>
        <text>{{result}}</text>
	</div>
</template>

<script>
	export default {
		data() {
			return {
                result:'',
			}
		},
		onLoad(option) {
            this.result = option.result;
		},
		methods: {
		}
	}
</script>
<style scoped lang="scss"></style>