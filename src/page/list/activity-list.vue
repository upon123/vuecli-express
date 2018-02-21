<template>
	<div>
		<div v-show="!failed">
			<div class="activity-lists" v-show="!load">
				<div class="activity-lists" v-for="activitys in activityData" :key="activitys.id">
					<div class="activity-list" @click.stop="GoDetail(activity)" v-for="(activity,index) in activitys" :key="activity.id">
						<img v-lazy="activity.logoUrl.substring(0, activity.logoUrl.length - activity.logoUrl.split('.')[activity.logoUrl.split('.').length-1].length-1)+'_270x270.'+activity.logoUrl.split('.')[activity.logoUrl.split('.').length-1]">
						<h3 v-show="activity.activityType!=1">
							{{activity.activityType == 4 ? "劵" : activity.activityType == 3 ? "劵" : activity.activityType == 2 ? "团" : ""}}
						</h3>
						<div class="activity-list_left">
							<p class="activity-left-p1">
								{{activity.activityTitle}}
							</p>
							<p class="activity-left-p2">
								{{activity.dealerName}}
							</p>
							<div>
								<counter :endtime='activity.times'></counter>
							</div>
							<p v-for="tag in activity.tags" class="activity-left-p4">
								{{tag}}&nbsp;
							</p>
							<div style="clear:both"></div>
							<div class="activity-left-top">
								<p class="activity-left-top1" v-show="activity.originalPrice!=''&&activity.groupPrice!=''">
									<span>￥</span>
									<span class="chargeAfter">{{activity.groupPrice}}</span>
									<span class="charge">抵<strike>￥{{activity.originalPrice}}</strike></span>
								</p>
								
								<p class="activity-left-top2" v-show="activity.activityType!='1'">{{activity.orderQuantity}}人已抢购</p>
								<button type="button" @click.stop="GoDetail(activity)" class="buy" v-show="activity.activityState==1&&activity.activityType!=1">
									立即购买
								</button>
								<button type="button" @click.stop="GoDetail(activity)" class="check" v-show="activity.activityState==1&&activity.activityType==1">
									点击查看
								</button>
								<button type="button" class="finish" disabled="true" v-show="activity.activityState==4">已售罄</button>	
								<button type="button" class="finish" disabled="true" v-show="activity.activityState==2">已结束</button>	
							</div>
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
			<none v-show='load' :path='path' :dealerpath='dealerpath' src='../../static/images/noactivity.png' content='暂无活动'></none>
		</div>
		<failed v-show='failed'></failed>
	</div>
	
</template>
<script>
    import counter from '../../components/counter.vue'
    import none from '../../components/null.vue'
    import failed from '../../components/failed.vue'
	export default{
		components:{
			counter:counter,
			none,
			failed
		},
		data(){
			return{
				activity_end:true,				 
				page:1,
                returndata: '',
				carLines:[],
				datas:[],
				newTime:[],
				times:[],
				endTime : '',
				pageSum: '',
				progress: false,
				startY: 0,
				endY: 0,
				moveY: '',
				scrollHeight:'',
				scrollTop: '',
				clientHeight: '',
				direction: '',
				listEnd: false,
				load:false,
				failed:false,
			}
		},
		props: ['activityData','keyWord','cityId','activityService','dealerCode','carLineId','path','dealerpath'],
		mounted () {
			this.returndata = {
				"serviceName":"app.query.activityList",
	          	"timestamp":this.$global().timestamp,
	          	"serialNumber":this.$global().serialNumber,
	          	"request_data":{
	          		"page":this.page,
	          		"pageSize":"8",
	          		"activityId":"",
	          		"cityId":this.cityId,
	          		"activityType":"",
	          		"keyWord":this.keyWord,
	          		"activityService":this.activityService,
	          		"activityTagId":"",
	          		"carLineId": this.carLineId,
	          		"dealerCode": this.dealerCode
	          	}
		  	}
			this.activityListHttp();
			window.addEventListener('touchstart',this.touchStart);
	        window.addEventListener('touchmove',this.touchMove);
	        window.addEventListener('touchend',this.touchEnd);
		},
		methods:{ 
			checktime(i){  
			    if(i<10){  
			        i="0"+i;  
			    }  
			    else{i=i;}  
			    return i;  
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
	                	this.activityListHttp(); 
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
	        activityListHttp(){
	        	var _this = this;
	        	this.$axios(this.returndata).then((response) => {
	        		if(response.retCode=="0"){
						_this.progress = false;
						_this.listEnd = false;
						if(response.response_data != undefined){
							_this.load = false						
						}else{
							_this.load = true
						}
						var activitinfos = response.response_data.activitinfos;
						_this.pageSum = Math.ceil(response.response_data.totalRecords/8);
						for( var i=0;i<activitinfos.length;i++ ){	 
							var newTag = [];
							if( activitinfos[i].orderQuantity=="" ){
								activitinfos[i].orderQuantity=0;
							}
							if( activitinfos[i].tags.length>=3 ){
								for( var j=0;j<3;j++ ){
									newTag.push(activitinfos[i].tags[j]);
								}
								activitinfos[i].tags = newTag;
							}
						}
						for(var j=0;j<activitinfos.length;j++ ){	 
							var str=activitinfos[j].endTime;
	                        var arr=str.split('-');
	                        var times=arr[0]+'/'+arr[1]+'/'+arr[2];
	                        _this.times.push(times);
	                        var a = _this.times[j];
	                		_this.newTime[j] = activitinfos[j].times;
	                        _this.$set(activitinfos[j],'times',times);
						}
						_this.activityData.push(activitinfos);
	        		}else{
	        			this.failed=true;
	        		}
	        		
				});
	        },       
	        activityListHttp1(){
	        	var _this = this;
	        	_this.page = 1;
	        	_this.returndata.request_data.page = _this.page;
	        	this.$axios(this.returndata).then((response) => {
	        		_this.$emit('ievent',false);
	        		if(response.retCode=="0"){
						_this.progress = false;
						_this.listEnd = false;
						if(response.response_data != undefined){
							_this.load = false						
						}else{
							_this.load = true
						}
						var activitinfos = response.response_data.activitinfos;
						_this.pageSum = Math.ceil(response.response_data.totalRecords/8);
						for( var i=0;i<activitinfos.length;i++ ){	//	处理标签；
							var newTag = [];
							if( activitinfos[i].orderQuantity=="" ){
								activitinfos[i].orderQuantity=0;
							}
							if( activitinfos[i].tags.length>=3 ){
								for( var j=0;j<3;j++ ){
									newTag.push(activitinfos[i].tags[j]);
								}
								activitinfos[i].tags = newTag;
							}
						}
						for(var j=0;j<activitinfos.length;j++ ){	 
							var str=activitinfos[j].endTime;
	                        var arr=str.split('-');
	                        var times=arr[0]+'/'+arr[1]+'/'+arr[2];
	                        _this.times.push(times);
	                        var a = _this.times[j];
	                		_this.newTime[j] = activitinfos[j].times;
	                        _this.$set(activitinfos[j],'times',times);
						}
						_this.activityData.push(activitinfos);
	        		}else{
	        			this.failed=true;
	        		}
	        		
				});
	        },       

			activityListHttpData(keyWord = this.keyWord,cityId = this.cityId, activityService=this.activityService,dealerCode=this.dealerCode,carLineId=this.carLineId){
				this.page = "1";
				var _this = this;								
	            this.returndata = {
					"serviceName":"app.query.activityList",
		          	"timestamp":this.$global().timestamp,
		          	"serialNumber":this.$global().serialNumber,
		          	"request_data":{
		          		"page":this.page,
		          		"pageSize":"8",
		          		"activityId":"",
		          		"cityId":cityId,
		          		"activityType":"",
		          		"keyWord":keyWord,
		          		"activityService":activityService,
		          		"activityTagId":"",
		          		"carLineId": carLineId,
		          		"dealerCode": dealerCode
		          	}
			  	}
				this.$axios(this.returndata).then((response) => {
					if(response.retCode==0){
						_this.progress = false;
						_this.listEnd = false;
						if(response.response_data != undefined){
							_this.load = false						
						}else{
							_this.load = true
						}
						var activitinfos = response.response_data.activitinfos;
						_this.pageSum = Math.ceil(response.response_data.totalRecords/8);
						for( var i=0;i<activitinfos.length;i++ ){	 
							var newTag = [];
							if( activitinfos[i].orderQuantity=="" ){
								activitinfos[i].orderQuantity=0;
							}
							if( activitinfos[i].tags.length>=3 ){
								for( var j=0;j<3;j++ ){
									newTag.push(activitinfos[i].tags[j]);
								}
								activitinfos[i].tags = newTag;
							}
						}
						for(var j=0;j<activitinfos.length;j++ ){	 
							var str=activitinfos[j].endTime;
	                        var arr=str.split('-');
	                        var times=arr[0]+'/'+arr[1]+'/'+arr[2];
	                        _this.times.push(times);
	                        var a = _this.times[j];
	                		_this.newTime[j] = activitinfos[j].times;
	                        _this.$set(activitinfos[j],'times',times);
						}						
						if(activitinfos.length>0){
							_this.load = false
							_this.activityData.push(activitinfos);
						}else{
							_this.load = true
						}
					}else{
						this.failed=true;
					}
				})
			},
			GoDetail(activity){	 
				var bridge = getJsBridge();
				if( activity.activityState==1 ){
					if( activity.activityType==1 ){
						let shareInfo = '我在奥迪二手车发现一个活动，快来看看吧';
						let shareUrl = this.$global().url+"shareactivity?userId="+this.userId+"&activityId="+activity.activityId+"&cityId="+this.cityId+"&ifCollection="+activity.ifCollection;
						bridge.call("startNativeActivity",{url: this.$global().url+"activitydetail?userId="+this.userId+"&activityId="+activity.activityId+"&cityId="+this.cityId+"&ifCollection="+activity.ifCollection,shareTitle:"【活动】"+activity.activityTitle,shareInfo:shareInfo,shareImg:this.$global().shareImg,shareUrl:shareUrl,title:"-1"});
					}else if( activity.activityType==2 ){
						let shareInfo = '我在奥迪二手车发现一个团购，快来看看吧';
						let shareUrl = this.$global().url+"sharegroup?userId="+this.userId+"&activityId="+activity.activityId+"&cityId="+this.cityId+"&ifCollection="+activity.ifCollection;
						bridge.call("startNativeActivity",{url: this.$global().url+"groupdetail?userId="+this.userId+"&activityId="+activity.activityId+"&cityId="+this.cityId+"&ifCollection="+activity.ifCollection,shareTitle:"【团购】"+activity.activityTitle,shareInfo:shareInfo,shareImg:this.$global().shareImg,shareUrl:shareUrl,title:"-1"});
					}else if( activity.activityType==3 ){
						let shareInfo = '我在奥迪二手车发现一个代金券，快来看看吧';
						let shareUrl = this.$global().url+"sharechit?userId="+this.userId+"&activityId="+activity.activityId+"&cityId="+this.cityId+"&ifCollection="+activity.ifCollection;
						bridge.call("startNativeActivity",{url: this.$global().url+"chitdetail?userId="+this.userId+"&activityId="+activity.activityId+"&cityId="+this.cityId+"&ifCollection="+activity.ifCollection,shareTitle:"【代金券】"+activity.activityTitle,shareInfo:shareInfo,shareImg:this.$global().shareImg,shareUrl:shareUrl,title:"-1"});
					}
				}
				
			}
		}
	}
</script>