new class PlaceObjectsAction {
	async act(args, resolve, reject) {
		const agent = this.agent;
        const scene = agent.scene;
        
        agent.exit = await agent.see('getAgent', 'Exit');
        let exit = await agent.exit.see('getMesh')
        agent.lava = await agent.see('getAgent', 'Lava');
        let lava = await agent.lava.see('getMesh')
        exit.position.y = -5;
        exit.rotation.z = Math.PI / 2;
        scene.add(exit)
        lava.position.y = 5;
        lava.rotation.z = Math.PI / 2;
        scene.add(lava)
        agent.objects = [exit, lava];
        
		resolve();
	}
}();
