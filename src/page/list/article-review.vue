<template>
	<div class="article-review">
		<div class="car-encyclopedia-center">
    		<p>评论<span>（{{totalRecords}}）</span></p>            
    	</div>
		<div v-for="items in interact" v-show='!load'>
			<div v-for="(item,$index) in items">
				<h2>
					<img src="../../../static/images/article-review.png">
					<phone :iphone='item.userPhone'></phone>
					
					<span class="zanNumber">{{item.upVoteCount}}</span>
				    <span @click.once="toggle(item, $index,$event)" :class="['unactive',{'active':item.isUpvote}]"></span>
				</h2>
				<p>{{item.comment}}</p>
				<times :endtime='item.commentTime' style='display: inline-block;
					font-size:.22rem;
					line-height:.24rem;
					color: #AAA;
					margin-bottom:0;
					margin-top:0;'></times>
			</div>
		</div>

		<div class="shareApp" v-show="shareShow" @click="readMore">
			打开APP查看全部评论
		</div>

		<div id="progress" v-if='progress' v-show='!load'>
			<img class="carloading" src="../../../static/images/loading/loading.gif">
			<p>正在加载...</p>
		</div>
		<div id="list-end" v-if='listEnd' v-show='!load'>
			没有更多数据
		</div>
		<none v-show='load' style='border-top: 0px' src='../../static/images/what.png' content="暂无评论，快来评论吧！" :path='path'></none>	
	</div>
</template>
<script>
    import times from '../../components/times.vue'
    import phone from '../../components/phone.vue'
    import none from '../../components/null.vue'
	export default{
		components:{
			times:times,
			phone:phone,
			none
		},
		data(){
			return{
				active: false,
				interact:[],
				cgbId:'',
				page: 1,
				commentList:'',
				userId:'',
				userName:'',				//	用户手机号
				pageSum: '',
				progress: false,
				startY: 0,
				endY: 0,
				listEnd: false,
				load:false,
				scrollHeight: '',
				scrollTop: '',
				clientHeight: '',
				moveY: '',
				direction: '',
				totalRecords: '',
				shareShow: ''
			}
		},
		props:['path'],
		methods:{
			readMore(){
				location.href = this.$global().downloadApp;
			},
			toggle(item,index,event){
				if(this.path != 'sharereview'){
					event = event||window.event;
				  	var _this = this;
				  	var bridge = getJsBridge();
	            	this.userName = bridge.call("getUserName");
	            	this.commentList = {
	                	"serviceName":"app.query.commentList",
			          	"timestamp":this.$global().timestamp,
			          	"serialNumber":this.$global().serialNumber,
			          	"request_data":{
			          		"operation":'upvote',
			          		"titleId":item.commentId,
			          		"userId":this.userName
			          	}
	                }
	                if( !item.isUpvote ){
	                	if( this.userName!="-1" ){
		            		this.$set(item,'isUpvote',1);
			                this.$axios(this.commentList).then((response) => {
								_this.$set(item,'isUpvote',1);
								item.upVoteCount++;
							})
		            	}else{
		            		var bridge = getJsBridge();
		                    bridge.call("doLogin",{},function(data){
		                    	_this.userName = JSON.parse(data).userName;
		                        _this.commentList.request_data.userId = _this.userName;
		                        _this.interact = [];
		                        _this.page = 1;
		                        _this.articleReviewHttp(_this.page);
		                    });
		                }
	                }
				}else{
					location.href = this.$global().downloadApp;
				}				
            },
            articleReviewHttp(page){
            	this.page = page;
            	this.interact = []
            	var _this = this;            	
            	this.commentList = {
					"serviceName":"app.query.commentList",
		          	"timestamp":this.$global().timestamp,
		          	"serialNumber":this.$global().serialNumber,
		          	"request_data":{
		          		"userId":this.userName,
		          		"page":this.page,
		          		"clubType":'1',
		          		"operation":'query',
		          		"titleId":this.cgbId,
		          		"pageSize":8
		          	}
			  	}
				this.$axios(this.commentList).then((response) => {
					this.progress = false;
	        		this.pageSum = Math.ceil(response.response_data.totalRecords/8);
					if( response.retCode==0 ){
						_this.interact.push(response.response_data.commentListEntities);		
						_this.totalRecords = response.response_data.totalRecords;
						if( response.response_data.commentListEntities.length > 0){
		        		    this.load = false
			        	}else{
			        		this.load = true
			        	}

			        	if(this.path == 'sharereview'){
		        			if(_this.interact[0].length>=3){
		        				_this.shareShow = true;
		        				let carDetail = _this.interact[0].slice(0,3);
		        				_this.interact = []
		        				_this.interact.push(carDetail);	        				
		        			}		        			
		        		}
					}					
				})
            },

            articleReviewHttp1(page){
            	this.page = page;
            	var _this = this;            	
            	this.commentList = {
					"serviceName":"app.query.commentList",
		          	"timestamp":this.$global().timestamp,
		          	"serialNumber":this.$global().serialNumber,
		          	"request_data":{
		          		"userId":this.userName,
		          		"page":this.page,
		          		"clubType":'1',
		          		"operation":'query',
		          		"titleId":this.cgbId,
		          		"pageSize":8
		          	}
			  	}
				this.$axios(this.commentList).then((response) => {
					this.progress = false;
	        		this.pageSum = Math.ceil(response.response_data.totalRecords/8);
					if( response.retCode==0 ){
						_this.interact.push(response.response_data.commentListEntities);						
						_this.totalRecords = response.response_data.totalRecords;
						if( response.response_data.commentListEntities.length > 0){
		        		    this.load = false
			        	}else{
			        		this.load = true
			        	}

			        	if(this.path == 'sharereview'){
		        			if(_this.interact[0].length>=3){
		        				_this.shareShow = true;
		        				let carDetail = _this.interact[0].slice(0,3);
		        				_this.interact = []
		        				_this.interact.push(carDetail);	        				
		        			}		        			
		        		}
					}

					
				})
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
	            	this.page++;
	                if(this.page <= this.pageSum){
	                	this.progress=true;   
	                	this.articleReviewHttp1(this.page); 
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
	        }
		},
		mounted(){
			

		    this.userId = this.$route.query.userId;
		    this.cgbId = this.$route.query.cgbId;
		    	    
	        this.articleReviewHttp1(this.page);
	        if(this.path != 'sharereview'){
	        	var bridge = getJsBridge();
            	this.userName = bridge.call("getUserName");
            	if( this.userName=="-1" ){
	        		this.userName = "";
	        	}	
	        	window.addEventListener('touchstart',this.touchStart);
        		window.addEventListener('touchmove',this.touchMove);
        		window.addEventListener('touchend',this.touchEnd);
	        }	        
		}
	}
</script>