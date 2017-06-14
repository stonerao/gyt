<template>
  <div class="fixed-footer">
    <div class="page-head">
      <location class="location" :id="1"></location>
      <div class="page-tab">
        <a href="ticket.html">影片</a>
        <a href="cinema.html" class="active">影院</a>
      </div>
    </div>
    <!-- <tab>
      <tab-item :active="true">全部</tab-item>
      <tab-item>附近</tab-item>
    </tab> -->
    <a href="" class="ad"><img :src="ad" alt=""></a>
    <div class="c-list bg-fff">
      <a :href="urls.cinemaDetailUrl+'?id='+item.id" class="c-item" v-for="item in data">
        <div class="name">{{item.name}}</div>
        <div class="address">{{item.address}}</div>
        <div class="distance" v-if="item.dis>=0">距离此处：{{item.dis}}</div>
      </a>
    </div>
    <l-footer :active="1"></l-footer>
  </div>
</template>
<script>
import LFooter from 'components/base/lfooter.vue'
import Location from 'components/base/location.vue'
import { Tab, TabItem, TabContain } from 'components/base/tab'

import utils from 'common/js/utils'
import dataStore from './js/data'

import 'common/css/global.css'

import image4 from './images/data/data4.jpg'

export default {
  data() {
    return {
      urls: utils.urls,
      data: [],
      ad: image4
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      dataStore.getData.call(this)
    }
  },
  components: {
    LFooter,Location,Tab, TabItem, TabContain
  }
}
</script>
<style lang="css">

</style>
