<template>
      <p class='orange1' v-html="time"></p>
</template>
<script>
   export default{
        data(){
         return {
            now:0
         }
       },
       props: ['endtime'],
       methods : {
           getDateDiff(time){
              let minute = 1000 * 60;
              let hour = minute * 60;
              let day = hour * 24;
              let halfamonth = day * 15;
              let month = day * 30;
              let now = new Date().getTime();
              let diffValue = now - time;
              if(diffValue < 0){return;}
              let monthC =diffValue/month;
              let weekC =diffValue/(7*day);
              let dayC =diffValue/day;
              let hourC =diffValue/hour;
              let minC =diffValue/minute;
               if(monthC>=1){
                  return "" + parseInt(monthC) + "月前";
                }
                else if(weekC>=1){
                  return "" + parseInt(weekC) + "周前";
                }
                else if(dayC>=1){
                  return ""+ parseInt(dayC) +"天前";
                }
                else if(hourC>=1){
                  return ""+ parseInt(hourC) +"小时前";
                }
                else if(minC>=1){
                  return ""+ parseInt(minC) +"分钟前";
                }else
                return "刚刚";
            }
       },
       computed:{
        'time': function(){
            return this.getDateDiff(this.endtime);
          }
      },
   }
</script>
<style>
  .orange1{
    float: left;
    font-size: .22rem;
    color: #999;
    margin-left: 5.46rem;
    margin-top: .22rem;
    line-height: .22rem;
  }
</style>