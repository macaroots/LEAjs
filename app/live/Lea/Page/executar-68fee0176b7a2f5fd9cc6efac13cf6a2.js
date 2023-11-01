new class executar {
	act(args, resolve, reject) {
		const agent = this.agent;
		
	    if (event.ctrlKey) {
	        agent.see('ask', 'executar');
	        resolve();
	        return;
	    }
	    
		let [ idCodigo, idResposta ] = args;
		let codigo = agent.editor.getValue(); // document.querySelector(idCodigo).innerText;
		let divResposta = document.querySelector(idResposta);
		
	    let assert = {
	        equal: function (atual, esperado) {
    	        divResposta.innerText += `\nTest success: ${atual == esperado}`;
    	        divResposta.innerText += `\nAtual: ${atual}, Esperado: ${esperado}`;
    	    }
	    };
	    divResposta.innerText = 'Executando em ' + new Date() + '\n ';
		eval(codigo);
		resolve();
	}
}();
