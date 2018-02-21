import Vue from 'vue'
import $ from 'webpack-zepto'


export default {
  install () {    
    Vue.prototype.$global = () => {
      let serviceUrl = window.location.host;
      let date = new Date();
      let year = date.getFullYear(),      
          month = date.getMonth()+1 > 9 ? date.getMonth()+1 : '0'+(date.getMonth()+1),    
          day = date.getDate()>9 ? date.getDate() : '0'+date.getDate(),   
          hours = date.getHours()>9 ? date.getHours() : '0'+date.getHours(),    
          minutes = date.getMinutes()>9 ? date.getMinutes() : '0'+date.getMinutes(),    
          seconds = date.getSeconds()>9 ? date.getSeconds() : '0'+date.getSeconds(),    
          milliseconds = date.getUTCMilliseconds()>99 ? date.getUTCMilliseconds() : (date.getUTCMilliseconds()>9 ? '0'+date.getUTCMilliseconds() : '0'+'0'+date.getUTCMilliseconds()),    
          randomNum = parseInt(Math.random()*100000000);  
      return {
        'serialNumber': year+month+day+hours+minutes+seconds+milliseconds+'app'+randomNum,
        'timestamp': year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds,
        'carsigns': [
          {tagName: '准新车',tagUrl:''},
          {tagName: '奥迪认证',tagUrl:'../../../static/images/aodiCer.png'},
          {tagName: '2年0利率',tagUrl:'../../../static/images/0lilv.png'},
          {tagName: '练手车',tagUrl:''},
          {tagName: '超值精选',tagUrl:''},
          {tagName: '免费过户',tagUrl:''},
          {tagName: '降价急售',tagUrl:''},
          {tagName: '原厂质保',tagUrl:''}
        ],
        'url': 'http://'+ serviceUrl +'/',      //h5页面地址公共部分
        'downloadApp': 'http://a.app.qq.com/o/simple.jsp?pkgname=xxxxxxxxx',       //应用宝下载app地址
        'shareImg': 'http://xxxxxxxxx/upload/carShare/carShareLogo.jpg',           //分享的logo地址
      }
    }
  }
}
