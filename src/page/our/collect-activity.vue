<template>
<div>
  <div class="collect-car" v-show="!failed">
    <div>
      <div class="vux-1px-t" v-show="!load">
        <swipeout>
          <swipeout-item @on-close="handleEvents()" @on-open="handleEvents()" @click.native="goActivityDetail(collect)" v-for="collect in collects" :key="collect.id">
            <div slot="right-menu">
              <swipeout-button @click.native.stop="onButtonClick($event,collect)" slot="right-menu" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t">
              <div class="collect-box">
                <div class="collect-left">
                  <p v-show="collect.activityState!=1" class="collectChit_img_masklayer"></p>
                  <img class="collectChit_img" v-lazy="collect.logoUrl" alt="">
                </div>
                <div class="collect-right">
                  <p class="collect-p1">{{collect.activityTitle}}</p>
                  <p class="collect-p2">活动时间：{{collect.startTime.replace(/-/g,".")}}-{{collect.endTime.replace(/-/g,".")}}</p>
                  <p class="collect-p3">经销商：{{collect.dealerName}}</p>
                </div>
              </div>            
            </div>
          </swipeout-item>
        </swipeout>
      </div>
      <none v-show='load' src='../../static/images/nono.png' content='暂无收藏！' shop='shop' jump="activity"></none>
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
      collectactivity: '',
      collects: [],
      page: 1,
      userId:'',
      cityId:'',
      load:false,
      failed:false,
    }
  },
  mounted: function() {
    this.userId = this.$route.query.userId;
    this.cityId = this.$route.query.cityId;
    this.collectactivity = {
      "serviceName":"app.subs.collectList",
      "timestamp":this.$global().timestamp,
      "serialNumber":this.$global().serialNumber,
      "request_data":{
        "page": "",
        "pageSize": "",
        "userId": this.userId,
        "goodType": "2",
        "activityType": "1"
      }
    }
    this.collectHttpRequest();
  },
  methods: {
    onButtonClick (event,collect) {
      var delData = {
        "serviceName":"app.subs.collect",
        "timestamp":this.$global().timestamp,
        "serialNumber":this.$global().serialNumber,
        "request_data":{
          "goodId": collect.activityId,
          "goodType": "2",
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
    goActivityDetail(collect){
      if( collect.activityState==1 ){
        var bridge = getJsBridge();
            let shareInfo = '我在奥迪二手车发现一个活动，快来看看吧';
            let shareUrl = this.$global().url+"shareactivity?userId="+this.userId+"&activityId="+collect.activityId+"&cityId="+this.cityId+"&ifCollection="+collect.ifCollection;
            bridge.call("startNativeActivity",{url: this.$global().url+"activitydetail?userId="+this.userId+"&activityId="+collect.activityId+"&cityId="+this.cityId+"&ifCollection="+collect.ifCollection,shareTitle:"【活动】"+collect.activityTitle,shareInfo:shareInfo,shareImg:this.$global().shareImg,shareUrl:shareUrl,title:"-1"});
      }
    },
    collectHttpRequest(){
      var _this = this;
      this.$axios(this.collectactivity).then((response) => {
        if( response.retCode=="0" ){
          if( response.response_data.activityInfoEntities.length>0){
            _this.load = false
            _this.collects = response.response_data.activityInfoEntities;  
          }else{
            _this.load = true
          }
                  
        }else{
          _this.failed=true;
        }
      });
    }
  }
}
</script>