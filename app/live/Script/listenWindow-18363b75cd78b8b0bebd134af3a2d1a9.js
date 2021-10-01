new (function listenWindow() {
	this.act = function (args, resolve, reject) {
	    let agent = this.agent;
	    window.addEventListener('beforeunload', function(e) {
    	    let changed = document.querySelectorAll('.changed');
	        if (changed.length > 0) {
                // Cancel the event
                e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
                // Chrome requires returnValue to be set
                e.returnValue = '';
	        }
	        // libera pra descarregar
	        delete e['returnValue'];
        });
		resolve();
	};
})();