new (function getPalavras() {
	this.act = function (tema, resolve, reject) {
		let palavras = {
		    'Linux': [
		        'ls', 'cd', 'pwd', 'cat', 'grep', 'find'
		    ]
		};
		resolve(palavras[tema]);
	};
})();