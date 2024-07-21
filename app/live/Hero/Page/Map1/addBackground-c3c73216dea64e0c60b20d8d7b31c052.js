new class AddBackgroundAction {
	act(args, resolve, reject) {
		const agent = this.agent;
		
		const scene = agent.scene;
        
        function createArrow(dir, origin, length, hex) {
            const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
            scene.add(arrowHelper);
        }
         // Função para criar rótulo
        function createLabel(text, position, color) {
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
            });
        }

        // Setas para os eixos X, Y e Z
        createArrow(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 5, 0xff0000); // Eixo X - Vermelho
        createArrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 3, 0x00ff00); // Eixo Y - Verde
        // createArrow(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 5, 0x0000ff); // Eixo Z - Azul

        // Rótulos para os eixos e a origem
        createLabel('x', new THREE.Vector3(4, 0.3, 0), 0xff0000); // Rótulo X
        createLabel('y', new THREE.Vector3(0.3, 2, 0), 0x00ff00); // Rótulo Y
        // createLabel('Z', new THREE.Vector3(0, 0, 5.5), 0x0000ff); // Rótulo Z
        createLabel('(0, 0)', new THREE.Vector3(-2.2, -1.2, 0), 0xffffff); // Rótulo Origem
        
		resolve();
	}
}();
