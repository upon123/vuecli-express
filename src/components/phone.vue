<template>
    <span v-html='str' class="spa"></span>
</template>
<script>
export default{
    data(){
        return {
            
        }
    },
    props: ['iphone'],
    methods:{
        plusXing (str) {     
          var frontLen=3;
          var endLen=3;
          var len = str.length-frontLen-endLen;    
          var xing = '';    
          for (var i=0;i<len;i++) {        
            xing+='*';    
          }    
          return str.substr(0,frontLen)+xing+str.substr(str.length-endLen);
        }
    },
    computed:{
        'str': function(){
            return this.plusXing(this.iphone)
        }
    },
}
</script>
<style>
    .spa{
        margin-left: .1rem;
        position: absolute;
        top: .29rem;
    }
</style>