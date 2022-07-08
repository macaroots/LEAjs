new (function onLoad() {
	this.act = async function (args, resolve, reject) {
	    let agent = this.agent;
	    let body = await agent.see('getBody');
	    let main = body.find('main');
	    
		let agentMain = await agent.see('getAgent', 'Crud Main Element');
		agentMain.see('appendTo', main);
		resolve();
	};
})();