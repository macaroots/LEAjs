new class PlaceObjectsAction {
	async act(args, resolve, reject) {
		const agent = this.agent;
        const scene = agent.scene;
        
        let hero = await agent.parent.hero.see('getMesh');
        hero.position.x = 0;
        hero.position.y = 0;
        scene.add(hero);
        
        agent.exit = await agent.see('getAgent', 'Exit');
        let exit = await agent.exit.see('getMesh')
        agent.lava = await agent.see('getAgent', 'Lava');
        let lava = await agent.lava.see('getMesh')
        exit.position.x = 8;
        scene.add(exit)
        lava.position.x = -8;
        scene.add(lava)
        agent.objects = [agent.exit, agent.lava];
        
		resolve();
	}
}();
