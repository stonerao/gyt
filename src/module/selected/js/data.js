import utils from 'common/js/utils'

export default {
  getData() {
    let id = utils.getRequest().parms.id
    fetch(utils.dataUrl.showtimesUrl + (id ? '&showtimeId=' + id : ''))
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((res) => {
        let datas = res.datas
        this.maxRow = Math.max.apply(this, datas.map(item => {
          return item.screenY
        })) + 1
        this.maxCol = Math.max.apply(this, datas.map(item => {
          return item.screenX
        })) + 1
        this.blockPos.style.width = (this.maxCol * 0.22) + 'rem'
        this.showtimes.splice(0, this.showtimes.length)
        let temp = new Array(this.maxRow)
        for (let i = 0; i < temp.length; i++) {
          temp[i] = new Array(this.maxCol)
        }
        for (let item in datas) {
          temp[datas[item].screenY][datas[item].screenX] = {
            id: datas[item].id,
            name: datas[item].name,
            seatType: datas[item].seatType,
            seatStatus: datas[item].seatStatus
          }
        }
        this.showtimes = temp.map(item => {
          return item
        })
      })
  }
}
