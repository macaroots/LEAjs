new class compareClick {
	async act(event, resolve, reject) {
console.log(event);
		let inputs = document.querySelectorAll('input[name=compare]:checked');
		switch (inputs.length) {
		    default:
		        let lastInput = inputs[inputs.length - 2];
		        if (lastInput == event.target) {
		            lastInput = inputs[inputs.length - 1];
		        }
		        lastInput.checked = false;
		        inputs = document.querySelectorAll('input[name=compare]:checked');
		    case 2:
    		    let formA = await this.agent.see('getFormInput', inputs[0]);
    		    let formB = await this.agent.see('getFormInput', inputs[1]);
    		    formA.classList.add('compareA');
    		    formB.classList.add('compareB');
    		    let infoA = formA.querySelector('textarea').value;
    		    let infoB = formB.querySelector('textarea').value;
    		    let comparer = await this.agent.see('getAgent', 'Comparer Element');
    		    comparer.see('compare', [infoA, infoB]);
    		case 0:
    		case 1:
		}
		console.log(inputs);
		resolve();
	}
}();