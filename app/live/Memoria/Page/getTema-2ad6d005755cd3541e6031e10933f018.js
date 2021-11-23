new (function getTema() {
	this.act = function (args, resolve, reject) {
		let form = document.querySelector('.Page form');
		let tema = form.tema.value;
		resolve(tema);
	};
})();