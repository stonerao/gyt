<template>
	<div class="confirm">
		<div class="con-info">
			<ul >
				<li class="info-list">{{parmsData.movie.name}}</li>
				<li class="info-list">{{parmsData.cinema.name}} {{parmsData.showtime.hallname}}</li>
				<li class="info-list">{{parmsData.time}}</li>
				<li class="info-list"><span v-for="item in parmsData.selectData">{{item.name}}</span></li>
			</ul>
		</div>
		<div class="con-price">
			<span>票价总计</span>
			<span class="con-money">￥{{price}}</span>
		</div>
		
		<div class="con-pay">
			<p class="con-pay-head">支付方式</p>
			<div class="pay-info">
				<p class="pay-info-head">
					<span class="weixin" @click="vouchers('wx')" :class="{'active':isVout}">余额</span>
					<!-- <span @click="changeDeduction('isVout')">蓝券<img :src="img1" alt="" class="imgBtn" :style="{transform:isDeduction&&isVout?'rotate(180deg)':'rotate(0deg)'}"></span> -->
				</p>
				<!-- <ul class="pay-input" v-show="isDeduction && isVout">
					<li v-if="!goMoney"> 
						<input type="text" v-model="discountVal" placeholder="请输入抵扣券密码">
						<button @click="getDiscount">确定</button>
					</li>
					<li v-else> 
						<span>-{{goMoney}}</span>
					</li>
				</ul> -->
			</div>
			<div class="pay-info">
				<p class="pay-info-head">
					<span class="weixin" @click="vouchers('ye')" :class="{'active':isVouts}" >蓝券（微信）</span>
					<!-- <span @click="changeDeduction('isVouts')">蓝券<img :src="img1" alt="" class="imgBtn" :style="{transform:isDeduction&& isVouts?'rotate(180deg)':'rotate(0deg)'}"></span> -->
					<span @click="getDiscount" v-show="isDeduction && isVouts" style="float:right ">确定</span>
					<span @click="increase(1)" v-show="isDeduction && isVouts" class="quan_btns">增加<!-- <img :src="img1" alt="" class="imgBtn"> --></span>
				</p>
				<ul class="pay-input" v-show="isDeduction && isVouts">
					<li v-if="!goMoney" v-for="item in buldMoney" style="margin-bottom:5px"> 
						<!-- <input type="text" v-model="discountVal" placeholder="请输入蓝券密码"> -->
						<input type="text" v-model="item.title" placeholder="请输入蓝券密码"  class="pay-input-tong">
						
					</li>
					<li v-else> 
						<span>-{{goMoney}}</span>
					</li>
				</ul>
				<div class="con-price_1" v-if="isVouts">
					<p>1、您可直接使用微信钱包进行支付</p>
					<p>2、如果您有蓝券，欢迎输入蓝券密码，享受订票优惠</p>
				</div>
			</div>
			<div class="pay-info">
				<p class="pay-info-head">
					<span class="weixin" @click="vouchers('pay')" :class="{'active':isPay}" >橙券</span>
					<span @click="getRedQuan" v-show="isPay" >确定</span>
					<span @click="increase(2)" v-show="isPay" class="quan_btns">增加<!-- <img :src="img1" alt="" class="imgBtn"> --></span>
				</p>
				<ul class="pay-input" v-show="isPay">
					<li v-if="!goPayMoney" v-for="item in redMoney"  style="margin-bottom:5px"> 
						<input type="text" v-model="item.title" placeholder="请输入橙券密码" class="pay-input-tong">
					</li>
					<li v-else> 
						<span>-{{goPayMoney}}</span>
					</li>
				</ul>
			</div>
			<div class="pay-info">
				<p class="pay-info-head">
					<span class="weixin" @click="vouchers('tong')" :class="{'active':isTong}" >通联支付</span>
					<span @click="increase(3)" v-show="isTong">确认<!-- <img :src="img1" alt="" class="imgBtn"> --></span>
				</p>
				<ul class="pay-input" v-show="isTong">
					<li v-if="!goPayMoney"   style="margin-bottom:5px"> 
						<input type="text" v-model="tongMoney.user" placeholder="请输入通联券账号" class="pay-input-tong">
					</li>
					<li v-if="!goPayMoney"  style="margin-bottom:5px"> 
						<input type="text" v-model="tongMoney.pwd" placeholder="请输入通联密码" class="pay-input-tong">
					</li> 
				</ul>
			</div>
			<div class="pay-info">
				<p class="pay-info-head">
					<span class="weixin" @click="vouchers('weixin')" :class="{'active':isWeixin}" >微信支付</span> 
				</p> 
			</div>
		</div>
		<div class="con-price">
			<span class="pay-color-gre">应付金额</span>
			<span class="con-money">￥{{lastPrice<0?"0":lastPrice}}</span>
		</div>
		<div class="price-ok" @click="submit">确认支付</div>
		<span class="modal-box" v-show="regs.isFous">{{regs.reg_html}}</span>
		<div class="loading_pay" v-if="loading_pay">
			<p>正在支付中，请稍等!</p>
		</div>
	</div>
</template>
<script>
	/*引入公共样式*/
	import image1 from './images/icon-bottom.png'
	import 'common/css/global.css' 
	import utils from 'common/js/utils' 
	import confirmStore from './js/data' 
	export default{
		data(){
			return{
				infos:{name:"摆渡人",address:"太平洋影城（春熙店）二楼10号厅",time:"今天01-03   20：10（国语2D）",seat:"4排5坐 4排6坐"},
				isVout:false,
				isVouts:false,
				isPay:false,
				isDeduction: false,
				img1:image1,
				isText:true,
				isWeixin:false,
				isTong:false,
				price: 0,
				discountVal: '',
				payVal:'',
				discount: 0,
				lastPrice: 0,
				parmsData: null,
				goMoney: 0,
				goPayMoney: 0,
				password:"",
				regs:{
					isFous:false,
					reg_html:""
				},
				loading_pay:false,
				buldMoney:[
					{title:''}
				],
				redMoney:[
					{title:''}
				],tongMoney:{user:'',pwd:''},
				export_price:''

			}
		},
		created() {
			this.parmsData = JSON.parse(decodeURIComponent(utils.getRequest().parms.data))
			this.price = (this.parmsData.showtime.exchange_price * this.parmsData.selectData.length/100).toFixed(2);
			this.export_price = parseFloat(parseFloat(this.parmsData.showtime.exchange_price/100).toFixed(2));// 
			console.log(this.export_price)
			this.lastPrice = (this.price - this.discount).toFixed(2)
		},
		methods:{
			submit() {
				this.loading_pay=true;
				// buld
				this.getVals();
				confirmStore.order.call(this);
			},
			changeDeduction(type) {
				if(this[type]) {
					this.isDeduction = !this.isDeduction
				}
			},
			vouchers(val){
				if (val == "wx") {
					if (!this.isVout) {
						this.isVout = !this.isVout;
						this.isVouts = false;
						this.isPay = false;
						this.isTong = false;
						this.isWeixin = false;
					}
				} else if (val == "ye") {
					if (!this.isVouts) {
						this.isVouts = !this.isVouts;
						this.isVout = false;
						this.isPay = false;
						this.isTong = false;
						this.isWeixin = false;
						this.isDeduction = true;

					}
				} else if (val == "pay") {
					//如果买2个以上位置
					// if (this.parmsData.selectData.length > 1) {
					// 	this.regs.isFous = !this.regs.isFous;
					// 	this.regs.reg_html = "通兑卷一次只能兑换一座";
					// 	var me = this;
					// 	setTimeout(function() {
					// 		me.regs.isFous = !me.regs.isFous;
					// 	}, 2000)
					// 	return;
					// }					
					if (!this.isPay) {
						//恢复原价
						this.goMoney= 0;
						this.discountVal="";
						this.lastPrice=this.price;
						this.isPay = !this.isPay;
						this.isVouts = false;
						this.isTong = false;
						this.isWeixin = false;
						this.isVout = false;
					}
				}else if(val=='weixin'){
					this.isVout = false;
					this.isVouts = false;
					this.isPay = false;
					this.isTong = false; 
					this.isWeixin = true;
				}else if(val=='tong'){
					this.isVout = false;
					this.isVouts = false;
					this.isPay = false;
					this.isTong = true; 
					this.isWeixin = false;
				}
			},
			getDiscount() {
				this.getVals();
				if (this.discountVal.length <= 0) {
					this.regs.isFous = !this.regs.isFous;
					this.regs.reg_html = "请输入抵扣券密码";
					var me = this;
					setTimeout(function() {
						me.regs.isFous = !me.regs.isFous;
					}, 2000)
					return
				}
				/* else if (!/^\w{6}$/.test(this.discountVal)) {
					this.regs.isFous = !this.regs.isFous;
					this.regs.reg_html = "请输入正确的抵扣券密码";
					var me = this;
					setTimeout(function() {
						me.regs.isFous = !me.regs.isFous;
					}, 2000)
					return
				} */
				confirmStore.getDis.call(this)
			},
			getDeduction(){
				/*get 橙券 抵消*/
				this.getVals();
				 
			},
			tabs(){
				this.isText=!this.isText
			},
			increase(state){
				if(state==1){
					if(this.buldMoney.length<5){
						// this.buldMoney++;
						this.buldMoney.push({title:""})
					}else{
						alert('蓝券个数不能超过5个')
					}
				}else if(state==2){
					if(this.redMoney.length<5){
						// this.buldMoney++;
						this.redMoney.push({title:""})
					}else{
						alert('橙券个数不能超过5个');
						return;
					}

				}else if(state==3){ 
					if(this.tongMoney.length<5){
						// this.buldMoney++;
						this.tongMoney.push({title:""})
					}else{
						alert('通兑券个数不能超过5个')
					}}
				

			},
			getVals(){
				// buld 
				this.discountVal = [];
				this.buldMoney.forEach((x)=>{
					if(x.title){
					this.discountVal.push(x.title);
					}
				})

				this.discountVal = this.discountVal.join(',')
				// red
				this.payVal = [];
				this.redMoney.forEach((x)=>{
					if(x.title){
						
					this.payVal.push(x.title);
					}
				}) 
				this.payVal = this.payVal.join(',')
				 
			},
			getRedQuan(){
				//橙 确认
				this.getVals();
				confirmStore.orange_voucher.call(this);
			}
		}
	}
	
</script>
<style type="text/css">
	html,.confirm{
		background:#f2f2f2;
	}
	.confirm>div{
		padding:0 .15rem;
		background:#fff;
		margin-bottom:0.025rem;
	}
	.confirm .con-info{
		padding-top:.24rem;
		padding-bottom:.19rem;
	}
	.con-info .info-list{
		line-height:.2rem;
	}
	.con-info .info-list:nth-child(1){
		font-size:0.14rem;
	}
	.con-info .info-list:nth-child(2),.con-info .info-list:nth-child(4){
		font-size:0.12rem;
		color:#8d8d8d;
	}
	.con-info .info-list:nth-child(3){
		font-size:0.12rem;
		color:#48cfae;
	}
	.con-info .info-list>span + span {
		margin-left: 0.05rem;
	}
	.con-price{
		height:0.55rem;
		line-height:0.55rem;
	}
	.con-price>span:nth-child(1){
		font-size:0.12rem;
	}
	.con-price .con-money{
		font-size:0.16rem;
		float:right;
		color:#ff3366;
	}
	.confirm>.con-pay{
		padding-top:0.05rem;
	}
	.con-pay-head{
		height:0.34rem;
		line-height:0.34rem;
		border-bottom:#e5e5e5 solid 0.01rem;
	}
	.con-price_1{
		line-height:0.25rem;
		border-bottom:1px solid #ddd;
		border-top:1px solid #ddd;
		padding:0 0.05rem;
	}
	.pay-info-head{
		position:relative;
		height:0.35rem;
		line-height:0.35rem;
	}
	.pay-info-head .weixin:before{
		position:absolute;
		content: "";
		width:0.15rem;
		height:0.15rem;
		background:#eee;
		left:-0.2rem;
		top:0.02rem;
		border-radius:50%;
	}
	.pay-info-head .active:before{
		position:absolute;
		content: "";
		width:0.15rem;
		height:0.15rem;
		background:#48cfae;
		left:-0.2rem;
		top:0.02rem;
		border-radius:50%;
	}
	.pay-info-head .active:after{
		position:absolute;
		content: "";
		width:0.07rem;
		height:0.07rem;
		background:#fff;
		left:-0.16rem;
		top:0.055rem;
		border-radius:50%;
	}
	
	.pay-info-head>span:nth-child(1){
		position:relative;
		margin-left:0.245rem;
	}
	.pay-info-head>span:nth-child(2){
		float:right;
		margin-right:0.21rem;
	}
	.small{
		font-size:0.11rem;
		color:#999;
		margin-left:0.1rem;
	}

	.pay-input>li{
		width:100%;

	}
	.pay-input>li>span {
		display: block;
		text-align: right;
		color: #999;
	}
	.pay-input{
		padding-bottom:0.1rem;
	}
	.pay-input>li>input{
		width:80%;
		height:0.34rem;
		border:0.01rem solid #e5e5e5;
		text-indent:0.15rem;
	
	}
	.pay-input .pay-input-tong{
		width:100%;
	}
	.pay-input>li>button{
		width:20%;
		height:0.34rem;
		float:right;
		border:0;
		line-height:0.34rem;
		text-align:center;
		background:#48cfae;
		color:#fff;
		padding-bottom:0.05rem;
	}
	.imgBtn{
		width:0.12rem;
		height: 0.06rem;
		position:absolute;
		right:0.02rem;
		top:45%;
		transform: translate(0,-50%);
		margin-left:0.05rem;		
	}
	/* .pay-select{
		padding:0.07rem 0 0.15rem 0;
		padding-left: 0.225rem;
		line-height:0.33rem;
		position: relative;
	}
	.pay-select>li{
		position: relative;
	}
	.pay-select>li>span{
		position:absolute;
		content: "";
		width:0.15rem;
		height:0.15rem;
		background:#f0f0f0;
		left:-0.2rem;
		top:50%;
		transform: translate(0,-50%);
		border-radius:50%;
	}
	.pay-select>li>.slsec{
		background:#48cfae;
	} */
	.pay-color-gre{
		color:#48cfae;
	}
	.confirm .price-ok{
		height:0.5rem;
		line-height:0.5rem;
		color:#fff;
		background-color:#48cfae;
		position:absolute;
		bottom:0;
		left:0;
		right:0;
		text-align:center;
		margin-bottom:0;
		font-size:0.16rem;
	}
	.voucher{
		background-color: #48cfae	
	}
	.loading_pay{
		position:fixed;
		top:0;
		left:0;
		right:0;
		bottom:-5px;
		background:rgba(0,0,0,0.5) !important;
		text-align:center;
		color:#fff;
		 
	}
	.loading_pay p{
		position:absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%); 
		font-size:0.22rem;
		color:#fff;
	}
	.quan_btns{
	float:right;margin-right: 30px;
	}
</style>