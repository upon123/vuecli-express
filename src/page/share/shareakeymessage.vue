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
		<questionList :questionType="questionType" path="sharequestion"></questionList> 
    <shareApp @ievent = "closeshare" v-show="share"></shareApp>   
	</div>
</template>
<script>
	import questionList from "../list/question-list.vue";
  import times from '../../components/times.vue';
  import shareApp from '../share/share-app.vue';
	export default{
		components:{
			questionList,
      times,
      shareApp
		},
    data(){
      return{
        questionType: '',
        questionId: '',
        question: '',
        userName:'',
        clubQuestionList: '',
        interactData: '',
        shareTitle: '',
        share: true
      }
    },
    created(){
      this.questionId = this.$route.query.questionId;
      this.questionType = this.$route.query.questionType;
      
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
      closeshare(data){
        this.share = data;
      },
      interactHttp(){
        this.$axios(this.interactData).then((response) => {
          this.question = response.response_data.clubQuestionEntities["0"];
          this.title = this.questionType==1 ? "选车难题" : this.questionType==2 ? "交易过户" : this.questionType==3 ? "金融贷款" :this.questionType==4 ? "卖车相关" : this.questionType==5 ? "App相关" : "其他";;
          this.shareTitle = this.question.question; 
          document.title = this.shareTitle;
          let shareInfo = this.question.answer;  

          let shareUrl = this.$global().url+"sharekeymessage?questionId="+this.questionId+"&questionType="+this.questionType;
          // xxxx://xxxxx代表打开app的协议  
          this.$share('xxxx://xxxxx?uri='+this.$global().url+"articledetail?questionId="+this.questionId+"&questionType="+this.questionType+"&shareTitle="+this.shareTitle+"&shareInfo="+shareInfo+"&shareImg="+this.$global().shareImg+"&title="+this.title+"&shareUrl="+shareUrl)

        });
      },
      toggle(question,index,event){
        location.href = this.$global().downloadApp;
      }
		}
	}
</script>