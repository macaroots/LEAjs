new class animate {
	act(context, resolve, reject) {
	    let canvas = this.agent.canvas;
	    context.clearRect(0, 0, canvas.width, canvas.height);
	    
	    for (let o of agent.objects) {
	        o.see('update');
	        o.see('draw', context);
	    }
	    
		resolve();
	}
}();
