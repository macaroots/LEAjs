new (function typeChanged() {
	this.act = function (type, resolve, reject) {
	    var agent = this.agent;
	    agent.see('get', 'editor').then(function (editor) {
            var mode = type.value;
            var session = editor.getSession();
            var question = $('.questions .selected')[0];
            question._type = mode;
            if (mode == 'js') {
                mode = 'javascript';
            }
            session.setMode('ace/mode/' + mode);
	        
	    });
		resolve();
	};
})();