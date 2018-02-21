<template>
	<div class="orderOur">
		<div class="orderOur_header">
		    <div class="orderOur_header_top">
			   <p @click="setting">设置</p>
			   <span class="orderOur_header_a1" @click="chat"></span>
			   <span class="orderOur_header_a2" v-show="message"></span>
		    </div>
		    <div style="clear:both;">
		    </div>
	        <div v-show="loginAfter" class="orderOur_header_center">
	        	<span><img :src="viaUrl"><input type="file" @change="onFileChange" class="xuanze" accept="image"></span>	    	    
			    <p>{{userName}}</p>
			    <p class="integral">积分：{{custIntegral}}</p>
	        </div>
	        <div v-show="loginBefor"  class="orderOur_header_center1">
	         	<p>您还未登录</p>
	    	 	<button type="" class="orderOur_header_button1" @click="login">登录</button>
	        </div>
		</div>
		<div class="orderOur_center">
			<div class="orderOur_center_div1" @click="jumpOrderList">
				<img src="../../../static/images/dingdan.png">
				<p>全部订单</p>
				<span></span>
			</div>
			<div class="orderOur_center_div2" @click="jumpCoupon">
				<img src="../../../static/images/coupon.png">
				<p>优惠劵</p>
				<span></span>
			</div>
			<div class="orderOur_center_div3" @click="jumpCollect">
				<img src="../../../static/images/xing.png">
				<p>我的收藏</p>
				<span></span>
			</div>
			<div class="orderOur_center_div4" @click="jumpShop">
				<img src="../../../static/images/dianpu.png">
				<p>关注店铺</p>
				<span></span>
			</div>
			<div class="orderOur_center_div5" @click="jumpAudiBi">
				<img src="../../../static/images/ourAudi.png">
				<p>我的奥迪币</p>
				<span></span>
			</div>
		
		</div>
		<div style="clear:both;"></div>
		<div class="orderOur_footer">
			<div class="orderOur_footer_top">
				<p>为您推荐</p>				
			</div>
		</div>
		<Carlistsm queryType="RECOMMEND" :cityId="cityId" pageSize=8 path='carduan' content="正在研究您的喜好！"></Carlistsm>
	</div>	
</template>
<script>
	import Carlistsm from '../list/car-list-sm.vue';
	import Exif from 'exif-js'  
	export default{
		components: {
		    Carlistsm
		},
		data(){
			return{
				loginBefor: '', 
				loginAfter: '',	 
				userId: '',			 
				userName: '',		 
				cityId: '',			 
				message: '',		 
				picValue: '',
				images: '',
				custIntegral: '',	 
				viaUrl: ''			 	
			}
		},
		created(){
			this.cityId = this.$route.query.cityId;					
			let isShowRedPoint = this.$route.query.isShowRedPoint;	
			if(isShowRedPoint == 0){
				this.message = false
			}else{
				this.message = true
			}				
			if(this.$route.query.userId == -1){
				this.userId = '';	
				this.loginBefor = true;
				this.loginAfter = false;
			}else{
				this.loginAfter = true;
				this.loginBefor = false;
				this.userId = this.$route.query.userId;	
				this.userName = this.$route.query.userName;
				this.custIntegralHttp();
				let accountInfo = {  
				    "serviceName":"app.subs.accountInfo",
				    "timestamp":this.$global().timestamp,
				    "serialNumber":this.$global().serialNumber,
				    "request_data":{
				        "userId":this.userId
				    }				    
			    }
			    this.$axios(accountInfo).then((response) => {
			    	this.viaUrl = response.response_data.accountInfo.viaUrl;
			    })
			}
		},
		methods: {
			setting(){
				var bridge = getJsBridge();	
				bridge.call("startNativeActivity",{url: this.$global().url+"set",title: "设置"});
			},
			login(){
				var _this = this
				var bridge = getJsBridge();	
				if(this.loginAfter == false){ 			
					bridge.call("doLogin",{},function(data){
						_this.loginAfter = true;
						_this.loginBefor = false;
						_this.userName = JSON.parse(data).userName;
						_this.userId = JSON.parse(data).userId;						
					});
				}
			},	
			custIntegralHttp(){
				let custIntegralData = { 
				    "serviceName":"app.query.custIntegral",
				    "timestamp":this.$global().timestamp,
				    "serialNumber":this.$global().serialNumber,
				    "request_data":{
				        "userId":this.userId
				    }				    
			    }
			    this.$axios(custIntegralData).then((response) => {
			    	this.custIntegral = response.response_data.custIntegral.userIntegral;
			    })		
			},			
			chat(){
				var _this = this;
				var bridge = getJsBridge();	
				if(this.loginAfter == false){ 			
					bridge.call("doLogin",{},function(data){
						_this.loginAfter = true;
						_this.loginBefor = false;
						_this.userName = JSON.parse(data).userName;
						_this.userId = JSON.parse(data).userId;		
					});
				}else{
					bridge.call("startMsgActivity");
				}
			},
			jumpOrderList(){
				var _this = this;
				var bridge = getJsBridge();	
				if(this.loginAfter == false){ 
					bridge.call("doLogin",{},function(data){
						_this.loginAfter = true;
						_this.loginBefor = false;
						_this.userName = JSON.parse(data).userName;
						_this.userId = JSON.parse(data).userId;		
					});
				}else{
					bridge.call("startNativeActivity",{url: this.$global().url+"order?userId="+this.userId+"&cityId="+this.cityId,title: "我的订单"});
				}
			},
			jumpCoupon(){
				var _this = this;
				var bridge = getJsBridge();	
				if(this.loginAfter == false){ 
					bridge.call("doLogin",{},function(data){
						_this.loginAfter = true;
						_this.loginBefor = false;
						_this.userName = JSON.parse(data).userName;
						_this.userId = JSON.parse(data).userId;		
					});
				}else{
					bridge.call("startNativeActivity",{url: this.$global().url+"coupon?userId="+this.userId+"&cityId="+this.cityId,title: "优惠券"});
				}
			},
			jumpCollect(){
				var _this = this;
				var bridge = getJsBridge();
				if(this.loginAfter == false){ 					
					bridge.call("doLogin",{},function(data){
						_this.loginAfter = true;
						_this.loginBefor = false;
						_this.userName = JSON.parse(data).userName;
						_this.userId = JSON.parse(data).userId;		
					});
				}else{
					bridge.call("startNativeActivity",{url: this.$global().url+"collect?userId="+this.userId+"&cityId="+this.cityId,title: "我的收藏"});
				}
			},
			jumpShop(){
				var _this = this;
				var bridge = getJsBridge();
				if(this.loginAfter == false){ 
					bridge.call("doLogin",{},function(data){
						_this.loginAfter = true;
						_this.loginBefor = false;
						_this.userName = JSON.parse(data).userName;
						_this.userId = JSON.parse(data).userId;		
					});
				}else{
					bridge.call("startNativeActivity",{url: this.$global().url+"concernshop?userId="+this.userId+"&cityId="+this.cityId,title: "关注店铺"});
				}
			},
			jumpAudiBi(){
                var _this = this;
				var bridge = getJsBridge();		
				bridge.call("clickMyAudiB");	
				bridge.call("startNativeActivity",{url: this.$global().url+"audiBactivity?userId="+this.userId+"&userName="+this.userName+"&cityId="+this.cityId,title: "5优惠兑换机"});
			},
			onFileChange (e) {
		      	let files = e.target.files || e.dataTransfer.files;  
		      	if (!files.length) return;  
		      	this.picValue = files[0];  
		      	this.imgPreview(this.picValue);  
		    },
		    imgPreview (file) {  
		      	let self = this;   
		      	let Orientation;  
			    Exif.getData(file, function(){  
			        Orientation = Exif.getTag(this, 'Orientation');  
			    });  
		      	if (!file || !window.FileReader) return;  
		  
		      	if (/^image/.test(file.type)) {  
		          	let reader = new FileReader();  
		          	reader.readAsDataURL(file);  
		          	reader.onloadend = function () {  
			            let result = this.result;  
			            let img = new Image();  
			            img.src = result;              
			            if (this.result.length <= (100 * 1024)) {  
			              	self.headerImage = this.result 
			              	self.images = this.result
			              	self.custViaHttp();
			            }else {  
			              	img.onload = function () {  
				                let dating = self.compress(img,Orientation);  
				                self.headerImage = dating;  
				                self.images = dating
				                self.custViaHttp();					    
			              	}  			              	
			            }  			            
		          	}   
		      	}  
		    },  
		    custViaHttp(){
		    	let custVia = { 
				    "serviceName":"app.subs.custVia",
				    "timestamp":this.$global().timestamp,
				    "serialNumber":this.$global().serialNumber,
				    "request_data":{
				        "userId":this.userId,
				        "imgBase": this.images
				    }				    
			    }
			    this.$axios(custVia).then((response) => {
			    	this.viaUrl = response.response_data.viaUrl;
			    })
		    },
		    rotateImg (img, direction,canvas) {  
		        const min_step = 0;      
		        const max_step = 3;        
		        if (img == null)return;      
		        let height = img.height;      
		        let width = img.width;        
		        let step = 2;      
		        if (step == null) {      
		            step = min_step;      
		        }      
		        if (direction == 'right') {      
		            step++;      
		            step > max_step && (step = min_step);      
		        } else {      
		            step--;      
		            step < min_step && (step = max_step);      
		        }       
		        let degree = step * 90 * Math.PI / 180;      
		        let ctx = canvas.getContext('2d');      
		        switch (step) {      
		          case 0:      
		              canvas.width = width;      
		              canvas.height = height;      
		              ctx.drawImage(img, 0, 0);      
		              break;      
		          case 1:      
		              canvas.width = height;      
		              canvas.height = width;      
		              ctx.rotate(degree);      
		              ctx.drawImage(img, 0, -height);      
		              break;      
		          case 2:      
		              canvas.width = width;      
		              canvas.height = height;      
		              ctx.rotate(degree);      
		              ctx.drawImage(img, -width, -height);      
		              break;      
		          case 3:      
		              canvas.width = height;      
		              canvas.height = width;      
		              ctx.rotate(degree);      
		              ctx.drawImage(img, -width, 0);      
		              break;  
		        }      
		    },
		    compress(img,Orientation) {  
		      	let canvas = document.createElement("canvas");  
		      	let ctx = canvas.getContext('2d');  
		      	let tCanvas = document.createElement("canvas");  
		      	let tctx = tCanvas.getContext("2d");  
		      	let initSize = img.src.length;  
		      	let width = img.width;  
		      	let height = img.height;  
		      	let ratio;  
		      	if ((ratio = width * height / 4000000) > 1) {  
			        ratio = Math.sqrt(ratio);  
			        width /= ratio;  
			        height /= ratio;  
		      	} else {  
		        	ratio = 1;  
		      	}  
		      	canvas.width = width;  
		      	canvas.height = height;  
		      	ctx.fillStyle = "#fff";  
		      	ctx.fillRect(0, 0, canvas.width, canvas.height);  
		      	let count;  
		      	if ((count = width * height / 1000000) > 1) {  
			        count = ~~(Math.sqrt(count) + 1);  
			        let nw = ~~(width / count);  
			        let nh = ~~(height / count);  
			        tCanvas.width = nw;  
			        tCanvas.height = nh;  
			        for (let i = 0; i < count; i++) {  
			          	for (let j = 0; j < count; j++) {  
			            	tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);  
			            	ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);  
			          	}  
			        }  
		      	} else {  
		        	ctx.drawImage(img, 0, 0, width, height);  
		      	} 
			    if(Orientation != "" && Orientation != 1){  
			        switch(Orientation){  
			          case 6: 
			              this.rotateImg(img,'left',canvas);  
			              break;  
			          case 8: 
			              this.rotateImg(img,'right',canvas);  
			              break;  
			          case 3: 
			              this.rotateImg(img,'right',canvas); 
			              this.rotateImg(img,'right',canvas);  
			              break;  
			        }
		        }    
		      	let ndata = canvas.toDataURL('image/jpeg', 0.1);  
		      	tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;  
		      	return ndata;  
		    },  
		},
		mounted(){
			var _this= this;
			window.showRedPoint = function(point){
				if(point == 0){
					_this.message = false;
				}else{
					_this.message = true;
				}
			}
			

		}
		
	}
</script>