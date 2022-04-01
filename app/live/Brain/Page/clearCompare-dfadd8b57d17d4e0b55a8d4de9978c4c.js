new class clearCompare {
	act(args, resolve, reject) {
		let inputs = document.querySelectorAll('input[name=compare]:checked');
		for (let input of inputs) {
		    input.checked = false;
		}
		document.querySelector('.diff').style.display = 'none';
		resolve();
	}
}();