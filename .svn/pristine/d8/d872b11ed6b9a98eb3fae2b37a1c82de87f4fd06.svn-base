<template>
	<div class="recall">
		<div class="recall-info">
			<ul class="recall-list">
				<li>
					<input type="password" name="" class="password select" placeholder="输入新密码" v-model="password">
				</li>
				<li>
					<input type="password" name="" class="password select" placeholder="确定密码" v-model="newPassword">
				</li>
				<li>
					<button class="recall-ok" @click="determine">确定</button>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	/*引入公共样式*/
	import 'common/css/global.css'
	import dataStore from './js/data'
	export default{
		data(){
			return{
				password:"",
				newPassword:"",
				phoneCode:""
			}
		},
		methods:{
			determine(){
				dataStore.data.call(this)
			}
		},
		created(){
			//获取手机号
			function GetRequest() { 
				var url = location.search; //获取url中"?"符后的字串 
				var theRequest = new Object(); 
				if (url.indexOf("?") != -1) { 
					var str = url.substr(1); 
					var strs = str.split("&"); 
					for(var i = 0; i < strs.length; i ++) { 
						theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
					} 
				} 
				return theRequest; 
			} 
			this.phoneCode = GetRequest().phone;
			
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
	.recall-list input,.recall-list button{
		height:.35rem;
		border-radius:0.15rem;
		border:0;
		border-radius:.4rem;
		margin-bottom:.10rem;
		background:#f4f4f4;
	}
	.recall-list .password{
		width:100%;
		text-indent:.2rem;
	}
	.recall-list .recall-ok{
		width:100%;
		background:#48cfae;
		color:#fff;
	}
	.recall-ok{
		font-size:.16rem;
		text-indent:.08rem;
		letter-spacing:.16rem;
	}
	
</style>