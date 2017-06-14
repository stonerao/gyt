import utils from 'common/js/utils'

export default {
  data() {
    let location = utils.getLocation()
    fetch(utils.dataUrl.indexUrl + (location.id ? '&locationId=' + location.id : ''))
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
    })
    .then((res) => {
      this.hots = res.datas.map(item => ({
        id: item.id,
        name: item.titleCn,
        mark: item.rating.toFixed(1),
        image: item.img
      }))
    })
  },
  getBanner() {
    fetch(utils.dataUrl.bannerUrl)
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
    })
    .then((res) => {
      this.banners = res.datas.head_adv_list.map(item=>{return item.adv_pic})
      this.ad = res.datas.middle_adv_info.adv_pic
    })
  }
}
