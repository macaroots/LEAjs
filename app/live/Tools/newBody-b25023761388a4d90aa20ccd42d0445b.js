new (function newBody() {
	this.act = async function (args, resolve, reject) {
		let agent = this.agent;
		let body = await agent.see('Element.newBody', args);
		resolve(body);
		    
    	let buttonsText = await agent.see('getButtons');
    	if (buttonsText) {
    	    let buttons = JSON.parse(buttonsText);
    	    for (let text in buttons) {
    	        agent.see('newButton', [text, buttons[text]]);
    	    }
    	}
	};
})();