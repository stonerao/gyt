import utils from 'common/js/utils'
export default {
  data() {
  	let location = utils.getLocationLogin();	
    var info = "key="+location.key+"&member_passwd="+this.member_passwd+"&member_newpwd="+this.member_newpwd+"&pay_passwd="+this.pay_passwd+"&pay_newpwd="+this.pay_newpwd;

    fetch(utils.dataUrl.userUrl,{
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
            this.regs.isFous = !this.regs.isFous;
            this.regs.reg_html =res.datas;
            var me = this;
            setTimeout(function() {
              me.regs.isFous = !me.regs.isFous;
            }, 2000)
        if(res.code===200){

        	//window.location.href=utils.urls.personUrl
        }
      })
  },
  info(){
    let location = utils.getLocationLogin(); 
    var info = "key="+location.key;
    fetch(utils.dataUrl.personUrl,{
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
        
        this.name = res.datas.member_info.member_name;
        this.head = res.datas.member_info.avator;
      })    
  }
}
