<template>
	<div class="collect-Box">
	  <div>
	      <div class="box1">
	    	<tab active-color="#bb0a30"  :line-width="3" custom-bar-width="1.2rem">
		       <tab-item selected @click.native="CollectskindJump($event)">车辆</tab-item>
			   <tab-item v-for="(collect,index) in collectTabs" @click.native="CollectskindJump($event)" :key="collect.id">{{collect}}</tab-item>
		    </tab>
	      </div>
	  </div>
	  <div class="AllCollects-Box">
		  <div class="Collectskind" v-show="Vehicle">
		  	<CollectCar ref="CollectCar"></CollectCar>
		  </div>
		  <div class="Collectskind" v-show="Groupbuying">
		  	<CollectgroupBy ref="CollectgroupBy"></CollectgroupBy>
		  </div>
		  <div class="Collectskind" v-show="Cashcoupon">
		  	<collectChit ref="collectChit"></collectChit>
		  </div>
		  <div class="Collectskind" v-show="Activity">
		  	<collectActivity ref="collectActivity"></collectActivity>
		  </div>
	  </div>
	</div>
</template>



<script>
import { Scroller, Tab, TabItem } from 'vux';
import CollectCar from '../our/collect-car.vue';
import CollectgroupBy from '../our/collect-group-by.vue';
import collectChit from '../our/collect-chit.vue';
import collectActivity from '../our/collect-activity.vue';
export default {
  components: {
  	Tab,
  	TabItem,
    Scroller,
    CollectCar,
    CollectgroupBy,
    collectChit,
    collectActivity
  },
  data () {
    return {
    	collectTabs:['团购','代金券','活动'],
    	Vehicle:true,							 
    	Groupbuying:false,						 
    	Cashcoupon:false,						 
    	Activity:false,							 
    	userId:'',
    }
  },
  mounted () {
    	this.userId = this.$route.query.userId;
    	this.cityId = this.$route.query.cityId;
  },
  methods: {
  	CollectskindJump(event) {
  		event = event||window.event;
		let Collectskind = event.target.innerHTML;

  		if( Collectskind=='车辆' ){
  			this.Vehicle = true;
	  		this.Groupbuying = false;
	  		this.Cashcoupon = false;
	  		this.Activity = false;
	 		this.$refs.CollectCar.collectHttpRequest();
  		}else if( Collectskind=='团购' ){
			this.Groupbuying=true;
			this.Vehicle = false;
			this.Cashcoupon = false;
			this.Activity = false;
			this.$refs.CollectgroupBy.collectHttpRequest();
		}else if( Collectskind=='代金券' ){
			this.Cashcoupon=true;
			this.Vehicle = false;
			this.Groupbuying = false;
			this.Activity = false;
			this.$refs.collectChit.collectHttpRequest();
		}else if( Collectskind=='活动' ){
			this.Activity=true;
			this.Vehicle = false;
			this.Cashcoupon = false;
			this.Groupbuying = false;
			this.$refs.collectActivity.collectHttpRequest();
		}	
	}
  }
}
</script>
