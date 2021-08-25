new (function askBind () {
	this.act = function (args, resolve, reject) {
	    let agent = this.agent;
	    let target = args[2];
	    agent.see('askFor', args).then(function (question) {
	        let session = question.session;
            session.removeAllListeners('change');
            if (target.html() != '') {
                session.setValue(target.html(), -1);
                session.getUndoManager().markClean();
            }
            session.on('change', function() {
                target.html(session.getValue());
            });
		resolve();
	    });
	};
})();