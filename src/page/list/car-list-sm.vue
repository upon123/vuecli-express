<template>
<div style="height:100%">
	<div class="car-list-sm" v-show="!load">	
		<div class="list" v-for="(carbox,index) in cars" :key="carbox.id">
			<div v-for="(car,index) in carbox" :key="car.id" @click="jumpdealerdetail(car)">
			    <img v-lazy="car.smallImage.path != undefined ? car.smallImage.path.substring(0, car.smallImage.path.length - car.smallImage.path.split('.')[car.smallImage.path.split('.').length-1].length-1)+'_280x210.'+car.smallImage.path.split('.')[car.smallImage.path.split('.').length-1] : ''">
			    <div>
			   		<h2>奥迪 {{car.carModel}} {{car.modelCode}} {{car.transmissiontype}} {{car.carAir}} {{car.deviceType}}</h2>	
			   		<h4 class="buycar_biao">
			   			<img :src="carsign" v-for="carsign in car.tags" :key="carsign.id">				
					</h4>	
					<p>{{car.registration.substring(0,4)}}年/{{car.mileage<=100?0.01:(car.mileage/10000).toFixed(2)}}万公里/{{car.area}}</p>
					<p class="buycar_pay">
					<span>{{(car.price/10000).toFixed(2)}}万</span>
					<span v-if="car.marketingPrice == undefined" class="carpay"></span>
					<span v-else class="carpay">新车价</span>
					<span v-if="car.marketingPrice == undefined" class="xincar"> </span>
					<span v-else class="xincar">{{(car.marketingPrice/10000).toFixed(2)}}万</span>
					</p>
					<p class="dealerName">{{car.agcyName}}</p>
			    </div>
			</div>
        </div>

        <div id="progress" v-if='progress'>
			<img class="carloading" src="../../../static/images/loading/loading.gif">
			<p>正在加载...</p>
		</div>
		<div id="list-end" v-if='listEnd'>
			没有更多数据
		</div>
	</div>
	
	<none v-show='load' :path='path' src='../../static/images/loadf.png' :content='content'></none>
</div>
	
</template>

<script type="text/javascript">
	import none from '../../components/null.vue'
	export default {
		components: {
		  	none
		},	
		props:['pageSize','queryType','modelLine','cityId','dealerCode','path','content','carDetailPath'],	
		data () {
			return {
				showDown:true,	 
				showUp: true,	 
				isbounce:true,	 
				dealerCode: '',	 
				scrollerStatus: {	 
		          pullupStatus: 'default',
		          pulldownStatus:'default'
		        },
		        downobj:{	 
				  content: '请下拉刷新数据',
				  height: 60,
				  autoRefresh: true,
				  downContent: '请下拉刷新数据',
				  upContent: '请下拉刷新数据',
				  loadingContent: '加载中...',
				  clsPrefix: 'xs-plugin-pulldown-'
		        },
		        upobj:{	 
		          content: '请上拉刷新数据',
				  pullUpHeight: 60,
				  height: 200,
				  autoRefresh: false,
				  downContent: '请上拉刷新数据',
				  upContent: '请上拉刷新数据',
				  loadingContent: '加载中...',
				  clsPrefix: 'xs-plugin-pullup-'
		        },
		        carsmdata: '',
				page1:1,
        		cars:[],
        		tags:[],		 
        		transmission_Type:[], 
				pageSum: '',
				progress: false,
				startY: 0,
				endY: 0,
				listEnd: false,
				load: false,
				cityId: '',

			}
		},
		mounted(){
			this.carsmdata = {
	            "serviceName":"app.query.carList",
	            "timestamp":this.$global().timestamp,
	            "serialNumber":this.$global().serialNumber,
              	"request_data":{
              		"page": this.page1,
              		"pageSize": this.pageSize,
                 	"modelLine":this.modelLine,
                  	"cityId":this.cityId,
                  	"dealerCode":this.dealerCode,
                  	"queryType":this.queryType
              	}
	        }  
		    if(this.cityId){
		    	this.carSmHttp();
		    }		

			if(this.carsmdata.request_data.queryType == undefined){
				window.addEventListener('touchstart',this.touchStart);
	        	window.addEventListener('touchmove',this.touchMove);
	        	window.addEventListener('touchend',this.touchEnd);
			}else{
				this.listEnd = false;				
			}
		},
		methods: {
			jumpdealerdetail(car){				
				if(this.carDetailPath == 'sharecar'){
					location.href = this.$global().downloadApp;
				}else{
					let shareUrl = this.$global().url+"sharecar?releaseNumber="+car.releaseNumber+"&modelLine="+encodeURI(car.modelLine)+"&cityId="+this.cityId;
					var bridge = getJsBridge();	
					bridge.call("startNativeActivity",{url: this.$global().url+"cardetail?releaseNumber="+car.releaseNumber+"&cityId="+car.cityId+"&modelLine="+encodeURI(car.modelLine),shareTitle:("奥迪"+" "+car.carModel+" "+car.modelCode+" "+car.transmissiontype+" "+car.carAir+" "+car.deviceType).replace(/\sundefined/g,""),shareInfo:car.shareOfficial,shareImg:car.shareLogo,shareUrl:shareUrl, title: "-1"});//跳转车辆详情页
				}		  		
			},

			touchStart(){
				let evt = event||window.event;
	            this.startY = evt.targetTouches[0].pageY;
	        },
	        touchMove(){
	            if(this.progress) return;  
	            let evt = event||window.event;
	            let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight; 
	            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop; 
	            let clientHeight = document.documentElement.clientHeight||document.body.clientHeight; 
	            
	            this.moveY = evt.targetTouches[0].pageY;
	            let direction =this.swipeDirection(0,0,this.startY,this.moveY);
	            if(scrollTop+clientHeight+1>=scrollHeight && direction == 'Up'){	 
	            	this.carsmdata.request_data.page = ++this.page1;
	                if(this.page1 <= this.pageSum){
	                	this.progress=true;   
	                	this.carSmHttp(); 
	                }else{
	                	this.listEnd = true;  
	                }	                
	            }
	        },
	        touchEnd(){
        		if(this.listEnd == true){
        			this.listEnd = false; 
        		}
	        },
	        swipeDirection(x1, x2, y1, y2) {  
	            return Math.abs(x1 - x2) >=
	            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
	        },
	        carSmHttp(){
	        	var _this = this;		        
		        this.$axios(this.carsmdata).then((response) => {
		        	this.progress = false;		
		        	if(response.response_data!=undefined){
		        		this.load = false
		        	}else{
		        		this.load = true
		        	}        	
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
	        		if(this.carDetailPath == 'cardetail'||this.carDetailPath == 'sharecar'){
	        			if(_this.cars[0].length>=2){
	        				let carDetail = _this.cars[0].slice(0,2);
	        				_this.cars = []
	        				_this.cars.push(carDetail);
	        			}		        			
	        		}
		          	_this.$emit('listenToChildEvent',response.response_data.cars.length);
		        });
	        },
	        
			SmcarHttpData (cityId) {
				this.cityId = cityId;
				this.page1 = 1;
				this.carsmdata.request_data.page = this.page1;
	        	this.carsmdata.request_data.cityId = this.cityId
		  		var _this = this;		        
		        this.$axios(this.carsmdata).then((response) => {
		        	this.progress = false;		
		        	if(response.response_data!=undefined){
		        		this.load = false
		        	}else{
		        		this.load = true
		        	}        	
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
		          	_this.$emit('listenToChildEvent',response.response_data.cars.length);
		        });
		  	}
		}
	}
</script>