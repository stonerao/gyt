<template>
  <div>
    <div class="top-head">
      <div class="title"><i class="icon-vertical"></i>地区：{{selectCity?selectCity.name:'未选择'}}</div>
      <button @click="submit">确认</button>
    </div>
    <div class="list bg-fff">
      <div class="provincial-item" v-for="item in data">
        <div class="provincial-name">{{item.name}}</div>
        <div class="city-list">
          <label class="city-item" v-for="city in item.cities" @click="change(city)">
            <input type="radio" name="1" class="radio-input" :checked="checked == city.id">
            <span class="radio-core"></span>
            <span class="city-name">{{city.name}}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from 'common/js/utils'

import dataStore from './js/data'

import 'common/css/global.css'

export default {
  data() {
    return {
      selectCity: utils.getLocation(),
      checked: 0,
      data: []
    }
  },
  created() {
    document.title = '选择城市'
    if(!utils.isEmptyObject(this.selectCity)) {
      this.checked = this.selectCity.id
    }
    this.getData()
  },
  methods: {
    getData() {
      dataStore.getData.call(this)
    },
    change(city) {
      this.selectCity = city
    },
    submit() {
      utils.setLocation(this.selectCity)
      let href = utils.getRequest(location.href)
      location.href = decodeURIComponent(href.parms['_'])
    }
  },
  components: {
  }
}
</script>
<style lang="css">
.list {
}
.provincial-item {
  font-size: 0.14rem;
  line-height: 2;
}
.provincial-item .provincial-name {
  padding: 0 0.15rem;
  display: block;
  background-color: #f5f5f5;
}
.provincial-item .city-list {
  padding: 0.05rem 0;
}
.provincial-item .city-list .city-item {
  display: block;
  padding: 0 0.15rem;
}
.provincial-item .city-list .radio-input {
  display: none;
}
.provincial-item .city-list .radio-core {
  position: relative;
  display: inline-block;
  width: 0.16rem;
  height: 0.16rem;
  background-color: #e5e5e5;
  border-radius: 50%;
  vertical-align: middle;
  margin-top: -0.04rem;
}
.provincial-item .city-list .radio-core:after {
  content: "";
  position: absolute;
  width: 0.08rem;
  height: 0.08rem;
  background-color: transparent;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 50%;
}
.provincial-item .city-list .radio-input:checked + .radio-core:after {
    background-color: #e22a4e;
}
</style>
