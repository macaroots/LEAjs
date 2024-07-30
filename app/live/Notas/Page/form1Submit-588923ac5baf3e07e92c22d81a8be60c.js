new class Form1SubmitAction {
	act(args, resolve, reject) {
		const agent = this.agent;
		const form = document.querySelector('#form1');
		let nota1 = parseInt(form.nota1.value);
		let nota2 = parseInt(form.nota2.value);
		
		let media = (nota1 + nota2) / 2;
		
		document.querySelector('#media1').innerText = media;
		document.getElementById('formFinal').media1.value = media;
		resolve();
	}
}();
