<template>
  <div class="bgfff">
      <!--顶部输入框-->
      <div class="search">
          <uni-search-bar :radius="100" placeholder="请输入城市名称" @input="searchInput" @cancel="searchInput"
           cancelButton="none"></uni-search-bar>
      </div>

      <!--右侧字母 左侧列表-->
      <div class="container-inner">
          <div class="searchLetter touchClass">
            <div class="thishotText" @click="clickLetter" data-letter="currentcity">
              <div style="margin-top:0;">当前</div>
              <div style="margin-top:0;">热门</div>
            </div>
            <block v-for="(item, idx) in citylist" :key="idx" >
                <div class="tab" :data-letter="item.initial" @click="clickLetter" v-if="item.cityInfo.length">
                  {{ item.initial }}   
                </div>
            </block>
          </div>
          <div class="container">
              <scroll-view scroll-y="true" v-bind:style="{height: winHeight-52 + 'px'}" :scroll-into-view="scrollTopId" scroll-with-animation>
                <!--定位当前城市-->

                <div class="item mylocal flex-center-between" id="currentcity">
                  <div class="title">定位当前城市</div>
                  <div class="itemlocat" v-if="cityName&&cityName!=='未授权'">
                      <div class="name">{{cityName}}</div>
                  </div>
                  <button class="reload flex-center" open-type="openSetting" v-if="cityName=='未授权'">
                    <uni-icons type="reload"></uni-icons>
                    <p>重新授权</p>
                  </button>
                  <div class="reload flex-center" v-if="!cityName" @click="reloadCity">
                    <uni-icons type="reload"></uni-icons>
                    <p>重新定位</p>
                  </div>
                </div>
                
                  <div class="item title pl30">热门城市</div>
                  <div class="flex-center cityhot">
                      <div class="name" v-for="(item,index) in hotCity" :key="index" :data-city="item.Name"  @click="bindCity">{{item.Name}}</div>
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
                      <div class="item pl30" v-if="item.cityInfo.length">{{ item.initial }}</div>
                      <div style="padding:20rpx 30rpx;border-bottom:1rpx solid #f4f4f4" 
                        v-for="(cityItem, index) in item.cityInfo" :key="index" :data-code="cityItem.code" 
                        :data-city="cityItem.city" @click="bindCity"
                         :id="index===0?item.initial:''"
                        >
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
import {navigateBack,get} from '@/utils';
import {hasPosition} from '@/utils/location';
import { mapState, mapMutations } from "vuex"; //vuex辅助函数
import city from './city';
import pinyin from '@/components/pinyin';
export default {
  data () {
    return {
        scrollTopId:"",//置顶id
        inputName:"",
        winHeight:"",
        searchLetter:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
        citylist:[],//加载城市列表
        searchlist:[],//搜索城市的列表
        hotCity:[],
        allCity: city,
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
    ...mapState(["cityName",'cityCode',"lng","lat"])
  },
  onLoad(){
    this.setBarTitle();
    this.getData();
    console.log(city)
  },
  methods: {
    ...mapMutations(["update"]),
    async getData(){
      const res = await get('Area/AreaList');
      this.allCity=[];
      // 获取到数据，改成需要格式
      res.data.map((item,index)=>{
        // 城市拿到首页拼音
        let piny = pinyin(item.Name,{
              style:pinyin.STYLE_FIRST_LETTER
            });
        let piny2 = ''
        piny.map(pinyItem=>{
          piny2+=pinyItem;
        })
        this.allCity.push({
            id:index,
            'code': item.Code,
            'city': item.Name,
            'initial': piny[0][0].toLocaleUpperCase(),
            'short': piny2
        })
        // 热门城市
        if(item.Istop){
          console.log(item.Istop)
          this.hotCity.push(item)
        }
      })
      console.log(this.hotCity)
      this.cityList()

    },
     bindBlur(e) {
      this.inputName = '';
      this.searchlist=[]
      this.cityList()
    },
    auto(){
      let inputSd = this.inputName.trim();//去掉空格
      let sd = inputSd.toLowerCase();  //转为小写
      // let num = sd.length;
      let finalCityList = [];
      //拼音搜索
      let temp = this.allCity.filter(
        item => {
          return item.short.indexOf(sd)!==-1||item.city.indexOf(inputSd)!==-1
        }
      );
      if (temp[0]) {
        temp.map(
          item=>{
            let testObj = {}
            testObj.city = item.city
            testObj.code = item .code 
            finalCityList.push(testObj)
          }
        );
      }
        
       finalCityList.length?(this.searchlist = finalCityList):this.searchlist =[]
    },
    clickLetter(e){
        this.scrollTopId='';
        const showLetter=e.currentTarget.dataset.letter
        this.scrollTopId = showLetter;
    },
    bindCity(e){ //点击城市
      this.update({ cityName: e.currentTarget.dataset.city });
      // this.cityList()
      navigateBack(100)
    },
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "选择城市"
      });
    },
    // 对城市信息进行分组
    cityList(){
      this.scrollTopId=""  //清空
      this.scrollTopId= 'currentcity'
      this.searchlist=[]
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
    // input的change事件
    searchInput(e){
       this.inputName = e.value;
       // 空搜索框时 取消匹配显示
        if (this.inputName.length < 1) {
          this.searchlist=[]
          this.cityList()
        }
        this.scrollTopId='citylist' 
        this.citylist=[]
        this.auto() 
    },
    // 重新定位
    reloadCity(){
			// 获取定位
			hasPosition().then(res=>{
				this.$store.commit('update',{
					lat: res.lat,
					lng: res.lng,
					cityName:res.address_component.city
				});
			}).catch(err=>{
				// 未授权
				this.$store.commit('update',{
					cityName:err
				});
			});
    }
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
</style>
