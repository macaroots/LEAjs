new class jump {
	act(args, resolve, reject) {
	    const agent = this.agent;
	    agent.velocityY = -10;
		resolve();
	}
}();
