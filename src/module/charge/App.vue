<template>
	<div class="charge">
		<div class="chage-info">
			<ul class="charge-list">
				<li>
					充值卡号 :
					<input type="text" name="" v-model="number">
				</li>
				<li>
					输入密码 :
					<input type="password" name="" v-model="password">
				</li>
			</ul>
			<button class="charge-ok" @click="charge">确定充值</button>
		</div>
		<span class="modal-box" v-show="regs.isFous">{{regs.reg_html}}</span>
	</div>
</template>
<script>
	/*引入公共样式*/
	import 'common/css/global.css'
	import dataStore from './js/data'
	export default{
		data(){
			return{
				number:"",
				password:"",
				regs:{
					isFous:false,
					reg_html:""
				}
			}
		},
		methods:{
			charge(){
				dataStore.data.call(this)
				
			}
		},
		created(){
			this.number="";
			this.password="";

		}
	}
</script>
<style type="text/css">
	.chage-info{
		position:relative;
	}
	.charge-list>li{
		height:0.6rem;
		line-height:0.6rem;
		padding-left:0.15rem;
		background:#fff;
		margin-bottom:0.025rem;
		font-size:.14rem;
	}
	.charge-ok{
		background:#48cfae;
		border-radius:0.15rem;
		border:0;
		width:1.3rem;
		height:0.35rem;
		color:#fff;
		position:relative;
		left: 50%;
		margin-top:0.475rem;
		transform: translate(-50%,0);
		font-size:.16rem;
	}
	.charge-list input{
		width: 50%;
	}

</style>