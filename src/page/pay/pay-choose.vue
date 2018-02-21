<template>
	<div class="chooseBox">
		<div class="car_information_box">
			<div class="car_information" v-if="path == 'activity'">
				<img class="activity_img" :src="imagePath" alt="">
				<div class="information_activity">
					<p class="car_Name">{{orderName}}</p>
					<p class="car_Year_Km_Address">订单编号：<span>{{orderSn}}</span></p>
					<p class="car_Goodprice">
						实付金额：
						<span>
							￥
							<i>{{orderAmount*10/10}}</i>
						</span>
					</p>
				</div>
			</div>
			<div class="car_information" v-else>
				<img class="car_img" :src="imagePath" alt="">
				<div class="information">
					<p class="car_Name">{{orderName.replace(/ undefined/g,'')}}</p>
					<p class="car_Year_Km_Address">订单编号：<span>{{orderSn}}</span></p>
					<p class="car_Goodprice">
						实付金额：
						<span>
							￥
							<i>{{orderAmount*10/10}}</i>
						</span>
					</p>
				</div>
			</div>
		</div>
		<div class="buy_people_box">
			<div class="buy-people">
				<div class="buy_people_thing">
					<div class="message">
						<div class="people">购车人信息</div>
					</div>
				</div>
				<div class="buy_people_thing">
					<div class="name">
						姓<span class="addname">名</span>&nbsp;&nbsp;&nbsp;&nbsp;
						<span>{{consignee}}</span>
					</div>
				</div>	
				<div class="buy_people_thing">
					<div class="phone">
						手机号码&nbsp;&nbsp;&nbsp;&nbsp;
						<span>{{phone}}</span>
					</div>
				</div>	
				<div class="buy_people_thing">
					<div class="id">
						身份证号&nbsp;&nbsp;&nbsp;&nbsp;
						<span>{{certId}}</span>
					</div>
				</div>	
<div class="buy_people_thing">
	<div class="warm_prompt">
		<p>温馨提示：购买成功后，凭验证码将发送到该手机号，凭验证码作为线下核销唯一凭证，请确保手机号正确无误。</p>
	</div>
</div>
			</div>
		</div>
		<div class="pay_type">
			<div class="select_paytype">
				<div>
					选择支付方式
					<span v-model="pay_typeText">{{pay_typeText}}</span>
				</div>
			</div>
			<div class="select_weixin" v-show="weChatPay">
				<div @click="WeixinorZhifubao($event)" :class="{'weixin':yes_weixin}">
					<img src="../../../static/images/pay-weixin.png" alt="">
					<p>微信支付</p>
				</div>
			</div>
			<div class="select_zhifubao" v-show="zhifubao">
				<div @click="WeixinorZhifubao($event)" :class="{'zhifubao':yes_zhifubao}">
					<img src="../../../static/images/pay-zhifubao.png" alt="">
					<p>支付宝支付</p>
				</div>
			</div>
		</div>
		<div class="pay_moneyYes">
			<div class="topayChooseLeft">
				<p>实付意向金：<span>￥{{orderAmount*10/10}}</span></p>
			</div>
			<div @click="SurepayRight" class="Good_moneyYes">
				立即支付
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
		    	responseorders:'', 
		    	yes_weixin:false,
		    	yes_zhifubao:false,
		    	pay_typeText:'请在30分钟内完成支付',
		    	userId:'', 
		    	orderSn:'', 
		    	returndata:'',
		    	goodId:'', 
		    	loginId:'', 
		      	area:'',
		      	imagePath:'', 
		      	orderName:'', 
		      	orderAmount:'', 
		      	consignee:'', 
		      	phone:'', 
		      	certId:'', 
		      	payTypes:'', 
		      	payType:'', 
		      	weChatPay:false, 
		      	zhifubao:true, 
		      	cityId:'',
		      	cityName:'',
		      	payStr:'', 
		      	OprType:'', 
		      	carDetail:'',
		      	transmission:'',
		      	deviceType:'',
		      	modelCode:'',
		      	carModel:'',
		      	carAir:'',
		      	transmission_Type:'',
		      	path: '', 
		    }
  		},
		mounted(){
  			this.userId = this.$route.query.userId;	 
  			this.orderSn = this.$route.query.orderSn; 
  			this.loginId = this.$route.query.loginId; 
  			this.path = this.$route.query.path; 
			this.orderdetailHttpData(); 
	  		this.patternofpaymentHttpData(); 
	  		var _this = this;
  			window.payResult = function(payStatus){
  				var bridge = getJsBridge();
  				if( payStatus=="0" ){	 
    			/*	_this.orderdetailHttp();*/
    				_this.orderOprHttp();
    			}else if( payStatus=="1" ){
    				bridge.call("showAlert",{msg:"支付失败！"});
    			}
  			}
  		},
		methods: {
			patternofpaymentHttpData(){ 
				var _this = this;
				this.returndata = {
		            "serviceName":"app.query.payType",
		            "timestamp":this.$global().timestamp,
		            "serialNumber":this.$global().serialNumber,
		            "request_data":{
		            	  "dealerCode":this.loginId
		              }
		          }						  			        
		        this.$axios(this.returndata).then((response) => {
		        	_this.payTypes = response.response_data.payTypes;
		        	for( let i=0;i<_this.payTypes.length;i++ ){
			        	if( _this.payTypes[i].payTypeCode=='weChatPay' ){
			        		_this.weChatPay = true;
			        	}
			        }
		        });    
			},
			orderdetailHttpData(){ 
				this.returndata = {
		            "serviceName":"app.query.orderList",
		            "timestamp":this.$global().timestamp,
		            "serialNumber":this.$global().serialNumber,
		            "request_data":{
		            	  "userId":this.userId,
		            	  "orderSn":this.orderSn 
		            }
		        }
		        var _this = this;
		        this.$axios(this.returndata).then((response) => {
		        	_this.responseorders = response.response_data.orders["0"];
		        	_this.orderName = _this.responseorders.orderName;
		        	_this.orderAmount = _this.responseorders.orderAmount;
		        	_this.consignee = _this.responseorders.consignee;
		        	_this.phone = _this.responseorders.phone;
		        	_this.certId = _this.responseorders.certId;
		        	_this.orderSn = _this.responseorders.orderSn;
		        	_this.imagePath = _this.responseorders.imagePath;
		        	_this.goodId = _this.responseorders.goodId;
		        })
			},
			WeixinorZhifubao (event) { 
				event = event||window.event;
				if( event.target.lastChild.innerHTML=='微信支付' ){
					this.yes_weixin = true;
					this.yes_zhifubao = false;
					this.payType = 'WECHAT';
				}else if( event.target.lastChild.innerHTML=='支付宝支付' ){
					this.yes_zhifubao = true;
					this.yes_weixin = false;
					this.payType = 'ALIPAY';
				}
			},
			SurepayRight () { 
				var bridge = getJsBridge();
		        var _this = this;
		        if( this.payType == '' ){
		        	bridge.call("showAlert",{msg:"请选择支付方式！"});
		        }else{
		        	this.returndata = { 
				            "serviceName":"app.order.pay",
				            "timestamp":this.$global().timestamp,
				            "serialNumber":this.$global().serialNumber,
				            "request_data":{
				            	  "orderSn":this.orderSn,
				            	  "payType":this.payType        
				            }
			        }
			        this.$axios(this.returndata).then((response) => {
		        		_this.payStr = response.response_data;
			        	var type;
			        	if( response.retCode=="0" ){
			        		if( _this.payType=='ALIPAY' ){
				        		type = 1;
				        		_this.payPortDispose(response,_this.payStr,type);
				        	}else if( _this.payType=='WECHAT'&&response.response_data.return_code=="SUCCESS" ){
				        		type = 2;
				        		_this.payPortDispose(response,_this.payStr,type);
				        	}else if( _this.payType=='WECHAT'&&response.response_data.return_code=="FAIL" ){
				        		bridge.call("showAlert",{msg:response.response_data.return_message});
				        	}
			        	}else if( response.retCode=="1" ){
			        		var bridge = getJsBridge();
			        		bridge.call("showAlert",{msg:'支付异常！'});
			        	}else if( response.retCode=="2" ){
			        		var bridge = getJsBridge();
	    					bridge.call("startNativeActivity",{url:_this.$global().url+"paydefeated?userId="+_this.userId+"&orderSn="+_this.orderSn,title:"订单已超时"});
			        	} 

			        })
		        }  
			},
			orderOprHttp(){
				this.OprType='PAYSUCCESS';
				this.returndata = { 
		            "serviceName":"app.order.orderOpr",
		            "timestamp":this.$global().timestamp,
		            "serialNumber":this.$global().serialNumber,
		            "request_data":{
		            	  "orderSn":this.orderSn,
		            	  "oprType":this.OprType          
		            }
		        }
		        this.$axios(this.returndata).then((response) => {
	        		var bridge = getJsBridge();
		        	if( response.retCode==0 ){
		        		this.orderdetailHttp();
		        	}else{
		        		bridge.call("showAlert",{msg:"变更订单状态失败，支付已成功！"});
		        	}
		        }) 
			},
			orderdetailHttp(){	
				var bridge = getJsBridge();
				this.returndata = {
		            "serviceName":"app.query.orderList",
		            "timestamp":this.$global().timestamp,
		            "serialNumber":this.$global().serialNumber,
		            "request_data":{
		            	  "userId":this.userId,
		            	  "orderSn":this.orderSn         
		            }
		        }
		        var _this = this;
		        this.$axios(this.returndata).then((response) => {
		        	_this.responseorders = response.response_data.orders["0"];
		        	let orderStatus = _this.responseorders.orderStatus;
		        	if(orderStatus == "101004"){
		        		bridge.call("startNativeActivity",{url:_this.$global().url+"paysuccess?userId="+_this.userId+"&orderSn="+_this.orderSn,title:"支付成功"});
		        	}else{
		        		bridge.call("startNativeActivity",{url:_this.$global().url+"paydefeated?userId="+_this.userId+"&orderSn="+_this.orderSn,title:"订单已超时"});
		        	}
		        })
			},
			payPortDispose(response,payStr,type){ 
				var _this = this;
				if( response.retCode=="0" ){
					var bridge = getJsBridge();
	        		bridge.call("goToPay",{orderInfo:payStr,type:type},function(success){
	        			console.log("success =" + success);
	        			if( success=="0" ){	 
	        				_this.orderOprHttp();   	        				
	        			}else if( success=="1" ){
	        				bridge.call("showAlert",{msg:"支付失败！"});
	        			}
	        		})
	        	}
			}
		}		
	}
</script>