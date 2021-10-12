new (function merge() {
	this.act = async function (args, resolve, reject) {
		let [inBrain, outBrain, bookname, onlyLast] = args;
		let search = {};
		if (bookname) {
		    search.a = {info: bookname};
		}
		let links = (await inBrain.reason(search));
		
		let books = {};
		if (onlyLast) {
		    for (let link of links) {
		        let book = books[link.a.info];
		        if (!book) {
		            book = {};
		            books[link.a.info] = book;
		        }
		        book[link.r.info] = link.b;
		    }
		    links = [];
		    for (let book in books) {
		        let a = {info: book};
		        for (let key in books[book]) {
		            let r = {info: key};
		            let b = books[book][key];
		            links.push({a: a, r: r, b: b});
		        }
		    }
		}
		
		for (let l of links) {
		    await outBrain.tie(l);
		}
		resolve(links);
	};
})();