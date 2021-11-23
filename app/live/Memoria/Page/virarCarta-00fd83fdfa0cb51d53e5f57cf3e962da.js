new (function virarCarta() {
	this.act = function (carta, resolve, reject) {
		carta.classList.toggle('virada');
		resolve();
	};
})();