new (function merge() {
	this.act = async function (args, resolve, reject) {
		let [inBrain, outBrain, bookname] = args;
		let search = {};
		if (bookname) {
		    search.a = {info: bookname};
		}
		let links = await inBrain.reason(search);
		for (let l of links) {
		    outBrain.tie(l);
		}
		resolve(links);
	};
})();