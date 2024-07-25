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
        let lava1 = await agent.lava.see('newMesh')
        let lava2 = await agent.lava.see('newMesh')
        exit.position.x = 8;
        scene.add(exit)
        lava1.position.x = -8;
        lava2.position.y = 5;
        lava2.rotation.z = Math.PI / 2;
        scene.add(lava1)
        scene.add(lava2)
        agent.objects = [exit, lava1, lava2];
        
		resolve();
	}
}();
