<template>
  <div>
    <div class="recharge">
      <div class="title">充值金额</div>
      <div class="money-list">
        <div v-for="(item,index) in data" class="item" @click="select(index)" v-bind:class="{checked: index == checked}">￥{{item}}</div>
      </div>
      <div class="orther">
        <input type="number" ref="input" placeholder="其他金额" @input="input" @focus="changeType(2)">
      </div>
      <div class="option">
        <button @click="rechargeBtn">确认充值</button>
      </div>
    </div>
  </div>
</template>
<script>
import utils from 'common/js/utils'

import 'common/css/global.css'
import dataStore from './js/data'

export default {
  data() {
    return {
     checked: 0,
     val: '50',//充值金额
     type: 1,
     data: [50,100,200,300,400,500,400,500]
    }
  },
  methods: {
    select(index) {
      this.changeType(1)
      this.$refs.input.value = ''
      this.checked = index
      this.val = this.data[index]
    },
    input(e) {
      this.val = e.target.value
    },
    changeType(type) {
      this.type = type
      if(type == 2) {
        this.checked = -1
      }
    },
    rechargeBtn(){
      if(this.val!=""){
        dataStore.data.call(this);
      }
    }

  },
  components: {
  }
}
</script>
<style lang="css">
html, body {
  background-color: #fff!important;
}
.recharge {
  padding: 0.15rem;
}
.recharge .title {
  font-size: 0.14rem;
  color: #000;
}
.money-list {
  margin-top: 0.1rem;
  overflow: hidden;
}
.money-list .item {
  display: block;
  width: 32%;
  margin-left: 2%;
  float: left;
  margin-bottom: 0.1rem;
  text-align: center;
  background-color: #f0f0f0;
  color: #adadad;
  font-size: 0.16rem;
  line-height: 0.4rem;
  border-radius: 0.05rem;

}
.money-list .item:nth-child(3n+1) {
  margin-left: 0;
}
.money-list .item.checked {
  background-color: #e22a4e;
  color: #fff;
}
.orther {
  margin: 0.15rem 0;
}
.orther input {
  display: block;
  width: 100%;
  padding: 0 0.1rem;
  border: 0.01rem solid #e5e5e5;
  color: #737373;
  line-height: 0.35rem;
  border-radius: 0.05rem;
  font-size: 0.12rem;
}
.option {
  text-align: center;
}
.option button {
  padding: 0 0.25rem;
  background-color: #48cfae;
  border: none;
  border-radius: 0.35rem;
  font-size: 0.16rem;
  color: #fff;
  line-height: 0.35rem;
}
</style>
