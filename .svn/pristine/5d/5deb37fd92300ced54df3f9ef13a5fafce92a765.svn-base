import utils from 'common/js/utils'

export default{
	data(){
	    var info = "new_password="+this.password+"&password="+this.newPassword+"&phone="+this.phoneCode+"&client=3";
	    console.log(info)
	    fetch(utils.dataUrl.changeUrl,{
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
	      //保存
	      utils.setLocation({key:res.datas.key,userid:res.datas.userid})
	      //跳转个人中心
	      window.location.href = utils.urls.personUrl
	    })
	  },

}