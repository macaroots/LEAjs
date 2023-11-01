new class validate {
	act(bean, resolve, reject) {
		const agent = this.agent;
		if (!bean.nome) {
	        return reject(new Error('Digite um nome!'));
	    }
		resolve(true);
	}
}();
