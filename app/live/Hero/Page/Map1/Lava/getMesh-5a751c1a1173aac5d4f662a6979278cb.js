new class GetMeshAction {
	async act(args, resolve, reject) {
		const agent = this.agent;
		
		let mesh = agent.mesh;
		if (mesh == null) {
		    mesh = await agent.see('newMesh');
            agent.mesh = mesh;
		}
            
		resolve(mesh);
	}
}();
