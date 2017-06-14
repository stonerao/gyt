import utils from 'common/js/utils'
export default {
  data() {
  	let location = utils.getLocationLogin();	
    console.log(location)
    var info = "key="+location.key;
    fetch(utils.dataUrl.personUrl,{
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body:info,
      }).then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      }).then((res) => {
        this.name = res.datas.member_info.member_name;
        this.head = res.datas.member_info.avator;
        this.isState = true;
      })
  }
}
