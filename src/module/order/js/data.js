import utils from 'common/js/utils'
export default {
  data() {
      let location = utils.getLocationLogin();
      var info = "&key=" + location.key + "&curpage=" + this.curpage + "&page=" + this.page;
      fetch(utils.dataUrl.orderUrl + info).then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      }).then((res) => {
        for (var key in res.datas.order_list) {
          this.infoData.push(res.datas.order_list[key])
        }
      })
     
    },
    order_info() {
      window.location.href = utils.urls.orderInfoUrl + "?good_id=" + this.good_id
    }
}