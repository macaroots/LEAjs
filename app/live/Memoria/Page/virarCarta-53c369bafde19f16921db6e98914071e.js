new (function virarCarta() {
	this.act = function (carta, resolve, reject) {
		carta.classList.toggle('virada');
		
		let viradas = document.querySelector('.virada');
		let jogador = document.querySelector('#jogador1');
		if (viradas.length >= 2) {
		    let carta1 = viradas[0].querySelector('h1').innerText;
		    let carta2 = viradas[1].querySelector('h1').innerText;
		    if (carta1 == carta2) {
		        jogador.appendChild(carta1);
		        jogador.appendChild(carta2);
		    }
		}
		resolve();
	};
})();