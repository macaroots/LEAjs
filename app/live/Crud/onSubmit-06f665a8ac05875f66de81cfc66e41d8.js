new (function onSubmit() {
	this.act = async function (form, resolve, reject) {
	    var agente = this.agent;
	    var id = form.id.value;
	    var acao, mensagem;
		var divMensagem = document.getElementById('mensagem');
	    
	    try {
    	    if (id == 0) {
    	        mensagem = await agente.see('onInsert', form);
    	    }
    	    else {
    	        mensagem = await agente.see('onUpdate', form);
    	    }
    	
    		divMensagem.innerHTML = mensagem;
    		agente.see('list');
	    } catch (e) {
	        divMensagem.innerHTML = e.message;
	    }
    		
		resolve();
	};
})();