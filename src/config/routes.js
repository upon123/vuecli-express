import App from '../App'
import buycar from '../page/buy/buycar.vue';
import cardetail from '../page/buy/car-detail.vue';
import activitydetail from '../page/buy/activity-detail.vue';
import audiBactivity from '../page/interact/audiBactivity.vue';


export default [{
  path: '/',
  component: App,
  children: [{
    path: '',
    redirect: '/audiBactivity'
  }, {
    path: '/buycar',
    component: buycar
  }, {
    path: '/cardetail',
    component: cardetail
  }, {
    path: '/activitydetail',
    component: activitydetail
  }]
}];