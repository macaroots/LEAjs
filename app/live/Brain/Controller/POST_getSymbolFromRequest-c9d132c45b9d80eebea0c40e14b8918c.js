new (function POST_getSymbolFromRequest() {
	this.act = async function (args, resolve, reject) {
		let brain = await import('./brain.js');
		let Symbol = brain.Symbol;
		
		let req = args[0];
		let res = args[1];
		
// console.log('POST_SYMBOL', req.body);

		let symbol = new Symbol();
		let role = args[2];
		let params = req.body[role] || req.body;
// console.log('POST_SYMBOL', params);

		if (params != null) {
    		if (undefined !== params.id) {
    		    symbol.id = params.id;
    		}
    		if (undefined !== params.type) {
    		    symbol.type = params.type;
    		}
    		if (undefined !== params.info) {
    		    symbol.info = params.info;
    		}
    	}
		resolve(symbol);
	};
})();