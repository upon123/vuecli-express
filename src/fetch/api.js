import Vue from 'vue'
import $ from 'webpack-zepto'
import axios from 'axios'

export default {
  install() {
    Vue.prototype.$axios = (params) => {
      let serviceUrl = window.location.host;
      return new Promise((resolve, reject) => {
        axios.post('http://'+ serviceUrl +'/mule/app', params, { //  接口地址
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      })
    }
  }
}