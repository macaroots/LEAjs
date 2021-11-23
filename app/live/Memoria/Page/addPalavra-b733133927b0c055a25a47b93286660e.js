new (function addPalavra() {
	this.act = function (palavra, resolve, reject) {
	    let agent = this.agent;
		let main = document.querySelector('main');
		let template = document.querySelector('#carta');
		
        let carta = template.content.cloneNode(true);
        let h1 = carta.querySelector("h1");
        h1.textContent = palavra;
        
		let cartas = document.querySelectorAll('article');
		let total = cartas.length  - 1;
		window.carta = carta;
        let coluna = total % 4;
        let linha = Math.floor(total / 4);
        carta.style['grid-column'] = total % 4;
        carta.style['grid-row'] = Math.floor(total / 4);
        console.log(linha, coluna);
        main.appendChild(carta);
		resolve();
	};
})();