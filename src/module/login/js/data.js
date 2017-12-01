import utils from 'common/js/utils'

export default {
  data() {
    var loginUrl = "username="+this.username+"&password="+this.password+"&client=wap";
    fetch(utils.dataUrl.loginUrl,{
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body:loginUrl,
      }).then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      }).then((res) => {
        console.log(res)
        if(res.code===400){//err
           this.regs.isFous = !this.regs.isFous;
            this.regs.reg_html =res.datas.error;
            var me = this;
            setTimeout(function() {
              me.regs.isFous = !me.regs.isFous;
            }, 2000)
        }else if(res.code===200){//登录成功
          utils.setLocationLogin({key:res.datas.key,userid:res.datas.userid})
          // 跳转
          let href = utils.getRequest(location.href)
          if(href.parms['_']) {
            location.replace(decodeURIComponent(href.parms['_']))
          } else {
            if(utils.getRequest().parms.id>0){
              window.location.href = `${this.urls.selectUrl}?id=${utils.getRequest().parms.id}&data=${utils.getRequest().parms.data}`
            }else{
              location.replace(utils.urls.personUrl)
            }
          }
        }
      })
  },
  setLocation(){
    // utils.setLocation()
  },
  getLocation(){
    let location = utils.getLocation();
    if(location){

    }
  }
}
