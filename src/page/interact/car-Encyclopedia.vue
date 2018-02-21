<template>
<div>
	<div class="car-Encyclopedia" v-show='!failed'>
		<div id="progress" v-if='progress' ref="loading">
			<img class="carloading" src="../../../static/images/loading/loading.gif">
			<p>正在刷新...</p>
		</div>

		<div id="progress" v-if='progress1' ref="loading">
			<img class="carloading" src="../../../static/images/loading/loading.gif">
			<p>松手刷新</p>
		</div>

		<div class="car-Encyclopedia-top">
			<img src="../../../static/images/buycar.png">
			<div class="car-Encyclopedia-left">
				<p class="car-Encyclopedia-p1">购车百科</p>
				<p class="car-Encyclopedia-p3">{{interact.sumReadingCount}}</p>
				<p class="car-Encyclopedia-p2"></p>
				<div style="clear:both"></div>
				<p class="car-Encyclopedia-p4">为车主提供第一手优质、全面、专业的汽车百科，足不出户了解购车资讯。</p>
				<p class="car-Encyclopedia-p5">文章：{{interact.totalRecords}}篇</p>
			</div>
		</div>
		<CarEncyclopedialist ref="CarEncyclopedialist"></CarEncyclopedialist>
	</div>
	<failed v-show='failed'></failed>	
</div>
	
</template>
<script>
	import CarEncyclopedialist from "../list/car-Encyclopedia-list.vue";
	import failed from '../../components/failed.vue'
	export default{
		components:{
			CarEncyclopedialist,
			failed
		},
		data(){
			return{
              	interact:[],
              	buying:[],
             	userId:'',
              	progress: false,
              	progress1: false,
              	direction: '',
				startY: 0,
				moveY: '',
				endY: 0,
				scrollTop: '',
              	interactData:'',
              	failed:false
			}
		},
		methods:{
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
	        	if(this.scrollTop <= 0 && this.direction == 'Down'){	 
	        		this.scrollTop = 0;
	        		this.direction = '';
	            	this.progress1=false;  
	                this.progress=true;  
	                this.interactHttp();
	                this.$refs.CarEncyclopedialist.interactHttp1();
	            }
	        },
	        swipeDirection(x1, x2, y1, y2) {   
	            return Math.abs(x1 - x2) >=
	            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
	        },

	        interactHttp(){
	        	this.$axios(this.interactData).then((response) => {
	        		this.progress = false;
					if( response.retCode==0 ){
						this.interact=response.response_data;
						this.buying=response.response_data.buyingGuideListEntities;
					}else{
						this.failed=true;
					}
				})
	        }
		},
		mounted(){
		    this.userId = this.$route.query.userId;

	        this.interactData = {
				"serviceName":"app.query.buyingGuideList",
	          	"timestamp":this.$global().timestamp,
	          	"serialNumber":this.$global().serialNumber,
	          	"request_data":{
	          		"page":0,
	          		"pageSize":1
	          	}
		  	}
			
		  	this.interactHttp()
			window.addEventListener('touchstart',this.touchStart);
	        window.addEventListener('touchmove',this.touchMove);
	        window.addEventListener('touchend',this.touchEnd);
		}
	}
</script>