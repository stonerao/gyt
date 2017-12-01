import utils from 'common/js/utils'
export default{
	data(){
		let location = utils.getLocationLogin();	
	    var info = "&key="+location.key+"&curpage="+this.curpage+"&page="+this.page; 
	    fetch(utils.dataUrl.detailedUrl+info).then((response) => {
	      if (response.status === 200) {
	        return response.json()
	      }
	    }).then((res) => {
			for(var key in res.datas.list){
	    		this.credits.push(res.datas.list[key])
	    	}	    	
	    })
	  },

}