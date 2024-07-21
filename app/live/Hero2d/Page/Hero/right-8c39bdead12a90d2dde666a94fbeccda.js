new class RightAction {
	act(args, resolve, reject) {
		const agent = this.agent;
		agent.x = agent.x - 5;
		resolve();
	}
}();
