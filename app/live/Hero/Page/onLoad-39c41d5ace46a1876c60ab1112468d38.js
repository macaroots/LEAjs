new class OnLoad {
	async act(args, resolve, reject) {
	    let agent = this.agent;
        
	    await new Promise((resolve, reject) => {
                $.getScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js')
                    .done(() => resolve())
                    .fail((jqxhr, settings, exception) => reject(exception));
        });
        
        await agent.see('init');
        
	    window.onkeydown = (event) =>  {
	        agent.see('onKeyDown', event);
	    };
	    
		let controls = document.querySelectorAll('#controls button');
		for (let control of controls) {
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
