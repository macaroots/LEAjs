new (function dontKnow() {
	this.act = function(perception, resolve, reject) {
		let concept = perception.type;
		let agent = this.agent;
		let mind = this.mind;
		let learned = false;
		let fullname = mind.toString();

		console.log(fullname + ' - Don\'t know "' + concept + '"! Searching');
		mind.set('unkowns', concept);

		agent.see('study', concept).then(function (learned) {
			if (!learned) {
				perception.type = 'index';
			    agent.see('ask', concept);
			}
			mind.see(perception).then(resolve).catch(reject);
		});
	};
})();