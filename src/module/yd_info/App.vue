<template>
  <div class="ydt">
     
      <div class="ydt_info">
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
             
          </div>
          <div class="ydt_item_adr">
            地址：四川省成都市锦江路四段399号1098号四川省 
          </div>
          <div class="ydt_nav_adr">
            <img src="../../common/images/ydt/navdao.png" alt="">
          </div>
        </div>
      </div>
      <div class="ydt_info_js">
        <div class="ydt_title">
          场馆介绍
        </div>
        <div class="ydt_info_text" :style="{'height':toggle?'auto':''}">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum eos quia, sed ullam illum vel vero ipsa accusantium vitae odit possimus recusandae excepturi facere voluptas exercitationem at, reiciendis optio consectetur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum eos quia, sed ullam illum vel vero ipsa accusantium vitae odit possimus recusandae excepturi facere voluptas exercitationem at, reiciendis optio consectetur.
        </div>
        <div class="ydt_info_toggle">
          <div class="ydt_info_box" @click="toggle_click">
            <div>
              {{toggleText}}
            </div>
            <img src="../../common/images/ydt/x2.png" alt="">
          </div>
        </div>
      </div>
      <div class="ydt_check">
        <span>场馆预定</span>
        <span class="hui">></span>
      </div>
  </div>
</template>
<script>
import 'common/css/reset.css'
import 'common/css/ydt.css'
import img from 'common/images/ydt/img3.png'
import xin from 'common/images/ydt/xin3.png'
export default {
  data(){
    return{
      img:img,
      img1:xin,
      toggle:false,
      toggleText:`展开`
    }
  },
  methods: {
    toggle_click(){
      console.log()
      this.toggle = !this.toggle;
      if(this.toggle){
        this.toggleText='收回'
      }else{
        this.toggleText='展开'
      }
    }
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
