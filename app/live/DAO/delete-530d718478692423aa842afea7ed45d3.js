new class Delete {
	async act(id, resolve, reject) {
	    id = id - 1;
	    let agent = this.agent;
		let beans = await agent.see('getBeans');
		let bean = beans.splice(id, 1)[0];
		resolve(bean);
	}
}();
