new (function getPalavras() {
	this.act = function (tema, resolve, reject) {
		let palavras = {
		    'Linux': [
		        'ls', 'cd', 'pwd', 'cat', 'grep', 'find'
		    ],
		    'Inglês': [
		        'I', 'you', 'he', 'she', 'it', 'we', 'them'
		    ]
		};
		resolve(palavras[tema]);
	};
})();