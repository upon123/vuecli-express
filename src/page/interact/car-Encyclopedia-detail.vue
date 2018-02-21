<template>
    <div>
        <div class="whiteBg"></div>
        <div class="car-encyclopedia-detail"  v-show='!failed'>
            <div class="car-encyclopedia-top">
                <p class="car-top-p1">{{buying.title}}</p>
                <img src="../../../static/images/aodi1.png" class="car-top-img1">
                <div class="car_top_div">
                    <p class="car-top-p2">奥迪官方认证二手车</p>
                    <times :endtime='buying.releaseTime' style="float: left;margin-left:0;margin-top:.06rem;color:#AAA"></times>  
                </div>
                 <p class="car-top-p4">{{buying.readingCount}}</p>
                <p class="car-top-p3"></p>
                <div style="clear:both"></div>
                <p class="car-top-p6" v-html='buying.content'></p>
            </div>
            <div class="bor"></div>
            <articleReview ref="articleReview" path='review'></articleReview>
            <div class="zhanwei" style="height:.81rem"></div> 
            <div class="comment" id="comment">
                <input type="text" placeholder="期待你的评论（审核后可见）" v-model='model' @keyup.13="EncyclopediaContentSubmit" class="inputtn" @focus="haha">
                <img src="../../../static/images/write.png" v-show="true">
                <div class="fasong" @click='EncyclopediaContentSubmit()' v-show="fasong">发送</div>
            </div>        
        </div>
        <failed v-show='failed'></failed>   
    </div>
    
</template>
<script>
    import articleReview from "../list/article-review.vue";
    import times from '../../components/times.vue';
    import failed from '../../components/failed.vue';
    export default{
        components:{
            times:times,
            articleReview,
            failed
        },
        data(){
            return{
              interact:[],
              buying:[],
              cgbId:'',
              model:'',
              interactData:'',
              userId:'',
              userName:'',  
              fasong:false,
              failed:false,
              pinglunShow: false,
              clearStyle: 'color:#666;',
              sendStyle: 'color:#aaa;',
              input_s:true,
              anzhuo:' ',
              show_input:' ',
              interve:'',
            }
        },
        watch:{
            model(newVal,oldVal){
                if( newVal!='' ){
                    this.fasong = true;
                }else if( newVal=='' ){
                    this.fasong = false;
                }
            }
        },
        methods:{
            scrollToEnd(){
                document.body.scrollTop = document.body.scrollHeight;
            },
            haha(){
                var _this=this;
                _this.interve=setTimeout(function() {
                    _this.scrollToEnd();
                }, 500)
            },
            inputView(event){
                event = event||window.event;
                let Collectskind = event.target
            },
            EncyclopediaContentSubmit(){       
                var _this = this;
                var bridge = getJsBridge();
                this.userName = bridge.call("getUserName");
                this.interactData = {
                    "serviceName":"app.query.commentList",
                    "timestamp":this.$global().timestamp,
                    "serialNumber":this.$global().serialNumber,
                    "request_data":{
                         "userId":this.userName,
                         "clubType":'1',
                         "operation":'comment',
                         "titleId":this.cgbId,
                         "comment":this.model
                    }
                }
                if( this.model!='' ){
                    if( this.userName!="-1" ){
                        this.$axios(this.interactData).then((response) => {
                            if( response.retCode==0 ){
                                _this.$refs.articleReview.articleReviewHttp('1');
                                bridge.call("showAlert",{msg:"评论已提交审核"})
                                _this.model = '';
                                _this.pinglunShow = false;
                            }
                        })
                    }else{
                        bridge.call("doLogin",{},function(data){
                            _this.userName = JSON.parse(data).userName;
                            _this.$refs.articleReview.articleReviewHttp('1');
                        });
                    }
                }
            }
        },
        mounted(){
            this.cgbId = this.$route.query.cgbId;
            this.userId = this.$route.query.userId;
            var _this = this;

            this.interactData = {
                "serviceName":"app.query.buyingGuideList",
                "timestamp":this.$global().timestamp,
                "serialNumber":this.$global().serialNumber,
                "request_data":{
                     "titleId":this.cgbId
                }
            }
            this.$axios(this.interactData).then((response) => {
                if( response.retCode==0 ){
                    _this.buying=response.response_data.buyingGuideListEntities[0];
                }else{
                    this.failed=true;
                }
            })
        }
    }
</script>
