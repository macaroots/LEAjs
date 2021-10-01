new (function itemView () {
	this.act = function (args, resolve, reject) {
	    let agent = this.agent;
		let html = '<tr class="item id' + args.id + '">';
		for (let i in args) {
		    html += '\n\t<td class="' + i + '">' + args[i] + '</td>';
		}
		html += '\n</tr>';
		resolve(html);
	};
})();