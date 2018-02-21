<template>
	<div>
		<div class="dealer" v-show="!failed">
	     	 <div class="dealer_list_good">
	     	 	<h2>优秀经销商</h2>
	     	 	<div class="dealer-list">
					<div class="dealer-content"  v-for="(excellent, index) in excellentDealer" :key="excellent.id" @click="jumpdealerHome(index)">
						<div class="img">
							<img :src="excellent.headImgPath">
						</div>
						<h3 v-show="!excellent.rank == 0">{{excellent.rank == 4 ? "优质经销商" : excellent.rank == 3 ? "铜牌经销商" : excellent.rank == 2 ? "银牌经销商" : excellent.rank == 1 ? "金牌经销商" : ""}}</h3>
						<div class="dealer_right">
							<p class="dealer_p1">{{excellent.shopHomeNick}}</p>
							<p class="dealer_p2"><span class="test">评分：</span><star :starnum="excellent.score"></star></p>
							<p class="dealer_p3"></p>
							<p class="dealer_p4" @click.stop="jumpMaphome(index)">{{excellent.shopHomeAddress}}</p>
                           <!--   <p class="dealer_p6" ><span>服务热线 : </span> {{agcy400Tel}}</p> -->
							<p class="dealer_p5">共有&nbsp;<span>{{excellent.onSellCarCount}}</span>&nbsp辆车源售卖中</p>
						</div>
					</div>
				</div>
	     	 </div>
	     	 <div class="dealer_list_all">
	     	 	<h2>
	     	 		全部经销商
	     	 		<img src="../../../static/images/mapicon.png" @click="jumpMap">
	     	 	</h2>
	     	 	<DealerList :cityId="cityId"></DealerList>
	     	 </div>
	    </div>

	    <failed v-show='failed'></failed>
	</div>

</template>
<script>
	import DealerList from "../list/dealer-list.vue";
	import star from '../../components/star.vue';
	import failed from '../../components/failed.vue'
	export default{
		components: {
		    DealerList,
		    star,
		    failed
		},
		data(){
			return{
				cityId: '',
				cityName: '',
				goodDealer: '',
				excellentDealer: '',
				load: '',
				failed:false,
		/*		agcy400Tel: '400-806-000',*/
			}
		},
		created(){
			this.cityId = this.$route.query.cityId;
			this.cityName = this.$route.query.cityName;
		},
		mounted(){
			this.goodDealer = {
	          	"serviceName":"app.query.dealerList",
	          	"timestamp":this.$global().timestamp,
	          	"serialNumber":this.$global().serialNumber,
	          	"request_data":{
		            "page": 1,
		            "pageSize": 10,
		            "cityId": this.cityId,
		            "dealerCode": "",
		            "keyword": "",
		            "queryType": "1"
	        	}
        	}
        	this.$axios(this.goodDealer).then((response) => {
        		if(response.retCode == 0){
        			this.excellentDealer = response.response_data.dealers;
        		}else{
        			this.failed = true
        		}
        	});

		},
		methods:{
			jumpdealerHome(index){
				var bridge = getJsBridge();
				bridge.call("startNativeActivity",{url:this.$global().url+"dealerhome?dealerCode="+this.excellentDealer[index].dealerCode+"&cityId="+this.cityId,title:"1"+this.excellentDealer[index].shopHomeNick});
			},
			jumpMaphome(index){
				var bridge = getJsBridge();
				bridge.call("startNativeActivity",{url:this.$global().url+"maphome?dealerCode="+this.excellentDealer[index].dealerCode+"&cityId="+this.cityId+"&longitude="+this.excellentDealer[index].longitude+"&latitude="+this.excellentDealer[index].latitude,title:"-2"})
			},
			jumpMap(){
				var bridge = getJsBridge();
		  		bridge.call("startNativeActivity",{url: this.$global().url+"map?cityId="+this.cityId+"&cityName="+this.cityName,title:"-2"});
			}
		}
	}
</script>

