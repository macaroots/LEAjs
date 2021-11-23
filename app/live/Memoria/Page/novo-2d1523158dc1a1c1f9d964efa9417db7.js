new (function novo() {
	this.act = async function (form, resolve, reject) {
		let main = document.querySelector('main');
		let tema = form.tema.value;
		main.innerHTML = '';
		let agent = this.agent;
		let palavras = await agent.see('getPalavras', tema);
console.log(palavras);
		palavras = palavras.concat(palavras);
		
		for (let palavra of palavras) {
		    agent.see('addPalavra', palavra);
		}
		resolve();
	};
})();