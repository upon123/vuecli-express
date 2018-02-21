<template>
    <div class="findcar">
        <ul>
            <li class="findcarL">
               <div class="findcarList">
                    <p class="find">姓名：</p>
                    <input type="text"  placeholder="请输入您的姓名" v-model="username" maxlength="10"/>
               </div>
            </li>
            <li class="findcarL">
                <div class="findcarList">
                    <p class="find">手机号：</p>
                    <input type="number"  placeholder="请输入您手机号" v-model="phoneText"/>
                </div>
            </li>
            <li class="findcarL">
                <div class="findcarList">
                    <p class="find">意向车型：</p>
                    <input type="text"  placeholder="例如：奥迪A6L" v-model="carText" maxlength="10"/>
                </div>
            </li>
            <div class="clear"></div>
            <li class="findcarM">
               <div class="findcarList">
                    <p class="find">价格</p><i :class="{ 'bottom_slices': isA, 'top_slices': isB}"></i @click='money_text'>
                    <p :class="{ 'find_money': black, 'find_mone': red}" @click='money_text'>{{displacement_Text}}</p>
                </div>
                <div class="clear"></div>
                <div class="expertRangeBox" v-if='money'>
                    <group>
                      <div class="range_rl">
                        <div class="rangeleft">
                          <cell primary="content">
                            <range v-model="displacement_Less" :min="0" :max="100" :step="step" :range-bar-height="2.4" @touchmove.native="DisplacementLeftstep($event)">
                            </range>
                          </cell>
                        </div>
                        <div class="rangeright">
                          <cell primary="content">
                            <range v-model="displacement_More" :min="0" :max="100" :step="step" :range-bar-height="2.4" @touchmove.native="DisplacementRightstep($event)">
                            </range>
                          </cell>
                        </div>
                      </div>
                    </group>
                    <ul class="displacementRange">
                        <li class="rangeul_A">0</li>
                        <li class="rangeul_B">10</li>
                        <li class="rangeul_C">20</li>
                        <li class="rangeul_D">30</li>
                        <li class="rangeul_E">40</li>
                        <li class="rangeul_F">不限</li>
                    </ul>    
                </div>

            </li>
            <li class="findcarM">
                <div class="findcarList">
                    <p class="find">行驶里程</p><i :class="{ 'bottom_slices': isC, 'top_slices': isD}" @click='mileage_list'></i>
                    <p :class="{ 'find_money': Mblack, 'find_mone': Mred}" @click='mileage_list'>{{mileage_Text}}</p>
                </div>
                <div class="clear"></div>
                <div class="expertRangeBox" v-if='mileageL'>
                    <group>
                      <div class="range_rl">
                        <div class="rangeleft">
                          <cell primary="content">
                            <range v-model="mileage_Less" :min="0" :max="32" :step="step" :range-bar-height="2" @touchmove.native="MileageLeftstep($event)">
                            </range>
                          </cell>
                        </div>
                        <div class="rangeright">
                          <cell primary="content">
                            <range v-model="mileage_More" :min="0" :max="32" :step="step" :range-bar-height="2" @touchmove.native="MileageRightstep($event)">
                            </range>
                          </cell>
                        </div>
                      </div>
                    </group>
                    <ul class="mileageRange">
                        <li class="rangeul_A">0</li>
                        <li class="rangeul_B">3</li>
                        <li class="rangeul_C">6</li>
                        <li class="rangeul_D">9</li>
                        <li class="rangeul_E">12</li>
                        <li class="rangeul_F">不限</li>
                    </ul>    
                </div>
            </li>
        </ul>
        <div  class="bwzc" @click="find($event)">
            <p>
                帮我找车
            </p>
        </div>
        
    </div>
</template>
<script>
    import { XButton, Range, GroupTitle, Group, Cell } from 'vux';
    const phone = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;  
    export default {
        components: {
            Range,
            Group,
            GroupTitle,
            Cell,
            XButton
        },
        props:["cityId"],
        data () {
            return{
                mileage_Text:'不限里程',           
                step:2,                         
                mileage_Less:0,                  
                mileage_More:32,                
                mileAge:'',                     
                carAir:'',                      
                displacement_Text:'不限价格',    
                displacement_Less:0,             
                displacement_More:100,           
                isA:true,
                isB:false,
                isC:true,
                isD:false,
                money:false,
                mileageL:false,
                black:true,
                red:false,
                Mblack:true,
                Mred:false,
                username:'',
                name: '',
                phoneText:'',
                carText:'',
                Alert:['姓名不能为空','联系电话不能为空','手机号格式错误','意向车型不能为空'],
            }
        },        
        methods:{
            find(event){
                event = event||window.event;
                this.name = this.username.replace(/\s/g,'');
                var bridge = getJsBridge();
                 if(this.name==''){
                    this.username = '';
                    bridge.call("showAlert",{msg:this.Alert[0]});
                 }else if(this.phoneText == ''){
                    bridge.call("showAlert",{msg:this.Alert[1]});
                 }else if(!phone.test(this.phoneText)){
                    bridge.call("showAlert",{msg:this.Alert[2]});
                 }else if(this.carText.trim() == ''){
                    this.carText = '';
                    bridge.call("showAlert",{msg:this.Alert[3]});
                 }else if(this.username!=''&&this.phoneText!=''&&phone.test(this.phoneText)&&this.carText!=''){
                    this.findCar();
                 }
                this.black=true;
                this.red=false;
                this.Mblack=true;
                this.Mred=false;
            },
            findCar(){
                this.returndata = {
                    "serviceName":"app.subs.submitClue",
                    "timestamp":this.$global().timestamp,
                    "serialNumber":this.$global().serialNumber,
                    "request_data":{
                        "name":this.name,                                
                        "phone":this.phoneText,                             
                        "wantCarType":this.carText,                        
                        "buyRegion":this.cityId,                               
                        "userwant":'我要找车',                                 
                        "buyPrice":this.carAir,
                        "buyMileage":this.mileAge,
                    }
                }
                var _this = this;
                if(navigator.onLine){
                    this.$axios(this.returndata).then((response) => {
                        if(response.retCode == "0"){
                            var bridge = getJsBridge();
                            bridge.call("showLongAlert",{msg:'成功，有车源时经销商会主动联系您！'})
                            _this.username = '';
                            _this.name = '';
                            _this.phoneText = '';
                            _this.carText='';
                            _this.mileAge='';
                            _this.carAir='';
                            _this.isA=true;
                            _this.isC=true;
                            _this.isB=false;
                            _this.isD=false;
                            _this.money=false;
                            _this.mileageL=false;
                            _this.displacement_Less=0;            
                            _this.displacement_More=100;           
                            _this.mileage_Less=0;                  
                            _this.mileage_More=32;                 
                            _this.mileage_Text='不限里程';             
                            _this.displacement_Text='不限价格';    
                        }else{
                            var bridge = getJsBridge();
                            bridge.call("showLongAlert",{msg:'提交失败请重新提交'})
                        }
                    })
                }else{
                    var bridge = getJsBridge();
                    bridge.call("showLongAlert",{msg:'请检查网络设置'})
                }
            },
             MileageLeftstep (event) { 
                event = event||window.event;
                if( this.mileage_Less >= this.mileage_More ){
                    this.mileage_Less = this.mileage_More - 2;   
                }
                this.MileageRange();
            },
            MileageRightstep (event) {  
                event = event||window.event;
                if( this.mileage_Less >= this.mileage_More ) {
                    this.mileage_More = this.mileage_Less + 2;
                    return false;
                }
                this.MileageRange();
            },
            MileageRange(){  
                if( this.mileage_Less==0&&this.mileage_More==32 ){
                    this.mileage_Text = '不限里程';
                    this.mileAge = '';
                    this.Mblack=true;
                    this.Mred=false;
                }else if( this.mileage_Less==0&&this.mileage_More<32 ){
                    this.mileage_Text = this.mileage_More/2+"万公里以下";
                    this.mileAge = 0+","+this.mileage_More/2;
                    this.Mred=true;
                    this.Mblack=false;
                }else if( this.mileage_Less>0&&this.mileage_More==32 ){
                    this.mileage_Text = this.mileage_Less/2+"万公里以上";
                    this.mileAge = this.mileage_Less/2;
                    this.Mred=true;
                    this.Mblack=false;
                }else if( this.mileage_Less>0&&this.mileage_More<32 ){
                    this.mileage_Text = this.mileage_Less/2+"-"+this.mileage_More/2+"万公里";
                    this.mileAge = this.mileage_Less/2+","+this.mileage_More/2;
                    this.Mred=true;
                    this.Mblack=false;
                }
            },
            DisplacementLeftstep (event) {   
                event = event||window.event;
                if( this.displacement_Less >= this.displacement_More ){
                    this.displacement_Less = this.displacement_More - 2;   
                }
                this.DisplacementRange();
            },
            DisplacementRightstep (event) { 
                event = event||window.event;
                if( this.displacement_Less >= this.displacement_More ) {
                    this.displacement_More = this.displacement_Less + 2;
                    return false;
                }
                this.DisplacementRange();
            },
            DisplacementRange(){     
                if( this.displacement_Less==0&&this.displacement_More==100 ){
                    this.displacement_Text = '不限价格';
                    this.carAir = '';
                    this.red=false;
                    this.black=true;

                }else if( this.displacement_Less==0&&this.displacement_More<100 ){
                    this.displacement_Text = this.displacement_More/2+"万元以下";
                    this.carAir = 0+","+this.displacement_More/2;
                    this.red=true;
                    this.black=false;
                }else if( this.displacement_Less>0&&this.displacement_More==100 ){
                    this.displacement_Text = this.displacement_Less/2+"万元以上";
                    this.carAir = this.displacement_Less/2;
                    this.red=true;
                    this.black=false;
                }else if( this.displacement_Less>0&&this.displacement_More<100 ){
                    this.displacement_Text = this.displacement_Less/2+"-"+this.displacement_More/2+"万元";
                    this.carAir = this.displacement_Less/2+","+this.displacement_More/2;
                    this.red=true;
                    this.black=false;
                }
            },
            money_text(){
                this.isA=!this.isA;
                this.isB=!this.isB;
                this.money=!this.money;
            },
            mileage_list(){
                this.isC=!this.isC;
                this.isD=!this.isD;
                this.mileageL=!this.mileageL;
            }
        }
    }
</script>