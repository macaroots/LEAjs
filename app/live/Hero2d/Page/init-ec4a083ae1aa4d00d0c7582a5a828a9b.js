new class init {
	async act(args, resolve, reject) {
	    const agent = this.agent;
	    
	    if (agent.animation) {
	        cancelAnimationFrame(agent.animation);
	    }
	    
	    const canvas = document.querySelector('canvas');
	    const context = canvas.getContext('2d');
	    agent.canvas = canvas;
	    agent.objects = [];
	    
	    let level = args || 1;
	    agent.level = level;
	    agent.map = await agent.see('getAgent', 'Map' + level);
	    agent.map.game = agent;
	    
	    agent.hero = await agent.see('getAgent', 'Hero');
		await agent.hero.see('init');
	    agent.objects.push(agent.hero);
	    
	    function animate() {
	        agent.see('animate', context);
	        agent.animation = requestAnimationFrame(animate);
	    }
	    animate();

	    window.onkeydown = (event) =>  {
	        agent.see('onKeyDown', event);
	    };
	    
		resolve();
	}
}();
