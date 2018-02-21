<template>
  <div class="search_screen_box">
    <div class="search-screen-bg-fff" v-show="fff"></div>
    <div class="search-screen-bg-eee" v-show="eee"></div>
    <div class="CarorSearch_box">
      <div>
          <div @click="CarorSearchs_ulShow" class="CarorSearch" v-model="CarorSearch">
            {{CarorSearch}}
          </div>
          <div :class="['CarorSearchs',{'CarorSearchs_ul': CarorSearchs_ul}]">
            <ul class="CarorSearchs_contents">
              <li @click="goSwitchover($event)" class="CarorSearchs_content"><img src="../../../static/images/small-car.png" alt="car">车辆</li>
              <li @click="goSwitchover($event)" class="CarorSearchs_content"><img src="../../../static/images/small-dealer.png" alt="dealer">店铺</li>
            </ul>
          </div>
          <img @click="removeSearch" class="small-delete" src="../../../static/images/small-delete.png" alt="×" v-show="close">
          <input class="searchCarorDaeler" type="text" name="searchCar" maxlength='20' v-model="Carsvalue" placeholder="请输入品牌/车系" @keydown.13="SearchCar" v-if="searchThings">
          <input class="searchCarorDaeler" type="text" name="searchDealer" maxlength='20' v-model="Storesvalue" placeholder="请输入经销商店铺名称" v-else>
      </div>
      <p class="calloff" @click="Goback($event)">{{GobackText}}</p>
    </div>
    <div style="width:94%;height:.64rem;">
    </div>
    <div v-if="CarsorStores">
      <div class="searchThing_history">
        <p class="searchThing_history_title">
          历史纪录
          <img @click="clearsearch" src="../../../static/images/small-recyclebin.png" alt="daeler_history">
        </p>
        <div v-for="(searchthing,index) in getSearch" @click="searchhistorycar(searchthing)">
          {{searchthing}}
          <i @click.stop="RemoveSearch(index,$event)"></i>
        </div>
      </div>
      <div class="searchThing_hotsearch">
        <p class="searchThing_hotsearch_title">
          热门搜索
        </p>
        <div @click="Jumpbuycar(hotsearch)" v-for="hotsearch in hotsearchs">
        {{hotsearch.keyword}}
        </div> 
      </div>
    </div>
    <div v-else>
      <div class="SearchStore_bgColor"></div>
      <div class="Store_none" v-show="Store_none">
        <p>对不起，没有找到您所描述的经销商！</p>
      </div>
      <div class="Store_have" v-show="Store_have">
        <ul>
          <li v-for="(Storedealer,index) in Storedealers" @click="godetail(index)">{{Storedealer.shopHomeNick}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      GobackText:'取消',
      CarorSearch:'车辆',
      Carsvalue: '',  
      Storesvalue:'', 
      Store_have:true,
      Store_none:false,
      searchThings:true, 
      CarorSearchs_ul:false, 
      CarsorStores:true,
      getSearch: [],          
      cars: [],
      dealers:[],
      carsNum: [-1],
      dealersNum: [-1],
      returndata:'',
      searchLog:[], 
      hotsearchs:[],  
      Storedealers:[],  
      cityId:'', 
      keyword: '',  
      path: '',  
      fff: true,
      eee: false,
      close: false  
    }
    return data
  },
  mounted () {  
        let _this = this;
        this.cityId = this.$route.query.cityId;
        this.path = this.$route.query.path;
        let getSearchCars  = window.localStorage.getItem('carsAll');
        let historyCars = JSON.parse(getSearchCars);
        this.getSearch = historyCars;
        if( window.localStorage.getItem('carsAll') ){
          this.cars = JSON.parse(localStorage.getItem('carsAll'));
        }
        this.SearchScreenHttpData();        
  },
  watch:{
    Carsvalue(newVal,oldVal){
      if( newVal!='' ){
          this.GobackText = "搜索";
          this.close = true;
      }else if( newVal=='' ){
          this.GobackText = "取消";
          this.close = false;
      }
    },
    Storesvalue(newVal,oldVal){  
      this.returndata = {
          "serviceName":"app.query.dealerList",
          "timestamp":this.$global().timestamp,
          "serialNumber":this.$global().serialNumber,
            "request_data":{
                "keyword":newVal
            }
      }
      var _this = this;
      if( newVal!='' ){
            this.GobackText = "搜索";
            this.Storedealers = [];
            this.$axios(this.returndata).then((response) => {
              if( response.retCode==0 ){
                if( response.response_data ){
                  _this.Storedealers = response.response_data.dealers;
                  _this.Store_have = true;
                  _this.Store_none = false;
                }else{
                  _this.Storedealers = [];
                  _this.Store_none = true;
                  _this.Store_have = false;
                }
              }
            });
      }else if( newVal=='' ){
        this.Storedealers = [];
        this.Store_none = false;
        this.Store_have = true;
        this.GobackText = "取消";
      }
    }
  },
  methods : {
    SearchScreenHttpData () {
      var _this = this;
        this.returndata = {
            "serviceName":"app.query.searchLog",
            "timestamp":this.$global().timestamp,
            "serialNumber":this.$global().serialNumber,
              "request_data":{
                  "listSize":10
              }
        }
        this.$axios(this.returndata).then((response) => {
          _this.hotsearchs = response.response_data.searchLog;

        });
    },
    SearchCar () {  
        if(this.Carsvalue != ''){
          if( localStorage.getItem('carsAll') ){
            this.carsNum = JSON.parse(localStorage.getItem('carsAll')).length-1;
            this.carsNum++;
            this.cars = JSON.parse(localStorage.getItem('carsAll'));
            for(let i = 0; i < this.cars.length; i++){
                if(this.cars[i] == this.Carsvalue){
                  this.keyword = this.Carsvalue;
                  var bridge = getJsBridge();           
                  if(this.path == "buycar"){
                    bridge.call("searchToBuyFromH5",{keyword: this.keyword});
                  }else{
                    bridge.call("searchToBuy",{keyword: this.keyword});
                  }
                  return false;
                }
            }
            this.cars[this.carsNum] = this.Carsvalue;   
             if( this.cars.length > 10 ) {  
              this.cars.shift();
            }
            localStorage.setItem('carsAll',JSON.stringify(this.cars));
            this.getSearch = this.cars;
          }else{
            this.carsNum++;
            this.cars[this.carsNum] = this.Carsvalue;
            localStorage.setItem('carsAll',JSON.stringify(this.cars));
            this.getSearch = this.cars;
          } 
        }
        this.keyword = this.Carsvalue;
        var bridge = getJsBridge();           
        if(this.path == "buycar"){
          bridge.call("searchToBuyFromH5",{keyword: this.keyword});
        }else{
          bridge.call("searchToBuy",{keyword: this.keyword});
        }
    },
   
    godetail(index){ 
      var bridge = getJsBridge();  
      bridge.call("startNativeActivity",{url: this.$global().url+"dealerhome?dealerCode="+this.Storedealers[index].dealerCode+"&cityId="+this.Storedealers[index].cityId,title:"1"+this.Storedealers[index].shopHomeNick});
    },
    clearsearch () {  
      if( this.searchThings==true ){
        window.localStorage.removeItem("carsAll");
        this.cars = [];
        this.getSearch = [];
        this.carsNum = [-1];
      }   
      return true;
    },
    goSwitchover (event) {   
      event = event||window.event;
      let Searchkind = event.target.innerHTML.slice(-2);
      this.value = '';
      if ( Searchkind=='车辆' ) {
        this.searchThings = true;
        this.getSearch = this.cars;
        this.CarsorStores = true;
        this.fff = true;
        this.eee = false;
        this.CarorSearch = Searchkind;
      }else if( Searchkind=='店铺' ){
        this.searchThings = false;
        this.getSearch = this.dealers;
        this.CarsorStores = false;
        this.CarorSearch = Searchkind;        
        this.fff = false;
        this.eee =  true;
      }
      this.CarorSearchs_ul = false;   
    },
    RemoveSearch (i,event) {  
        event = event||window.event;

        if( this.searchThings==true ){
          this.cars.splice(i,1);
          localStorage.setItem('carsAll',JSON.stringify(this.cars));
          this.getSearch = this.cars;
        }   
    },
    GetSearch : function (event) {
        alert('GetSearch');
    },
    CarorSearchs_ulShow () {  
      this.CarorSearchs_ul = !this.CarorSearchs_ul;
    },
    removeSearch(){ 
      this.Carsvalue = '';
      this.Storesvalue = '';
      this.Storedealers = [];
      this.GobackText = "取消";
      this.close = false;
    },
    Goback (event) { 
      event = event||window.event;
      if( event.target.innerHTML=="取消" ){
        var bridge = getJsBridge();
            bridge.call("finishActivity"); 
      }else{
        if( this.searchThings==true ){
          this.SearchCar();
        }else{
          this.Storesvalue();
        }
      }       
    },
    Jumpbuycar (hotsearch) {  
      this.keyword = hotsearch.keyword;
      var bridge = getJsBridge();   
      if(this.path == "buycar"){
        bridge.call("searchToBuyFromH5",{keyword: this.keyword});
      }else{
        bridge.call("searchToBuy",{keyword: this.keyword});
      }
    },
    searchhistorycar(searchThing){  
      this.keyword = searchThing;
      var bridge = getJsBridge();   
      if(this.path == "buycar"){
        bridge.call("searchToBuyFromH5",{keyword: this.keyword});
      }else{
        bridge.call("searchToBuy",{keyword: this.keyword});
      }
    }
  }  
}
  
</script>