new class Form1SubmitAction {
	act(args, resolve, reject) {
		const agent = this.agent;
		const form = document.querySelector('#form1');
		let nota1 = parseInt(form.nota1.value);
		let nota2 = parseInt(form.nota2.value);
		
		let media = (nota1 + nota2) / 2;
		
		let divMedia = document.querySelector('#media1');
		divMedia.innerText = media;
		document.getElementById('formFinal').media1.value = media;
		
		if (media > 7) {
		    divMedia.classList.add('aprovado');
		    divMedia.classList.remove('reprovado');
		}
		else {
		    divMedia.classList.add('reprovado');
		    divMedia.classList.remove('aprovado');
		}
		
		resolve();
	}
}();
