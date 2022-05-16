new class update {
	async act(args, resolve, reject) {
		let [bean, id] = args;
	    let agent = this.agent;
		let beans = await agent.see('getBeans');
		beans[id - 1] = bean;
		resolve(bean);
	}
}();
