<template>
  <div class="fixed-footer person">
    <div class="person-head">
      <div class="person-info">
        <div class="pic">
          <img :src="head">
        </div>
        <div class="name">{{name}}</div>
      </div>
    </div>
    <list v-if="isState">
      <list-item :href="urls.orderUrl" title="我的订单" icon-class="icon-order"></list-item>
      <list-item :href="urls.balanceUrl" title="我的余额" icon-class="icon-money"></list-item>
      <list-item :href="urls.memberUrl" title="会员信息" icon-class="icon-tag"></list-item>
    </list>
    <list class="mt" v-if="isState">
      <list-item  :type="1" title="退出登录" icon-class="icon-off" href="#" @click="isOvers"></list-item>
    </list>
    <list class="mt" v-else>
      <list-item  :type="1" title="点击登录"  href="#" @click="login"></list-item>
    </list>
    <l-footer :active="2"></l-footer>
    <div class="back" :style="{display:isOver?'block':'none'}">
      <div class="alert-login">
       <p>  确定要退出？</p>
           <div>
             <button @click="cancel">取消</button>
             <button @click="over">退出</button>
           </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import LFooter from 'components/base/lfooter.vue'
import { List, ListItem } from 'components/base/list'

import 'common/css/global.css'
import utils from 'common/js/utils'
import dataStore from './js/data'

import headImg from './images/data/data2.jpg'

export default {
  data() {
    return {
      data: '',
      head: headImg,
      name: '请登录',
      urls:utils.urls,
      isLogin:false,
      isOver:false,//退出框
      isState:false,//登录状态
    }
  },
  methods:{
    isOvers(){
      this.isOver=true;
    },
    cancel(){
      this.isOver=false;
    },
    over(){
      utils.setLocationLogin("")
      window.location.href=this.urls.loginUrl
    },
    login(){
      window.location.href=this.urls.loginUrl
    }
  },
  components: {
    LFooter,List,ListItem 
  },
  created(){
    dataStore.data.call(this);
  }
}
</script>
<style lang="css">
  html,.person {
    background-color: #f2f2f2;
  }
  .person-head {
    position: relative;
    height: 2.5rem;
    background-image: url(./images/bg.jpg);
    background-size: 100% 100%;
    color: #ededed;
    line-height: 2;
    text-align: center;
  }
  .person-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .person-info .pic {
    width: 0.8rem;
    height: 0.8rem;
    border: 0.05rem solid rgba(255,255,255,0.4);
    border-radius: 50%;
    overflow: hidden;
  }
  .person-info .pic>img {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 50%;
  }
  .back{
    background:rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right:0;
  }
  .alert-login{
    padding-top:0.2rem;
    position: absolute;
    z-index: 5000;
    width: 85%;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background-color: #fff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
  }
  .alert-login p{
    font-size:0.16rem;
  }
  .alert-login button{
    width:50%;
    border:0; 
    float: left;
    background: #fff;
    bottom: 0;
    padding:.1rem 0;
    margin-top:0.2rem;
  }
</style>
