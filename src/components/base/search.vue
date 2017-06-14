<template>
  <div class="search">
    <input type="text" :placeholder="placeholder">
    <button @click="submit"><i class="icon-search"></i></button>
  </div>
</template>
<script>
import utils from 'common/js/utils';
 export default {
  props: ['placeholder','href'],
  methods: {
    submit() {
      console.log(11)
    }
  }
}
</script>
<style lang="css" scoped>
 .search {
  display: flex;
  flex: 1;
  height: 0.35rem;
  background-color: #fff;
  border-radius: 0.35rem;
  overflow: hidden;
 }
 .search input {
  display: block;
  flex: 1;
  padding-left: 0.2rem;
  line-height: 0.35rem;
  font-size: 0.12rem;
 }
 .search button {
  display: block;
  width: 0.5rem;
  border: none;
  padding: 0;
  background-color: transparent;
  line-height: 0.35rem;
 }
</style>