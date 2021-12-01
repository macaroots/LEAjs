new (function insert() {
	this.act = async function (bean, resolve, reject) {
	    let agent = this.agent;
	    
	    await agent.see('validate', bean);
	    
		let beans = await agent.see('getBeans');
		beans.push(bean);
		bean.id = beans.length;
		
		resolve();
	};
})();