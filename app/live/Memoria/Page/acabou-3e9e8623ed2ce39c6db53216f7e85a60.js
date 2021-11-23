new (function acabou() {
	this.act = function (args, resolve, reject) {
		alert('Parabéns!');
		this.agent.see('novo');
		resolve();
	};
})();