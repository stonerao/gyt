<template>
	<div class="recall">
		<div class="recall-info">
			<ul class="recall-list">
				<li>
					<input type="text" name="" class="username select" placeholder="用户名/手机号码/邮箱" v-model="phoneCode">
				</li>
				<li>
					<input type="text" name="" class="codeword select" placeholder="请输入验证码" v-model="mathCode">
					<img :src="imgSrc" class="inp code" @click="mathCo">
				</li>
				<li>
					<input type="text" name="" class="codeword select" placeholder="请输入手机验证码" v-model="codeWord">
					<button class="inp getPassword" @click="verification" >获取验证码</button>
				</li>
				<li>
					<button class="recall-ok" @click="determine">确定</button>
				</li>
			</ul>

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
			return {
				math:"",//验证
				mathCode:"",//验证码
				phoneCode:"",//手机
				codeWord:"",//手机验证码
				imgSrc:"",
				regs:{
					isFous:false,
					reg_html:""
				}
			}
		},
		methods:{
			//发送验证码
			verification(){
				// dataStore.captcha.call(this);//验证验证码
				dataStore.data.call(this);//手机号码
				
			},
			determine(){
				//验证码是否正确
				// if(this.math==this.mathCode){
				// 	this.codes.codekey
				// }
				dataStore.determineUrl.call(this)
			},
			mathCo(){
				dataStore.mathCode.call(this)
			}
		},
		created(){
			dataStore.mathCode.call(this);//哈希值
			// dataStore.data.call(this);//手机

		
		}
	}
</script>
<style type="text/css">
	html,.recall{
		background:#fff;
		padding-top:.3rem;
		position:fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
	}
	.recall-list{
		width:84%;
		margin:0 auto;
	}
	.recall-list input,.recall-list button,.inp{
		height:.35rem;
		border-radius:0.15rem;
		border:0;
		border-radius:.4rem;
		margin-bottom:.10rem;
	}
	.recall-list .username{
		width:100%;
	}
	.recall-list .codeword{
		width:59%;
	}
	.recall-list .select{
		background:#f4f4f4;
		line-height:.35rem;
		text-indent:.2rem;
	}
	.recall-list .code{
		text-align:center;
		line-height:.35rem;
		background:#e3e3e3;
	}
	.recall-list .inp{
		width:39%;
		float:right;
	}
	.recall-list .getPassword{
		background:#ff3366;
		color:#fff;
	}
	.recall-list .recall-ok{
		width:100%;
		background:#48cfae;
		color:#fff;
		margin-top:.29rem;
	}
	.recall-ok{
		font-size:.16rem;
		text-indent:.08rem;
		letter-spacing:.16rem;
	}
</style>