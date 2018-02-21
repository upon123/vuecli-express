<template>
<div>
  <div class="collect-car" v-show='!failed'>
    <div>
      <div class="vux-1px-t" v-show="!load">
        <swipeout>
          <swipeout-item @on-close="handleEvents()" @on-open="handleEvents()" @click.native="goGroupbyDetail(collect)" v-for="collect in collects" :key="collect.id">
            <div slot="right-menu">
              <swipeout-button @click.native.stop="onButtonClick($event,collect)" slot="right-menu" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-t">
              <div class="collect-box">
                <div class="collect-left">
                  <p v-show="collect.activityState!=1" class="collectChit_img_masklayer"></p>
                  <div class="collect_Imgbox">
                    <p class="collectGroupby_title">团</p>
                    <img class="collectChit_img" v-lazy="collect.logoUrl" alt="">
                  </div>
                </div>
                <div class="collect-right">
                  <p class="collect-p1">{{collect.activityTitle}}</p>
                  <p class="collect-p2">经销商：{{collect.dealerName}}</p>
                  <p class="collect-p3">团购价</p>
                  <p class="collect-p4">
                  <s style="color:#999999;font-size:.22rem;">原价 {{collect.originalPrice}}元</s>
                  <span>￥</span>{{collect.groupPrice}}
                  </p>
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
      collectgroup: '',
      collects: [],
      page: 1,
      userId:'',
      cityId:'',
      load:false,
      failed:false
    }
  },
  mounted: function() {
    this.userId = this.$route.query.userId;
    this.cityId = this.$route.query.cityId;
    this.collectgroup = {
      "serviceName":"app.subs.collectList",
      "timestamp":this.$global().timestamp,
      "serialNumber":this.$global().serialNumber,
      "request_data":{
        "page": "",
        "pageSize": "",
        "userId": this.userId,
        "goodType": "2",
        "activityType": "2"
      }
    }
    this.collectHttpRequest()
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
        this.collectHttpRequest()
      })
    },
    goGroupbyDetail(collect){
      if( collect.activityState==1 ){
        var bridge = getJsBridge();
            let shareInfo = '我在奥迪二手车发现一个团购，快来看看吧';
            let shareUrl = this.$global().url+"sharegroup?userId="+this.userId+"&activityId="+collect.activityId+"&cityId="+this.cityId+"&ifCollection="+collect.ifCollection;
            bridge.call("startNativeActivity",{url: this.$global().url+"groupdetail?userId="+this.userId+"&activityId="+collect.activityId+"&cityId="+this.cityId+"&ifCollection="+collect.ifCollection,shareTitle:"【团购】"+collect.activityTitle,shareInfo:shareInfo,shareImg:this.$global().shareImg,shareUrl:shareUrl,title:"-1"});
      }
    },
    collectHttpRequest(){
      var _this = this;
      this.$axios(this.collectgroup).then((response) => {
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