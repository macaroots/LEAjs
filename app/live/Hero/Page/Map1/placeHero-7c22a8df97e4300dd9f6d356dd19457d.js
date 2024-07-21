new class PlaceHeroAction {
	async act(args, resolve, reject) {
		const agent = this.agent;
		
        let hero = await agent.parent.hero.see('getMesh');
        hero.position.x = 0;
        hero.position.y = 0;
        
		resolve();
	}
}();
