new (function insert() {
	this.act = async function (bean, resolve, reject) {
	    let agent = this.agent;
	    try {
    	    await agent.see('validate', bean);
    	    
    		let beans = await agent.see('getBeans');
    		beans.push(bean);
	    
		    resolve();
	    } catch (e) {
	        reject(e);
	    }
	};
})();