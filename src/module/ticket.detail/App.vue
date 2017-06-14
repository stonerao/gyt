<template>
  <div class="fixed-footer">
    <div class="movie-info" v-if="data">
      <div class="pic"><img :src="data.img" @error="errorImg" data-size="210x270"></div>
      <div class="info">
        <div class="name">{{data.name}}</div>
        <star :val="6.5" :type="1"><span>（8888人评）</span></star>
        <div class="des">{{ data.types }} <br> {{data.state}} | {{data.length}} <br> 2016-12-23 在中国大陆上映</div>
      </div>
    </div><!-- 
    <div class="movie-option">
      <a href=""><i class="icon-msg"></i> 评论</a>
    </div> -->
    <div class="movie-des" v-if="data.plot">
      <p>{{des}}</p>
      <span v-if="!desShow" v-on:click="showDes">展开</span>
      <span v-else class="down" v-on:click="showDes">隐藏</span>
    </div>

    <box title="演职人员" class="border-top">
      <div class="actor-list" v-bind:class="{show:actorsShow}">
        <div class="item" v-for="item in actors">
          <div class="pic"><img v-lazy="item.img"></div>
          <div class="info">
            <div class="name">{{item.name}}</div>
            <div class="job">{{item.job}}</div>
          </div>
        </div>
      </div>
      <div class="actor-show" v-on:click="showActor"><span v-if="!actorsShow">查看</span><span v-else>隐藏</span>全部35位演职人员</div>
    </box>
    <box type="link" title="影评列表（93）" class="border-top" href="">
      <div class="commit">
        <div class="commit-list">
          <div class="item" v-for="item in commitL">
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
    </box>
    <a class="seat" href="">在线选座</a>
  </div>
</template>
<script>
import utils from 'common/js/utils'
import Star from 'components/base/star'
import Box from 'components/base/box.vue'

import dataStore from './js/data'

import 'common/css/global.css'

import image1 from './images/data/data1.jpg'
import image2 from './images/data/data2.jpg'
import image3 from './images/data/data3.jpg'
import image4 from './images/data/data4.jpg'
import image5 from './images/data/data5.jpg'

export default {
  data() {
    return {
      data: {},
      actors: [
      {name: '张家伟', job: '导演', img: image1},
      {name: '梁朝伟', job: '饰 陈末', img: image2},
      {name: '金城武', job: '饰 管春', img: image3},
      {name: '陈奕迅', job: '饰 马力', img: image4},
      {name: '张家伟', job: '导演', img: image1},
      {name: '梁朝伟', job: '饰 陈末', img: image2},
      {name: '金城武', job: '饰 管春', img: image3},
      {name: '陈奕迅', job: '饰 马力', img: image4},
      {name: '张家伟', job: '导演', img: image1},
      {name: '梁朝伟', job: '饰 陈末', img: image2},
      {name: '金城武', job: '饰 管春', img: image3},
      {name: '陈奕迅', job: '饰 马力', img: image4}
      ],
      commitL: [{img:image5,name:'暂代名暂代名',mark:6.5,content:'多个撕心裂肺爱情故事的大拼盘，时尚又奢侈。以夸张、搞笑的手法描摹调侃当代都市人爱而不得的伤心', time:'2016-09-29  16:32:46'},{img:image5,name:'暂代名暂代名',mark:6.5,content:'多个撕心裂肺爱情故事的大拼盘，时尚又奢侈。以夸张、搞笑的手法描摹调侃当代都市人爱而不得的伤心', time:'2016-09-29  16:32:46'},{img:image5,name:'暂代名暂代名',mark:6.5,content:'多个撕心裂肺爱情故事的大拼盘，时尚又奢侈。以夸张、搞笑的手法描摹调侃当代都市人爱而不得的伤心', time:'2016-09-29  16:32:46'}],
      des: '',
      desShow: false,
      actorsShow: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      dataStore.getData.call(this)
    },
    errorImg(e) {
      utils.errorImg(e)
    },
    showActor() {
      this.actorsShow = !this.actorsShow
    },
    showDes() {
      this.desShow = !this.desShow
      if(this.desShow) {
        this.des = this.data.plot
      } else {
        this.des = this.data.plot.substr(0,100)+'...'
      }
    }
  },
  components: {
    Star,Box
  }
}
</script>
<style lang="css">
.movie-info {
  display: flex;
  padding: 0.2rem 0.15rem 0;
  background-color: #707e7b;
  color: #fff;
}
.movie-info .pic {
  display: block;
  width: 0.86rem;
  height: 1.1rem;
  position: relative;
  overflow: hidden;
}
.movie-info .pic>img {
  position: absolute;
  left: 50%;
  top: 50%;
  display: block;
  width: 100%;
  transform: translate(-50%, -50%);
}
.movie-info .info {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0.15rem;
  font-size: 0.12rem;
}
.movie-info .info .name {
  font-size: 0.16rem;
}
.movie-info .info .des {
  display: flex;
  flex: 1;
  align-items:flex-end;
  padding-bottom: 0.1rem;
}
.movie-option {
  display: flex;
  margin-top: 0.15rem;
  padding: 0 0.15rem;
}
.movie-option>a {
  display: block;
  flex: 1;
  margin: 0 0.05rem;
  background-color: #f4f4f4;
  border-radius: 0.05rem;
  text-align: center;
  font-size: 0.12rem;
  color: #000;
  line-height: 2.2;
}
.movie-des {
  padding: 0.15rem;
  color: #8d8d8d;
  font-size: 0.12rem;
  line-height: 1.8;
  overflow: hidden;
}
.movie-des>span {
  display: block;
  margin: 0.1rem 0;
  color: #48cfae;
  font-size: 0.12rem;
  padding-bottom: 0.1rem;
  text-align: center;
  position: relative;
}
.movie-des>span:after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0.01rem;
  display: block;
  width: 0.08rem;
  height: 0.08rem;
  margin-left: -0.04rem;
  border-left: 0.01rem solid #b2b2b8;
  border-bottom: 0.01rem solid #b2b2b8;
  transform: rotate(-45deg);
}
.movie-des>span.down:after {
  transform: rotate(135deg);
}
.actor-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  height: 1.3rem;
  overflow: hidden;
}
.actor-list.show {
  height: auto;
}
.actor-list .item {
  display: block;
  flex: 0 0 23%;
  margin-bottom: 0.05rem;
  overflow: hidden;
}
.actor-list .item .pic {
  position: relative;
  width: 100%;
  min-height: 0.7rem;
  background-color: #e2e2e2;
}
.actor-list .item .pic>img {
  display: block;
  width: 100%;
}
.actor-list .item .info {
  font-size: 0.12rem;
  text-align: center;
  padding: 0.04rem;
}
.actor-list .item .info .job {
  color: #8d8d8d;
}
.actor-show {
  margin: 0.05rem 0;
  font-size: 0.12rem;
  color: #48cfae;
  text-align: center;
  line-height: 2;
}
.commit {
  border-top: 0.01rem solid #ccc;
}
.seat {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #48cfae;
  font-size: 0.14rem;
  color: #fff;
  text-align: center;
  line-height: 0.4rem;
}
</style>
