new (function InitBrain() {
	this.act = async function(options, resolve, reject) {
		const lea = this.agent;
		
		let ok;
		do {
			try {
				await lea.see('configMySQLBrain', options);
				ok = true;
			} catch (e) {
				ok = false;
				console.log('InitBrain Error on Connect to DB', e);
				console.log('Trying again in 1s');
				await new Promise(resolve => setTimeout(resolve, 1000));
			}
		} while (!ok);		
		
		resolve(true);
	};
})();