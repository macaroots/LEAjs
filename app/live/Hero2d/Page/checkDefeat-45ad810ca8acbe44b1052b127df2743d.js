new class checkDefeat {
	act(args, resolve, reject) {
		const agent = this.agent;
		resolve(agent.game.hero.x <= 0);
	}
}();
