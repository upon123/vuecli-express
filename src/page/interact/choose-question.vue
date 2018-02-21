<template>
	<div class="choose-question">
		<div class="whiteBg"></div>   

        <div id="progress" v-if='progress'>
          	<img class="carloading" src="../../../static/images/loading/loading.gif">
          	<p>正在刷新...</p>
        </div>

        <div id="progress" v-if='progress1'>
          	<img class="carloading" src="../../../static/images/loading/loading.gif">
          	<p>松手刷新</p>
        </div>

		<p class="questionSum">共{{questionSum}}条相关问题</p>
		<questionList ref="question" @ievent = "ievent" :questionType="questionType" path="question"></questionList>
	</div>
</template>
<script>
	import questionList from "../list/question-list.vue";
	export default{
		components:{
			questionList
		},
		data(){
			return{
				questionSum: '',
				questionType: '',
				startY: 0,
		      	endY: 0,
		      	moveY: '',
		      	scrollHeight:'',
		      	scrollTop: '',
		      	clientHeight: '',
		      	direction: '',
		      	progress: false,
		      	progress1: false
			}
		},
		created(){
			this.questionType = this.$route.query.questionType
		},
		mounted(){
			window.addEventListener('touchstart',this.touchStart);
		    window.addEventListener('touchmove',this.touchMove);
		    window.addEventListener('touchend',this.touchEnd);
		},
		methods: {
			ievent(data){
				this.questionSum = data;
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
		      	if(this.scrollTop == 0 && this.direction == 'Down'){        
		        	this.progress1=true;  
		      	}
		    },
		    touchEnd(){
		      	if(this.scrollTop <= 0 && this.direction == 'Down'){
			        this.direction = '';
			        this.progress1 = false;
			        this.progress = true;
			        var _this = this;
			        this.$refs.question.questionUpdata();
			        setTimeout(function(){
			            _this.progress = false;
			        },1000);
			    }
		    },
		    swipeDirection(x1, x2, y1, y2) {    
		       	return Math.abs(x1 - x2) >=
		       	Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
		    }
		}
	}
</script>