<template>
<div>
	<div class="carDetail" v-show="!failed">
		<div class="banner" style="height:7.5rem;">
	    	<div @click="bigBannerShow" class="swiper-container">
		    	<div class="swiper-wrapper">
			        <div class="swiper-slide" v-for="(carsource,index) in logoUrl" :key="carsource.id">
			        	<div :data-background="carsource.substring(0, carsource.length - carsource.split('.')[carsource.split('.').length-1].length-1)+'_472x472.'+carsource.split('.')[carsource.split('.').length-1]" class="swiper-lazy" style="height:7.5rem" ref="bigImg"></div>   
			        	<div class="swiper-lazy-preloader"></div>  
			        </div>
			    </div>
		    </div>
		</div>
		<div class="big_banner" v-show="bigBanner" @click="bigBannerHide">
	    	<div class="swiper-container1">
		    	<div class="swiper-wrapper">
			        <div class="swiper-slide" v-for="(carsource1,index) in logoUrl" :key="carsource1.id">
			        	<div :data-background="carsource1.substring(0, carsource1.length - carsource1.split('.')[carsource1.split('.').length-1].length-1)+'_472x472.'+carsource1.split('.')[carsource1.split('.').length-1]" class="swiper-lazy" style="height:7.5rem;background-size:100% 100%;margin-top:-8%;"></div>  
			        	<div class="swiper-lazy-preloader"></div>  
			        </div>
			    </div>
		    </div>
		    <div class="swiper-pagination1"></div>  
		</div>
		<div class="carSourceMessage">
			<div>
				<h2 class="chit_title">{{dealers.activityTitle}}</h2>
				<p class="activity_Content">{{dealers.activityDescribe}}
				</p>
				<p class="activity_money"><i class="first_i">￥</i><span>{{dealers.groupPrice}}</span><i>抵扣<s>￥{{dealers.originalPrice}}</s></i></p>
				<p>活动有效期：{{dealers.effectiveStartTime.replace(/-/g,'.')}}-{{dealers.endTime.replace(/-/g,'.')}}</p>
				<p class="activity_Cars">活动车系：{{carLines.join('、')}}</p>
				<p class="dealerName">经销商：{{dealers.dealerName}}</p>
				<p class="activity-title" v-for="tag in tags">
					{{tag}}&nbsp;&nbsp;
				</p>				
			</div>
		</div>		
		<div class="result">
			<h2 class="activity_detail">活动详情</h2>
          	<div class="carsShow" v-html="dealers.activityDetails">  
	          	<div v-for="(carsource,index) in logoUrl" :key="carsource.id">
	          		<img class="activityImg" @click="carsShowMasklayer(carsource)" v-lazy="carsource.substring(0, carsource.length - carsource.split('.')[carsource.split('.').length-1].length-1)+'_750x562.'+carsource.split('.')[carsource.split('.').length-1]" alt="车源展示图片">   
	          	</div>
	          	<div class="carsShow_Masklayer" v-show="Masklayer" @click="carsHideMasklayer">
	          		<img class="Masklayer_Img" v-lazy="carsourceMasklayer.substring(0, carsourceMasklayer.length - carsourceMasklayer.split('.')[carsourceMasklayer.split('.').length-1].length-1)+'_750x562.'+carsourceMasklayer.split('.')[carsourceMasklayer.split('.').length-1]">
	          	</div>
          	</div>	 
		</div>
		<div style="height: .87rem"></div>
		<div class="cardetailFooter">
			<ul>
				<li @click="goDelaer">进入店铺</li>
				<li @click="onlineConsulting">在线咨询</li>
				<li @click="goConfirmOrder">立即购买</li>
			</ul>
		</div>
	</div>
	<failed v-show='failed'></failed>	
</div>
</template>
<script>
	import {Tab, TabItem} from 'vux';	
	import { swiper, swiperSlide,swiperPlugins } from 'vue-awesome-swiper';
	import failed from '../../components/failed.vue'
	export default{
		components: {
		    Tab, 
		    TabItem,
		    swiper, 
		    swiperSlide,
		    failed
		},
		data(){
			return{
				carsource: [], 
				carsourceMasklayer:'', 
				Masklayer:false,
				bigBanner:false,					 
				userId:'',
				cityId: '', 						 
				carDetail:'',			
				dealersData: '',
				dealers: [],
				carLines:[],
				tags:[],
				activityDetails:'',
				logoUrl:[],
				loginId:'',
				dealerName:'',
				failed:false
			}

		},
		created(){
			this.cityId = this.$route.query.cityId;
			this.activityId = this.$route.query.activityId;
			this.userId = this.$route.query.userId;	
			this.activityDetailsData();
		},
		methods: {
			MySwiper(){
				let _this = this;
				let mySwiper = new Swiper('.swiper-container',{
					lazyLoading : true,	 
					lazyLoadingInPrevNextAmount: 0, 
					pagination : '.swiper-pagination',	 
					paginationType : 'custom',
					preloadImages:false,
					centeredSlides: true,
					paginationCustomRender: function (swiper, current, total) { return current+'/'+total;}
				});
				let myBigSwiper = new Swiper('.swiper-container1',{
					lazyLoading : true, 
					lazyLoadingInPrevNextAmount: 0, 
					pagination : '.swiper-pagination1', 
					paginationType : 'fraction',
					preloadImages:false,
					centeredSlides: true,
					observer: true,  
                    observeParents: true 
				});	
				mySwiper.params.control = myBigSwiper;
				myBigSwiper.params.control = mySwiper;

		  	},
		  	bigBannerShow(){	 
		  		this.bigBanner = !this.bigBanner;
		  	},
		  	bigBannerHide(){	 
		  		this.bigBanner = !this.bigBanner;
		  	},
		  	carsShowMasklayer(carsource){	 
		  		this.carsourceMasklayer = carsource;
		  		this.Masklayer = !this.Masklayer;
		  	},
		  	carsHideMasklayer(){	 
		  		this.Masklayer = !this.Masklayer;
		  		this.carsourceMasklayer = '';
		  	},
			goDelaer(){
				var bridge = getJsBridge();
				bridge.call("startNativeActivity",{url: this.$global().url+"dealerhome?dealerCode="+this.loginId+"&cityId="+this.cityId, title: "1"+this.dealerName});
			},
			onlineConsulting(){
				var _this = this
				var bridge = getJsBridge();
				var user = bridge.call("getUserId");
					if(user == "-1"){
						bridge.call("doLogin",{},function(data){
							bridge.call("startChatActivity",{id: _this.loginId,name: _this.dealerName}); 
						})
					}else{
						bridge.call("startChatActivity",{id: _this.loginId,name: _this.dealerName}); 
					}	
			},
			goConfirmOrder(){
				var bridge = getJsBridge();
				var _this = this;	

				var user = bridge.call("getUserId");
					if(user == "-1"){
						bridge.call("doLogin",{},function(data){
							_this.userId = JSON.parse(data).userId;
							bridge.call("startNativeActivity",{url: this.$global().url+"confirmchitorder?userId="+_this.userId+"&activityId="+_this.activityId,title:"订单确认"});
						})
					}else{
						_this.userId = user;

						bridge.call("startNativeActivity",{url: this.$global().url+"confirmchitorder?userId="+_this.userId+"&activityId="+_this.activityId,title:"订单确认"});
					}
			},
			activityDetailsData(){
				var _this = this;
	            this.dealersData = {
					"serviceName":"app.query.activityList",
		          	"timestamp":this.$global().timestamp,
		          	"serialNumber":this.$global().serialNumber,
		          	"request_data":{
		          		"page":"",
		          		"pageSize":"",
		          		"activityId":this.activityId,
		          		"cityId":"",
		          		"activityType":"",
		          		"activityService":"",
		          		"activityTagId":"",
		          		"carLineId":"",
		          		"dealerCode":""
		          	}
			  	}
				this.$axios(this.dealersData).then((response) => {
					if(response.retCode == "0"){
						_this.dealers=response.response_data.activitinfos["0"];
						_this.carLines=response.response_data.activitinfos["0"].carLines;
						_this.tags=response.response_data.activitinfos["0"].tags; 
						_this.logoUrl.push(response.response_data.activitinfos["0"].logoUrl);
						_this.loginId = response.response_data.activitinfos["0"].dealerCode;
						_this.dealerName = response.response_data.activitinfos["0"].dealerName;

						var newTag = [];
						if( _this.tags.length>=3 ){
							for( var j=0;j<3;j++ ){
								newTag.push(_this.tags[j]);
							}
							_this.tags = newTag;
						}
						setTimeout(() => {
			        		_this.MySwiper();
			        	},1)
					}else{
						this.failed=true;
					}
					
				})
			},
		},
		mounted(){
			var _this = this;
			window.isH5BigPicStatus = function(data){
				var bridge = getJsBridge();
				if( _this.bigBanner==true||_this.Masklayer==true ){
					data = "0";
					_this.bigBanner = false;
					_this.Masklayer = false;
					_this.carsourceMasklayer = '';
				}else{
					data = "1";
				}
				return data;
			}
			setTimeout(function(){
				for(var i=0; i<document.querySelectorAll('a').length; i++){
					document.querySelectorAll('a')[i].href = 'javascript:void(0);'
				}
			},150);
		}
	}
</script>