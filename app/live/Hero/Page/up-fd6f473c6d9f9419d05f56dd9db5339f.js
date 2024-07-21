new class UpAction {
	act(args, resolve, reject) {
		const agent = this.agent;
		agent.hero.mesh.position.y += 1;
		resolve();
	}
}();
