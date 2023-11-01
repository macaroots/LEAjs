new class onUpdate {
	async act(form, resolve, reject) {
	    let agente = this.agent;
	    let id = form.id.value;
	    let acao; 
	    
		let bean = await agente.see('getBeanFromForm', form);
		const dados = new URLSearchParams(bean).toString();
		let url = await agente.see('updateUrl');
    	let r = await fetch(url, {
    		method: 'PUT',
    		headers: {
    // 			'Content-Type': 'multipart/form-data'
    			'Content-Type': 'application/x-www-form-urlencoded'
    		},
    		body: dados
    	});
    		
		resolve(await r.text());
	};
}();