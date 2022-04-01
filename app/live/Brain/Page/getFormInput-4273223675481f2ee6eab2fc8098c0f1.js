new class getFormInput {
	act(input, resolve, reject) {
		let form = input.parentElement.parentElement;
		resolve(form);
	}
}();