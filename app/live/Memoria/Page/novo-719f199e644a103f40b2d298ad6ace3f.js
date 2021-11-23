new (function novo() {
	this.act = async function (args, resolve, reject) {
		let agent = this.agent;
		
		await agent.see('limpar');
		let tema = await agent.see('getTema');
		let palavras = await agent.see('getPalavras', tema);
	    await agent.see('study', 'addPalavra');
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