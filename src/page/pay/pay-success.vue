<template>
	<div class="paySuccess">
		<div class="paySuccess_bgColor"></div> 
		<div class="pay_success">
			<div class="successimg_box">
				<img class="success_img" src="../../../static/images/pay-success.png" alt="">
			</div>
			<div class="successtext_box">
				<p class="success_text">支付成功!</p>
				<p class="success_voucher">
					凭证码：
					<span>{{documentCode}}</span>
				</p>
				<p class="success_phone">
					手机号：
					<span>{{phone}}</span>
				</p>
				<p class="success_notice">注：凭证码会以手机短信的方式发送至该手机，请妥善保管</p>
				<button type="button" @click="goOrderdetail" class="check_order">查看订单</button>
				<button type="button" @click="goBuycar" class="Continue_to_browse">继续逛逛</button>
			</div>
		</div>
	</div>	
</template>
<script>

	export default {
		data () {
		    return {
			    cityId:'',
			    cityName:'',
			    orderSn:'',	
			    userId:'',
			    returndata:'',
			    phone:'',
			    documentCode:''
		    }
  		},
  		mounted(){
			var bridge = getJsBridge();
			this.userId = this.$route.query.userId;
			this.orderSn = this.$route.query.orderSn;
			this.returndata = {
					"serviceName":"app.query.orderList",
					"timestamp":this.$global().timestamp,
					"serialNumber":this.$global().serialNumber,
				    "request_data":{
				      "orderSn":this.orderSn,
				      "userId":this.userId
				    }
				}
			var _this = this;
			this.$axios(this.returndata).then((response) => {
				_this.phone = response.response_data.orders["0"].phone;
				_this.documentCode = response.response_data.orders["0"].documentCode;
			})	
  		},
		methods: {
			goOrderdetail(){
				var bridge = getJsBridge();
					bridge.call("startOrderInfoActivity",{url: this.$global().url+"orderdetail?userId="+this.userId+"&orderSn="+this.orderSn,title:'订单详情'});
  			},
  			goBuycar(){
  				var bridge = getJsBridge();
					bridge.call("goToBuy",{url: this.$global().url+"buycar"});
  			}
		}
	}
</script>