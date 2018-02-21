<template>
 <div id="fatherBox" style="min-height:100%;">
  <div class="assessmentBox" v-if="assessmentType">
  <div class="ContractorSidebar-Box" v-show="ContractorSidebar_Box" @click="Allhide">
    <div class="ContractorSidebar_Overlay">
      <div class="ContractorSidebar-Rightbox"  v-show="Contractor">
        <div class="ContractorSidebar-header">
          厂商
        </div>
        <ul class="ContractorSidebar-Right">
            <li class="box-li" v-for="(dict,index) in dicts" :key="dict.id">
              <p class="Title"><a :name="dict.keySort">{{dict.keySort}}</a></p>
              <p @click.stop="contracTorhistory($event,index,dict)" class="box_lsip" v-for="(dict,index) in dict.dicttionaryEntity">{{dict.dictName}}</p>
            </li>
        </ul>
        <div class="ContractorSidebar-Leftbox">
          <ul class="ContractorSidebar-Left">
              <li class="box-li" v-for="(Sidebar,index) in A_z" :key="Sidebar.id">
                <a @click.stop="Href" :href="Sidebar">{{Sidebar.slice(1)}}</a>
              </li>
          </ul>
        </div>
      </div>
      <div class="ContractorSidebar-Rightbox" v-show="Brand">
        <div class="ContractorSidebar-header">
          品牌
        </div>
        <ul class="ContractorSidebar-Right">
            <li class="box-li" v-for="(PPdict,index) in PPdicts" :key="PPdict.id" >
              <p  @click.stop="brankBlock(index)">{{PPdict.dictName}}</p>
            </li>
        </ul>
      </div>
      <div class="ContractorSidebar-Rightbox" v-show="Carseries">
        <div class="ContractorSidebar-header">
          车系
        </div>
        <ul class="ContractorSidebar-Right">
            <li class="box-li" v-for="(CXdict,index) in CXdicts" :key="CXdict.id" >
              <p  @click.stop="carseries(index)">{{CXdict.dictName}}</p>
            </li>
        </ul>
      </div>
      <div class="ContractorSidebar-Rightbox" v-show="motorcycletype">
        <div class="ContractorSidebar-header">
          车型
        </div>
        <ul class="ContractorSidebar-Right">
            <li class="box-li" v-for="(motorcycledict,index) in motorcycledicts" :key="motorcycledict.id" >
              <p class="box_lip"  @click.stop="motorcycle(index)">{{motorcycledict.remark.substring(0,4)+motorcycledict.dictName}}</p>
            </li>
        </ul>
      </div>
      <div class="ContractorSidebar-Rightbox" v-show="Years">
        <div class="ContractorSidebar-header">
          上牌年份
        </div>
        <ul class="ContractorSidebar-Right">
            <li class="box-li" v-for="(Yeardate,index) in Yeardates" :key="Yeardate.id" >
              <p  @click.stop="getYeardate(index)">{{Yeardate}}年</p>
            </li>
        </ul>
      </div>
      <div class="ContractorSidebar-Rightbox" v-show="Month">
        <div class="ContractorSidebar-header">
          上牌月份
        </div>
        <ul class="ContractorSidebar-Right">
            <li class="box-li" v-for="(month,index) in month" :key="month.id">
              <p @click.stop="monthBlock(index)">{{month}}月</p>
            </li>
        </ul>
      </div>
      <div class="ContractorSidebar-Rightbox" v-show="Registration">
        <div class="ContractorSidebar-header">
          上牌地区
        </div>
        <ul class="ContractorSidebar-Right">
            <li class="box-li" v-for="(registrationdict,index) in registrationdicts" :key="registrationdict.id">
              <p class="Title"><a :name="registrationdict.keySort.toLowerCase()">{{registrationdict.keySort}}</a></p>
              <p @click.stop="registrationName(registrationdict)" v-for="registrationdict in registrationdict.dicttionaryEntity">{{registrationdict.dictName}}
              </p>
            </li>
        </ul>
        <div class="ContractorSidebar-Leftbox">
          <ul class="ContractorSidebar-Left">
              <li class="box-li" v-for="(Sidebar,index) in a_Z" :key="Sidebar.id">
                <a @click.stop="Href" :href="Sidebar">{{Sidebar.slice(1).toUpperCase()}}</a>
              </li>
          </ul>
        </div>
      </div>
    </div>  
  </div>
    <ul class="Box">
      <li @click="bodyStyle(),Contractor=!Contractor,ContractorSidebar_Box=!ContractorSidebar_Box">
        厂商
        <span class="assesshistory" v-for="Contractorhistory in Contractorhistory" :key="Contractorhistory.id">{{Contractorhistory}}</span>
      </li>

      <li @click="bodyStyle(),Brand=!Brand,ContractorSidebar_Box=!ContractorSidebar_Box">
        品牌
        <span class="assesshistory" v-for="brandHistory in brandHistorys">{{brandHistory}}</span>
      </li>

      <li @click="bodyStyle(),Carseries=!Carseries,ContractorSidebar_Box=!ContractorSidebar_Box">
        车系
        <span class="assesshistory" v-for="carSeriesHistory in carSeriesHistorys">{{carSeriesHistory}}</span>
      </li>

      <li @click="bodyStyle(),motorcycletype=!motorcycletype,ContractorSidebar_Box=!ContractorSidebar_Box">
        车型
        <span class="assesshistory" v-for="motorcycleHistory in motorcycleHistorys">{{motorcycleHistory}}</span>
      </li>

      <li @click="bodyStyle(),Years=!Years,ContractorSidebar_Box=!ContractorSidebar_Box">
        上牌年份
        <span class="assesshistory" v-for="YeardatesHistory in YeardatesHistory">{{YeardatesHistory}}</span>
      </li>

      <li @click="bodyStyle(),Month=!Month,ContractorSidebar_Box=!ContractorSidebar_Box">
        上牌月份
        <span class="assesshistory" v-for="monthHistory in monthHistorys">{{monthHistory}}月</span>
      </li>
      
      <li @click="bodyStyle(),Registration=!Registration,ContractorSidebar_Box=!ContractorSidebar_Box;">
        上牌地区
        <span class="assesshistory" v-for="registrationHistory in registrationHistorys">{{registrationHistory}}</span>
      </li>
    </ul>
      <div class="km" @click="KilometersFocus($event)">
        <span class="mileage">里程数</span>
          <span class="kilometers">
            <input class="kilometer" type="number" v-model="kilometers" @change="Kilometers">
            万公里
          </span>
        <p class="clear"></p>
      </div>
      <div class="estimate">
        <divider>
          <p class="estimate-p">评估结果来源于第三方平台，仅供参考，若要获取精准结果，可直接联系客服。</p>
        </divider>
    </div>
    <div class="promptlyment">
      <button @click='promptlymentHttp' type="button">立即评估</button>
    </div>

    <div class="activity">
      <h2>二手车评估活动</h2>
    </div>    
    <ActivityList ref="activity_List" :activityData="activityData" keyWord="" :cityId='cityId' activityService='3' dealerCode='' carLineId=''></ActivityList>
  </div>

  <div class="assessmentresultBox" v-else>
    <assessmentresult :guidedPrice="guidedPrice" :cityId="cityId" :cityName="cityName" @JumptoAssessmentonline="JumpToAssessmentonline"></assessmentresult>
  </div>
</div>
</template>

<script>

  import { Group,Cell,CellBox,Divider } from 'vux';
  import assessmentresult from '../sell/assessment-result.vue';  
  import ActivityList from '../list/activity-list.vue';
  export default {
    components: {
      Group, 
      Cell,
      Divider,
      assessmentresult,
      ActivityList
    },
    data () {
      return {
        guidedPrice:[],                                                                    
        tableId:'',
        ContractorSidebar_Box:false,                                                       
        Contractor:false,                                                                  
        Brand:false,                                                                      
        Carseries:false,                                                                   
        motorcycletype:false,                                                             
        Years:false,                                                                       
        Month:false,                                                                      
        Registration:false,                                                               
        assessmentType:true,                                                              
        assessmentDatas : ['厂商','品牌','车系','车型','上牌年份','上牌月份','上牌地区'],
        branDs:[],                                                                       
        brandHistorys:[],
        carSeries:[],                                                                    
        carSeriesHistorys:[],
        motorcycles:[],                                                                   
        motorcycleHistorys:[],
        registration:[],                                                                  
        registrationHistorys:[],
        YearInit:new Date(),                                                              
        Yeardates:new Array(),                                                            
        Yeardate:[],                                                                      
        YeardatesHistory:[],
        month:['01','02','03','04','05','06','07','08','09','10','11','12'],
        montHs:[],                                                                         
        monthHistorys:[],
        kilometers:'',
        A_z: ['##','#A','#B','#C','#D','#E','#F','#G','#H','#I','#J','#K','#L','#M','#N','#O','#P','#Q','#R','#S','#T','#U','#V','#W','#X','#Y','#Z'],
        a_Z: ['##','#a','#b','#c','#d','#e','#f','#g','#h','#i','#j','#k','#l','#m','#n','#o','#p','#q','#r','#s','#t','#u','#v','#w','#x','#y','#z'],
        contractorHistory:[],
        Contractorhistory:[],
        returndata:'',                                                                    
        dicts:[],                                                                         
        PPdicts:[],                                                                       
        CXdicts:[],                                                                       
        motorcycledicts:[],                                                               
        registrationdicts:'',                                                             
        assessmentresultdicts:[],                                                         
        CSdictid_box:[],                                                                   
        CSdictId:'',                                                                       
        PPdictid_box:[],                                                                   
        PPdictId:'',                                                                      
        CXdictid_box:[],                                                                  
        CXdictId:'',                                                                      
        motorcycledictid_box:[],                                                          
        motorcycledictId:'',                                                              
        activityData: [],                                                                 
        father:''
      }
    },
    props:['cityId','cityName','userName'],
    created(){
      
    },
    mounted: function () {
      this.father = document.getElementById('fatherBox');
      for( var i=0;i<10;i++ ){   
        this.Yeardates[i] = this.YearInit.getFullYear()-i;
      }
      this.returndata = {
            "serviceName":"app.sys.dicts",
            "timestamp":this.$global().timestamp,
            "serialNumber":this.$global().serialNumber,
            "request_data":{
                  "parentId":"163260",
                  "ifSort":"1"
              }
        }
      this.dictslistHttpData();  
      this.Regionhistorydata();  
      if(sessionStorage.getItem('brandhistorys')){
        this.brandHistorys = JSON.parse(sessionStorage.getItem('brandhistorys')); 
      };
      if(sessionStorage.getItem('carSeriesHistorys')){
        this.carSeriesHistorys = JSON.parse(sessionStorage.getItem('carSeriesHistorys')); 
      };
      if(sessionStorage.getItem('motorcycleHistorys')){
        this.motorcycleHistorys = JSON.parse(sessionStorage.getItem('motorcycleHistorys')); 
      };
      if( sessionStorage.getItem('YeardatesHistory') ){  
        this.YeardatesHistory = JSON.parse(sessionStorage.getItem('YeardatesHistory'));
      }
      if(sessionStorage.getItem('monthhistorys')){
        this.monthHistorys = JSON.parse(sessionStorage.getItem('monthhistorys')); 
      };
      if(sessionStorage.getItem('registrationHistorys')){
        this.registrationHistorys = JSON.parse(sessionStorage.getItem('registrationHistorys')); 
      };
      if(sessionStorage.getItem('kilometers')){
        this.kilometers = JSON.parse(sessionStorage.getItem('kilometers')); 
      };
      if(sessionStorage.getItem('contractorHistory')){
        this.Contractorhistory = JSON.parse(sessionStorage.getItem('contractorHistory'));  
      };
      if(sessionStorage.getItem('CSdictIdStorage')){
        this.CSdictId = JSON.parse(sessionStorage.getItem('CSdictIdStorage')).toString();  
        this.returndata = {
            "serviceName":"app.sys.dicts",
            "timestamp":this.$global().timestamp,
            "serialNumber":this.$global().serialNumber,
            "request_data":{
                  "parentId":this.CSdictId
              }
        }
        this.AxiosBrankBlock(); 
      };
      if(sessionStorage.getItem('PPdictIdStorage')){
        this.PPdictId = JSON.parse(sessionStorage.getItem('PPdictIdStorage')).toString(); 
        this.returndata = {
            "serviceName":"app.sys.dicts",
            "timestamp":this.$global().timestamp,
            "serialNumber":this.$global().serialNumber,
            "request_data":{
                  "parentId":this.PPdictId
              }
        }
        this.AxiosCarseries(); 
      };
      if(sessionStorage.getItem('CXdictIdStorage')){
        this.CXdictId = JSON.parse(sessionStorage.getItem('CXdictIdStorage')).toString(); 
        this.returndata = {
            "serviceName":"app.sys.dicts",
            "timestamp":this.$global().timestamp,
            "serialNumber":this.$global().serialNumber,
            "request_data":{
                  "parentId":this.CXdictId
              }
        }
        this.AxiosMotorcycle(); 
      };
      if(sessionStorage.getItem('motorcycledictIdStorage')){
        this.motorcycledictId = JSON.parse(sessionStorage.getItem('motorcycledictIdStorage')).toString(); 
        this.tableId = JSON.parse(sessionStorage.getItem('tableIdStorage')).toString(); 
      };    
    },
    methods: {
      bodyStyle(){
          this.father.className = "bodyStyle";
      },
      promptlymentHttp(){
         if( this.Contractorhistory.length>0&&this.brandHistorys.length>0&&this.carSeriesHistorys.length>0&&this.motorcycleHistorys.length>0&&this.YeardatesHistory.length>0&&this.monthHistorys.length>0&&this.registrationHistorys.length>0&&this.kilometers!='' ){
          if( this.kilometers<=100 ){
               let resultdata = {
                  "serviceName":"app.subs.onlineEstimate",
                  "timestamp":this.$global().timestamp,
                  "serialNumber":this.$global().serialNumber,
                  "request_data":{
                        "manufacturer":this.CSdictId,
                        "brand":this.PPdictId,
                        "release":this.CXdictId,
                        "model":this.tableId,
                        "registerYear":this.YeardatesHistory.toString(),
                        "registerMonth":this.monthHistorys.toString(),
                        "registerArea":this.registrationHistorys.toString(),
                        "mileAge":parseFloat(this.kilometers),
                        "phone": this.userName,
                        'buyRegion': this.cityId
                    }
               }
              var _this = this;
              this.$axios(resultdata).then((response) => {
                _this.assessmentType = false;
                _this.guidedPrice = response.response_data;
              });
          }else{
            var bridge = getJsBridge(); 
              bridge.call("showAlert",{msg:'行驶里程大于100万公里'});
          } 
        }else{
          var bridge = getJsBridge(); 
              bridge.call("showAlert",{msg:'请完善所有选项'});
        }
      },
      JumpToAssessmentonline(){ 
         this.assessmentType = true;
      },
      brankBlock(index){
        this.father.className = "";
        this.branDs.splice(0,1,this.PPdicts[index].dictName);  
        sessionStorage.setItem('brandhistorys',JSON.stringify(this.branDs));
        this.brandHistorys = this.branDs;
        this.Brand = !this.Brand;
        this.ContractorSidebar_Box = !this.ContractorSidebar_Box;
        sessionStorage.removeItem('carSeriesHistorys');
        sessionStorage.removeItem('motorcycleHistorys');
        this.carSeriesHistorys = '';
        this.CXdicts = '';
        this.motorcycledicts = [];
        this.motorcycleHistorys = '';
        this.PPdictId = this.PPdicts[index].dictId;
        this.PPdictid_box.splice(0,1,this.PPdicts[index].dictId);
        sessionStorage.setItem('PPdictIdStorage',JSON.stringify(this.PPdictid_box[0]));
        this.returndata.request_data.parentId = this.PPdictId;
        var _this = this;
        this.$axios(this.returndata).then((response) => {
          _this.CXdicts = response.response_data.dicts;
        });
      },
      carseries(index){
        this.father.className = "";
        this.carSeries.splice(0,1,this.CXdicts[index].dictName);  
        sessionStorage.setItem('carSeriesHistorys',JSON.stringify(this.carSeries));
        this.carSeriesHistorys = this.carSeries;
        this.Carseries = !this.Carseries;
        this.ContractorSidebar_Box = !this.ContractorSidebar_Box;
        sessionStorage.removeItem('motorcycleHistorys');
        this.motorcycledicts = [];
        this.motorcycleHistorys = '';
        this.CXdictId = this.CXdicts[index].dictId;
        this.CXdictid_box.splice(0,1,this.CXdicts[index].dictId);
        sessionStorage.setItem('CXdictIdStorage',JSON.stringify(this.CXdictid_box[0]));
        this.returndata.request_data.parentId = this.CXdictId;
        var _this = this;
        this.$axios(this.returndata).then((response) => {
          var carType = response.response_data.dicts;
          for( var i in carType ){
            if( carType[i].remark!=undefined ){
              if( carType[i].remark>="2003" ){
                _this.motorcycledicts.push(carType[i]);
              }
            }
          }
        });
      },
      motorcycle(index){
        this.father.className = "";
        this.motorcycles.splice(0,1,this.motorcycledicts[index].remark.substring(0,4)+this.motorcycledicts[index].dictName);
        sessionStorage.setItem('motorcycleHistorys',JSON.stringify(this.motorcycles));
        this.motorcycledictId = this.motorcycledicts[index].dictId;
        this.tableId = this.motorcycledicts[index].tableId;
        this.motorcycledictid_box.splice(0,1,this.motorcycledicts[index].dictId);
        sessionStorage.setItem('motorcycledictIdStorage',JSON.stringify(this.motorcycledictid_box[0]));
        sessionStorage.setItem('tableIdStorage',this.tableId);
        this.motorcycleHistorys = this.motorcycles;
        this.motorcycletype = !this.motorcycletype;
        this.ContractorSidebar_Box = !this.ContractorSidebar_Box;
      },
      getYeardate(index){
        this.father.className = "";
        this.Yeardate.splice(0,1,this.Yeardates[index]);
        sessionStorage.setItem('YeardatesHistory',JSON.stringify(this.Yeardate));
        this.YeardatesHistory = this.Yeardate;
        this.Years = !this.Years;
        this.ContractorSidebar_Box = !this.ContractorSidebar_Box;
      },
      monthBlock(index){
        this.father.className = "";
        this.montHs.splice(0,1,this.month[index]);
        sessionStorage.setItem('monthhistorys',JSON.stringify(this.montHs));
        this.monthHistorys = this.montHs;
        this.Month = !this.Month;
        this.ContractorSidebar_Box = !this.ContractorSidebar_Box;
      },
      KilometersFocus(event){
        event = event||window.event;
        event.target.firstChild.focus();
      },
      Kilometers(){ 
        sessionStorage.setItem('kilometers',JSON.stringify(this.kilometers));
      },
      contracTorhistory(event,i,dict){
        this.father.className = "";
        this.contractorHistory.splice(0,1,dict.dictName);
        sessionStorage.setItem('contractorHistory',JSON.stringify(this.contractorHistory));
        sessionStorage.removeItem('brandhistorys');
        sessionStorage.removeItem('carSeriesHistorys');
        sessionStorage.removeItem('motorcycleHistorys');
        this.brandHistorys = '';
        this.carSeriesHistorys = '';
        this.CXdicts = '';
        this.motorcycleHistorys = '';
        this.motorcycledicts = [];
        this.Contractorhistory = this.contractorHistory;
        this.Contractor = !this.Contractor;
        this.ContractorSidebar_Box = !this.ContractorSidebar_Box;
        this.CSdictId = dict.dictId;
        this.CSdictid_box.splice(0,1,dict.dictId);
        sessionStorage.setItem('CSdictIdStorage',JSON.stringify(this.CSdictid_box));
        this.returndata.request_data.parentId = this.CSdictId;
        this.returndata.request_data.ifSort = "";
        var _this = this;
        this.$axios(this.returndata).then((response) => {
          _this.PPdicts = response.response_data.dicts;
        });
      },
      registrationName(registrationdict){
        this.father.className = "";
        this.registration.splice(0,1,registrationdict.dictName);
        sessionStorage.setItem('registrationHistorys',JSON.stringify(this.registration));
        this.registrationHistorys = this.registration;
        this.Registration = !this.Registration;
        this.ContractorSidebar_Box = !this.ContractorSidebar_Box;
      },
      Regionhistorydata(){
        this.returndata = {
            "serviceName":"app.sys.dicts",
            "timestamp":this.$global().timestamp,
            "serialNumber":this.$global().serialNumber,
            "request_data":{
                  "parentId":"1",
                  "ifSort":"1"
              }
        }
        var _this = this;
        this.$axios(this.returndata).then((response) => {
          _this.registrationdicts = response.response_data.dictstandby;
        });
      },
      dictslistHttpData () {  
        var _this = this;
        this.$axios(this.returndata).then((response) => {
          _this.dicts = response.response_data.dictstandby;   
        });
      },
      AxiosBrankBlock(){
        var _this = this;
        this.$axios(this.returndata).then((response) => {
          _this.PPdicts = response.response_data.dicts
        });
      },
      AxiosCarseries(){
        var _this = this;
        this.$axios(this.returndata).then((response) => {
          _this.CXdicts = response.response_data.dicts
        });
      },
      AxiosMotorcycle(){
        var _this = this;
        this.$axios(this.returndata).then((response) => {
          _this.motorcycledicts = response.response_data.dicts
        });
      },
      Allhide(){  
        this.father.className = "";
        this.ContractorSidebar_Box = false;  
        this.Contractor = false;  
        this.Brand = false; 
        this.Carseries = false; 
        this.motorcycletype = false; 
        this.Years = false; 
        this.Month = false; 
        this.Registration = false;  
      }
    }
  }
</script>