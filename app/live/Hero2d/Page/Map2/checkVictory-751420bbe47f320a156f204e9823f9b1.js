new class checkVictory {
	act(args, resolve, reject) {
		const agent = this.agent;
		resolve(agent.game.hero.y >= 140);
	}
}();
