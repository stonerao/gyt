<template>
  <div class="ydt">

      <div class="ydt_info">
        <div class="ydt_item_img">
          <img :src="places_info.places_info" alt="">
        </div>
        <div class="ydt_item_content">
          <div class="ydt_item_title">
            <span>{{places_info.places_name}}</span>
            <img :src="img1" alt="" @click="nav">
          </div>
          <div class="ydt_item_text">
            <span>营业时间：{{places_info.open_times}}</span>
          </div>
          <div class="ydt_item_adr">
            地址：{{places_info.places_address}}
          </div>
          <div class="ydt_nav_adr">
            <img src="../../common/images/ydt/navdao.png" alt="">
          </div>
        </div>
      </div>
      <div class="ydt_info_js">
        <div class="ydt_title">
          场馆介绍
        </div>
        <div class="ydt_info_text" :style="{'height':toggle?'auto':''}" >
          <div v-html="places_info.places_descript">

          </div>
        </div>
        <div class="ydt_info_toggle">
          <div class="ydt_info_box" @click="toggle_click">
            <div>
              {{toggleText}}
            </div>
            <img src="../../common/images/ydt/x2.png" alt="">
          </div>
        </div>
      </div>
      <div class="ydt_check">
        <span>场馆预定</span>
        <span class="hui">></span>
      </div>
  </div>
</template>
<script>
import 'common/css/reset.css'
import utils from 'common/js/utils'
import 'common/css/ydt.css'
import img from 'common/images/ydt/img3.png'
import xin from 'common/images/ydt/xin3.png'
import dataStore from './js/data.js'
export default {
  data(){
    return{
      img:img,
      img1:xin,
      toggle:false,
      toggleText:`展开`,
      parms:{},
      places_info:{},//info
    }
  },
  methods: {
    toggle_click(){
      console.log()
      this.toggle = !this.toggle;
      if(this.toggle){
        this.toggleText='收回'
      }else{
        this.toggleText='展开'
      }
    },
    nav(){
      // 导航
      window.location.href = `http://apis.map.qq.com/tools/routeplan/eword=${this.places_info.places_address}&epointx=${this.places_info.places_latitude}&epointy=${this.places_info.places_longitude}?referer=myapp&key=WIWBZ-G5MHS-UYJO7-6PC5I-WPX3F-7KFPO`;
    }
  },
  components: {

  },
  created(){
    // 跳转过来的参数
    this.parms =  utils.getRequest().parms;
    // ajax
    dataStore.data.call(this)
  },
  mounted(){
    console.log()
  }
}
</script>
<style lang="css">
  body{
    background:#f2f2f2;
  }
</style>
