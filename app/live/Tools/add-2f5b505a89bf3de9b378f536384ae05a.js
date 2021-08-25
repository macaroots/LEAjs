new (function add () {
	this.act = function (args, callback) {
		var agent = this.agent;
		agent.see('getBody').then(function (body) {
		    var form = $('<form>').appendTo(body);
		    var text = $('<input name="text" placeholder="Button text" />').appendTo(form);
		    var functionName = $('<input name="function" placeholder="Function name" />').appendTo(form);
		    var btOk = $('<input type="submit" />').appendTo(form);
		    var btCancel = $('<input type="reset" />').appendTo(form);
		    form.submit(function () {
		        agent.see('newButton', [text.val(), functionName.val(), true]);
		        form.remove();
		        return false;
		    });
		    btCancel.click(function () {
		        form.remove();
		    });
		});
		callback(true); // return statement
	};
})();