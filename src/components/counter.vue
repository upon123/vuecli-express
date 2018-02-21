<template>
    <p class='orange' v-if='time.length' v-html="time"></p>
</template>
<script>
export default{
    data(){
        return {
            now: new Date().getTime()
        }
    },
    props: ['endtime'],
    methods:{
        formate(time){
            let day = parseInt(time/1000/3600/24);
            let hour = parseInt((time/1000 - day * 24 * 3600)/3600);
            let min = parseInt((time/1000 - day * 24 * 3600 - hour*3600)/60);
            let sec = parseInt(time/1000 - day * 24 * 3600 - hour*3600 - min * 60);
            return '活动倒计时<span>'+day+'</span>' + '天' +'<span>'+hour+'</span>' + '小时' + '<span>'+min+'</span>' + '分钟' + '<span>'+sec+'</span>' + '秒'
        }
    },
    computed:{
        'time': function(){
            let period = new Date(this.endtime).getTime() - this.now
            if(period>=0)
                return this.formate(period)
            return ''
        }
    },
    mounted(){
        let  self = this;
        this.timer=setInterval(function(){
            if(self.time.length==0)
                clearTimeout(self.timer)
            self.now=new Date().getTime();
        },1000);
    }
}
</script>
<style>
    .orange{
        font-size:.24rem;
        color: #333;
        line-height: .24rem;
        margin-top: .2rem;
    }
    .orange span{
        color: #bb0a30;
    }
</style>