new (function live () {
	this.act = async function (target, resolve, reject) {
console.log('SCRIPT LIVE', this.agent.toString());
		let agent = this.agent;
		await agent.see('addName', 'Script Element');
		let config = function (url='https://cdnjs.cloudflare.com/ajax/libs/ace/1.8.1/') { 
			ace.config.set('modePath', url);
			ace.config.set('workerPath', url);
			ace.config.set('themePath', url);
			
			resolve(true);
		};
	    let loadAce = new Promise((resolve, reject) => {
			$.ajax({
				type: "GET",
				url: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.8.1/ace.min.js',
				dataType: "script",
				cache: true,
				success: config,
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    console.log("Couldn't load ace. Trying another source..."); 
                    $.ajax({
        				type: "GET",
        				url: 'https://tiia.com.br/_js/lib/ace.min.js',
        				dataType: "script",
        				cache: true,
        				success: config
                    });
                }     
			});
	    });
	    await Promise.all([
	        loadAce,
			agent.see('study', 'html'),
			agent.see('study', 'reloadHtml'),
			agent.see('study', 'getHtml'),
			agent.see('study', 'appendTo'),
			agent.see('study', 'trigger'),
			agent.see('study', 'onLoad'),
	        agent.see('study', 'askFor'),
			agent.see('study', 'askBind')
		]);
		
		agent.see('listenWindow');
		resolve(true);
	};
})();