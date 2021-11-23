new (function getPalavras() {
	this.act = function (tema, resolve, reject) {
		let palavras = {
		    'Linux': [
		        'ls', 'cd', 'pwd', 'cat', 'grep', 'find'
		    ],
		    'Inglês': [
		        'I', 'you', 'he', 'she', 'it', 'we', 'them'
		    ],
		    'Linux Assíncrono': [
		        ['ls', 'Listar arquivos'],
		        ['cd', 'Mudar de diretório'],
		        ['pwd', 'Imprimir diretório atual'],
		        ['cat', 'Exibir conteúdo de arquivo'],
		        ['grep', 'Procurar texto em arquivo'],
		        ['find', 'Procurar arquivo']
	        ],
		    'Inglês Assíncrono': [
		        ['I', 'eu'],
		        ['you', 'tu']
		        ['he', 'ele'],
		        ['she', 'ela'],
		        ['it', 'isto'],
		        ['we', 'nós'],
		        ['them', 'elas/eles']
		    ]
		};
		resolve(palavras[tema]);
	};
})();