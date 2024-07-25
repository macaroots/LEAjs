new class GetMeshAction {
	act(args, resolve, reject) {
		const agent = this.agent;
		let mesh = agent.mesh;
		if (mesh == null) {
		    console.log('novo', agent)
            // Grupo para agrupar todas as partes do carro
            mesh = new THREE.Group();
    
            // Crie a parte inferior do corpo do carro
            const lowerBodyGeometry = new THREE.BoxGeometry(1, 1, 1);
            const lowerBodyMaterial = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
            const lowerBody = new THREE.Mesh(lowerBodyGeometry, lowerBodyMaterial);
            // lowerBody.position.y = 0; // Ajusta a posição vertical
            mesh.add(lowerBody);
            
//             const headGeometry = new THREE.ConeGeometry( 0.4, 0.8, 5 ); 
// const headMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
// const head = new THREE.Mesh(headGeometry, headMaterial);
//             head.position.y = 1;
//             head.rotation.x = Math.PI;
//             mesh.add(head);
    
            mesh.agent = agent;
            agent.mesh = mesh;
		}
		resolve(mesh);
	}
}();
