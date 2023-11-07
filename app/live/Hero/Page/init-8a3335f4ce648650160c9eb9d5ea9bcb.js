new class init {
	async act(args, resolve, reject) {
	    const agent = this.agent;
	    const canvas = document.querySelector('canvas');
	    const context = canvas.getContext('2d');
	    agent.canvas = canvas;
	    agent.objects = [];
	    
	    agent.gravity = 0.5;
	    agent.hero = await agent.see('getAgent', 'Hero');
		await agent.hero.see('init');
	    agent.objects.push(agent.hero);
	    if (agent.animation) {
	        cancelAnimationFrame(agent.animation);
	    }
	    
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
