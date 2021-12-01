new (function list() {
	this.act = async function (args, resolve, reject) {
	    const agent = this.agent;
	    const body = await agent.see('getBody');
	    const tbody = body.find('.list')[0];
	    
		tbody.innerHTML = "Carregando...";
		let url = await agent.see('listUrl');
		let r = await fetch(url);
		let rows = await r.json();
	    await agent.see('study', 'itemView');
	    let html = '';
	    for (let row of rows) {
            html += await agent.see('itemView', row);
        }
	    tbody.innerHTML = html;
			
		resolve();
	};
})();