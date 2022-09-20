new class draw {
    constructor() {
        this.frame = 0;
    }
	act(context, resolve, reject) {
	    const agent = this.agent;
		
	    context.fillRect(agent.x, agent.y, agent.width, agent.height);
		
		resolve();
	}
}();
