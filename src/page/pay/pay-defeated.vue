<template>
  <div class="payDefeated">
    <div class="paydefeated_bgColor"></div>
    <div class="pay_error">
      <div class="error_box">
        <img class="error_img" src="../../../static/images/pay-error.png" alt="">
      </div>
      <div class="errortext_box">
        <p class="error_text">订单已超时！</p>
        <button type="button" class="check_order" @click="goCardetail">查看订单</button>
        <button type="button" class="Continue_to_browse" @click="goBuyCar">重新选车</button>
      </div>
      <div class="pay_again">
        <p class="pay_again_a"><span>*</span>若您在第三方平台完成支付，我们将为您自动退款，退款将在7个工作日到账</p>
      </div>
    </div>
  </div>  
</template>
<script>

  export default {
    components: {

    },
    data () {
        return {
          userId:'',  
          orderSn:'', 
          cityId:'',
          cityName:''
        }
    },
    mounted(){
        this.orderSn = this.$route.query.orderSn;  
        this.userId = this.$route.query.userId; 
        this.cityId = this.$route.query.cityId;
        this.cityName = this.$route.query.cityName;
    },
    methods: {
      goCardetail(){  
        this.$router.push({path:'cardetail',query:{userId:this.userId,orderSn:this.orderSn}});
        var bridge = getJsBridge();   
        bridge.call("startOrderInfoActivity",{url: this.$global().url+"orderdetail?userId="+this.userId+"&orderSn="+this.orderSn, title: "订单详情"});
      },
      goBuyCar(){ 
        this.$router.push({path:'buycar'});
        var bridge = getJsBridge();
          bridge.call("goToBuy",{url: this.$global().url+"buycar"});
    }
  }
}
</script>