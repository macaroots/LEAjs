new class InitAction {
	async act(args, resolve, reject) {
		const agent = this.agent;
	    
        if (agent.animation) {
	        cancelAnimationFrame(agent.animation);
        }
        
	    let body = (await agent.see('getBody'))[0];
        const canvas = body.querySelector('canvas');
        let renderer = agent.renderer;
        renderer = new THREE.WebGLRenderer({antialias: true, canvas});
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        agent.canvas = canvas;
        agent.renderer = renderer;
        
	    agent.hero = await agent.see('getAgent', 'Hero');
	    
	    let level = args || 1;
	    agent.level = level;
	    agent.map = await agent.see('getAgent', 'Map' + level);
	    await agent.map.see('init');
	    
	    document.querySelector('#level').innerText = level;
        
		resolve();
	}
}();
