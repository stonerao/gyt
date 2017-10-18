import utils from 'common/js/utils'
export default {
  data() {
    let str = ``;
    for (var key in this.parms) {
      str += `&${key}=${this.parms[key]}`
    }
    fetch(utils.dataUrl.ydtInfo + str).then((res) => {
      if (res.status === 200) {
        return res.json()
      }
    }).then((res) => { 
      this.places_info = res.datas.places_info
    })
  }

}
