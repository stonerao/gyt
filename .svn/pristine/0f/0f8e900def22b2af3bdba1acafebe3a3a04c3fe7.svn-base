<template>
  <li>
		<a :href="href" v-if="type===1" class="list-item" @click="click">
			<div class="list-item-title right-icon">{{title}} <i :class="[iconClass]"></i></div>
		</a>
		<a :href="href" v-else class="list-item" @click="click">
			<div class="list-item-title"><i :class="[iconClass]"></i>{{title}}</div>
			<i></i>
		</a>
  </li>
</template>
<script>
	export default {
		props: ['href','type','title','iconClass'],
		methods: {
			click() {
      	this.$emit('click',this)
			}
		}
	}
</script>
<style scoped>
	li {
		position: relative;
	}
	li + li:before {
		position: absolute;
    content: "";
    left: 0.1rem;
    right: 0;
    top: 0;
    height: 0;
    border-top: 1px solid #f2f2f2;
	}
	.list-item {
		display: flex;
		box-sizing: border-box;
		height: 0.6rem;
		padding: 0 0.15rem;
    align-items: center;
	}
	.list-item-title {
		flex: 1;
		color: #000;
		font-size: 0.15rem;
		line-height: 0.6rem;
		padding-left: 0.4rem;
	}
	.list-item-title.right-icon {
		padding-left: 0;
		padding-right: 0.4rem;
	}
	.list-item-title>i {
		position: absolute;
		top: 50%;
		left: 0.15rem;
		right: auto;
		transform: translateY(-50%);
	}
	.list-item-title.right-icon>i {
		left: auto;
		right: 0.15rem;
	}
	.list-item>i {
		width: 0.12rem;
		height: 0.12rem;
		border-top: 1px solid #dbdadd;
		border-right: 1px solid #dbdadd;
		transform: rotate(45deg);
	}
</style>