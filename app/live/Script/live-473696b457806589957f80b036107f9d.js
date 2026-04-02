new (function live () {
	this.act = async function (target, resolve, reject) {
		console.log('SCRIPT LIVE', this.agent.toString());

		let agent = this.agent;
		const VERSION = '1.43.3';

		await agent.see('addName', 'Script Element');

		let config = function (url = 'https://cdnjs.cloudflare.com/ajax/libs/ace/' + VERSION + '/') {
			ace.config.set('modePath', url);
			ace.config.set('workerPath', url);
			ace.config.set('themePath', url);

			resolve(true);
		};

		function loadScript(src) {
			return new Promise((resolve, reject) => {
				const script = document.createElement('script');
				script.src = src;
				script.async = true;

				script.onload = () => resolve();
				script.onerror = () => reject();

				document.head.appendChild(script);
			});
		}

		let loadAce = (async () => {
			try {
				await loadScript(`https://cdnjs.cloudflare.com/ajax/libs/ace/${VERSION}/ace.min.js`);
				config();
			} catch (e) {
				console.log("Couldn't load ace. Trying another source...");
				try {
					await loadScript('/_js/lib/ace.min.js');
					config('/_js/lib/ace/');
				} catch (err) {
					reject(err);
				}
			}
		})();

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