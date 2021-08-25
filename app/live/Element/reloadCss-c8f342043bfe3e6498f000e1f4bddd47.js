new (function reloadCss () {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
        agent.see('getStyle').then(function (style) {
            if (style != null) {
    		    agent.see('getCss').then(function (css) {
    		        style.html(css);
    		        
    		        resolve(true);
    		    });
            }
		});
	};
})();