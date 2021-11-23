new (function novo() {
	this.act = async function (args, resolve, reject) {
		let agent = this.agent;
		
		await agent.see('limpar');
		let tema = await agent.see('getTema');
		let palavras = await agent.see('getPalavras', tema);
        console.log('Iniciando jogo!', palavras);
        agent.see('addCartas', palavras);
		resolve();
	};
})();