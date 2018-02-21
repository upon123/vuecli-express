<template>
	<div class="advanced-filter">
		<div class="cheliang">
			<h4>车辆标签</h4>
			<div>
				<span id="label_audi" @click="focusCarTAB($event)">奥迪认证车</span>
				<span id="label_interest" @click="focusCarTAB($event)">2年0利率</span>
			</div>
		</div>
		<div class="color">
			<h4>颜色</h4>
			<div>
				<div>
					<span @click="focusColorTAB($event)" id="buff">米色</span>
					<span @click="focusColorTAB($event)" id="blue">蓝色</span>
					<span @click="focusColorTAB($event)" id="brown">棕色</span>
					<span @click="focusColorTAB($event)" id="Tung">桐色</span>
				</div>
				<div>
					<span @click="focusColorTAB($event)" id="yellow">黄色</span>
					<span @click="focusColorTAB($event)" id="glow">金色</span>
					<span @click="focusColorTAB($event)" id="gray">灰色</span>
					<span @click="focusColorTAB($event)" id="green">绿色</span>
				</div>
				<div>
					<span @click="focusColorTAB($event)" id="orange">橙色</span>
					<span @click="focusColorTAB($event)" id="red">红色</span>
					<span @click="focusColorTAB($event)" id="black">黑色</span>
					<span @click="focusColorTAB($event)" id="silver">银色</span>
				</div>
				<div>
					<span @click="focusColorTAB($event)" id="purple">紫色</span>
					<span @click="focusColorTAB($event)" id="white">白色</span>
					<span @click="focusColorTAB($event)" id="other_Colors">其他</span>
				</div>
			</div>
		</div>
		<div class="expertRangeBox">
			<group>
		      <p class="vehicleage">车龄<span>(年)</span></p>
		      <p class="vehicleageRight">{{vehicleage_Text}}</p>
		      <div class="range_rl">
		      	<div class="rangeleft">
			      <cell primary="content">
			        <range v-model="vehicleage_Less" :min="0" :max="10" :step="step" :range-bar-height="2" @touchmove.native="VehicleageLeftstep($event)">
			        </range>
			      </cell>
			    </div>
			    <div class="rangeright">
			      <cell primary="content">
			        <range v-model="vehicleage_More" :min="0" :max="10" :step="step" :range-bar-height="2" @touchmove.native="VehicleageRightstep($event)">
			        </range>
			      </cell>
			    </div>
		      </div>
		    </group>
		    <ul class="vehicleageRange">
		        <li class="rangeul_A">0</li>
		        <li class="rangeul_B">1</li>
		        <li class="rangeul_C">2</li>
		        <li class="rangeul_D">3</li>
		        <li class="rangeul_E">4</li>
		        <li class="rangeul_F">5</li>
		    </ul>
		</div>
		<div class="expertRangeBox">
			<group>
		      <p class="vehicleage">驾驶里程<span>(万公里)</span></p>
		      <p class="vehicleageRight">{{mileage_Text}}</p>
		      <div class="range_rl">
		      	<div class="rangeleft">
			      <cell primary="content">
			        <range v-model="mileage_Less" :min="0" :max="30" :step="step" :range-bar-height="2" @touchmove.native="MileageLeftstep($event)">
			        </range>
			      </cell>
			    </div>
			    <div class="rangeright">
			      <cell primary="content">
			        <range v-model="mileage_More" :min="0" :max="30" :step="step" :range-bar-height="2" @touchmove.native="MileageRightstep($event)">
			        </range>
			      </cell>
			    </div>
		      </div>
		    </group>
		    <ul class="mileageRange">
		        <li class="rangeul_A">0</li>
		        <li class="rangeul_B">3</li>
		        <li class="rangeul_C">6</li>
		        <li class="rangeul_D">9</li>
		        <li class="rangeul_E">12</li>
		        <li class="rangeul_F">15</li>
		    </ul>
		</div>
		<div class="expertRangeBox">
			<group>
		      <p class="vehicleage">排量<span>(L/T)</span></p>
		      <p class="vehicleageRight">{{displacement_Text}}</p>
		      <div class="range_rl">
		      	<div class="rangeleft">
			      <cell primary="content">
			        <range v-model="displacement_Less" :min="0" :max="10" :step="step" :range-bar-height="2.4" @touchmove.native="DisplacementLeftstep($event)">
			        </range>
			      </cell>
			    </div>
			    <div class="rangeright">
			      <cell primary="content">
			        <range v-model="displacement_More" :min="0" :max="10" :step="step" :range-bar-height="2.4" @touchmove.native="DisplacementRightstep($event)">
			        </range>
			      </cell>
			    </div>
		      </div>
		    </group>
		    <ul class="displacementRange">
		        <li class="rangeul_A">0</li>
		        <li class="rangeul_B">1.0</li>
		        <li class="rangeul_C">2.0</li>
		        <li class="rangeul_D">3.0</li>
		        <li class="rangeul_E">4.0</li>
		        <li class="rangeul_F">不限</li>
		    </ul>
		</div>
		<div class="paifang">
			<h4>排放标准</h4>
			<div>
				<span @click="focuscarAirTAB($event)">国二及以上</span>
				<span @click="focuscarAirTAB($event)">国三及以上</span>
				<span @click="focuscarAirTAB($event)">国四及以上</span>
				<span @click="focuscarAirTAB($event)">国五</span>
			</div>
		</div>
		<div class="gearbox">
			<h4>变速箱</h4>
			<div>
				<span @click="focustransMissionTAB($event)">手动挡</span>
				<span @click="focustransMissionTAB($event)">自动挡</span>
				<span @click="focustransMissionTAB($event)">手自一体</span>
			</div>
		</div>
		<div class="reset_FalseLook"></div>
		<div class="reset_look">
			<div class="fruit">
				<p>符合条件的车共<span>{{totalRecords}}</span>辆</p>
			</div>
			<div @click="GotoBuyCar" class="look">
				查看
			</div>
		</div>
	</div>
</template>
<script >
    window.onload=function(){
    	var aa=document.getElementsByClassName('weui-cell');
    	for(var i=0;i<aa.length;i++){
            aa[i].style.width="109%";
            aa[i].style.margin="0 0 0 -.7rem";
    	}
    }
	import { XButton, Range, GroupTitle, Group, Cell } from 'vux';
	export default {
	  components: {
	    Range,
	    Group,
	    GroupTitle,
	    Cell,
	    XButton
	  },
	  created(){
	  		this.cityId = this.$route.query.cityId;
	  		this.cityName = this.$route.query.cityName;
		    this.labels = this.$route.query.labels;
		    this.modelLine = this.$route.query.modelLine;
		    this.price = this.$route.query.price;
		    this.queryType = this.$route.query.queryType;
		    this.color = this.$route.query.color;
		    this.transmission = this.$route.query.transmission;
		    this.transmission_Text = this.$route.query.transmission_Text;
		    this.emission = this.$route.query.emission;
		    this.emission_Text = this.$route.query.emission_Text;
		    this.carAge = this.$route.query.carAge;
		    this.carAir = this.$route.query.carAir;
		    this.mileAge = this.$route.query.mileAge;

		    if(this.carAge != ''){
		    	this.vehicleage_Less = this.carAge.split(',')[0]*2;
		    	this.vehicleage_More = this.carAge.split(',')[1]*2;
		    	this.VehicleageRange();
		    }
		    if(this.mileAge != ''){
		    	this.mileage_Less = this.mileAge.split(',')[0]*2;
		    	this.mileage_More = this.mileAge.split(',')[1]*2;
		    	this.MileageRange();
		    }
		    if(this.carAir != ''){
		    	this.displacement_Less = this.carAir.split(',')[0]*2;
		    	this.displacement_More = this.carAir.split(',')[1]*2;
		    	this.DisplacementRange();
		    }
	  },
	  mounted () {
	  		var label_audi = document.getElementById("label_audi");
		    var label_interest = document.getElementById("label_interest");
		    var colorArr = document.getElementsByClassName("color")["0"].getElementsByTagName("span");
		    if(this.color == "其他"){
		    	colorArr[14].className = "focusSpan";
		    	this.color_Text = this.color+"颜色";
		    }else{
		    	for(var i=0;i<colorArr.length-1;i++){
		    		if(this.color+"色" == colorArr[i].innerText){
		    			colorArr[i].className = "focusSpan";
		    			this.color_Text = this.color+"色";
		    		}
		    	}
		    }

		    var emissionArr = document.getElementsByClassName("paifang")["0"].getElementsByTagName("span");
	    	for(var i=0;i<emissionArr.length;i++){
	    		if(this.emission_Text == emissionArr[i].innerText){
	    			emissionArr[i].className = "focusSpan";
	    		}
	    	}

	    	var transmissionArr = document.getElementsByClassName("gearbox")["0"].getElementsByTagName("span");
	    	for(var i=0;i<transmissionArr.length;i++){
	    		if(this.transmission_Text == transmissionArr[i].innerText){
	    			transmissionArr[i].className = "focusSpan";
	    		}
	    	}

		    var _this = this;

		    this.$nextTick(() => {
		        this.CheckFile();
	      	});

	      	if(this.$route.query.keyword == "undefined"){
	      		this.keyword = "";
	      	}else{
	      		this.keyword = this.$route.query.keyword;
	      	}
	    	if( this.labels=="2"||this.labels=="3"||this.labels=="5" ){
		    	if( this.labels=="2" ){
		    		label_interest.className = "";
	    			label_audi.className = "focusSpan";
	    			this.labels_Text = "奥迪认证车";
		    	}else if( this.labels=="3" ){
		    		label_audi.className = "";
	    			label_interest.className = "focusSpan";
	    			this.labels_Text = "2年0利率";
		    	}else if( this.labels=="5" ){
		    		label_audi.className = "";
		    		label_interest.className = "";
		    		this.labels_Text = "热门车源";
		    	}
		    }else{
		    	label_audi.className = "";
		    	label_interest.className = "";
		    	this.labels_Text = "";
		    	this.labels = "";
		    	this.queryType = "";
		    }
		    window.resetAdvancedSearch = function(){
		    	_this.queryType = '';
		    	_this.keyword = '';
		    	_this.price = '';
		    	_this.modelLine = '';
		    	_this.labels = '';
		    	_this.color = '';
		    	_this.transmission = '';
		    	_this.emission = '';
		    	_this.carAge = '';
		    	_this.carAir = '';
		    	_this.mileAge = '';
		    	_this.labels_Text = '';
		    	_this.transmission_Text = '';
		    	_this.emission_Text = '';


			    label_audi.className = '';
			    label_interest.className = '';
		    	for(var i=0;i<colorArr.length;i++){
	    			colorArr[i].className = "";
	    			_this.color_Text = "";
		    	}

		    	for(var i=0;i<emissionArr.length;i++){
	    			emissionArr[i].className = "";
		    	}

		    	for(var i=0;i<transmissionArr.length;i++){
	    			transmissionArr[i].className = "";
		    	}

		    	_this.vehicleage_Less = 0;
		    	_this.vehicleage_More = 10;
		    	_this.VehicleageRange();

		    	_this.mileage_Less = 0;
		    	_this.mileage_More = 30;
		    	_this.MileageRange();

		    	_this.displacement_Less = 0;
		    	_this.displacement_More = 10;
		    	_this.DisplacementRange();

		    	_this.CheckFile();
		    }
	  },
	  data () {
	    return {
	    	returndata:'',
	    	cityId:'',
	    	cityName:'',
	    	labels:'',
	    	modelLine: '',
	    	price: '',
	    	keyword: '',
	    	queryType: '',
	    	color:'',
	    	transmission:'',
	    	mileAge:'',
	    	emission:'',
	    	carAge:'',
	    	carAir:'',
	    	step:1,
	    	vehicleage_Less:0,
	    	vehicleage_More:10,
	    	vehicleage_Text:'不限车龄',
	    	vehicleage_text:'',
	    	mileage_Less:0,
	    	mileage_More:30,
	    	mileage_Text:'不限里程',
	    	mileage_text:'',
	    	displacement_Less:0,
	    	displacement_More:10,
	    	displacement_Text:'不限排量',
	    	displacement_text:'',
	    	CarTAB:'',
	    	ColorTAB:'',
	    	carAirTAB:'',
	    	transMissionTAB:'',
	    	totalRecords:'',
	    	labels_Text:'',
	    	color_Text:'',
	    	transmission_Text:'',
	    	emission_Text:'',
	    	goToAdvancedSearch:{}

	    }
	  },
	  methods: {
	  		CheckFile(){
		    	var _this = this;
		    	this.returndata = {
		            "serviceName":"app.query.carList",
		            "timestamp":this.$global().timestamp,
		            "serialNumber":this.$global().serialNumber,
		            "request_data":{
		                "cityId":this.cityId,
		                "queryType": this.queryType,
		                "keyword": this.keyword,
		                "price": this.price,
		                "modelLine": this.modelLine,
		                "labels":this.labels,
		                "color":this.color,
		                "transmission":this.transmission,
		                "emission":this.emission,
		                "carAge":this.carAge,
		                "carAir":this.carAir,
		                "mileAge":this.mileAge
		            }
		        }
		        this.$axios(this.returndata).then((response) => {
		        	if( response.retCode==0 ){
		        		if( response.response_data ){
			        		_this.totalRecords = response.response_data.totalRecords;
			        	}else{
			        		_this.totalRecords = 0;
			        	}
		        	}
		        })
		    },
		  	VehicleageLeftstep (event) {
		    	event = event||window.event;
			    if( this.vehicleage_Less >= this.vehicleage_More ){
				    this.vehicleage_Less = this.vehicleage_More - 1;
			    }
			    this.VehicleageRange();
		    },
		    VehicleageRightstep (event) {
		    	event = event||window.event;
		    	if( this.vehicleage_Less >= this.vehicleage_More ) {
		    		this.vehicleage_More = this.vehicleage_Less + 1;
		    		return false;
		    	}
		    	this.VehicleageRange();
		    },
		    VehicleageRange(){
		    	if( this.vehicleage_Less==0&&this.vehicleage_More==10 ){
		    		this.vehicleage_Text = '不限车龄';
		    		this.vehicleage_text = '';
		    		this.carAge = '';
		    	}else if( this.vehicleage_Less==0&&this.vehicleage_More<10 ){
		    		this.vehicleage_Text = this.vehicleage_More/2+"年以下";
		    		this.carAge = 0+","+this.vehicleage_More/2;
		    		this.vehicleage_text = this.vehicleage_Text;
		    	}else if( this.vehicleage_Less>0&&this.vehicleage_More==10 ){
		    		this.vehicleage_Text = this.vehicleage_Less/2+"年以上";
		    		this.carAge = this.vehicleage_Less/2;
		    		this.vehicleage_text = this.vehicleage_Text;
		    	}else if( this.vehicleage_Less>0&&this.vehicleage_More<10 ){
		    		this.vehicleage_Text = this.vehicleage_Less/2+"-"+this.vehicleage_More/2+"年";
		    		this.carAge = this.vehicleage_Less/2+","+this.vehicleage_More/2;
		    		this.vehicleage_text = this.vehicleage_Text;
		    	}
		    	this.CheckFile();
		    },
		    MileageLeftstep (event) {
		    	event = event||window.event;
			    if( this.mileage_Less >= this.mileage_More ){
				    this.mileage_Less = this.mileage_More - 1;
			    }
			    this.MileageRange();
		    },
		    MileageRightstep (event) {
		    	event = event||window.event;
		    	if( this.mileage_Less >= this.mileage_More ) {
		    		this.mileage_More = this.mileage_Less + 1;
		    		return false;
		    	}
		    	this.MileageRange();
		    },
		    MileageRange(){
		    	if( this.mileage_Less==0&&this.mileage_More==30 ){
		    		this.mileage_Text = '不限里程';
		    		this.mileAge = '';
		    		this.mileage_text = '';
		    	}else if( this.mileage_Less==0&&this.mileage_More<30 ){
		    		this.mileage_Text = this.mileage_More/2+"万公里以下";
		    		this.mileAge = 0+","+this.mileage_More/2;
		    		this.mileage_text = this.mileage_Text;
		    	}else if( this.mileage_Less>0&&this.mileage_More==30 ){
		    		this.mileage_Text = this.mileage_Less/2+"万公里以上";
		    		this.mileAge = this.mileage_Less/2;
		    		this.mileage_text = this.mileage_Text;
		    	}else if( this.mileage_Less>0&&this.mileage_More<30 ){
		    		this.mileage_Text = this.mileage_Less/2+"-"+this.mileage_More/2+"万公里";
		    		this.mileAge = this.mileage_Less/2+","+this.mileage_More/2;
		    		this.mileage_text = this.mileage_Text;
		    	}
		    	this.CheckFile();
		    },
		    DisplacementLeftstep (event) {
		    	event = event||window.event;
			    if( this.displacement_Less >= this.displacement_More ){
				    this.displacement_Less = this.displacement_More - 1;
			    }
			    this.DisplacementRange();
		    },
		    DisplacementRightstep (event) {
		    	event = event||window.event;
		    	if( this.displacement_Less >= this.displacement_More ) {
		    		this.displacement_More = this.displacement_Less + 1;
		    		return false;
		    	}
		    	this.DisplacementRange();
		    },
		    DisplacementRange(){
		    	if( this.displacement_Less==0&&this.displacement_More==10 ){
		    		this.displacement_Text = '不限排量';
		    		this.carAir = '';
		    		this.displacement_text = '';
		    	}else if( this.displacement_Less==0&&this.displacement_More<10 ){
		    		this.displacement_Text = this.displacement_More/2+"L/T以下";
		    		this.carAir = 0+","+this.displacement_More/2;
		    		this.displacement_text = this.displacement_Text;
		    	}else if( this.displacement_Less>0&&this.displacement_More==10 ){
		    		this.displacement_Text = this.displacement_Less/2+"L/T以上";
		    		this.carAir = this.displacement_Less/2;
		    		this.displacement_text = this.displacement_Text;
		    	}else if( this.displacement_Less>0&&this.displacement_More<10 ){
		    		this.displacement_Text = this.displacement_Less/2+"-"+this.displacement_More/2+"L/T";
		    		this.carAir = this.displacement_Less/2+","+this.displacement_More/2;
		    		this.displacement_text = this.displacement_Text;
		    	}
		    	this.CheckFile();
		    },
		    focusCarTAB(event){
		    	this.focusClassTochange(event);
		    },
		    focusColorTAB(event){
		    	this.focusClassTochange(event);
		    },
		    focuscarAirTAB(event){
		    	this.focusClassTochange(event);
		    },
		    focustransMissionTAB(event){
		    	this.focusClassTochange(event);
		    },
		    RemoveAllclassName(parentNode){
		    	for( let i=0;i<parentNode.length;i++ ){
		    		var ChildNode = parentNode[i].children;
		    		for( let j=0;j<ChildNode.length;j++ ){
		    				ChildNode[j].className = "";
		    		}
		    	}
		    },
		    focusClassTochange(event){
		    	event = event||window.event;
		    	var _thisTargetHTML = event.target.innerHTML;
		    	var parentNode = event.target.parentNode.parentNode.children;

		    		if( event.target.className=="" ){
				    	this.RemoveAllclassName(parentNode);
		    			event.target.className="focusSpan";
		    		}else{
				    	this.RemoveAllclassName(parentNode);
		    		}

			    	if( event.target.className=="focusSpan" ){
			    		if( _thisTargetHTML=="奥迪认证车" ){
			    			this.labels = "2";
			    			this.labels_Text = "奥迪认证车";
			    			this.queryType = "LABEL";
			    		}else if( _thisTargetHTML=="2年0利率" ){
			    			this.labels = "3";
			    			this.labels_Text = "2年0利率";
			    			this.queryType = "LABEL";
			    		}else if( _thisTargetHTML=="米色" ){
			    			this.color = "米";
			    			this.color_Text = "米色";
			    		}else if( _thisTargetHTML=="蓝色" ){
			    			this.color = "蓝";
			    			this.color_Text = "蓝色";
			    		}else if( _thisTargetHTML=="棕色" ){
			    			this.color = "棕";
			    			this.color_Text = "棕色";
			    		}else if( _thisTargetHTML=="桐色" ){
			    			this.color = "桐";
			    			this.color_Text = "桐色";
			    		}else if( _thisTargetHTML=="黄色" ){
			    			this.color = "黄";
			    			this.color_Text = "黄色";
			    		}else if( _thisTargetHTML=="金色" ){
			    			this.color = "金";
			    			this.color_Text = "金色";
			    		}else if( _thisTargetHTML=="灰色" ){
			    			this.color = "灰";
			    			this.color_Text = "灰色";
			    		}else if( _thisTargetHTML=="绿色" ){
			    			this.color = "绿";
			    			this.color_Text = "绿色";
			    		}else if( _thisTargetHTML=="橙色" ){
			    			this.color = "橙";
			    			this.color_Text = "橙色";
			    		}else if( _thisTargetHTML=="红色" ){
			    			this.color = "红";
			    			this.color_Text = "红色";
			    		}else if( _thisTargetHTML=="黑色" ){
			    			this.color = "黑";
			    			this.color_Text = "黑色";
			    		}else if( _thisTargetHTML=="银色" ){
			    			this.color = "银";
			    			this.color_Text = "银色";
			    		}else if( _thisTargetHTML=="紫色" ){
			    			this.color = "紫";
			    			this.color_Text = "紫色";
			    		}else if( _thisTargetHTML=="白色" ){
			    			this.color = "白";
			    			this.color_Text = "白色";
			    		}else if( _thisTargetHTML=="其他" ){
			    			this.color = "其他";
			    			this.color_Text = "其他颜色";
			    		}else if( _thisTargetHTML=="自动挡" ){
			    			this.transmission = "01";
			    			this.transmission_Text = "自动挡";
			    		}else if( _thisTargetHTML=="手动挡" ){
			    			this.transmission = "02";
			    			this.transmission_Text = "手动挡";
			    		}else if( _thisTargetHTML=="手自一体" ){
			    			this.transmission = "03";
			    			this.transmission_Text = "手自一体";
			    		}else if( _thisTargetHTML=="国二及以上" ){
			    			this.emission = "国Ⅱ,国Ⅲ,国Ⅳ,国Ⅴ";
			    			this.emission_Text = "国二及以上";
			    		}else if( _thisTargetHTML=="国三及以上" ){
			    			this.emission = "国Ⅲ,国Ⅳ,国Ⅴ";
			    			this.emission_Text = "国三及以上";
			    		}else if( _thisTargetHTML=="国四及以上" ){
			    			this.emission = "国Ⅳ,国Ⅴ";
			    			this.emission_Text = "国四及以上";
			    		}else if( _thisTargetHTML=="国五" ){
			    			this.emission = "国Ⅴ";
			    			this.emission_Text = "国五";
			    		}
			    	}else if( _thisTargetHTML=="奥迪认证车"||
			    			  _thisTargetHTML=="2年0利率" ){
			    		this.labels = "";
			    		this.labels_Text = "";
			    		this.queryType = "";
			    	}else if( _thisTargetHTML=="米色"||
			    			  _thisTargetHTML=="蓝色"||
			    			  _thisTargetHTML=="棕色"||
			    			  _thisTargetHTML=="桐色"||
			    			  _thisTargetHTML=="黄色"||
			    			  _thisTargetHTML=="金色"||
			    			  _thisTargetHTML=="灰色"||
			    			  _thisTargetHTML=="绿色"||
			    			  _thisTargetHTML=="橙色"||
			    			  _thisTargetHTML=="红色"||
			    			  _thisTargetHTML=="黑色"||
			    			  _thisTargetHTML=="银色"||
			    			  _thisTargetHTML=="紫色"||
			    			  _thisTargetHTML=="白色"||
			    			  _thisTargetHTML=="其他" ){
			    		this.color = "";
			    		this.color_Text = "";
			    	}else if( _thisTargetHTML=="国二及以上"||
			    			  _thisTargetHTML=="国三及以上"||
			    			  _thisTargetHTML=="国四及以上"||
			    			  _thisTargetHTML=="国五" ){
			    		this.emission = "";
			    		this.emission_Text = "";
			    	}else if( _thisTargetHTML=="手动"||
			    			  _thisTargetHTML=="自动"||
			    			  _thisTargetHTML=="手自一体" ){
			    		this.transmission = "";
			    		this.transmission_Text = "";
			    	}
		    		this.CheckFile();
		    },
		    GotoBuyCar(){
		    	var bridge = getJsBridge();
		    		this.goToAdvancedSearch = this.labels+'~'+this.color+'~'+this.transmission+'~'+this.emission+'~'+this.carAge+'~'+this.carAir+'~'+this.mileAge+'~'+this.labels_Text+'~'+this.color_Text+'~'+this.transmission_Text+'~'+this.emission_Text+'~'+this.vehicleage_text+'~'+this.mileage_text+'~'+this.displacement_text+'~'+this.queryType+'~'+this.keyword+'~'+this.cityId+'~'+this.modelLine+'~'+this.price+'~'+this.cityName;
		    		bridge.call("goToAdvancedSearch",{advancedFilter:this.goToAdvancedSearch});
		    }
	    }
	}
</script>
