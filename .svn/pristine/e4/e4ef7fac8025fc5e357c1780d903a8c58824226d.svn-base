import utils from 'common/js/utils'
export default {
  data() {
    fetch(utils.dataUrl.cityUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((res) => {
        if (res.code === 200) {
          this.city = { id: res.datas[0].cities[0].locationId, name: res.datas[0].cities[0].locationName }
          utils.setLocation(this.city)
        }
      })
  }
}
