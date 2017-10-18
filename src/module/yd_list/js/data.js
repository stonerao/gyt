import utils from 'common/js/utils'
export default {
  data() {
      let str = ``;
      for (var key in this.form) {
        str += `&${key}=${this.form[key]}`
      }
      console.log(str)
      fetch(utils.dataUrl.ydtList + str, {
        credentials: 'include',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json()
        }
      }).then((res) => {
        console.log(res)
        if (res.code == 200) {
          // 数据
          this.listHeader = res.datas;
          this.banner = res.datas.top_adv;
          // 是否翻页
          this.hasmore = res.hasmore;
        }
      })
      fetch(utils.dataUrl.adrlocation , {
        credentials: 'include',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then((res) => {
        if (res.status === 200) {
          return res.json()
        }
      }).then((res) => { 
        if (res.code == 200) {
          this.aderText  = res.datas.location.address
        }
      })
    },
    page() {
      var $this = this;

      window.onscroll = function() {
        var t = document.documentElement.scrollTop || document.body.scrollTop; //离上方的距离
        var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //可见宽度
        if (t >= document.documentElement.scrollHeight - h) {
          /*滑动到底部触发*/ 
          if (!$this.hasmore) {
            return
          }
          $this.form.curpage++;
          let str = ``;
          for (var key in $this.form) {
            str += `&${key}=${$this.form[key]}`
          }
          console.log(str)
          fetch(utils.dataUrl.ydtList + str, {
            credentials: 'include',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then((res) => {
            if (res.status === 200) {
              return res.json()
            }
          }).then((res) => {
            if (res.code == 200) {
              // 是否翻页
              $this.hasmore = res.hasmore;
              for (var key in res.datas.places_list) {
                $this.listHeader.places_list.push(res.datas.places_list[key])
              }
            }
          })

        }
      }
    },
    openid() {
      // fetch(utils.dataUrl.openid).then((res) => {
      //   if (res.status === 200) {
      //     return res.json()
      //   }
      // }).then((res) => { 
      //   // window.location.href=res.datas.code_url;
      // })
      var parms = utils.getRequest().parms;
      let isWeiXin = utils.isWeiXin()
      if (isWeiXin && parms.state != '1') {
        window.location.href = "http://byfoli.kh888.cn/index.php?m=mobile&c=places_interface&a=index&ref=" + encodeURIComponent(window.location.href);
      }
    }

}