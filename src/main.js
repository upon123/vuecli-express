import './assets/less/index.less';
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import routes from './config/routes';
import Vuex from 'vuex';
import Global from './config/global';
import Share from './config/share';
import Axios from './fetch/api';
import VueLazyload from 'vue-lazyload';	
import VueAwesomeSwiper from 'vue-awesome-swiper'; 
import VueScroller from 'vue-scroller';
import Vconsole from 'vconsole'; 
new Vconsole();

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Global);
Vue.use(Share);
Vue.use(Axios);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/images/smallCar_loading.png',
  loading: '../static/images/smallCar_loading.png',
  attempt: 1,
  listenEvents:[ 'scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove' ]

});
Vue.use(VueAwesomeSwiper);
Vue.use(VueScroller);

const router = new VueRouter({
  mode: 'history',
  routes
});
const store = new Vuex.Store({
  state: {
    count: 0
  }
});

router.afterEach(function () {
  
});
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
