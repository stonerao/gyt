<template>
  <div class="star-wrap" v-bind:class="{white : type === 1}">
    <div class="star">
      <div class="star-percent" v-bind:style="{width:+width+'%'}"></div>
    </div><span>{{val>10?'10.0':val}}</span>
    <slot></slot>
  </div>
</template>

<script>
 export default {
  props: ['type','val'],
  data() {
    let width =  this.val*10%10>=5?(parseInt(this.val)+1)*10: parseInt(this.val)*10;
    if(width>100) width = 100
    return {
      width: width
    }
  }
 }
</script>

<style lang="css" scoped>
  .star-wrap {
    display: block;
    color: #b3b3b3;
    font-size: 0.12rem;
    overflow: hidden;
  }
  .star-wrap.white {
    color: #fff;
  }
  .star {
    width: 0.75rem;
    height: 0.15rem;
    float: left;
    background-image: url(./images/icon-star-1.png);
    background-repeat: repeat-x;
    background-size: auto 100%;
    background-position:left center;
    color: #b3b3b3;
    overflow: hidden;
  }
  .white .star {
    background-image: url(./images/icon-star-2.png);
  }
  .star-percent {
    height: 0.15rem;
    background-image: url(./images/icon-star-hover.png);
    background-position:left center;
    background-repeat: repeat-x;
    background-size: auto 100%;
  }
  .star-wrap span {
    display: block;
    float: left;
    margin-left: 0.05rem;
    line-height: 0.15rem;
  }
</style>