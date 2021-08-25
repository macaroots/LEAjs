new (function Heared() {
	this.act = function (args, callback) {
		let lea = this.agent;
		let agent = args[0];
		let key = args[1][0];
		agent.see('getFullName').then(function (name) {
			delete lea.questions[name];
		});
		callback();
	}
})();