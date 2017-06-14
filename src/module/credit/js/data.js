import utils from 'common/js/utils'
export default{
	data(){
		let location = utils.getLocationLogin();	
	    var info = "&key="+location.key+"&curpage="+this.curpage+"&page="+this.page;
	    fetch(utils.dataUrl.creditUrl+info).then((response) => {
	      if (response.status === 200) {
	        return response.json()
	      }
	    }).then((res) => {
	    	for(var key in res.datas.log_list){
	    		this.credits.push(res.datas.log_list[key])
	    		console.log(res.datas.log_list[key])
	    	}
	    	
	    })
	  },

}