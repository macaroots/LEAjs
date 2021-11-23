new (function virarCarta() {
	this.act = async function (carta, resolve, reject) {
		let jogador = await this.agent.see('getJogador');
		let viradas = document.querySelectorAll('main .virada');
console.log(viradas);
		if (viradas.length < 2) {
    		if (carta.classList.contains('virada')) {
    		    return resolve();
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
		}
		else {
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