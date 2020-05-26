<template>
	<div class="bgfff">
		<div class="plr30">
			<div class="pro flex-center-between ptb40">
				<div class="info">
					<h4 class="name">萍乡武功山风景区星球客</h4>
					<h4 class="price">￥222</h4>
					<div class="score bold flex-center">
						<div class="iconfont icon-collect"></div> 4.8<span>(20)</span>
					</div>
				</div>
				<img src="/static/of/p1.jpg" mode="widthFix" alt="">
			</div>
			<div class="date flex-center-between p30">
				<div class="start">
					<h3>5月18日</h3>
					<p>入住日期</p>
				</div>
				<div class="total">共1晚</div>
				<div class="end">
					<h3>5月19日</h3>
					<p>离店日期</p></div>
			</div>
			<div class="row flex-center-between">
				<div class="left">入住人数</div>
				<div class="right flex-center">
					<input type="text" placeholder="请选择" disabled />
					<uni-icons type="arrowright" color="#999"/>
				</div>
			</div>
		</div>
		<div class="gap20"></div>
		<div class="userInfo plr30 pt20">
			<h5>预订人信息</h5>
			<div class="row flex-center-between">
				<div class="left">姓名</div>
				<div class="right flex-center">
					<input type="text" placeholder="请输入预订人姓名" />
				</div>
			</div>
			<div class="row flex-center-between">
				<div class="left">手机号</div>
				<div class="right flex-center">
					<input type="Number" placeholder="请输入预订人手机号" />
				</div>
			</div>
		</div>
		<div class="gap20"></div>
		<div class="ceaseInfo plr30 pt20">
			<h5>入住人信息</h5>
			<div class="row flex-center-between">
				<div class="left">入住人</div>
				<div class="right flex-center">
					<input type="text" placeholder="添加入住人（选填）" disabled />
					<div class="btn-min">添加</div>
				</div>
			</div>
			<div class="detail-info plr30">
				<div>温如言</div>
				<p>手机号 186****7286</p>
				<p>身份证 41252819********99</p>
				<p>邮箱 122****278@qq.com</p>
			</div>
		</div>
		<div class="gap20"></div>
		<div class="coupon plr30">
			<div class="row flex-center-between">
				<div class="left">优惠券</div>
				<div class="right flex-center">
					<input type="text" placeholder="无可用" disabled />
					<uni-icons type="arrowright" color="#999"/>
				</div>
			</div>
			<div class="row flex-center-between">
				<div class="left">发票</div>
				<div class="right flex-center">
					<input type="text" placeholder="请选择发票抬头" disabled />
					<uni-icons type="arrowright" color="#999"/>
				</div>
			</div>
		</div>
		<div class="gap20"></div>
		<div class="priceInfo plr30 ptb20">
			<div class="item flex-center-between">
				<p>总金额：</p>
				<p>¥288.00</p>
			</div>
			<div class="item flex-center-between">
				<p>清洁费：</p>
				<p>¥0.00</p>
			</div>
			<div class="item flex-center-between">
				<p>服务费</p>
				<p>¥0.00</p>
			</div> 
			<div class="item flex-center-between">
				<p>优惠券</p>
				<p>-¥0.00</p>
			</div> 
			<div class="totalPrice bold flex-center-between">
				<p>实付金额</p>
				<p>¥288.00</p>
			</div>
		</div>
		<div class="gap20"></div>
		<div class="notice plr30 pb20 pt10">
			<div class="bold">预定须知</div>
			<p>退订规则</p>
			<span>入住前一天可免费取消；入住当天取消订单，扣除房费的60%作为违约金支付给平台。</span>
			<p>入住提示</p>
			<span>平台确认后，可自由入住星球客；平台提供7*24小时客服服务，确保您入住无忧。</span>
			<p>开具发票</p>
			<span>若需要开具房费发票，请您与星球客工作人员协商。</span>
		</div>
		<div class="btn-max">
			提交订单
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
		}
	}
</script>
<style scoped lang="scss">
@import './style.scss';
</style>