new (function download () {
	this.act = function (args, callback) {
	    function download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            
            element.style.display = 'none';
            document.body.appendChild(element);
            
            element.click();
            
            document.body.removeChild(element);
        }
	    
	    
		var script = this.agent;
		script.see('get', 'editor').then(function (editor) {
		    script.see('getBody').then(function (body) {
		        var question = body.find('.selected');
		        var asker = question[0].agent;
		        var key = question.find('input').val();
		        var type = body.find('input[name=type]').val();
				var info = editor.getValue();
	            download(key + '.' + type, info);
		    });
		});
		callback(args); // return statement
	};
})();