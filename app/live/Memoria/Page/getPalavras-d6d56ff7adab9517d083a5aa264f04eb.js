new (function getPalavras() {
    class Palavra {
        constructor(chave, valor=chave) {
            this.chave = chave;
            this.valor = valor;
        }
        limpar() {
            this.valor = this.chave;
        }
    }
	this.act = function (tema, resolve, reject) {
		let palavras = {
		    'Linux': [
		        new Palavra('ls'),
		        new Palavra('cd'),
		        new Palavra('pwd'),
		        new Palavra('cat'),
		        new Palavra('grep'),
		        new Palavra('find'),
		    ],
		    'Inglês': [
		        new Palavra('I'),
		        new Palavra('you'),
		        new Palavra('he'),
		        new Palavra('she'),
		        new Palavra('it'),
		        new Palavra('we'),
		        new Palavra('them'),
		    ],
		    'Linux Assíncrono': [
		        new Palavra('ls', 'Listar arquivos'),
		        new Palavra('cd', 'Mudar de diretório'),
		        new Palavra('pwd', 'Imprimir diretório atual'),
		        new Palavra('cat', 'Exibir conteúdo de arquivo'),
		        new Palavra('grep', 'Procurar texto em arquivo'),
		        new Palavra('find', 'Procurar arquivo')
	        ],
		    'Inglês Assíncrono': [
		        new Palavra('I', 'eu'),
		        new Palavra('you', 'tu'),
		        new Palavra('he', 'ele'),
		        new Palavra('she', 'ela'),
		        new Palavra('it', 'isto'),
		        new Palavra('we', 'nós'),
		        new Palavra('them', 'elas/eles')
		    ]
		};
		resolve(palavras[tema]);
	};
})();