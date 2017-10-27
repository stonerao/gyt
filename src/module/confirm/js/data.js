import utils from 'common/js/utils'
 
export default {
  getDis() {
      let login = utils.getLocationLogin();
      console.log(login.key)
      if (!login.key) {
        location.replace(utils.urls.loginUrl + '?_=' + encodeURIComponent(location.href))
        return
      }
      let body = 'key=' + login.key + '&order_amount=' + this.price + '&deduction_pass=' + this.discountVal
      console.log(body)
      fetch(utils.dataUrl.youhuiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body,
      }).then((response) => {
          console.log(response)
        if (response.status === 200) {
          return response.json()
        }
      }).then((res) => { 
        // if (res.code === 200) {
        //   this.goMoney = res.datas.denomination
        //   this.discount = this.goMoney + this.goPayMoney
        //   this.lastPrice = (this.price - this.discount).toFixed(2)
        // }
        //  if(res.code==200){
        //   let num = parseInt(res.datas);
        //   if(!num>0){} 
        //   const price = this.export_price; 
        //   let allPrice = price*num;
        //   this.lastPrice=(parseFloat(this.price)-allPrice).toFixed(2);
        // }else{
        //   this.regs.isFous = !this.regs.isFous;
        //   this.regs.reg_html = res.datas.error;
        //   var me = this;
        //   setTimeout(function() {
        //     me.regs.isFous = !me.regs.isFous;
        //   }, 2000)
        // }
        if(res.code==200){
          let num = parseInt(res.datas);
          if(!num>0){}  
          this.lastPrice=(parseFloat(this.price)-num).toFixed(2);
        }else{
          this.regs.isFous = !this.regs.isFous;
          this.regs.reg_html = res.datas.error;
          var me = this;
          setTimeout(function() {
            me.regs.isFous = !me.regs.isFous;
          }, 2000)
        }
      })
    },
    order() {
      let login = utils.getLocationLogin();
      /*如果没有登录*/
      if (!login.key) {
        location.replace(utils.urls.loginUrl + '?_=' + encodeURIComponent(location.href))
        return
      }
      
      let body = 'key=' + login.key 
      + '&cinemaId=' + this.parmsData.cinema.id 
      + '&cinema_name=' + this.parmsData.cinema.name 
      + '&is_deduction=' + ((this.isVout && this.isDeduction)||(this.isVouts && this.isDeduction)?1:0)
      + '&deduction_pass=' + this.discountVal
      + '&is_tongdui=' + (this.isPay?1:0)
      + '&tongdui_pass=' + this.payVal
      + '&goods_id=' + this.parmsData.movie.id
      + '&goods_name=' + this.parmsData.movie.name
      + '&goods_price=' + this.parmsData.showtime.oPrice
      + '&goods_priceafter=' + (this.parmsData.showtime.exchange_price/100).toFixed(2)
      + '&goods_num=' + this.parmsData.selectData.length
      + '&goods_image=' + this.parmsData.movie.img
      + '&showtimeId=' + this.parmsData.showtime.id
      + '&seatIds=' + encodeURIComponent(this.parmsData.selectData.map(item=>{return item.id}).join(',')) 
      + '&seats_name=' + this.parmsData.selectData.map(item=>{return item.name}).join(',')
      + '&is_paypd=' + (!this.isVout?0:1)
      + '&password=' + this.password
      + '&cinemahalls=' + this.parmsData.showtime.hallname
    
      fetch(utils.dataUrl.submitOrderUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body,
      }).then((response) => {
        if (response.status === 200) {
          return response.json()
        } 
      }).then((res) => {
        console.log(res)
        if (res.code === 200) {          
          /*如果是微信*/
          if(this.isVouts){
            if(this.lastPrice<=0){
                this.regs.isFous = !this.regs.isFous;
                this.regs.reg_html = "支付成功";
                var me = this;
                setTimeout(function() {
                  me.regs.isFous = !me.regs.isFous;
                  location.replace(utils.urls.orderInfoUrl + '?good_id=' + res.datas.order_id + "&order_sn=" + res.datas.order_sn)
                }, 1000)
            }else{
                location.href = utils.dataUrl.weixinUrl + "&key=" + login.key + "&order_sn=" + res.datas.order_sn + "&payment_code=wxpay_jsapi";
            }
          }else{
            /*跳转*/
            this.regs.isFous = !this.regs.isFous;
            this.regs.reg_html = "支付成功";
            var me = this;
            setTimeout(function() {
              me.regs.isFous = !me.regs.isFous;
              location.replace(utils.urls.orderInfoUrl + '?good_id=' + res.datas.order_id + "&order_sn=" + res.datas.order_sn)
            }, 1000)
          }
        }else {
          this.loading_pay = false;
          this.regs.isFous = !this.regs.isFous;
            this.regs.reg_html =res.datas.error;
            var me = this;
            setTimeout(function() {
              me.regs.isFous = !me.regs.isFous;
            }, 2000)
    
        }
      })
    },
    orange_voucher(){
      let login = utils.getLocationLogin();
      let  body = 'key=' + '4a6f3582314abf38b9acec55e06a7ccb' +'&orange_voucher='+this.payVal
 fetch('/index.php?m=mobile&c=member_buy&a=orange_voucher', {
  // credentials: 'include',
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body,
      }).then((response) => {
        if (response.status === 200) {
          return response.json()
        } 
      }).then((res)=>{ 
        if(res.code==200){
          let num = parseInt(res.datas);
          if(!num>0){} 
          const price = this.export_price; 
          let allPrice = price*num;
          this.lastPrice=(parseFloat(this.price)-allPrice).toFixed(2);
        }else{
          this.regs.isFous = !this.regs.isFous;
          this.regs.reg_html = res.datas.error;
          var me = this;
          setTimeout(function() {
            me.regs.isFous = !me.regs.isFous;
          }, 2000)
        }
      })
    }
}
  