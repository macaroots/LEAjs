new class animate {
	async act(context, resolve, reject) {
	    let canvas = this.agent.canvas;
	    context.clearRect(0, 0, canvas.width, canvas.height);
	    
	    agent.map.see('draw', context);
	    
	    for (let o of agent.objects) {
	        o.see('update');
	        o.see('draw', context);
	    }
        if (await this.agent.map.see('checkVictory')) {
            alert('Você venceu!');
            this.agent.see('init', agent.level + 1);
        }
        if (await this.agent.map.see('checkDefeat')) {
            alert('Você perdeu!');
            this.agent.see('init', agent.level);
        }
		resolve();
	}
}();
