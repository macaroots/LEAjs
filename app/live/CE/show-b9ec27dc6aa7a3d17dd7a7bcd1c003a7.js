new (function show() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		
		let body = document.querySelector('body');
		body.classList.add('dividido');
		
        if (!document.querySelector('.CE')) {
            agent.see('appendTo', 'body');
        }
		agent.see('getBody').then(function (body) {
		    body.show();
		    resolve();
		});
	};
})();