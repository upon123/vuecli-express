<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>
<style>
    .star{
        display: inline-block;
        vertical-align: middle;
        margin-left: .55rem;
    }
    .star-item{
        background: url('../../static/images/star1.png') no-repeat center;
        width:.25rem;
        height: .25rem;
        display: block;
        float: left;
        margin-left: .08rem;
        background-size:.25rem .25rem;
    }
    .on{
        background: url('../../static/images/star-f.png') no-repeat center;
        width:.25rem;
        height: .25rem;
        display: block;
        float: left;
        margin-left: .08rem;
        background-size:.25rem .25rem;
    }
    .half{
        background: url('../../static/images/star-f.png') no-repeat center;
        width:.25rem;
        height: .25rem;
        display: block;
        float: left;
        margin-left: .08rem;
        background-size:.25rem .25rem;
    }
</style>
<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default{
    props: {
      size: {  
        type: Number  
      },
      score: {  
        type: Number
      }
    },
    props: ['starnum'],
    data () {
            return {
              
            }
        },
    computed: {
      starType(){  
        return 'star-' + this.size;
      },
      itemClasses(){
        let result = [];  
        let score = Math.floor(this.starnum * 2) / 2;  
        let hasDecimal = score % 1!== 0;  
        let integer = Math.floor(score);  
        for (let i = 0; i < integer; i++) {  
          result.push(CLS_ON); 
        }
        if (hasDecimal) {  
          result.push(CLS_HALF); 
        }
        while (result.length < LENGTH) { 
          result.push(CLS_OFF); 
        }
        return result;
      }
    }
  }
</script>
