import utils from 'common/js/utils'

export default {
  getData() {
    let location = utils.getLocation()
    fetch(utils.dataUrl.ticketUrl + (location.id ? '&locationId=' + location.id : ''))
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((res) => {
        this.data = res.datas.map(item => ({
          id: item.id,
          name: item.titleCn,
          mark: item.rating.toFixed(1),
          image: item.img,
          directors: item.directors.join('、'),
          actors: item.actors.join('、')
        }))
      })
  }
}
