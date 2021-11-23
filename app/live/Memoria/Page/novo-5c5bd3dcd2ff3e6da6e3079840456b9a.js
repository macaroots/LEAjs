new (function novo() {
	this.act = async function (form, resolve, reject) {
		let main = document.querySelector('main');
		let tema = form.tema.value;
		main.innerHTML = '';
		let agent = this.agent;
		let palavras = await agent.see('getPalavras', tema);
console.log(palavras);
		palavras = palavras.concat(palavras);
		
        for (let i = palavras.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
		    let palavra = palavras.splice(j, 1)[0];
		    agent.see('addPalavra', palavra);
		}
		resolve();
	};
})();