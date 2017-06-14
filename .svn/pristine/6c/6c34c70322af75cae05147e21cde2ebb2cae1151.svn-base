<template>
  <footer>
    <a :href="urls.homeUrl" v-bind:class="{active : active === 0}"><i v-bind:class="active === 0 ? 'icon-home-active' : 'icon-home'"></i> 首页</a>
    <a :href="urls.ticketUrl" v-bind:class="{active : active === 1}"><i v-bind:class="active === 1 ?'icon-shopcar-active':'icon-shopcar'"></i> 购票</a>
    <a :href="urls.personUrl" v-bind:class="{active : active === 2}"><i v-bind:class="active === 2 ? 'icon-user-active' :'icon-user'"></i> 我的</a>
  </footer>
</template>

<script>
import utils from 'common/js/utils';
export default {
  props: ['active'],
  data() {
    return {
      urls: utils.urls
    }
  }
}
</script>
<style lang="css" scoped>
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 0.4rem;
    box-sizing: content-box;
    background-color: #fefefe;
    border-top: 0.01rem solid #f2f2f2;
    z-index:5000;
  }
  footer a {
    position: relative;
    display: block;
    flex: 1;
    color: #000;
    font-size: 0.15rem;
    line-height: 0.4rem;
    text-align: center;
  }
  footer a + a:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    height: 0.15rem;
    width: 0.01rem;
    background-color: #b5b5b5;
  }
  footer a.active,footer a:active {
    color: #e22a4e;
  }
</style>