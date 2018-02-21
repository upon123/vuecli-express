import App from '../App'
import buycar from '../page/buy/buycar.vue';
import cardetail from '../page/buy/car-detail.vue';
import paychoose from '../page/pay/pay-choose.vue';
import paysuccess from '../page/pay/pay-success.vue';
import paydefeated from '../page/pay/pay-defeated.vue';
import advancedfilter from '../components/advanced-filter.vue';
import confirmorder from '../page/pay/confirm-order.vue';
import searchscreen from '../page/search/search-screen.vue';
import coupon from '../page/coupon/coupon.vue';
import dealer from '../page/dealer/dealer.vue';
import map from '../page/dealer/map.vue';
import dealerhome from '../page/dealer/dealer-home.vue';
import maphome from '../page/dealer/map-home.vue';
import concernshop from '../page/our/concern-shop.vue';
import version from '../page/our/version.vue';
import carGift from '../components/carGift.vue';
import sellCar from '../page/sell/sell-car.vue';
import collect from '../page/our/collect.vue';
import keymessage from '../page/interact/a-key-message.vue';
import order from '../page/our/order.vue';
import assessmentonline from '../page/sell/assessment-online.vue';
import assessment from '../page/sell/assessment.vue';
import orderdetail from '../page/our/order-detail.vue';
import confirmchitorder from '../page/pay/confirm-chitorder.vue';
import confirmgrouporder from '../page/pay/confirm-grouporder.vue';
import activitydetail from '../page/buy/activity-detail.vue';
import chitdetail from '../page/buy/chit-detail.vue';
import groupdetail from '../page/buy/group-detail.vue';
import ordernone from '../page/our/order-none.vue';
import our from '../page/our/our.vue';
import collectgroupby from '../page/our/collect-group-by.vue';
import collectcar from '../page/our/collect-car.vue';
import collectchit from '../page/our/collect-chit.vue';
import collectactivity from '../page/our/collect-activity.vue';
import dealerlist from '../page/list/dealer-list.vue';
import activitylist from '../page/list/activity-list.vue';
import questionlist from '../page/list/question-list.vue';
import choosequestion from '../page/interact/choose-question.vue';
import interact from '../page/interact/interact.vue';
import articledetail from '../page/interact/article-detail.vue';
import carEncyclopedia from '../page/interact/car-Encyclopedia.vue';
import cyclopediawork from '../page/interact/cyclopedia-work.vue';
import carEncyclopediadetail from '../page/interact/car-Encyclopedia-detail.vue';
import carEncyclopedialist from '../page/list/car-Encyclopedia-list.vue';
import set from '../page/our/set.vue';
import putTheCarWork from '../page/interact/putTheCarWork.vue';
import cycloPediaDetail from '../page/interact/cyclopedia-detail.vue';
import articlereview from '../page/list/article-review.vue';
import choosecoupon from '../page/our/choose-coupon.vue';
import star from '../components/star.vue';
import searchshoose from '../page/interact/search-shoose.vue';
import findcar from '../page/buy/findcar.vue';
import sharecar from '../page/share/sharecar.vue';
import shareactivity from '../page/share/shareactivity.vue';
import sharechit from '../page/share/sharechit.vue';
import sharegroup from '../page/share/sharegroup.vue';
import shareEncyclopedia from '../page/share/shareEncyclopedia.vue';
import sharethecarwork from '../page/share/sharethecarwork.vue';
import sharekeymessage from '../page/share/shareakeymessage.vue';
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
  }, {
    path: '/chitdetail',
    component: chitdetail
  }, {
    path: '/groupdetail',
    component: groupdetail
  }, {
    path: '/paychoose',
    component: paychoose
  }, {
    path: '/paysuccess',
    component: paysuccess
  }, {
    path: '/paydefeated',
    component: paydefeated
  }, {
    path: '/advancedfilter',
    component: advancedfilter
  }, {
    path: '/confirmorder',
    component: confirmorder
  }, {
    path: '/confirmchitorder',
    component: confirmchitorder
  }, {
    path: '/confirmgrouporder',
    component: confirmgrouporder
  }, {
    path: '/searchscreen',
    component: searchscreen
  }, {
    path: '/coupon',
    component: coupon
  }, {
    path: '/dealer',
    component: dealer
  }, {
    path: '/map',
    component: map
  }, {
    path: '/dealerhome',
    component: dealerhome
  }, {
    path: '/maphome',
    component: maphome
  }, {
    path: '/concernshop',
    component: concernshop
  }, {
    path: '/articledetail',
    component: articledetail
  }, {
    path: '/cyclopediawork',
    component: cyclopediawork
  }, {
    path: '/cycloPediaDetail',
    component: cycloPediaDetail
  }, {
    path: '/version',
    component: version
  }, {
    path: '/sharecar',
    component: sharecar
  }, {
    path: '/shareactivity',
    component: shareactivity
  }, {
    path: '/sharechit',
    component: sharechit
  }, {
    path: '/sharegroup',
    component: sharegroup
  }, {
    path: '/shareEncyclopedia',
    component: shareEncyclopedia
  }, {
    path: '/sharethecarwork',
    component: sharethecarwork
  }, {
    path: '/sharekeymessage',
    component: sharekeymessage
  }, {
    path: '/carGift',
    component: carGift
  }, {
    path: '/sellCar',
    component: sellCar
  }, {
    path: '/collect',
    component: collect
  }, {
    path: '/keymessage',
    component: keymessage
  }, {
    path: '/order',
    component: order
  }, {
    path: '/assessmentonline',
    component: assessmentonline
  }, {
    path: '/assessment',
    component: assessment
  }, {
    path: '/orderdetail',
    component: orderdetail
  }, {
    path: '/ordernone',
    component: ordernone
  }, {
    path: '/our',
    component: our
  }, {
    path: '/collectgroupby',
    component: collectgroupby
  }, {
    path: '/collectcar',
    component: collectcar
  }, {
    path: '/collectchit',
    component: collectchit
  }, {
    path: '/collectactivity',
    component: collectactivity
  }, {
    path: '/dealerlist',
    component: dealerlist
  }, {
    path: '/activitylist',
    component: activitylist
  }, {
    path: '/questionlist',
    component: questionlist
  }, {
    path: '/choosequestion',
    component: choosequestion
  }, {
    path: '/interact',
    component: interact
  }, {
    path: '/carEncyclopedia',
    component: carEncyclopedia
  }, {
    path: '/carEncyclopediadetail',
    component: carEncyclopediadetail
  }, {
    path: '/carEncyclopedialist',
    component: carEncyclopedialist
  }, {
    path: '/set',
    component: set
  }, {
    path: '/putTheCarWork',
    component: putTheCarWork
  }, {
    path: '/articlereview',
    component: articlereview
  }, {
    path: '/choosecoupon',
    component: choosecoupon
  }, {
    path: '/star',
    component: star
  }, {
    path: '/searchshoose',
    component: searchshoose
  }, {
    path: '/findcar',
    component: findcar
  }, {
    path: '/audiBactivity',
    component: audiBactivity
  }, ]
}];