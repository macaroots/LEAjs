new class OnLoad {
	async act(args, resolve, reject) {
	    let agent = this.agent;
	    let body = await agent.see('getBody');
	    let main = body.find('main');
		let contact = await agent.see('getAgent', 'Contato/Page/Crud Crud List Element');
		contact.see('appendTo', main);
		resolve();
	}
}();
