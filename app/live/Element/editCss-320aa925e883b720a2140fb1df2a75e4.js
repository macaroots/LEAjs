new (function editCss () {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
        agent.see('getStyle').then(function (style) {
		    Ceed('Script').then(script => 
				script.see('askBind', [agent, 'getCss', style]).then(resolve)
			);
        }).catch(reject);
	};
})();