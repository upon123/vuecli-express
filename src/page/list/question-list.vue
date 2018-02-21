<template>
	<div>
		<div v-show="!failed">
			<div class="question-list" v-show="!load">
				<div v-for="ques in questions">
					<div class="question-list-top" @click="jumpArticleDetail(question)" v-for="question in ques">
						<p class="question-list-p1">{{question.question}}</p>
						<p class="question-list-p3">{{question.readingCount}}</p>
						<p class="question-list-p2"></p>
						<div style="clear:both"></div>
						<times :endtime="question.questionTime"></times>
						<p class="question-list-p4" v-if="question.answer">【 已解决 】</p>
						<p class="question-list-p4" v-else>【 待解决 】</p>
					</div>
				</div>	

				<div class="shareApp" v-show="shareShow" @click="readMore">
					打开APP查看更多相关问题
				</div>

				<div id="progress" v-if='progress' ref="loading">
					<img class="carloading" src="../../../static/images/loading/loading.gif">
					<p>正在加载...</p>
				</div>
				<div id="list-end" v-if='listEnd'>
					没有更多数据
				</div>		
			</div>
		    <none v-show='load' src='../../static/images/what.png' content='还没有问题哦！' :path='path'></none>
		</div>
		<failedques v-show='failed'></failedques>
	</div>
</template>
<script>
	import times from '../../components/times.vue'
	import none from '../../components/null.vue'
	import failedques from '../../components/failedques.vue'
	export default{
		components:{
			times,
			none,
			failedques
		},
		data(){
			return{
				interactData: '',      
				questions: [],		  
				page: 1,
				load:false,
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
				failed:false,
				shareShow:''
			}
		},
		props:['questionType','userId','path','keyWord'],
		created(){
			if(this.path == "question"){
				this.pageSize = "10"
			}else{
				this.pageSize = "5"
			}
		    this.interactData = {
	        	"serviceName":"app.query.clubQuestionList",
	            "timestamp":this.$global().timestamp,
	            "serialNumber":this.$global().serialNumber,
	            "request_data":{
	                "operation": "query",
	                "questionType": this.questionType,
	                "userId": this.userId,
	                "page": this.page,
	                "pageSize": this.pageSize,
	                "keyWord": this.keyWord
	            }
	        }
		},
		mounted(){
			if(this.path != 'sharequestion'){
				if(this.pageSize == "10"){
					window.addEventListener('touchstart',this.touchStart);
			        window.addEventListener('touchmove',this.touchMove);
			        window.addEventListener('touchend',this.touchEnd);
				}
			}
			
			this.questionListHttp(this.userId);
			
		},
		methods:{
			readMore(){
				location.href = this.$global().downloadApp;
			},
			jumpArticleDetail(question){
				if(this.path != 'sharequestion'){
					var bridge = getJsBridge();
					var title = question.questionType==1 ? "选车难题" : question.questionType==2 ? "交易过户" : question.questionType==3 ? "金融贷款" :question.questionType==4 ? "卖车相关" : question.questionType==5 ? "App相关" : "其他";
					let shareUrl = this.$global().url+"sharekeymessage?questionId="+question.questionId+"&questionType="+question.questionType;
	      			bridge.call('startNativeActivity',{url:this.$global().url+'articledetail?questionId='+question.questionId+"&questionType="+question.questionType+"&answer="+question.answer+"&title="+title,shareTitle:question.question,shareInfo:question.answer,shareImg:this.$global().shareImg,shareUrl:shareUrl, title:title});
				}else{
					location.href = this.$global().downloadApp;
				}
				
			},
			questionListHttp(userId){
				this.interactData.request_data.userId = userId;
				this.interactData.request_data.page = "1";
				this.questions = [];
		      	this.$axios(this.interactData).then((response) => {
		      		if(response.retCode == "0"){
			      		this.questions.push(response.response_data.clubQuestionEntities);
			      		this.pageSum = Math.ceil(response.response_data.totalRecords/10);
			        	this.$emit('ievent',response.response_data.totalRecords);
			        	if( response.response_data.clubQuestionEntities.length > 0){
			        		this.load = false
			        	}else{
			        		this.load = true
		        		}

		        		if(this.path == 'sharequestion'){
		        			if(this.questions[0].length>=3){
		        				this.shareShow = true;
		        				let carDetail = this.questions[0].slice(0,3);
		        				this.questions = []
		        				this.questions.push(carDetail);	        				
		        			}		        			
		        		}
		      		}else{
		      			this.failed=true;
		      		}
		      		
		      	})
			},
			questionListHttp1(){
		      	this.$axios(this.interactData).then((response) => {
		      		if(response.retCode == "0"){
			      		this.progress = false;
			      		this.questions.push(response.response_data.clubQuestionEntities);
			        	if( response.response_data.clubQuestionEntities.length > 0){
			        		this.load = false
			        	}else{
			        		this.load = true
			        	}
		      		}else{
		      			this.failed=true;
		      		}
		      		
		      	})
			},
			questionUpdata(){
				this.page = 1;
				this.interactData.request_data.page = this.page;				
		      	this.$axios(this.interactData).then((response) => {
		      		if(response.retCode == "0"){
		      			this.questions = [];
			      		this.progress = false;
			      		this.questions.push(response.response_data.clubQuestionEntities);
			        	if( response.response_data.clubQuestionEntities.length > 0){
			        		this.load = false
			        	}else{
			        		this.load = true
			        	}
		      		}else{
		      			this.failed=true;
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
	            	this.interactData.request_data.page = ++this.page;
	                if(this.page <= this.pageSum){
	                	this.progress=true;  
	                	this.questionListHttp1();  
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

		}
	}
</script>