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
            <cyclopediaReview ref="cyclopediaReview" path="sharereview"></cyclopediaReview>
            <div class="zhanwei" style="height:.81rem"></div>
            <div :class="{'comment':true,'sharefooter': share}">
                <input type="text" placeholder="期待你的评论（审核后可见）" v-model='model' @keyup.13="EncyclopediaContentSubmit" @focus="haha">
                <img src="../../../static/images/write.png" v-show="true">
                <div class="fasong" @click='EncyclopediaContentSubmit()' v-show="fasong">发送</div>
            </div>  
            <shareApp @ievent = "closeshare" v-show="share"></shareApp>       
        </div>
        <failed v-show='failed'></failed>
    </div>
</template>
<script>
    import cyclopediaReview from "../list/cyclopedia-review.vue";
    import times from '../../components/times.vue'
    import phone from '../../components/phone.vue'
    import failed from '../../components/failed.vue'
    import shareApp from '../share/share-app.vue';
    export default{
        components:{
            cyclopediaReview,
            times:times,
            phone:phone,
            failed,
            shareApp            
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
              input_p:' ',
              share: true
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
            closeshare(data){
                this.share = data;
            },
            haha(){
                location.href = this.$global().downloadApp;
            },
            EncyclopediaContentSubmit(){       
                location.href = this.$global().downloadApp;
            }
        },
        created(){
            this.cpwId = this.$route.query.cpwId;            
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
                    document.title = "提车作业";
                    let shareInfo = _this.buying.content;
                    let shareUrl = _this.$global().url+"sharethecarwork?cpwId="+_this.cpwId;
                    // xxxx://xxxxx代表打开app的协议  
                    _this.$share('xxxx://xxxxx?uri='+_this.$global().url+"cycloPediaDetail?cpwId="+_this.cpwId+"&shareTitle=提车作业&shareInfo="+shareInfo+"&shareImg="+_this.$global().shareImg+"&title=提车作业"+"&shareUrl="+shareUrl)
                }else{
                    this.failed=true;
                }
            })            
        }
    }
</script>
