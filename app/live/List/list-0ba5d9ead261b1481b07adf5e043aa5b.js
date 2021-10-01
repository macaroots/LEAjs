new (function list() {
	this.act = async function (args, resolve, reject) {
	    const agent = this.agent;
	    const body = await agent.see('getBody');
	    const table = body.find('table')[0];
	    let header = table.tHead;
	    let tbody = table.tBodies[0];
	    
		tbody.innerHTML = "Carregando...";
		let url = await agent.see('getUrl');
		let r = await fetch(url + 'list');
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