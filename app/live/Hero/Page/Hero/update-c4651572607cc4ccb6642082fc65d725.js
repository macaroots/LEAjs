new class update {
	act(args, resolve, reject) {
	    const agent = this.agent;
	    const game = agent.parent;
		
		agent.velocityY += game.gravity;
    		
		agent.x += agent.velocityX;
		agent.y += agent.velocityY;
		
		if (agent.y >= game.canvas.height - agent.height) {
		    agent.y = game.canvas.height - agent.height;
		    agent.velocityY = 0;
		}
		resolve();
	}
}();
