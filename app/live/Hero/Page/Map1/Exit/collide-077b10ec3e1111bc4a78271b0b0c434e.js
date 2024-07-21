new class CollideAction {
	act(args, resolve, reject) {
		const agent = this.agent;
		agent.parent.won = true;
		resolve();
	}
}();
