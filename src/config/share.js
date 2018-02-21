import Vue from 'vue'
import $ from 'webpack-zepto'

export default {
  install () {    
    Vue.prototype.$share = (openUrl) => {
      location.href = openUrl;     
    }
  }
}
