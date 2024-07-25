new class GetMeshAction {
	act(args, resolve, reject) {
		const agent = this.agent;
		
		let mesh = agent.mesh;
		if (mesh == null) {
    		const geometry = new THREE.BoxGeometry(4, agent.parent.parent.canvas.clientWidth, 4);
            const material = new THREE.MeshPhongMaterial({ color: 0x88aa44 });
            mesh = new THREE.Mesh(geometry, material);
            mesh.agent = agent;
            agent.mesh = mesh;
		}
            
		resolve(mesh);
	}
}();