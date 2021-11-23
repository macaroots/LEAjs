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
		
        while (true) {
            let tamanho = palavras.length;
            if (tamanho == 0) {
                break;
            }
            const i = Math.floor(Math.random() * (tamanho + 1));
		    let palavra = palavras.splice(i, 1)[0];
		    agent.see('addPalavra', palavra);
		}
		resolve();
	};
})();