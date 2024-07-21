new class UpdateAction {
	async act(args, resolve, reject) {
		const agent = this.agent;
	
		await agent.see('checkCollisions');
		
        if (agent.won) {
            agent.won = false;
		    agent.parent.hero.mesh.position.x = 0;
		    agent.parent.hero.mesh.position.y = 0;
            alert('Você venceu!');
            await agent.parent.see('init', agent.parent.level + 1);
        }
        if (agent.lost) {
            agent.lost = false;
		    agent.parent.hero.mesh.position.x = 0;
		    agent.parent.hero.mesh.position.y = 0;
            alert('Você perdeu!');
            await agent.see('init');
        }
		resolve();
	}
}();
