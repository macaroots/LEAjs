new class CheckCollisionsAction {
	async act(args, resolve, reject) {
		const agent = this.agent;
		
		const hero = agent.parent.hero.mesh;

		for (let mesh of agent.objects) {
    		if (this.isBoxInside(hero, mesh)) {
    		    await mesh.agent.see('collide', hero);
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
