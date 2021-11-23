new (function virarCarta() {
    let cliques = 0;
	this.act = function (carta, resolve, reject) {
	    cliques++;
		carta.classList.add('virada');
		let viradas = document.querySelectorAll('main .virada');
console.log(viradas, cliques);
		let jogador = document.querySelector('#jogador1');
		switch (cliques % 3) {
		    case 2:
    		    try {
    		        let carta1 = viradas[0].querySelector('h1').innerText;
        		    let carta2 = viradas[1].querySelector('h1').innerText;
        		    if (carta1 == carta2) {
        		        jogador.appendChild(viradas[0]);
        		        jogador.appendChild(viradas[1]);
        		    }
        		    else {
        		        break;
        		    }
    		    } catch {
    		        cliques--;
    		        break;
    		    }
            case 0:
	            for (let carta of viradas) {
                    carta.classList.remove('virada');
                }
            case 1:
		}
		let cartas = document.querySelectorAll('main article');
        if (cartas.length == 0) {
            agent.see('venceu');
        }

		resolve();
	};
})();