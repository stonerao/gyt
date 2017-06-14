<template>
	<div class="member">
		<ul class="member-list">
			<li class="member-my"><img :src="imgIcon" alt="">我的信息</li>
			<li class="member-name"><span><img :src="head" alt=""></span>{{name}}</li>
			<li class="member-pass">
				<ul>
					<li class="list-head">
						<div>
							<span class="ico-left buld">修改登录密码</span>
							<img :src="imgBtn" alt="" class="imgBtn" :style="{transform:passWord?'rotate(180deg)':'rotate(0deg)'}" @click="passWords">
						</div>
					</li>
					<li :style="{display:passWord?'none':'block'}">
						<input type="password" name="" placeholder="输入当前密码" v-model="member_passwd">
					</li>
					<li :style="{display:passWord?'none':'block'}">
						<input type="password" name="" placeholder="输入新密码" v-model="member_newpwd">
					</li>
				</ul>
			</li>
			<li class="member-pass border-bot">
				<ul>
					<li class="list-pay">
						<div >
							<span class="ico-left gren">修改支付密码</span>
							<img :src="imgBtn" alt="" class="imgBtn" :style="{transform:payPass?'rotate(180deg)':'rotate(0deg)'}" @click="payPasss">
						</div>
					</li>
					<li :style="{display:payPass?'none':'block'}">
						<input type="password" name="" placeholder="输入当前密码" v-model="pay_passwd">
					</li>
					<li :style="{display:payPass?'none':'block'}">
						<input type="password" name="" placeholder="输入新支付密码" v-model="pay_newpwd">
					</li>
				</ul>
			</li>

		</ul>
		<button class="charge-ok" @click="memberOk">确定</button>
		<p class="explain">说明：支付密码用于余额支付，支付密码默认为登陆密码。</p>
		<span class="modal-box" v-show="regs.isFous">{{regs.reg_html}}</span>
	</div>
</template>
<script>
	/*引入公共样式*/
	import 'common/css/global.css'
	import img1 from './images/icon-head.png'
	import img2 from './images/icon-portrait.png'
	import img3 from './images/icon-bottom.png'
	import dataStore from './js/data'

	export default {
		data() {
			return {
				imgIcon: img1,
				imgHead: img2,
				imgBtn: img3,
				passWord: false,
				payPass: false,
				member_passwd: "",
				member_newpwd: "",
				pay_passwd: "",
				pay_newpwd: "",
				name:"",
				head:"",
				regs:{
					isFous:false,
					reg_html:""
				}

			}
		},
		methods: {
			passWords() {
				this.passWord = !this.passWord;
			},
			payPasss() {
				this.payPass = !this.payPass;
			},
			memberOk() {
				dataStore.data.call(this);
			}
		},
		created(){
			dataStore.info.call(this)
		}

	}
</script>
<style type="text/css">
	html,.member{
		background:#f2f2f2;
	}
	.member-list>li{
		padding:0 0.15rem;
		background:#fff;
	}

	.member-my{
		height:0.55rem;
		border-bottom:0.02rem solid #f2f2f2;
		font-size:0.15rem;
		line-height:0.55rem;
		
	}
	.member-my img{
		height:0.16rem;
		margin-top:0.06rem;
		margin-right:.08rem;
		position:relative;
		top:0.01rem;
	}
	.member-name{
		height:0.6rem;
		margin-bottom:0.01rem;
		font-size:0.12rem;
		line-height:0.6rem;
	}
	.member-name img{
		height:0.4rem;
		position:relative;
		top:50%;
		margin-right:.1rem;
		transform: translate(0,-50%);
		border-radius: 50%;
	}
	.member-pass{
	
		border-bottom:0.01rem solid #f2f2f2;
	}
	.list-head{
		height:0.37rem;
		line-height:0.37rem;
		padding-top:0.06rem;
		position: relative;
	}
	.list-head>div{
		padding-left:0.05rem;
		padding-bottom:0.05rem;
		
	}
	.list-pay{
		height:0.37rem;
		padding-top:0.06rem;
		line-height:0.37rem;
		position: relative;
	}
	.list-pay>div{
		padding-left:0.05rem;
		padding-bottom:0.05rem;
		
	}

	.member-pass input{
		height:0.35rem;
		background:#f3f3f3;
		width:100%;
		text-indent:0.05rem;
	}
	.member-pass input:nth-child(1){
		margin-bottom:0.05rem;
		margin-top: 0.01rem;
	}
	.explain{
		font-size: 0.11rem;
		padding:0 0.15rem;
		margin-top:0.26rem;
	}
	.ico-left:after{
		content: "";
		position:absolute;
		left:0;
		width:0.02rem;
		height:0.12rem;
		top:50%;
		border-left:0.02rem solid;			
	}
	.buld:after{
		border-color: #48cfae;
	}
	.gren:after{
		border-color: #5d9cec;
	}
	.imgBtn{
		width:0.12rem;
		height: 0.06rem;
		position:absolute;
		right:0.1rem;
		top:50%;

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
		margin-top:0.235rem;
		transform: translate(-50%,0);
		font-size:.16rem;
	}
</style>