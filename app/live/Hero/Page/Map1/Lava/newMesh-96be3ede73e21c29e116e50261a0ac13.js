new class NewMeshAction {
	act(args, resolve, reject) {
		const agent = this.agent;
		
		const lavaGeometry = new THREE.BoxGeometry(4, agent.parent.parent.canvas.clientWidth, 4);
        const lavaMaterial = new THREE.MeshPhongMaterial({ color: 0xFF4444 });
        const mesh = new THREE.Mesh(lavaGeometry, lavaMaterial);
        mesh.agent = agent;
		resolve(mesh);
	}
}();
