<template>
  <div>
      <!--顶部输入框-->
      <div class="white">
          <div class="topinput">
              <input type="text" placeholder="请输入城市名称" :value="inputName" @input="bindKeyInput">
              <img src="/static/images/search.png" class="searchpic absolu">
              <img src="/static/images/cancle.png" class="canclepic absolu" style="z-index:40" @click="bindBlur">
          </div>
      </div>
      <!--右侧字母 左侧列表-->
      <div class="container-inner">
          <div class="searchLetter touchClass">
            <div class="thishotText" @click="clickLetter" data-letter="currentcity">
              <div style="margin-top:0;">当前</div>
              <div style="margin-top:0;">热门</div>
            </div>
            <div v-for="(item, idx) in searchLetter" :key="idx" style="color:#ff6325;font-size:20rpx;" :data-letter="item" @click="clickLetter">
              {{ item }}   
            </div>
          </div>
          <div class="container">
              <scroll-view scroll-y="true" v-bind:style="{height: winHeight + 'px'}" :scroll-into-view="scrollTopId">
              <!--定位当前城市-->
              <div class="item mylocal" id="currentcity">定位当前城市</div>
              <div class="itemlocat mylocal">
                  <div class="name">{{cityName}}</div>
                  <!-- <div class="chose" @click="choseCIty">
                    <img src="/static/images/can.png" class="can">
                    <text>重新定位</text>
                  </div> -->
              </div>
              
                <div class="item">热门城市</div>
                <div class="flex-container cityhot">
                    <div class="name" v-for="item in hotCity" :key="item.id" :data-city="item.name"  @click="bindCity">{{item.name}}</div>
                </div>
                <!--搜索城市-->
                <div class="citylist" v-for="(item,sindex) in searchlist" :key="sindex">
                    <div class="item" :id="item.initial">{{ item.initial }}</div>
                    <div style="padding:20rpx 30rpx;border-bottom:1rpx solid #f4f4f4"  :data-city="item.city" @click="bindCity">
                        {{item.city}}
                    </div>  
                </div>
                <!--城市列表-->
                  <div class="citylist" v-for="(item, idx) in citylist" :key="idx">
                    <div class="item" :id="item.initial">{{ item.initial }}</div>
                    <div style="padding:20rpx 30rpx;border-bottom:1rpx solid #f4f4f4" v-for="(cityItem, index) in item.cityInfo" :key="index" :data-code="cityItem.code" :data-city="cityItem.city" @click="bindCity">
                        {{cityItem.city}}
                    </div>
                  </div>
              </scroll-view>
          </div>
      </div>
      
  </div>
</template>

<script>
// import "../../css/global.css";
// import "../../css/common.css";
import { mapState, mapMutations } from "vuex"; //vuex辅助函数
import city from './city'
export default {
  onLoad(){
    this.setBarTitle();
    this.cityList()
    console.log(city)
  },
  data () {
    return {
        scrollTopId:"",//置顶id
        inputName:"",
        winHeight:"",
        searchLetter:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
        citylist:[],//加载城市列表
        searchlist:[],//搜索城市的列表
        hotCity:[
          {id:1,name:"深圳市"},{id:2,name:"上海市"},{id:3,name:"杭州市"},{id:4,name:"广州市"},{id:5,name:"南京市"},{id:6,name:"武汉市"},{id:7,name:"成都市"},{id:8,name:"北京市"},
        ],
        allCity: city
    }
  },
  watch:{
      inputName(){
        if(this.inputName.length== 0){
          this.searchlist=[]
          this.cityList()
        }
      }
  },
  components: {
    
  },
  computed:{
    ...mapState(["cityName","nowPlace","longitude","latitude"])
  },
  methods: {
    ...mapMutations(["update"]),
     bindBlur(e) {
      this.inputName = '';
      this.searchlist=[]
      this.cityList()
    },
    bindKeyInput(e){  //输入搜索
      //console.log(e)
       this.inputName = e.mp.detail.value;
       // 空搜索框时 取消匹配显示
        if (this.inputName.length < 1) {
          this.searchlist=[]
          this.cityList()
        }
        this.scrollTopId='citylist' 
        this.citylist=[]
        this.auto() 
        
    },
    auto(){
      let inputSd = this.inputName.trim();//去掉空格
      let sd = inputSd.toLowerCase();  //转为小写
      let num = sd.length;
      let finalCityList = [];
      //拼音搜索
      let temp = this.allCity.filter(
        item => {
          let text = item.short.slice(0, num).toLowerCase(); //把拼音转为小写
          // eslint-disable-next-line
          return (text && text == sd);
        }
      );
      //中文搜索
      let tempChinese = this.allCity.filter(
        itemChinese => {
          let textChinese = itemChinese.city.slice(0,num);
          return (textChinese && textChinese == sd)
        }
      )
      if (temp[0]) {
        temp.map(
          item=>{
            let testObj = {}
            testObj.city = item.city
            testObj.code = item .code 
            finalCityList.push(testObj)
          }
        );
        
        this.searchlist = finalCityList
      }else if(tempChinese[0]){
        tempChinese.map(
          item => {
            let testObj = {}
            testObj.city=item.city
            testObj.code=item.code
            finalCityList.push(testObj)
          }
        );
        console.log(finalCityList,"城市集合")
        this.searchlist=finalCityList
      }
    },
    clickLetter(e){
        //console.log(e)
        const showLetter=e.currentTarget.dataset.letter
        this.scrollTopId = showLetter;
    },
    bindCity(e){ //点击城市
      //console.log(e)
      this.update({ cityName: e.currentTarget.dataset.city });
      this.scrollTopId=""  //清空
      this.scrollTopId= 'currentcity'
      this.searchlist=[]
      this.cityList()
      wx.navigateBack()
    },
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "选择城市"
      });
    },
    // 对城市信息进行分组
    cityList(){
      this.citylist=[]
      this.searchLetter.map(
      initial => {
        let tempObj = {};
          // let cityInfo = [];

       tempObj.initial = initial;
         tempObj.cityInfo = this.allCity.filter(
           city => city.initial === initial
           );

           this.citylist.push(tempObj);
        }
     );
    
    },
  },

  created () {
    // let app = getApp()
    const sysInfo = wx.getSystemInfoSync();
    //console.log(sysInfo); 获取设备信息
    this.winHeight = sysInfo.windowHeight;
  }
}
</script>

<style lang="scss" scoped>
  @import "./style";
  .container-inner {
  display: flex;
  flex-direction: row-reverse;
}
.mylocal{
  width:100%;
}
.container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 10rpx;
}

.searchLetter {
  flex-shrink: 0;
  width: 80rpx;
  text-align: center;
  display: flex;
  flex-direction: column;
  color: #666;

}

.searchLetter div {
  margin-top: 20rpx;
}

.touchClass {
  background-color: #fff;
  color: #fff;
  padding-top: 16rpx;
  padding-bottom: 16rpx;
}

.showSlectedLetter {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -100rpx;
  width: 200rpx;
  height: 200rpx;
  border-radius: 20rpx;
  font-size: 52rpx;
  z-index: 1;
}
.thisCityName {
  display: inline-block;
  border: 1rpx solid #ff6325;
  border-radius: 8rpx;
  padding: 10rpx 0;
  font-size: 24rpx;
  color: #ff6325;
  text-align: center;
  min-width: 149.5rpx;
  margin: 16rpx 0;
}

.thishotText {
  color: #ff6325;
  font-size: 20rpx;
  margin: 0 !important;
}
input {
  background-color: #eee;
}

</style>
