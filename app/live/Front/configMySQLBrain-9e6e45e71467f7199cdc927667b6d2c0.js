new (function ConfigMySQLBrain() {
	this.act = async function(options, resolve, reject) {
        const mysql = (await import('mysql'));
		const MySQLBrain = (await import('./mysql_brain.js')).MySQLBrain;
		const AgentBrain = (await import('./agent_brain.js')).AgentBrain;

		const lea = this.agent;
		
		// configura o agente brain
		try {
console.log('Initializing server...');
            
            const pool = mysql.createPool(options);
			const mysqlBrain = new MySQLBrain(pool);
			await mysqlBrain.createTables();
            await lea.see('set', ['onServerInitialized', new (function () {
                this.act = function () {
                    lea.server.on('close', function() {
                        console.log('Ending server...');
                        pool.end(function (err) {
                            if (err) throw err;

                            console.log('Pool ended');
                        });
                    });
                }
            })()]);
            lea.see('addListener', ['serverInitialized', lea]);
            
			/**/
            const brain = await Ceed('Brain');
            await brain.see('addLibrary', mysqlBrain);
			await brain.see('study', 'reason');
			const library = new AgentBrain(brain);
			/*/
            const library = mysqlBrain;
            /**/
            
			(await Ceed()).see('addLibrary', library);
			await lea.see('addLibrary', library);
		}
		catch (e) {
			reject(e);
		}
		
		resolve(true);
	};
})();