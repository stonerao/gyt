<template>
  <div>
    <div class="c-info bg-fff" v-if="info">
      <div class="c-name">{{info.nameCn}}</div>
      <div class="c-address">{{info.districtName}}</div>
      <div class="c-des">{{info.trafficRoutes}}</div>
      <div class="c-tag">
      <!--   <span>影城卡</span>
      <span>3D眼镜</span>
      <span>儿童优惠</span>
      <span>停车</span>
      <span>可刷卡</span>
      <span>WIFI</span> -->
            </div>
    </div>
    <div class="movie-list">
      <swiper :options="movieSildeOp" ref="swiperEl">
        <swiper-slide v-for="item in movies"><img class="block" v-lazy="item.img" @error="errorImg" data-size="210x270"></swiper-slide>
      </swiper>
    </div>
    <div class="movie-name bg-fff">{{active.name}}</div>
    <div class="tab">
      <swiper :options="dateSildeOp">
        <swiper-slide v-for="item in dateTime">
          <div class="tab-item" v-bind:class="{active:dateActive == item.id}" @click="changeDate(item.id)">{{item.name}}</div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="movie-prompt" v-if="showtimes && showtimes.length>0">温馨提示：开场15分钟前关闭在线售票</div>
    <div class="season-list bg-fff" v-if="showtimes && showtimes.length>0">
      <div class="item" v-for="item in showtimes">
        <div class="col">
          <div class="start-time">{{item.realTimename}}</div>
          <div class="end-time">{{item.longtime}}散场</div>
        </div>
        <div class="col">
          <div class="type">{{item.language}}&nbsp;{{item.version}}</div>
          <div class="loc">{{item.hallname}}</div>
        </div>
        <div class="col">
          <div class="o-price">￥{{item.exchange_price}}</div>
          <div class="c-price">原价￥{{item.oPrice}}</div>
        </div>
        <div class="col">
          <a v-if="item.status===0" @click="selectHerf(item.id,item.parms)" class="btn-buy">购票</a>
          <span v-else class="btn-buy">停止售票</span>
        </div>
      </div>
    </div>
      <div v-else class="no-more" > {{loading}} </div>
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
      dateTime.push(dateItem)
    }
    return {
      urls: utils.urls,
      movieSildeOp: {
        centeredSlides: true,
        slidesPerView: '5',
        slideToClickedSlide: true,
        onIint: (swiper)=> {
          swiper.slideTo(this.active)
        },
        onSlideChangeEnd: (swiper)=>{
          this.active = this.movies[swiper.activeIndex]
          dataStore.getShowtimes.call(this) 
        }
      },
      dateSildeOp: {
        slidesPerView: 'auto'
      },
      info: null,
      movies: [],
      active: {},
      dateTime: dateTime,
      dateActive: 0,
      showtimes: [],
      loading:"影院加载中，请稍后"
    }
  },
  created() {
    this.getData()
    
  },
  computed: {
    swiper() {
      return this.$refs.swiperEl.swiper
    }
  },
  methods: {
    getData() {
      dataStore.getInfo.call(this) 
      Promise.all([dataStore.getMovie.call(this)]).then(() => {
        dataStore.getShowtimes.call(this) 
      })
    },
    errorImg(e) {
      utils.errorImg(e)
    },
    changeDate(val) {
      this.dateActive = val
      dataStore.getShowtimes.call(this)
    },
    selectHerf(id,data){
      if (!utils.getLocationLogin().key && !utils.getLocationLogin().userid) {
        window.location.href = `${this.urls.loginUrl}?id=${id}&data=${data}`
      }else{ 
        window.location.href = `${this.urls.selectUrl}?id=${id}&data=${data}`
      }
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
  .c-info {
    padding:0.2rem 0.15rem;
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
    background-color: #f2f2f2;
    padding: 0.15rem 0.1rem;
    position: relative;
  }
  .movie-list:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -0.04rem;
    border-bottom: 0.08rem solid #fff;
    border-left: 0.08rem solid transparent;
    border-right: 0.08rem solid transparent;
  }
  .movie-list .swiper-slide {
    margin: 0 0.02rem;
    transform: scale(0.8,0.8);
  }
  .movie-list .swiper-slide.swiper-slide-active {
    transform: scale(1,1);
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
  .season-list {
  }
  .season-list .item {
    display: table;
    width: 100%;
    padding: 0.15rem 0;
    border-bottom: 0.01rem solid #e5e5e5;
    vertical-align: middle;
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
  }
  .season-list .item .end-time {
    color: #8d8d8d;
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
