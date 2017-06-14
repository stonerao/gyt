<template>
  <div class="fixed-footer">
    <div class="order bg-fff">
      <div class="top-head">
        <div class="title"><i class="icon-circle"></i>我的订单</div>
      </div>
      <div class="order-list">
        
        <a class="item" v-for="info in infoData" :id="info.order_id" @click="order_info(info.order_id)">
          <div class="pic">
            <img :src="info.goods_image">
          </div>
          <div class="info">
            <div class="top">
              <div>订单号：{{info.order_sn}}</div>
              <div>{{info.goods_name}}</div>
            </div>
            <div class="bottom">
              <div>购票{{info.goods_num}}张</div>
              <div>订单金额：￥{{info.order_amount}}</div>
              <div></div>
            </div>
          </div>
        </a>
      </div>
    </div>
    <l-footer :active="2"></l-footer>
  </div>
</template>
<script>
import utils from 'common/js/utils'
import LFooter from 'components/base/lfooter.vue'

import 'common/css/global.css'
import dataStore from './js/data'

import image1 from './images/data/data1.jpg'

export default {
  data() {
    return {
      data: {img:image1},
      infoData:[],
      good_id:"",
      curpage:"1",
      page:"10",
    }
  },
  methods: {
    order_info(order_id){
      this.good_id = order_id
      dataStore.order_info.call(this);
      console.log(order_id)
    },
    handleScroll () {
      this.scrolled = window.scrollY > 0;
      if((document.body.clientHeight-window.screen.availHeight)==window.scrollY){
        this.curpage++;
        dataStore.data.call(this)
      }
    }        
  },
  components: {
    LFooter
  },
  created(){
    dataStore.data.call(this);
    window.addEventListener('scroll', this.handleScroll);
  }
}
</script>
<style lang="css">
.order-list {
  
}
.order-list .item {
  display: flex;
  padding: 0.2rem 0.15rem;
  border-bottom: 0.01rem solid #f2f2f2;
}
.order-list .item .pic {
  display: block;
  width: 0.86rem;
  height: 1.1rem;
  position: relative;
  overflow: hidden;
}
.order-list .item .pic>img {
  position: absolute;
  left: 50%;
  top: 50%;
  display: block;
  width: 100%;
  transform: translate(-50%, -50%);
}
.order-list .item .info {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 0.1rem;
  color: #737373;
}
.order-list .item .info .top {
  flex: 1;
  font-size: 0.14rem;
}
.order-list .item .info .bottom {
  font-size: 0.12rem;
}
.order-list .item .info .status {
  color: #48cfae;
}
</style>
