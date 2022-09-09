new class init {
	act(args, resolve, reject) {
		var agent = this.agent;
		agent.see('getBody').then(function (body) {
    		var level = body.find('input[name=level]').val();
    		agent.lastCount = Math.min(Math.max(10, level), 30);
    	    agent.see('getAgent', 'ball').then(function (agentBall) {
    	        agentBall.see('init');
    	        
    	        for (let i = 0; i < agent.lastCount; i++) {
                    agent.see('getAgent', 'j' + i + ' Jacks/Jack').then(function (j) {
                        j.see('init');
                    });
                }
            });
		});
		resolve();
	}
}();
