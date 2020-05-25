<template>
	<!-- 设置 ->  (服务条款) (营业执照) -->
	<view class="termsservice">
		<view v-if="terms == 0">
			<view class="terms">
				<view class="termsname">欢迎使用星球客服务条款</view>
				<view class="termsfz">请仔细阅读本《服务条款》其中包含了关于您的法定权利，救济和义务的重要信息。访问或使用星球客平台表示您同意遵守本《服务条款》并受其约束。为便于您使用认证服务，您通过网络页面点击或以其他形式确认本协议的，即视为您已充分理解本协议所有条款，并同意与成成企业订立本协议并接受本协议的约束。如您在同意受本协议内容约束之前，对本协议内容存在疑虑或异议，请您联系我们（电话0396-88158055），以便我们为您进行解释和说明，使您能够充分理解，从而帮助您自主决定是否接受本协议及是否使用我们的服务。 </view>
			</view>
			<view class="terms">
				<view class="termsname">一、服务内容</view>
				<view class="termsfz">本平台向您提供个人实名认证和企业认证服务。个人实名认证服务指信用信息核查平台用户签署了实名认证服务协议，采用身份证实名认证。企业认证是通过上传营业执照和其他资质以及上传法人身份证等信息。</view>
			</view>
			<view class="terms">
				<view class="termsname">二、隐私保护</view>
				<view class="termsfz">1.您在认证时提交给本平台的认证资料，即不可撤销的授权由本平台保留。本平台承诺除法定或约定的事由外，不公开或编辑或透露您的认证资料及保存在本平台的非公开内容用于商业目的，但下列情况除外： 
					</br>1) 您授权本平台透露的相关信息； 
					</br>2) 本平台向国家司法及行政机关提供； 
					</br>3) 第三方和本平台一起为用户提供服务时，该第三方向您提供服务所需的相关信息。 
					</br>2.我们将采取合理的方式以保护您个人资料的安全。我们将使用必要的可以获得的安全技术和程序来保护您的个人资料不被未经授权的访问、使用或泄漏。 
			    </view>
			</view>
			<view class="terms">
				<view class="termsname">三、免责条款</view>
				<view class="termsfz">下列情况时本平台无需承担任何责任： 
					</br>1.由于您将信用信息核查平台账户密码告知他人或未保管好自己的密码或与他人共享信用信息核查平台账户或任何其他非本平台的过错，导致您的个人资料泄露。 
					</br>2.由于不可抗力，例如出现故障、火灾、水灾、雷击、地震、洪水、台风、龙卷风、火山爆发、瘟疫和传染病流行、罢工、战争或暴力行为或类似事件等及其他非因本平台过错而造成的认证信息泄露、丢失、被盗用或被篡改等。 
					</br>3.任何信用信息核查平台用户（包括未成年人用户）向本平台提供错误、不完整、不实信息等造成不能通过认证或遭受任何其他损失。 
			    </view>
			</view>
			<view class="terms">
				<view class="termsname">四、修改和解释权</view>
				<view class="termsfz">1.本平台有权单方随时修改或变更本协议内容，并通过信用信息核查平台公告变更后的协议文本，无需单独通知您。本协议进行任何修改或变更后，您还继续使用实名认证服务的，即代表您已阅读、了解并同意接受变更后的协议内容，且不得因此而要求任何补偿或赔偿；您如果不同意变更后的协议内容，可停止使用我们所提供的服务。 
					</br>2.我们保留对本协议条款、产品和服务以及我们所提供的产品和服务的相关官方网站的最终解释权。 
				</view>
			</view>
		</view>
		<view v-if="terms == 1">
			<view class="business">
				营业执照
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			terms: 0 //0 服务条款  1 营业执照
		};
	},
	onLoad(e) {
		console.log(e.type);
		this.terms = e.type
		if(this.terms == 1){
			uni.setNavigationBarTitle({
			    title: '营业执照'
			});
		}
	},
	methods: {
	}
};
</script>

<style scoped lang="scss">
	.termsservice{
		padding: 0 30upx 70upx;
		.terms{
			padding-top: 40upx;
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
			padding-top: 100upx;
		}
		
	}
	
</style>
