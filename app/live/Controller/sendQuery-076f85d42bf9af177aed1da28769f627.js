new (function sendQuery() {
	this.act = async function (args, resolve, reject) {
		let req = args[0];
		let res = args[1];
		let agent = this.agent;
		const connection = await agent.see('connectDB');
		let sql = args[2];
		let values = args[3] || [];
		connection.query(sql, values, function (error, results, fields) {
			if (error) throw error;
		    res.json(results);
			
			connection.release();
			
		});
		resolve();
	};
})();