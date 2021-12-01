new (function list() {
	this.act = async function (args, resolve, reject) {
	    let agent = this.agent;
		let beans = await agent.see('getBeans');
		resolve(beans);
	};
})();