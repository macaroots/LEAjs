new (function live() {
	this.act = async function (args, resolve, reject) {
		var agent = this.agent;
	    await agent.see('addName', 'List Element');
        await agent.see('study', 'itemView');
	    agent.see('Element.live', args, resolve);
	};
})();