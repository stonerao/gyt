import 'whatwg-fetch'
import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'

import loadingImg from 'common/images/loading-spin.svg'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  loading: loadingImg,
  listenEvents: [ 'scroll' ],
  adapter: {
    error(listender) {
      listender.el.src = 'http://placehold.it/' + listender.el.dataset.size + '/e2e2e2/999?text=暂无图片'
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
