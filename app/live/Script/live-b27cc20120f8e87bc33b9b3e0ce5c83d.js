new (function live () {
	this.act = async function (target, resolve, reject) {
console.log('SCRIPT LIVE', this.agent.toString());
		let agent = this.agent;
		await agent.see('addName', 'Script Element');
	    let loadAce = new Promise((resolve, reject) => {
			$.ajax({
				type: "GET",
				url: 'https://pagecdn.io/lib/ace/1.4.12/ace.min.js',
				dataType: "script",
				cache: true,
				success: function () { 
					ace.config.set('modePath', 'https://pagecdn.io/lib/ace/1.4.12/');
					ace.config.set('workerPath', 'https://pagecdn.io/lib/ace/1.4.12/');
					ace.config.set('themePath', 'https://pagecdn.io/lib/ace/1.4.12/');
					
					resolve(true);
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