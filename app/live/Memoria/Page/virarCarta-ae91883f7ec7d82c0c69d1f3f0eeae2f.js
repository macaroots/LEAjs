new (function virarCarta() {
	this.act = function (carta, resolve, reject) {
		let jogador = document.querySelector('#jogador1');
		let viradas = document.querySelectorAll('main .virada');
console.log(viradas);
		switch (viradas.length) {
		    case 0:
		    case 1:
        		if (carta.classList.contains('virada')) {
        		    break;
        		}
        		carta.classList.add('virada');
    		    try {
    		        let palavra1 = viradas[0].querySelector('h1').chave;
        		    let palavra2 = carta.querySelector('h1').chave;
        		    if (palavra1 == palavra2) {
        		        jogador.appendChild(viradas[0]);
        		        jogador.appendChild(carta);
        		    }
    		    } catch {
    		    }
		        break;
		    default:
	            for (let carta of viradas) {
                    carta.classList.remove('virada');
                }
		}
		let cartas = document.querySelectorAll('main article');
        if (cartas.length == 0) {
            agent.see('acabou');
        }

		resolve();
	};
})();