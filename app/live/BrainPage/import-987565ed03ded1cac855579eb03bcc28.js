new (function importBrain() {
	this.act = async function (args, resolve, reject) {
		let [inBrain, bookname] = args;
		let outBrain = await this.agent.see('getLibrary');
		
		let links = await brain.reason({a: {info: bookname}});
		for (let l of links) {
		    outBrain.tie(l);
		}
		resolve(links);
	};
})();