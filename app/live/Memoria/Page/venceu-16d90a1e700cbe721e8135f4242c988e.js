new (function venceu() {
	this.act = function (args, resolve, reject) {
		alert('Parabéns!');
		this.agent.see('novo');
		resolve();
	};
})();