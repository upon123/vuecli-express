<template>
    <div>
        <div class="car-Encyclopedia" v-show = "!load">
            <div v-for="items in interact">
                <div class="car-Encyclopedia-center" @click="carEncyclopediaDetail(item)" v-for="item in items">
                    <img src="../../../static/images/head.png" alt="" class="car-Encyclopedia-img">
                    <phone :iphone='item.userPhone' style='color:#666666;font-size:.24rem;line-height:.24rem;margin-top:.1rem'></phone>
                    <div style="clear:both">
                        
                    </div>
                    <p class="car-Encyclopedia-p2">{{item.content}}</p>
                    <div class="car-center-img" >
                        <img v-lazy="image" v-for="image in item.pic.slice(0,3)" alt="">
                    </div>
                    <p class="car-Encyclopedia-p4">{{item.readingCount}}</p>
                    <p class="car-Encyclopedia-p3"></p>
                    <times :endtime="item.time" style="position:absolute;left:.23rem;bottom:.25rem;margin-left:0;"></times>
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

        <none v-show='load' :path='path' src='../../static/images/noorder.png' content='还没有文章哦！'></none>
    </div>
    
</template>
<script>
    import times from '../../components/times.vue';
    import none from '../../components/null.vue'
    import phone from '../../components/phone.vue';
    export default{
        components:{
            times:times,
            none,
            phone:phone
        },
        data(){
            return{
                interact:[],
                buying:[],
                images:[],
                page:1,
                interactData:'',
                pageSum: '',
                progress: false,
                startY: 0,
                endY: 0,
                moveY: '',
                scrollHeight:'',
                scrollTop: '',
                clientHeight: '',
                direction: '',
                listEnd: false
            }
        },
        methods:{
            carEncyclopediaDetail(item){
                let shareUrl = this.$global().url+"sharethecarwork?cpwId="+item.cpwId;
                var bridge = getJsBridge();
                bridge.call("startNativeActivity",{url:this.$global().url+"cycloPediaDetail?cpwId="+item.cpwId,shareTitle:"提车作业",shareInfo:item.content,shareImg:this.$global().shareImg,shareUrl:shareUrl, title:"提车作业"})
            },
            interactHttp(){
                this.$axios(this.interactData).then((response) => {       
                    this.progress = false;     
                    if(response.retCode==0){
                        this.pageSum = Math.ceil(response.response_data.totalRecords/8);
                        this.interact.push(response.response_data.clubPickupWorkEntities);
                        if(this.interact.length>0){
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
                    this.interact = []; 
                    if(response.retCode==0){
                        this.pageSum = Math.ceil(response.response_data.totalRecords/8);
                        this.interact.push(response.response_data.clubPickupWorkEntities);
                        if(this.interact.length>0){
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
            var _this = this;

            this.interactData = {
                "serviceName":"app.query.clubPickupWork",
                "timestamp":this.$global().timestamp,
                "serialNumber":this.$global().serialNumber,
                "request_data":{
                     "page":this.page,
                     "pageSize":"8",
                     "operation":'query'
                }
            }
            this.interactHttp();
            window.addEventListener('touchstart',this.touchStart);
            window.addEventListener('touchmove',this.touchMove);
            window.addEventListener('touchend',this.touchEnd);
        }
    }
</script>