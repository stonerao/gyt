<template>
  <div class="ydt">
    <div class="header">
      <div class="header_box">
        所有分类<i></i>
      </div>
      <div class="header_box active">
        全昆明<i></i>
      </div>
      <div class="header_box">
        默认<i></i>
      </div>
    </div>
    <div class="ydt_list">
      <div class="ydt_item" v-for="item in 10">
        <div class="ydt_item_img">
          <img :src="img" alt="">
        </div>
        <div class="ydt_item_content">
          <div class="ydt_item_title">
            <span>某某体育馆</span>
            <img :src="img1" alt="">
          </div>
          <div class="ydt_item_text">
            <span>营业时间：8:00-23:00</span>
            <span><img src="../../common/images/ydt/icon-adr.png" alt="">200km</span>
          </div>
          <div class="ydt_item_adr">
            地址：四川省成都市锦江路四段399号1098号四川省 
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
export default {
  data(){
    return{
      img:img,
      img1:xin
    }
  },
  methods: {
  },
  components: {
   
  },
  created(){
    
  }
}
</script>
<style lang="css">
  body{
    background:#f2f2f2; 
  }
</style>
