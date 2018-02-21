<template>
    <div class="load_failed" :style="style">
        <div class="load_f" :style="style_bottom">
            <img :src="src" alt="">
            <p :style="style_p">{{content}}</p>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            style: '',
            style_bottom:'',
            style_p:''
        }
    },
    props:['path','src','content','carPath','shop','jump'],
    created(){
        if(this.path == "long"){
            this.style="height:10.5rem;"
        }else if(this.path == "sell"){
            this.style="height:6.5rem;"
        }else if(this.path == "Cardealer"){
            this.style="height:9.5rem;"
        }else if(this.path =="activitydealer"){
            this.style="height:9.5rem;"
        }else if(this.path=="carduan"){
            this.style_bottom=" padding:15% 0;"
        }else if(this.path=='review'){
            this.style="height:7rem;"
            this.style_p="margin-top:0rem"
            this.style_bottom="padding: 15% 0;border:0px"
        }else if(this.path=='question'){
            this.style="height:12rem;"
        }else if(this.path=='dealer'){
            this.style="height:13.5rem;"
        }else if(this.carPath=='cardetail'){
            this.style="height:13.5rem;"
            this.style_bottom="padding-top:3rem"
        }else if(this.carPath=='carlong'){
            this.style="height:10.5rem;"
            this.style_bottom="padding-top:3rem"
        }else if(this.shop=='shop'){
            this.style="height:11.5rem;"
        }else if(this.shop=='shopp'){
            this.style="height:13.5rem;"
        }else if(this.path=='interact_duan'){
            this.style="height:5rem;"
            this.style_bottom="padding:10% 0;"
            this.style_p="margin-top:0rem"
        }else{
            this.style="height:5rem;"
            this.style_bottom="padding:15% 0;"
        }        
    }    
}    
</script>