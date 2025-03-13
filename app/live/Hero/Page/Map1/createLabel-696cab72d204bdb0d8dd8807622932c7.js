new class CreateLabelAction {
	act([text, position, color, scene], resolve, reject) {
		const agent = this.agent;
		
        const loader = new THREE.FontLoader();
        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
            const textGeometry = new THREE.TextGeometry(text, {
                font: font,
                size: 0.5,
                height: 0.1,
            });
            const textMaterial = new THREE.MeshBasicMaterial({ color: color });
            const mesh = new THREE.Mesh(textGeometry, textMaterial);
            mesh.position.copy(position);
            scene.add(mesh);
		    
		    resolve(mesh);
        });
	}
}();
