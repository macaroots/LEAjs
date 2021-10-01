new (function InitHttpBrain() {
	this.act = async function(options, resolve, reject) {
		let lea = this.agent;
		
		try {
			const HTTPBrain = (await import('./http_brain.js')).HTTPBrain;
			let brain = new HTTPBrain(options.host, options.protocol);
			(await Ceed()).see('setLibrary', brain);
			await lea.see('setLibrary', brain);
		}
		catch (e) {
			reject(e);
		}
		
		resolve(true);
	}
})();