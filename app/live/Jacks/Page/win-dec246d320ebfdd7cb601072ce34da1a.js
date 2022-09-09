new class win {
	async act(args, resolve, reject) {
		alert('Congratulations! You win!\nTry next level!');
		let agent = this.agent;
	    let body = await agent.see('getBody');
	    let level = body.find('input[name=level]');
        level.val(parseInt(level.val()) + 1);
		agent.see('init');
		resolve();
	}
}();
