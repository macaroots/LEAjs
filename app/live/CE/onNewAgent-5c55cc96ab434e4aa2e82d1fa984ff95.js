new (function onNewAgent() {
	this.act = function (args, resolve, reject) {
		var ce = this.agent;
		ce.see('getBody').then(async function (body) {
			var select = body.find('select');
			select.empty();
			var agents = (await Ceed()).agents;
			var names = [];
			
			for (var i in agents) {
			    try {
    			    let agent = await agents[i][0];
    			    agent.see('getNames').then(name => {
    			        if (!names.includes(name)) {
    			            names.push(name);
            			    let option = $('<option>');
            				option[0].agent = agent;
        					option.text(name);
            				select.prepend(option);
    			        }
    				});
			    } catch {}
			}
			
		});
		resolve();
	};
})();