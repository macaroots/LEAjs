new class checkDefeat {
	async act(args, resolve, reject) {
		const agent = this.agent;
		resolve(agent.game.hero.x <= 15 || agent.game.hero.y <= 10);
	}
}();
