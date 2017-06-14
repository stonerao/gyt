import 'whatwg-fetch'
import Vue from 'vue'
import App from './App'
import VueTouch from 'vue-touch'

VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})
Vue.use(VueTouch)

new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
})
