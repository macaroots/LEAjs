new class checkVictory {
	act(args, resolve, reject) {
		const agent = this.agent;
		resolve(agent.hero.x >= 270);
	}
}();
