new (function toggle() {
	this.act = function (args, resolve, reject) {
		var agent = this.agent;
		
		let body = document.querySelector('body');
		body.classList.toggle('dividido');
		
		agent.see('getBody').then(function (body) {
		    body.toggle();
		    resolve();
		});
	};
})();