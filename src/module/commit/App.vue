<template>
  <div>
    <div class="top-head">
      <div class="title"><i class="icon-vertical"></i>摆渡人影评列表<span>（199条影评）</span></div>
    </div>
    <div class="commit bg-fff">
      <div class="commit-list">
        <div class="item" v-for="item in data">
          <div class="head">
            <div class="head-img"><img :src="item.img"></div>
            <div class="head-name">{{item.name}}</div>
            <div class="head-star"><star :val="item.mark"></star></div>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="time">{{item.time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from 'common/js/utils'
import Star from 'components/base/star'

import 'common/css/global.css'

import image5 from './images/data/data5.jpg'

export default {
  data() {
    return {
      data: [{img:image5,name:'暂代名暂代名',mark:6.5,content:'多个撕心裂肺爱情故事的大拼盘，时尚又奢侈。以夸张、搞笑的手法描摹调侃当代都市人爱而不得的伤心', time:'2016-09-29  16:32:46'},{img:image5,name:'暂代名暂代名',mark:6.5,content:'多个撕心裂肺爱情故事的大拼盘，时尚又奢侈。以夸张、搞笑的手法描摹调侃当代都市人爱而不得的伤心', time:'2016-09-29  16:32:46'},{img:image5,name:'暂代名暂代名',mark:'10.0',content:'多个撕心裂肺爱情故事的大拼盘，时尚又奢侈。以夸张、搞笑的手法描摹调侃当代都市人爱而不得的伤心', time:'2016-09-29  16:32:46'}]
    }
  },
  methods: {
    errorImg(e) {
      utils.errorImg(e)
    }
  },
  components: {
    Star
  }
}
</script>
<style lang="css">
.commit {
  padding: 0 0.15rem;
}
</style>
