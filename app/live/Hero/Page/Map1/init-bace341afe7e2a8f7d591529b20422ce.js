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
        
        // Configuração do dat.GUI
        if (agent.parent.gui) {
            agent.parent.gui.destroy();
            agent.parent.gui.domElement.remove();
        }
        const gui = new dat.GUI({autoPlace: false});
        agent.parent.gui = gui;
        const folder = gui.addFolder('Hero Position');
        const heroPosition = {
            x: hero.position.x,
            y: hero.position.y
        };

        folder.add(heroPosition, 'x', -7, 7)/*.onChange(value => {
            hero.position.x = value;
        })*/;
        folder.add(heroPosition, 'y', -7, 7)/*.onChange(value => {
            hero.position.y = value;
        })*/;
        folder.open();
        
        canvas.parentElement.insertBefore(gui.domElement, canvas);
        
        document.querySelector('#title').innerText = await agent.see('getTitle');
        document.querySelector('#mission').innerText = await agent.see('getMission');

        function render(tFrame) {
            agent.see('update', tFrame)
            
            heroPosition.x = hero.position.x;
            heroPosition.y = hero.position.y;
            gui.updateDisplay();
            
            renderer.render(scene, camera);
            agent.parent.animation = requestAnimationFrame(render);
        }
        render();
        
		resolve();
	}
}();
