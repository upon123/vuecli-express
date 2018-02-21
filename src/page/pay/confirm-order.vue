<template>
	<div class="confirm-order">
		<div class="seller">
			<div class="seller-message">
				<h4>经销商：{{agcyName}}</h4>
				<div class="address">
					<span class="add">地</span>址：{{agcyAddress}}
				</div>
			</div>
		</div>
		<div class="car_information_box">
			<div class="car_information">
				<img class="car_img" :src="smallImage" alt="">
				<div class="information">
					<p class="car_Name">{{orderName.replace(/ undefined/g,'')}}</p>
					<p class="car_Year_Km_Address">{{dateOnCardYear}}年/{{mileage}}万公里/{{area}}</p>
					<p class="car_Price">二手车价：<span>￥{{price}}万</span></p>
					<p class="car_Goodprice">
						意向金：
						<span>
							￥
							<i>{{deposit*10/10}}</i>
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
						<div class="zhu">注：这个信息很重要！请认真填写。</div>
					</div>
				</div>
				<div class="buy_people_thing">
					<div class="name">
						<span>*</span>
						姓<span class="addname">名</span>&nbsp;&nbsp;&nbsp;&nbsp;
						<input type="text" v-model="consignee" @blur="UserName" placeholder="请输入您的姓名">
					</div>
				</div>	
				<div class="buy_people_thing">
					<div class="phone">
					<span>*</span>
						手机号码&nbsp;&nbsp;&nbsp;&nbsp;
						<input type="number" v-model="phone" @blur="UserPhone" placeholder="请输入您手机号">
					</div>
				</div>	
				<div class="buy_people_thing">
					<div class="id">
					<span>*</span>
						身份证号&nbsp;&nbsp;&nbsp;&nbsp;
						<input class="idCardtext" type="text" v-model="certId" placeholder="请输入您的身份证号">
					</div>
				</div>	
				<div class="buy_people_thing">
					<div class="warm_prompt">
						<p>温馨提示：购买成功后，凭验证码将发送到该手机号，凭验证码作为线下核销唯一凭证，请确保手机号正确无误。</p>
					</div>
				</div>
			</div>
		</div>
		<div class="couponsBox">
			<ul class="coupons">
				<li class="Store_coupon" @click="ToCoupons">
					<div class="store">
						店铺优惠券
						<span v-show="shopNumber" class="shopNumber">可用{{useShop}}张</span>
						<span v-show="shopNumberr" class="shopNumberr">无可用优惠券</span>
						<span class="charge" v-show="shopCharge">-￥{{cash}}</span>
					</div>
					
				</li>
				<li class="Terrace_coupon">
					<div class="terrace">
						平台优惠券
						<span class="shopNumberr">无可用优惠券</span>
					</div>	
				</li>
			</ul>
		</div>
		<div class="invoice_box">
			<div class="invoice">
				<p>索要发票</p>
				<div>
					<p>线下购车成功后，您可与经销商索要发票；发票金额以实付金额为准。</p>
				</div>
			</div>
		</div>
		<div class="money_box">
			<div class="money">
				<div>
					<p>
						意向金
						<span>￥{{deposit*10/10}}</span>
					</p>
				</div>
				<div class="store_money">
					<p>
						店铺优惠
						<span v-model="youhui">-￥{{cash}}</span>
					</p>
				</div>
				<div>
					<p>
						平台优惠
						<span>-￥0</span>
					</p>
				</div>
			</div>
		</div>
		<div class="pay_moneyYes">
			<div class="topayChooseLeft">
				<p>实付意向金：<span>￥{{Yesdeposit}}</span></p>
			</div>
			<div @click="toPayChoose" class="Good_moneyYes">
				立即支付
			</div>
		</div>
	</div>
	
</template>
<script>

	const phone = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;	 
  	const idCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/; 

	export default{		
		components:{

		},
	    data () {
	      return {
	      	cityId: '', 	 
			cityName:'',	 
	      	carDetail:'',	 
	      	dateOnCardYear:'',	 
	      	youhui: '',	 
	      	loginId:'',	 
	      	agcyName:'',	 
	      	agcyAddress:'',	 
	      	area:'', 
	      	dataOnCardYear:'',
	      	mileage:'', 
	      	price:'', 
	      	smallImage:'',	 
	      	deposit:'',	 
	      	Yesdeposit:'',	 
	      	consignee:'',	 
	      	phone:'',	 
	      	certId:'',	 
	      	goodType:'CAR',	 
	      	releaseNumber:'',	 
	      	activityId:'',	 
			returndata:'',
			userId:'',	 
			orderSn:'',	 
			deviceType:'',
			modelCode:'',
			carModel:'',
			transmission:'',
			carAir:'',
			transmission_Type:'',
			orderName:'',
			shopNumber: '', 
			shopNumberr: '',
			shopCharge: '', 
			useShop: '',	 
			cash: 0,	        
			activityId: '',		 
	      }
	    },
	    mounted(){
			this.userId = this.$route.query.userId; 
  			this.releaseNumber = this.$route.query.releaseNumber; 
  			this.cityId = this.$route.query.cityId;	
  			this.cityName = this.$route.query.cityName;
	        this.carDetailHttpData();	        
	        var _this = this;	        
            window.notifyCouponSelected = function(data){
            	let couponArr = data.split(',');   
            	if(couponArr[1] == ""){
            		_this.shopNumber = true;
            		_this.shopNumberr = false;
	    			_this.shopCharge = false;
	    			_this.cash = 0;
	    			_this.activityId = couponArr[1];
	    			_this.carDetailHttpData1(_this.cash);
            	}else{
            		_this.shopNumber = false;
            		_this.shopNumberr = false;
	    			_this.shopCharge = true;
	    			_this.cash = couponArr[0];
	    			_this.activityId = couponArr[1];
	    			_this.carDetailHttpData1(_this.cash);
            	}
            }
		},
	    methods:{
	    	carDetailHttpData(){	 
	    		this.returndata = {
					"serviceName":"app.query.carDetail",
					"timestamp":this.$global().timestamp,
					"serialNumber":this.$global().serialNumber,
				    "request_data":{
				      "releaseNumber":this.releaseNumber
				    }
				}
				var _this = this;
				this.$axios(this.returndata).then((response) => {					
					_this.carDetail = response.response_data.carDetail;
					_this.dateOnCardYear = _this.carDetail.registration.substring(0,4);	 
					_this.mileage = _this.carDetail.mileage<=100 ? 0.01 : (_this.carDetail.mileage/10000).toFixed(2);	 
					_this.price = (_this.carDetail.price/10000).toFixed(2);	 
					_this.smallImage = _this.carDetail.smallImage.path;	 
					_this.deposit = _this.carDetail.deposit;	 
					_this.agcyName = _this.carDetail.agcyName;	 
					_this.agcyAddress = _this.carDetail.agcyAddress; 
					_this.area = _this.carDetail.area; 
					_this.loginId = _this.carDetail.loginId; 
					_this.manufacture =	_this.carDetail.manufacture;
					_this.modelLine = _this.carDetail.modelLine;
					_this.modelName = _this.carDetail.modelName;
					_this.transmission = _this.carDetail.transmission; 
					_this.deviceType = _this.carDetail.deviceType; 
					if( _this.carDetail.carModel ){	 
						_this.carModel = _this.carDetail.carModel;
					}else{
						_this.carModel = "";
					}
					if( _this.carDetail.modelCode ){ 
						_this.modelCode = _this.carDetail.modelCode;
					}else{
						_this.modelCode = "";
					}
					if( _this.carDetail.carAir ){ 
						_this.carAir = _this.carDetail.carAir;
					}else{
						_this.carAir = "";
					}
					_this.Yesdeposit = _this.deposit - _this.cash; 

					if( _this.transmission=="01" ){
						_this.transmission_Type = '自动档';
					}else if( _this.transmission=="02" ){
						_this.transmission_Type = '手动档';
					}else if( _this.transmission=="03" ){
						_this.transmission_Type = '手自一体';
					}else{
						_this.transmission_Type = "";
					}
					
					_this.orderName = "奥迪"+" "+_this.carModel+" "+_this.modelCode+" "+_this.transmission_Type+" "+_this.carAir+" "+_this.deviceType;	
					_this.cash = 0;
			        let couponData = {
		                "serviceName":"app.query.couponList",
		                "timestamp":this.$global().timestamp,
		                "serialNumber":this.$global().serialNumber,
		                "request_data":{                    
		                    "userId": _this.userId,
		                    "dealerCode": _this.loginId,
		                    "carId": _this.releaseNumber
		                }
		            }
		            _this.$axios(couponData).then((response) => { 
		                _this.useShop = response.response_data.canUseCouponCard;
		                if(_this.useShop > 0){	 
			    			_this.shopNumber = true;
			    			_this.shopNumberr= false;
			    			_this.shopCharge = false;  
			    			_this.cash = 0;  			
			    		}else{
			    			_this.shopNumber = false;
			    			_this.shopNumberr=true;
			    			_this.shopCharge = false;
			    			_this.cash = 0;
			    		}
		            })				
				});									
	    	},
	    	carDetailHttpData1(cash){ 
	    		this.returndata = {
					"serviceName":"app.query.carDetail",
					"timestamp":this.$global().timestamp,
					"serialNumber":this.$global().serialNumber,
				    "request_data":{
				      "releaseNumber":this.releaseNumber
				    }
				}
				var _this = this;
				this.$axios(this.returndata).then((response) => {					
					_this.carDetail = response.response_data.carDetail;
					_this.dateOnCardYear = _this.carDetail.registration.substring(0,4); 
					_this.mileage = _this.carDetail.mileage<=100 ? 0.01 : (_this.carDetail.mileage/10000).toFixed(2); 
					_this.price = (_this.carDetail.price/10000).toFixed(2); 
					_this.smallImage = _this.carDetail.smallImage.path;	 
					_this.deposit = _this.carDetail.deposit;	 
					_this.agcyName = _this.carDetail.agcyName; 
					_this.agcyAddress = _this.carDetail.agcyAddress; 
					_this.area = _this.carDetail.area; 
					_this.loginId = _this.carDetail.loginId; 
					_this.manufacture =	_this.carDetail.manufacture;
					_this.modelLine = _this.carDetail.modelLine;
					_this.modelName = _this.carDetail.modelName;
					_this.transmission = _this.carDetail.transmission; 
					_this.deviceType = _this.carDetail.deviceType || ''; 
					if( _this.carDetail.carModel ){	 
						_this.carModel = _this.carDetail.carModel;
					}else{
						_this.carModel = "";
					}
					if( _this.carDetail.modelCode ){ 
						_this.modelCode = _this.carDetail.modelCode;
					}else{
						_this.modelCode = "";
					}
					if( _this.carDetail.carAir ){	 
						_this.carAir = _this.carDetail.carAir;
					}else{
						_this.carAir = "";
					}
					_this.Yesdeposit = (_this.deposit*1000 - cash*1000)/1000; 

					if( _this.transmission=="01" ){
						_this.transmission_Type = '自动档';
					}else if( _this.transmission=="02" ){
						_this.transmission_Type = '手动档';
					}else if( _this.transmission=="03" ){
						_this.transmission_Type = '手自一体';
					}else{
						_this.transmission_Type = "";
					}
					_this.orderName = "奥迪"+" "+_this.carModel+" "+_this.modelCode+" "+_this.transmission_Type+" "+_this.carAir+" "+_this.deviceType;

				});									
	    	},

	    	confirmOrderDetailHttpData () {	 
	    		this.returndata = {
		            "serviceName":"app.order.orderCommit",
		            "timestamp":this.$global().timestamp,
		            "serialNumber":this.$global().serialNumber,
		            "request_data":{
		                "userId": this.userId,
		                "phone": this.phone,
		                "consignee": this.consignee,
		                "certId": this.certId,
		                "orderAmount": this.Yesdeposit,
		                "shopCouponId": this.activityId,
		                "goodType": this.goodType,
		                "releaseNumber": this.releaseNumber,
		                "activityId": '',
		                "orderName": this.orderName.replace(/ undefined/g,'') 
		            }
		        }
		  		var _this = this;		  			        
		        this.$axios(this.returndata).then((response) => {
		        	if( response.retCode=="0" ){
		        		_this.orderSn = response.response_data.orderSn;
		        		var bridge = getJsBridge();
		  				bridge.call("startNativeActivity",{url: this.$global().url+"paychoose?userId="+_this.userId+"&orderSn="+_this.orderSn+"&loginId="+_this.loginId,title:"在线支付"});
		        	}else{
		        		var bridge = getJsBridge();	
		        		bridge.call("showAlert",{msg:response.retMessage});
		        	}
		        });
		  	},
	    	UserName(){
	    		if( this.consignee == '' ){
	    			var bridge = getJsBridge();	
			        bridge.call("showAlert",{msg:'用户名不能为空'});
	    		}
	    	},
	    	UserPhone(){
	    		if( this.phone!='' ){
	    			if( !phone.test(this.phone) ){
		    			var bridge = getJsBridge();	
				        bridge.call("showAlert",{msg:'请输入正确的手机号'});
		    		}
	    		}else{
	    			var bridge = getJsBridge();	
				        bridge.call("showAlert",{msg:'手机号不能为空'});
	    		}	    		
	    	},
	    	UseridCard(){
	    		if( this.certId!='' ){
	    			if( !idCard.test(this.certId) ){
		    			if(this.certId.length==18){
			                    var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); 
			                    var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); 
			                    var idCardWiSum=0; 
			                    for(var i=0;i<17;i++){
			                        idCardWiSum+=this.useridCard.substring(i,i+1)*idCardWi[i];
			                    }

			                    var idCardMod=idCardWiSum%11; 
			                    var idCardLast=this.useridCard.substring(17); 

			                    if(idCardMod==2){
			                        if(idCardLast!="X"||idCardLast!="x"){
			                        	var bridge = getJsBridge();	
				        				bridge.call("showAlert",{msg:'请输入正确的身份证号'});
			                        }
			                    }else{
			                        if(idCardLast!=idCardY[idCardMod]){
			                        	var bridge = getJsBridge();	
				        				bridge.call("showAlert",{msg:'请输入正确的身份证号'});
			                        }
			                    }
			                }else{
			                	var bridge = getJsBridge();	
				        		bridge.call("showAlert",{msg:'请输入正确的身份证号'});
			            }
		    		}
	    		}else{
	    			var bridge = getJsBridge();
	    			bridge.call("showAlert",{msg:'身份证号不能为空'});
	    		}	    		
	    	},
	    	
	    	ToCoupons(){	
	    		var bridge = getJsBridge();
	    		if(this.cash == "" || this.cash == undefined){	    
	    			this.cash = 0			
	    			if(this.useShop > 0){	 
		    			this.shopNumber = true;
		    			this.shopNumberr= false;
		    			this.shopCharge = false;    			
		    			bridge.call("startNativeActivity",{url: this.$global().url+"choosecoupon?userId="+this.userId+"&carId="+this.releaseNumber+"&dealerCode="+this.loginId,title:"3店铺优惠券"});
		    		}else{
		    			this.shopNumber = false;
		    			this.shopNumberr=true;
		    			this.shopCharge = false;
		    			this.cash = 0;
		    		}
	    		}else{	 
	    			this.shopNumber = false;
	    			this.shopNumberr=false;
	    			this.shopCharge = true;
	    		}
	    		if(this.shopCharge == true){
	    			bridge.call("startNativeActivity",{url: this.$global().url+"choosecoupon?userId="+this.userId+"&carId="+this.releaseNumber+"&dealerCode="+this.loginId,title:"3店铺优惠券"});
	    		}
	    		
	    	},
	    	toPayChoose(){
	    		if( this.consignee!=''&&this.phone!=''&&this.certId!='' ){
	    			if( idCard.test(this.certId)&&phone.test(this.phone) ){
	    				this.confirmOrderDetailHttpData();
	    			}else if( !phone.test(this.phone) ){
	    				var bridge = getJsBridge();	
			        	bridge.call("showAlert",{msg:'请输入正确的手机号'});
	    			}else if( !idCard.test(this.certId) ){
	    				var bridge = getJsBridge();	
			        	bridge.call("showAlert",{msg:'请输入正确的身份证号'});
	    			}	
	    		}else{
	    			var bridge = getJsBridge();	
			        bridge.call("showAlert",{msg:'请补全信息'});
	    		}
	    		
	    	}
	    }
	}
</script>