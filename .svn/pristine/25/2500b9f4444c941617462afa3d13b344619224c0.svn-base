<template>
  <div class="tab-item" v-bind:class="{active: active}" v-on:click="click">
    <slot></slot>
  </div>
</template>
<script>
	export default {
		props: {
			active: {
				type: Boolean
			}
		},
		methods: {
			click() {
      	this.$emit('click', this)
			}
		}
	}
</script>