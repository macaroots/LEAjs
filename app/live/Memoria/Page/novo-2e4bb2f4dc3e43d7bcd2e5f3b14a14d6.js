new (function novo() {
	this.act = async function (args, resolve, reject) {
		let agent = this.agent;
		
		await agent.see('limpar');
		
		let form = document.querySelector('.Page form');
		let tema = form.tema.value;
		let palavras = await agent.see('getPalavras', tema);
	    await agent.see('study', 'addPalavra');
	    let gemeas = [];
	    for (let p of palavras) {
	        gemeas.push(new Palavra(p.chave));
	    }
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