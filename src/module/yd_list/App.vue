<template>
  <div class="ydt">
    <div class="">
      <div class="header">
        <div class="header_box" :class="index==1?'active':''" @click="activeIndex(1)">
          {{header.class}}<i></i>
        </div>
        <div class="header_box" :class="index==2?'active':''" @click="activeIndex(2)">
          {{header.area}}<i></i>
        </div>
        <div class="header_box" :class="index==3?'active':''" @click="activeIndex(3)">
          {{header.mo}}<i></i>
        </div>
        <div class="toggle">
          <!-- class -->
          <div class="yd_toggle" v-if="index==1">
            <ul>
              <li @click="check('','所有分类')">
                所有分类
              </li>
              <li v-for="item in listHeader.class_list" @click="check(item.class_id,item.class_name)">
                {{item.class_name}}
              </li>
            </ul>
          </div>
          <!-- 地址 -->
          <div class="yd_toggle" v-if="index==2">
            <ul>
              <li  @click="check('','全昆明')">
                全昆明
              </li>
              <li v-for="item in listHeader.area_list"  @click="check(item.area_id,item.area_name)">
                {{item.area_name}}
              </li>
            </ul>
          </div>
          <div class="yd_toggle" v-if="index==3">
            <ul>
              <li v-for="(item,index) in mo"  @click="check(index,item)">
                {{item}}
              </li>
            </ul>
          </div>
        </div>
      </div>


    </div>
    <div class="ydt_list">
      <div class="ydt_item" v-for="item in listHeader.places_list" :id="item.area_id">
        <div class="ydt_item_img" @click="url(item.places_id)">
          <img :src="item.places_pic" alt="">
        </div>
        <div class="ydt_item_content">
          <div class="ydt_item_title">
            <span>{{item.places_name}}</span>
            <img :src="item.is_recommend=='1'?img1:img2" alt="" @click="sou(item.is_recommend)">
          </div>
          <div class="ydt_item_text" @click="url(item.places_id)">
            <span>营业时间：{{item.open_times}}</span>
            <span><img src="../../common/images/ydt/icon-adr.png" alt="">200km</span>
          </div>
          <div class="ydt_item_adr" @click="url(item.places_id)">
            地址：{{item.places_address}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'common/css/reset.css'
import 'common/css/ydt.css'
import img from 'common/images/ydt/img3.png'
import xin from 'common/images/ydt/xin.png'
import xin1 from 'common/images/ydt/xin1.png'
import dataStore from './js/data.js'
export default {
  data(){
    return{
      img:img,
      img1:xin,
      img2:xin1,
      listHeader:[],
      items:[],
      index:0,
      header:{
        class:`所有分类`,
        area:`全昆明`,
        mo:`默认`
      },
      form:{
        places_class_id:``,
        area_id:``,
        other_id:``,
        curpage:1
      },
      mo:[`默认`,`距离`,`点击量`],
      hasmore:false
    }
  },
  methods: {
    activeIndex(num){
      // 列表显示中
      if(this.index==num){
        this.index=0;
        return;
      }
      this.index=num;
      if(num==1){
        // 点击分类
      }else if(num==2){
        // 点击地址
      }else if(num==3){
        // 点击默认
      }
    },
    check(id,name){
      // 当前点击的分类id
      console.log(id,name)
      let index = this.index;
      if(index==1){
        // 点击分类默认选项
        this.header.class=name;
        this.form.places_class_id = id;
      }else if(index==2){
        // 点击地址
        this.header.area=name;
        this.form.area_id = id;
      }else if(index==3){
        this.header.mo=name;
        this.form.other_id = id;
      }

      this.index=0;
      dataStore.data.call(this)
    },
    sou(num){
      //收藏

    },
    url(id){
      // 跳转
      window.location.href = `./yd_info.html?places_id=${id}`
    }
  },
  components: {

  },
  created(){
    dataStore.data.call(this)
    dataStore.page.call(this)
  },
  watch:{
    curpage(val){
      console.log(val)
      dataStore.data.call(this)
    }
  }
}
</script>
<style lang="css">
  body{
    background:#f2f2f2;
  }
</style>
