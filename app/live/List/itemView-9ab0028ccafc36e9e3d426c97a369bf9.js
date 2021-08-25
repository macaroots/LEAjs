new (function itemView () {
	this.act = function (args, resolve, reject) {
	    let agent = this.agent;
		let html = '<div class="item id' + args.id + '">';
		for (let i in args) {
		    html += '\n\t<span class="' + i + '">' + args[i] + '</span>';
		}
		html += '\n</div>';
		let item = $(html);
		resolve(item);
	};
})();