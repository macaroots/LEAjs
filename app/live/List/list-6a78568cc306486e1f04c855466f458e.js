new (function list() {
	this.act = async function (args, resolve, reject) {
	    const agent = this.agent;
	    const body = await agent.see('getBody');
	    const tbody = body.find('.list')[0];
	    
		tbody.innerHTML = "Carregando...";
		let url = await agent.see('listUrl');
		let r = await fetch(url);
		let rows = await r.json();
	    let html = '';
	    for (let row of rows) {
	        let item = await agent.see('format', [
	            await agent.see('itemView'), row
	        ]);
            html += item;
        }
	    tbody.innerHTML = html;
			
		resolve();
	};
})();