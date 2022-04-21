new class Delete {
	async act(id, resolve, reject) {
	    let agent = this.agent;
	    if (confirm('Delete #' + id)) {
	        let url = await agent.see('getUrl');
        	let r = await fetch(url + 'delete?id=' + id);
    		var message = document.getElementById('mensagem');
    		message.innerHTML = await r.text();
    		agent.see('list');
	    }
		resolve();
	}
}();
