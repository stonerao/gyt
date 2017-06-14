import Vue from 'vue'
export default {
  login(formData, cb) {
      cb = arguments[arguments.length - 1]
        //if (localStorage.token) {
        //    if (cb) cb(true)
        //    this.onChange(true)
        //    return
        //}
      pretendRequest(formData, (res) => {
        if (res.authenticated) {
          localStorage.token = res.token
          if (cb) cb(true)
          this.onChange(true)
        } else {
          if (cb) cb(false, res.msg)
          this.onChange(false)
        }
      })
    },

    getToken() {
      return localStorage.token
    },

    logout(cb) {
      delete localStorage.token
      if (cb) cb()
      this.onChange(false)
    },
    clearToken() {
      delete localStorage.token
    },
    loggedIn() {
      return !!localStorage.token
    },

    onChange() {}
}

function pretendRequest(formData, cb) {
  Vue.http.post('Uc/doLogin/', formData).then(response => {
    if (response.ok) {
      let _data = JSON.parse(response.data)
      if (_data.status == true) {
        cb({
          authenticated: true,
          msg: _data.msg
        })
      } else {
        cb({ authenticated: false, msg: _data.msg })
      }
    } else {
      cb({ authenticated: false, msg: "服务器错误.1" })
    }
  }, () => {
    cb({ authenticated: false, msg: "服务器错误.2" })
  })
}
