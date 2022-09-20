new class OnLoad {
	async act(args, resolve, reject) {
	    let agent = this.agent;
	    let body = await agent.see('getBody');
	    let main = body.find('main');
		agent.see('init');
		resolve();
	}
}();
