<template>
    <view class="TabBar">
        <view class="tab" v-for="(item,index) in list" :key="index" @tap="navigatorTo(item.pagePath)">
            <!-- 判断是否有点击，如果没有就不是激活样式，点击就是激活的样式 -->
            <image class="imgsize" v-if="item.type == 0" :src="current == index ? item.selectedIconPath : item.iconPath" mode="widthFix"></image>
            <!-- 设置一个状态值（type），判断加号是否展示 -->
            <image class="addimgsize" v-if="item.type == 1" src="/static/tabbar/f.png" mode="widthFix"></image>
            <view :class="['text',current == index ?'active':'']">{{item.text}}</view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            current: {
                type: Number,
                default: 0 //默认第一个页面tabbar激活
            }
        },
        data() {
            return {
                list: [{
                        "type": 0,
                        "pagePath": "/pages/tabBar/index/index",
                        "iconPath": "/static/tabbar/ft1.png",
                        "selectedIconPath": "/static/tabbar/ft1_in.png",
                        "text": "首页"
                    },
                    {
                        "type": 0,
                        "pagePath": "/pages/tabBar/starLang/starLang",
                        "iconPath": "/static/tabbar/ft2.png",
                        "selectedIconPath": "/static/tabbar/ft2_in.png",
                        "text": "星语"
                    },
                    {
                        "type": 1,
                        "pagePath": "/pages/tabBar/xingkong/xingkong",
                        "iconPath": "/static/tabbar/f.png",
                        "selectedIconPath": "/static/tabbar/f.png",
                        "text": "星控"
                    },
                    {
                        "type": 0,
                       "pagePath": "/pages/tabBar/order/order",
                       "iconPath": "/static/tabbar/ft3.png",
                       "selectedIconPath": "/static/tabbar/ft3_in.png",
                       "text": "订单"
                    },
                    {
                        "type": 0,
                        "pagePath": "/pages/tabBar/my/my",
                        "iconPath": "/static/tabbar/ft4.png",
                        "selectedIconPath": "/static/tabbar/ft4_in.png",
                        "text": "我的"
                    },
                ]
            }
        },
        methods: {
            navigatorTo(e) {
                uni.switchTab({
                	 url: e,
                })
            }
        }
    }
</script>

<style scoped>
.TabBar {
    position: fixed;
    bottom: 0;
	left: 0;
	right: 0;
    height: 100upx;
    background-color: #fff;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
	z-index: 9;
}
.tab {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.imgsize {
    width: 48upx;
    height: 48upx;
	margin-top: 10upx;
}
.addimgsize {
    width: 80upx;
    height: 80upx;
    margin-top: -30upx;
}
.text {
    font-size: 12px;
	color: #8a8a8a;
}
.text.active{
	color: #5cc69a;
}
</style>