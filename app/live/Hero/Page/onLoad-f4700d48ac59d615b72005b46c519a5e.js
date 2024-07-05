new class OnLoad {
	async act(args, resolve, reject) {
	    let agent = this.agent;
	    let body = await agent.see('getBody');
	    let main = body.find('main');
		await agent.see('init');
		
		let controls = document.querySelectorAll('.controls button');
		for (let control of controls) {
		    control.onclick = (event) => {
		        if (event.ctrlKey) {
		            agent.hero.see('ask', control.innerText);
		        }
		        else {
    		        agent.hero.see(control.innerText);
		        }
		    };
		}
		
		resolve();
	}
}();
