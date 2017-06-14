<template>
  <div class="fixed-footer">
    <div class="page-head">
      <location class="location" :id="1"></location>
      <div class="page-tab">
        <a :href="urls.ticketUrl" class="active">影片</a>
        <a :href="urls.cinemaUrl">影院</a>
      </div>
    </div><!-- 
    <tab>
      <tab-item :active="true">热映中</tab-item>
      <tab-item >待上映</tab-item>
      <tab-item >已下线</tab-item>
    </tab> -->
    <a href="" class="ad"><img :src="ad" @error="errorImg" data-size="690x120"></a>
    <div class="m-list">
      <div class="m-item" v-for="item in data">
        <a :href="urls.cinemaInfoUrl+'?goods_id='+item.id" class="pic">
          <img v-lazy="item.image" data-size="210x270">
        </a>
        <div class="info">
          <div class="top">
            <a :href="urls.cinemaInfoUrl+'?goods_id='+item.id" class="name">{{item.name}}</a>
            <star :val="item.mark"></star>
          </div>
          <div class="bottom">
            <div class="des">
              <span v-if="item.directors">导演：</span>{{item.directors}}<br><span v-if="item.actors">主演：</span>{{item.actors}}
            </div>
            <a :href="urls.cinemaInfoUrl+'?goods_id='+item.id" class="m-buy">购票</a>
          </div>
        </div>
      </div>
    </div>
    <l-footer :active="1"></l-footer>
  </div>
</template>
<script>
import utils from 'common/js/utils'
import LFooter from 'components/base/lfooter.vue'
import Location from 'components/base/location.vue'
import Star from 'components/base/star'
import { Tab, TabItem, TabContain } from 'components/base/tab'

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
    },
    errorImg(e) {
      utils.errorImg(e)
    }
  },
  components: {
    LFooter,Location, Star,Tab, TabItem, TabContain
  }
}
</script>
<style lang="css">

</style>
