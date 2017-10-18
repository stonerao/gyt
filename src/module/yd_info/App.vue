<template>
  <div class="ydt">

      <div class="ydt_info">
        <div class="ydt_item_img">
          <img :src="places_info.places_pic" alt="">
        </div>
        <div class="ydt_item_content">
          <div class="ydt_item_title">
            <span>{{places_info.places_name}}</span>
            <img :src="img1" alt="" v-if="places_info.is_recommend==1">
          </div>
          <div class="ydt_item_text">
            <span>营业时间：{{places_info.open_times}}</span>
          </div>
          <div class="ydt_item_adr">
            地址：{{places_info.places_address}}
          </div>
          <div class="ydt_nav_adr">
            <img src="../../common/images/ydt/navdao.png" alt=""  @click="nav">
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
      <div class="ydt_check" @click="booked">
        <span>场馆预订</span>
        <span class="hui">></span>
      </div>
      <div class="alert" v-show="alert" id="alert" @click="alertClick">
        <div class="bookeds">
          <div class="booked-item" @click="booked">
            <a :href="`tel:${places_info.book_phone}`">场馆预订:<img src="./images/call.png">{{places_info.book_phone}}</a>
          </div>
          <div class="booked-item" @click="booked">
            <a :href="`tel:${places_info.admin_phone}`">平台电话:<img src="./images/call.png">{{places_info.admin_phone}}</a>
          </div>
        </div>
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
      alert:false,

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
    },
    booked(){
      this.alert = !this.alert;
    },
    alertClick(e){
      e=e.target;
      if(e.id=="alert"){
        this.alert = !this.alert;
      }
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
  .alert{
    position:fixed;
    top:0;
    right:0;
    left:0;
    bottom:0;
    background:rgba(0,0,0,.5);
    transition:all .5s;
  }
  .bookeds{
    background:#fff;
    width:90%;
    border-radius:5px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
  }
  .bookeds .booked-item{
    height:1.2rem;
    line-height:1.2rem;
    vertical-align:middle;
    text-align:center;
  }
  .bookeds .booked-item:first-child{
    border-bottom:0.01rem solid #ededed;
  }
  .bookeds .booked-item a{
    color:#444;
    display:block;
     vertical-align:middle;
    text-decoration:none;
  }
  .bookeds .booked-item img{
    height:0.5rem;
    line-height:1.2rem;
    margin:0 0.05rem;
    position:relative;
    top:0.1rem;
  }
</style>
