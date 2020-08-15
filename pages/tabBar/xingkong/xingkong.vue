<template>
	<view>
		<!-- 上面盒子  background:url(bgimg.gif) no-repeat 5px 5px; -->
		<view class="handleBox" :style="{background:`url(${imageSrc}) no-repeat center / 100%`}">
			<!-- <view class="handleBox"> -->
			<!-- <image class="bg2" :style="{background:`url(http://xqk.wtvxin.com/images/wxapp/xingkong-icon/wave2.png) no-repeat center / 100%`}"></image> -->
			<!-- <image class="bg2" :style="{background:`url(${imageSrc}) no-repeat center / 100%`}"></image> -->
			<view class="top">
				<view class="left">
					<view class="lock" :class="{'no-lock':!roomData.Id}">
						<image v-if="roomData.Id" src="http://xqk.wtvxin.com/images/wxapp/xingkong-icon/lock.png" mode="widthFix"></image>
						<image v-else src="@/static/icons/no-lock.png" mode="widthFix"></image>
					</view>
					<view :class="{'no-lock':!roomData.Id}">{{roomData.Id?'已':'未'}}办理入住</view>
				</view>
				<div class="roomNo" @click="onShowRoomWin" v-if="roomData.RoomNo">
					房间号：{{roomData.RoomNo}}
					<div class="icon" v-if="roomList.length>1"><uni-icons type="arrowdown" color="#5cc69a"></uni-icons></div>
					<div class="roomWin" v-if="showRoomWin">
						<p v-for="(item,index) in roomList" :key="index"
							@click.stop="selectRoom(item)">{{item.RoomNo}}</p>
					</div>
				</div>
				<view class="right">
					<view class="icon">
						<image src="http://xqk.wtvxin.com/images/wxapp/xingkong-icon/question.png" mode="widthFix"></image>
					</view>
					<view>使用说明</view>
					<view class="icon">
						<image src="http://xqk.wtvxin.com/images/wxapp/xingkong-icon/camera.png" mode="widthFix"></image>
					</view>
					<view>景区摄像头</view>
				</view>
			</view>
			<!-- 开关盒子 -->
			<view class="switchBox">
				<!-- 一键的三个盒子 -->
				<view class="oneKey">
					<!-- 报修 -->
					<view class="repairs" @click="callService('一键报修')">
						<view class="circle1 juzhong">
							<view class="circle2 juzhong">
								<image src="http://xqk.wtvxin.com/images/wxapp/xingkong-icon/yijianbaoxiu.png" mode="widthFix"></image>
								<view class="">
									一键报修
								</view>
							</view>
						</view>
					</view>
					<!-- 退房 -->
					<view class="check-out" @click="callService('一键退房')">
						<view class="circle1 juzhong">
							<view class="circle2 juzhong">
								<image src="http://xqk.wtvxin.com/images/wxapp/xingkong-icon/yijiantuifang.png" mode="widthFix"></image>
								<view class="">
									一键退房
								</view>
							</view>
						</view>
					</view>
					<!-- 打扫 -->
					<view class="sweep" @click="callService('一键打扫')">
						<view class="circle1 juzhong">
							<view class="circle2 juzhong">
								<image src="http://xqk.wtvxin.com/images/wxapp/xingkong-icon/yijiandasao.png" mode="widthFix"></image>
								<view class="">
									一键打扫
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 开关按钮 -->
				<view class="switchCircleBox">
					<view class="switchCircle1 juzhong">
						<view class="switchCircle2 juzhong">
							<view class="switchCircle3 juzhong">
								<view class="switchCircle4 juzhong">
									<view class="switchCircle5">
										<view class="box juzhong">
											<div class="btn-top" @click="goUrl('xingkongSon/airConditioner/index')">空调</div>
											<div class="center" @click="opemDoor">
												<image src="http://xqk.wtvxin.com/images/wxapp/xingkong-icon/switch.png" mode="widthFix"></image>
												<view class="">{{openDoor}}</view>
											</div>
											<div class="btn-down" @click="goUrl('xingkongSon/lamplight/index')">灯光</div>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <uni-popup ref="opemDoor">
					<div class="pop" >
						<input type="text" v-model="ip" placeholder="id">
						<input type="text" v-model="port" placeholder="端口号">
						<input type="text" v-model="msg" placeholder="要发送的数据/指令">
						<div class="flex-center-between">
							<button @click="closeUDP">取消</button>
							<button @click="sendUDP">发送</button>
						</div>
					</div>
				</uni-popup> -->
			</view>
		</view>
		<!-- 下面盒子 -->
		<view class="infoBox">
			<view class="score">
				<view class="left2 juzhong">
					<circular-progress-bar :canvasWiidth='canvasWiidth' :canvasHeight='canvasHeight' 
					:process='process'  :describe="process>7.5?'优':process<=7.5&&process>5?'良好':process<=5&&process>2.5?'一般':'差'"
					:color="process>7.5?'#5cc69a':process<=7.5&&process>5?'#FFDE39':process<=5&&process>2.5?'#ff9513':'#ff3333'"
					:myCanvasId='myCanvasId'></circular-progress-bar>
					<!-- <view class="left1 juzhong">
						<view class="dataBox juzhong">
							<view class="num">
								{{Rprocess}}
							</view>
							<view class="text">
								差
							</view>
						</view>
						<div class="process-circle rotate90 flipy">
						  <div class="left">
						    <div class="left-process" :style="{transform: 'rotateZ('+leftProcess(Rprocess)+'deg)'}"></div>
						  </div>
						  <div class="right">
						    <div class="right-process" :style="{transform: 'rotateZ('+rightProcess(Rprocess)+'deg)'}"></div>
						  </div>	
						</div>
					</view> -->
				</view>
				<!-- <view class="right1 juzhong">
					建议提示变为“优”后，再进入星球客
				</view> -->
				<view class="data">
					<view class="dataItem juzhong">
						<view class="text">
							温度
						</view>
						<view class="number">
							{{equipment.roomTempl||'--'}}
							<view class="unit">
								℃
							</view>
						</view>
						<view class="rectangle red1">
						</view>
					</view>
					<view class="dataItem juzhong">
						<view class="text">
							湿度
						</view>
						<view class="number">
							{{equipment.roomHumidity1||'--'}}
							<view class="unit">
								%
							</view>
						</view>
						<view class="rectangle green1">
						</view>
					</view>
					<view class="dataItem juzhong">
						<view class="text">
							PM2.5
						</view>
						<view class="number">
							{{equipment.roomPM25_1||'--'}}
						</view>
						<view class="rectangle blue1">
						</view>
					</view>
					<view class="dataItem juzhong">
						<view class="text">
							CO
							<text class="co2">
								2
							</text>
							浓度
						</view>
						<view class="number">
							{{equipment.roomC02_1||'--'}}
						</view>
						<view class="rectangle yellow1">
						</view>
					</view>
				</view>
			</view>
			<!-- 环形图测试 -->
			<!-- 			<div id="progress">
			      <span></span>
			</div> -->
		</view>
		<!-- <tabbar-copy :current="2"></tabbar-copy> -->
		<tabbar :current="2"></tabbar>
	</view>
</template>

<script>
	// import imageSrc from "@/static/xingkong-icon/xingkong-bg.png"
	import circularProgressBar from '@/components/circularProgressBar.vue';
	import tabbar from '@/components/tabbar.vue';
	import {post,get,navigate,switchTab,judgeLogin,toast,throttle} from '@/utils';
	// import uCharts from '@'
	export default {
		components: {
			tabbar,
			circularProgressBar,
		},
		data() {
			return {
				navigate,
				userId:'',
				token:'',
				imageSrc: 'http://xqk.wtvxin.com/images/wxapp/xingkong-icon/xingkong-bg.png',
				// 星控的环形图数据
				process: 6, // 分数 0 ~10
				canvasHeight: 222, // 固定的高度，不用改
				canvasWiidth: 222, // 固定的宽度，不用改
				myCanvasId: 'myCanvasId', // 固定的id，不用改

				udp:null,
				ip:'',
				port:'',
				msg:'',
				roomList:[],
				roomData:{},
				openDoor:'开门',
				showRoomWin:false,
				equipment:{},//设备
			}
		},
		onLoad() {
		},
		onShow(){
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			this.getRoom();
		},
		computed: {
			Rprocess() {
				return this.process
			},
			leftProcess(process) {
				return (process) => {
					return process > 5 ? ((process - 5) / 10 * 360 + 135) >> 0 : 135
					// return process < 5 ? process / 10 * 360 + 135 >> 0 : -45
				}
			},

			rightProcess(process) {
				return (process) => {
					return process < 5 ? (process / 10 * 360 + 135) >> 0 : -45
					// return process > 5 ? (process - 5)/ 10 * 360 + 135 >> 0 : 135
				}
			},
		},
		methods: {
			onShowRoomWin(){
				if(this.roomList.length>1&&!this.showRoomWin){
					this.showRoomWin = true;
				}else{
					this.showRoomWin = false;
				}
			},
			selectRoom(item){
				this.roomData = item;
				this.showRoomWin = false;
			},
			getRoom(){
				post('Udp/GetOrderForRoomNo',{
					UserId: this.userId,
					Token:this.token
				}).then(res=>{
					if(!res.data.length)return;
					this.roomList = res.data;
					this.roomData = res.data[0];
					this.getInfo1();
					this.getInfo2();
					console.log(this.roomData)
				})
			},
			getInfo1(){
				this.getInfo(0).then(res=>{
					if(!res.data)return;
					this.openDoor = res.data.Door_OnOff*1?'关门':'开门'
				})
			},
			getInfo2(){
				this.getInfo(2).then(res=>{
					console.log(res.data,'////')
					if(!res.data)return;
					this.equipment = res.data;
					// this.openDoor = res.data.Door_OnOff*1?'关门':'开门'
				})
			},
			getInfo(type){
				return post('Udp/GetDeviceDetails',{
					UserId: this.userId,
					Token:this.token,
					Id:this.roomData.Id,
					RoomNo:this.roomData.RoomNo,
					Type:type
				})
			},
			createUDP(){
				this.udp = wx.createUDPSocket();
				this.udp.bind();
				this.udp.onMessage(res=>{
					console.log('UDP发生的消息:'+JSON.stringify(res))
				})
				this.udp.onListening(res=>{
					console.log('UDPonListening:'+JSON.stringify(res))
				})
				this.udp.onClose(res=>{
					console.log('关闭UDP:'+JSON.stringify(res))
				})
				this.udp.onError(res=>{
					console.log('错误信息UDP:'+JSON.stringify(res))
				})
				this.udp.onClose(res=>{
					console.log('监听到了UDP关闭了:'+JSON.stringify(res))
				})
				this.udp.onClose(res=>{
					console.log('监听到了UDP关闭了:'+JSON.stringify(res))
				})
			},
			// closeUDP(){
			// 	this.udp.close();
			// 	this.$refs.opemDoor.close();
			// },
			// 开门
			opemDoor(){
				// this.createUDP();
				// this.$refs.opemDoor.open();
				console.log(this.openDoor)
				if(!this.onIsReserve())return;
				this.onButton(9,this.openDoor=='开门'?1:0).then(res=>{
					if(this.openDoor=='关门'){
						this.openDoor = '开门'	
					}else{
						this.openDoor = '关门'
					}
				})
			},
			// 设备控制类型
			// 0://灯光（1-开 0-关）
			// 1://调光-亮度（0-100）（0-25-50-75-100）
			// 2://空调（1-开 0-关）
			// 3://空调-温度（16-30℃）
			// 4://空调-模式（1 冷2 热3 通风0 停止）
			// 5://空调-风速手动（1 低速，2 中速，3 高速，0 停止）
			//9://开关门（1-开；0关）
			onButton(type,typeVal){
				return post('Udp/RoomDeviceControl',{
					UserId:this.userId,
					Token:this.token,
					Id:this.roomData.Id,
					RoomNo:this.roomData.RoomNo,
					Type:type,
					TypeVal:typeVal
				})
			},
			goUrl(url){
				if(!this.onIsReserve())return;
				navigate(url,{id:this.roomData.Id,roomNo:this.roomData.RoomNo})
			},
			// sendUDP(){
			// 	console.log('发送的数据',{
			// 		address:this.ip,
			// 		port:this.port,
			// 		message:this.msg,
			// 	})
			// 	this.udp.send({
			// 		address:this.ip,
			// 		port:this.port,
			// 		message:this.msg,
			// 	})
			// },
			// 判断是否已办理入住
			onIsReserve(){
				if(!this.roomData.Id){
					toast('未办理入住！')
					return false;
				}
				return true;
			},
			// 呼叫服务
			callService(str){
				if(!this.onIsReserve())return;
				post('Udp/CRSaddquestion',{
					Token:this.token,
					UserId:this.userId,
					hotel_id:'cnbjbjlp00',
					asker_name:'留言人姓名',
					asker_mobile:'联系姓名',
					content:`${this.roomData.Hotel_name}${this.roomData.RoomNo}号房请求${str}服务`
				}).then(res=>{
					toast(`已为您提交${str}服务`,{icon:true})
				})
			},
			// 获取屏幕宽度
			getRatio() {
				let w = 0;
				uni.getSystemInfo({
					success: function(res) {
						console.log(res)
						w = res.windowWidth / 375; //按照750的屏宽
					},
				})
				return w
			},
			canvas() {
				//百分比
				// var w =  this.getRatio();
				let w = this.$store.state.SystemInfoWidth
				// var w = 1
				console.log(w)
				let percent = this.process;
				let color = this.color
				let value = percent * 10
				let c_width = this.canvasWiidth / 2 / 2 * w
				let c_height = this.canvasHeight / 2 / 2 * w
				let radius1 = 87 / 2 * w
				let radius2 = 52 / 2 * w
				let radius3 = 66 / 2 * w
				let lineWidth = 14 / 2 * w
				let fontSize1 = 40 / 2 * w
				let fontSize2 = 28 / 2 * w
				let text = this.process
				let describe = this.describe
				let offsetY = 22 / 2 * w
				// const ctx = document.getElementById("myCanvas").getContext("2d");
				let ctx = uni.createCanvasContext(this.myCanvasId, this);
				ctx.save()
				// 阴影的x偏移
				ctx.shadowOffsetX = 0;
				// 阴影的y偏移
				ctx.shadowOffsetY = 0;
				// 阴影颜色
				ctx.shadowColor = 'rgba(0,0,0,0.3)';
				// 阴影的模糊半径
				ctx.shadowBlur = 30 / 2 * w;
				//外圆环
				ctx.beginPath();
				ctx.arc(c_width, c_height, radius1, 0, 2 * Math.PI);
				ctx.strokeStyle = "#fff";
				ctx.fillStyle = "#fff";
				ctx.fill();

				ctx.stroke();
				ctx.restore();
				//内圆环
				ctx.beginPath();
				ctx.arc(c_width, c_height, radius3, 0, 2 * Math.PI);
				// ctx.strokeStyle = "#fff";
				// ctx.fillStyle = "#EDEDED";
				ctx.lineWidth = lineWidth;
				ctx.lineCap = "round";
				ctx.strokeStyle = "#EDEDED";
				// ctx.fill();
				ctx.stroke();
				//内圆环
				ctx.beginPath();
				ctx.arc(c_width, c_height, radius2, 0, 2 * Math.PI);
				ctx.strokeStyle = "#fff";
				ctx.fillStyle = "#fff";
				ctx.fill();
				ctx.stroke();
				//环形图的进度条
				ctx.beginPath();
				ctx.arc(c_width, c_height, radius3, -Math.PI / 2, -Math.PI / 2 + percent / 10 * (Math.PI * 2), false);
				ctx.lineWidth = lineWidth;
				ctx.lineCap = "round";
				ctx.strokeStyle = "rgb(255, 127, 105)";
				ctx.stroke();
				//在中间写字  
				// ctx.font = "bold 40rpx 微软雅黑";  // 字体大小，样式
				// ctx.fillStyle = color;  // 颜色
				// ctx.textAlign = 'center';  // 位置
				// ctx.textBaseline = 'middle';  
				// ctx.moveTo(c_width/2, c_height/2);  // 文字填充位置
				// ctx.fillText(value+"%", c_width/2, c_height/2-20);
				// ctx.fillText("正确率", c_width/2, c_height/2+20);

				ctx.setFontSize(fontSize1);
				// ctx.setFillStyle('#666666');
				ctx.fillStyle = color; // 颜色
				ctx.textAlign = 'center'; // 位置
				ctx.textBaseline = 'middle';
				ctx.fillText(text, c_width, c_height - offsetY)
				ctx.save();
				ctx.restore();

				ctx.setFontSize(fontSize2);
				// ctx.setFillStyle('#666666');
				ctx.fillStyle = color; // 颜色
				ctx.textAlign = 'center'; // 位置
				ctx.textBaseline = 'middle';
				ctx.fillText(describe, c_width, c_height + offsetY)
				ctx.save();
				ctx.restore();
				// 绘制
				ctx.draw(0, 0)

			}
			// canvas () {
			// 	let percent=0.7;

			//     // const ctx = document.getElementById("myCanvas").getContext("2d");
			// 	const ctx = this.$refs.canvas1.getContext("2d");

			//     //外圆环
			//     ctx.beginPath();
			//     ctx.arc(100, 100, 50, 0, 2 * Math.PI);
			//     ctx.strokeStyle = "#fff";
			//     ctx.fillStyle = "#EDEDED";
			//     ctx.fill();
			//     ctx.stroke();
			//     //内圆环
			//     ctx.beginPath();
			//     ctx.arc(100, 100, 40, 0, 2 * Math.PI);
			//     ctx.strokeStyle = "#fff";
			//     ctx.fillStyle = "#fff";
			//     ctx.fill();
			//     ctx.stroke();
			//     //环形图的进度条
			//     ctx.beginPath();
			//     ctx.arc( 100,100, 44, -Math.PI / 2,-Math.PI / 2 + percent * (Math.PI * 2),false);
			//     ctx.lineWidth = 8;
			//     ctx.lineCap = "round";
			//     ctx.strokeStyle = "rgb(255, 127, 105)";
			//     ctx.stroke();
			// }
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
</style>
<style lang="scss" scoped>
	@import './style';
</style>
