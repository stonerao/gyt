<template>
	<div>
		<div class="selec">
			<div class="selec-info">
				<ul>
					<li class="info-list">{{infos.movie.name}}({{infos.cinema.name}})</li>
					<li class="info-list">{{infos.time}}</li>
				</ul>
			</div>
			<div class="selec-head">{{infos.hall}}</div>
			<!-- 选座 -->
			<!-- select-position -->
			<v-touch tag="div" class="select-position" v-if="showtimes && showtimes.length>0" @doubletap="selec" @pinchin="selec('in')" @pinchout="selec('out')" @panmove="touchMove" @panstart="touchMove" @panend="touchEnd" v-bind:pan-options="{ threshold: 1 }">
					<div class="position-num" v-bind:style="listPos.style">
						<div v-for="num in maxRow">{{num}}</div>
					</div>
					<div class="selec-btns" v-bind:style="blockPos.style">
						<div class="select-btn-x" v-for="(m,mIndex) in showtimes">
							<div class="sel-btn" v-for="(n, nIndex) in m">
								<img v-if="n && n.seatStatus == 100" :src="iconNo" class="positionIcon">
								<img v-else-if="n && n.seatStatus == 0" :src="n.selected?iconOk:iconPosi" class="positionIcon" @click="selection($event,mIndex,nIndex)">
							</div>
						</div>
					</div>
			</v-touch>
		</div>
		<div class="select-site" v-if="selectData && selectData.length>0">
			已选座位: <br>
			<span v-for="item in selectData">{{item.name}}</span>
		</div>
		<div class="price-ok">
			<div>总价：<span>￥{{price.toFixed(2)}}</span></div>
			<div @click="submit">确认选座</div>
		</div>
		<span class="modal-box" v-show="regs.isFous">{{regs.reg_html}}</span>
	</div>
</template>
<script>
	/*引入公共样式*/
	import 'common/css/global.css'
	import icon1 from './images/icon-position.png'
	import icon2 from './images/icon-ok.png'
	import icon3 from './images/icon-desabled.png'

	import utils from 'common/js/utils'
	import dataStore from './js/data'

	export default {
		data() {
				return {
					infos: {
						name: "摆渡人(太平洋影城春熙路店)",
						time: "今天01-03   20：10（国语2D）"
					},
					price: 0, //总价
					isScale: false, //是否放大
					maxRow: 0, //行数
					maxCol: 0, //列数
					showtimes: [], //
					selectData: [],//座位信息
					iconPosi: icon1,
					iconOk: icon2,
					iconNo: icon3,
					num: 0,
					scale: 1,
					listPos: {
						style: {
							transform: ''
						},
						translateStart: {
							y: 0
						},
						translate: {
							y:0
						},
					},
					blockPos: {
						style: {
							transform: '',
							width: ''
						},
						translateStart: {
							x:0,
							y:0
						},
						translate: {
							x:0,
							y:0
						}
					},
					regs:{
						isFous:false,
						reg_html:""
					}
				}
			},
			created() {
				this.infos = JSON.parse(decodeURIComponent(utils.getRequest().parms.data))
				dataStore.getData.call(this)
			},
			methods: {
				submit() {
					// 如果没有选座 无法购买
					if(this.selectData.length===0){
						return
					}
					/*获取key*/
					if(!utils.getLocationLogin().key){
						location.replace(utils.urls.loginUrl + '?_='+ encodeURIComponent(location.href))
						return
					}

					let parms = {
						movie: this.infos.movie,
						cinema: this.infos.cinema,
						showtime: this.infos.showtime,
						time: this.infos.time,
						selectData: this.selectData
					}
					
					location.replace(utils.urls.confirmUrl + '?data='+ encodeURIComponent(JSON.stringify(parms)))
				},
				selection(elem,m,n) {
					let temp = this.showtimes[m];
					if(this.selectData.length>=5 && !temp[n].selected) {
						this.regs.isFous = !this.regs.isFous;
						this.regs.reg_html = "最多只能选择5个座位！";
						var me = this;
						setTimeout(function() {
							me.regs.isFous = !me.regs.isFous;
						}, 2000)
						return
					}
					temp[n].selected = !temp[n].selected
					if(temp[n].selected) {
						this.selectData.push({
							id: this.showtimes[m][n].id,
							name: this.showtimes[m][n].name
						})
					} else {
						for(let i=0;i<this.selectData.length;i++) {
							if(this.selectData[i].id == this.showtimes[m][n].id) {
								this.selectData.splice(i,1)
							}
						}
					}
					this.showtimes.splice(m, 1, temp)
					this.price = (this.infos.showtime.exchange_price * this.selectData.length)/100

				},
				selec(type) {
					if(type === 'in') {
							this.isScale = false
							this.scale = this.scale - 0.1
							if(this.scale<=1) {
								this.scale = 1
							}
					} else if (type === 'out') {
							this.isScale = true
							this.scale = this.scale + 0.1
							if(this.scale>1.5) {
								this.scale = 1.5
							}
					} else {
						this.isScale = !this.isScale;
						if(this.isScale) {
							this.scale = 1.4
						} else {
							this.scale = 1
						}
					}
					this.updateElementTransform()
				},
				/*移动改变位置*/
				touchMove(e) {
					this.listPos.translate.y = this.listPos.translateStart.y + e.deltaY
					this.blockPos.translate.x = this.blockPos.translateStart.x+ e.deltaX
					this.blockPos.translate.y = this.blockPos.translateStart.y + e.deltaY
					this.updateElementTransform()
				},
				/*移动结束设置位置*/
				touchEnd(e) {
					this.listPos.translateStart.y = this.listPos.translateStart.y + e.deltaY
					this.blockPos.translateStart.y = this.blockPos.translateStart.y + e.deltaY
					this.blockPos.translateStart.x = this.blockPos.translateStart.x + e.deltaX
				},
				/*更改元素的transform*/
				updateElementTransform() {
					this.listPos.style = {
						webkitTransform: ['translate3d(0,'+(this.listPos.translate.y) +'px,0)','scale('+this.scale+')'].join(" "),
						transform: ['translate3d(0,'+(this.listPos.translate.y) +'px,0)','scale('+this.scale+')'].join(" ")
					}
					this.blockPos.style = {
						webkitTransform: ['translate3d('+(this.blockPos.translate.x)+'px,'+(this.blockPos.translate.y)+'px,0)','scale('+this.scale+')'].join(" "),
						translate: ['translate3d('+(this.blockPos.translate.x)+'px,'+(this.blockPos.translate.y) +'px,0)','scale('+this.scale+')'].join(" "),
						width: this.blockPos.style.width
					}
				}
			}
	}
</script>
<style type="text/css">
	html,.selec {
		background: #fff;
		overflow: hidden;
	}
	
	.selec>div {
		padding: 0 .15rem;
	}
	
	.selec .selec-info {
		padding-top: .24rem;
		padding-bottom: .19rem;
		margin-bottom: 0.025rem;
	}
	
	.selec-info .info-list {
		line-height: .2rem;
	}
	
	.selec-info .info-list:nth-child(1) {
		font-size: 0.14rem;
	}
	
	.selec-info .info-list:nth-child(2) {
		font-size: 0.12rem;
		color: #8d8d8d;
	}
	
	.selec .selec-head {
		height: 0.3rem;
		line-height: 0.3rem;
		font-size: 0.12rem;
		background: #ecf6f4;
		text-align: center;
		z-index: 1000;
	}
	
	.pay-color-gre {
		color: #48cfae;
	}
	
	.price-ok {
		position: fixed;
		height: 0.5rem;
		line-height: 0.5rem;
		bottom: 0;
		left: 0;
		right: 0;
		text-align: center;
		margin-bottom: 0;
		font-size: 0.16rem;
		padding: 0;
		z-index: 66;
	}
	
  .price-ok>div {
		width: 100%;
	}
	.price-ok>div>span {
		color: #f36;
	}
	
	.price-ok>div:nth-child(1) {
		width: 50%;
		color: #000;
		float: left;
		background: #f1f1f1;
	}
	
	.price-ok>div:nth-child(2) {
		background-color: #48cfae;
		float: right;
		width: 50%;
		color: #fff;
	}
	
	.position-num {
		position: relative;
		padding: 0.09rem 0;
		left: 0;
		display: block;
		width: 0.25rem;
		border-radius: .25rem;
		background: #999999;
		z-index: 3;
	}
	
	.position-num div {
		width: 0.25rem;
		height: .28rem;
		line-height: .28rem;
		text-align: center;
		color: #fff;
	}
	
	.position-num div:first-child {
		display: block;
		border-radius: 50% 50% 0 0;
	}
	
	.select-position {
		margin-top: 0.275rem;
		position: relative;
		transition: all .3s;
		overflow: hidden;
	}
	
	.select-position div {
		overflow: hidden;
		transition: all .3s;
	}
	
	.select-position .sel-btn {
		width: 0.22rem;
		height: 0.20rem;
		float: left;
		margin: 0.0425rem 0.02rem;
		position: relative;
		overflow: visible;
	}
	.select-position .sel-btn.boreder:after {
		content: "";
		position: absolute;
		top: -0.0425rem;
		height: 0.285rem;
		right: -0.02rem;
		width: 0.01rem;
		background-color: #ddd;
	}
	
	.select-position .selec-btns {
		position: absolute;
		width: calc(100% - 0.48rem);
		left: 0.48rem;
		top: 0.05rem;
	}
	
	.select-btn-x {
		display: flex;
		flex-wrap: nowrap;
	}
	
	.swiper-slide-active>.swiper-zoom-container {
		display: block !important;
	}
	
	.positionIcon {
		width: 100%;
	}
	
	.scale {
		transform: scale(1.3) translate(0.5rem, 0.2rem);
		transform-origin: 100% 100%;
		overflow: hidden;
		left: 0;
		transform-origin: 92% 95%;
	}
	
	.scale-left {
		transform: scale(1.3) translate(0.0rem, 0.2rem);
		transform-origin: 0 100%;
		overflow: hidden;
		left: 0;
	}
	div.select-site {
    position: fixed;
    bottom: 0.5rem;
    left: 0;
    right: 0;
		padding: 0.05rem 0.1rem;
		color: #999;
		line-height: 2;
		background-color: #fff;
		z-index: 7;
	}
	.select-site > span {
		display: inline-block;
		margin: 0.02rem 0;
		padding: 0.03rem 0.05rem;
		font-size: 0.12rem;
		color: #48cfae;
		border: 0.01rem solid #e3e3e3;
	}
	.select-site > span	+ span {
		margin-left: 0.05rem;
	}
</style>