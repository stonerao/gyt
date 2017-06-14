import utils from 'common/js/utils'

export default {
  getData() {
    fetch(utils.dataUrl.cityUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((res) => {
        if (res.code === 200) {
          this.data = res.datas.map(item => ({
            id: item.locationId,
            name: item.locationName,
            cities: item.cities.map(i => ({
              id: i.locationId,
              name: i.locationName
            }))
          }))
        }
      })
  }
}
