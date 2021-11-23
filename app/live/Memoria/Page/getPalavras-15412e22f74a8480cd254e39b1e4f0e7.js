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
		        {a: 'ls', b: 'Listar arquivos'},
		        {a: 'cd', b: 'Mudar de diretório'},
		        {a: 'pwd', b: 'Imprimir diretório atual'},
		        {a: 'cat', b: 'Exibir conteúdo de arquivo'},
		        {a: 'grep', b: 'Procurar texto em arquivo'},
		        {a: 'find', b: 'Procurar arquivo'}
	        ],
		    'Inglês Assíncrono': [
		        {a: 'I', b: 'eu'},
		        {a: 'you', b: 'tu'},
		        {a: 'he', b: 'ele'},
		        {a: 'she', b: 'ela'},
		        {a: 'it', b: 'isto'},
		        {a: 'we', b: 'nós'},
		        {a: 'them', b: 'elas/eles'}
		    ]
		};
		resolve(palavras[tema]);
	};
})();