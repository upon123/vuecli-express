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
            <articleReview ref="articleReview" path='sharereview'></articleReview>
            <div class="zhanwei" style="height:.81rem"></div> 
            <div :class="{'comment':true,'sharefooter': share}" id="comment">
                <input type="text" placeholder="期待你的评论（审核后可见）" v-model='model' @keyup.13="EncyclopediaContentSubmit" class="inputtn" @focus="haha">
                <img src="../../../static/images/write.png" v-show="true">
                <div class="fasong" @click='EncyclopediaContentSubmit()' v-show="fasong">发送</div>
            </div>   
            <shareApp @ievent = "closeshare" v-show="share"></shareApp>     
        </div>
        <failed v-show='failed'></failed>   
    </div>
    
</template>
<script>

    import articleReview from "../list/article-review.vue";
    import times from '../../components/times.vue';
    import failed from '../../components/failed.vue';
    import shareApp from '../share/share-app.vue';
    export default{
        components:{
            times:times,
            articleReview,
            failed,
            shareApp
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
              shareTitle: '',
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
            inputView(event){
                event = event||window.event;
                let Collectskind = event.target
            },
            EncyclopediaContentSubmit(){         
                location.href = this.$global().downloadApp;
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
                    _this.shareTitle = _this.buying.title; 
                    document.title = _this.shareTitle;
                    let shareInfo = "我发现一篇文章还不错，分享给你";
                    let shareUrl = _this.$global().url+"shareEncyclopedia?cgbId="+_this.cgbId+"&userId="+_this.userId;
                    // xxxx://xxxxx代表打开app的协议  
                    _this.$share('xxxx://xxxxx?uri='+_this.$global().url+"carEncyclopediadetail?cgbId="+_this.cgbId+"&userId="+_this.userId+"&shareTitle="+_this.shareTitle+"&shareInfo="+shareInfo+"&shareImg="+_this.$global().shareImg+"&title=购车百科"+"&shareUrl="+shareUrl);
                }else{
                    this.failed=true;
                }
            })
        }
    }
</script>
