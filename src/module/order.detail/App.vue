<template>
  <div class="order-detail bg-fff">
    <div class="order-info">
      <div class="order-no">订单号：{{infos.order_sn}}</div>
      <div class="name">{{infos.goods_name}}</div>
      <div class="address">{{infos.cinema_name}} {{infos.cinemahalls}} {{infos.seats_name}}</div>
      <div class="number">购票{{infos.goods_num}}张</div>
      <div class="money">订单金额：￥{{infos.order_amount}}</div>
      <div class="time">订单日期：{{infos.add_time}}</div>
    </div>
    <div class="top-head">
      <div class="title"><span>订单状态</span></div>
      <span class="status">{{infos.order_state_text}}</span>
    </div>
    <div class="detail">
      <div class="title">订单明细</div>
      <div class="item">
        <span class="label">订单号</span>
        <span>：{{infos.order_sn}}</span>
      </div>
      <div class="item">
        <span class="label">数量</span>
        <span>：{{infos.goods_num}}张</span>
      </div>
      <div class="item">
        <span class="label">消费金额</span>
        <span>：￥{{parseFloat(o_price).toFixed(2)<0?"0":parseFloat(o_price).toFixed(2)}}</span>
      </div>
     
    </div>
      <div class="redeem-code">
        电影兑换码: {{infos.vr_code}}
      </div>
  <button v-if="order_state=='10'" class="btn_pay" @click="submit">立即支付</button>
  </div>
</template>
<script>
import utils from 'common/js/utils'

import 'common/css/global.css'
import dataStore from './js/data'
export default {
  data(){
    return {
      good_id:"",
      infos:{},
      o_price:"1",
      order_state:"",
      order_sn:""
    }
  },
  methods: {
    submit(){
        let key = utils.getLocationLogin().key;  
        location.href = utils.dataUrl.weixinUrl + "&key=" + key + "&order_sn=" +this.order_sn + "&payment_code=wxpay_jsapi";
    }
  },
  created(){
     
    function GetRequest() { 
        var url = location.search; //获取url中"?"符后的字串 
        var theRequest = new Object(); 
        if (url.indexOf("?") != -1) { 
          var str = url.substr(1); 
          var strs = str.split("&"); 
          for(var i = 0; i < strs.length; i ++) { 
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
          } 
        } 
        return theRequest; 
      } 
      this.good_id = GetRequest().good_id;
      console.log(this.good_id)
      dataStore.data.call(this)
      



  }


}
</script>
<style lang="css">
.order-detail {
  color: #737373;
}
.order-info {
  padding: 0.15rem;
  border-bottom: 0.02rem solid #f2f2f2;
  font-size: 0.12rem;
  line-height: 1.5;
}
.order-info .order-no,
.order-info .name {
  font-size: 0.14rem;
  color: #737373;
}
.detail {
  padding: 0.1rem 0.15rem;
}
.detail .title {
  font-size: 0.15rem;
  color: #48cfae;
  line-height: 2.5;
  border-bottom: 0.01rem solid #f2f2f2;
}
.detail .item {
  display: flex;
  font-size: 0.14rem;
  line-height: 3;
}
.detail .item .label {
  display: block;
  width: 0.6rem; 
  text-align:justify;
  text-align-last:justify;
}
.detail .item span {
  display: flex;
}
.redeem-code {
  padding: 0.2rem 0.15rem;
  border-top: 0.01rem solid #f2f2f2;
}
.btn_pay{
  position:fixed;
  border:0;
  background:#48cfae;
  color:#fff;
  width:100%;
  height:0.4rem;
  bottom:0;
}
</style>
