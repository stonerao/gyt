<template>
  <ul class="list">
		<slot></slot>
  </ul>
</template>
<style scoped>
	.list {
		background-color: #fff;
	}
	.list.border {
		position: relative;
	}
	.list.border:before, .list.border:after {
		position: absolute;
    content: "";
    left: 0.1rem;
    right: 0;
    height: 0;
    border-top: 1px solid #f5f5f5;
	}
	.list.border:before {
    top: 0;
	}
	.list.border:after {
    bottom: 0;
	}
</style>