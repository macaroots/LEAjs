new (function onQuestion() {
	this.act = async function (args, resolve, reject) {
		let ce = this.agent;
		
		let script = await Ceed('Script');
		script.see('askFor', args);
		
		resolve();
	};
})();