new class fault {
	act(args, resolve, reject) {
		alert('You loose!\n' + args);
		this.agent.see('init');
		resolve();
	}
}();
