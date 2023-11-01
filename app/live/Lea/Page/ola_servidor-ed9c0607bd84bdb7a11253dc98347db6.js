new class ola_servidor {
	async act(args, resolve, reject) {
		const agent = this.agent;
	    if (event.ctrlKey) {
	        agent.see('ask', 'ola_servidor');
	        return resolve();
	    }
		let r = await fetch('novo_agente/ola_servidor');
		let resposta = await r.text();
		let divResposta = document.querySelector('#resposta_exemplo_servidor');
		divResposta.innerText = new Date();
		divResposta.innerText += '\n\n' + resposta;
		resolve();
	}
}();
