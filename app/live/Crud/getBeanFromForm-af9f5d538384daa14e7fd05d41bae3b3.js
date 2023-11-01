new class getBeanFromForm {
	act(form, resolve, reject) {
		const bean = new FormData(form);
		resolve(bean);
	}
}();
