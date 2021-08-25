new (function live() {
	this.act = function (args, callback) {
		console.log(this.agent + '- Naive.live');
		callback(this.agent);
	}
})();