<template>
	<div>
		<div class="car-Encyclopedia" v-show="!load">
			<div v-for="buying in buying">
				<div class="car-Encyclopedia-center" @click="carEncyclopediaDetail(ency)" v-for="ency in buying">
					<img src="../../../static/images/aodi.png" alt="" class="car-Encyclopedia-img">
					<p class="car-Encyclopedia-p1">奥迪官方认证二手车</p>
					<div style="clear:both">
						
					</div>
					<p class="car-Encyclopedia-p2">{{ency.title}}</p>
					<div class="car-center-img" >
						<img v-lazy="imgs.smallImagePath" v-for="imgs in images" alt="">
					</div>
					<p class="car-Encyclopedia-p4">{{ency.readingCount}}</p>
					<p class="car-Encyclopedia-p3"></p>
					<times :endtime='ency.releaseTime' style='position:absolute;left: .23rem;bottom: .25rem; margin-left:0px'></times>
				</div>
			</div>
             <div style="clear:both">
             </div>
			<div id="progress" v-if='progress' ref="loading">
				<img class="carloading" src="../../../static/images/loading/loading.gif">
				<p>正在加载...</p>
			</div>
			<div id="list-end" v-if='listEnd'>
				没有更多数据
			</div>
		</div>	

		<none v-show='load' :path='path' src='../../static/images/noorder.png' content='小编正在埋头编写！'></none>
	</div>	
</template>
<script>
    import none from '../../components/null.vue'
    import times from '../../components/times.vue'
	export default{
		components:{
			none,
			times:times
		},
		data(){
			return{
              	interact:[],
              	buying:[],
              	images:[],
              	page:1,
              	interactData:'',
              	userId:'',
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
				load: ''
			}
		},
		methods:{
			carEncyclopediaDetail(ency){
				let shareUrl = this.$global().url+"shareEncyclopedia?cgbId="+ency.cgbId+"&userId="+this.userId;
				var bridge = getJsBridge();
				bridge.call("startNativeActivity",{url:this.$global().url+"carEncyclopediadetail?cgbId="+ency.cgbId+"&userId="+this.userId,shareTitle:ency.title,shareInfo:'我发现一篇文章还不错，分享给你',shareImg:this.$global().shareImg,shareUrl:shareUrl.replace(/\s/g,'&nbsp;'), title:"购车百科"})
			},
			interactHttp(){
				this.$axios(this.interactData).then((response) => {
					this.progress = false;
					if( response.retCode==0 ){
						this.interact=response.response_data;
						this.pageSum = Math.ceil(response.response_data.totalRecords/8);
						this.buying.push(response.response_data.buyingGuideListEntities);
						if(this.buying.length>0){
							this.load = false
						}else{
							this.load = true
						}
					}	
				})
			},
			interactHttp1(){
				this.page = 1;
				this.interactData.request_data.page = this.page;				
				this.$axios(this.interactData).then((response) => {
					this.buying = [];
					if( response.retCode==0 ){
						this.interact=response.response_data;
						this.pageSum = Math.ceil(response.response_data.totalRecords/8);
						this.buying.push(response.response_data.buyingGuideListEntities);
						if(this.buying.length>0){
							this.load = false
						}else{
							this.load = true
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
	            	this.interactData.request_data.page = ++this.page;
	                if(this.page <= this.pageSum){
	                	this.progress=true;  
	                	this.interactHttp(); 
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
            var _this = this;

            this.interactData = {
				"serviceName":"app.query.buyingGuideList",
	          	"timestamp":this.$global().timestamp,
	          	"serialNumber":this.$global().serialNumber,
	          	"request_data":{
	          		 "page":this.page,
	          		 "pageSize":8
	          	}
		  	}
		  	this.interactHttp()
		  	window.addEventListener('touchstart',this.touchStart);
	        window.addEventListener('touchmove',this.touchMove);
	        window.addEventListener('touchend',this.touchEnd);
		}
	}
</script>