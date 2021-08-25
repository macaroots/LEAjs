new (function live() {
	this.act = async function (args, resolve, reject) {
		let agent = this.agent;
		console.log(agent + ' - Controller.live');
		await agent.see('study', 'dontKnow');
		resolve(true);
	};
})();