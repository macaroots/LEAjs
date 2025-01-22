new class OnLoad {
	async act(args, resolve, reject) {
	    let agent = this.agent;
        
        await agent.see('init');
        
	    window.onkeydown = (event) =>  {
	        agent.see('onKeyDown', event);
	    };
	    
		let controls = document.querySelectorAll('#controls button');
		for (let control of controls) {
            agent.see('study', control.innerText);
		    control.onclick = (event) => {
	        	let alterar = document.querySelector('#alterar').checked;
		        if (event.ctrlKey || alterar) {
		            agent.see('ask', control.innerText);
		        }
		        else {
    		        agent.see(control.innerText);
		        }
		    };
		}
	    
		resolve();
	}
}();
