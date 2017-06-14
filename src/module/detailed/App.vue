<template>
  <div class="credit">
    <div class="top-head">
      <div class="title"><i class="icon-circle"></i>明细</div>
    </div>
    <div class="credit-list bg-fff">
    <div v-for="credit in credits">
      
    
      <div class="item">
        <div class="time">{{credit.lg_add_time}}</div>
        <div class="des">￥{{parseFloat(credit.lg_av_amount)}}</div>
       
      </div>
       <p style="font-size: 9px;color: #999; padding:.05rem .15rem;">{{credit.lg_desc}}</p>
      </div>
    </div>
    
  </div>
</template>
<script>
import utils from 'common/js/utils'
import dataStore from './js/data'
import 'common/css/global.css'

export default {
  data(){
    return{
      curpage:1,
      page:"20",
      credits:[],
      scrolled:false,
    }
  },
  methods: {
    handleScroll () {
      this.scrolled = window.scrollY > 0;
      if((document.body.clientHeight-window.screen.availHeight)==window.scrollY){
        this.curpage++;
        dataStore.data.call(this)
      }
    }
  },
  created(){
    dataStore.data.call(this)
    window.addEventListener('scroll', this.handleScroll);
  }
}
</script>
<style lang="css">
.credit-list .item {
  display: flex;
  padding: 0 0.15rem;
  color: #8d8d8d;
  line-height: 0.4rem;
  font-size: 0.12rem;
}
.credit-list .item .time {
  flex: 1;
}
.credit-list .item .des {
  flex: 1;
  text-align: right;
}
</style>
