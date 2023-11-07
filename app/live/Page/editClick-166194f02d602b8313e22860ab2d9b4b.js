new (function editClick() {
    let edited = false;
	this.act = async function (event, resolve, reject) {
	    let agent = this.agent;
	    if (!event.ctrlKey) {
	        let ce = await Ceed('CE');
	        if (!document.querySelector('.CE')) {
	            await ce.see('appendTo', 'body');
	        }
	        else {
	            await ce.see('toggle');
	        }
	        if (!edited) {
                let body = await ce.see('getBody');
	            if (body[0].style.display != 'none') {
    	            agent.see('edit');
    	            edited = true;
	            }
	        }
	    }
	    else {
	        agent.see('ask', 'editClick');
	    }
		console.log(event);
		resolve();
	};
})();