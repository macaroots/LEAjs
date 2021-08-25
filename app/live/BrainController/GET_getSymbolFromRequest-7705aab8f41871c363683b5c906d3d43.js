new (function GET_getSymbolFromRequest() {
	this.act = async function (args, resolve, reject) {
		let brain = await import('./brain.js');
		let Symbol = brain.Symbol;
		
		let req = args[0];
		let res = args[1];
		
		
		let url = await import('url');
		let params = url.parse(req.url,true).query;
		
		let prefix;
	    let sufix;
	    if (!args[2]) {
	        prefix = '';
	        sufix = '';
	    }
	    else {
	        prefix = args[2] + '[';
	        sufix = ']';
	    }

		let symbol = new Symbol();
		if (params != null) {
		    let id = params[prefix + 'id' + sufix];
		    let type = params[prefix + 'type' + sufix];
		    let info = params[prefix + 'info' + sufix];
    		if (undefined !== id && id != '') {
    		    symbol.id = id;
    		}
    		if (undefined !== type && type != '') {
    		    symbol.type = type;
    		}
    		if (undefined !== info && info != '') {
    		    symbol.info = info;
    		}
    	}
		resolve(symbol);
	};
})();