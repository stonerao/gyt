<template>
  <div>
    <!-- <div class="c-info bg-fff" v-if="info">
      <div class="c-name">{{info.nameCn}}</div>
      <div class="c-address">{{info.districtName}}</div>
      <div class="c-des">{{info.trafficRoutes}}</div>
      <div class="c-tag">
    </div> -->
    <div class="movie-list">
        <img :src="filmData.img" @error="errorImg" data-size="210x270">
        <ul class="info-Ulist">
         <li class="info-list">{{filmData.titleCn}}</li>
         <li class="info-list">{{type}}</li>
         <li class="info-list">{{filmData.state}}{{filmData.length}}</li>
         <li class="info-list" @click="plot">{{filmData.plot}} </li> 
       </ul>
    </div>
    <!-- <div class="movie-name bg-fff">{{active.name}}</div> -->
    <div class="tab">
      <swiper :options="dateSildeOp">
        <swiper-slide v-for="item in dateTime">
          <div class="tab-item" v-bind:class="{active:dateActive == item.id}" @click="changeDate(item.id,item.val)">{{item.name}}</div>
        </swiper-slide>
      </swiper>
    </div>
    
    <div class="season-list bg-fff" v-if="showtimes && showtimes.length>0">
      <div class="item" v-for="item in showtimes">
        <div class="col">
          <div class="start-time">{{item.name}}</div>
          <div class="end-time">{{item.address}}</div>
        </div>
        <div class="col">
          <a :href="urls.cinemaDetailUrl+'?id='+item.id + '&movieId='+good_id" class="btn-buy">购票</a>
        </div>
      </div>
    </div>
      <div v-else class="no-more"> {{loading}} </div>
      <div class="polat" v-if="isPlot" @click="plot">{{filmData.plot}}</div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Tab, TabItem, TabContain } from 'components/base/tab'

import utils from 'common/js/utils'
import dataStore from './js/data'

import 'common/css/global.css'

export default {
  data() {
    let dateTime = [];
    let week = ['周日','周一','周二','周三','周四','周五','周六']
    let tody = Date.now();
    var date,y,m,d,dateItem;
    for(let i=0; i<5;i++) {
      date = new Date(tody + i*24*60*60*1000)
      y = date.getFullYear()
      m = date.getMonth()+1
      d = date.getDate()
      dateItem = {
        id: i,
        name: (i === 0?'今天': i === 1 ? '明天' : i === 2?'后天' : week[date.getDay()]) +' '+ (m>9?m:'0'+m) + '-' +(d>9?d:'0'+d),
        val: '' + y + '-' + (m>9?m:'0'+m) + '-' +(d>9?d:'0'+d)
      }
      dateTime.push(dateItem);
    }
    return {
      urls: utils.urls,
      movieSildeOp: {
        centeredSlides: true,
        slidesPerView: 5,
        slideToClickedSlide: true,
        onSlideChangeEnd: (swiper)=>{
          this.active = this.movies[swiper.activeIndex]
          dataStore.getShowtimes.call(this) 
        }
      },
      dateSildeOp: {
        slidesPerView: 'auto', 
      },
      info: null,
      type: '',
      movies: [],
      active: {},
      dateTime: dateTime,
      dateActive: 0,
      good_id:"",
      timeDate:"",
      showtimes: [],
      filmData:{},
      isPlot:false,
      loading:"影院加载中，请稍后",
    }
  },
  created() {
    dataStore.get_wxopenid.call(this);//地方信息
    function GetRequest() {
      var url = location.search; //获取url中"?"符后的字串 
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      return theRequest;
    }
    this.good_id = GetRequest().goods_id;
    this.timeDate = this.dateTime[0].val;
    dataStore.getDate.call(this);//电影信息
    dataStore.getInfo.call(this);//地方信息
  },
  methods: {
    errorImg(e) {
      utils.errorImg(e)
    },
    changeDate(val,name) {
      this.dateActive = val;
      this.timeDate = name;
      dataStore.getInfo.call(this)
    },
    plot(num){
        this.isPlot=!this.isPlot;
    }
  },
  components: {
    swiper, swiperSlide,Location,Tab, TabItem, TabContain
  }
}
</script>
<style lang="css">
  html,body {
    background-color: #fff;
  }
  .polat{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background-color:rgba(0,0,0,0.8);
    z-index:10000;
    line-height:0.28rem;
    color:#fff;
    padding:1.5rem 0.5rem;
  }
  .c-info {
    padding:0.0rem 0.15rem 0.2rem 0.15rem;
    line-height: 1.5;
  }
  .c-info .c-name {
    font-size: 0.16rem;
    color: #000;
  }
  .c-info .c-address {
    font-size: 0.14rem;
    color: #8d8d8d;
  }
  .c-info .c-des {
    color: #8d8d8d;
    font-size: 0.12rem;
  }
  .c-info .c-tag {
    margin-top: 0.1rem;
  }
  .c-info .c-tag>span {
    display: inline-block;
    margin: 0.02rem;
    min-width: 0.65rem;
    border: 0.01rem solid #48cfae;
    border-radius: 0.2rem;
    color: #48cfae;
    font-size: 0.12rem;
    line-height: 0.2rem;
    text-align: center;
  }
  .movie-list {
    height:1.3rem;
    background:#707e7b;
    overflow: hidden;
    font-size:0.14rem;
    padding: 0.2rem 0.15rem 0.15rem 0.15rem;
  }
  .movie-list .swiper-slide {
    transform: scale(0.8);
  }
  .movie-list .swiper-slide.swiper-slide-active {
    transform: scale(1);
  }
  .movie-name {
    border-bottom: 0.01rem solid #e5e5e5; 
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.16rem;
  }
  .movie-prompt {
    padding: 0 0.15rem;
    background-color: #ecf6f4;
    line-height: 0.3rem;
    font-size: 0.12rem;
  }
  .movie-list img{
    width:0.86rem;
    float: left;
  }
  .info-Ulist{
    margin-left:0.15rem;
    color:#fff;
    padding-top:0.1rem;
    width:65%;
    float:left;
  }
  .movie-list .info-list{
    line-height:.2rem;
  }
  .movie-list .info-list:nth-child(1){
    font-size:0.14rem;
  }
  .movie-list .info-list:nth-child(2),.movie-list .info-list:nth-child(4){
    height:0.2rem;
    line-height:0.2rem;
    font-size:0.12rem;
    overflow: hidden;
　  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .movie-list .info-list:nth-child(3){
    font-size:0.12rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }  

  .season-list {
  }
  .season-list .item {
    display: table;
    width: 100%;
    padding: 0.15rem 0;
    border-bottom: 0.01rem solid #e5e5e5;
    vertical-align: middle;
    position:relative;
  }
  .season-list .item .col {
    display: table-cell;
    padding: 0 0.1rem;
    text-align: left;
    vertical-align: bottom;
    font-size: 0.12rem;
  }
  .season-list .item .start-time {
    font-size: 0.18rem;
    color: #000;
    max-width:2.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .season-list .item .end-time {
    color: #8d8d8d;
    max-width:2.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .season-list .item .type {
    color: #000;
  }
  .season-list .item .loc {
    color: #8d8d8d;
  }
  .season-list .item .o-price {
    color: #ff3366;
    font-size: 0.14rem;
  }
  .season-list .item .c-price {
    color: #8d8d8d;
  }
  .season-list .item .btn-buy {
    display: inline-block;
    padding: 0.02rem 0.06rem;
    border-radius: 0.05rem;
  }
  .season-list .item a.btn-buy {
    border: 0.01rem solid #48cfae;
    color: #48cfae;
    transform: translate(0,-50%);
    position:absolute;
    right:0.06rem;
    top:50%;

  }
  .season-list .item span.btn-buy {
    border: 0.01rem solid #8d8d8d;
    color: #8d8d8d;
  }
  .tab {
    background-color: #fff;
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .tab .swiper-slide {
    display: inline-block;
    width: auto;
  }
  .tab .tab-item {
    display: inline-block;
    margin: 0 0.1rem;
    height: 0.4rem;
    font-size: 0.12rem;
    color: #7b7b7b;
    border-bottom: 0.02rem solid transparent;
    text-align: center;
  }
  .tab .tab-item.active {
    color: #48cfae;
    border-bottom: 0.02rem solid #48cfae;
  }
  .no-more {
    margin: 0.1rem 0;
    color: #999;
    text-align: center;
    background-color: #fefefe;
    line-height: 1rem;
  }
 
  </style>
