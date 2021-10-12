new (function renderReason () {
	this.act = function (links, callback) {
	    var agent = this.agent;
	    agent.see('getBody').then(function (body) {
    		var response = body.find('.responses');
    	    response.html('');
    	    var objects = {};
    	    var symbols = {};
    	    for (var i in links) {
    	        var link = links[i];
                try {
        	        symbols[link.a.id] = link.a;
        	        symbols[link.r.id] = link.r;
        	        symbols[link.b.id] = link.b;
        	        if (!(link.a.id in objects)) {
        	            objects[link.a.id] = {};
        	        }
        	        var methods = objects[link.a.id];
        	        if (!(link.r.id in methods)) {
        	            methods[link.r.id] = [];
        	        }
        	        methods[link.r.id].push(link.b.id);
                } catch (e) {
                    console.log('Error on reasoning!');
                    console.log(link);
                    console.log(e);
                }
    	    }
    	    
    	    var loadSymbol = function (e) {
    	        var li = this;
    	        var id = li.innerHTML.split(' - ')[0];
    	        li.innerHTML += 'ing...';
    	        fetch('/brain/gets?id=' + id).then(async function (r) {
    	            let symbols = await r.json();
    	            var symbol = symbols[0];
    	            $(li).unbind();
    	            li.innerHTML = '';
    	            var form = $('<form>').appendTo(li);
    	            form.text(symbol.id + ' - ');
    	            var txType = $('<input>');
    	            txType.val(symbol.type);
    	            txType.appendTo(form);
    	            var txInfo = $('<textarea rows="15" cols="50">');
    	            txInfo.appendTo(form).val(symbol.info);
    	            var btSet = $('<button>set</button>');
    	            form.submit(function (e) {
    	                var symbol = new Symbol(id, txType.val(), txInfo.val());
    	                agent.see('setClick', symbol);
    	                return false;
    	            })
    	            btSet.appendTo(form);
    	        });
    	        e.stopPropagation();
    	        return false;
    	    };
    	    
    	    var objectsTree = $('<ul>').appendTo(response);
    	    for (var object in objects) {
    	        var a = symbols[object];
    	        var objectTree = $('<li>').prependTo(objectsTree);
    	        objectTree.append('<input type="checkbox" id="c' + object + '" checked="checked" /><label for="c' + object + '"><b>' + a.id + ' - ' + a.type + ' - ' + a.info + '</b></label>');
    	        var methods = objects[object];
    	        var methodsTree = $('<ul>').appendTo(objectTree);
    	        for (var method in methods) {
    	            var r = symbols[method];
    	            var methodTree = $('<li>').prependTo(methodsTree);
    	            methodTree.append('<input type="checkbox" id="c' + object + '_' + method + '" /><label for="c' + object + '_' + method + '"><i>' + r.id + ' - ' + r.type + ' - ' + r.info + '</i></label>');
    	            var values = methods[method];
    	            var valuesTree = $('<ul>').appendTo(methodTree);
    	            for (var i in values) {
    	                var b = symbols[values[i]];
    		            var li = $('<li>' + b.id + ' - ' + b.type + ' - Load</li>').prependTo(valuesTree);
    		            li.click(loadSymbol);
    	            }
    	        }
    	    }
	    });
	};
})();