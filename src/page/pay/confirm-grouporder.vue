<template>
	<div class="confirm-order">
		<div class="seller">
			<div class="seller-message">
				<h4>经销商：{{dealerName}}</h4>
				<div class="address">
					<span class="add">地</span>址：{{dealerAddress}}
				</div>
				
			</div>
		</div>
		<div class="car_information_box">
			<div class="car_information">
				<img class="activity_img" v-lazy="logoUrl" alt="">
				<div class="information_activity">
					<p class="car_Name">
						{{activityTitle}}
					</p>
					<p class="chit_Content">
						{{activityDescribe}}
					</p>
					<p class="car_Goodprice">
						团购价：
						<span>
							￥
							<i>{{groupPrice}}</i>
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
		<div class="invoice_box">
			<div class="invoice">
				<p>索要发票</p>
				<div>
					<p>线下购车成功后，您可与经销商索要发票；发票金额以实付金额为准。</p>
				</div>
			</div>
		</div>
		<div class="pay_moneyYes">
			<div class="topayChooseLeft">
				<p>团购价：<span>￥{{Yesdeposit}}</span></p>
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
		mounted(){
			this.userId = this.$route.query.userId;	 
  			this.activityId = this.$route.query.activityId;	 
  			this.cityId = this.$route.query.cityId;	
  			this.cityName = this.$route.query.cityName;
	        this.groupDetailHttpData();
		},
		components:{

		},
	    data () {
	      return {
	      	groupDetail:'',
	      	cityId: '', 											 
			cityName:'',											 
	      	youhui:'',											 
	      	loginId:'',												 
	      	dealerName:'',											 
	      	dealerAddress:'',										 
	      	activityTitle:'',										 
	      	activityDescribe:'',									 
	      	logoUrl:'',												 
	      	groupPrice:'',											 
	      	Yesdeposit:'',											 
	      	consignee:'',											 
	      	phone:'',											 
	      	certId:'',												 
	      	goodType:'ACT',										 
	      	activityId:'',			 
			returndata:'',
			userId:'',												 
			orderSn:'',												 
	      }
	    },
	    methods:{
	    	groupDetailHttpData(){	 
	    		this.returndata = {
					"serviceName":"app.query.activityList",
					"timestamp":this.$global().timestamp,
					"serialNumber":this.$global().serialNumber,
				    "request_data":{
				      "activityId":this.activityId
				    }
				}
				var _this = this;
				this.$axios(this.returndata).then((response) => {
					_this.groupDetail = response.response_data.activitinfos["0"];
					_this.groupPrice = _this.groupDetail.groupPrice;
					_this.activityTitle = _this.groupDetail.activityTitle;
					_this.dealerName = _this.groupDetail.dealerName;
					_this.dealerAddress = _this.groupDetail.address;
					_this.activityDescribe = _this.groupDetail.activityDescribe;
					_this.loginId = _this.groupDetail.dealerCode;
					_this.logoUrl = _this.groupDetail.logoUrl;
					_this.Yesdeposit = Number(_this.groupPrice);	 
				})
	    	},
	    	confirmOrderDetailHttpData () {	 
	    		this.returndata = {
		            "serviceName":"app.order.orderCommit",
		            "timestamp":this.$global().timestamp,
		            "serialNumber":this.$global().serialNumber,
		            "request_data":{
		                  "userId":this.userId,
		                  "phone":this.phone,
		                  "consignee":this.consignee,
		                  "certId":this.certId,
		                  "orderAmount":this.Yesdeposit,
		                  "goodType":this.goodType,
		                  "activityId":this.activityId,
		                  "orderName":this.activityTitle         
		              }
		        }
		  		var _this = this;		  			        
		        this.$axios(this.returndata).then((response) => {
		        	var bridge = getJsBridge();
		        	if( response.retCode=="0" ){
			        		_this.orderSn = response.response_data.orderSn;
			  				bridge.call("startNativeActivity",{url: this.$global().url+"paychoose?userId="+_this.userId+"&orderSn="+_this.orderSn+"&loginId="+_this.loginId+"&path=activity",title:"在线支付"});
		        	}else{
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