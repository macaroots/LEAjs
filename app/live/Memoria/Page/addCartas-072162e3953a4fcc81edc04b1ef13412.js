new (function addCartas() {
	this.act = async function (palavras, resolve, reject) {
	    let agent = this.agent;
	    await agent.see('study', 'addCarta');
        while (true) {
            let tamanho = palavras.length;
            if (tamanho == 0) {
                break;
            }
            const i = Math.floor(Math.random() * (tamanho));
            // tira uma das palavras de um índice aleatório
		    let palavra = palavras.splice(i, 1)[0];
		  //  await agent.see('addCarta', palavra);
		    agent.see('addCarta', palavra);
		}
		resolve();
	};
})();