<template>
    <div class="load_failedddddd">
        <div class="load_fffff">
            <img src="../../static/images/loadf.png" alt="" class="img">
            <p>数据加载失败</p>
            <div class="cxjz" @click="jumps">
                重新加载
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
           
        }
    },
    methods:{
        jumps(){
            location.replace(document.referrer);
        }
    }
}    
</script>