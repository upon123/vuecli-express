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
            <img src="../../../static/images/car-friends_3.png" alt="">
            <div class="car-Encyclopedia-left">
                <p class="car-Encyclopedia-p1">提车作业</p>
                <p class="car-Encyclopedia-p3">{{sumClubPickUpReadingCount}}</p>
                <p class="car-Encyclopedia-p2"></p>
                <div style="clear:both"></div>
                <p class="car-Encyclopedia-p4">秉承交流和成长两大宗旨，车主对爱车功能、保养等方面的知识自由分享平台。</p>
                <p class="car-Encyclopedia-p5">文章：{{totalRecords}}篇</p>
            </div>
        </div>
        <div class="floating" @click="putthe"></div>
        <thecarworklist ref="thecarworklist"></thecarworklist>
    </div>
    <failed v-show='failed'></failed>   
</div>
	
</template>
<script>
	import thecarworklist from "../list/thecarworklist.vue";
    import failed from '../../components/failed.vue'
	export default{
		components:{
			thecarworklist,
            failed
		},
		data(){
			return{
				interact:[],
              	buying:[],
              	interactData:'',
              	userName:'',
              	sumClubPickUpReadingCount: '',
              	totalRecords: '',
              	progress: false,
              	progress1: false,
              	direction: '',
				startY: 0,
				moveY: '',
				endY: 0,
				scrollTop: '',
                failed:false
			}
		},
		methods:{
            putthe(){
            	var _this = this;
                var bridge = getJsBridge();
                	this.userName = bridge.call("getUserName");
					if( this.userName!="-1" ){
                        bridge.call("startNativeActivity",{url:this.$global().url+"putthecarwork?userName="+this.userName,title:"4我的提车作业"})
                    }else{
                        bridge.call("doLogin",{},function(data){
                            _this.userName = JSON.parse(data).userName;
                            bridge.call("startNativeActivity",{url:this.$global().url+"putthecarwork?userName="+this.userName,title:"4我的提车作业"})
                        });
                    }
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
	        	if(this.scrollTop <= 0 && this.direction == 'Down'){ 
	        		this.scrollTop = 0;
	        		this.direction = '';
	            	this.progress1=false;  
	                this.progress=true; 
	                this.interactHttp();
	                this.$refs.thecarworklist.interactHttp1();
	            }
	        },
	        swipeDirection(x1, x2, y1, y2) { 
	            return Math.abs(x1 - x2) >=
	            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
	        },

	        interactHttp(){
	        	this.$axios(this.interactData).then((response) => {
	        		this.progress = false;
					if(response.retCode==0){
                        this.buying=response.response_data;
                        this.sumClubPickUpReadingCount = this.buying.sumClubPickUpReadingCount;
                        this.totalRecords = this.buying.totalRecords;
					}else{
						this.failed=true
					}
				})
	        }
		},
		mounted(){
            this.interactData = {
				"serviceName":"app.query.clubPickupWork",
	          	"timestamp":this.$global().timestamp,
	          	"serialNumber":this.$global().serialNumber,
	          	"request_data":{
	          		"page": 0,
	          		"pageSize": 1,
	          		"operation":"query"
	          	}
		  	}
				
		  	this.interactHttp();
			window.addEventListener('touchstart',this.touchStart);
	        window.addEventListener('touchmove',this.touchMove);
	        window.addEventListener('touchend',this.touchEnd);
		}
	}
</script>