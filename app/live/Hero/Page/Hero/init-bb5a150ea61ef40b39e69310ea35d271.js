new class init {
	act(args, resolve, reject) {
		const agent = this.agent;
		console.log(agent + '- Hero.init');
		agent.x = 150;
		agent.y = 0;
		agent.velocityX = 0;
		agent.velocityY = 0;
		agent.width = 10;
		agent.height = 10;
		resolve();
	}
}();
