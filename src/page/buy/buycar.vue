<template>
<div class="buyCar" v-show='!failed'>
	<div class="search_box">
		<div class="search">				
			<div class="searchList" @click="getsearch"> 
				<div class="city" @click.stop="getlocalcity">
					{{city.length>4?city.substring(0,3)+"...":city}}
					<span></span>
				</div>
				<div class="searchCarDealer">
					<img src="../../../static/images/searchcar-dealer.png">
				</div>
			</div>
			<span class="topRightIcon topRightIconsm" @click="choosestyle" v-if="bigsm"></span>	
			<span class="topRightIcon topRightIconbig" @click="choosestyle" v-else></span>	
		</div>	
		<div class="screening">
			<div class="sizer">
				<ul class="sizerBox">
					<li v-for='(s,index) in sizers' :class="['sizerbox_li',{'sizerBox_li':s.sizerBox_li}]" :key="s.id" @click="jump(index)" >
						<span>{{s.option}}</span>
						<img :class="{'sizeSrcStyle':s.SizesrcStyle}" :src='src'>						
					</li>
				</ul>
			</div>
			<div class="priceBox">
				<div class="mask_layer" v-show="pricemask_layer" @click="PriceBoxHide"></div>
				<div class="price" v-show="sort">
					<ul class="sortScree">
						<li :class="['sortScree_A',{'sortScreeNew':sortScreeNew}]" @click="sortScree($event)">最新发布</li>	
			      		<li :class="['sortScree_B',{'sortScreeUp':sortScreeUpPrice}]" @click="sortScree($event)">价格</li>
			      		<li :class="['sortScree_C',{'sortScreeDown':sortScreeDownPrice}]" @click="sortScree($event)">价格</li>
			      		<li :class="['sortScree_D',{'sortScreeUp':sortScreeUpKm}]" @click="sortScree($event)">里程</li>
			      		<li :class="['sortScree_E',{'sortScreeDown':sortScreeDownKm}]" @click="sortScree($event)">里程</li>
			      		<li :class="['sortScree_F',{'sortScreeUp':sortScreeUpYear}]" @click="sortScree($event)">车龄</li>
			      		<li :class="['sortScree_G',{'sortScreeDown':sortScreeDownYear}]" @click="sortScree($event)">车龄</li>
			    	</ul>
				</div>
				<div class="price" v-show="car">
					<ul class="carPrice">
			      		<li :class="['carPrice_li',{'carPrice_licolor':dictName==dict.dictName}]" v-for='(dict,index) in dicts' :key="dict.id" @click="carScree(index,$event)">
			      			{{dict.dictName}}
			      		</li>
					</ul>		
				</div>
				<div class="price" v-if="priceIsShow">
					<div class="rangeBox">
						<group>
					      <p class="customtext">自定义价格<span>(万)</span></p>
					      <button class="setPrice" type="button" @click="setPrice($event)">确定</button>
					      <div class="range_rl">
					      	<div class="rangeleft">
						      <cell primary="content">
						        <range v-model="lessPrice" :min="0" :max="52" :step="Step" :range-bar-height="5" @touchmove.native="leftstep($event)">
						        </range>
						      </cell>
						    </div>
						    <div class="rangeright">
						      <div :style="price_frame_position" class="price_frame" v-for="priceInterval_frame in priceIntervals" :key="priceInterval_frame.id">
						      	{{priceInterval_frame}}
						      </div>
						      <cell primary="content">
						        <range v-model="morePrice" :min="0" :max="52" :step="Step" :range-bar-height="5" @touchmove.native="rightstep($event)">
						        </range>
						      </cell>
						    </div>
					      </div>
					      <ul class="range_Ul">
							<li class="rangeul_Li_A">0</li>
							<li class="rangeul_Li_B">10</li>
							<li class="rangeul_Li_C">20</li>
							<li class="rangeul_Li_D">30</li>
							<li class="rangeul_Li_E">40</li>
							<li class="rangeul_Li_F">不限</li>
						  </ul> 
					    </group>  
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="zhanwei" style="height:2.02rem"></div>

	<div v-cloak>
		<div class="searchHistory">
			<span v-for='carhistory in carhistorys' v-show="removeCar">
				{{carhistory}}
				<span class="removeStorage" @click="RemoveCh($event)"></span>
			</span>
			<span v-for='pricehistory in pricehistorys' :key="pricehistory.id" v-show="removePrice">
				{{pricehistory}}
				<span class="removeStorage" @click="RemovePh($event)"></span>
			</span>
			<span v-for='label in labels_text' v-show="labelsShow">
				{{label}}
				<span class="removeStorage" @click="RemoveLabels($event)"></span>
			</span>
			<span v-for='color in color_text' v-show="colorShow">
				{{color}}
				<span class="removeStorage" @click="RemoveColor($event)"></span>
			</span>
			<span v-for='vehicleage in vehicleage_text' v-show="vehicleageShow">
				{{vehicleage}}
				<span class="removeStorage" @click="RemoveVehicleage($event)"></span>
			</span>
			<span v-for='mileage in mileage_text' v-show="mileageShow">
				{{mileage}}
				<span class="removeStorage" @click="RemoveMileage($event)"></span>
			</span>
			<span v-for='displacement in displacement_text' v-show="displacementShow">
				{{displacement}}
				<span class="removeStorage" @click="RemoveDisplacement($event)"></span>
			</span>
			<span v-for='emission in emission_text' v-show="emissionShow">
				{{emission}}
				<span class="removeStorage" @click="RemoveEmission($event)"></span>
			</span>
			<span v-for='transmission in transmission_text' v-show="transmissionShow">
				{{transmission}}
				<span class="removeStorage" @click="RemoveTransmission($event)"></span>
			</span>
			<span v-for='carTypeHistory in carTypeHistorys' v-show="carTypeShow">
				{{carTypeHistory}}
				<span class="removeStorage" @click="RemovecarType($event)"></span>
			</span>

			<p v-show="load"><img src="../../../static/images/carNoneTips.png"><span>无符合条件的车源，留下线索经销商会在有车时主动联系您</span></p>
		</div>
		<div class="searchHistoryZhanwei">
			<span v-for='carhistory in carhistorys' v-show="removeCar">
				{{carhistory}}
				<span class="removeStorage" @click="RemoveCh($event)"></span>
			</span>
			<span v-for='pricehistory in pricehistorys' :key="pricehistory.id" v-show="removePrice">
				{{pricehistory}}
				<span class="removeStorage" @click="RemovePh($event)"></span>
			</span>
			<span v-for='label in labels_text' v-show="labelsShow">
				{{label}}
				<span class="removeStorage" @click="RemoveLabels($event)"></span>
			</span>
			<span v-for='color in color_text' v-show="colorShow">
				{{color}}
				<span class="removeStorage" @click="RemoveColor($event)"></span>
			</span>
			<span v-for='vehicleage in vehicleage_text' v-show="vehicleageShow">
				{{vehicleage}}
				<span class="removeStorage" @click="RemoveVehicleage($event)"></span>
			</span>
			<span v-for='mileage in mileage_text' v-show="mileageShow">
				{{mileage}}
				<span class="removeStorage" @click="RemoveMileage($event)"></span>
			</span>
			<span v-for='displacement in displacement_text' v-show="displacementShow">
				{{displacement}}
				<span class="removeStorage" @click="RemoveDisplacement($event)"></span>
			</span>
			<span v-for='emission in emission_text' v-show="emissionShow">
				{{emission}}
				<span class="removeStorage" @click="RemoveEmission($event)"></span>
			</span>
			<span v-for='transmission in transmission_text' v-show="transmissionShow">
				{{transmission}}
				<span class="removeStorage" @click="RemoveTransmission($event)"></span>
			</span>
			<span v-for='carTypeHistory in carTypeHistorys' v-show="carTypeShow">
				{{carTypeHistory}}
				<span class="removeStorage" @click="RemovecarType($event)"></span>
			</span>
		</div>
        <findcar v-show='load' :cityId='findcarCity'></findcar>
			<div class="Car_box" v-if="bigsm">
				<div id="progress" v-if='progress2'>
					<img class="carloading" src="../../../static/images/loading/loading.gif">
					<p>正在刷新...</p>
				</div>

				<div id="progress" v-if='progress1'>
					<img class="carloading" src="../../../static/images/loading/loading.gif">
					<p>松手刷新</p>
				</div>
				<div class="car-list-sm">
					<p class="wntj" v-show='load'>为您推荐</p>	
					<none v-show='carisNone' path='sell' src='../../static/images/loadf.png' content='正在研究您的喜好！'></none>
					<div class="list" v-for="(carbox,index) in cars">
						<div v-for="(car,index) in carbox" :key="car.id" @click="jumpdealerdetail(car)">
						    <img v-lazy="car.smallImage.path != undefined ? car.smallImage.path.substring(0, car.smallImage.path.length - car.smallImage.path.split('.')[car.smallImage.path.split('.').length-1].length-1)+'_280x210.'+car.smallImage.path.split('.')[car.smallImage.path.split('.').length-1]: ''">
						    <div>
						   		<h2>奥迪 {{car.carModel}} {{car.modelCode}} {{car.transmissiontype}} {{car.carAir}} {{car.deviceType}}</h2>	
						   		<h4 class="buycar_biao">
						   			<img :src="carsign" v-for="carsign in car.tags" :key="carsign.id">		
								</h4>	
								<p>{{car.registration.substring(0,4)}}年/{{car.mileage<=100?0.01:(car.mileage/10000).toFixed(2)}}万公里/{{car.area}}</p>
								<p class="buycar_pay">
									<span class="rmb">{{(car.price/10000).toFixed(2)}}万</span>
									<span v-if="car.marketingPrice == undefined" class="carpay"></span>
									<span v-else class="carpay">新车价</span>
									<span v-if="car.marketingPrice == undefined" class="xincar"></span>
									<span v-else class="xincar">{{(car.marketingPrice/10000).toFixed(2)}}万</span>
								</p>
								<p class="dealerName">{{car.agcyName}}</p>
						    </div>
						</div>
			        </div>
				</div>
			</div>
			<div class="Car_box" v-else>
				<div id="progress" v-if='progress2'>
					<img class="carloading" src="../../../static/images/loading/loading.gif">
					<p>正在刷新...</p>
				</div>
				<div id="progress" v-if='progress1'>
					<img class="carloading" src="../../../static/images/loading/loading.gif">
					<p>松手刷新</p>
				</div>

				<div class="bigCar">
				    <p class="wntj_big" v-show='load'>为您推荐</p>
				    <none v-show='carisNone' path='sell' src='../../static/images/loadf.png' content='正在研究您的喜好！'></none>
					<div class="list" v-for="(carbox,index) in cars">
						<div class="bigCarMeassage" v-for="(car,index) in carbox" :key="car.id"  @click="jumpdealerdetail(car)">
							<div class="tu">
								<div class="swiper-container">
								    <div class="swiper-container">
								    	<div class="swiper-wrapper">
									        <div class="swiper-slide" v-for="src in car.bigImages">

									        	<div :data-background="src.path.substring(0, src.path.length - src.path.split('.')[src.path.split('.').length-1].length-1)+'_750x562.'+src.path.split('.')[src.path.split('.').length-1]" class="swiper-lazy" style="height:5.62rem"></div>
									        	<div class="swiper-lazy-preloader"></div>   
									        </div>
									    </div>
									    <div class="swiper-pagination"></div>   
								    </div>						    
								</div>
								<div class="carSourceMessage">
									<div>
										<h2>奥迪 {{car.carModel}} {{car.modelCode}} {{car.transmissiontype}} {{car.carAir}} {{car.deviceType}}</h2>
										<p>{{car.registration.substring(0,4)}}年/{{car.mileage<=100?0.01:(car.mileage/10000).toFixed(2)}}万公里/{{car.area}}</p>
										<p><span>{{(car.price/10000).toFixed(2)}}万</span>
										<span v-if="car.marketingPrice == undefined" class="carpay"></span>
										<span v-else class="carpay">新车价</span>
										<span v-if="car.marketingPrice == undefined" class="xincar"></span>
										<span v-else class="xincar"><s>{{(car.marketingPrice/10000).toFixed(2)}}万</s></span>
										</p>
										<p class="dealerName">{{car.agcyName}}</p>
										<h3>
											<img :src="carsign" v-for="carsign in car.tags" :key="carsign.id">
										</h3>	
									</div>
								</div>			
							</div>
						 	
						</div>
					</div>					
				</div>
			</div>	

			<div class="loadingData" v-show="loadingData">
				<div>
					<img src="../../../static/images/loading/loading_text.gif">
				</div>
			</div>			

			<div id="progress" v-if='progress' ref="loading">
				<img class="carloading" src="../../../static/images/loading/loading.gif">
				<p>正在加载...</p>
			</div>
			<div id="list-end" v-if='listEnd'>
				没有更多数据
			</div>
	</div>
	<failed v-show='failed'></failed>	
</div>
</template>
<style type="text/css">
	[v-cloak]{
		display: none;
	}
</style>
<script>
	
	import { swiper, swiperSlide,swiperPlugins } from 'vue-awesome-swiper';
	import { XButton, Range, GroupTitle, Group, Cell } from 'vux';
	import failed from '../../components/failed.vue';
	import findcar from '../../page/buy/findcar.vue';
	import none from '../../components/null.vue';
	export default {
		components: {
			swiper, 
	  		swiperSlide,
	  		Range,
    		GroupTitle,
    		XButton,
		    Group, 
		    Cell,
		    failed,
		    findcar,
		    none
		},
		data () {
			return {
				failed:false,
				labelsShow:true,
				colorShow:true,
				transmissionShow:true,
				emissionShow:true,
				vehicleageShow:true,
				mileageShow:true,
				displacementShow:true,
				carTypeShow:true,
				advancedfilter:'',				 
				labels_text:[],					 
		    	color_text:[],					 
		    	transmission_text:[],			 
		    	emission_text:[],				 
		    	vehicleage_text:[],				 
		    	mileage_text:[],				 
		    	displacement_text:[],			 
		        pricemask_layer:false,
				carPrice_licolor:false,
				sortScreeNew:true,
				sortScreeUpPrice:false,
				sortScreeDownPrice:false,
				sortScreeUpKm:false,
				sortScreeDownKm:false,
				sortScreeUpYear:false,
				sortScreeDownYear:false,
				src:'../../../static/images/screen-Downarrow.png',
				sizers: [
				    		{option:'最新发布',index:'0',SizesrcStyle:false,sizerBox_li:false},
				    		{option:'车系',index:'1',SizesrcStyle:false,sizerBox_li:false},
				    		{option:'价格',index:'2',SizesrcStyle:false,sizerBox_li:false},
				    		{option:'高级筛选',index:'3',SizesrcStyle:false,sizerBox_li:false}	 
			    		],
			    sorthistorys: [],
			    carhistorys: [],
			    historyscar: [],
			    priceIsShow:false,
			    price:'',
			    sort:false,
			    car:false,
			    mock_all:false,
			    removeCar: true,
			    lessPrice: 0,					 
			    morePrice: 52,					 
			    dynamiValue: 0,
			    Step: 1,						 
			    priceInterval:[],
			    priceIntervals:['不限价格'],
			    removePrice:true,
			    pricehistorys: [],
			    left:0,
			    right:115,
			    bad_position:(((115+24.5)/2)/10)/2+'rem',
			    price_frame_position:{
			    	left:''
			    },
			    dicts:[],						 
			    dictName:'',					 
			    screen: '',						 
			    results: [],
			    value: '',			    
			    placeholder: '输入车辆/经销商店',
			    bigsm:true,
        		page:1,
        		cars:[],
        		carTypeHistorys:[],				 
        		carType: '',					 
        		cityId: '',						 
        		priceMin: '',					 
        		priceMax: '',					 
        		carKind: '',					 
        		saleType: '',					 
        		dealerCode: '',					 
        		orderBy: 'TIME',						 
        		queryType: '',					 
        		labels:'',						 
		    	color:'',						 
		    	transmission:'',				 
		    	mileAge:'',						 
		    	emission:'',					 
		    	carAge:'',						 
		    	carAir:'',						 
        		city: '',						 
        		returndata: '',					 
        		totalRecords: '',				 
        		userId:'',						 
        		response:'',
        		load: '',						 
        		pageSum: '',
				progress: false,
				progress1: false,
				progress2: false,
				startY: 0,
				endY: 0,
				moveY: '',
				listEnd: false,
				scrollTop: '',
				direction: '',
				clientHeight: '',
				scrollHeight: '',
				moveHeight: '',
        		findcarCity: '',
        		carisNone: false,
        		loadingData: false
	        }
		},
		created(){
		  	this.cityId = this.$route.query.cityId;			 
		  	this.findcarCity = this.cityId;
		  	this.city = this.$route.query.cityName;			 
			this.priceMin = this.$route.query.priceMin;		 
			this.priceMax = this.$route.query.priceMax;		 
		},
		mounted(){
			var _this = this;
			if(this.$route.query.carType == undefined){
				this.carType = '';
			}else{
				this.carType = this.$route.query.carType;		  	
			}
			if(this.$route.query.carKind == undefined){
				this.carKind = ''
				this.dictName = '';
			}else{
				this.carKind = this.$route.query.carKind;		 
				this.dictName = this.carKind;
			}

			this.advancedFilter = this.$route.query.advancedFilter;	 
			if( this.advancedFilter!=undefined ){
				var advancedfilter = this.advancedFilter.replace(/undefined/g,'').split('~');
				this.labels = advancedfilter[0];
				this.color = advancedfilter[1];
				this.transmission = advancedfilter[2];
				this.emission = advancedfilter[3];
				this.carAge = advancedfilter[4];
				this.carAir = advancedfilter[5];
				this.mileAge = advancedfilter[6];
				if( this.labels!="" ){
					this.queryType = "LABEL";
				}else{
					this.queryType = "";
					this.labels = "";
				}
				this.labelsShow = true;
				this.colorShow = true;
				this.transmissionShow = true;
				this.mileageShow = true;
				this.emissionShow = true;
				this.vehicleageShow = true;
				this.displacementShow = true;
				if( advancedfilter[7]!="" ){
					this.labels_text.splice(0,1,advancedfilter[7]);
				}else{
					this.labels_text = [];
					this.labelsShow = false;
				}
				if( advancedfilter[8]!="" ){
					this.color_text.splice(0,1,advancedfilter[8]);
				}else{
					this.color_text = [];
					this.colorShow = false;
				}
				if( advancedfilter[9]!="" ){
					this.transmission_text.splice(0,1,advancedfilter[9]);
				}else{
					this.transmission_text = [];
					this.transmissionShow = false;
				}
				if( advancedfilter[12]!="" ){
					this.mileage_text.splice(0,1,advancedfilter[12]);
				}else{
					this.mileage_text = [];
					this.mileageShow = false;
				}
				if( advancedfilter[10]!="" ){
					this.emission_text.splice(0,1,advancedfilter[10]);
				}else{
					this.emission_text = [];
					this.emissionShow = false;
				}
				if( advancedfilter[11]!="" ){
					this.vehicleage_text.splice(0,1,advancedfilter[11]);
				}else{
					this.vehicleage_text = [];
					this.vehicleageShow = false;
				}
				if( advancedfilter[13]!="" ){
					this.displacement_text.splice(0,1,advancedfilter[13]);
				}else{
					this.displacement_text = [];
					this.displacementShow = false;
				}
			}else{
				this.labels = this.$route.query.saleType;	 
				if( this.labels!=undefined ){
					if( this.labels=="5" ){
						this.labels_text.splice(0,1,"热门车源");
					}else if( this.labels=="2" ){
						this.labels_text.splice(0,1,"奥迪认证车");
					}else if( this.labels=="3" ){
						this.labels_text.splice(0,1,"2年0利率");
					}
					this.queryType = "LABEL";
				}else{
					this.queryType = "";
					this.labels = "";
				}
			}
			if( this.carType ){
				this.carTypeHistorys.splice(0,1,this.carType);
				this.carTypeShow = true;
			}else{
				this.carTypeHistorys = [];
				this.carTypeShow = false;
			}
			if(this.priceMin&&this.priceMax){													 
				this.lessPrice = this.priceMin;
				this.morePrice = this.priceMax;
				this.PriceIntervals ();
				this.priceInterval = this.priceIntervals;
				sessionStorage.setItem('priceInterval',JSON.stringify(this.priceInterval));
				if( this.priceInterval=='不限价格' ){
					this.pricehistorys = [];
				}else{
					this.pricehistorys = this.priceInterval;
				}					
			}else if( sessionStorage.getItem('priceInterval') ){								 
				if( JSON.parse(sessionStorage.getItem('priceInterval'))=='不限价格' ){
					this.pricehistorys = [];
				}else{
					this.pricehistorys = JSON.parse(sessionStorage.getItem('priceInterval'));	 
				}
			}
			if( this.carKind ){																	 
		  		this.historyscar.splice(0,1,this.carKind);
		  		sessionStorage.setItem('Carhistorys',JSON.stringify(this.historyscar));
	    		this.carhistorys = this.historyscar;	
		  	}else if(sessionStorage.getItem('Carhistorys')){
				this.carhistorys = JSON.parse(sessionStorage.getItem('Carhistorys'));			 
			}
		    this.price_frame_position.left = this.bad_position;	
			if( sessionStorage.getItem('Sorthistorys')) {
				this.sizers[0].option = JSON.parse(sessionStorage.getItem('Sorthistorys'));		 
			}else{
				this.sizers[0].option = this.sizers[0].option;									 
			}
			if( sessionStorage.getItem('sortScreeNew') ){
				this.sortScreeNew = true;
				this.sortScreeUpPrice = false;
				this.sortScreeDownPrice = false;
				this.sortScreeUpKm = false;
				this.sortScreeDownKm = false;
				this.sortScreeUpYear = false;
				this.sortScreeDownYear = false;
			}
			if( sessionStorage.getItem('sortScreeUpPrice') ){
				this.sortScreeUpPrice = true;
				this.sortScreeDownPrice = false;
				this.sortScreeUpKm = false;
				this.sortScreeDownKm = false;
				this.sortScreeUpYear = false;
				this.sortScreeDownYear = false;
				this.sortScreeNew = false;
			}
			if( sessionStorage.getItem('sortScreeDownPrice') ){
				this.sortScreeDownPrice = true;
				this.sortScreeUpPrice = false;
				this.sortScreeUpKm = false;
				this.sortScreeDownKm = false;
				this.sortScreeUpYear = false;
				this.sortScreeDownYear = false;
				this.sortScreeNew = false;
			}
			if( sessionStorage.getItem('sortScreeUpKm') ){
				this.sortScreeUpKm = true;
				this.sortScreeDownKm = false;
				this.sortScreeUpPrice = false;
				this.sortScreeDownPrice = false;
				this.sortScreeUpYear = false;
				this.sortScreeDownYear = false;
				this.sortScreeNew = false;
			}
			if( sessionStorage.getItem('sortScreeDownKm') ){
				this.sortScreeDownKm = true;
				this.sortScreeUpKm = false;
				this.sortScreeUpPrice = false;
				this.sortScreeDownPrice = false;
				this.sortScreeUpYear = false;
				this.sortScreeDownYear = false;
				this.sortScreeNew = false;
			}
			if( sessionStorage.getItem('sortScreeUpYear') ){
				this.sortScreeUpYear = true;
				this.sortScreeDownYear = false;
				this.sortScreeUpPrice = false;
				this.sortScreeDownPrice = false;
				this.sortScreeUpKm = false;
				this.sortScreeDownKm = false;
				this.sortScreeNew = false;
			}
			if( sessionStorage.getItem('sortScreeDownYear') ){
				this.sortScreeDownYear = true;
				this.sortScreeUpYear = false;
				this.sortScreeDownKm = false;
				this.sortScreeUpKm = false;
				this.sortScreeDownPrice = false;
				this.sortScreeUpPrice = false;
				this.sortScreeNew = false;
			}			 
			window.clearPage = function(){
				_this.PriceBoxHide();
			}
		  	if(this.pricestyle == false){
		  		this.mock_all == false
		  	}
		  	if(this.priceMin){
		  		if(this.priceMin == 50){
		  			this.price="500000";
		  		}else if(this.pricemax == 51){
		  			this.price=this.priceMin*10000+','+'500000';
		  		}else if(this.priceMin == 0 && this.priceMax == 52){
		  			this.price='';
		  		}else{
		  			this.price=this.priceMin*10000+','+this.priceMax*10000;
		  		}	
		  	}
		  	this.returndata = {
	            "serviceName":"app.query.carList",
	            "timestamp":this.$global().timestamp,
	            "serialNumber":this.$global().serialNumber,
	            "request_data":{
	                "page":this.page,
	                "pageSize":10,
	                "cityId":this.cityId,
	                "price":this.price,
	                "keyword":this.carType,
	                "orderBy":this.orderBy,
	                "queryType":this.queryType,
	                "modelLine":this.carKind,
	                "labels":this.labels,
	                "color":this.color,
	                "transmission":this.transmission,
	                "emission":this.emission,
	                "carAge":this.carAge,
	                "carAir":this.carAir,
	                "mileAge":this.mileAge
	            }
	        }

			this.dictslistHttpData();		 
		  	this.buycarUrlHttp();			 
			this.searchHistory_None();		 
			this.PriceIntervals();			 
		  	window.addEventListener('touchstart',this.touchStart);
	        window.addEventListener('touchmove',this.touchMove);
	        window.addEventListener('touchend',this.touchEnd);	        

			window.searchByCartype = function(cityId,cityName,carType,priceMin,priceMax){	
				_this.sortScreeNew = true;
				_this.sortScreeUpPrice = false;
				_this.sortScreeDownPrice = false;
				_this.sortScreeUpKm = false;
				_this.sortScreeDownKm = false;
				_this.sortScreeUpYear = false;
				_this.sortScreeDownYear = false;		
				_this.sizers[0].option = '最新发布';
				_this.removePrice = true;
				_this.cityId = cityId;
				_this.findcarCity = cityId;
				_this.carType = carType;								 
				_this.queryType = '';
				_this.labels = '';
				_this.carType = carType;				
				_this.carKind = '';
				_this.labels_text = [];
				if( carType ){											 
					_this.carTypeHistorys.splice(0,1,_this.carType);
					_this.carTypeShow = true;
				}else{
					_this.carTypeHistorys = [];
					_this.carTypeShow = false;
				}
				_this.labels_text = [];
				_this.color_text = [];
				_this.transmission_text = [];
				_this.mileage_text = [];
				_this.emission_text = [];
				_this.vehicleage_text = [];
				_this.displacement_text = [];
				_this.labelsShow = false;
				_this.colorShow = false;
				_this.transmissionShow = false;
				_this.mileageShow = false;
				_this.emissionShow = false;
				_this.vehicleageShow = false;
				_this.displacementShow = false;
				_this.lessPrice = priceMin;								 
				_this.morePrice = priceMax;								 	
				_this.priceMin = String(priceMin);						 
				_this.priceMax = String(priceMax);						 
				_this.windowPriceIntervals();
				if(_this.priceMin){
			  		if(_this.priceMin == 50){
			  			_this.price="500000";
			  		}else if(_this.pricemax == 51){
			  			_this.price=_this.priceMin*10000+','+'500000';
			  		}else if( _this.priceMin==0&&_this.priceMax==52 ){
			  			_this.price='';
			  		}else{
			  			_this.price=_this.priceMin*10000+','+_this.priceMax*10000;
			  		}	
			  	}
			  	_this.city = cityName;
			  	sessionStorage.removeItem('Carhistorys');
			  	_this.carhistorys = '';
			  	_this.orderBy = 'TIME';				 
			  	_this.color = '';
			  	_this.transmission = '';
			  	_this.mileAge = '';
			  	_this.emission = '';
			  	_this.carAge = '';
			  	_this.carAir = '';
			  	_this.dictName = '';
				_this.BuycarHttpData();
			}
			window.searchBySaletype = function(cityId,cityName,saleType){
				_this.sortScreeNew = true;
				_this.sortScreeUpPrice = false;
				_this.sortScreeDownPrice = false;
				_this.sortScreeUpKm = false;
				_this.sortScreeDownKm = false;
				_this.sortScreeUpYear = false;
				_this.sortScreeDownYear = false;
				_this.sizers[0].option = '最新发布';
				_this.lessPrice = 0;	 
				_this.morePrice = 52;	 
				_this.priceMin = 0;
				_this.priceMax = 52;
				_this.windowPriceIntervals();
				sessionStorage.removeItem('Carhistorys');
				_this.cityId = cityId;
				_this.findcarCity = cityId;
				_this.city = cityName;		
				_this.carhistorys = '';
				_this.queryType = 'LABEL';
				_this.labels = saleType;
				_this.price = '';
				_this.carKind = '';
				_this.carType = '';
				_this.carTypeHistorys = [];
				_this.labelsShow = true;
				_this.color_text = [];
				_this.transmission_text = [];
				_this.mileage_text = [];
				_this.emission_text = [];
				_this.vehicleage_text = [];
				_this.displacement_text = [];
				if( saleType=="5" ){
					_this.labels_text.splice(0,1,"热门车源");
				}else if( saleType=="2" ){
					_this.labels_text.splice(0,1,"奥迪认证车");
				}else if( saleType=="3" ){
					_this.labels_text.splice(0,1,"2年0利率");
				}
				_this.orderBy = 'TIME';				 
			  	_this.color = '';
			  	_this.transmission = '';
			  	_this.mileAge = '';
			  	_this.emission = '';
			  	_this.carAge = '';
			  	_this.carAir = '';
			  	_this.dictName = '';
				_this.BuycarHttpData();
			}
			window.searchByCarkind = function(cityId,cityName,carKind){
				_this.sortScreeNew = true;
				_this.sortScreeUpPrice = false;
				_this.sortScreeDownPrice = false;
				_this.sortScreeUpKm = false;
				_this.sortScreeDownKm = false;
				_this.sortScreeUpYear = false;
				_this.sortScreeDownYear = false;
				_this.sizers[0].option = '最新发布';
				_this.historyscar.splice(0,1,carKind);
		    	sessionStorage.setItem('Carhistorys',JSON.stringify(_this.historyscar));	 
		    	_this.carhistorys = _this.historyscar;
		    	_this.carTypeHistorys = [];
		    	_this.removeCar = true;
		    	_this.lessPrice = 0;									 
				_this.morePrice = 52;									 
				_this.priceMin = 0;
				_this.priceMax = 52;
				_this.windowPriceIntervals();
				_this.cityId = cityId;
				_this.findcarCity = cityId;
				_this.city = cityName;
				_this.price = '';
				_this.carKind = carKind;
				_this.carType = '';
				_this.queryType = '';
				_this.labels = '';
				_this.labels_text = [];
				_this.color_text = [];
				_this.transmission_text = [];
				_this.mileage_text = [];
				_this.emission_text = [];
				_this.vehicleage_text = [];
				_this.displacement_text = [];
				_this.orderBy = 'TIME';				 
			  	_this.color = '';
			  	_this.transmission = '';
			  	_this.mileAge = '';
			  	_this.emission = '';
			  	_this.carAge = '';
			  	_this.carAir = '';
			  	_this.dictName = carKind;
				_this.BuycarHttpData();
			}
			window.searchAll = function(cityId,cityName){
				_this.sortScreeNew = true;
				_this.sortScreeUpPrice = false;
				_this.sortScreeDownPrice = false;
				_this.sortScreeUpKm = false;
				_this.sortScreeDownKm = false;
				_this.sortScreeUpYear = false;
				_this.sortScreeDownYear = false;
				_this.sizers[0].option = '最新发布';
				_this.lessPrice = 0;	 
				_this.morePrice = 52;	 
				_this.windowPriceIntervals();
				sessionStorage.removeItem('Carhistorys');
				_this.cityId = cityId;
				_this.findcarCity = cityId;
				_this.city = cityName;		
				_this.carKind = '';
				_this.carType = '';
				_this.queryType = '';
				_this.labels = '';
				_this.price = '';
				_this.carhistorys = '';
				_this.orderBy = 'TIME';
				_this.carTypeHistorys = [];
				_this.labels_text = [];
				_this.color_text = [];
				_this.transmission_text = [];
				_this.mileage_text = [];
				_this.emission_text = [];
				_this.vehicleage_text = [];
				_this.displacement_text = [];
			  	_this.color = '';
			  	_this.transmission = '';
			  	_this.mileAge = '';
			  	_this.emission = '';
			  	_this.carAge = '';
			  	_this.carAir = '';
			  	_this.dictName = '';
				_this.BuycarHttpData();
			}
			window.searchByAdvancedCondition = function(advancedFilter){
				var advancedfilter = advancedFilter.replace(/undefined/g,'').split('~');
				_this.labels = advancedfilter[0];
				_this.color = advancedfilter[1];
				_this.transmission = advancedfilter[2];
				_this.emission = advancedfilter[3];
				_this.carAge = advancedfilter[4];
				_this.carAir = advancedfilter[5];
				_this.mileAge = advancedfilter[6];
				if(_this.labels!=""){
					_this.queryType = "LABEL";
				}else{
					_this.queryType = '';
					_this.labels = '';
				}

				_this.labelsShow = true;
				_this.colorShow = true;
				_this.transmissionShow = true;
				_this.mileageShow = true;
				_this.emissionShow = true;
				_this.vehicleageShow = true;
				_this.displacementShow = true;
				if( advancedfilter[7]!="" ){
					_this.labels_text.splice(0,1,advancedfilter[7]);
				}else{
					_this.labels_text = [];
					_this.labelsShow = false;
				}
				if( advancedfilter[8]!="" ){
					_this.color_text.splice(0,1,advancedfilter[8]);
				}else{
					_this.color_text = [];
					_this.colorShow = false;
				}
				if( advancedfilter[9]!="" ){
					_this.transmission_text.splice(0,1,advancedfilter[9]);
				}else{
					_this.transmission_text = [];
					_this.transmissionShow = false;
				}
				if( advancedfilter[12]!="" ){
					_this.mileage_text.splice(0,1,advancedfilter[12]);
				}else{
					_this.mileage_text = [];
					_this.mileageShow = false;
				}
				if( advancedfilter[10]!="" ){
					_this.emission_text.splice(0,1,advancedfilter[10]);
				}else{
					_this.emission_text = [];
					_this.emissionShow = false;
				}
				if( advancedfilter[11]!="" ){
					_this.vehicleage_text.splice(0,1,advancedfilter[11]);
				}else{
					_this.vehicleage_text = [];
					_this.vehicleageShow = false;
				}
				if( advancedfilter[13]!="" ){
					_this.displacement_text.splice(0,1,advancedfilter[13]);
				}else{
					_this.displacement_text = [];
					_this.displacementShow = false;
				}
				if( advancedfilter[14]=="" ){
					_this.queryType = ""
				}
				if( advancedfilter[15]=="" ){
					_this.carType = ""
					_this.carTypeHistorys = [];
					_this.carTypeShow = false;
				}
				_this.cityId = advancedfilter[16];
				_this.city = advancedfilter[19];
				if( advancedfilter[17]=="" ){
					_this.carKind = ""
					_this.carhistorys = [];
				}
				if( advancedfilter[18]=="" ){
					_this.price = ""
					_this.pricehistorys = [];
				}
				_this.BuycarHttpData();
			}	
	    },
		methods: {
			windowPriceIntervals(){
				this.PriceIntervals();
				this.priceInterval = this.priceIntervals;
				sessionStorage.setItem('priceInterval',JSON.stringify(this.priceInterval));	
				if( this.priceInterval=='不限价格' ){
					this.pricehistorys = [];
				}else{
					this.pricehistorys = this.priceInterval;
				}
			},
			MySwiper(){	 
				let mySwiper = new Swiper('.swiper-container',{
					lazyLoading : true, 
					lazyLoadingInPrevNextAmount: 0, 
					pagination : '.swiper-pagination' 
				})
		  	},
		  	BuycarRecommend () {
		  		this.loadingData = true;
		  		document.body.scrollTop = 0;
		  		this.page = 1;
		  		this.returndata.request_data.page = 1;		
		  		this.returndata.request_data.price = "";
		  		this.returndata.request_data.keyword = "";
		  		this.returndata.request_data.modelLine = "";
		  		this.returndata.request_data.queryType = "RECOMMEND";
		  		this.returndata.request_data.labels = "";
				this.returndata.request_data.color = "";
				this.returndata.request_data.transmission = "";
				this.returndata.request_data.mileAge = "";
				this.returndata.request_data.emission = "";
				this.returndata.request_data.carAge = "";
				this.returndata.request_data.carAir = "";
		  		var _this = this;
		        this.$axios(this.returndata).then((response) => {		
		        	this.loadingData = false;	        	
		  			_this.cars = [];
		        	if(response.retCode == "0"){
		        		this.progress1 = false;
			        	this.progress2 = false;	
			        	this.listEnd = false;
			        	if(response.response_data!=undefined){
			        		this.carisNone = false
			        	}else{
			        		this.carisNone = true
			        	}   
		        		this.pageSum = Math.ceil(response.response_data.totalRecords/10);
			        	if( response.response_data ){			        		
			        		_this.cars.push(response.response_data.cars);
			        		for( let i=0;i<_this.cars.length;i++ ){
			        			for( let j=0;j<_this.cars[i].length;j++ ){
			        				if( _this.cars[i][j].transmission=="01" ){
				        				_this.cars[i][j].transmissiontype = '自动档';
				        			}else if( _this.cars[i][j].transmission=='02' ){
				        				_this.cars[i][j].transmissiontype = '手动档';
				        			}else if( _this.cars[i][j].transmission=='03' ){
				        				_this.cars[i][j].transmissiontype = '手自一体';
				        			}
				        			_this.cars[i][j].tags = [];
				        			for(var tags in _this.cars[i][j].carTags){
			        					if(_this.cars[i][j].carTags[tags].tagName == "奥迪认证车" || _this.cars[i][j].carTags[tags].tagName == "2年0利率"){			        						
				        					_this.cars[i][j].tags.push(_this.cars[i][j].carTags[tags].tagImage);
				        				}
				        			}
			        			}
			        		}					          	
			        	}
			        	setTimeout(() => {
			        		_this.MySwiper();
			        	},1)
		        	}else{
                        this.failed=true;
		        	}	
		        });
		  	},
		  	buycarUrlHttp(){
		  		this.cars = [];
		  		this.carisNone = false;
		  		document.body.scrollTop = 0;
		  		this.page = 1;
		  		this.returndata.request_data.page = 1;		
		  		this.returndata.request_data.price = this.price;
		  		this.returndata.request_data.keyword = this.carType;
		  		this.returndata.request_data.modelLine = this.carKind;
		  		this.returndata.request_data.queryType = this.queryType;
		  		this.returndata.request_data.labels = this.labels;
				this.returndata.request_data.color = this.color;
				this.returndata.request_data.transmission = this.transmission;
				this.returndata.request_data.mileAge = this.mileAge;
				this.returndata.request_data.emission = this.emission;
				this.returndata.request_data.carAge = this.carAge;
				this.returndata.request_data.carAir = this.carAir;  		
				this.returndata.request_data.orderBy = this.orderBy;  		
				this.returndata.request_data.cityId = this.cityId;  		
		  		
		  		var _this = this;	
		        this.$axios(this.returndata).then((response) => {	
		        	if(response.retCode == "0"){
			        	this.progress1 = false;  
			        	this.progress2 = false;	
			        	this.listEnd = false;
						if(response.response_data!=undefined){
			        		this.load = false;
			        		this.pageSum = Math.ceil(response.response_data.totalRecords/10);
			        		_this.cars.push(response.response_data.cars);
			        		for( let i=0;i<_this.cars.length;i++ ){
			        			for( let j=0;j<_this.cars[i].length;j++ ){
			        				if( _this.cars[i][j].transmission=="01" ){
				        				_this.cars[i][j].transmissiontype = '自动档';
				        			}else if( _this.cars[i][j].transmission=='02' ){
				        				_this.cars[i][j].transmissiontype = '手动档';
				        			}else if( _this.cars[i][j].transmission=='03' ){
				        				_this.cars[i][j].transmissiontype = '手自一体';
				        			}
				        			_this.cars[i][j].tags = [];
				        			for(var tags in _this.cars[i][j].carTags){
			        					if(_this.cars[i][j].carTags[tags].tagName == "奥迪认证车" || _this.cars[i][j].carTags[tags].tagName == "2年0利率"){			        						
				        					_this.cars[i][j].tags.push(_this.cars[i][j].carTags[tags].tagImage);
				        				}		        						        				
				        			}
			        			}
			        		}					          	
				        	setTimeout(() => {
				        		_this.MySwiper();
				        	},500); 	      	  	     
			        	}else{
			        		this.load = true
			        		this.BuycarRecommend();
			        	}  
		        		
		        	}else{
                        this.failed=true;
		        	}	
		        });
		  	},
		  	BuycarHttpData () {		
		  		this.loadingData = true; 
		  		this.cars = [];
		  		this.carisNone = false;
		  		document.body.scrollTop = 0;
		  		this.page = 1;
		  		this.returndata.request_data.page = 1;		
		  		this.returndata.request_data.price = this.price;
		  		this.returndata.request_data.keyword = this.carType;
		  		this.returndata.request_data.modelLine = this.carKind;
		  		this.returndata.request_data.queryType = this.queryType;
		  		this.returndata.request_data.labels = this.labels;
				this.returndata.request_data.color = this.color;
				this.returndata.request_data.transmission = this.transmission;
				this.returndata.request_data.mileAge = this.mileAge;
				this.returndata.request_data.emission = this.emission;
				this.returndata.request_data.carAge = this.carAge;
				this.returndata.request_data.carAir = this.carAir;  		
				this.returndata.request_data.orderBy = this.orderBy;  		
				this.returndata.request_data.cityId = this.cityId;  		
		  		
		  		var _this = this;	
		        this.$axios(this.returndata).then((response) => {	
		        	this.loadingData = false;	
		        	if(response.retCode == "0"){
			        	this.progress1 = false;  
			        	this.progress2 = false;	
			        	this.listEnd = false;
						if(response.response_data!=undefined){
			        		this.load = false;
			        		this.pageSum = Math.ceil(response.response_data.totalRecords/10);
			        		_this.cars.push(response.response_data.cars);
			        		for( let i=0;i<_this.cars.length;i++ ){
			        			for( let j=0;j<_this.cars[i].length;j++ ){
			        				if( _this.cars[i][j].transmission=="01" ){
				        				_this.cars[i][j].transmissiontype = '自动档';
				        			}else if( _this.cars[i][j].transmission=='02' ){
				        				_this.cars[i][j].transmissiontype = '手动档';
				        			}else if( _this.cars[i][j].transmission=='03' ){
				        				_this.cars[i][j].transmissiontype = '手自一体';
				        			}
				        			_this.cars[i][j].tags = [];
				        			for(var tags in _this.cars[i][j].carTags){
			        					if(_this.cars[i][j].carTags[tags].tagName == "奥迪认证车" || _this.cars[i][j].carTags[tags].tagName == "2年0利率"){			        						
				        					_this.cars[i][j].tags.push(_this.cars[i][j].carTags[tags].tagImage);
				        				}		        						        				
				        			}
			        			}
			        		}					          	
				        	setTimeout(() => {
				        		_this.MySwiper();
				        	},500); 	      	  	     
			        	}else{
			        		this.load = true
			        		this.BuycarRecommend();
			        	}  
		        		
		        	}else{
                        this.failed=true;
		        	}	
		        });
		  	},
		  	buycarHttp(){	
		  		var _this = this;		  		
		        this.$axios(this.returndata).then((response) => {
		        	this.progress = false;					
		        	if(response.retCode == 0){
			        	if( response.response_data){
			        		_this.cars.push(response.response_data.cars);
			        		for( let i=0;i<_this.cars.length;i++ ){
			        			for( let j=0;j<_this.cars[i].length;j++ ){
			        				if( _this.cars[i][j].transmission=="01" ){
				        				_this.cars[i][j].transmissiontype = '自动档';
				        			}else if( _this.cars[i][j].transmission=='02' ){
				        				_this.cars[i][j].transmissiontype = '手动档';
				        			}else if( _this.cars[i][j].transmission=='03' ){
				        				_this.cars[i][j].transmissiontype = '手自一体';
				        			}
				        			_this.cars[i][j].tags = [];
				        			for(var tags in _this.cars[i][j].carTags){
			        					if(_this.cars[i][j].carTags[tags].tagName == "奥迪认证车" || _this.cars[i][j].carTags[tags].tagName == "2年0利率"){			        						
				        					_this.cars[i][j].tags.push(_this.cars[i][j].carTags[tags].tagImage);
				        				}		        						        				
				        			}
			        			}
			        		}			          		
			        	}
			        	setTimeout(() => {
			        		_this.MySwiper();
			        	},1)  	      	
		        	}else{        		
		        		this.failed=true;
		        	}   	
		        });
		  	},

		  	touchStart(){
				let evt = event||window.event;
	            this.startY = evt.targetTouches[0].pageY;
	        },
	        touchMove(){
	            if(this.progress) return;  
	            let evt = event||window.event;
	            this.scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;  
	            this.scrollTop = document.documentElement.scrollTop||document.body.scrollTop;  
	            this.clientHeight = document.documentElement.clientHeight||document.body.clientHeight;  
	            
	            this.moveY = evt.targetTouches[0].pageY;
	            this.direction =this.swipeDirection(0,0,this.startY,this.moveY);
	            if(this.scrollTop+this.clientHeight+1>=this.scrollHeight && this.direction == 'Up'){	 
	            	this.returndata.request_data.page = ++this.page;
	                if(this.page <= this.pageSum){
	                	this.progress=true;  
	                	this.buycarHttp();  
	                }else{
	                	this.listEnd = true;  
	                	this.progress1 = false;
	                	this.progress2 = false;	     
	                }	                
	            } else if(this.scrollTop <= 0 && this.direction == 'Down'){	 
	            	this.listEnd = false;  
	            	this.progress1 = true;
	                this.progress2 = false;	          	               
	            }
	        },
	        touchEnd(){	   
	        	if(this.listEnd == true){	 
	            	this.listEnd = false;    
	            	this.progress1=false;  
	                this.progress2=false;	 
	            } else if(this.progress1 == true){	 
	            	this.progress1=false;  
	                this.progress2=true;	 
	                this.listEnd = false;
                	this.BuycarHttpData();    
	            }
	        },
	        swipeDirection(x1, x2, y1, y2) {     
	            return Math.abs(x1 - x2) >=
	            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
	        },
		  	
			jumpdealerdetail(car){
				let shareUrl = this.$global().url+"sharecar?releaseNumber="+car.releaseNumber+"&modelLine="+encodeURI(car.modelLine)+"&cityId="+this.cityId;
				var bridge = getJsBridge();
		  			bridge.call("startNativeActivity",{url: this.$global().url+"cardetail?releaseNumber="+car.releaseNumber+"&modelLine="+encodeURI(car.modelLine)+"&cityId="+this.cityId,shareTitle:("奥迪"+" "+car.carModel+" "+car.modelCode+" "+car.transmissiontype+" "+car.carAir+" "+car.deviceType).replace(/\sundefined/g,""),shareInfo:car.shareOfficial,shareImg:car.shareLogo,shareUrl:shareUrl, title: "-1"}); 
			},
			choosestyle() {   
				this.bigsm = !this.bigsm;
				setTimeout(() => {
			           this.MySwiper();
			    },1);
			},		
			getlocalcity () {
				var _this = this
				var bridge = getJsBridge();		
		  		bridge.call("startChooseCityActivity",{"path": "buycar"},function(citys){	
		  			let cityArr = JSON.parse(citys);  			
		  			_this.returndata.request_data.cityId = cityArr.cityId;		  			
	  				_this.city = cityArr.cityName;	  				
		  			if(cityArr.cityName == '全国城市'){	
		  				_this.findcarCity = _this.cityId;
		  				_this.cityId = cityArr.cityId;
		  			}else{
		  				_this.cityId = cityArr.cityId;
		  				_this.findcarCity = _this.cityId;
		  			}		  				  			
		  			_this.BuycarHttpData();
		  		});
            },
            getsearch(){
            	var bridge = getJsBridge();		
		  		bridge.call("startNativeActivity",{url: this.$global().url+"searchscreen?cityId="+this.cityId+"&path="+"buycar",title: "-2"});
            },
            screens(data){
		  		if(data.priceMin == 50){
			  		this.price="500000";
		  		}else if(data.pricemax == 51){
		  			this.price=data.priceMin*10000+','+'500000';
		  		}else if(data.priceMin == 0 && data.priceMax == 52){
		  			this.price='';
		  		}else if(data.priceMin != 0 && data.priceMax == 52){
		  			this.price=data.priceMin*10000;
		  		}else if(data.priceMin == undefined && data.priceMax == undefined){
		  			this.price='';
		  		}else{
		  			this.price=data.priceMin*10000+','+data.priceMax*10000;
		  		}	

		  		if(data.dictName == undefined){
		  			this.carKind = ""
		  		}else{
		  			this.carKind = data.dictName;
		  		}
		  		
		  		this.labels = data.labels;

		  		if(data.queryType == undefined){
		  			this.queryType = "";
		  		}else{
		  			this.queryType = data.queryType;
		  		}
		  		
		  		this.carType = data.keyword;
		  		this.color = data.color;
		  		this.transmission = data.transmission;
		  		this.mileAge = data.mileAge;
		  		this.emission = data.emission;
		  		this.carAge = data.carAge;
		  		this.carAir = data.carAir;

			  	this.orderBy = data.orderBy;		 
		  		this.BuycarHttpData();
            },
			PriceBoxHide(){		 
				this.car = false;
				this.sort = false;
				this.priceIsShow = false;
				this.pricemask_layer = false;
				this.srcStyle();
			},
			dictslistHttpData () {	 
		        var _this = this;
		        let data_cx = {
		            "serviceName":"app.sys.dicts",
		            "timestamp":this.$global().timestamp,
		            "serialNumber":this.$global().serialNumber,
		            "request_data":{
		                "parentId":"280"
		            }
		        }
		        this.$axios(data_cx).then((response) => {
		            _this.dicts = response.response_data.dicts;
		        });
		    },
			srcStyle () {	 
				for( let i in this.sizers ){
			        this.sizers[i].SizesrcStyle = false;
			        this.sizers[i].sizerBox_li = false;
			    }
			},
			searchHistory_None () {	 
				if( this.sort==true||this.car==true||this.priceIsShow==true ){
				 	this.sizers[index].SizesrcStyle = true;
				 	this.sizers[index].sizerBox_li = true;
				 	this.pricemask_layer = true;
				}else{
					this.pricemask_layer = false;
				}
			},
			PriceIntervals () {	 
				if( this.lessPrice>0&&this.morePrice<51 ){	 
			    	this.priceIntervals.splice(0,1,Math.round(this.lessPrice)+'-'+Math.round(this.morePrice)+'万');
				}else if( this.lessPrice==0&&this.morePrice<51 ){
			    	this.priceIntervals.splice(0,1,Math.round(this.morePrice)+'万元以下');
				}else if( this.lessPrice>0&&this.morePrice==52 ){
			    	this.priceIntervals.splice(0,1,Math.round(this.lessPrice)+'万元以上');
				}else if( this.lessPrice>0&&this.morePrice==51 ){
			    	this.priceIntervals.splice(0,1,Math.round(this.lessPrice)+'-'+'50万');
				}else if( this.lessPrice==0&&this.morePrice==51 ){
					this.priceIntervals.splice(0,1,'50万元以下');
				}else if( this.lessPrice==0&&this.morePrice==52 ){
					this.priceIntervals.splice(0,1,'不限价格');
				}
			},
			jump(index) {
				if(index==0){
					this.sort=!this.sort
					this.car = false
					this.priceIsShow=false
				}else if(index==1){
					this.car=!this.car
					this.sort=false
					this.priceIsShow=false
				}else if(index==2){
					this.priceIsShow=!this.priceIsShow
					this.sort=false
					this.car=false
				}else if(index==3){	 
					this.priceIsShow=false
					this.sort=false
					this.car=false
					var bridge = getJsBridge();	
						bridge.call("startNativeActivity",{url: this.$global().url+"advancedfilter?cityId="+this.cityId+"&modelLine="+this.carKind+"&price="+this.price+"&keyword="+this.carType+"&queryType="+this.queryType+"&labels="+this.labels+"&color="+this.color+"&transmission="+this.transmission+"&emission="+this.emission+"&carAge="+this.carAge+"&carAir="+this.carAir+"&mileAge="+this.mileAge+"&emission_Text="+this.emission_text+"&transmission_Text="+this.transmission_text+"&cityName="+this.city,title: "2高级筛选"});	
				}
				this.srcStyle();
				if( this.sort==true||this.car==true||this.priceIsShow==true ){
				 	this.sizers[index].SizesrcStyle = true;
				 	this.sizers[index].sizerBox_li = true;
				 	this.pricemask_layer = true;
				}else{
					this.pricemask_layer = false;
				}    
		    },
		    sortScree (event) { 
		    	event = event||window.event;
		    	let sortScreeName = event.target.className;
		    	let sortScreeinnerhtml = event.target.innerHTML;
		    	this.sort = !this.sort;
				this.car = false;
				this.priceIsShow = false;
				let sortScree_things = event.target.innerHTML;
				this.srcStyle();				
		    	this.sorthistorys.splice(0,1,sortScree_things.slice(-4));
		    	this.sizers[0].option = this.sorthistorys[0];
		    	sessionStorage.setItem('Sorthistorys',JSON.stringify(this.sizers[0].option));
		    	if( sortScreeName=='sortScree_B'&&sortScreeinnerhtml=='价格' ){
		    		this.sortScreeUpPrice = true;
		    		this.sortScreeNew=false;
					this.sortScreeDownPrice=false;
					this.sortScreeUpKm=false;
					this.sortScreeDownKm=false;
					this.sortScreeUpYear=false;
					this.sortScreeDownYear=false;
					this.orderBy = 'MAXPRICE';
					sessionStorage.setItem('sortScreeUpPrice',this.sortScreeUpPrice);
		    	}else if( sortScreeName=='sortScree_C'&&sortScreeinnerhtml=='价格' ){
		    		this.sortScreeDownPrice = true;
		    		this.sortScreeNew=false;
					this.sortScreeUpPrice=false;
					this.sortScreeUpKm=false;
					this.sortScreeDownKm=false;
					this.sortScreeUpYear=false;
					this.sortScreeDownYear=false;
					this.orderBy = 'MINPRICE';
					sessionStorage.setItem('sortScreeDownPrice',this.sortScreeDownPrice);
		    	}else if( sortScreeName=='sortScree_D'&&sortScreeinnerhtml=='里程' ){
		    		this.sortScreeUpKm = true;
		    		this.sortScreeNew=false;
					this.sortScreeUpPrice=false;
					this.sortScreeDownPrice=false;
					this.sortScreeDownKm=false;
					this.sortScreeUpYear=false;
					this.sortScreeDownYear=false;
					this.orderBy = 'MAXMILE';
					sessionStorage.setItem('sortScreeUpKm',this.sortScreeUpKm);
		    	}else if( sortScreeName=='sortScree_E'&&sortScreeinnerhtml=='里程' ){
		    		this.sortScreeDownKm = true;
		    		this.sortScreeNew=false;
					this.sortScreeUpPrice=false;
					this.sortScreeDownPrice=false;
					this.sortScreeUpKm=false;
					this.sortScreeUpYear=false;
					this.sortScreeDownYear=false;
					this.orderBy = 'MINMILE';
					sessionStorage.setItem('sortScreeDownKm',this.sortScreeDownKm);
		    	}else if( sortScreeName=='sortScree_F'&&sortScreeinnerhtml=='车龄' ){
		    		this.sortScreeUpYear = true;
		    		this.sortScreeNew=false;
					this.sortScreeUpPrice=false;
					this.sortScreeDownPrice=false;
					this.sortScreeUpKm=false;
					this.sortScreeDownKm=false;
					this.sortScreeDownYear=false;
					this.orderBy = 'MAXAGE';
					sessionStorage.setItem('sortScreeUpYear',this.sortScreeUpYear);
		    	}else if( sortScreeName=='sortScree_G'&&sortScreeinnerhtml=='车龄' ){
		    		this.sortScreeDownYear = true;
		    		this.sortScreeNew=false;
					this.sortScreeUpPrice=false;
					this.sortScreeDownPrice=false;
					this.sortScreeUpKm=false;
					this.sortScreeDownKm=false;
					this.sortScreeUpYear=false;
					this.orderBy = 'MINAGE';
					sessionStorage.setItem('sortScreeDownYear',this.sortScreeDownYear);
		    	}else if( sortScreeName=='sortScree_A'&&sortScreeinnerhtml=='最新发布' ){
		    		this.sortScreeNew = true;
					this.sortScreeUpPrice=false;
					this.sortScreeDownPrice=false;
					this.sortScreeUpKm=false;
					this.sortScreeDownKm=false;
					this.sortScreeUpYear=false;
					this.sortScreeDownYear=false;
					this.orderBy = 'TIME';
					sessionStorage.setItem('sortScreeNew',this.sortScreeNew);
		    	}
				if( sessionStorage.getItem('Carhistorys')==null ){
			    	this.dictName = '';
			    }else{
			    	this.dictName = JSON.parse(sessionStorage.getItem('Carhistorys')).toString();
			    }

		    	sessionStorage.setItem('orderBy',this.orderBy);
		    	this.searchHistory_None();		
		    	this.screen = {'orderBy':this.orderBy,'dictName':this.dictName,'priceMin':this.priceMin,'priceMax':this.priceMax,'labels':this.labels,'color':this.color,'transmission':this.transmission,'mileAge':this.mileAge,'emission':this.emission,'carAge':this.carAge,'carAir':this.carAir,'keyword':this.carType} 
				this.screens(this.screen);
		    },
		    carScree (i,event) {	 
		    	event = event||window.event;
		    	this.car = !this.car;
				this.sort = false;
				this.priceIsShow = false;
				this.srcStyle();
				this.carKind = this.dicts[i].dictName;
				this.dictName = this.dicts[i].dictName;
		    	this.historyscar.splice(0,1,this.dictName);
		    	sessionStorage.setItem('Carhistorys',JSON.stringify(this.historyscar));	 
		    	this.carhistorys = this.historyscar;
		    	this.removeCar = true;
		    	this.searchHistory_None();
			    if( sessionStorage.getItem('orderBy')==null ){
			    	this.orderBy = '';
			    }else{
			    	this.orderBy = sessionStorage.getItem('orderBy');
			    }
				this.screen = {'orderBy':this.orderBy,'dictName':this.dictName,'priceMin':this.priceMin,'priceMax':this.priceMax,'labels':this.labels,'color':this.color,'transmission':this.transmission,'mileAge':this.mileAge,'emission':this.emission,'carAge':this.carAge,'carAir':this.carAir,'keyword':this.carType}
		    	this.screens(this.screen);
		    },
		    RemoveCh (event) {	 
		    	event = event||window.event;
				event.currentTarget.parentNode.remove();
		    	if( JSON.parse(sessionStorage.getItem('Carhistorys')).length > 0  ){
		    		this.removeCar = !this.removeCar;
		    		sessionStorage.removeItem('Carhistorys');
		    		this.carhistorys = [];
		    		this.dictName = '';
		    	}
		    	this.searchHistory_None();
		    	if( sessionStorage.getItem('orderBy')==null ){
			    	this.orderBy = 'TIME';
			    }else{
			    	this.orderBy = sessionStorage.getItem('orderBy');
			    }
				this.screen = {'orderBy':this.orderBy,'dictName':undefined,'priceMin':this.priceMin,'priceMax':this.priceMax,'labels':this.labels,'color':this.color,'transmission':this.transmission,'mileAge':this.mileAge,'emission':this.emission,'carAge':this.carAge,'carAir':this.carAir,'keyword':this.carType}
		    	this.screens(this.screen);
		    },
		    leftstep (event) {	 
		    	event = event||window.event;
		    	let left = -parseInt(parseFloat(event.target.style.left)/230*100);	 
		    	let bad = (((this.right-this.left+12.25)/2)/10)/2+'rem';

			    if( this.lessPrice >= this.morePrice ){
				    this.lessPrice = this.morePrice - 2;	    
			    }

			    this.PriceIntervals();
		    },
		    rightstep (event) { 
		    	event = event||window.event;
		    	let right = parseInt(parseFloat(event.target.style.left)/230*100);	 
		    	let bad = (((this.right-this.left+18)/2)/10)/2+'rem';

		    	if( this.lessPrice >= this.morePrice ) {
		    		this.morePrice = this.lessPrice + 2;
				    return false;
		    	}		    	
		    	this.PriceIntervals();
		    },
		    setPrice (event) {	 
		    	this.priceIsShow=!this.priceIsShow
				this.sort=false
				this.car=false
				this.priceInterval=this.priceIntervals;
				this.priceMin = this.lessPrice;
				this.priceMax = this.morePrice;
		    	sessionStorage.setItem('priceMin',this.lessPrice);	 
		    	sessionStorage.setItem('priceMax',this.morePrice);	 
				this.srcStyle();
				sessionStorage.setItem('priceInterval',JSON.stringify(this.priceInterval));	
				if( this.priceInterval=='不限价格' ){
					this.pricehistorys = [];
				}else{
					this.pricehistorys = this.priceInterval;
				}
			    
			    this.removePrice = true;
			    this.searchHistory_None();
			    if( sessionStorage.getItem('Carhistorys')==null ){
			    	this.dictName = '';
			    }else{
			    	this.dictName = JSON.parse(sessionStorage.getItem('Carhistorys')).toString();
			    }

			    if( sessionStorage.getItem('orderBy')==null ){
			    	this.orderBy = '';
			    }else{
			    	this.orderBy = sessionStorage.getItem('orderBy');
			    } 
				this.screen = {'orderBy':this.orderBy,'dictName':this.dictName,'priceMin':this.lessPrice,'priceMax':this.morePrice,'labels':this.labels,'color':this.color,'transmission':this.transmission,'mileAge':this.mileAge,'emission':this.emission,'carAge':this.carAge,'carAir':this.carAir,'keyword':this.carType};
			    this.screens(this.screen);
		    },
		    RemovePh (event) {	 
		    	event = event||window.event;
				event.currentTarget.parentNode.remove();
				this.lessPrice = 0;
				this.morePrice = 52;
				this.priceMin = undefined;
				this.priceMax = undefined;
				this.priceIntervals = ['不限价格'];
		    	if(sessionStorage.getItem('priceInterval')){
		    		this.removePrice = !this.removePrice;
		    		sessionStorage.removeItem('priceInterval');
		    		this.pricehistorys = [];
		    	}
		    	if( sessionStorage.getItem('Carhistorys')==null ){
			    	this.dictName = '';
			    }else{
			    	this.dictName = JSON.parse(sessionStorage.getItem('Carhistorys')).toString();
			    }

			    if( sessionStorage.getItem('orderBy')==null ){
			    	this.orderBy = 'TIME';
			    }else{
			    	this.orderBy = sessionStorage.getItem('orderBy');
			    } 
		    	this.searchHistory_None();
				this.screen = {'orderBy':this.orderBy,'dictName':this.dictName,'priceMin':undefined,'priceMax':undefined,'labels':this.labels,'color':this.color,'transmission':this.transmission,'mileAge':this.mileAge,'emission':this.emission,'carAge':this.carAge,'carAir':this.carAir,'keyword':this.carType}
		    	this.screens(this.screen);
		    },
            RemoveLabels(event){							 
            	event = event||window.event;
            	this.labels_text = [];
            	this.labels = "";
            	this.queryType = "";
            	this.labelsShow = false;
            	if( sessionStorage.getItem('orderBy')==null ){
			    	this.orderBy = 'TIME';
			    }else{
			    	this.orderBy = sessionStorage.getItem('orderBy');
			    }
            	event.currentTarget.parentNode.remove();
            	this.screen = {'orderBy':this.orderBy,'dictName':this.dictName,'priceMin':this.priceMin,'priceMax':this.priceMax,'labels':this.labels,'queryType':this.queryType,'color':this.color,'transmission':this.transmission,'mileAge':this.mileAge,'emission':this.emission,'carAge':this.carAge,'carAir':this.carAir,'keyword':this.carType};
		    	this.screens(this.screen);
            },
            RemoveColor(event){								 
            	event = event||window.event;
            	event.currentTarget.parentNode.remove();
            	this.color_text = [];
            	this.color = '';
            	this.colorShow = false;
            	if( sessionStorage.getItem('orderBy')==null ){
			    	this.orderBy = 'TIME';
			    }else{
			    	this.orderBy = sessionStorage.getItem('orderBy');
			    }
            	this.screen = {'orderBy':this.orderBy,'dictName':this.dictName,'priceMin':this.priceMin,'priceMax':this.priceMax,'labels':this.labels,'queryType':this.queryType,'color':this.color,'transmission':this.transmission,'mileAge':this.mileAge,'emission':this.emission,'carAge':this.carAge,'carAir':this.carAir,'keyword':this.carType}
		    	this.screens(this.screen);
            },
            RemoveVehicleage(event){						 
            	event = event||window.event;
            	event.currentTarget.parentNode.remove();
            	this.vehicleage_text = [];
            	this.carAge = '';
            	this.vehicleageShow = false;
            	if( sessionStorage.getItem('orderBy')==null ){
			    	this.orderBy = 'TIME';
			    }else{
			    	this.orderBy = sessionStorage.getItem('orderBy');
			    }
            	this.screen = {'orderBy':this.orderBy,'dictName':this.dictName,'priceMin':this.priceMin,'priceMax':this.priceMax,'labels':this.labels,'queryType':this.queryType,'color':this.color,'transmission':this.transmission,'mileAge':this.mileAge,'emission':this.emission,'carAge':this.carAge,'carAir':this.carAir,'keyword':this.carType}
		    	this.screens(this.screen);
            },
            RemoveMileage(event){							 
            	event = event||window.event;
            	event.currentTarget.parentNode.remove();
            	this.mileage_text = [];
            	this.mileAge = '';
            	this.mileageShow = false;
            	if( sessionStorage.getItem('orderBy')==null ){
			    	this.orderBy = 'TIME';
			    }else{
			    	this.orderBy = sessionStorage.getItem('orderBy');
			    }
            	this.screen = {'orderBy':this.orderBy,'dictName':this.dictName,'priceMin':this.priceMin,'priceMax':this.priceMax,'labels':this.labels,'queryType':this.queryType,'color':this.color,'transmission':this.transmission,'mileAge':this.mileAge,'emission':this.emission,'carAge':this.carAge,'carAir':this.carAir,'keyword':this.carType}
		    	this.screens(this.screen);
            },
            RemoveDisplacement(event){						 
            	event = event||window.event;
            	event.currentTarget.parentNode.remove();
            	this.displacement_text = [];
            	this.carAir = '';
            	this.displacementShow = false;
            	if( sessionStorage.getItem('orderBy')==null ){
			    	this.orderBy = 'TIME';
			    }else{
			    	this.orderBy = sessionStorage.getItem('orderBy');
			    }
            	this.screen = {'orderBy':this.orderBy,'dictName':this.dictName,'priceMin':this.priceMin,'priceMax':this.priceMax,'labels':this.labels,'queryType':this.queryType,'color':this.color,'transmission':this.transmission,'mileAge':this.mileAge,'emission':this.emission,'carAge':this.carAge,'carAir':this.carAir,'keyword':this.carType}
		    	this.screens(this.screen);
            },
            RemoveEmission(event){							 
            	event = event||window.event;
            	event.currentTarget.parentNode.remove();
            	this.emission_text = [];
            	this.emission = '';
            	this.emissionShow = false;
            	if( sessionStorage.getItem('orderBy')==null ){
			    	this.orderBy = 'TIME';
			    }else{
			    	this.orderBy = sessionStorage.getItem('orderBy');
			    }
            	this.screen = {'orderBy':this.orderBy,'dictName':this.dictName,'priceMin':this.priceMin,'priceMax':this.priceMax,'labels':this.labels,'color':this.color,'transmission':this.transmission,'mileAge':this.mileAge,'emission':this.emission,'carAge':this.carAge,'carAir':this.carAir}
		    	this.screens(this.screen);
            },
            RemoveTransmission(event){						 
            	event = event||window.event;
            	event.currentTarget.parentNode.remove();
            	this.transmission_text = [];
            	this.transmission  = '';
            	this.transmissionShow = false;
            	if( sessionStorage.getItem('orderBy')==null ){
			    	this.orderBy = 'TIME';
			    }else{
			    	this.orderBy = sessionStorage.getItem('orderBy');
			    }
            	this.screen = {'orderBy':this.orderBy,'dictName':this.dictName,'priceMin':this.priceMin,'priceMax':this.priceMax,'labels':this.labels,'queryType':this.queryType,'color':this.color,'transmission':this.transmission,'mileAge':this.mileAge,'emission':this.emission,'carAge':this.carAge,'carAir':this.carAir,'keyword':this.carType}
		    	this.screens(this.screen);
            },
            RemovecarType(event){
            	event = event||window.event;
            	event.currentTarget.parentNode.remove();
            	this.carTypeHistorys = [];
            	this.carType = '';
            	this.carTypeShow = false;
            	if( sessionStorage.getItem('orderBy')==null ){
			    	this.orderBy = 'TIME';
			    }else{
			    	this.orderBy = sessionStorage.getItem('orderBy');
			    }
            	this.screen = {'orderBy':this.orderBy,'dictName':this.dictName,'priceMin':this.priceMin,'priceMax':this.priceMax,'labels':this.labels,'queryType':this.queryType,'color':this.color,'transmission':this.transmission,'mileAge':this.mileAge,'emission':this.emission,'carAge':this.carAge,'carAir':this.carAir,'keyword':this.carType}
            	this.screens(this.screen);
            }
		}		
	}
</script>