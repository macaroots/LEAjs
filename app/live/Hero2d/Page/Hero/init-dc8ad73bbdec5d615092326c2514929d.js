new class init {
	act(args, resolve, reject) {
		const agent = this.agent;
		console.log(agent + '- Hero.init');
		agent.x = 70;
		agent.y = 70;
		agent.velocityX = 0;
		agent.velocityY = 0;
		agent.width = 10;
		agent.height = 10;
		resolve();
	}
}();
