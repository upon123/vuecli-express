<template>
	<div class="sellcarBox" :style="sellCarPosition">
		<div>
			<div class="sellcar_Updated">
				<img :src="bannerPath">
			</div>
			<div class="Onlinevaluation">
				<button class="Jumpvaluation" type="button" @click="jumpAssessment">免费在线估价</button>
				<p>免费在线评估,看看你的爱车还值多少钱;到店检测、估价更准确!</p>	
			</div>
			<div class="replacement">
				<p>我要置换/我要卖车</p>
				<div class="idinformation">
					<div class="information">
						<div class="want_box">
							<div class="idName">我想</div>
							<button type="button" :class="{oldNew_box:blackBg,oldNew_bo:blackBg,oldNew_click:userwant == '以旧换旧'}" @click="chooseJudge($event)">以旧换旧</button>
							<button type="button" :class="{oldNew_box:blackBg,oldNew_bo:blackBg,oldNew_click:userwant == '以旧换新'}" @click="chooseJudge($evnet)">以旧换新</button>
							<button type="button" :class="{oldNew_box:blackBg,oldNew_bo:blackBg,oldNew_click:userwant == '我要卖车'}" @click="chooseJudge($evnet)">我要卖车</button>
						</div>
						<div class="ename_box">
							<div class="idName">姓名</div>
							<input class="id" type="text" v-model="username" maxlength="20" placeholder="请输入您的姓名">
						</div>
						<div class="phoneNumber_box">
							<div class="phoneNumber">手机号</div>
							<input class="phone" type="text" v-model="phoneText" maxlength="11" placeholder="请输入您的手机号">
						</div>
						<div class="Choosecitys_box">
						  <div class="dealername">我的车</div>
							  <div class="choosecitys-Box">
								  <ul @click="ChooseMycar" class="choosedealer">
									<li v-model="Mycar">{{Mycar}}</li>
								  </ul>
							  </div>
						</div>
						<div class="Choosecitys_box">
						  <div class="dealername">想要换</div>
							  <div class="choosecitys-Box">
								  <ul @click="exchangeMyCar" :class="{ 'choosedealer': isA, 'choose': isB }">
									<li v-model="audiCar" v-html="audiCar"></li>
								  </ul>
							  </div>
						</div>
						<div class="Choosecitys_box">
							<div class="dealername dealerErea">意向地区</div>
							<div class="choosecitys-Box">
								<ul @click="ChooseDealers" class="choosedealer">
									<li v-model="YesshopHomeNick">{{dealerCity}}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="swop">
						<button type="button" class="oldNew" @click="judge($event)">提交信息</button>
					</div>
  					<div class="ContractorSidebar-Box" v-show="choosedealer">
						<div class="ContractorSidebar_Overlay">
							<div class="closed" @click="choosedealerShow"></div>
							<div class="ContractorSidebar-Rightbox" v-show="choosedealer">
						        <div class="ContractorSidebar-header">
						        	<img @click="dealerReturnPrevtab" class="returnPrevtab" src="../../../static/images/returnPrevtab.png" alt="">
						          	经销商
						        </div>
						        <ul class="ContractorSidebar-Right">
						        	<li class="box-li">
						                <p @click="cityYes">全部经销商</p>
						            </li>
						            <li class="box-li" v-for="(shopHomeNick,index) in shopHomeNicks" :key="shopHomeNick.id">
						                <p @click="dealerYes(index)">{{shopHomeNick.shopHomeNick}}</p>
						            </li>
						        </ul>
						    </div>
						</div>	
  					</div>
                    <div class="ContractorSidebar-Box" v-show="Contractor"> 
                        <div class="ContractorSidebar_Overlay">
                        	<div class="closed" @click="choosedealerShow"></div>
  							<div class="ContractorSidebar-Rightbox"  v-show="csType">
						        <div class="ContractorSidebar-header">
  									厂商
						        </div>
						        <ul class="ContractorSidebar-Right">
						            <li class="box-li" v-for="(dict,index) in dicts" :key="dict.id">
						              <p class="Title"><a :name="dict.keySort.slice(1).toLocaleLowerCase()">{{dict.keySort.slice(1)}}</a></p>
						              <p @click.stop="Goppdict(dict.dictId)" class="box_lsip" v-for="(dict,index) in dict.dicttionaryEntity">{{dict.dictName}}</p>
						            </li>
						        </ul>
						        <div class="ContractorSidebar-Leftbox">
						          <ul class="ContractorSidebar-Left">
						              <li class="box-li"  v-for="(dict,index) in dicts" :key="dict.id">
						                <a @touchstart="CskeySortouchStart($event,dict.keySort.slice(1))" @touchmove="CskeySortouchMove($event,dict.keySort.slice(1))" @touchend="CskeySortouchEnd($event,dict.keySort.slice(1))" :href="dict.keySort.toLocaleLowerCase()">{{dict.keySort.slice(1)}}</a>
						              </li>
						          </ul>
						        </div>
				      		</div>
				      		<div class="ContractorSidebar-Rightbox" v-show="ppType">
						        <div class="ContractorSidebar-header">
						        	<img @click="blankReturnPrevtab" class="returnPrevtab" src="../../../static/images/returnPrevtab.png" alt="">
						          	品牌
						        </div>
						        <ul class="ContractorSidebar-Right">
						            <li class="box-li" v-for="(PPdict,index) in PPdicts" :key="PPdict.id" >
						              <p  @click.stop="Gocsdict(PPdict)">{{PPdict.dictName}}</p>
						            </li>
						        </ul>
					      	</div>
					      	<div class="ContractorSidebar-Rightbox" v-show="carType">
						        <div class="ContractorSidebar-header">
						        	<img @click="carTypeReturnPrevtab" class="returnPrevtab" src="../../../static/images/returnPrevtab.png" alt="">
						          	车系
						        </div>
						        <ul class="ContractorSidebar-Right">
						            <li class="box-li" v-for="(CXdicts,index) in CXdicts" :key="CXdicts.id" >
						              <p  @click.stop="MycarShow(CXdicts)">{{CXdicts.dictName}}</p>
						            </li>
						        </ul>
					      	</div>
					      	<div class="ContractorSidebar-Rightbox" v-show="audiType">
						        <div class="ContractorSidebar-header">
						          	品牌
						        </div>
						        <ul class="ContractorSidebar-Right">
						            <li class="box-li" v-for="(PPdict,index) in PPdicts" :key="PPdict.id" >
						              <p  @click.stop="goAudicsdict(PPdict.dictId)">{{PPdict.dictName}}</p>
						            </li>
						        </ul>
					      	</div>
					      	<div class="ContractorSidebar-Rightbox" v-show="audiCarType">
						        <div class="ContractorSidebar-header">
						        	<img @click="audiCarReturnPrevtab" class="returnPrevtab" src="../../../static/images/returnPrevtab.png" alt="">
						          	车系
						        </div>
						        <ul class="ContractorSidebar-Right">
						            <li class="box-li" v-for="(CXdicts,index) in CXdicts" :key="CXdicts.id" >
						              <p  @click.stop="audiCarTypeShow(CXdicts.dictName)">{{CXdicts.dictName}}</p>
						            </li>
						        </ul>
					      	</div>
					      	<div class="ContractorSidebar-Rightbox"  v-show="cityShow">
						        <div class="ContractorSidebar-header">
						          	城市
						        </div>
						        <ul class="ContractorSidebar-Right">
						            <li class="box-li" v-for="(list,index) in Clist" :key="list.id">
						              <p class="Title"><a :name="list.slice(1)">{{list.slice(1)}}</a></p>
						              <p @click.stop="chooseCity(city)" v-for="city in cityList.get(list)" class="box_lsip">{{city.cityName}}</p>
						            </li>
						        </ul>
						        <div class="ContractorSidebar-Leftbox">
						          <ul class="ContractorSidebar-Left">
						              <li class="box-li" v-for="(list,index) in Clist" :key="list.id">
						                <a :href="list.toLocaleUpperCase()" @touchstart="CskeySortouchStart($event,list.slice(1))" @touchmove="CskeySortouchMove($event,list.slice(1))" @touchend="CskeySortouchEnd($event,list.slice(1))">{{list.slice(1).toLocaleUpperCase()}}</a>
						              </li>
						          </ul>
						        </div>
				      		</div>
				      	</div>	
  					</div>
				</div>
			</div>
		</div>
		<div>
			<div class="Usedcarappraisal-Box">
				<div class="Usedcarappraisal">
					<div class="Usedcarappraisal_title">
						<p>二手车置换活动</p>
					</div>
					<div class="MapsAndNocars">
						<div class="MapsAndNocars_Maps">
							
						</div>
						<div class="MapsAndNocars_Nocars">
							
						</div>
					</div>		
				</div>
			</div>
			<ActivityList ref="activity_List" :activityData="activityData" keyWord="" :cityId='cityId' activityService='2' dealerCode='' carLineId='' path="sell"></ActivityList>
		</div>

		<div class="a-z_nav" v-show='crier'>
			{{CskeySort}}
		</div>
	</div>
</template>

<script>
	import ActivityList from '../list/activity-list.vue';
	const phone = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/; 
	export default {
		components: {
			ActivityList
		},
		data () {
			return {
				YeaorNo_Yesaodi:false,
				YeaorNo_Noaodi:false,
				userId:'',
				cityId:'', 
				cityId1:'',
				cityName: '', 
				dealerCity: '', 
				phoneText: '', 
				username: '', 
				name: '', 
				Mycar: '', 
				Aodi:'', 
				shopHomeNicks_Text:'', 
				userwant:'以旧换旧',	 
				Alert:['姓名不能为空','手机号不能为空','请输入正确的手机号','请选择“我的车”','请选择“想要换”','请选择意向地区'],
				choosedealer:false,
				returndata:'',
				dealerHttpData: '',
				shopHomeNicks:'',	 
				YesshopHomeNick:'',	 
				dealerCode:'',	 
				activityData: [],	 
				bannerData: '',		 
				bannerPath: '',		 
				totalRecords:'',	 
				Contractor:false,   
				A_z: ['#a','#b','#c','#d','#e','#f','#g','#h','#i','#j','#k','#l','#m','#n','#o','#p','#q','#r','#s','#t','#u','#v','#w','#x','#y','#z'], 
				dicts:[],                                                                    
				Brand:false,       
				CXdicts:[],                                                                    
				PPdicts:[],
				PPdictId:'',                                                                     
				citydicts:[],																	  
				dealerdata:'',
				citydata:'',
				audiCar:'卖车可不填',
				cityList:new Map(),
				Clist:[],
				cityNum:[-1],
				cityShow:false,				 
				csType:false,				 
				ppType:false,				 
				carType:false,				 
				audiType:false,				 
				audiCarType:false,			 
				sellCarBrand:"",			 
				sellSystemType:"",			 
				buySystemType:"",			 
				nameStyle: 'color:#aaa',	 
				phoneStyle:'color:#aaa',	 
				cityMath:'',
				isA:true,
				isB:true,
				blackBg: true,
				sellCarPosition: '',		 
				CskeySort:false,  
				crier:false,   
			}
		},
		created(){
			this.cityId = this.$route.query.cityId;
			this.cityName = this.$route.query.cityName;			
		},
		mounted: function() {
	        var _this = this;
			this.returndata = {
	            "serviceName":"app.query.dealerList",
	            "timestamp":this.$global().timestamp,
	            "serialNumber":this.$global().serialNumber,
	            "request_data":{
	                "cityId":this.cityId,	 
	                "page":1
		        }
		    }
		    this.bannerData = {
		    	"serviceName":"app.query.banner",
	            "timestamp":this.$global().timestamp,
	            "serialNumber":this.$global().serialNumber,
	            "request_data":{
	                "queryType":"3"			 
		        }
		    }
		     this.dealerdata = {
	            "serviceName":"app.sys.dicts",
	            "timestamp":this.$global().timestamp,
	            "serialNumber":this.$global().serialNumber,
	            "request_data":{
	                  "parentId":"163260",
	                  "ifSort":"1"
	              }
	        }
	        this.citydata = {
	            "serviceName":"app.sys.openCities",
	            "timestamp":this.$global().timestamp,
	            "serialNumber":this.$global().serialNumber,
	            "request_data":{}
	        }
	        this.dealerHttpData = {
	            "serviceName":"app.query.dealerList",
	            "timestamp":this.$global().timestamp,
	            "serialNumber":this.$global().serialNumber,
	            "request_data":{
	                "cityId":this.cityId, 
	                "page":1
		        }
		    }

	        this.cityHttpData();
		    this.bannerHttp();
		    this.dictslistHttpData();
		},		
		methods: {
			CskeySortouchStart(event,keySort){
				event = event||window.event; 
				this.CskeySort = keySort;
				this.crier=true;
				return false;
			},
			CskeySortouchMove(event,keySort){ 
				event = event||window.event; 
				this.CskeySort = keySort; 
				this.crier=true;
				return false;
			},
			CskeySortouchEnd(event,keySort){ 
				event = event||window.event; 
				this.CskeySort = keySort; 
				this.crier=false;
				return false;
			},
			dealerReturnPrevtab(){
				this.choosedealer = false;
				this.cityShow = true;
				this.Contractor = true;

			},
			blankReturnPrevtab(){
				this.csType = true;
				this.ppType = false;
			},
			carTypeReturnPrevtab(){
				this.ppType = true;
				this.carType = false;
			},
			audiCarReturnPrevtab(){
				this.audiType = true;
				this.audiCarType = false;
			},
		    ChooseMycar(){
		    	this.Contractor = !this.Contractor;
		    	this.csType = !this.csType;
		    	this.removeStyle();
		    },
			dictslistHttpData () {  
		        var _this = this;
		        this.$axios(this.dealerdata).then((response) => {
		          _this.dicts = response.response_data.dictstandby;
		          _this.CskeySort = _this.dicts[0].keySort;  
		          for( let i=0;i<_this.dicts.length;i++ ){
		          		_this.$set(_this.dicts[i],"keySort",'#'+_this.dicts[i].keySort);
		          }
		        });
	      	},
	      	Goppdict(csdictId){
	      		var _this = this;
	      		this.csType = false;
	      		this.dealerdata.request_data.parentId = csdictId;
	      		this.dealerdata.request_data.ifSort = "";
	      		this.$axios(this.dealerdata).then((response) => {
		          _this.PPdicts = response.response_data.dicts;
		          _this.ppType = true;
		        });
		        this.removeStyle();
	      	},
	      	Gocsdict(ppdict){
	      		this.sellCarBrand = ppdict.dictName;
	      		var _this = this;
	      		this.ppType = false;
	      		this.dealerdata.request_data.parentId = ppdict.dictId;
	      		this.dealerdata.request_data.ifSort = "";
	      		this.$axios(this.dealerdata).then((response) => {
	      			_this.CXdicts = response.response_data.dicts;
	      			_this.carType = true;
	      		})
	      		this.removeStyle();
	      	},
	      	MycarShow(Mycar){
	      		this.Mycar = Mycar.dictName;
	      		this.sellSystemType = Mycar.dictName;
	      		this.carType = false;
	      		this.Contractor = false;
	      		this.removeStyle();
	      	},
	      	exchangeMyCar(){
	      		var _this = this;
	      		this.dealerdata.request_data.parentId = "323490";
	      		this.dealerdata.request_data.ifSort = "";
	      		this.$axios(this.dealerdata).then((response) => {
	      			_this.PPdicts = response.response_data.dicts;
		    		_this.Contractor = true;
	      			_this.audiType = true;
	      			_this.removeStyle();
	      		})
	      	},
	      	goAudicsdict(audippdictId){
	      		var _this = this;
	      		this.audiType = false;
	      		this.dealerdata.request_data.parentId = audippdictId;
	      		this.dealerdata.request_data.ifSort = "";
	      		this.$axios(this.dealerdata).then((response) => {
	      			_this.CXdicts = response.response_data.dicts;
	      			_this.audiCarType = true;
	      		})
	      		this.removeStyle();
	      		
	      	},
	      	audiCarTypeShow(audiCar){
	      		this.isB=false;
	      		this.audiCar = audiCar;
	      		this.buySystemType = audiCar;
	      		this.audiCarType = false;
	      		this.Contractor = false;
	      		this.removeStyle();
	      	},
	      	cityHttpData(){
	      		var _this = this;
	      		this.$axios(this.citydata).then((response) => {
	        		var citys = response.response_data.cities;
	        		for( var i=0;i<citys.length;i++ ){
        				if( !_this.cityList.has('#'+citys[i].standBy) ){
        					var list = [];
    						list.push(citys[i]);
    						_this.cityList.set('#'+citys[i].standBy,list);
    						_this.Clist.push('#'+citys[i].standBy);
        				}else{
        					_this.cityList.get('#'+citys[i].standBy).push(citys[i]);
        				};
	        		}
		        });
	      	},
	      	chooseCity(city){
	      		this.dealerCity = city.cityName;
	      		this.cityId1=city.cityId;
	      		this.cityShow = false;
	      		this.Contractor = false;
	      		this.sellCarPosition = '';
	      	},
			detailHttpData(cityId){
				var _this = this;				        
				this.dealerHttpData.request_data.cityId = cityId;
		        this.$axios(this.dealerHttpData).then((response) => {
		        	_this.dealerHttpData.request_data.pageSize = response.response_data.totalRecords;
		        	_this.$axios(_this.dealerHttpData).then((response) => {
		        		_this.shopHomeNicks = response.response_data.dealers;
		        		_this.Contractor = false;
		        		_this.choosedealer = true;
		        		_this.removeStyle();
		        	})
		        });
			},
			bannerHttp(){
				this.$axios(this.bannerData).then((response) =>{
					this.bannerPath = response.response_data.banners["0"].bannerPath
				})
			},
			jumpAssessment () {	 
				var bridge = getJsBridge();		
				var user = bridge.call("getUserName");
				var _this = this;
				if(user == "-1"){
					bridge.call("doLogin",{},function(data){
						let userPhone = JSON.parse(data).userName;
					})
				}else{
					let userPhone = user;
					bridge.call("startNativeActivity",{url: _this.$global().url+"assessmentonline?cityId="+_this.cityId+"&cityName="+_this.cityName+"&userName="+userPhone, title: "在线评估"}); 
				}
			},
			SellcarHttpData () {
				this.returndata = {
		            "serviceName":"app.subs.submitClue",
		            "timestamp":this.$global().timestamp,
		            "serialNumber":this.$global().serialNumber,
		            "request_data":{
		                "name":this.name,								 
		                "phone":this.phoneText,								 
		                "buyRegion":this.cityId1,							 
		                "sellCarBrand":this.sellCarBrand,      				 
		                "sellSystemType":this.sellSystemType, 				 
		                "buySystemType":this.buySystemType, 				 
		                "dealerCode":this.dealerCode,						 
		                "userwant":this.userwant							 
		            }
		        }
		  		var _this = this;			        
		        this.$axios(this.returndata).then((response) => {
		          	var bridge = getJsBridge();
		          	bridge.call("showLongAlert",{msg:'留资成功，请等待经销商客服联系您！'})
		          	_this.username = '';
		          	_this.name = '';
		          	_this.phoneText = '';
		          	_this.cityId = '';
		          	_this.sellCarBrand = '';
		          	_this.sellSystemType = '';
		          	_this.dealerCity = '';
		          	_this.buySystemType = '';
		            _this.dealerCode = '';
		            _this.userwant = '以旧换旧';
		          	_this.Mycar = "";
		          	_this.audiCar = "卖车可不填";
		          	_this.isB = true;
		        });
		  	},
		  	chooseJudge(event){
		  		event = event||window.event;
		  		this.userwant = event.target.innerHTML;
		  	},
			judge (event) {	 
				event = event||window.event;
				this.name = this.username.replace(/\s/g,'');
				var bridge = getJsBridge();
		        if(this.name == ''){	
		        	this.username = '';
			        bridge.call("showAlert",{msg:this.Alert[0]});
		        }else if(this.phoneText == ''){
			        bridge.call("showAlert",{msg:this.Alert[1]});
		        }else if(!phone.test(this.phoneText)){
			        bridge.call("showAlert",{msg:this.Alert[2]});
		        }else if(this.Mycar == ''){
			        bridge.call("showAlert",{msg:this.Alert[3]});
		        }else if(this.userwant != "我要卖车"){
		        	if( this.audiCar=="卖车可不填" ){
			        	bridge.call("showAlert",{msg:this.Alert[4]});
			        }else if(this.dealerCity==''){
			        	bridge.call("showAlert",{msg:this.Alert[5]});
			        }else if(this.username!=''&&this.phoneText!=''&&phone.test(this.phoneText)&&this.dealerCity!=''&&this.audiCar!=''&&this.Mycar!=''){	
				        this.SellcarHttpData();
			        }else if(this.username!=''&&this.phoneText!=''&&phone.test(this.phoneText)&&this.dealerCity!=''&&this.Mycar!=''){
				        this.SellcarHttpData();
			        }
		        }else if(this.userwant == "我要卖车"){
		        	if(this.dealerCity==''){
			        	bridge.call("showAlert",{msg:this.Alert[5]});
			        }else if(this.username!=''&&this.phoneText!=''&&phone.test(this.phoneText)&&this.dealerCity!=''&&this.Mycar!=''){
				        this.SellcarHttpData();
			        }
		        }	        
		    },
		    ChooseDealers (event) {
		    	event = event||window.event;
		    	this.Contractor = !this.Contractor;
		    	this.cityShow = !this.cityShow;
		    	this.removeStyle();
		    },
		    dealerYes(index){
		    	this.YesshopHomeNick = this.shopHomeNicks[index].shopHomeNick;
		    	this.dealerCode = this.shopHomeNicks[index].dealerCode;
		    	this.choosedealer = !this.choosedealer;
		    	var	sellCar = document.getElementById("sellCar");
		    	this.removeStyle();
		    },
		    cityYes(){
		    	var _this = this;
	      		this.removeStyle();
		    	this.YesshopHomeNick= this.dealerCity;
		    	this.choosedealer = !this.choosedealer;
		    	var	sellCar = document.getElementById("sellCar");
		    	this.removeStyle();
		    },
		    choosedealerShow(){	 
		    	this.Contractor = false;
		    	this.choosedealer = false;
		    	this.csType = false;
		    	this.ppType = false;
		    	this.carType = false;
		    	this.audiType = false;
		    	this.audiCarType = false;
		    	this.cityShow = false;
	    		this.sellCarPosition = '';
		    },
		    removeStyle(){
		    	if( this.choosedealer==true||
		    		this.Contractor==true||
		    		this.csType==true||
		    		this.ppType==true||
		    		this.carType==true||
		    		this.audiType==true||
		    		this.audiCarType==true||
		    		this.cityShow==true ){
		    		this.sellCarPosition = 'position:fixed;top:0;left:0;';
		    	}else{
		    		this.sellCarPosition = '';
		    	}
		    }
		}
	}
</script>