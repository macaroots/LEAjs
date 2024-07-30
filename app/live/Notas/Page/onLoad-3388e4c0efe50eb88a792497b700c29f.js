new class OnLoad {
	async act(args, resolve, reject) {
	    let agent = this.agent;
	    let body = await agent.see('getBody');
	    body.find('form').off().on('submit', (e) => {
	        e.preventDefault();
            try {
    	        let view = document.querySelector('#viewCode').checked;
    	        if (view) {
                    agent.see('ask', e.target.id + 'Submit');
    	        }
    	        else {
                    agent.see(e.target.id + 'Submit');
    	        }
            } catch {}
	    });
		resolve();
	}
}();
