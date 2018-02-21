<template>
  <div class="keyMessage">
    <div class="questionBox">
      <div class="questionTab">
        <tab :line-width=2 active-color="#333333"  v-model="index" custom-bar-width="1.8rem">
          <tab-item class="vux-center" v-for="(item, index) in list" @click.native="chooseStoreContent(index)" :key="index" style='font-size:.3rem;'>{{item}}</tab-item>
        </tab>
        <div v-show="my">
          <div class="Inquisitive">
            <textarea v-model="Inquisitivecontent" name="Inquisitive" placeholder="输入您的问题，最多60个字" maxlength="60" class="Inquisitive-content">
            </textarea>
            <p class="inputNumber">还能输入<span id="count" ref="count">60</span> 字</p> 
            <p class="Inquisitive-classifications">问题分类<span>选择一个您的问题标签</span></p>
            <ul class="Inquisitive-classification">
              <li :class="{'lii':InquisitiveClassification.isli}" @click="Inquisitiveclassification($event,index)" v-for="(InquisitiveClassification,index) in InquisitiveClassification" :key="InquisitiveClassification.id">{{InquisitiveClassification.title}}
              </li>
            </ul>
            <p style="clear:both"></p>
            <button type="button" class="Inquisitive-submit" @click="InquisitiveSubmit">提问</button>
            <div class="Inquisitive-Myself" v-show="login">
              <h6 class="Inquisitive-header">我的问题</h6>
              <questionList ref="our_question" :userId="userName" path='interact_duan'></questionList>
              <ul class="Inquisitive-Myselfs">
                <li v-for="Myself in InquisitiveMyselfContents" :key="Myself.id">
                  {{Myself.content}}
                  <span>{{Myself.nowDate}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-show="they">
          <div class="Asked">
            <div class="seart">
              <div class="searc">       
                  <p class="sou"></p>
                  <input type="text" placeholder='搜搜您感兴趣的问题' v-model="keyWord"></div>
              <p class="sou_search" @click="search">搜索</p>
            </div>
            <div id="progress" v-if='progress'>
              <img class="carloading" src="../../../static/images/loading/loading.gif">
              <p>正在刷新...</p>
            </div>

            <div id="progress" v-if='progress1'>
              <img class="carloading" src="../../../static/images/loading/loading.gif">
              <p>松手刷新</p>
            </div>
            <h5>选车难题<span @click="jumpChooseQuestion('1','选车难题')">更多</span></h5>
            <div class="question-list">
              <questionList ref="question1" questionType="1" path='interact_duan'></questionList>              
            </div>
            <div class="bordercenter"></div> 

            <h5>交易过户<span @click="jumpChooseQuestion('2','交易过户')">更多</span></h5>
            <div class="question-list">
              <questionList ref="question2" questionType="2" path='interact_duan'></questionList>              
            </div>
            <div class="bordercenter"></div> 

            <h5>金融贷款<span @click="jumpChooseQuestion('3','金融贷款')">更多</span></h5>
            <div class="question-list">
              <questionList ref="question3" questionType="3" path='interact_duan'></questionList>              
            </div>
            <div class="bordercenter"></div> 

            <h5>卖车相关<span @click="jumpChooseQuestion('4','卖车相关')">更多</span></h5>
            <div class="question-list">
              <questionList ref="question4" questionType="4" path='interact_duan'></questionList>              
            </div>
            <div class="bordercenter"></div> 

            <h5>App相关<span @click="jumpChooseQuestion('5','App相关')">更多</span></h5>
            <div class="question-list">
              <questionList ref="question5" questionType="5" path='interact_duan'></questionList>              
            </div>
            <div class="bordercenter"></div> 

            <h5>其他<span @click="jumpChooseQuestion('0','其他')">更多</span></h5>
            <div class="question-list">
              <questionList ref="question0" questionType="0" path='interact_duan'></questionList>              
            </div>
            <div class="bordercenter"></div> 
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>

import { Tab, TabItem } from 'vux';
import questionList from "../list/question-list.vue";
const list = () => ['我想问', '大家都在问'];
export default {
  components: {
    Tab,
    TabItem,
    questionList
  },
  data () {
    return {
      InquisitiveClassification:[  
        { isli: false,title:'选车难题',questionType:'1' },
        { isli: false,title:'交易过户',questionType:'2' },
        { isli: false,title:'金融贷款',questionType:'3' },
        { isli: false,title:'卖车相关',questionType:'4' },
        { isli: false,title:'App相关',questionType:'5' },
        { isli: false,title:'其他',questionType:'0' }
      ],
      list: list(),
      index: 0,
      carSource: true,
      activity: false,
      my: true,
      they: false,
      Inquisitivecontent:'',  
      InquisitiveMyselfs:{title:'',content:''}, 
      InquisitiveMyselfContents:[],
      NowDate:new Date(),
      interactData: '',     
      questionType: '',    
      login: '',            
      userName: '',          
      keyWord:'',           
      startY: 0,
      endY: 0,
      moveY: '',
      scrollHeight:'',
      scrollTop: '',
      clientHeight: '',
      direction: '',
      progress: false,
      progress1: false
    }
  },
  created () {
    var bridge = getJsBridge();
    this.userName = bridge.call("getUserName");
    if(this.userName == "-1"){
      this.userName = "";
      this.login = false;
    }else{
      this.userName = this.userName;
      this.login = true;
    } 
  },
  mounted () {
    window.addEventListener('touchstart',this.touchStart);
    window.addEventListener('touchmove',this.touchMove);
    window.addEventListener('touchend',this.touchEnd);
  },
  watch:{
    Inquisitivecontent(newVal,oldVal){
      var maxChars = 60; 
      if (newVal.length > maxChars) 
      newVal = newVal.substring(0,maxChars); 
      var curr = maxChars-newVal.length; 
      this.$refs.count.innerHTML = curr.toString(); 
    },
  },  
  methods : {
    chooseStoreContent(index){
      var bridge = getJsBridge();
      this.userName = bridge.call("getUserName");
      if(this.userName == "-1"){
        this.userName = "";
        this.login = false;
      }else{
        this.userName = this.userName;
        this.login = true;
      } 
      if(index == 0){
        this.my = true;
        this.they = false;
        this.$refs.our_question.questionListHttp(this.userName);
      }else if(index == 1){
        this.my = false;
        this.they = true;       
      }
    },
    jumpChooseQuestion(questionType,title){
      var bridge = getJsBridge();
      bridge.call('startNativeActivity',{url:this.$global().url+"choosequestion?questionType="+questionType,title:title})
    },
    Inquisitiveclassification (e,index) {
      event = e||window.e;
      var _title = event.target.innerHTML;
      for( let i in this.InquisitiveClassification ){
        this.InquisitiveClassification[i].isli = false; 
      }
      this.InquisitiveClassification[index].isli = !this.InquisitiveClassification[index].isli;
      if( this.Inquisitivecontent!='' ){
        this.InquisitiveMyselfs.title = _title;
        this.InquisitiveMyselfs.content = this.Inquisitivecontent;
      }
      this.questionType = this.InquisitiveClassification[index].questionType;      
    },
    search(){
      var bridge = getJsBridge();   
      bridge.call("startNativeActivity",{url: this.$global().url+"searchshoose?keyWord="+this.keyWord, title: "问题搜索"}); 
    },
    InquisitiveSubmit () {  
      var bridge = getJsBridge();
      var _this = this;      
      if(this.userName == ""){
        bridge.call("doLogin",{},function(data){
          _this.login = true;        
          _this.userName = JSON.parse(data).userName;  
          _this.$refs.our_question.questionListHttp(_this.userName);
        })
      }else{
        if(!!this.questionType && !this.Inquisitivecontent){
          bridge.call("showLongAlert",{msg: "请输入您要问的问题"});
        }else if(!this.questionType && !!this.Inquisitivecontent){
          bridge.call("showLongAlert",{msg: "请选择问题分类标签"});
        }else if(!this.questionType && !this.Inquisitivecontent){
          bridge.call("showLongAlert",{msg: "请输入您要问的问题及问题分类标签"});
        }else if(!!this.questionType && !!this.Inquisitivecontent){
          this.interactData = {
            "serviceName":"app.query.clubQuestionList",
            "timestamp":this.$global().timestamp,
            "serialNumber":this.$global().serialNumber,
            "request_data":{
              "operation": "add",
              "userId": this.userName,
              "questionType": this.questionType,
              "question": this.Inquisitivecontent
            }
          }
          this.$axios(this.interactData).then((response) => {
            if(response.retCode == "0"){              
              bridge.call("showLongAlert",{msg:'提交成功，等待审核'});
              _this.Inquisitivecontent = "";
              _this.questionType = ""
              for( let i in _this.InquisitiveClassification ){
                _this.InquisitiveClassification[i].isli = false;  
              }
              _this.$refs.our_question.questionListHttp(_this.userName);
            }else{
              bridge.call("showLongAlert",{msg: response.retMessage});
            }
          });          
        }        
      }       
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
      if(this.scrollTop == 0 && this.direction == 'Down'){        
        this.progress1=true;  
      }
    },
    touchEnd(){
      if(this.scrollTop <= 0 && this.direction == 'Down'){
        this.direction = '';
        this.progress1 = false;
        this.progress = true;
        var _this = this;
        this.$refs.question1.questionUpdata();
        this.$refs.question2.questionUpdata();
        this.$refs.question3.questionUpdata();
        this.$refs.question4.questionUpdata();
        this.$refs.question5.questionUpdata();
        this.$refs.question0.questionUpdata();
        setTimeout(function(){
          _this.progress = false;
        },1000);
      }
    },
    swipeDirection(x1, x2, y1, y2) {    
      return Math.abs(x1 - x2) >=
      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
    }
  }
}
</script>
