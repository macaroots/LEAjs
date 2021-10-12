new (function renderDump () {
	this.act = function (links, callback) {
	    var agents = {};
    	var symbols = {};
		for (let link of links) {
            symbols[link.a.id] = link.a;
            symbols[link.r.id] = link.r;
            symbols[link.b.id] = link.b;
	        if (!(link.a.id in agents)) {
	            agents[link.a.id] = {};
	        }
	        /**/
	        // somente o último
	        agents[link.a.id][link.r.id] = [link.b.id];
	        /*/
	        // todo o histórico
	        var methods = agents[link.a.id];
	        if (!(link.r.id in methods)) {
	            methods[link.r.id] = [];
	        }
	        methods[link.r.id].push(link.b.id);
	        /**/
		}
		
		var text = '';
		for (let [agent, methods] of Object.entries(agents)) {
		    var name = symbols[agent].info;
		    text += `Ceed().then(async agent => {\n`;
		    text += `\tawait Promise.all([\n`;
		    for (let [method, values] of Object.entries(methods)) {
    		    for (let value of values) {
    		        let answer = symbols[value];
        		    text += `\t\tagent.see('write', ['${name}.${symbols[method].info}', new Symbol(0, '${answer.type}', \`${answer.info}\`)]),\n`;
    		    }
		    }
		    text += `\t]);\n`;
		    text += `});`;
		}
		callback(text); // return statement
	};
})();