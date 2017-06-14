import utils from 'common/js/utils'

export default {
  getData() {
    let id = utils.getRequest().parms.id
    fetch('http://byfoli.kh888.cn/index.php?m=mobile&c=shiguang_interface&a=movies_detail' + (id ? '&movieIds=' + id : ''))
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((res) => {
        this.data = {
          id: res.datas[0].id,
          name: res.datas[0].name,
          img: res.datas[0].img,
          types: res.datas[0].types.join(' '),
          state: res.datas[0].state,
          length: res.datas[0].length,
          plot: res.datas[0].plot,
        }
        document.title = this.data.name
        this.des = this.data.plot.substr(0,100)+'...'
      })
  }
}
