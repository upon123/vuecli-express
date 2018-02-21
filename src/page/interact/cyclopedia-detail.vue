<template>
    <div>
        <div class="whiteBg"></div>
        <div class="cyclopedia-detail" v-show='!failed'>
            <div class="car-encyclopedia-top">
                <img src="../../../static/images/head.png" class="car-top-img1">
                <div class="car-top-ddv">
                    <phone :iphone='iphone' style='
                        font-size: .28rem;
                        line-height: .28rem;
                        color: #333;
                        margin-left:0px;
                        position:inherit'></phone>
                    <times :endtime='buying.time' style="float: none;margin-left:0;margin-top:0.03rem;color:#AAA"></times>
                </div>
                
                <p class="car-top-p4">{{buying.readingCount}}</p>
                <p class="car-top-p3"></p>
                
                <div style="clear:both"></div>
                <p class="car-top-p6" v-html='buying.content'></p>
                <div class="car-center-img1" >
                    <img v-lazy="image" v-for="image in buying.pic" alt="">
                </div>
            </div>
            <cyclopediaReview ref="cyclopediaReview" path="review"></cyclopediaReview>
            <div class="zhanwei" style="height:.81rem"></div>
            <div class="comment">
                <input type="text" placeholder="期待你的评论（审核后可见）" v-model='model' @keyup.13="EncyclopediaContentSubmit" @focus="haha">
                <img src="../../../static/images/write.png" v-show="true">
                <div class="fasong" @click='EncyclopediaContentSubmit()' v-show="fasong">发送</div>
            </div>        
        </div>
        <failed v-show='failed'></failed>
    </div>
    
</template>
<script>
    import cyclopediaReview from "../list/cyclopedia-review.vue";
    import times from '../../components/times.vue'
    import phone from '../../components/phone.vue'
    import failed from '../../components/failed.vue'
    export default{
        components:{
            cyclopediaReview,
            times:times,
            phone:phone,
            failed
        },
        data(){
            return{
              interact:[],
              buying:[],
              cpwId:'',
              model:'',
              interactData:'',
              userId:'',
              userName:'',   
              iphone:' ',
              fasong:false,
              failed:false,
              input_p:' '
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
                        "clubType":'2',
                        "operation":'comment',
                        "titleId":this.cpwId,
                        "comment":this.model
                    }
                }
                if( this.model!='' ){
                    if( this.userName!="-1" ){
                        this.$axios(this.interactData).then((response) => {
                            if( response.retCode==0 ){
                                _this.$refs.cyclopediaReview.articleReviewHttp('1');
                                bridge.call("showAlert",{msg:"评论已提交审核"})
                                _this.model = '';
                            }
                        })
                    }else{
                        bridge.call("doLogin",{},function(data){
                            _this.userName = JSON.parse(data).userName;
                            _this.$refs.cyclopediaReview.articleReviewHttp('1');
                        });
                    }
                }
            }
        },
        mounted(){
            this.cpwId = this.$route.query.cpwId;
            this.userId = this.$route.query.userId;
            var _this = this;
            
            this.interactData = {
                "serviceName":"app.query.clubPickupWork",
                "timestamp":this.$global().timestamp,
                "serialNumber":this.$global().serialNumber,
                "request_data":{
                    "cpwId":this.cpwId,
                    "operation":"query",
                    "page":0,
                    "pageSize":1
                }
            }
            this.$axios(this.interactData).then((response) => {
                if( response.retCode==0 ){
                    _this.buying=response.response_data.clubPickupWorkEntities[0];
                    _this.iphone=response.response_data.clubPickupWorkEntities[0].userPhone;
                }else{
                    this.failed=true;
                }
            })
        }
    }
</script>
