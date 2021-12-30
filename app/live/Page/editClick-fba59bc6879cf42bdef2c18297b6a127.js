new (function editClick() {
	this.act = async function (event, resolve, reject) {
	    let agent = this.agent;
	    if (!event.ctrlKey) {
	        let ce = await Ceed('CE');
	        if (!document.querySelector('.CE')) {
	            ce.see('appendTo', 'body');
	            agent.see('edit');
	        }
	        else {
	            ce.see('toggle');
	        }
	    }
	    else {
	        agent.see('ask', 'editClick');
	    }
		console.log(event);
		resolve();
	};
})();