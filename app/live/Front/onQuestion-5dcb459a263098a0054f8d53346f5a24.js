new (function OnQuestion() {
	this.act = function([agent, key], callback) {
		let lea = this.agent;
		if (!lea.agents) {
			lea.agents = {};
		}
		if (!lea.questions) {
			lea.questions = {};
		}
		agent.see('getFullName').then(function (name) {
			if (!lea.agents[name]) {
				lea.agents[name] = agent;
			}
			if (!lea.questions[name]) {
				lea.questions[name] = [];
			}
			lea.questions[name].push(key);
			
			console.log(lea.toString() + ' asking for ' + agent.toString() + ' "' + key + '"');
			if (lea.io) {
				lea.io.emit('question', [name, key]);
			}
		});
		// quer dizer que quem pergunta já fica com "não aprendeu", pra não ficar sem resposta
		callback();
	};
})();