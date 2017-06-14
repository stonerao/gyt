import utils from 'common/js/utils'

export default {
  getInfo() {
    let id = utils.getRequest().parms.id
    fetch(utils.dataUrl.cinemaDetailUrl + (id ? '&cinemaId=' + id : ''))
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((res) => {
        this.info = res.datas
        document.title = '观影通-' + this.info.nameCn
      })
  },
  getMovie() {
    let id = utils.getRequest().parms.id
    let movieId = utils.getRequest().parms.movieId
    return fetch(utils.dataUrl.cinemaMovieDataUrl + (id ? '&cinemaId=' + id : ''))
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((res) => {
        this.movies = res.datas.map(item => ({
          id: item.id,
          img: item.img,
          name: item.titleCn
        }))
        if (movieId) {
          for (var i = 0; i < this.movies.length; i++) {
            if (this.movies[i].id == movieId) {
              this.active = this.movies[i]
              this.swiper.slideTo(i)
              break;
            }
          }
        } else {
          this.active = this.movies[0]
        }
      })
  },
  getShowtimes() {
    let cinemaId = utils.getRequest().parms.id
    let movieId = this.active.id
    let date = this.dateTime[this.dateActive].val
    let versions = ['无', '2D', '3D', 'IMAX', 'IMAX3D', '4D', '中国巨幕', '中国巨幕3D']
    let languages = ['无', '中文版', '英文版', '粤语版', '', '方言版', '外语原版']
    fetch(utils.dataUrl.cinemaShowtimesUrl + (cinemaId ? '&cinemaId=' + cinemaId : '') + (movieId ? '&movieId=' + movieId : '') + (date ? '&date=' + date : ''))
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((res) => {
        if (res.code === 200) {
          this.showtimes = res.datas.map(item => ({
            id: item.id,
            parms: encodeURIComponent(JSON.stringify(Object.assign({}, { showtime: item, movie: { id: this.active.id, name: this.active.name,img:this.active.img }, cinema: { id: utils.getRequest().parms.id, name: this.info.nameCn }, time: this.dateTime[this.dateActive].name + ' ' + languages[item.language] + ' (' + versions[item.version] + ')', hall: item.hallname }))),
            hallId: item.hallId,
            hallname: item.hallname,
            language: languages[item.language],
            version: versions[item.version],
            exchange_price: (item.exchange_price / 100).toFixed(2),
            oPrice: (item.oPrice / 100).toFixed(2),
            realTime: item.realTime,
            realTimename: item.realTimename,
            status: item.status,
            longtime: item.longtime
          }))
        } else if (res.code === 400) {
          this.showtimes.splice(0, this.showtimes.length)
          this.loading="暂无排期"
        }
      })
  }
}
