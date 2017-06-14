<template>
  <div class="fixed-footer">
    <div class="index-wrap">
      <location class="location"></location>
      <div class="title">观影通</div>
    </div>
    <swiper :options="{autoplay:5000,pagination : '.swiper-pagination',loop: true}">
      <swiper-slide v-for="item in banners"><img class="block" :src="item" @error="errorImg" data-size="750x260"></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <box type="link" title="正在热映" :href="urls.ticketUrl">
      <div class="movie m-hot">
        <div class="m-item" v-for="item in hots">
        <span class="mark">{{item.mark}}</span>
          <a :href="urls.cinemaInfoUrl+'?goods_id='+item.id" class="pic"><img v-lazy="item.image" data-size="210x270"></a>
          <div class="info"><div class="name">{{item.name}}</div><a :href="urls.cinemaInfoUrl+'?goods_id='+item.id" class="m-buy" >购票</a></div>
        </div>
      </div>
    </box>
    <div class="index-wrap">
      <a href="" class="ad"><img :src="ad" @error="errorImg" data-size="690x120"></a>
    </div>
    <box type="link" title="即将上映" href="" v-if="comming">
      <div class="movie m-comming">
        <div class="m-item" v-for="item in comming">
          <a href="" class="pic"><img v-lazy="item.image" data-size="210x270"></a>
          <div class="info"><div class="name">{{item.name}}</div></div>
        </div>
      </div>
    </box>
    <l-footer :active="0"></l-footer>
  </div>
</template>
<script>

import utils from 'common/js/utils'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
import LFooter from 'components/base/lfooter.vue'
import Location from 'components/base/location.vue'
import Search from 'components/base/search.vue'
import Box from 'components/base/box.vue'

import 'common/css/global.css'

import dataStore from './js/data'

export default {
  data() {
    return {
      urls: utils.urls,
      city: null,
      banners: [],
      hots: [],
      comming: null,
      ad: null
    }
  },
  created() {
    dataStore.data.call(this)
    dataStore.getBanner.call(this)
  },
  methods: {
    errorImg(e) {
      utils.errorImg(e)
    }
  },
  components: {
    swiper, swiperSlide, LFooter, Location, Search,Box
  }
  
}
</script>
<style lang="css">
.index-wrap {
  display: flex;
  padding: 0.05rem 0.15rem;
  background-color: #fff;
  position: relative;
  border-bottom: 0.01rem solid #ededed;
}
.index-wrap .title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  line-height: 0.35rem;
  text-align: center;
  font-size: 0.16rem;
}
</style>
