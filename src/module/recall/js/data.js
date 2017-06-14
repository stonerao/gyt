import utils from 'common/js/utils'

export default {
  data() {
    var phoneCode = this.$data.phoneCode;//手机号码
    var info = "mobile_phone="+phoneCode
    fetch(utils.dataUrl.findPassword,{
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: info
    }).then((response) => {
      if (response.status === 200) {
        return response.json()
      }
    }).then((res) => {
      console.log(res)
      this.hots = res.datas;
      if(res.datas.data){
        this.regs.isFous = !this.regs.isFous;
        this.regs.reg_html = res.datas.data;
        var me = this;
        setTimeout(function() {
          me.regs.isFous = !me.regs.isFous;
        }, 2000)
    
      }else{
        this.regs.isFous = !this.regs.isFous;
        this.regs.reg_html = "请稍等重新登录";
        var me = this;
        setTimeout(function() {
          me.regs.isFous = !me.regs.isFous;
        }, 2000)
      }

    })
  },
  mathCode() { //哈希
    fetch(utils.dataUrl.nchashUrl)
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
    }).then((res) => {
      if(!res){return}
      this.codekey = res.datas.codekey;
      this.imgSrc=utils.dataUrl.makecodeUrl+"&nchash="+res.datas.codekey+'&t='+Math.random()
    })
  },
  captcha(){
    var urlCode = "http://byfoli.kh888.cn/index.php?m=mobile&c=seccode&a=check"
    var info = "&nchash="+this.codekey+"&captcha="+this.mathCode
    fetch(urlCode+info),{
        mode: "no-cors",
    }.then((response) => {
      if (response.status === 200) {
        return response.json()
      }
    }).then((res) => {

    })

  },
  //确定
  determineUrl(){
    var info = "&type=3&phone="+this.phoneCode+"&captcha="+this.codeWord
    console.log(info)
    console.log(utils.dataUrl.findPasswordTwo)
    fetch(utils.dataUrl.findPasswordTwo+info).then((response) => {
      if (response.status === 200) {
        return response.json()
      }
    }).then((res) => {
      console.log(res)
      
      if(res.code===200){
        window.location.href=utils.urls.recallPassUrl+"?phone="+this.phoneCode
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
