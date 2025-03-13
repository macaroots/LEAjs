new class InitAction {
	async act(args, resolve, reject) {
		const agent = this.agent;
	    
        if (agent.parent.animation) {
	        cancelAnimationFrame(agent.parent.animation);
        }
        
		const canvas = agent.parent.canvas;
	    const renderer = agent.parent.renderer;
	    
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth/canvas.clientHeight, 0.1, 1000);
        agent.scene = scene
	    agent.camera = camera;
	    
        // const controls = new THREE.OrbitControls( camera, renderer.domElement );
        // controls.update();
                
        const color = 0xFFFFFF;
        const intensity = 2;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);

        camera.position.y = 0;
        camera.position.set(0, 0, 7);
        
        await agent.see('addBackground');
        await agent.see('placeObjects');
        let hero = await agent.parent.hero.see('getMesh');
        scene.add(hero);
        await agent.see('placeHero');
        
        const lastHeroPosition = {
            x: hero.position.x,
            y: hero.position.y
        };
        
        document.querySelector('#title').innerText = await agent.see('getTitle');
        document.querySelector('#mission').innerText = await agent.see('getMission');

        let label;
        async function updatePositionLabel() {
            if (label) {
                label.geometry.dispose();
                label.material.dispose();
                scene.remove( label );
            }
            label = await agent.see('createLabel', [`(${hero.position.x}, ${hero.position.y})`, new THREE.Vector3(-2.2, -1.2, 0), 0xffffff, scene]);
        }
        updatePositionLabel();

        async function render(tFrame) {
            if (lastHeroPosition.x != hero.position.x
                || lastHeroPosition.y != hero.position.y) {
                lastHeroPosition.x = hero.position.x;
                lastHeroPosition.y = hero.position.y;
                updatePositionLabel();
            }
            
            agent.see('update', tFrame)
            
            // controls.update();
            
            renderer.render(scene, camera);
            agent.parent.animation = requestAnimationFrame(render);
        }
        render();
        
		resolve();
	}
}();
