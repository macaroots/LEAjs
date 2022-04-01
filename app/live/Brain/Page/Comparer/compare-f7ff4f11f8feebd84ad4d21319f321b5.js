new class compare {
	act([a, b], resolve, reject) {
        console.log('diff', a, b);
	    const differ = new AceDiff({
            ace: window.ace, // You Ace Editor instance
            element: '.diff',
            left: {
                content: a,
            },
            right: {
                content: b,
            },
        });
		document.querySelector('.diff').style.display = 'block';
		resolve();
	}
}();