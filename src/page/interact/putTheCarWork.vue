<template>
<div class="putthecarwork">
    <div class="putthecarwork_content">
        <textarea v-model="Inquisitivecontent" name="Inquisitive" placeholder="编写你的提车作业吧"  class="Inquisitive-content">
        </textarea>
        <p class="inputNumber">您已输入<span id="count" ref="count">0</span> 字</p> 
    </div>
    <div class="border"></div>
    <div class="vue-upload-img-multiple">
      <div class="putthecarwork_add">
          <div class="putthecarwork_img">
             <ul ref="org">
                <li @click='watchBigImg(index)' v-for="(item, index) in images" >
                    <img :src="item">
                    <button @click.stop="removeImage(index)" class="but"></button> 
                </li>
              </ul>
              <div class="add" v-show='showAdd'>
                <input type="file" @change="onFileChange" class="xuanze" accept="image">
              </div>
          </div>  
      </div>
      
      <div v-show="showBigImg" @click='closeBigImg' class="watch-big-img">
        <div class="swiper-container1">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="swiper-zoom-container">
                <img :src="bigImgSrc">
              </div>
            </div>
          </div>
        </div>      
      </div>    
    </div>

    <div class="uploading" v-show="alert">
      <div>
        上传中...
      </div>      
    </div>

</div>
</template>

<script>
export default{
  data() {
    return {
      userName: "",
      showAdd:  true,
      showBigImg: false,
      bigImgSrc: '',
      Inquisitivecontent:'',
      images: [],
      alert: false
    }
  },
  created(){
    this.userName = this.$route.query.userName;
  },
  mounted(){
    var _this = this;    
    window.imageUpload = function(){
      _this.imageHttp();
    }
    this.MySwiper();
  },
  watch:{
    images(){
      if(this.images.length >= 9){
        this.showAdd = false
      } else {
        this.showAdd = true
      }
    },
    Inquisitivecontent(){
      var curr = this.Inquisitivecontent.length; 
      this.$refs.count.innerHTML = curr;
    }
  },
  methods:{
    MySwiper(){
        let _this = this;
        let myBigSwiper = new Swiper('.swiper-container1',{
            zoom : true,
            zoomMax :2
        });
    },
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files;  
      if (!files.length) return;  
      this.picValue = files[0];  
      this.imgPreview(this.picValue);  
    },
    imgPreview (file) {  
      let self = this;   
      if (!file || !window.FileReader) return;  
  
      if (/^image/.test(file.type)) {  
          let reader = new FileReader();  
          reader.readAsDataURL(file);  
          reader.onloadend = function () {  
            let result = this.result;  
            let img = new Image();  
            img.src = result;              
            if (this.result.length <= (100 * 1024)) {  
              self.headerImage = this.result 
              self.images.push(this.result)
            }else {  
              img.onload = function () {  
                let data = self.compress(img);  
                self.headerImage = data;  
                self.images.push(data)
              }  
            }  
          }   
      }  
    },  
    compress(img) {  
      let canvas = document.createElement("canvas");  
      let ctx = canvas.getContext('2d');  
      let tCanvas = document.createElement("canvas");  
      let tctx = tCanvas.getContext("2d");  
      let initSize = img.src.length;  
      let width = img.width;  
      let height = img.height;  
      let ratio;  
      if ((ratio = width * height / 4000000) > 1) {  
        ratio = Math.sqrt(ratio);  
        width /= ratio;  
        height /= ratio;  
      } else {  
        ratio = 1;  
      }  
      canvas.width = width;  
      canvas.height = height;  
      ctx.fillStyle = "#fff";  
      ctx.fillRect(0, 0, canvas.width, canvas.height);  
      let count;  
      if ((count = width * height / 1000000) > 1) {  
        count = ~~(Math.sqrt(count) + 1);  
        let nw = ~~(width / count);  
        let nh = ~~(height / count);  
        tCanvas.width = nw;  
        tCanvas.height = nh;  
        for (let i = 0; i < count; i++) {  
          for (let j = 0; j < count; j++) {  
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);  
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);  
          }  
        }  
      } else {  
        ctx.drawImage(img, 0, 0, width, height);  
      }   
      let ndata = canvas.toDataURL('image/jpeg', 0.3);  
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;  
      return ndata;  
    },  
    removeImage(index) {
      this.images.splice(index,1);
    },
    watchBigImg(index){
      this.bigImgSrc = this.images[index]     
      this.showBigImg = true
      setTimeout(() => {
        this.MySwiper();
      },1)
    },
    closeBigImg(){
      this.showBigImg = false
    },
    imageHttp(){
      var bridge = getJsBridge();
      if(this.Inquisitivecontent){        
        let imagesData = {
          "serviceName":"app.query.clubPickupWork",
          "timestamp":this.$global().timestamp,
          "serialNumber":this.$global().serialNumber,
          "request_data":{
             "userId":this.userName,
             "operation":'add',
             "content":this.Inquisitivecontent,
             "pic":this.images,
          }
        }        
        if(this.alert == false){
          this.alert = true;
          this.$axios(imagesData).then((response) => {
            if(response.retCode=="0"){
              this.alert = false;
              bridge.call("showAlert",{msg: "上传成功，等待审核！"})
              this.Inquisitivecontent = ""
              this.images = [];
            }else{
              this.alert = false;
              bridge.call("showAlert",{msg: "上传失败！"})
            }
          })
        }else{
          bridge.call("showAlert",{msg:"正在上传中，请勿重复提交!"});
        }        
      }else{
        bridge.call("showAlert",{msg:"文字内容不能为空"});
      }      
    }    
  }
}
</script>