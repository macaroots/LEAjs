new (function validate() {
	this.act = function (bean, resolve, reject) {
	    if (bean.mensagem == '') {
	        return reject(new Error('Digite uma mensagem!'));
	    }
		resolve(true);
	};
})();
