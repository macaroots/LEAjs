new (function onSubmit() {
	this.act = async function (form, resolve, reject) {
	    var agente = this.agent;
	    var id = form.id.value;
	    var acao, mensagem;
	    
	    if (id == 0) {
	        mensagem = await agente.see('onInsert', form);
	    }
	    else {
	        mensagem = await agente.see('onUpdate', form);
	    }
    	
		var divMensagem = document.getElementById('mensagem');
		divMensagem.innerHTML = mensagem;
		agente.see('list');
    		
		resolve();
	};
})();