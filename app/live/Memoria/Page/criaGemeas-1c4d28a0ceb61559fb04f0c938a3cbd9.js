new (function criaGemeas() {
	this.act = function (originais, resolve, reject) {
	    let gemeas = [];
	    for (let p of originais) {
	        gemeas.push(new Palavra(p.chave));
	    }
		let palavras = originais.concat(gemeas);
		resolve(palavras);
	};
})();