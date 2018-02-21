<template>
    <div>
        <div class="audiB" @click='clickbanner'>
            <div :class="{'audiB_banner':isA,'audiB_bannerNo':isB}">
                <div class="audi_login" v-show='isA'>
                    <p class="audi_pay">{{audiBi}}<span>币</span></p>
                    <phone class="audi_phone" :iphone='userName'></phone>
                    <p class="audi_dhjl" @click='dhjla'>兑换记录</p><p class="audi_dh_left"></p>
                </div>
                <div class="audi_Nologin" v-show='isB' @click='audiDL'>
                        登录
                </div>
            </div>
            <div class="audiB_center">
                <p class="audiB_conten">
                    登录平台即可抵扣车款
                    <br>
                    请输入想要兑换的奥迪币
                </p>
                <div class="audiB_input">
                    <input type="button" value="-"  @click="subtraction()" class="audiB_left"></input>
                    <input type="text"  @Blur="number()" v-model='num'  @keyup="numb" @fterpaste="numc" class="audiB_num" v-on:input='number'></input>
                    <input type="button" value="+" id="add" @click="add()" class="audiB_right"></input>
                </div>
                <p class='dhaodi'>{{num}}奥迪币&nbsp;=&nbsp;{{num}}人民币</p>
                <input type="button" value='兑换' class="login_dh" v-show='isA' @click='exchangeCurrentyY' :style='isC'>
                <input type="button" value='兑换' class="Nologin_dh" v-show='isB'>
            </div>
            <h2 class="audi_Bhdgz"><p></p>活动规则</h2>
            <ul class="audi_Bhdgz_text">
                <li><a href="#1" title="">奥迪币领取时间：10月23日-12月31日；</a></li>
                <li><a href="#1" title="">奥迪币兑换时间：11月11日-12月31日；</a></li>
                <li><a href="#1" title="">用户每日首次登录App即可获得100奥迪币；</a></li>
                <li><a href="#1" title="">1奥迪币可兑换1元购车抵用券，单次最多兑换3000元购车抵扣券；</a></li>
                <li><a href="#1" title="">用户使用奥迪币成功兑换购车抵扣券后，将会收到短信核销码通知；</a></li>
                <li><a href="#1" title="">用户线上拍付车源订单后，可凭短信核销码可至线下经销商处核销，并直接抵扣购车款；</a></li>
                <li><a href="#1" title="">购车抵扣券不可提现、转让，有效期至2017年12月31日；</a></li>
                <li><a href="#1" title="">本次活动中兑换的购车抵用券仅限杭州地区11家奥迪授权经销商处购车使用； </a></li>
                <li><a href="#1" title="">每辆奥迪二手车App车辆订单可最多使用一张3000元购车抵扣券；</a></li>
            </ul>
            <h2 class="audi_BFAQ"><p></p>FAQ</h2>
            <img src="../../../static/images/FAQ.png" alt="" class="aodi_img">
        </div>
        <p class="audi_bottom">一汽-大众销售有限公司保留在法律允许的范围内对上述的规则进行解释的权利</p>
        <div class="modal" v-show='onoff'>
            <div class="centered">
                <i @click='off'></i>
                <h2 class="centered_h2">确定兑换购车抵扣券？</h2>
                <p class="centered_p">消耗奥迪币{{num}}个</p>
                <div class="centered_div" @click='qr'>
                    确定
                </div>
            </div>
        </div>
        <div class="modal" v-show='no_onoff'>
            <div class="centered_no">
                <h2 class="centered_h2">您的兑换额度不满3000</h2>
                <h2 class="centered_h22">确认继续？</h2>
                <p class="centered_p">一张抵扣券仅可对应一台车辆购买使用</p>
                <div class="centered_left" @click='qr'>
                    兑换&nbsp;{{num}}币
                </div>
                <div class="centered_right" @click='offf'>
                    取消
                </div>
            </div>
        </div>
        <div class="modal" v-show='qr_onoff'>
            <div class="centered_t">
                <i @click='qr_off'></i>
                <img src="../../../static/images/audi_dui.png" alt="">
                <h3 class="centered_h3">兑换成功</h3>
                <p class="centered_p">购车抵扣券核销码已发送至<br><phone :iphone='userName'></phone></p>
                <p class="centered_pp">请注意查收</p>
            </div>
        </div>
        <div class="modal" v-show='cw_onoff'>
            <div class="centered_c">
                <i @click='cw_off'></i>
                <img src="../../../static/images/audiCW.png" alt="">
                <h3 class="centered_h3">兑换错误</h3>
                <p class="centered_p">请检查网络是否正常或稍后再试</p>
            </div>
        </div>
        <div class="modal" v-show='dh_onoff'>
            <div class="centered_d">
                <i @click='dh_off'></i>
                <div class="modal_top">
                    <ul>
                        <li>兑换时间</li>
                        <li>消耗奥迪币</li>
                        <li>兑换金额</li>
                        <div class="clear"> </div>
                    </ul>
                </div>
                <div class="modal_center">
                    <ul v-for='ex in exCurrentyRecordEntities'>
                        <li class="modal_l1">{{ex.exchangeTime}}</li>
                        <li class="modal_l2">{{ex.exchangeCount}}</li>
                        <li class="modal_l3">{{ex.exchangeMoney}}</li>
                        <div class="clear"></div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import phone from '../../components/phoneAudi.vue';   
    export default{
        components: {
            phone,    
        },
        data(){
            return{
                num:0,
                isA:false,
                isB:true,
                onoff:false,
                no_onoff:false,
                qr_onoff:false,
                dh_onoff:false,
                cw_onoff:false,
                audiBi:'',
                exCurrentyRecordEntities:'',
                userId:'',
                userName:'',
                isC:'',
                endtime:'',
                times:1510329600000,
                atimes:1514649600000,
            }
        },
        created(){
            if(this.num==0){
                this.isC='background: #DDDDDD'
            }else{
                this.isC="";
            }
        },
        mounted(){
            var bridge = getJsBridge();
            var _this = this;   
            var user = bridge.call("getUserId");
            var Name = bridge.call("getUserName");
            if(user == "-1"){
                _this.isB=true;
                _this.isA=false;
                _this.userId='';
                _this.userName='';
            }else{
                _this.isB=false;
                _this.isA=true;
                _this.userId=user;
                _this.userName=Name;
                _this.queryAudi();
            }
        },
        methods: {
            clickbanner(){
                var bridge = getJsBridge();
                bridge.call("clickBackground")
            },
            audiDL(){    
                var bridge = getJsBridge();
                bridge.call("clickLogin")
                var _this = this;   
                var user = bridge.call("getUserId");
        
                if(user == "-1"){
                    bridge.call("doLogin",{},function(data){
                        _this.userId = JSON.parse(data).userId;
                        _this.userName = JSON.parse(data).userName;
                        _this.isB=false;
                        _this.isA=true;
                        _this.queryAudi();
                    })
                }else{
                    _this.isB=false;
                    _this.isA=true;
                    _this.queryAudi();
                }
            },
            numb(){  
                this.num=String(this.num)
                if(this.num.length==1){
                    this.num=this.num.replace(/[^1-9]/g,'')
                }else{
                    this.num=this.num.replace(/\D/g,'')
                }
                this.num=Number(this.num);
            },
            numc(){ 
                this.num=String(this.num)
                if(this.num.length==1){
                    this.num=this.num.replace(/[^1-9]/g,'')
                }else{
                    this.num=this.num.replace(/\D/g,'')
                }
                this.num=Number(this.num);
            },
            queryAudi(){ 
                var _this=this;
                this.custCurrenty = {
                    "serviceName":"app.query.custCurrenty",
                    "timestamp":this.$global().timestamp,
                    "serialNumber":this.$global().serialNumber,
                    "request_data":{
                        "userId":this.userId,
                    }
                }
                this.$axios(this.custCurrenty).then((response) => {
                    _this.audiBi=response.response_data.custCurrentyEntity.audiCurrenty;
                    _this.endtime=response.response_data.custCurrentyEntity.sysTime;  
                });
            },
            qr(){  
                if(navigator.onLine){
                    var _this=this;
                    this.qr_onoff=!this.qr_onoff;
                    this.no_onoff=false;
                    this.exchangeCurrenty = {
                        "serviceName":"app.subs.exchangeCurrenty",
                        "timestamp":this.$global().timestamp,
                        "serialNumber":this.$global().serialNumber,
                        "request_data":{
                            "userId":this.userId,
                            "exchangeCount":this.num,
                            "exchangeMoney":this.num,
                        }
                    }
                    this.$axios(this.exchangeCurrenty).then((response) => {
                    });
                    _this.num=0;
                    if(_this.num==0){
                        this.isC='background: #DDDDDD'
                    }
                }else{
                    this.cw_onoff=!this.cw_onoff;
                }
            },
            off(){
                var _this=this;
                _this.onoff=false;
                _this.queryAudi();
            },
            offf(){
                var _this=this;
                _this.no_onoff=false;
                _this.queryAudi();
            },
            qr_off(){  
                var _this=this;
                _this.onoff=false;
                _this.qr_onoff=false;
                _this.no_onoff=false;
                _this.queryAudi();
            },
            dh_off(){  
                this.dh_onoff=false;
                document.body.style.cssText='';
            },
            cw_off(){  
                this.cw_onoff=false;
            },
            dhjla(){  
                var bridge = getJsBridge();
                bridge.call("clickExchangeRecord")
                document.body.style.cssText='overflow: hidden;height:100%';
                if(navigator.onLine){
                    var _this=this;
                    this.dh_onoff=!this.dh_onoff;
                    this.exCurrentyRecord = {
                        "serviceName":"app.query.exCurrentyRecord",
                        "timestamp":this.$global().timestamp,
                        "serialNumber":this.$global().serialNumber,
                        "request_data":{
                            "userId":this.userId,
                        }
                    }
                    this.$axios(this.exCurrentyRecord).then((response) => {
                        _this.exCurrentyRecordEntities=response.response_data.exCurrentyRecordEntities; 
                    });
                    _this.fix='position: fixed'
                }else{
                    this.cw_onoff=!this.cw_onoff;
                }
            },
            exchangeCurrentyY(){  
                var bridge = getJsBridge();
                bridge.call("clickExchangeAudiB")
                if(navigator.onLine){
                    var _this=this;
                    _this.queryAudi();
                    if(this.endtime<this.times){
                        var bridge = getJsBridge();
                        bridge.call("showLongAlert",{msg:'11月11日正式开启兑换'})
                    }else if(this.endtime>this.atimes){
                        var bridge = getJsBridge();
                        bridge.call("showLongAlert",{msg:'活动已过期，无法兑换'})
                    }else{
                        if( _this.num==0 ){
                            _this.onoff=false;
                            _this.no_onoff=false;
                        }else if(_this.num>3000){
                            var bridge = getJsBridge();
                            bridge.call("showLongAlert",{msg:'单次兑换不能超过3000'})
                        }else if(_this.audiBi<_this.num){
                            var bridge = getJsBridge();
                            bridge.call("showLongAlert",{msg:'奥迪币不足，无法兑换'})
                        }else if(_this.num==3000){
                           _this.onoff=!_this.onoff; 
                        }else{
                            _this.no_onoff=!_this.no_onoff;
                        }
                    }
                }else{
                    this.cw_onoff=!this.cw_onoff;
                }
            },
            subtraction(){   
                var _this=this;
                this.num = parseInt(this.num);
                if (this.num<=0) {
                    this.num = 0;
                    this.isC='background: #DDDDDD'
                }else {
                    this.num = Number(this.num)- 100;
                    if(Number(_this.num)- 100<0){
                        this.num=0;
                    }
                    this.isC=''
                }
                if(this.num==0){
                    this.isC='background: #DDDDDD'
                }
            },
            number(){ 
                var _this=this;
                this.numc();
                this.num = parseInt(this.num);
                if (this.num == '') {
                    this.num= 0;
                }
                if(this.num == NaN ){
                    this.num= 0;
                }
                this.num = parseInt(this.num);
                if(this.num==0){
                    this.isC='background: #DDDDDD'
                }else{
                    this.isC=''
                }
            },
            add(){  
                var _this=this;
                this.num = parseInt(this.num);
                if (_this.num == '') {
                    _this.num= 0;
                }
                if( _this.num<3000 ){
                    if(_this.num>2900){
                        this.num = Number(this.num)+Number(3000-Number(this.num));
                    }else{
                        this.num = Number(this.num)+100;
                    }
                }else{
                    this.num = parseInt(this.num);
                }
                if(this.num==0){
                    this.isC='background: #DDDDDD'
                }else{
                    this.isC=''
                }

            },
        }
    }    
</script>