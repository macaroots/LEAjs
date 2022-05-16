new (function list() {
	this.act = async function (args, resolve, reject) {
	    let agent = this.agent;
		let beans = await agent.see('getBeans');
		for (let i in beans) {
		    beans[i].id = parseInt(i) + 1;
		}
		resolve(beans);
	};
})();