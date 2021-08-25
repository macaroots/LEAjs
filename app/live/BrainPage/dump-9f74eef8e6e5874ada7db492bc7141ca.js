new (function dump () {
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        
        element.style.display = 'none';
        document.body.appendChild(element);
        
        element.click();
        
        document.body.removeChild(element);
    }
	this.act = async function (agentName, callback) {
	    let HTTPAgent = (await import('./agent.js')).HTTPAgent;
	    let presenter = this.agent;
		var controller = new HTTPAgent('brain');
    	controller.see('reason', {'a[info]': agentName}, (links) => {
    	    presenter.see('renderDump', links, (text) => {
    	        download(agentName + '.js', text);
    	        //console.log(text);
    	    });
    	});
		callback(true); // return statement
	};
})();