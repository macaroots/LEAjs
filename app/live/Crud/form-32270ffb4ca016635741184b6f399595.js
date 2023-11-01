new class Form {
	async act(id, resolve, reject) {
	    let agent = this.agent;
		let url = await agent.see('getByIdUrl');
	    let r = await fetch(url + '?id=' + id);
	    let bean = await r.json();
	    let body = (await agent.see('getBody'))[0];
	    let form = body.querySelector('form');
	    form.id.value = id;
	    for (let p in bean) {
	        form[p].value = bean[p];
	    }
		resolve();
	}
}();
