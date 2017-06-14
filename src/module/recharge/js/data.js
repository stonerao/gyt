import utils from 'common/js/utils'

export default {
  data() {
  	var recUrl = utils.urls.urls_or+'index.php?m=mobile&c=member_fund&a=wx_recharge_pay&pdr_sn='
  	let location = utils.getLocationLogin();	
  	var momeny = this.val;
    var info = "key="+location.key+"&pdr_amount="+momeny;
 
    fetch(utils.dataUrl.rechargeUrl,{
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
      	console.log(res);
        if(res.code===200){
          console.log(recUrl +res.datas.pdr_sn)
    		  window.location.href = recUrl +res.datas.pdr_sn+"&key="+location.key+"&success_url="+utils.urls.recharge+"&failed_url="+utils.urls.recharge;    		
        }
      })
  }
}
