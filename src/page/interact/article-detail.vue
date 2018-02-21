<template>
	<div class="choose">
		<div class="choose-top">
			<p class="choose-top-p1">{{question.question}}</p>
			<times :endtime="question.questionTime"></times>
      <p class="choose-top-p3">{{question.readingCount}}</p>
      <p class="choose-top-p2"></p>
		</div>
		<div style="clear:both">			
		</div>
		<div class="choose-center" v-if="question.answer">
			<img src="../../../static/images/aodi.png" alt="">
			<p class="choose-center-p1">奥迪官方认证二手车</p>
			<p class="choose-center-p3">{{question.readingCount}}</p>
			<p class="choose-center-p2"></p>
			<div style="clear:both">
				
			</div>
			<p class="choose-center-p4">{{question.answer}}</p>
      <times :endtime="question.questionTime"></times>
      <p class="choose-center-p6">{{question.upvoteCount}}</p>
      <p @click="toggle(question, $index,$event)" :class="['unactive',{'choose-center-p5':question.isUpvote}]"></p>
		</div>
		<div style="clear:both"></div>
		<div class="choose-footer">
			<p>相似问题</p>
		</div>
		<questionList :questionType="questionType" path="question"></questionList> 
	</div>
</template>
<script>
	import questionList from "../list/question-list.vue";
  import times from '../../components/times.vue'
	export default{
		components:{
			questionList,
      times
		},
    data(){
      return{
        questionType: '',
        questionId: '',
        question: '',
        userName:'',
        clubQuestionList: '',
        interactData: ''
      }
    },
    created(){
      this.questionId = this.$route.query.questionId;
      this.questionType = this.$route.query.questionType;
      var bridge = getJsBridge();
      this.userName = bridge.call("getUserName");
      if(this.userName == "-1"){
        this.userName = ""
      }else{
        this.userName = this.userName;
      }
      this.interactData = {
        "serviceName":"app.query.clubQuestionList",
        "timestamp":this.$global().timestamp,
        "serialNumber":this.$global().serialNumber,
        "request_data":{
          "operation": "query",
          "questionType": "",
          "questionId": this.questionId,
          "userId": this.userName
        }
      }
      this.interactHttp();
    },
		methods : {
      interactHttp(){
        this.$axios(this.interactData).then((response) => {
          this.question = response.response_data.clubQuestionEntities["0"];
          this.questionType = response.response_data.clubQuestionEntities["0"].questionType;         
        });
      },
      toggle(question,index,event){
        var bridge = getJsBridge();
        event = event||window.event;
        var _this = this;
        this.clubQuestionList = {
          "serviceName":"app.query.clubQuestionList",
          "timestamp":this.$global().timestamp,
          "serialNumber":this.$global().serialNumber,
          "request_data":{
            "operation":'upvote',
            "questionId":question.questionId,
            "userId":this.userName
          }
        }
        if( !question.isUpvote ){
          if(this.userName!=""){
            this.$set(question,'isUpvote',1);
            this.$axios(_this.clubQuestionList).then((response) => {
              _this.$set(question,'isUpvote',1);
              question.upvoteCount++;
            })
          }else{
            bridge.call("doLogin",{},function(data){
              _this.userName = JSON.parse(data).userName;
              _this.interactData.request_data.userId = _this.userName;
              _this.interactHttp();
            });
          }
        }
      },
		}
	}
</script>