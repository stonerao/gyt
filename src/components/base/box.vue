<template>
  <div class="box">
    <a v-if="type==='link'" :href="href" class="box-title">{{title}}</a>
    <div v-else class="box-title">{{title}}</div>
    <div class="box-body">
			<slot></slot>
    </div>
  </div>
</template>

<script>
 export default {
  props: ['type','title', 'href']
 }
</script>

<style lang="css" scoped>
.box {
  padding: 0 0.15rem;
  background-color: #fff;
}
.box.border-top {
  border-top: 0.02rem solid #f2f2f2;
}
.box-title {
  display: block;
  height: 0.45rem;
  font-size: 0.15rem;
  line-height: 0.45rem;
  color: #000;
}

a.box-title {
  position: relative;
  padding-right: 0.15rem;
}

a.box-title:after {
  content: "";
  position: absolute;
  top: 50%;
  right: 0.05rem;
  width: 0.1rem;
  height: 0.1rem;
  margin-top: -0.05rem;
  border-top: 0.01rem solid #dbdadd;
  border-right: 0.01rem solid #dbdadd;
  transform: rotate(45deg);
}

</style>