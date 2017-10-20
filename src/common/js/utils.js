// var URL = "http://byfoli.kh888.cn/";
var URL = "http://gytcs.test.kh888.cn/";
export default {
  urls: {
    urls_or: URL,
    homeUrl: 'index.html',
    ticketUrl: 'ticket.html',
    cinemaUrl: 'cinema.html',
    cinemaDetailUrl: 'cinema.detail.html',
    selectUrl: 'selected.html',
    personUrl: 'person.html',
    cityUrl: 'city.html',
    loginUrl: "login.html",
    chargeUrl: "charge.html",
    recallUrl: "recall.html",
    recallPassUrl: "recall.password.html",
    registerUrl: "register.html",
    orderUrl: "order.html",
    balanceUrl: "balance.html",
    rechargeUrl: "recharge.html",
    recharge: "recharge.html", //模拟。需要删除
    orderInfoUrl: "order.detail.html",
    memberUrl: 'member.html',
    creditUrl: "credit.html",
    detailedUrl: "detailed.html",
    cinemaInfoUrl: "cinema.info.html",
    confirmUrl: "confirm.html",
  },
  dataUrl: {
    cityUrl: URL + 'index.php?m=mobile&c=shiguang_interface&a=city_list',
    indexUrl: URL + 'index.php?m=mobile&c=shiguang_interface&a=getmovies_city',
    bannerUrl: URL + 'index.php?m=mobile&c=movies_index&a=index',
    ticketUrl: URL + 'index.php?m=mobile&c=shiguang_interface&a=getmovies_city',
    cinemaUrl: URL +
      'index.php?m=mobile&c=shiguang_interface&a=getenablecinemas',
    cinemaDetailUrl: URL + 'index.php?m=mobile&c=shiguang_interface&a=cinema',
    cinemaMovieDataUrl: URL +
      'index.php?m=mobile&c=shiguang_interface&a=cinema_list',
    cinemaShowtimesUrl: URL +
      'index.php?m=mobile&c=shiguang_interface&a=getShowtimesInMovie',
    showtimesUrl: URL +
      'index.php?m=mobile&c=shiguang_interface&a=getshowtimeseats',
    recallUrl: URL + 'index.php?m=mobile&c=login&a=send_msg', //发送验证码
    registerUrl: URL + 'index.php?m=mobile&c=login&a=register', //注册
    loginUrl: URL + 'index.php?m=mobile&c=login&a=index', //登录
    personUrl: URL + 'index.php?m=mobile&c=member_index&a=index', //会员中心
    rechargeUrl: URL + 'index.php?m=mobile&c=member_fund&a=wx_recharge_add', //充值中心
    chargeUrl: URL + 'index.php?m=mobile&c=member_fund&a=rechargecard_add', //充值卡充值
    nchashUrl: URL + "index.php?m=mobile&c=seccode&a=makecodekey", //产生验证码 哈希
    makecodeUrl: URL + "index.php?m=mobile&c=seccode&a=makecode", //验证码图片
    findPassword: URL + 'index.php?m=mobile&c=find_password&a=send_msg', //发送短信(手机验证码)
    findPasswordTwo: URL +
      `index.php?m=mobile&c=find_password&a=check_sms_captcha`, //确定
    ajaxUrl: URL + 'index.php?m=mobile&c=seccode&a=check', //ajax验证
    changeUrl: URL + 'index.php?m=mobile&c=find_password&a=find_password', //确定密码
    creditUrl: URL + 'index.php?m=mobile&c=member_fund&a=rcblog', //充值记录
    userUrl: URL + 'index.php?m=mobile&c=member_index&a=modify_passwd', //会员信息
    orderUrl: URL + 'index.php?m=mobile&c=movie_order&a=order_list', //订单列表
    infoOrderUrl: URL + 'index.php?m=mobile&c=movie_order&a=order_info', //订单详情
    userMoneyUrl: URL + 'index.php?m=mobile&c=member_pd&a=predeposit_info', //个人
    detailedUrl: URL + 'index.php?m=mobile&c=member_fund&a=predepositlog', //明细
    orange_voucher: URL + '/index.php?m=mobile&c=member_buy&a=orange_voucher', //橙券 计算
    cinemaInfoUrl: URL +
      'index.php?m=mobile&c=shiguang_interface&a=movies_cinema', //明细
    submitOrderUrl: URL + 'index.php?m=mobile&c=member_buy&a=moviebuy_step2',
    youhuiUrl: URL + 'index.php?m=mobile&c=member_buy&a=deduction', //优惠券
    weixinUrl: URL + 'index.php?m=mobile&c=member_payment&a=movie_pay', //if weixin
    ydtList: URL + 'index.php?m=mobile&c=places_interface&a=places_list', //ydt list
    ydtInfo: URL + 'index.php?m=mobile&c=places_interface&a=places_detail', //ydt info
    openid: URL + 'index.php?m=mobile&c=places_interface&a=index', //openid
    adrlocation: URL + 'index.php?m=mobile&c=places_interface&a=get_address', //get 地址
    get_wxopenid: URL + 'index.php?m=mobile&c=shiguang_interface&a=get_wxopenid', //get 地址
  },
  getRequest(str) {
    let url = ''
    if (str) {
      url = str
    } else {
      url = location.href;
    }
    let theRequest = new Object();
    let href = url.split('?')[0]
    if (url.indexOf("?") != -1) {
      str = url.substr(url.indexOf("?") + 1);
      let strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
      }
    }
    return {
      href: href,
      parms: theRequest
    };
  },
  errorImg(e) {
    let size = e.target.dataset.size;
    if (!size) {
      size = '1x1'
    }
    e.target.src = 'http://placehold.it/' + e.target.dataset.size +
      '/e2e2e2/999?text=暂无图片'
  },
  getLocation() {
    let _city = Object.assign({}, JSON.parse(localStorage.getItem('location')))
    return _city
  },
  getLocationLogin() {
    //获取key
    let _city = Object.assign({}, JSON.parse(localStorage.getItem('LOGIN')))
    return _city
  },
  setLocationLogin(val) {
    //设置key
    localStorage.setItem('LOGIN', JSON.stringify(val))
    return val
  },
  setLocation(val) {
    localStorage.setItem('location', JSON.stringify(val))
    return val
  },
  serialize(obj) {
    let _str = ''
    for (let item in obj) {
      _str += item + '=' + obj[item] + '&'
    }
    if (_str.length > 0) {
      _str = _str.substr(0, _str.length - 1)
    }
    return _str
  },
  isEmptyObject(obj) {
    for (var key in obj) {
      return false;
    }
    return true;
  },
  go_page() {

  },
  isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }
}
