new (function listUrl() {
	this.act = async function (args, resolve, reject) {
		let url = await this.agent.see('getUrl');
		resolve(url + 'list');
	};
})();