new (function live () {
	this.act = async function (args, resolve, reject) {
		let agent = this.agent;
console.log('Tools.live', agent.toString());
		await agent.see('addName', 'Tools Element');
		let response = await agent.see('Element.live', args);
		await agent.see('study', 'newButton');
	    
		resolve(response);
	};
})();