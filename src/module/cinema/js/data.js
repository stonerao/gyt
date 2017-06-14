import utils from 'common/js/utils'

export default {
  getData() {
    let location = utils.getLocation()
    fetch(utils.dataUrl.cinemaUrl + (location.id ? '&locationId=' + location.id : ''))
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((res) => {
        this.data = res.datas.map(item => ({
          id: item.id,
          name: item.name,
          address: item.address,
          dis: -1
        }))
      })
  }
}
