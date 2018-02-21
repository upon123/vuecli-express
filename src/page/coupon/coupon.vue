<template>
	<div class="couponBox">
		<div class="tabBox">
			<tab active-color="#bb0a30" custom-bar-width="1.57rem">
		      <tab-item selected @click.native="CouponskindJump($event)">全部</tab-item>
		      <tab-item @click.native="CouponskindJump($event)">平台优惠券</tab-item>
		      <tab-item @click.native="CouponskindJump($event)">店铺优惠券</tab-item>
		    </tab>
		</div>
		<div class="AllCoupons-Box" v-show='!failed'>
			<div class="Couponskind" v-show="CouponsAll">
				<div v-show='!load'>
					<div class="shorecoupon" v-for="dealer in dealers">
						<div :class="[coupons.userCouponCardState==4?shoree:coupons.userCouponCardState==3?shoreee:coupons.userCouponCardState==1?shore1:shore111]" v-for="(coupons,index) in dealer" :key="coupons.id" @click="jumpDealerHome(coupons)">
							<p class="small"></p>
							<p class="shore-p1">{{coupons.cash}}<span>元</span></p>
							<p class="shore-p2-top"  v-if="coupons.conditionPrice == '-1'">无门槛减{{coupons.cash}}元</p>
							<p class="shore-p2-top" v-else>满{{coupons.conditionPrice}}元可用</p>
							<p class="shore-p2">有效期:{{coupons.effectiveEndTime}}</p>
							<p class="shore-p2">支持车系:<span v-for="cars in coupons.conditionCarLine">{{cars}}丶</span></p>
	                        <div class="shore-div">
	                           <P class="shore-p3">{{coupons.userCouponCardState == 4 ? "已过期" : coupons.userCouponCardState == 3 ? "已使用" : coupons.userCouponCardState == 1 ? "进入店铺" : "已失效"}}</P>
	                        </div>
							<p class="shore-p4">{{coupons.dealerName}}</p>
						</div>
					</div>
					<div id="progress" v-if='progress'>
						<img class="carloading" src="../../../static/images/loading/loading.gif">
						<p>正在加载...</p>
					</div>
					<div id="list-end" v-if='listEnd'>
						没有更多数据
					</div>
				</div>
				
                <none v-show='load' src='../../static/images/noactivity.png' content='暂无优惠券！' style='min-height:12.5rem'></none>
			</div>
			<div class="Couponskind" v-show="Platformcoupons">
				<div class="Couponskind">
				</div>
                <none v-show='loadd' src='../../static/images/noactivity.png' content='暂无优惠券！'  style='min-height:12.5rem'></none>
			</div>
			<div class="Couponskind" v-show="Storecoupon">
				<div v-show='!load'>
					<div class="shorecoupon" v-for="dealer in dealers">
						<div :class="[coupons.userCouponCardState==4?shoree:coupons.userCouponCardState==3?shoreee:coupons.userCouponCardState==1?shore1:shore111]" v-for="(coupons,index) in dealer" :key="coupons.id" @click="jumpDealerHome(coupons)">
							<p class="small"></p>
							<p class="shore-p1">{{coupons.cash}}<span>元</span></p>
							<p class="shore-p2-top"  v-if="coupons.conditionPrice == '-1'">无门槛减{{coupons.cash}}元</p>
							<p class="shore-p2-top" v-else>满{{coupons.conditionPrice}}元可用</p>
							<p class="shore-p2">有效期:{{coupons.effectiveEndTime}}</p>
							<p class="shore-p2">支持车系:<span v-for="cars in coupons.conditionCarLine">{{cars}}丶</span></p>
	                        <div class="shore-div">
	                           <P class="shore-p3">{{coupons.userCouponCardState == 4 ? "已过期" : coupons.userCouponCardState == 3 ? "已使用" : coupons.userCouponCardState == 1 ? "进入店铺" : "已结束"}}</P>
	                        </div>
							<p class="shore-p4">{{coupons.dealerName}}</p>
						</div>
					</div>
					<div id="progress" v-if='progress'>
						<img class="carloading" src="../../../static/images/loading/loading.gif">
						<p>正在加载...</p>
					</div>
					<div id="list-end" v-if='listEnd'>
						没有更多数据
					</div>
				</div>
                <none v-show='load' src='../../static/images/noactivity.png' content='暂无优惠券！'  style='min-height:12.5rem'></none>
			</div>
		</div>
        <failed v-show='failed'></failed>	
	</div>
</template>

<script>

import { Tab, TabItem } from 'vux';
import none from '../../components/null.vue'
import failed from '../../components/failed.vue'
export default {
	components: {
		Tab,
    	TabItem,
        none,
        failed
	},
	data () {
	    return {
	    	userId: '',
	    	cityId: '',
			CouponsAll:true,	 
			Platformcoupons:false,	 
			Storecoupon:false,	 
			dealersData: '',
			dealers: [],
			userCouponCardState: [],
			shoree:'shoree',			 
			shoreee:'shoreee',			 
			shore1:'shore1',			 
            shore111:'shore111',        
			pageSum: '',
			page: 1,
			progress: false,
			startY: 0,
			endY: 0,
			listEnd: false,
            load:false,
            loadd:true,
            noclick:'',
            failed:false
	    }
    },
	methods:{
		CouponskindJump(event) {
			event = event||window.event;
			let Couponskind = event.target.innerHTML;
			if( Couponskind=='全部' ){
				this.CouponsAll = true;
				this.Platformcoupons = false;
				this.Storecoupon = false;
			}else if( Couponskind=='平台优惠券' ){
				this.Platformcoupons = true;
				this.CouponsAll = false;
				this.Storecoupon = false;
			}else if( Couponskind=='店铺优惠券' ){
				this.Storecoupon = true;
				this.CouponsAll = false;
				this.Platformcoupons = false;
			}
		},
		activityDetailsData(){         
			this.$axios(this.dealersData).then((response) => {
                if(response.retCode == "0"){
                    this.progress = false;
                    if( response.response_data.totalRecords != undefined){
                        this.load = false
                    }else{
                        this.load = true
                    }
                    this.pageSum = Math.ceil(response.response_data.totalRecords/10);
                    this.dealers.push(response.response_data.canUseCouponListEntities);
                    var canUseCouponListEntities=response.response_data.canUseCouponListEntities;
                }else{
                    this.failed=true
                }
                
			})
		},
		jumpDealerHome(coupons){
			var bridge = getJsBridge();
            if( coupons.userCouponCardState!="3" ){
                bridge.call("startNativeActivity",{url:this.$global().url+"dealerhome?dealerCode="+coupons.dealerCode+"&cityId="+this.cityId,title:"1"+coupons.dealerName});
            }
		},
		touchStart(){
			let evt = event||window.event;
            this.startY=evt.targetTouches[0].pageY;
        },
        touchMove(){
            if(this.progress) return;  
            let evt = event||window.event;
            let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight; 
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop; 
            let clientHeight = document.documentElement.clientHeight||document.body.clientHeight; 
            
            this.moveY = evt.targetTouches[0].pageY;
            let direction =this.swipeDirection(0,0,this.startY,this.moveY);
            if(scrollTop+clientHeight+30>=scrollHeight && direction == 'Up'){	 
            	this.dealersData.request_data.page = ++this.page;
                if(this.page <= this.pageSum){
                	this.progress=true;   
                	this.activityDetailsData();  
                }else{
                	this.listEnd = true;  
                }	                
            } else if(scrollTop == 0 && direction == 'Down'){ 
                
            }
        },
        touchEnd(){

        },
        swipeDirection(x1, x2, y1, y2) {    
            return Math.abs(x1 - x2) >=
            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
        }
	},
	mounted: function() {
		this.userId = this.$route.query.userId;
		this.cityId = this.$route.query.cityId;
		this.dealersData = {
			"serviceName":"app.query.couponList",
          	"timestamp":this.$global().timestamp,
          	"serialNumber":this.$global().serialNumber,
          	"request_data":{
          		"userId": this.userId,
          		"page": 1,
          		"pageSize": "10"
          	}
	  	}
	    this.activityDetailsData();
	    window.addEventListener('touchstart',this.touchStart);
        window.addEventListener('touchmove',this.touchMove);
        window.addEventListener('touchend',this.touchEnd);
	}
}
</script>