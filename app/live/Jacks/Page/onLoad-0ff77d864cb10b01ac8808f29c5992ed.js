new class OnLoad {
	async act(args, resolve, reject) {
	    let agent = this.agent;
		agent.see('init');
		resolve();
	}
}();
