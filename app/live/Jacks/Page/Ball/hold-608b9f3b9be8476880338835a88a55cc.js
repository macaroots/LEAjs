new class hold {
	act(args, resolve, reject) {
        var agent = this.agent;
        
        clearInterval(agent.interval_id);
		$('.jack').unbind();
		
		agent.see('init');
		agent.see('get', 'parent').then(function (parent) {
		    parent.see('checkWin');
		})
		resolve();
	}
}();
