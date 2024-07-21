new class UpAction {
	act(args, resolve, reject) {
		const agent = this.agent;
		agent.y -= 5;
		resolve();
	}
}();
