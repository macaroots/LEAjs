new (function live() {
	this.act = function (args, callback) {
	    const agent = this.agent;
		console.log(agent + '- Hero.live');
		agent.x = 0;
		agent.y = 0;
		agent.velocityX = 0;
		agent.velocityY = 0;
		agent.width = 10;
		agent.height = 10;
		callback(agent);
	}
})();