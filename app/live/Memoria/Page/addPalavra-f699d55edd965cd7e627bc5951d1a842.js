new (function addPalavra() {
	this.act = function (palavra, resolve, reject) {
	    let agent = this.agent;
		let main = document.querySelector('main');
		let template = document.querySelector('#carta');
		
        let carta = template.content.cloneNode(true);
        let h1 = carta.querySelector("h1");
        h1.textContent = palavra;
        
        carta.onclick = function (e) {
            agent.see('virarCarta', carta);
        }
        
        main.appendChild(carta);
		resolve();
	};
})();