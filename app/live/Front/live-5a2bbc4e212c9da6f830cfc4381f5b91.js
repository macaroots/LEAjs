new (function Live() {
	this.act = async function(args, resolve, reject) {
		console.log(this.agent + '- LEA.live');
		
		// estuda enquanto tem o Ceed.JSBrain
		let lea = this.agent;
		// servidor HTTP
		await Promise.all([
            lea.see('study', 'listen'),
            lea.see('study', 'http'),
            // servidor Socket
            lea.see('study', 'onSocketConnection'),
            lea.see('study', 'onSocketSee'),
            lea.see('study', 'checkPermission'),
            // concentra perguntas
            lea.see('study', 'onNewAgent'),
            lea.see('study', 'onQuestion'),
            lea.see('study', 'onAnswer')
        ]);
		
		let ceed = await Ceed();
        ceed.see('addListener', ['newAgent', lea]);
        ceed.see('addListener', ['question', lea]);
		ceed.skills['hear'] = new HearNotify();
		resolve(true);
	};
})();