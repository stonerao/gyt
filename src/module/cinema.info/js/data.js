import utils from 'common/js/utils'

export default {
  getInfo() {
      let parmsId = utils.getLocation().id; //城市ID
      let filmId = this.good_id; //影片
      let timeData = this.timeDate //时间
        // console.log(utils.dataUrl.cinemaInfoUrl + "&locationId=" + parmsId + "&date=" + timeData + "&movieid=" + filmId)
      fetch(utils.dataUrl.cinemaInfoUrl + "&locationId=" + parmsId + "&date=" + timeData + "&movieid=" + filmId, {
        credentials: 'include',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then((response) => {
          if (response.status === 200) {
            return response.json()
          }
        })
        .then((res) => {
          // 如果没有数据
          for (var key in res.datas) {
            if (res.datas[key] == null) {
              return
            }
          }
          if (!res.datas.map) {
            this.loading = "暂无排期"
          }
          this.showtimes = res.datas.map(item => ({
            id: item.id,
            name: item.name,
            address: item.address
          }));


        })
    },
    getDate() {
      let id = this.good_id;
      fetch('http://byfoli.kh888.cn/index.php?m=mobile&c=shiguang_interface&a=movies_detail' + (id ? '&movieIds=' + id : ''), {
        credentials: 'include',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          }
        })
        .then((res) => {

          this.filmData = res.datas[0]
          this.type = this.filmData.types.join(' ');
          var body = document.getElementsByTagName('body')[0];
          document.title = this.filmData.titleCn;
          var iframe = document.createElement("iframe");
          iframe.style.display = "none";

          iframe.setAttribute("src", " ");
          var d = function() {
            setTimeout(function() {
              iframe.removeEventListener('load', d);
              document.body.removeChild(iframe);
            }, 0);
          };
          iframe.addEventListener('load', d);
          document.body.appendChild(iframe);
          // this.des = this.data.plot.substr(0, 100) + '...'
        })

    },
    get_wxopenid() {
      fetch(utils.dataUrl.get_wxopenid + "&ref =" + encodeURIComponent(window.location.href), {
        credentials: 'include',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then((response) => {
          if (response.status === 200) {
            return response.json()
          }
        }).then((res) => {


        })
    }
}