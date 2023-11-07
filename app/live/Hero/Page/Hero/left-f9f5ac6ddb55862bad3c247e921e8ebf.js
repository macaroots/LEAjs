new class left {
	act(args, resolve, reject) {
		const agent = this.agent;
		agent.x -= 5;
		resolve();
	}
}();
