new class init {
	async act(args, resolve, reject) {
	    const agent = this.agent;
	    const canvas = document.querySelector('canvas');
	    const context = canvas.getContext('2d');
	    agent.canvas = canvas;
	    agent.objects = [];
	    
	    agent.gravity = 0.5;
	    agent.hero = await agent.see('getAgent', 'Hero');
	    agent.objects.push(agent.hero);
	    
	    function animate() {
	        agent.see('animate', context);
	        requestAnimationFrame(animate);
	    }
	    animate();
	    
	    window.onkeydown = (event) =>  {
	        agent.see('onKeyDown', event);
	    };
	    
		resolve();
	}
}();
