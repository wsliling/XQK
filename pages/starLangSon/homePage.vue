<template>
	<div class="bgfff">
		<div class="plr30 header pt30">
			<div class="user flex-center-between">
				<div class="info flex-center">
					<img src="/static/of/p1.jpg" alt="">
					<div class="name">名字</div>
				</div>
				<div class="btn-min" v-if="type">编辑资料</div>
				<div class="btn-min ta" v-else>关注</div>
			</div>
			<div class="fans flex-center">
				<div class="item"><span>1</span>关注</div>
				<div class="item"><span>1</span>粉丝</div>
			</div>
			<div class="intro">个人简介</div>
		</div>
		<div class="gap20"></div>
		<div class="listBox plr30">
			<h3>{{type?'我的':'Ta的'}}发布(4)</h3>
			<div class="list">
				<star-lang-list :list="datalist"></star-lang-list>
			</div>
		</div>
	</div>
</template>

<script>
	import starLangList from '@/components/starLangList.vue';
	export default {
		components:{starLangList},
		data() {
			return {
				type:0,//1--我的主页；0--他人主页
				datalist:[
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p2.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗窗，这扇窗~',
					},
					{
						pic:'/static/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为这扇窗~',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇窗~旅行为我门的生活打开了一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p1.jpg',
						name:'旅行为我门的生活打开了一扇窗，这扇一扇窗，这扇窗~',
					},
					{
						pic:'/static/of/p3.jpg',
						name:'旅行为我门的生活打开了',
					},
				]
			}
		},
		
		onLoad(options) {
			this.type = options.type;
			this.setPage();
		},
		methods: {
			setPage(){
				uni.setNavigationBarTitle({
					title:this.type?'我的主页':'他人主页'
				})
			}
		},
		onReachBottom(){
		},
	}
</script>
<style scoped lang="scss">
.header{
	.user{
		.info{
			img{
				width:140upx;height:140upx;
				border-radius:50%;
				margin-right:20upx;
			}
			.name{
				font-size:34upx;
			}
		}
		.btn-min{
				font-size:24upx;
				color:#666;
				border-color:#ccc;
				background:#fff;
				border-radius:8upx;
				line-height:2;
				&.ta{
					color:#fff;
					background:$primary;
					border-color:#fff;
				}
		}
	}
	.fans{
		color:#999;
		line-height:3;
		&>div{
			margin:0 20upx;
		}
		span{
			font-size:32upx;
			color:#333;
		}
	}
	.intro{
		border-top:1upx solid #e8e8e8;
		padding:15upx 0;
		line-height:1.5;
		color:#666;
	}
}
.listBox{
	h3{
		line-height:3;
	}
	.list{
		width:100%;
		flex-flow:row wrap;
	}
}
</style>