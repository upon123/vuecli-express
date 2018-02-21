<template>
<div>
	<div class="dealer-list">
		<div id="progress" v-if='progress2' ref="loading">
			<img class="carloading" src="../../../static/images/loading/loading.gif">
			<p>正在刷新...</p>
		</div>

		<div id="progress" v-if='progress1' ref="loading">
			<img class="carloading" src="../../../static/images/loading/loading.gif">
			<p>松手刷新</p>
		</div>

		<div v-for="dealers in dealers">
			<div class="dealer-content" v-for="(dealer,index) in dealers" :key="dealer.id"  @click="jumpdealerHome(dealer)">
				<div class="img">
					<img :src="dealer.headImgPath">
				</div>
				<h3 v-show="!dealer.rank == 0">{{dealer.rank == 4 ? "优质经销商" : dealer.rank == 3 ? "铜牌经销商" : dealer.rank == 2 ? "银牌经销商" : dealer.rank == 1 ? "金牌经销商" : ""}}</h3>
				<div class="dealer_right">
					<p class="dealer_p1">{{dealer.shopHomeNick}}</p>
					<p class="dealer_p2"><span class="test">评分：</span><star :starnum="dealer.score"></star></p>
					<p class="dealer_p3"></p>
					<p class="dealer_p4"  @click.stop="jumpMaphome(dealer)">{{dealer.shopHomeAddress}}</p>
      <!--               <p class="dealer_p6" ><span>服务热线 : </span> {{agcy400Tel}}</p> -->
					<p class="dealer_p5">共有&nbsp;<span>{{dealer.onSellCarCount}}</span>&nbsp;辆车源售卖中</p>
				</div>
			</div>
		</div>

		<div id="progress" v-if='progress' ref="loading">
			<img class="carloading" src="../../../static/images/loading/loading.gif">
			<p>正在加载...</p>
		</div>
		<div id="list-end" v-if='listEnd'>
			没有更多数据
		</div>
	</div>
</div>
</template>
<script>
	import star from '../../components/star.vue';
	export default{
		components: {
		    star
		},
		data(){
			return{
				dealersData: '',
				dealers: [],
				page: 1,
				pageSum: '',
				progress: false,
				progress1: false,
				progress2: false,
				startY: 0,
				endY: 0,
				moveY: '',
				listEnd: false,
				scrollTop: '',
				direction: '',
				clientHeight: '',
				scrollHeight: '',
			/*	agcy400Tel:'400-806-000'*/
			}
		},
		props:['cityId'],
		mounted(){
			this.dealersData = {
				"serviceName":"app.query.dealerList",
	          	"timestamp":this.$global().timestamp,
	          	"serialNumber":this.$global().serialNumber,
	          	"request_data":{
		            "page": this.page,
		            "pageSize": 10,
		            "cityId": this.cityId,
		            "dealerCode": "",
		            "keyword": "",
		            "queryType": ""
	        	}
			}
			this.getDealerList();
			window.addEventListener('touchstart',this.touchStart);
	        window.addEventListener('touchmove',this.touchMove);
	        window.addEventListener('touchend',this.touchEnd);
	    },
		methods:{
			jumpdealerHome(dealer){
				var bridge = getJsBridge();
				bridge.call("startNativeActivity",{url:this.$global().url+"dealerhome?dealerCode="+dealer.dealerCode+"&cityId="+this.cityId,title:"1"+dealer.shopHomeNick});
			},
			jumpMaphome(dealer){
				var bridge = getJsBridge();
				bridge.call("startNativeActivity",{url:this.$global().url+"maphome?dealerCode="+dealer.dealerCode+"&cityId="+this.cityId+"&longitude="+dealer.longitude+"&latitude="+dealer.latitude,title:"-2"})
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
	            	this.dealersData.request_data.page = ++this.page;
	                if(this.page <= this.pageSum){
	                	this.progress=true;
	                	this.getDealerList();
	                }else{
	                	this.listEnd = true;
	                }
	            } else if(this.scrollTop == 0 && this.direction == 'Down'){
	            	this.progress1 = true;
	                this.progress2 = false;
	            }
	        },
	        touchEnd(){
	        	if(this.listEnd == true){
	            	this.listEnd = false;
	            	this.progress1=false;
	                this.progress2=false;
	            } else if(this.progress1 == true){
	            	this.progress1=false;
	                this.progress2=true;
                	this.getDealerList1();
	            }
	        },
	        swipeDirection(x1, x2, y1, y2) {
	            return Math.abs(x1 - x2) >=
	            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
	        },


	        getDealerList(){
	        	this.$axios(this.dealersData).then((response) => {
	        		this.progress = false;
	        		if(response.retCode == "0"){
	        			this.pageSum = Math.ceil(response.response_data.totalRecords/10);
		        		this.dealers.push(response.response_data.dealers);
	        		}

	        	})
	        },

	        getDealerList1(){
	        	this.page = 1;
        		this.dealersData.request_data.page = this.page;
	        	this.$axios(this.dealersData).then((response) => {
	        		this.progress2 = false;
	        		this.dealers = [];
	        		if(response.retCode == "0"){
	        			this.pageSum = Math.ceil(response.response_data.totalRecords/10);
		        		this.dealers.push(response.response_data.dealers);
	        		}
	        	})
	        }
		}
	}
</script>
