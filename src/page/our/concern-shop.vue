<template>
<div>
	<div class="concern-shop" v-show='!failed'>
		<div>
			<div class="vux-1px-t">
		      	<swipeout v-show="!load">
		        	<swipeout-item @on-close="handleEvents()" @on-open="handleEvents()" v-for="shop in collects" :key="shop.id">
		          		<div slot="right-menu">
		            		<swipeout-button @click.native="onButtonClick($event,shop)" slot="right-menu" type="#bbbbbb">取消关注</swipeout-button>
		          		</div>
		         	 	<div slot="content" class="demo-content vux-1px-t">
		          			<div class="collect-box">
		            			<div class="collect-left">
					              	<img :src="shop.headImgPath">
					            </div>
		              			<div class="collect-right">
					                <p class="collect-p1">{{shop.shopHomeNick}}</p>
					                <p class="collect-p2">已有 <span>{{shop.collectCount > 9999 ? (shop.collectCount/10000).toFixed(1) + "万" : shop.collectCount}}人</span> 关注</p>
					                <button type="button" @click="jumpDealerHome(shop)">进入店铺</button>
					            </div>
				              	<div style="clear:both"></div>		 
				          	</div>			            
				        </div>
		        	</swipeout-item>
		      	</swipeout>
		      	<none v-show='load' src='../../static/images/nono.png' content='暂无关注！' shop='shopp' jump="shop"></none>
		    </div>

		</div>
	</div>
	<failed v-show='failed'></failed>
</div>
	
</template>
<script>
	import { Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux';
	import none from '../../components/null.vue'
	import failed from '../../components/failed.vue'
	export default {
		components: {
			Swipeout,
			SwipeoutItem,
			SwipeoutButton,
			XButton,
			none,
			failed
		},
		data(){
			return{
				collectData: '',
      			collects: [],
      			page: 1,
      			userId:'',
      			cityId:'',
      			load:false,
      			failed:false
			}
		},
		mounted: function() {
			this.userId = this.$route.query.userId;
			this.cityId = this.$route.query.cityId;

			this.collectData = {
			    "serviceName":"app.subs.collectList",
			    "timestamp":this.$global().timestamp,
			    "serialNumber":this.$global().serialNumber,
			    "request_data":{
			        "page": "",
			        "pageSize": "",
			        "userId": this.userId,
			        "goodType": "3",
			        "goodId": ""
			    }
			}
			this.collectHttpRequest();    
		},
		methods: {
			onButtonClick (event,shop) {
				var delData = {
			        "serviceName":"app.subs.collect",
			        "timestamp":this.$global().timestamp,
			        "serialNumber":this.$global().serialNumber,
			        "request_data":{
			          "goodId": shop.dealerCode,
			          "goodType": "3",
			          "userId": this.userId,
			          "oprType": "del"
			        }
			    }
			    this.$axios(delData).then((response) => {
			        this.collectHttpRequest();
			    })
			},
			handleEvents () {

			},
			jumpDealerHome(shop){
				var bridge = getJsBridge();
				bridge.call('startNativeActivity',{url:this.$global().url+"dealerhome?dealerCode="+shop.dealerCode+"&cityId="+shop.cityId,title: "1"+shop.shopHomeNick})
			},
			collectHttpRequest(){
				var _this = this;
			    this.$axios(this.collectData).then((response) => {
			        if( response.retCode=="0" ){
			        	if(response.response_data.dealerInfoEntities.length>0){
						    _this.load = false						
						}else{
							_this.load = true
						}
			        	_this.collects = response.response_data.dealerInfoEntities;		
			        }else{
			        	this.failed=true;
			        }
			    });
		    }
		}
	}
</script>