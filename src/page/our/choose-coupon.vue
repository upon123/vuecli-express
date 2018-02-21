<template>
    <div class="coupon">
        <div class="yes_coupon">
            <p class="coupon_yes">可使用的优惠券</p>
            <div class="choose_coupon" @click="showToggle(coupon,index)" v-for="(coupon,index) in couponsUse" :key="coupon.id">
                <img src="../../../static/images/pastCoupon1.png" alt="">
                <p class="rmb"><span>{{coupon.cash}}</span>元</p>
                <p class="man" v-if="coupon.conditionPrice == '-1'">无门槛减{{coupon.cash}}元</p>
                <p class="man" v-else>满{{coupon.conditionPrice}}元可用</p>
                <p class="data">有效期:{{coupon.effectiveStartTime.replace('-','.').replace('-','.')}}-{{coupon.effectiveEndTime.replace('-','.').replace('-','.')}}</p>
                <p class="car">支持车系: {{coupon.conditionCarLine.join('、')}}</p>
                <p class="name">{{coupon.dealerName}}</p>
                <div class="yes" v-show="coupon.isShow"></div>
            </div>            
        </div>

        <div class="no_coupon">
            <p class="coupon_no">不可使用的优惠券</p>
            <div class="choose_coupon" v-for="(coupon,index) in couponsNonUse" :key="coupon.id">
                <img src="../../../static/images/pastCoupon.png" alt="">
                <p class="rmb"><span>{{coupon.cash}}</span>元</p>
                <p class="man" v-if="coupon.conditionPrice == '-1'">无门槛减{{coupon.cash}}元</p>
                <p class="man" v-else>满{{coupon.conditionPrice}}元可用</p>
                <p class="data">有效期:{{coupon.effectiveStartTime.replace('-','.').replace('-','.')}}-{{coupon.effectiveEndTime.replace('-','.').replace('-','.')}}</p>
                <p class="car">支持车系: {{coupon.conditionCarLine.join('、')}}</p>
                <p class="name">{{coupon.dealerName}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
               couponsUse: [],
               couponsNonUse: [],
               cash: '',
               activityId: '',
               userId: '',
               dealerCode: '',
               carId: ''
            }
        },
        created(){
            this.userId = this.$route.query.userId;
            this.dealerCode = this.$route.query.dealerCode;
            this.carId = this.$route.query.carId;
        },
        mounted(){
            let _this = this;
            this.couponsHttpRequest();     
            window.getCouponInfo = function(data){
                data = _this.cash+','+_this.activityId;
                return data;
            }                    
        },
        methods:{
            showToggle(coupon,index){   
                let _this = this;   
                if(coupon.isShow == false){ 
                    this.couponsUse.forEach(function(coupon){
                        coupon.isShow = false;
                    });
                    coupon.isShow = !coupon.isShow;
                    this.cash = coupon.cash;
                    this.activityId = coupon.activityId;
                }else{ 
                    coupon.isShow = !coupon.isShow;
                    this.couponsUse.forEach(function(coupon){
                        coupon.isShow = false;
                    });
                    this.cash = '';
                    this.activityId = '';
                }                                                  
            },
            couponsHttpRequest(){
                let couponData = {
                    "serviceName":"app.query.couponList",
                    "timestamp":this.$global().timestamp,
                    "serialNumber":this.$global().serialNumber,
                    "request_data":{
                        "userId": this.userId,
                        "dealerCode": this.dealerCode,
                        "carId": this.carId
                    }
                }
                this.$axios(couponData).then((response) => {
                    this.couponsUse = response.response_data.canUseCouponListEntities;
                    this.couponsNonUse = response.response_data.canNotUseCouponListEntities;
                    for(let coupon in this.couponsUse){
                        this.$set(this.couponsUse[coupon],"isShow",false);
                    }
                })
            }  
        }
    }
</script>