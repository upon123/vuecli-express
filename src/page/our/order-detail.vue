<template>
	<div class="order_detail">
		<div class="order_number_box">
			<div class="order_number">
				订单编号&nbsp;&nbsp;&nbsp;&nbsp;
				<span>{{orderSn}}</span>
				<span class="order_numbertype">
					状态：
					<span>{{statusDesc}}</span>
				</span>	
			</div>
		</div>
		<div class="seller">
			<div class="seller-message">
				<h4 v-model="lists">经销商：{{shopHomeNick}}</h4>
				<div class="address">
					<span class="add">地</span>址：{{shopHomeAddress}}
				</div>	
			</div>
		</div>
		<div class="car_information_box">
			<div class="car_information">
				<div v-if="responseorders.goodType=='1'">
					<img class="car_img" v-lazy="imagePath" alt="">
					<div class="information">
						<p class="car_Name">{{orderName}}</p>
						<p class="car_Year_Km_Address">{{orderAttrs.regDate.substring(0,4)}}年/{{orderAttrs.mileAge<=100 ? 0.01 : (orderAttrs.mileAge/10000).toFixed(2)}}万公里/{{orderAttrs.area}}</p>
						<p class="car_Price">二手车价：<span>￥{{price}}万</span></p>
						<p class="car_Goodprice">
							支付金额：
							<span>
								￥
								<i>{{orderAmount*10/10}}</i>
							</span>
						</p>
					</div>
				</div>
				<div v-else>
					<img class="car_img" style="width:2.1rem;height:2.1rem" v-lazy="imagePath" alt="">
					<div class="information">
						<p class="car_Name">{{orderName}}</p>
						<p class="car_Year_Km_Address">有效期：{{responseorders.effectiveTimer.replace(/-/g,".")}}—{{responseorders.effectiveEndtime.replace(/-/g,".")}}</p>
						<p class="car_Goodprice">
							支付金额：
							<span>
								￥
								<i>{{orderAmount*10/10}}</i>
							</span>
						</p>
					</div>
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
						姓<span class="addname">名</span>&nbsp;&nbsp;
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

				</div>
			</div>
		</div>
		<div class="invoice_box">
			<div class="invoice">
				<p class="invoice_title">凭证码</p>
				<div class="invoice_Content">
					<p>{{documentCode}}</p>
				</div>
				<span>重要信息，请妥善保管！</span>
			</div>
		</div>
		<div>
			<div class="pay_money" v-show="hasused">
				<div @click="topayService" class="pay_service">
					<p>联系客服</p>
				</div>
			</div>
			<div class="pay_money" v-show="nopayment">
				<div class="pay_moneyLeft" @click="order_DrawbackOff">
					<p>取消订单</p>
				</div>
				<div @click="toPayChoose" class="Good_money">
					<p>立即支付</p>
				</div>
			</div>
			<div class="pay_money" v-show="noused">
				<div class="pay_moneyLeft" @click="order_RequestOff">
					<p>申请退款</p>
				</div>
				<div @click="topayService" class="Good_money">
					<p>联系客服</p>
				</div>
			</div>
		</div>
		<div class="orderlayer" v-show="orderlayerShow">
			<div class="order_Drawback" v-show="order_Drawback">
				<img @click="turnOff" class="turnoff" src="../../../static/images/turnoff.png" alt="">
				<p class="order_Drawbacktitle">订单取消申请</p>	
				<div class="order_Causes">
					<p @click="causeType($event)" class="first_cause" ref="cause_one">现在不想买了</p>
					<p @click="causeType($event)" class="cause_two" ref="cause_two">重复下单了</p>
					<p @click="causeType($event)" class="cause_three" ref="cause_three">商品价格比较贵</p>
					<p @click="causeType($event)" class="cause_four" ref="cause_four">未开发票</p>
					<p @click="causeType($event)" class="cause_five" ref="cause_five">联系人填写错误</p>
					<p style="clear:both;"></p>
				</div>
				<textarea @focus="Textarea_focus($event)" v-model="order_Textarea" class="order_textarea" placeholder="其他取消理由"></textarea>
				<button @click="Drawback_submit" type="button">确认提交</button>
			</div>
			<div class="order_Request" v-show="order_request">
				<h2>确认申请退款</h2>
				<div class="Request_btnBox">
					<button type="button" @click="Request_YesNo($event)" class="Request_btnYes">确定</button>
					<button type="button" @click="Request_YesNo($event)" class="Request_btnNo">取消</button>
					<p style="clear:both"></p>
				</div>	
			</div>
		</div>
	</div>
</template>
<script>

	export default{
		components:{
			
		},
	    data () {
	      return {
	      	orderlayerShow:false,	 
	      	order_request:false,	 
	      	order_Drawback:false,	 
	      	oprType:'',	 
	      	AllCausetype:[
	      		{cause:'现在不想买了',causeStyle:false},
	      		{cause:'重复下单了',causeStyle:false},
	      		{cause:'商品价格比较贵',causeStyle:false},
	      		{cause:'未开发票',causeStyle:false},
	      		{cause:'联系人填写错误',causeStyle:false}
	      	],
	      	Causetype:'',	 
	      	order_Textarea:'',	 
	      	nopayment:false,	 
	      	noused:false,	 
	      	hasused:false,	 
	      	userName:'',
	      	userPhone:'',
	      	useridCard:'',
	      	lists:[
				{seller:"北京百得利销售服务有限服务公司"}
			],
			ValidCoupons:JSON.parse(localStorage.getItem('ValidCoupons')),
			returndata:'',
			detaildata:'',
			page:0,
			userId:'',
			responseorders:'',
			shopHomeNick:'',	 
			shopHomeAddress:'',	 
			orderName:'',	 
			orderAttrs:'', 
			orderAmount:'', 
			consignee:'', 
			phone:'', 
			certId:'', 
			orderSn:'', 
			imagePath:'', 
			orderStatus:'', 
			statusDesc:'',	 
			documentCode:'', 
			goodId:'',
			carDetail:'',
			transmission:'',
	      	deviceType:'',
	      	modelCode:'',
	      	carModel:'',
	      	carAir:'',
	      	transmission_Type:'',
	      	orderType:'',
	      	loginId:'', 
	      	price:''
	      }
	    },
	    mounted(){
	    	this.userId=this.$route.query.userId;
	    	this.orderSn=this.$route.query.orderSn;
	    	this.orderType = this.$route.query.orderType;
			this.returndata = {
	            "serviceName":"app.query.orderList",
	            "timestamp":this.$global().timestamp,
	            "serialNumber":this.$global().serialNumber,
	            "request_data":{
	                  "userId":this.userId,
	                  "orderSn":this.orderSn
	              }
	        }
	        this.orderDetailHttpData();
		},
	    methods:{
	    	orderDetailHttpData () {
		  		var _this = this;	  			        
		        this.$axios(this.returndata).then((response) => {
		        	_this.responseorders = response.response_data.orders["0"];
		        	_this.shopHomeNick = _this.responseorders.shopHomeNick;
		        	_this.shopHomeAddress = _this.responseorders.shopHomeAddress;
		        	_this.orderName = _this.responseorders.orderName;
		        	_this.orderAttrs=_this.responseorders.orderAttrs;
		        	_this.orderAmount = _this.responseorders.orderAmount;
		        	_this.consignee = _this.responseorders.consignee;
		        	_this.phone = _this.responseorders.phone;
		        	_this.certId = _this.responseorders.certId;
		        	_this.orderSn = _this.responseorders.orderSn;
		        	_this.imagePath = _this.responseorders.imagePath;
		        	_this.orderStatus = _this.responseorders.orderStatus;
		        	_this.statusDesc = _this.responseorders.statusDesc;
		        	_this.documentCode = _this.responseorders.documentCode;
		        	_this.goodId = _this.responseorders.goodId;
		        	_this.loginId = _this.responseorders.dealerCode;	 
		        	_this.price = (_this.responseorders.price/10000).toFixed(2);	 


		        	if( _this.orderStatus=='101001' ){
		        		_this.nopayment=true;	 
				      	_this.noused=false;	 
				      	_this.hasused=false;	 
		        	}else if( _this.orderStatus=='101004' ){
		        		_this.nopayment=false;	 
				      	_this.noused=true;	 
				      	_this.hasused=false;	 
		        	}else if( _this.orderStatus=='101007' ){
		        		_this.nopayment=false;	 
				      	_this.noused=false;	 
				      	_this.hasused=true;	 
		        	}else{
		        		_this.nopayment=false;	 
				      	_this.noused=false; 
				      	_this.hasused=false; 
		        	}
		        });
		  	},
		  	causeType(event){	 
		  		event = event||window.event;
		  		var causeType_style = event.target.innerHTML;
		  		for( let i=0;i<event.target.parentNode.children.length;i++ ){
		  			event.target.parentNode.children[i].style.background = '#ffffff';
		  			event.target.parentNode.children[i].style.color = '#999999';
		  		}
		  		event.target.style.background = '#000000';
		  		event.target.style.color = '#ffffff';
		  		this.Causetype = causeType_style;
		  	},
		  	Textarea_focus(event){	 
		  		event = event||window.event;
		  		this.$refs.cause_one.style = 'background:#fffff;color:#99999';
		  		this.$refs.cause_two.style = 'background:#fffff;color:#99999';
		  		this.$refs.cause_three.style = 'background:#fffff;color:#99999';
		  		this.$refs.cause_four.style = 'background:#fffff;color:#99999';
		  		this.$refs.cause_five.style = 'background:#fffff;color:#99999';
		  	},
		  	order_DrawbackOff(){ 
		  		this.orderlayerShow = true;	
		  		this.order_Drawback = true;
		  	},
		  	order_RequestOff(){
		  		var _this = this;
		  		this.returndata = {
		  			"serviceName":"app.query.orderList",
		            "timestamp":this.$global().timestamp,
		            "serialNumber":this.$global().serialNumber,
		            "request_data":{
		                  "userId":this.userId,
		                  "orderSn":this.orderSn
		            }
		  		}
		  		this.$axios(this.returndata).then((response) => {
		  			var bridge = getJsBridge();
		  			if( response.response_data.orders["0"].orderStatus!='101004' ){
		  				bridge.call("showAlert",{msg:"订单状态错误"});
		  				_this.orderDetailHttpData();
		  			}else{
		  				_this.orderlayerShow = true;
		  				_this.order_request = true;
		  			}
		  		});
		  	},
		  	Drawback_submit(){ 
		  		this.oprType = 'CANCEL'; 
		  		var _this = this;
		  		this.returndata = {
		  			"serviceName":"app.query.orderList",
		            "timestamp":this.$global().timestamp,
		            "serialNumber":this.$global().serialNumber,
		            "request_data":{
		                  "userId":this.userId,
		                  "orderSn":this.orderSn
		            }
		  		}
		  		this.$axios(this.returndata).then((response) => {
		  			var bridge = getJsBridge();
		  			if( response.response_data.orders["0"].orderStatus!='101001' ){
		  				bridge.call("showAlert",{msg:'订单已超时无法取消！'});
		  				_this.orderDetailHttpData();
		  			}else{
		  				_this.returndata = {
					            "serviceName":"app.order.orderOpr",
					            "timestamp":_this.$global().timestamp,
					            "serialNumber":_this.$global().serialNumber,
					            "request_data":{
					                  "oprType":_this.oprType,
					                  "orderSn":_this.orderSn,
					                  "oprRemark": _this.Causetype+','+_this.order_Textarea
					            }
					    } 
				  		if( _this.Causetype!=''||_this.order_Textarea!='' ){
					        _this.$axios(_this.returndata).then((response1) => {
						    	_this.order_Drawback = false;
				  				_this.orderlayerShow = false;
				  				if(response1.retCode == 0){
				  					bridge.call("showAlert",{msg:'取消订单成功'});  	
				  				}else{
				  					bridge.call("showAlert",{msg:response1.retMessage}); 
				  				}					        				
					        	location.replace(document.referrer);		   
					        }) 
				  		}else{
				  			 bridge.call("showAlert",{msg:'请选择原因'});
				  		}
		  			}
		  		})
		  	},
		  	turnOff(){	 
		  		this.order_Drawback = false;
		  		this.orderlayerShow = false;
		  	},
		  	Request_YesNo(event){	 
		  		this.oprType = 'REFUND';	 
		  		event = event||window.event;
		  		var Request = event.target.innerHTML;
		  		var _this = this;
		  		if( Request=='确定' ){
		  			this.returndata = {
			            "serviceName":"app.order.orderOpr",
			            "timestamp":this.$global().timestamp,
			            "serialNumber":this.$global().serialNumber,
			            "request_data":{
			                  "oprType":this.oprType,
			                  "orderSn":this.orderSn
			              }
			        }
			        this.$axios(this.returndata).then((response) => {
				    	_this.order_request = false;
		  				_this.orderlayerShow = false;

				    	var bridge = getJsBridge();	
				    	if(response.retCode == '0'){
			        		bridge.call("showAlert",{msg:'申请成功'});
				    	}else{
			        		bridge.call("showAlert",{msg:response.retMessage});
				    	}
			        	location.replace(document.referrer);
				    })
		  		}else if( Request=='取消' ){
		  			this.orderlayerShow = false;
		  			this.order_request = false;
		  		}
		  	},
		  	toPayChoose(){
				var _this = this;
				var timer;
				this.returndata = {
	              "serviceName":"app.query.orderList",
	              "timestamp":this.$global().timestamp,
	              "serialNumber":this.$global().serialNumber,
	              "request_data":{
	                  "userId":this.userId,
	                  "orderSn":this.orderSn
	                }
	            }
	            this.$axios(this.returndata).then((response) => {
	            	var bridge = getJsBridge();
	            	if( response.response_data.orders["0"].orderStatus!="101001" ){
		        		bridge.call("showAlert",{msg:'您的订单已超时！'});
	            		timer = setTimeout(() => {
				  			bridge.call("startNativeActivity",{url: this.$global().url+"paydefeated?userId="+_this.userId+"&orderSn="+_this.orderSn, title: "订单已超时"}); 
					      }, 2000);
	            	}else{
				  		bridge.call("startNativeActivity",{url: this.$global().url+"paychoose?userId="+_this.userId+"&orderSn="+_this.orderSn+"&loginId="+_this.loginId, title: "在线支付"}); 
	            	};
	            })
		  	},
		  	topayService(){
		  		var bridge = getJsBridge();
		  		var _this = this;
				bridge.call("startChatActivity",{id: _this.loginId,name: _this.shopHomeNick}); 
		  	}
	    }
	}
</script>