import utils from 'common/js/utils'

export default {
  data() {
      var register = this.$data.member_mobile; //手机号码
      var datas = this.$data;
      var urlCode = "username=" + datas.username + "&password=" + datas.password + "&password_confirm=" + datas.password_confirm + "&member_mobile=" + datas.member_mobile
      fetch(utils.dataUrl.registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: urlCode
      }).then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      }).then((res) => {
        //注册成功
        if (res.code === 200) {
          this.regs.isFous = !this.regs.isFous;
          this.regs.reg_html = "注册成功";
          var me = this;
          setTimeout(function() {
            me.regs.isFous = !me.regs.isFous;
            window.location.href = utils.urls.loginUrl
          }, 2000)
        } else if (res.code === 400) {
          this.regs.isFous = !this.regs.isFous;
          this.regs.reg_html = res.datas.error;
          var me = this;
          setTimeout(function() {
            me.regs.isFous = !me.regs.isFous;
          }, 2000)
        }
      })

    },
    mathCode() { //哈希
      fetch("http://byfoli.kh888.cn/index.php?m=mobile&c=seccode&a=makecodekey", {
        method: "GET",
      }).then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      }).then((res) => {
        if (!res) {
          return
        }
        this.codekey = res.datas.codekey;
        this.imgSrc = "http://byfoli.kh888.cn/index.php?m=mobile&c=seccode&a=makecode&nchash=" + res.datas.codekey + '&t=' + Math.random()
      })
    },
    codePhone() {
      //请求验证码
      var phoneCode = "mobile_phone=" + this.member_mobile + "&codekey=" + this.codekey + "&captcha=" + this.mathCode;
      fetch("http://byfoli.kh888.cn/index.php?m=mobile&c=login&a=send_msg", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: phoneCode,
      }).then((response) => {
        console.log(response)
        if (response.status === 200) {
          return response.json()
        }
      }).then((res) => {
        console.log(res)
        if (res.code == 200) {
          this.regs.isFous = !this.regs.isFous;
          this.regs.reg_html = res.datas;
          var me = this;
          setTimeout(function() {
            me.regs.isFous = !me.regs.isFous;
          }, 2000)
        } else {
          this.regs.isFous = !this.regs.isFous;
          this.regs.reg_html = res.datas.error;
          var me = this;
          setTimeout(function() {
            me.regs.isFous = !me.regs.isFous;
          }, 2000)
        }
      })
    },
    imgSrc() {

    }

}