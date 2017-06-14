<template>
  <div class="balance bg-fff">
    <div class="top-head">
      <div class="title"><i class="icon-circle"></i>我的余额</div>
      <a :href="urls.detailedUrl" class="link">明细</a>
    </div>
    <div class="money">
      <div class="sub-title">我的余额（元）</div>
      <div class="money-numer">￥{{money}}</div>
    </div>
    <list>
      <list-item :href="urls.rechargeUrl" title="普通充值【微信支付充值】" icon-class="icon-recharge-general"></list-item>
      <list-item :href="urls.chargeUrl" title="充值卡充值" icon-class="icon-recharge-card"></list-item>
      <list-item :href="urls.creditUrl" title="充值记录" icon-class="icon-wallet"></list-item>
    </list>
  </div>
</template>
<script>
import utils from 'common/js/utils'
import { List, ListItem } from 'components/base/list'
import dataStore from './js/data'

import 'common/css/global.css'

export default {
  data(){
    return{
      urls:utils.urls,
      money:""
    }
  },
  methods: {
  },
  components: {
    List, ListItem 
  },
  created(){
    dataStore.data.call(this)
  }
}
</script>
<style lang="css">
.balance {
}
.money {
  padding: 0.15rem;
  background-color: #48cfae;
  color: #fff;
  line-height: 1.5;
}
.money .sub-title {
  font-size: 0.14rem;
}
.money .money-numer {
  font-size: 0.24rem;
}
</style>
