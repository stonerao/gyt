<template>
    <a :href="url">{{city.name?city.name:'未选择'}}</a>
</template>
<script>
  import utils from 'common/js/utils';
  import locationData from './js/location';
 export default {
  data() {
    return {
      url:'',
      city: utils.getLocation()
    }
  },
  created() {
    let dir = utils.getRequest(utils.urls.cityUrl)
    let index = location.href
    this.url = dir.href + '?_=' +encodeURIComponent(index) + (!utils.isEmptyObject(dir.parms)? '&'+utils.serialize(dir.parms):'')
    if(!this.city.id) {
      locationData.data.call(this)
    }
  }
}
</script>
<style lang="css" scoped>
  a {
    position: relative;
    display: block;
    margin: 0 0.1rem; 
    padding-right: 0.22rem;
    color: #000;
    font-size: 0.15rem;
    line-height: 0.35rem;
  }
  a:before,a:after {
    content: "";
    position: absolute;
    top: 52%;
    transform: translateY(-50%);
    border-radius: 50%;
  }
  a:before {
    width: 0.16rem;
    height: 0.16rem;
    background-color: #e5e5e5;
    right: 0;
  }
  a:after {
    width: 0.08rem;
    height: 0.08rem;
    right: 0.04rem;
    background-color: #e22a4e;
  }
</style>