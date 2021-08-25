new (function onQuestion() {
	this.act = async function (data, callback) {
		console.log(data);
		let name = data[0];
		let key = data[1];
		let lea = this.agent;
		let script = await Ceed('Script');
		
		let agent = await lea.see('getSocketAgent', name);
		script.see('askFor', [agent, key]);
		callback(true); 
	};
})();