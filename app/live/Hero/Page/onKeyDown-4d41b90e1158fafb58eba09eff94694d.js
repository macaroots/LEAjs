new class onKeyDown {
    constructor() {
        this.actions = {
            'ArrowUp': (e) => { this.clickButtonByText('Up', e); },
            'w': (e) => { this.clickButtonByText('Up', e); },
            'ArrowDown': (e) => { this.clickButtonByText('Down', e); },
            's': (e) => { this.clickButtonByText('Down', e); },
            'ArrowLeft': (e) => { this.clickButtonByText('Left', e); },
            'a': (e) => { this.clickButtonByText('Left', e); },
            'ArrowRight': (e) => { this.clickButtonByText('Right', e); },
            'd': (e) => { this.clickButtonByText('Right', e); },
            'Control': (e) => { document.querySelector('#alterar').click(e); },
        }
    }
	act(event, resolve, reject) {
	    const game = this.agent;
	    try {
	        this.actions[event.key](event);
	    } catch {}
		resolve();
	}
	clickButtonByText(text, event) {
        return Array.from(document.querySelectorAll('button')).find(button => button.textContent.trim() === text.toLowerCase()).click(event);
    }
}();
