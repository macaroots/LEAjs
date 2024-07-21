new class RightAction {
	act(args, resolve, reject) {
		const agent = this.agent;
		agent.hero.mesh.position.x = agent.hero.mesh.position.x - 1;
		resolve();
	}
}();
