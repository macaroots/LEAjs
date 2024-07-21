new class CheckCollisionsAction {
	async act(args, resolve, reject) {
		const agent = this.agent;
		
		const hero = agent.parent.hero.mesh;

		for (let a of agent.objects) {
		    let mesh = await a.see('getMesh');
    		if (this.isBoxInside(hero, mesh)) {
    		    a.see('collide', hero);
    		}
		}
		
		resolve();
	}
	isBoxInside(box1, box2) {
        const box1BBox = new THREE.Box3().setFromObject(box1);
        const box2BBox = new THREE.Box3().setFromObject(box2);
        let r = box2BBox.containsBox(box1BBox);
        return r;
    }
}();
