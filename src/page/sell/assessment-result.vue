<template>
	<div class="assessment-resultBox">
		<div class="assessment-result-top">
			<p class="assessment-result-prices">预估卖车价（万元）</p>
			<p class="assessment-result-price">{{guidedPrice_type>1?guidedPrice_type:'0'+guidedPrice_type}}</p>
		</div>
		<div class="assessment-ressult-vehicleconditions-Box">
			<div class="assessment-ressult-vehicleconditions">
				<p class="assessment-ressult-vehiclecondition">请选择您的车况</p>
				<div class="Vehicleconditionskind-Box">
					<div @click="guidedPriceType($event)" :class="['Vehicleconditionskind_first',{'Vehicleconditionskind_yes':midPriceMinType}]">车况较差</div>
					<div @click="guidedPriceType($event)" :class="['Vehicleconditionskind',{'Vehicleconditionskind_yes':midPriceMiddleType}]">车况一般</div>
					<div @click="guidedPriceType($event)" :class="['Vehicleconditionskind_last',{'Vehicleconditionskind_yes':midPriceMaxType}]">车况较好</div>
				</div>
				<div class='Vehicleconditionshint-Box'>
					<p class="Vehicleconditionshint_a">正常损耗指车辆定期保养,无重大事故等,综合车辆基本情况给出的参考价格。</p>
					<p class="Vehicleconditionshint_b">*注：评估结果来源于第三方平台,若要获取精准结果,可直接联系客服。</p>
				</div>
				<p class="Jumpto_Assessment" @click="JumptoAssessmentonline($event)">重新评估<span>></span></p>
			</div>
		</div>

		<div class="displacementActivities">
		    <h2><b>二手车评估活动</b></h2>
		    <div class="searchActivities">
		    	<p @click="chooseCity">{{csName.length>4?csName.substring(0,3)+"...":csName}}<span></span></p>   	
		    	<p @click="chooseCarSeries">{{dictName}}<span></span></p>
		    </div>
			<div class="price" v-show="carSeries" @click="hideCarSeries">			
				<div class="searchActivities">
			    	<p @click="chooseCity">{{csName.length>4?csName.substring(0,3)+"...":csName}}<span></span></p>    	
			    	<p>{{dictName}}<span></span></p>
			    </div>
				<ul class="carPrice">
					<li @click="noCars" :class="['carPrice_li',{'carPrice_licolor':dictName=='不限车系'}]">不限车系</li>
		      		<li :class="['carPrice_li',{'carPrice_licolor':dictName==dict.dictName}]" v-for='(dict,index) in dicts' :key="dict.id" @click="carScree(index,$event)">
		      			{{dict.dictName}}
		      		</li>
				</ul>		
			</div>
		    <ActivityList ref="activity_List" :activityData="activityData" keyWord="" :cityId='cityId' activityService='3' dealerCode='' carLineId=''></ActivityList>
		</div>
	</div>
</template>

<script>
	import ActivityList from '../list/activity-list.vue';
	export default{
		components:{
			ActivityList
		},
		props:['guidedPrice','cityId','cityName'],
		created () {
			this.csId = this.cityId;
			this.csName = this.cityName;
		},
		mounted () {
			this.guidedPrice_type = this.guidedPrice.midPriceMin;
			this.dictslistHttpData();
		},
		data () {
			return{
				guidedPrice_type:'',
				midPriceMinType:true,			 
				midPriceMiddleType:false,		 
				midPriceMaxType:false,				 
				dictName:'不限车系',
				dictId: '',						 
				dicts:[],
				carSeries: false,
				csId: '',					 
				csName: '',					 
				activityData: []				 
			}
		},
		methods:{
			guidedPriceType(event){	 
				event = event||window.event;
				if( event.target.innerHTML=="车况较差" ){
					this.guidedPrice_type = this.guidedPrice.midPriceMin;
					this.midPriceMinType = true;
					this.midPriceMiddleType = false;
					this.midPriceMaxType = false;
				}else if( event.target.innerHTML=="车况一般" ){
					this.guidedPrice_type = this.guidedPrice.midPriceMiddle;
					this.midPriceMinType = false;
					this.midPriceMiddleType = true;
					this.midPriceMaxType = false;
				}else if( event.target.innerHTML=="车况较好" ){
					this.guidedPrice_type = this.guidedPrice.midPriceMax;
					this.midPriceMinType = false;
					this.midPriceMiddleType = false;
					this.midPriceMaxType = true;
				}
			},
			JumptoAssessmentonline (e) {
				this.$emit('JumptoAssessmentonline');
			},
			carScree (i,event) {	 
		    	event = event||window.event;
		    	this.car = !this.car;
				this.sort = false;
				this.price = false;
				this.dictName = this.dicts[i].dictName;
				this.dictId = this.dicts[i].dictId;
				this.activityData = [];
				this.$refs.activity_List.activityListHttpData('',this.csId,'3','',this.dictId);
		    },
		    noCars(){
		    	this.dictName = "不限车系";
		    	this.dictId = "";
		    	this.activityData = [];
		    	this.$refs.activity_List.activityListHttpData('',this.csId,'3','',this.dictId);
		    },
		    dictslistHttpData () {	 
		        var _this = this;
		        let data_cx = {
		            "serviceName":"app.sys.dicts",
		            "timestamp":this.$global().timestamp,
		            "serialNumber":this.$global().serialNumber,
		            "request_data":{
		                "parentId":"280",
		                "type": "newCarId"
		            }
		        }
		        this.$axios(data_cx).then((response) => {
		            _this.dicts = response.response_data.dicts;
		        });
		    },
		    hideCarSeries(){
		    	this.carSeries = false;
		    },
		    chooseCity(){		    	
		    	var _this = this;
				var bridge = getJsBridge();	
		  		bridge.call("startChooseCityActivity",{},function(citys){	
		  			let cityArr = JSON.parse(citys);  			  			
	  				_this.csId = cityArr.cityId;
	  				_this.csName = cityArr.cityName;  	
	  				_this.activityData = [];
		    		_this.$refs.activity_List.activityListHttpData('',_this.csId,'3','',_this.dictId);		
		  		});
		  		this.carSeries = false;
		    },
		    chooseCarSeries(){
		    	this.carSeries = true;
		    }
		}
	}
</script>