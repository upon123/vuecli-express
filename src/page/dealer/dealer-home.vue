·<template>
	<div>
		<div class="dealerHome" v-show="!failed">		
			<div class="dealerTop">
				<div class="dealerbanner">
					<div class="dealerbanner_center">
					    <div class="img_left">
					    	<img class="img_smort" :src="dealer.headImgPath" alt="" @click="clickImg($event)">
					    	<div class="img-layer" v-show="showImg" @click="viewImg">
					    		<img :src="dealer.headImgPath" class="big_img"></img>
					    	</div>
					    </div>
						<div class="dealerbanner_center_center">
						   <p class="dealerbanner_center_p2"><star :starnum="dealer.score" style="display:block;margin-left:-.08rem;"></star></p>
						   <p class="youzhi" v-show="!dealer.rank == 0">{{dealer.rank == 4 ? "优质经销商" : dealer.rank == 3 ? "铜牌经销商" : dealer.rank == 2 ? "银牌经销商" : dealer.rank == 1 ? "金牌经销商" : ""}}</p>
						   <div style="clear:both"></div>
						   <div class="dealerbanner_center_div">
						<!--    	<p class="dealerbanner_center_p3"></p> -->
						   	<p class="dealerbanner_center_p4 iconfont icon-font52" @click="tel400">{{dealer.ci400phone}}<img class="img" src="../../../static/images/dealer_left.png" alt=""></p>
						   	<p class="dealerbanner_center_p3"></p>
						    <p class="dealerbanner_center_p4" @click="jumpMaphome">{{dealer.shopHomeAddress}}<img class="img" src="../../../static/images/dealer_left.png" alt=""></p>
						   </div>
						</div>
						<div class="border_dealer"></div>
						<div class="dealerbanner_center_right">
						   <div class="dealerbanner_center_div1">
						   	  <p>{{dealer.collectCount > 9999 ? (dealer.collectCount/10000).toFixed(1) + "万" : dealer.collectCount}}</p>
							  <p class="ppp">关注数</p>
						   </div>
							<div class="dealerbanner_center_div2" @click="attentionadd">
								<span v-show="look"></span>
								<p v-html="guanzhu"></p>
							</div>
						</div>
					</div>			
				</div>
			    <tab :line-width=2 active-color='#bb0a30' v-model="index">
		        	<tab-item class="vux-center" v-for="(item, index) in list" @click.native="chooseStoreContent(index)" :key="index">{{item}}</tab-item>
		        </tab>
			</div>
			<div class="dealerTopZhanwei"></div>
	        <div class="storeContent">
	          	<div class="carSource" v-show="carSource"> 
	          		<div class="shop" v-show="couponisShow">
					      	<div class="box1" :style="box">
						        <div class="box1-item" v-for="(coupon,index) in coupons" @click="show(index)" :class="{'class_a':coupon.userCouponCardState == '1' || coupon.userCouponCardState == '3'}" :style="couponStyle" :key="coupon.id">
							        <h2><span>{{coupon.cash}}</span>元</h2>
							        <p v-if="coupon.conditionPrice == '-1'">无门槛减{{coupon.cash}}元</p>
							        <p v-else>满{{coupon.conditionPrice}}元可用</p>
							        <p>有效期：{{coupon.effectiveStartTime.replace('-','.').replace('-','.')}}-{{coupon.effectiveEndTime.replace('-','.').replace('-','.')}}</p>
							        <p>支持车系：{{coupon.conditionCarLine.join('、')}}</p>
						        </div>
					      	</div>
	          		</div>
	          		
	          		<Carlistsm ref="carSmHttp" :dealerCode="dealerCode" pageSize=10 content='没有符合条件的车源！' path="Cardealer" style="margin-top:-.09rem;"></Carlistsm>
	          	</div>
	          	<div class="activity" v-show="activity"> 
	          		<ActivityList ref="activity_List" :activityData="activityData" keyWord="" :cityId='cityId' activityService='' :dealerCode='dealerCode' carLineId='' path="activitydealer" style="margin-top:-.09rem;"></ActivityList>
	          	</div>     	
	        </div>
		</div>
		<fail v-show='failed'></fail>
	</div>
	
</template>
<script>
	import star from '../../components/star.vue';	
	import { Range, Tab, TabItem, Scroller } from 'vux';	
	import Carlistsm from '../list/car-list-sm.vue';
	import ActivityList from '../list/activity-list.vue';
	import fail from '../../components/failed.vue'
	const list = () => ['车源', '活动'];
	export default{
		components: {
			star,
		    Range,
		    Tab, 
		    TabItem,
		    Scroller,
		    Carlistsm,
		    ActivityList,
		    fail,	    
		},
		data () {
			return {
				coupons: [],
				grade: 3.8,
				class_a:false,
				list: list(),
				index: 0,
				carSource: true,
				activity: false,
				box: '',
				dealerCode:'',
				cityId:'',
				coupon:'',
				dealerData:'',
				dealer:[],	
				activityData: [],		 
				red: '',				 
				follow: '',				 
				ifCollection: '',		 	
				couponData: '',			 
				couponStyle: '',		 
				userId: '',
				couponState: true,
				couponisShow: '',
				failed:false,
				guanzhu:'关注',
				look:true,	
				showImg:false
			}
		},
		created(){
			this.dealerCode = this.$route.query.dealerCode;		 
			var bridge = getJsBridge();
			var user = bridge.call("getUserId"); 	
		  	if(user == "-1"){
				this.userId = "";
			}else{
				this.userId = user;
			}

            this.dealersData = {
				"serviceName":"app.query.dealerList",
	          	"timestamp":this.$global().timestamp,
	          	"serialNumber":this.$global().serialNumber,
	          	"request_data":{
		            "page": "",
		            "pageSize": "",
		            "dealerCode": this.dealerCode,
		            "keyword": "",
		            "queryType": "",
		            "userId": this.userId
	        	}
		  	}
		  	this.couponData = {
		  		"serviceName":"app.query.couponList",
	          	"timestamp":this.$global().timestamp,
	          	"serialNumber":this.$global().serialNumber,
	          	"request_data":{
		            "userId": this.userId,
		            "dealerCode": this.dealerCode,
		            "carId": ""
	        	}
		  	}
			this.dealerAboutHttp(this.userId);
			this.couponsHttpRequest(this.userId);		 	
		},
		mounted () {
			
			
		},
		methods:{
			clickImg(e) {
                this.showImg = true;
            },
            viewImg(){
                this.showImg = false;
            },
			attentionadd(){
				var _this = this;
				var bridge = getJsBridge();
				var user = bridge.call("getUserId");
				if(user == "-1"){
					bridge.call("doLogin",{},function(data){
						_this.userId = JSON.parse(data).userId;
						_this.dealerHttp(_this.userId);
						_this.couponsHttpRequest(_this.userId);
					})
				}else{
					_this.userId = user;
					_this.attention(_this.userId);
					_this.dealerHttp(_this.userId);
				}					
			},
			jumpMaphome(){
				var bridge = getJsBridge();
				bridge.call("startNativeActivity",{url:this.$global().url+"maphome?dealerCode="+this.dealer.dealerCode+"&cityId="+this.cityId+"&longitude="+this.dealer.longitude+"&latitude="+this.dealer.latitude,title:"-2"})
			},
			tel400(){
				var bridge = getJsBridge();
			  	bridge.call("callTel",{tel:this.dealer.ci400phone});
			},
			dealerHttp(userId){
				var _this = this;
				this.dealersData.request_data.userId = userId;
				this.$axios(this.dealersData).then((response) => {
					if(response.retCode == "0"){
						_this.dealer = response.response_data.dealers["0"];	
						_this.cityId = _this.dealer.cityId;	
						_this.ifCollection = _this.dealer.ifCollection;					
						if(_this.ifCollection == true){
							this.guanzhu="已关注"
							this.look=false;
						}
					}else{
                        this.failed=true;
					}
				})		
			},
			dealerAboutHttp(userId){
				var _this = this;
				this.dealersData.request_data.userId = userId;
				this.$axios(this.dealersData).then((response) => {
					if(response.retCode == "0"){
						_this.dealer = response.response_data.dealers["0"];	
						_this.cityId = _this.dealer.cityId;	
						this.$refs.carSmHttp.SmcarHttpData(_this.cityId);
						_this.ifCollection = _this.dealer.ifCollection;					
						if(_this.ifCollection == true){
							this.guanzhu="已关注"
							this.look=false;
						}
					}else{
                        this.failed=true;
					}
				})	
			},
			attention(userId){
				var bridge = getJsBridge();
				if(this.ifCollection == false){
					this.guanzhu="已关注"
					this.look=false;
					let collect = {
						"serviceName":"app.subs.collect",
			          	"timestamp":this.$global().timestamp,
			          	"serialNumber":this.$global().serialNumber,
			          	"request_data":{
				            "userId": userId,
				            "goodId": this.dealerCode,
				            "goodType": "3",
				            "oprType": "add"
			        	}
				  	}

				  	this.$axios(collect).then((response) => {		
				  		if(response.retCode == "0"){
				  			bridge.call("showAlert",{msg:"已成功关注！"});
				  		}else{
				  			bridge.call("showAlert",{msg:"关注失败！"});
				  		}
				  	})
				}
			},
			show(index){
				var _this = this;
				var bridge = getJsBridge();
				var user = bridge.call("getUserId");
				if(user == "-1"){
					bridge.call("doLogin",{},function(data){
						_this.userId = JSON.parse(data).userId;
						_this.dealerHttp(_this.userId);
						_this.couponsHttpRequest(_this.userId);
					})
				}else{
					_this.userId = user;	
					_this.receiveCoupon(_this.coupons[index].userCouponCardState,_this.coupons[index].activityId,_this.userId);
				}									
　　　　　　 },

			receiveCoupon(CouponCardState,activityId,userId){				
	  			var bridge = getJsBridge();
				if(CouponCardState == "0"){						
					let receiveData = {
						"serviceName":"app.subs.updatecouponcard",
			          	"timestamp":this.$global().timestamp,
			          	"serialNumber":this.$global().serialNumber,
			          	"request_data":{
				            "userId": userId,
				            "activityId": activityId,
			        	}
				  	}
				  	if(this.couponState == true){
						this.couponState = false
					  	this.$axios(receiveData).then((response) => {
					  		if(response.retCode == 0){
					  			this.couponState = false
					  			this.couponsHttpRequest(userId);
								bridge.call("showAlert",{msg: "优惠券领取成功！"})
					  		}else{
					  			this.couponState = true
					  			this.couponsHttpRequest(userId);
								bridge.call("showAlert",{msg: "优惠券领取失败！"})
					  		}
					  	});		
					}else{
						bridge.call("showAlert",{msg: "请勿重复领取！"})
					}				  	
				}else{
					bridge.call("showAlert",{msg: "请勿重复领取！！"})
				}						
			},

			chooseStoreContent(index){
				if(index == 0){
					this.carSource = true;
					this.activity = false;
				}else if(index == 1){
					this.carSource = false;
					this.activity = true;				
				}
			},
			couponsHttpRequest(userId){		
				this.couponState = true	
				this.couponData.request_data.userId = userId			
				this.$axios(this.couponData).then((response) => {
					let couponLength = response.response_data.canUseCouponListEntities.length;		 
					this.box='width:'+(4.1*couponLength+0.23)+'rem';								 
					this.coupons = response.response_data.canUseCouponListEntities;
					if(couponLength>0){
						this.couponisShow = true
					}else{
						this.couponisShow = false		
					}					
				});
			}
		}
	}
</script>