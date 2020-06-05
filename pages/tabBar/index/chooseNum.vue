<template>
	<view>
		<view class="infoBox">
			<view class="Num">
				人数 {{ allNum }}人
			</view>
			<view class="countBox mg50" v-for="(item,index) in infoArr" :key="index">
				<view class="left">
					<view class="type">
						{{ item.type }}
					</view>
					<view class="describe">
						{{ item.describe }}
					</view>
				</view>
				<view class="right">
					<view class="sub circle" @click="sub(item)">
						-
					</view>
					<view class="countNum">
						{{ item.countNum }}
					</view>
					<view class="add circle" @click="add(item)">
						+
					</view>
				</view>
			</view>
		</view>
		<view class="submit" @click="submit">
			确定
		</view>
	</view>
</template>

<script>
	import {navigateBack} from '@/utils';
	export default {
		data() {
			return {
				infoArr: [
					{
						type:'成人',
						describe: '13岁或以上',
						countNum: 0
					},
					{
						type:'儿童',
						describe: '2-12岁',
						countNum: 0
					}
				],
				res: 0
			}
		},
		onLoad() {
			this.infoArr[0].countNum = this.$store.state.aduNum
			this.infoArr[1].countNum = this.$store.state.kidNum
		},
		computed:{
			allNum () {
				return this.res = this.infoArr[0].countNum + this.infoArr[1].countNum
			}
		},
		methods: {
			// aduNum
			// kidNum
			sub(item) {
				if(item.countNum>0 ) {
					item.countNum--
				}
			},
			add(item) {
				item.countNum++
			},
			submit() {
				let res = this.infoArr[0].countNum + this.infoArr[1].countNum
				navigateBack(0)
				if( res === 0 ){
					return
				}
				this.$store.commit('update',{"aduNum": this.infoArr[0].countNum})
				this.$store.commit('update',{"kidNum": this.infoArr[1].countNum})
				this.$store.commit('update',{"chooseNum": res})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mg50 {
		margin-top: 50upx;
	}
	.infoBox {
		margin-top: 60upx;
		padding: 20upx;
		.Num {
			font-size: 36upx;
		}
	}
	.countBox {
		display: flex;
		justify-content: space-between;
		.left{
			.type {
				font-size: 36upx;
			}
			.describe {
				font-size: 24upx;
				color: #999;
			}
		}
		.right {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 230upx;
			.countNum {
				// margin: 0 40upx;
				line-height: 64upx;
				font-size: 40upx;
			}
			.sub,
			.add{
				text-align: center;
				line-height: 64upx;
				border: 1upx solid $primary;
				border-radius: 50%;
				width: 64upx;
				height: 64upx;
				font-size: 50upx;
				color: $primary;
			}
		}
		
	}
	.submit {
		width: 100%;
		height: 88upx;
		background: rgba(92, 198, 154, 1);
		font-size: 32upx;
		color: rgba(255, 255, 255, 1);
		line-height: 88upx;
		text-align: center;
		position: fixed;
		bottom: 0;
		z-index: 1;
	}	
</style>
