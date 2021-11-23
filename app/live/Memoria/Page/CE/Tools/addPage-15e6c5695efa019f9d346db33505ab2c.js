new (function addPage() {
	this.act = function (args, resolve, reject) {
		alert('nova página');
		resolve();
	};
})();