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
		// Coloca url e id nos links
		let url = await agent.see('getUrl');
		for (let a of html.querySelectorAll('a')) {
		    a.href = url + a.href;
		    a.href += bean.id;
		}
		// Altera campos customizados
	    try {
            html.querySelector('.image').src = '/uploads/' + bean.image;
            html.querySelector('.image').alt = bean.name;
	    } catch {};
		resolve(html);
	};
})();