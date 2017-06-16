import utils from 'common/js/utils'
export default {
  data() {
      let str = ``;
      for (var key in this.form) {
        str += `&${key}=${this.form[key]}`
      }
      console.log(str)
      fetch(utils.dataUrl.ydtList + str).then((res) => {
        if (res.status === 200) {
          return res.json()
        }
      }).then((res) => {
        console.log(res)
        if (res.code == 200) {
          // 数据
          this.listHeader = res.datas;
          // 是否翻页
          this.hasmore = res.hasmore;
        }
      })
    },
    page() {
      var $this = this;
      if (!this.hasmore) {
        return
      }
      window.onscroll = function() {
        var t = document.documentElement.scrollTop || document.body.scrollTop; //离上方的距离
        var h = window.innerHeight || document.documentElement.clientHeight ||
          document.body.clientHeight; //可见宽度
        if (t >= document.documentElement.scrollHeight - h) {
          /*滑动到底部触发*/
          $this.form.curpage++;
          let str = ``;
          for (var key in $this.form) {
            str += `&${key}=${$this.form[key]}`
          }
          console.log(str)
          fetch(utils.dataUrl.ydtList + str).then((res) => {
            if (res.status === 200) {
              return res.json()
            }
          }).then((res) => {
            if (res.code == 200) {
              // 是否翻页
              $this.hasmore = res.hasmore;
              for (var key in res.datas) {
                $this.listHeader.places_list.push(res.datas[key])
              }
            }
          })

        }
      }
    }

}
