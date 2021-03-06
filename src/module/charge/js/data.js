import utils from 'common/js/utils'

export default {
  data() {
  	let location = utils.getLocationLogin();	
    var info = "key="+location.key+"&rc_sn="+this.number+"&rc_ps="+this.password;
    console.log(utils.dataUrl.chargeUrl)
    console.log(info)
    fetch(utils.dataUrl.chargeUrl,{
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body:info,
      }).then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      }).then((res) => {
        if(res.code===200){
          window.location.href=utils.urls.balanceUrl
        }else if(res.code===400){
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
