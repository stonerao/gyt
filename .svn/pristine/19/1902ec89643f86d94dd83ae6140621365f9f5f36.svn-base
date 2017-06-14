import utils from 'common/js/utils'
export default {
  data() {
  	let location = utils.getLocationLogin();	
    var info = "key="+location.key;
    fetch(utils.dataUrl.userMoneyUrl,{
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
        this.money = res.datas.available_predeposit
      })
  }
}
