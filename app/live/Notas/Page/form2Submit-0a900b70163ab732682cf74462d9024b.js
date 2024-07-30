new class Form1SubmitAction {
	act(args, resolve, reject) {
		const agent = this.agent;
		const form = document.querySelector('#form2');
		let nota3 = parseInt(form.nota3.value);
		let nota4 = form.nota4.value;
		
		let media = nota3 + nota4 / 2;
		
		document.querySelector('#media2').innerText = media;
		resolve();
	}
}();
