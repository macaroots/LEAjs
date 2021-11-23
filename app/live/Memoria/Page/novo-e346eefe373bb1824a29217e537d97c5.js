new (function novo() {
	this.act = async function (form, resolve, reject) {
		let main = document.querySelector('main');
		let jogador = document.querySelector('#jogador1');
		main.innerHTML = '';
		jogador.innerHTML = '';
		let tema = form.tema.value;
		let agent = this.agent;
		let palavras = await agent.see('getPalavras', tema);
		palavras = palavras.concat(palavras);
		
        for (let i = palavras.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
		    let palavra = palavras.splice(j, 1)[0];
		    agent.see('addPalavra', palavra);
		}
		resolve();
	};
})();