new (function getStyle () {
	this.act = function (args, resolve, reject) {
	    var agent = this.agent;
	    agent.see('get', 'style').then(function (style) {
	        if (style == null) {
        		style = $('<style>').appendTo('head');
        		agent.see('set', ['style', style]).then(function () {
        		    resolve(style);
        		});
	        }
	        else {
	            resolve(style);
	        }
	    });
	};
})();