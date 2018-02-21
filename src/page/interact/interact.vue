 <template>
	<div class="interact">
		<div class="interact-top">
			<p class="interact-top-p1" :style="activityBorder" @click="activity">活动</p>
			<p class="interact-top-p2" :style="carFriendsBorder" @click="carFriends">车友汇</p>
			<div style="clear:both"></div>
		</div>	
		<div style="height:1.28rem;"></div>	
		<div class="activity" v-show="activityShow">
			<div class="interact-center">
				<div class="interact-center-top">			  
	                <span class="chooseStore" @click="chooseCity">{{cityName.length>4?cityName.substring(0,3)+"...":cityName}}</span>
	                <span>|</span>
	                <p></p>
	                <input type="text" name="" placeholder='输入活动/经销商信息' v-model="name">
	                <span class="close" @click="remove" v-show='inter'></span>
				</div>
				<p class="interact-center-top1" @click="search">搜索</p>
				<div style="clear:both;"></div>			
			</div>
			<p class="interact-center-screen" v-show="getSearch">{{keyWord}}<span @click="remove_p($event)"></span></p>

			<div id="progress" v-if='progress' ref="loading">
				<img class="carloading" src="../../../static/images/loading/loading.gif">
				<p>正在刷新...</p>
			</div>

			<div id="progress" v-if='progress1' ref="loading">
				<img class="carloading" src="../../../static/images/loading/loading.gif">
				<p>松手刷新</p>
			</div>

			<ActivityList ref="activity_List" :activityData="activityData" :keyWord="keyWord" :cityId='cityId' activityService='' dealerCode='' carLineId='' path='long' @ievent = "ievent"></ActivityList>
		</div>
		<div class="carFriends" v-show="carFriendsShow">
			<div class="carFriends_one" @click="jumpgouchebaike">
		        <p class="math">{{sumReadingCount1}}</p>
				<p class="bottom">文章：{{totalRecords1}}篇</p>
			</div>
			<div class="carFriends_two" @click="jumpkeyMessage">
				<p class="math">{{sumReadingCount2}}</p>
				<p class="bottom">已解决：{{totalRecords2}}问题</p>		
			</div>
			<div class="carFriends_three" @click="jumpCarWork">
				<p class="math">{{sumReadingCount3}}</p>
				<p class="bottom">文章：{{totalRecords3}}篇</p>			
			</div>
		</div>
	</div>
</template>
<script>
	import ActivityList from '../list/activity-list.vue';
	export default{
		components: {
		    ActivityList,
		},
		data(){
			return{
				activityBorder: 'border-bottom: 2px solid #fff', 
				carFriendsBorder: '',							 
				cityId: '',										 
				cityName: '',
				activityShow: true,										 
				carFriendsShow: false,									 
				name:'',                                                 
				keyWord: '',                                			 
				getSearch: false,
				dealerData:'',
				dealer:[],
				activityData: [],
				page: 1,	
				sumReadingCount1: '',								 										
				sumReadingCount2: '',								 										
				sumReadingCount3: '',								 		
				totalRecords1: '',									 
				totalRecords2: '',									 
				totalRecords3: '',									 
				userName:'',										 
				progress: false,
              	progress1: false,
              	direction: '',
				startY: 0,
				moveY: '',
				endY: 0,
				scrollTop: '',
				inter:false,
				progressStatus: ''
			}
		},
		watch:{
            name(newVal,oldVal){
                if( newVal!='' ){
                    this.inter = true;
                }else if( newVal=='' ){
                    this.inter = false;
                }
            }
        },
		created(){
			this.cityId = this.$route.query.cityId;
			this.cityName = this.$route.query.cityName;

		},
		mounted(){
            var _this = this;
            
            let interactData1 = {
				"serviceName":"app.query.buyingGuideList",
	          	"timestamp":this.$global().timestamp,
	          	"serialNumber":this.$global().serialNumber,
	          	"request_data":{
	          	}
		  	}
			this.$axios(interactData1).then((response) => {
				if(response.retCode == "0"){
					_this.sumReadingCount1=response.response_data.sumReadingCount;
					_this.totalRecords1=response.response_data.totalRecords;
				}else{
					_this.sumReadingCount1 = 0;
					_this.totalRecords1 = 0;
				}				
			})
			let interactData2 = {
				"serviceName":"app.query.clubQuestionList",
	          	"timestamp":this.$global().timestamp,
	          	"serialNumber":this.$global().serialNumber,
	          	"request_data":{
	          		"operation": "query"
	          	}
		  	}
			this.$axios(interactData2).then((response) => {
				if(response.retCode == "0"){
					_this.sumReadingCount2=response.response_data.sumQuestionReadingCount;
					_this.totalRecords2=response.response_data.totalTitle;
				}else{
					_this.sumReadingCount2=0;
					_this.totalRecords2=0;
				}
			})
			let interactData3 = {
				"serviceName":"app.query.clubPickupWork",
	          	"timestamp":this.$global().timestamp,
	          	"serialNumber":this.$global().serialNumber,
	          	"request_data":{
	          		"operation": "query"
	          	}
		  	}
			this.$axios(interactData3).then((response) => {
				if(response.retCode == "0"){
					_this.sumReadingCount3=response.response_data.sumClubPickUpReadingCount;
					_this.totalRecords3=response.response_data.totalRecords;
				}else{
					_this.sumReadingCount3=0;
					_this.totalRecords3=0;
				}				
			})	

			window.addEventListener('touchstart',this.touchStart);
	        window.addEventListener('touchmove',this.touchMove);
	        window.addEventListener('touchend',this.touchEnd);
		},
		methods:{
			activity(){		 
				this.activityBorder = "border-bottom: 2px solid #fff;color: #fff";
				this.carFriendsBorder = "color: #999999";
				this.activityShow = true;									
				this.carFriendsShow = false;
			},
			carFriends(){	 
				this.carFriendsBorder = "border-bottom: 2px solid #fff;color: #fff";
				this.activityBorder = "color: #999999";
				this.activityShow = false;									
				this.carFriendsShow = true;
			},
			jumpgouchebaike(){
				var bridge = getJsBridge();
				bridge.call("startNativeActivity",{url:this.$global().url+"carEncyclopedia",title:"购车百科"});
			},
			jumpkeyMessage(){
				var bridge = getJsBridge();
				bridge.call("startNativeActivity",{url:this.$global().url+"keymessage",title:"一键留言"});
			},
			jumpCarWork(){
				var bridge = getJsBridge();
				bridge.call("startNativeActivity",{url:this.$global().url+"cyclopediawork",title:"提车作业"});
			},
			search(){  
			    if (this.name!='') {
                    this.keyWord = this.name;                    
                    this.activityData = [];
                    this.$refs.activity_List.activityListHttpData(this.keyWord,this.cityId,'','','');
			    }   			    
			    if(this.name&&!this.getSearch){
			    	this.getSearch = true;
			    }else if(!this.name&&this.getSearch){
			    	this.name = "";	
			    }else if(!this.name&&!this.getSearch){
                    this.getSearch =false;
			    }
			    this.name = "";
			},
			remove(){
				this.name = "";
			},
			remove_p(){
                this.getSearch =false;
                this.keyWord = '';
                this.activityData = [];
                this.$refs.activity_List.activityListHttpData(this.keyWord,this.cityId,'','','');
			},
			chooseCity(){		    	
		    	var _this = this;
				var bridge = getJsBridge();	
		  		bridge.call("startChooseCityActivity",{},function(citys){	
		  			let cityArr = JSON.parse(citys);  			
		  			_this.cityId = cityArr.cityId;                	
		  			_this.cityName = cityArr.cityName;
		  			_this.activityData = [];                    
                    _this.$refs.activity_List.activityListHttpData(_this.keyWord,_this.cityId,'','','');
		  		});
		  		this.carSeries = false;
		    },
		    ievent(data){
				this.progress = data;
			},

		    touchStart(){
				let evt = event||window.event;
	            this.startY = evt.targetTouches[0].pageY;
	        },
	        touchMove(){
	            if(this.progress1) return;  
	            let evt = event||window.event;
	            this.scrollTop = document.documentElement.scrollTop||document.body.scrollTop;  	            
	            this.moveY = evt.targetTouches[0].pageY;
	            this.direction =this.swipeDirection(0,0,this.startY,this.moveY);
	            if(this.scrollTop == 0 && this.direction == 'Down'){ 
	                this.progress1=true;  
	                this.progress=false;	                
	            }
	        },
	        touchEnd(){
	        	if(this.progress) return; 
	        	var _this = this;
	        	if(this.scrollTop <= 0 && this.direction == 'Down'){ 
	        		this.direction = '';
	            	this.progress1=false; 
	                this.progress=true; 
	                this.activityData = [];
	                this.$refs.activity_List.activityListHttp1();	                	                
	            }
	        },
	        swipeDirection(x1, x2, y1, y2) {  
	            return Math.abs(x1 - x2) >=
	            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
	        } 
     	}		
	}
</script>