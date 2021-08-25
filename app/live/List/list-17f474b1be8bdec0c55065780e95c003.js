new (function list () {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		agent.see('getBody').then(async function (body) {
		    var div = body.find('.list');
    		div.html('Loading...');
		
		    let itemAction = await agent.see('get', 'itemView');
		    if (!itemAction) {
		        await agent.see('study', 'itemView');
		    }
    	    agent.see('listUrl').then(function (listUrl) {
console.log('URL', listUrl);
        	    fetch(listUrl).then(async function (r) {
        	        let rows = await r.json();
        		    div.html('');
        		    var header = $('<div class="headers">').appendTo(div);
        		    var first = true;
                    for (let id in rows) {
                        var row = rows[id];
                        row.id = id;
                        if (first) {
                            for (let column in row) {
                                header.append('<span class="' + column + '">' + column + '</span>')
                                first = false;
                            }
                        }
                        agent.see('itemView', row).then(function (item) {
                           div.append(item);
                        });
                    }
        	    }, 'json');
    	        
    	    });
		});
		
		
	};
})();