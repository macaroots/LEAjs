new class getById {
	async act(id, resolve, reject) {
	    let agent = this.agent;
		let beans = await agent.see('getBeans');
		let bean = beans[id - 1];
		resolve(bean);
	}
}();
