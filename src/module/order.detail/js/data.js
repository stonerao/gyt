import utils from 'common/js/utils'
export default {
  data() {
  	let location = utils.getLocationLogin();	
    console.log(location)
    let id = this.$data.good_id;//列表带过来的ID
    var info = "&key="+location.key+"&order_id="+id;
    console.log(info)
    fetch(utils.dataUrl.infoOrderUrl+info).then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      }).then((res) => {
        console.log(res);
        this.infos=res.datas.order_info;
        this.o_price=(parseFloat(this.infos.order_amount)-parseFloat(this.infos.deduction_amount));
         /*是否支付*/
        this.order_state = res.datas.order_info.order_state;
        this.order_sn = res.datas.order_info.order_sn
      })
  }
}
