new class GetMeshAction {
	act(args, resolve, reject) {
		const agent = this.agent;
		
		let mesh = agent.mesh;
		if (mesh == null) {
    		const geometry = new THREE.BoxGeometry(4, agent.parent.parent.canvas.clientWidth, 4);
            const material = new THREE.MeshPhongMaterial({ color: 0xFF4444 });
            mesh = new THREE.Mesh(geometry, material);
            agent.mesh = mesh;
		}
            
		resolve(mesh);
	}
}();
