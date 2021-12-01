new (function onSubmit() {
	this.act = async function (form, resolve, reject) {
	    var agente = this.agent;
	    var id = form.id.value;
	    var acao; 
	    if (id == 0) {
	        acao = 'insert';
	    }
	    else {
	        acao = 'edit';
	    }
		const dados = $(form).serialize();
		let url = await agent.see('getUrl');
    	let r = await fetch(url + acao, {
    		method: 'POST',
    		headers: {
    			'Content-Type': 'application/x-www-form-urlencoded'
    		},
    		body: dados
    	});
		var mensagem = document.getElementById('mensagem');
		mensagem.innerHTML = await r.text();
		agente.see('list');
    		
		resolve();
	};
})();