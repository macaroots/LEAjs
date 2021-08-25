new (function live() {
	this.act = function (data, callback) {
		console.log('LEAClient LIVE', this.agent.toString());
		this.agent.see('study', 'onQuestion', callback);
	}
})();