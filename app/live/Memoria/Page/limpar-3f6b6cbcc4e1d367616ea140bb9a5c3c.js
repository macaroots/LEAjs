new (function limpar() {
	this.act = function (args, resolve, reject) {
		let main = document.querySelector('main');
		let jogador = document.querySelector('.jogador');
		main.innerHTML = '';
		jogador.innerHTML = '';
		resolve();
	};
})();