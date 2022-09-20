new class onKeyDown {
	act(event, resolve, reject) {
	    const game = this.agent;
	    const actions = {
	        'ArrowDown': () => game.hero.see('down'),
	        'ArrowUp': () => game.hero.see('jump'),
	        'ArrowLeft': () => game.hero.see('left'),
	        'ArrowRight': () => game.hero.see('right')
	    };
	    try {
	        actions[event.key]();
	    } finally {}
		resolve();
	}
}();
