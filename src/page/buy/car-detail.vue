<template>
<div>
  <div v-show="!failed">
  	<div class="carDetail" v-show="!load">
		<div class="banner">
	    	<div @click="bigBannerShow" class="swiper-container">
		    	<div class="swiper-wrapper">
			        <div class="swiper-slide" v-for="(carsource,index) in carsource" :key="carsource.id">
			        	<div :data-background="carsource.substring(0, carsource.length - carsource.split('.')[carsource.split('.').length-1].length-1)+'_750x562.'+carsource.split('.')[carsource.split('.').length-1]" class="swiper-lazy" style="height:5.62rem" ref="bigImg"></div>
			        	<div class="swiper-lazy-preloader"></div>
			        	<div class="swiper-pagination"></div>
			        </div>
			    </div>
		    </div>
		</div>
		<div @click="bigBannerHide" class="big_banner" v-show="bigBanner">
	    	<div class="swiper-container1">
		    	<div class="swiper-wrapper">
			        <div class="swiper-slide" v-for="(carsource1,index) in carsource" :key="carsource1.id">
				        <div class="swiper-zoom-container">
			        		<img :src="carsource1.substring(0, carsource1.length - carsource1.split('.')[carsource1.split('.').length-1].length-1)+'_750x562.'+carsource1.split('.')[carsource1.split('.').length-1]" class="swiper-lazy">
				        </div>
				        <div class="swiper-lazy-preloader"></div>
			        </div>
			    </div>
		    </div>
		    <div class="swiper-pagination1"></div>
		</div>
		<div class="carSourceMessage">
			<div>
				<h2>奥迪 {{carModel}} {{modelCode}} {{transmission_Type}} {{carAir}} {{deviceType}}</h2>
				<p>{{dateOnCardYear}}年/{{mileage}}万公里/{{area}}</p>
				<p v-if="marketingPrice == 'NaN'"></p>
				<p v-else>新车指导价<s>{{marketingPrice}}万</s></p>
				<p><span>{{price}}万</span>二手车价</p>
				<h3>
					<img :src="tag" v-for="tag in tags" :key="tag.id">
				</h3>
			</div>
		</div>
		<div class="navigation">
			<div class="left">
				<h3>{{agcyName}}</h3>
				<p class="iconfont icon-weizhi" @click="jumpmapNav"><span>{{agcyAddress}}</span><em class="iconfont icon-1201youjiantou"></em></p>
                <p class="iconfont icon-font52" @click="tel400"><span>服务热线: {{agcy400Tel}}</span><em class="iconfont icon-1201youjiantou"></em></p>
			</div>
<!--			<a :href="'navigation://goMap.com?lat='+longitude+'&lon='+latitude+'&dealerName='+agcyName">
				<div class="right"></div>
			</a>-->
		</div>
		<div class="serverPromise">
			<img src="../../../static/images/server-promise.png">
		</div>
		<div class="carAdvanced">
			<h2>车况信息</h2>
			<div class="carMessage">
				<div>
					<h3>{{dateOnCardTime}}</h3>
					<p>{{registration}}上牌</p>
				</div>
				<div>
					<h3>{{mileage}}万</h3>
					<p>里程(公里)</p>
				</div>
				<div>
					<h3>{{area}}</h3>
					<p>所在地</p>
				</div>
				<div>
					<h3>{{transmission_Type}}</h3>
					<p>变速箱</p>
				</div>
				<div>
					<h3>{{emissionStandards}} <span @click='tips'></span></h3>
					<p>排放标准</p>
				</div>
			</div>
			<div class="carDetailSign" v-show="carDetailSign">
				<div>
					<h3>{{carDetail.previousUse== 01? '运营' :'非运营'}}</h3>
					<p>车辆类型</p>
				</div>
				<div>
					<h3>{{yearlyCheckDate}}</h3>
					<p>年检日期</p>
				</div>
				<div>
					<h3>{{insuranceDate}}</h3>
					<p>交强险到期</p>
				</div>
				<div>
					<h3>{{exteriorColor}}</h3>
					<p>外观颜色</p>
				</div>
				<div>
					<h3>汽油</h3>
					<p>燃油类型</p>
				</div>
				<div>
					<h3>{{carTag =="奥迪认证车"?"奥迪认证车":"否"}}</h3>
					<p>奥迪认证车</p>
				</div>
				<div>
					<h3>{{carDetail.warrantyAvailable == 01 ? "是" : carDetail.warrantyAvailable == 02 ? "否"  : "是"}}</h3>
					<p>是否质保</p>
				</div>
				<div>
					<h3>{{carTags =="2年0利率"?"是":"否" }}</h3>
					<p>金融政策</p>
				</div>
			</div>
			<h4 @click="carSign">{{carMessage}}<span :class="{'arrowRotate':carDetailSign}"></span></h4>
		</div>
		<div class="result">
			<tab :line-width=0 active-color='#ffffff' v-model="index" custom-bar-width="1.95rem">
	        	<tab-item class="vux-center" v-for="(item, index) in list" @click.native="chooseStoreContent(index)" :key="index">{{item}}</tab-item>
	        </tab>
          	<div class="reportresult" v-show="reportresult">
          		<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;经检测，该车骨架完好，排除事故车、火烧。水泡等特殊情况。发动机舱内部机械部件正常，无拆卸。</p>
          		<div class="test-report0">
          			<img src="../../../static/images/test-report0.png">
          		</div>
          		<div class="test-report1">
          			<img src="../../../static/images/test-report1.png">
          		</div>
          		<div class="test-report2">
          			<img src="../../../static/images/test-report2.png">
          		</div>
          	</div>
          	<div class="carsShow" v-show="show">
	          	<div v-for="(carsource,index) in carsource" :key="carsource.id">
	          		<img @click="carsShowMasklayer(carsource)" v-lazy="carsource.substring(0, carsource.length - carsource.split('.')[carsource.split('.').length-1].length-1)+'_750x562.'+carsource.split('.')[carsource.split('.').length-1]">
	          	</div>
	          	<div class="carsShow_Masklayer" v-show="Masklayer" @click="carsHideMasklayer">
	          		<img class="Masklayer_Img" v-lazy="carsourceMasklayer.substring(0, carsourceMasklayer.length - carsourceMasklayer.split('.')[carsourceMasklayer.split('.').length-1].length-1)+'_750x562.'+carsourceMasklayer.split('.')[carsourceMasklayer.split('.').length-1]">
	          	</div>
          	</div>
		</div>
		<div class="recommendForYou">
			<h2 v-show="recommendForYou">为您推荐</h2>
			<div>
				<Carlistsm queryType="RECOMMEND" :cityId="cityId" :modelLine="modelLine" pageSize=2 @listenToChildEvent="recommend" content="正在研究您的喜好！" carDetailPath="cardetail"></Carlistsm>
			</div>
		</div>
		<div style="width:100%;height:.87rem"></div>
		<div class="cardetailFooter">
			<ul>
				<li @click="goDelaer">进入店铺</li>
				<li @click="onlineConsulting">在线咨询</li>
				<li @click="goConfirmOrder">预付意向金 <span v-show="scrolled">意向金：{{deposit}}万元</span></li>
			</ul>
		</div>
	</div>
	<none v-show='load' src='../../static/images/loadf.png' content='车源信息走丢了！' carPath="cardetail"></none>
  </div>
	<failed v-show='failed'></failed>
</div>
</template>
<script>
	import {Tab, TabItem} from 'vux';
	import Carlistsm from '../list/car-list-sm.vue';
	import none from '../../components/null.vue';
	import { swiper, swiperSlide,swiperPlugins } from 'vue-awesome-swiper';
	import failed from '../../components/failed.vue'
	const list = () => [ '车源展示', '检测报告'];
	export default{
		components: {
		    Tab,
		    TabItem,
		    Carlistsm,
		    none,
		    swiper,
		    swiperSlide,
		    failed
		},
		data(){
			return{
				bigBanner:false,
				userId:'',
				cityId: '',
				cityName:'',
				carDetail:'',
				login: true,
				collectChoose: false,
				carsource: [],
				carsourceMasklayer:'',
				Masklayer:false,
				price: '',
				manufacture: '',
				modelLine:'',
				modelName:'',
				agcyName:'',
				mileage:'',
				area:'',
				carAir:'',
				emissionStandards:'',
				exteriorColor: '',
				registration: '',
				insuranceDate: '',
				yearlyCheckDate: '',
				loginId: '',
				agcyAddress: '',
                agcy400Tel: '',
				smallImage: '',
				tags:[],
				list: list(),
				index: 0,
				reportresult: false,
				show: true,
				dateOnCardTime: '',
				dateOnCardYear: '',
				carDetailSign: false,
				carMessage: '查看全部车况',
				releaseNumber:'',
				deposit: '',
				orderName: '',
				recommendForYou: true,
				carStatus:'',
				transmission:'',
				transmission_Type:'',
				deviceType:'',
				modelCode:'',
				carModel:'',
				deposit: '',
				marketingPrice: '',
				scrolled: false,
				startX: 0,
        		startY: 0,
        		load: '',
        		failed:false,
        		longitude: '',
        		latitude: '',
        		navigation: '',
        		dealersData: '',
        		dealer400:'',
        		carTag:[],
        		carTags:'',
			}

		},
		created(){
			this.modelLine = decodeURI(this.$route.query.modelLine);
			this.releaseNumber = this.$route.query.releaseNumber;
			this.cityId = this.$route.query.cityId;
		},
		methods: {
			tips(){
				var bridge=getJsBridge();
				bridge.call("showAlert",{msg:"异地购车、排放标准请咨询当地经销商"})
			},
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
					zoom : true,
					zoomMax :2,
					observer: true,
                    observeParents: true
				});
				mySwiper.params.control = myBigSwiper;
				myBigSwiper.params.control = mySwiper;
		  	},
		  	carsShowMasklayer(carsource){
		  		this.carsourceMasklayer = carsource;
		  		this.Masklayer = !this.Masklayer;
		  	},
		  	carsHideMasklayer(){
		  		this.Masklayer = !this.Masklayer;
		  		this.carsourceMasklayer = '';
		  	},
		  	bigBannerShow(){
		  		this.bigBanner = !this.bigBanner;
		  	},
		  	bigBannerHide(){
		  		this.bigBanner = !this.bigBanner;
		  	},
			chooseStoreContent(index){
				if(index == 0){
					this.reportresult = false;
					this.show = true;
				}else if(index == 1){
					this.reportresult = true;
					this.show = false;
				}
			},
			userYear(){
				let timer = new Date();
				let nowYear = timer.getFullYear();
				let nowMonth = timer.getMonth()+1;
				var registration = this.registration.split('-');
				if(nowMonth > registration[1]){
					this.dateOnCardTime = (nowYear-registration[0])+'年'+(nowMonth-registration[1])+'个月';
				}else if(nowMonth == registration[1]){
					this.dateOnCardTime = (nowYear-registration[0])+'年整';
				}else{
					this.dateOnCardTime = (nowYear-registration[0]-1)+'年'+(nowMonth+12-registration[1])+'个月';
				}
			},
			carSign(){
				if(this.carMessage == '查看全部车况'){
					this.carMessage = '收起';
					this.carDetailSign = true;
				}else{
					this.carMessage = '查看全部车况';
					this.carDetailSign = false;
				}
			},
			goDelaer(){
				var bridge = getJsBridge();
				bridge.call("startNativeActivity",{url: this.$global().url+"dealerhome?dealerCode="+this.loginId+"&cityId="+this.cityId, title: "1"+this.agcyName});
			},
			jumpmapNav(){
				var bridge = getJsBridge();
			  	bridge.call("startNativeActivity",{url:this.$global().url+"maphome?dealerCode="+this.loginId+"&cityId="+this.cityId+"&longitude="+this.longitude+"&latitude="+this.latitude,title:"-2"});
			},
			tel400(){
				var bridge = getJsBridge();
			  	bridge.call("callTel",{tel:this.agcy400Tel});
			},
			onlineConsulting(){
				var _this = this
				var bridge = getJsBridge();
				var user = bridge.call("getUserId");
				if(user == "-1"){
					bridge.call("doLogin",{},function(data){
						bridge.call("startChatActivity",{id: _this.loginId,name: _this.agcyName});
					})
				}else{
					bridge.call("startChatActivity",{id: _this.loginId,name: _this.agcyName});
				}
			},
			goConfirmOrder(){
				var bridge = getJsBridge();
				var _this = this;
				var user = bridge.call("getUserId");
					if(user == "-1"){
						bridge.call("doLogin",{},function(data){
							_this.userId = JSON.parse(data).userId;
							bridge.call("startNativeActivity",{url: this.$global().url+"confirmorder?userId="+_this.userId+"&releaseNumber="+_this.releaseNumber,title:"订单确认"});
						})
					}else{
						_this.userId = user;
						bridge.call("startNativeActivity",{url: this.$global().url+"confirmorder?userId="+_this.userId+"&releaseNumber="+_this.releaseNumber,title:"订单确认"});
					}
			},
			carDetailHttpData(){
				var _this = this;
				let data = {
					"serviceName":"app.query.carDetail",
					"timestamp":this.$global().timestamp,
					"serialNumber":this.$global().serialNumber,
				    "request_data":{
				      "releaseNumber":this.releaseNumber
				    }
				}
				this.$axios(data).then((value) => {
					if(value.retCode == 0){
						if(value.response_data.carDetail != undefined){
							this.load = false
						}else{
							this.load = true
						}
						_this.carDetail = value.response_data.carDetail;
						_this.price = (_this.carDetail.price/10000).toFixed(2);
						_this.manufacture =	_this.carDetail.manufacture;
						_this.modelLine = _this.carDetail.modelLine;
						_this.modelName = _this.carDetail.modelName;
						_this.mileage = _this.carDetail.mileage<=100 ? 0.01 : (_this.carDetail.mileage/10000).toFixed(2);
						_this.area = _this.carDetail.area;
						_this.agcyName = _this.carDetail.agcyName;
						_this.emissionStandards = _this.carDetail.emissionStandards;
						_this.carAir = _this.carDetail.carAir;
						_this.exteriorColor = _this.carDetail.exteriorColor;
						_this.registration = _this.carDetail.registration.substring(0,7);
						_this.dateOnCardYear = _this.carDetail.registration.substring(0,4);
						_this.insuranceDate = _this.carDetail.insuranceDate;
						_this.yearlyCheckDate = _this.carDetail.yearlyCheckDate;
						_this.loginId = _this.carDetail.loginId;
						_this.agcyAddress = _this.carDetail.agcyAddress;
						_this.smallImage = _this.carDetail.smallImage.path;
						_this.deposit = _this.carDetail.deposit;
						_this.carStatus = _this.carDetail.carStatus;
						_this.transmission = _this.carDetail.transmission;
						_this.deviceType = _this.carDetail.deviceType;
						_this.modelCode = _this.carDetail.modelCode;
						_this.carModel = _this.carDetail.carModel;
						_this.deposit = (_this.carDetail.deposit/10000).toFixed(1);
						_this.marketingPrice = (_this.carDetail.marketingPrice/10000).toFixed(2);
						_this.userYear();
						if( _this.transmission=="01" ){
							_this.transmission_Type = '自动档';
						}else if( _this.transmission=="02" ){
							_this.transmission_Type = '手动档';
						}else if( _this.transmission=="03" ){
							_this.transmission_Type = '手自一体';
						}
						for(let i in _this.carDetail.bigImages){
							_this.carsource.push(_this.carDetail.bigImages[i].path);
						}
						for(var i in _this.carDetail.carTags){
							if(_this.carDetail.carTags[i].tagName == "奥迪认证车" || _this.carDetail.carTags[i].tagName == "2年0利率"){
	        					_this.tags.push(_this.carDetail.carTags[i].tagImage);
	        					if( _this.carDetail.carTags[i].tagName == "奥迪认证车" ){
	        						_this.carTag=_this.carDetail.carTags[i].tagName;
	        					}
	        					if( _this.carDetail.carTags[i].tagName == "2年0利率" ){
	        						_this.carTags=_this.carDetail.carTags[i].tagName;
	        					}
	        				}

						}
						setTimeout(() => {
							_this.MySwiper();
						},1)
						_this.dealersData = {
							"serviceName":"app.query.dealerList",
				          	"timestamp":_this.$global().timestamp,
				          	"serialNumber":_this.$global().serialNumber,
				          	"request_data":{
					            "dealerCode": _this.loginId
				        	}
					  	}
					  	this.$axios(_this.dealersData).then((response) => {
					  		_this.longitude = response.response_data.dealers["0"].longitude;
					  		_this.latitude = response.response_data.dealers["0"].latitude;
					  		_this.agcy400Tel = response.response_data.dealers["0"].ci400phone;
					  	})
					}else{
						this.failed=true;
		        	}
				});
			},
			left_ServerPromise(){
				var bridge = getJsBridge();
				bridge.call("startIntroductionActivity",{type: 1});
			},
			center_ServerPromise(){
				var bridge = getJsBridge();
				bridge.call("startIntroductionActivity",{type: 2});
			},
			right_ServerPromise(){
				var bridge = getJsBridge();
				bridge.call("startIntroductionActivity",{type: 3});
			},
			recommend(data){
				if(data == 0){
					this.recommendForYou = false;
				}else{
					this.recommendForYou = true;
				}
			},

			touchStart(){
				let evt = event||window.event;
		        try{
		            var touch = evt.touches[0],
		                    x = Number(touch.pageX),
		                    y = Number(touch.pageY);
		            this.startX = x;
		            this.startY = y;
		        }catch(e){
		        }
		    },
		    touchMove(){
		    	let evt = event||window.event;
		        try{
		            var touch = evt.touches[0],
		                    x = Number(touch.pageX),
		                    y = Number(touch.pageY);
		            if (y - this.startY>0) {
		            	this.scrolled = false;
		            }else{
		            	this.scrolled = true;
		            }
		        }catch(e){}
		    },
		    touchEnd(){
		    	let evt = event||window.event;
		        try{
		            var touch = evt.touches[0],
		                    x = Number(touch.pageX),
		                    y = Number(touch.pageY);
		            if (y - this.startY>0) {
		            	this.scrolled = false;
		            }else{
		            	this.scrolled = true;
		            }
		        }catch(e){}
		    }
		},
		mounted(){
			this.cityId = this.$route.query.cityId;
			this.cityName = this.$route.query.cityName;
			this.carDetailHttpData();
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
			window.addEventListener('touchstart',this.touchStart);
	        window.addEventListener('touchmove',this.touchMove);
	        window.addEventListener('touchend',this.touchEnd);
		},

	}
</script>
