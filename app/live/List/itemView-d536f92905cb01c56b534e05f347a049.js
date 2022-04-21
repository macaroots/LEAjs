new (function itemView () {
	this.act = async function (bean, resolve, reject) {
	    let agent = this.agent;
	    let body = await agent.see('getBody');
	    let template = body.find('template')[0];
	    let html = template.content.cloneNode(true);
	    
		for (let p in bean) {
		    try {
		        html.querySelector('.' + p).textContent = bean[p];
		    } catch {};
		}
		resolve(html);
	};
})();