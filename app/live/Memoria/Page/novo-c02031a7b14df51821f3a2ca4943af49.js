new (function novo() {
	this.act = async function (args, resolve, reject) {
		let form = document.querySelector('.Page form');
		let main = document.querySelector('main');
		let jogador = document.querySelector('#jogador1');
		main.innerHTML = '';
		jogador.innerHTML = '';
		let tema = form.tema.value;
		let agent = this.agent;
		let palavras = await agent.see('getPalavras', tema);
	    await agent.see('study', 'addPalavra');
	    let gemeas = [...palavras];
	    gemeas.forEach(p => p.limpar());
		palavras = palavras.concat(gemeas);
console.log(palavras);		
        while (true) {
            let tamanho = palavras.length;
            if (tamanho == 0) {
                break;
            }
            const i = Math.floor(Math.random() * (tamanho));
		    let palavra = palavras.splice(i, 1)[0];
		    await agent.see('addPalavra', palavra);
		}
		resolve();
	};
})();