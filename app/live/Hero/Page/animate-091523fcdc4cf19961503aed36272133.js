new class animate {
	async act(context, resolve, reject) {
	    let canvas = this.agent.canvas;
	    context.clearRect(0, 0, canvas.width, canvas.height);
	    
	    // exit
	    context.lineWidth = 1;
	    context.beginPath();
	    context.moveTo(150, 50);
	    context.lineTo(175, 75);
	    context.lineTo(150, 100);
	    context.moveTo(175, 75);
	    context.lineTo(100, 75);
	    context.stroke();
	    
	    for (let o of agent.objects) {
	        o.see('update');
	        o.see('draw', context);
	    }
        if (await this.agent.see('checkVictory')) {
            alert('Você venceu!');
            this.agent.hero.see('init');
        }
	    
		resolve();
	}
}();
