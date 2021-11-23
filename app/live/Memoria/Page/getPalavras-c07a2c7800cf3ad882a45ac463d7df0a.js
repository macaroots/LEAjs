new (function getPalavras() {
	this.act = function (tema, resolve, reject) {
		let palavras = {
		    'linux': [
		        'ls', 'cd', 'pwd', 'cat', 'grep', 'find'
		    ]
		};
		resolve();
	};
})();