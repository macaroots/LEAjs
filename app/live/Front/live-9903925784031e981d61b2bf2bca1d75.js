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
            lea.see('study', 'onQuestion'),
            lea.see('study', 'onAnswer')
        ]);
		
		// todos os agentes a partir de agora perguntam pro LEA
		// TODO efeito colateral!? talvez, all over the place.
		let ceed = await Ceed();
        /**/
        // não mudaria o que tem dentro. mas adiciona burocracia.
        ceed.see('addListener', ['question', lea]);
        /*/
		ceed.skills['ask'] = new AskAgent('LEA');
        /**/
		ceed.skills['hear'] = new HearNotify();
		resolve(true);
	};
})();