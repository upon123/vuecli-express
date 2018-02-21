<template>
	<div class="order-Box">
		  <div class="scroll_Box">
        <div id="box">
          <div class="box1">
            <tab :line-width=3 active-color="#bb0a30">
               <tab-item selected active-class="active_item" @on-item-click="AllorderListstatusDesc">全部</tab-item>
               <tab-item active-class="active_item" v-for="(i,index) in Tab" :key="i.id" @on-item-click="orderListstatusDesc(index)">{{i.id}}</tab-item>
            </tab>
          </div>
        </div>		    
		  </div>
      <div style="width:100%;height:0.8rem"></div> 
      <OrderNone v-show="OrderNoneShow"></OrderNone>     
      <div class="_orderBox" v-show="OrderListShow">
        <div class="order_list" @click="Goorderdetail(orderList)" v-for="(orderList,index) in orderLists">
            <div class="orderHeader">
                <p class="orderIndent">订单号：{{orderList.orderSn}}</p>
                <p class="orderPay" ref="orderStatus">{{orderList.statusDesc}}</p>
            </div>
            <div class="orderCenter" v-if="orderList.goodType=='1'">
              <img v-lazy="orderList.imagePath" alt="">
              <div class="orderContent">
                <p class="p1">{{orderList.orderName.replace(/\sundefined/g,'')}}</p>
                <p class='p2'>{{orderList.orderAttrs.regDate != undefined ? orderList.orderAttrs.regDate.substring(0,4) : ''}}年/{{orderList.orderAttrs.mileAge<=100 ? 0.01 : (orderList.orderAttrs.mileAge/10000).toFixed(2)}}万公里/{{orderList.orderAttrs.area}}</p>
              </div>
            </div>
            <div class="orderCenter" v-else>
              <img v-lazy="orderList.imagePath" style="width:1.39rem;height:1.39rem" alt="">
              <div class="orderContent">
                <p class="p1">{{orderList.orderName.replace(/\sundefined/g,'')}}</p>
                <p class='p2'>有效期：{{orderList.effectiveTimer != undefined ? orderList.effectiveTimer.replace(/-/g,".") : ''}}—{{orderList.effectiveEndtime != undefined ? orderList.effectiveEndtime.replace(/-/g,".") : ''}}</p>
              </div>
            </div>
          <div class="orderFooter">
            <p class="orderMoney">支付金额：
            <span>￥{{orderList.orderAmount*10/10}}</span> 
            </p>
            <p class="orderStyle1" @click.stop="payType($event,orderList)" v-show="Topayfor[index]">去支付</p> 
            <p class="orderStyle2" @click.stop="payType($event,orderList)" v-show="customer[index]">联系客服</p>  
            <button class="orderStyle3" @click.stop="payType($event,orderList)" v-show="orderagain[index]">重新下单</button>   
          </div>
        </div> 
      </div>
	</div>

</template>



<script>
import { Tab, TabItem } from 'vux';
import OrderNone from '../our/order-none.vue';

export default {
  components: {
  	Tab,
  	TabItem,
    OrderNone
  },
  data () {
    return {
      thisorderStatus:'',
    	Tab:[
        {id:'待支付',orderStatu:'101001'},
        {id:'未使用',orderStatu:'101004'},
        {id:'已使用',orderStatu:'104004'},
        {id:'退款中',orderStatu:'101005'},
        {id:'已退款',orderStatu:'101006'},
        {id:'已取消',orderStatu:'101002'},
        {id:'已超时',orderStatu:'101003'}
      ],
      returndata:'',
      userId:'',
      orderLists:'',   
      orderList_False:'',
      Topayfor:[],  
      customer:[],  
      orderagain:[],   
      username: '',
      OrderNoneShow:false,  
      OrderListShow:true,   
      userName:'',
      userPhone:'',
      useridCard:'',
      agcyName:'',   
      agcyAddress:'',  
      orderSn:'',  
      statusDesc:'',  
      orderName:'',  
      orderAmount:'',  
      modelLine:'', 
      loginId:'', 
      carStatus:'',  
      releaseNumber:'',  
      carDetail:'',
      transmission:'',
      deviceType:'',
      modelCode:'',
      carModel:'',
      carAir:'',
      transmission_Type:'',
      cityId:''
    }
  },
  created(){
    
  },
  mounted () {
    this.userId = this.$route.query.userId;
    this.cityId = this.$route.query.cityId;
    this.returndata = { 
      "serviceName":"app.query.orderList",
      "timestamp":this.$global().timestamp,
      "serialNumber":this.$global().serialNumber,
      "request_data":{
        "orderStatus":"",
        "userId":this.userId
      }
    }
    this.orderListHttpData();
        
  },
  methods: {    
    AllorderListstatusDesc(){  
          this.returndata.request_data.userId = this.userId;
          this.returndata.request_data.orderStatus = ""; 
          this.orderListHttpData();
    },
    orderListstatusDesc(index){ 
          this.orderLists = '';
          this.returndata.request_data.userId = this.userId;
          this.returndata.request_data.orderStatus = this.Tab[index].orderStatu; 
          this.orderListHttpData();
    },
    orderListHttpData(){
          var _this = this;                 
          this.$axios(this.returndata).then((response) => {
            if( response.response_data!=undefined ){
              _this.orderLists = response.response_data.orders;
              _this.OrderListShow = true; 
              _this.OrderNoneShow = false; 
              _this.Topayfor.length = _this.orderLists.length;
              _this.customer.length = _this.orderLists.length;
              _this.orderagain.length = _this.orderLists.length;
            for( var i=0;i<_this.orderLists.length;i++ ){
                  if( _this.orderLists[i].orderStatus=="101001" ){  
                    _this.Topayfor[i]=true;  
                    _this.customer[i]=false; 
                    _this.orderagain[i]=false; 
                  }else if( _this.orderLists[i].orderStatus=="101002"||_this.orderLists[i].orderStatus=="101003" ){   
                    _this.Topayfor[i]=false; 
                    _this.customer[i]=false;  
                    _this.orderagain[i]=true; 
                  }else if( _this.orderLists[i].orderStatus=="101004" ){ 
                    _this.Topayfor[i]=false; 
                    _this.customer[i]=true;  
                    _this.orderagain[i]=false;  
                  }else  if( _this.orderLists[i].orderStatus=="101007"||_this.orderLists[i].orderStatus=="101005"||_this.orderLists[i].orderStatus=="101006"||_this.orderLists[i].orderStatus=="104004" ){  
                    _this.Topayfor[i]=false;  
                    _this.customer[i]=false; 
                    _this.orderagain[i]=false;  
                  }
              }
            }else if( response.response_data==undefined ){
                _this.OrderListShow = false; 
                _this.OrderNoneShow = true; 
            }
          });
        },
        Goorderdetail(orderList){
          event = event||window.event;
          var bridge = getJsBridge();
          bridge.call("startNativeActivity",{url: this.$global().url+"orderdetail?userId="+this.userId+"&orderSn="+orderList.orderSn, title: "我的订单"}); 
        },
        payType(event,orderList){
          event = event||window.event;
          var bridge = getJsBridge();
          var _this = this;
          if( event.target.innerHTML=='去支付' ){
            this.returndata = {
                  "serviceName":"app.query.orderList",
                  "timestamp":this.$global().timestamp,
                  "serialNumber":this.$global().serialNumber,
                  "request_data":{
                      "userId":this.userId,
                      "orderSn":orderList.orderSn
                    }
                }
          this.$axios(this.returndata).then((response) => {
            if( response.response_data.orders["0"].orderStatus!="101001" ){
              bridge.call("showAlert",{msg:'您的订单已超时！'});
              setTimeout(() => {
                  bridge.call("startNativeActivity",{url: this.$global().url+"paydefeated?userId="+_this.userId+"&orderSn="+orderList.orderSn, title: "订单已超时"}); 
              }, 2000);
            }else{
                  bridge.call("startNativeActivity",{url: this.$global().url+"paychoose?userId="+_this.userId+"&orderSn="+orderList.orderSn+"&loginId="+orderList.dealerCode,title:"在线支付"});   
            };
          })  
        }else if( event.target.innerHTML=='联系客服' ){
          bridge.call("startChatActivity",{id: orderList.dealerCode,name: orderList.shopHomeNick}); 
        }else if( event.target.innerHTML=='重新下单' ){
          var bridge = getJsBridge();
          if( orderList.goodType=='1' ){  
              this.returndata = {
                    "serviceName":"app.query.carDetail",
                    "timestamp":this.$global().timestamp,
                    "serialNumber":this.$global().serialNumber,
                    "request_data":{
                        "releaseNumber":orderList.goodId
                      }
              }
              this.$axios(this.returndata).then((response) => {
                var bridge = getJsBridge();
                _this.releaseNumber = response.response_data.carDetail.releaseNumber;
                _this.modelLine = response.response_data.carDetail.modelLine;
                if( response.retCode==0 ){
                  if( response.response_data.carDetail.carStatus!="01" ){
                    event.target.style = 'background:#666666;color:#333333';
                    event.target.disabled = true;
                    var bridge = getJsBridge();
                        bridge.call("showAlert",{msg:'该商品已售空！'});
                  }else{
                    var bridge = getJsBridge(); 
                    bridge.call("startNativeActivity",{url: this.$global().url+"cardetail?releaseNumber="+_this.releaseNumber+"&modelLine="+_this.modelLine+"&cityId="+_this.cityId, title: "-1"}); 
                  }
                } 
              })
          }else{
              this.returndata = {
                "serviceName":"app.query.activityList",
                      "timestamp":this.$global().timestamp,
                      "serialNumber":this.$global().serialNumber,
                      "request_data":{
                        "activityId":orderList.goodId
                      }
              }
              this.$axios(this.returndata).then((response) => {
                _this.activityId = response.response_data.activitinfos["0"].activityId;
                if( response.retCode==0 ){
                  if( response.response_data.activitinfos["0"].activityState!="1" ){
                    event.target.style = 'background:#666666;color:#333333';
                    event.target.disabled = true;
                    var bridge = getJsBridge();
                        bridge.call("showAlert",{msg:'该商品已售空！'});
                  }else{
                    if( response.response_data.activitinfos["0"].activityType=="2" ){     
                      var bridge = getJsBridge();
                          bridge.call("startNativeActivity",{url: this.$global().url+"groupdetail?activityId="+_this.activityId+"&cityId="+_this.cityId, title: "-1"});
                    }else if( response.response_data.activitinfos["0"].activityType=="3" ){ 
                      var bridge = getJsBridge();
                          bridge.call("startNativeActivity",{url: this.$global().url+"chitdetail?activityId="+_this.activityId+"&cityId="+_this.cityId, title: "-1"});
                    }  
                  }
                }
              })
          }
      }
    }   
  }
}
</script>
