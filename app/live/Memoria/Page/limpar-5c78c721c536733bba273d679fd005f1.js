new (function limpar() {
	this.act = function (args, resolve, reject) {
		let main = document.querySelector('main');
		let jogador = document.querySelector('#jogador1');
		main.innerHTML = '';
		jogador.innerHTML = '';
		resolve();
	};
})();