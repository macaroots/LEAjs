new class checkWin {
	async act(args, resolve, reject) {
	    let agent = this.agent;
	    let body = await agent.see('getBody');
	    let level = body.find('input[name=level]').val();
	    let jacks = $('.jack');
	    if (jacks.length == 0) {
	        agent.see('win');
	    }
	    else {
	        let count = agent.lastCount - jacks.length;
	        if (count != level) {
	            agent.see('fault', count + ' of ' + level);
	        }
	        agent.lastCount = jacks.length;
	    }
		resolve();
	}
}();
