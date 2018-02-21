<template>
<div>
  <div class="collect-car" v-show="!failed">
    <div>
      <div class="vux-1px-t" style="padding-bottom:0"  v-show="!load">
        <swipeout>
          <swipeout-item @on-close="handleEvents()" @on-open="handleEvents()" @click.native="goCarDetail(car)" v-for="car in collects" :key="car.id">
            <div slot="right-menu">
              <swipeout-button @click.native.stop="onButtonClick($event,car)" slot="right-menu" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="demo-content">
              <div class="collect-box">
                <div class="collect-left">
                  <p v-show="car.carStatus!=01" class="collectChit_car_masklayer"></p>
                  <img v-lazy="car.smallImage.path" alt="smallImage">
                </div>
                <div class="collect-car-right">
                  <p class="collect-p1">奥迪 {{car.carModel}} {{car.modelCode}} {{car.transmissiontype}} {{car.carAir}} {{car.deviceType!=undefined ? car.deviceType : ''}}</p>
                  <p class="collect-p2">经销商：{{car.agcyName}}</p>
                  <p class="collect-p3">二手车价</p>
                  <p class="collect-p4"><span>￥</span>{{(car.price/10000).toFixed(2)}}万</p>
                </div>
              </div>
            </div>
          </swipeout-item>
        </swipeout>
      </div>  
      <none v-show='load' src='../../static/images/nono.png' content='暂无收藏！' shop='shop' jump="car"></none>
    </div>
  </div>
  <failed v-show='failed'></failed> 
</div>
  
</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'
import none from '../../components/null.vue'
import failed from '../../components/failed.vue'
export default {
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton,
    none,
    failed
  },
  data () {
    return {
      collectcar: '',
      collects: [],
      page: 1,
      userId:'',
      cityId:'',
      load:false,
      failed:false
    }
  },
  created(){    
    this.userId = this.$route.query.userId;
    this.cityId = this.$route.query.cityId;
  },
  mounted(){
    this.collectcar = {
      "serviceName":"app.subs.collectList",
      "timestamp":this.$global().timestamp,
      "serialNumber":this.$global().serialNumber,
      "request_data":{
        "page": "",
        "pageSize": "",
        "userId": this.userId,
        "goodType": "1",
        "activityType": ""
      }
    }
    this.collectHttpRequest();
  },
  methods: {
    onButtonClick (event,car) {
      var delData = {
        "serviceName":"app.subs.collect",
        "timestamp":this.$global().timestamp,
        "serialNumber":this.$global().serialNumber,
        "request_data":{
          "goodId": car.releaseNumber,
          "goodType": "1",
          "userId": this.userId,
          "oprType": "del"
        }
      }
      this.$axios(delData).then((response) => {
        this.collectHttpRequest();
      })
    },
    handleEvents () {

    },
    goCarDetail(car){
      if( car.carStatus=="01" ){
        var bridge = getJsBridge();   
        let shareUrl = this.$global().url+"sharecar?releaseNumber="+car.releaseNumber+"&modelLine="+encodeURI(car.modelLine)+"&cityId="+this.cityId;
            bridge.call("startNativeActivity",{url: this.$global().url+"cardetail?releaseNumber="+car.releaseNumber+"&modelLine="+encodeURI(car.modelLine)+"&cityId="+this.cityId, shareTitle:("奥迪"+" "+car.carModel+" "+car.modelCode+" "+car.transmissiontype+" "+car.carAir+" "+car.deviceType).replace(/\sundefined/g,""),shareInfo:"我在奥迪二手车看中一辆车，帮我参谋一下吧",shareImg:car.shareLogo,shareUrl:shareUrl,  title: "-1"});//跳转车辆详情页
      }
    },
    collectHttpRequest(){
      var _this = this;
      this.$axios(this.collectcar).then((response) => {
        if( response.retCode=="0" ){
          if( response.response_data.carInfoEntities.length>0){
            _this.load = false
             _this.collects = response.response_data.carInfoEntities;
          }else{
            _this.load = true
          }
         
          for( let i=0;i<_this.collects.length;i++ ){
              if( _this.collects[i].transmission=="01" ){
                _this.collects[i].transmissiontype = '自动档';
              }else if( _this.collects[i].transmission=='02' ){
                _this.collects[i].transmissiontype = '手动档';
              }else if( _this.collects[i].transmission=='03' ){
                _this.collects[i].transmissiontype = '手自一体';
              }              
            }            
          }else{
            _this.failed=true
          }
      });
    }
  }
}
</script>
