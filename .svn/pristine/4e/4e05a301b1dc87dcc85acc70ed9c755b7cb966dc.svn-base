<template>
  <div class="tab">
    <slot></slot>
  </div>
</template>
<style scoped> 
	.tab {
		display: flex;
		background-color: #fff;
		height: 0.4rem;
		line-height: 0.4rem;
	}
	.tab.scroll {
		overflow-y: visible;
		overflow-x: auto;
	}
	.tab .tab-item {
		display: block;
		flex: 1;
		height: 0.4rem;
		font-size: 0.15rem;
		color: #7b7b7b;
		border-bottom: 0.02rem solid transparent;
		text-align: center;
	}
	.tab.scroll .tab-item {
		flex: none;
		margin: 0 2%;
		width: 21%;
		font-size: 0.12rem;
	}
	.tab .tab-item.active {
		color: #48cfae;
		border-bottom: 0.02rem solid #48cfae;
	}
</style>