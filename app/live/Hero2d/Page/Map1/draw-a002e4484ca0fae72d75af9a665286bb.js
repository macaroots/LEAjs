new class draw {
	act(context, resolve, reject) {
		const agent = this.agent;
		
	    // exit
	    context.lineWidth = 1;
	    context.beginPath();
	    context.moveTo(160, 50);
	    context.lineTo(185, 75);
	    context.lineTo(160, 100);
	    context.moveTo(185, 75);
	    context.lineTo(110, 75);
	    context.stroke();
	    
	    // Cartesian coordinates
	    context.lineWidth = 0.5;
	    context.beginPath();
	    context.moveTo(150, 0);
	    context.lineTo(150, 150);
	    context.lineTo(145, 145);
	    context.lineTo(150, 150);
	    context.lineTo(155, 145);
	    context.moveTo(0, 75);
	    context.lineTo(300, 75);
	    context.lineTo(295, 70);
	    context.lineTo(300, 75);
	    context.lineTo(295, 80);
	    
	    context.moveTo(270, 72);
	    context.lineTo(270, 77);
	    context.moveTo(15, 72);
	    context.lineTo(15, 77);
	    
	    context.moveTo(148, 10);
	    context.lineTo(152, 10);
	    
	    context.stroke();
	    
	    // label axis
	    context.fillText('x = 15', 5, 70);
	    context.fillText('x = 270', 260, 70);
	    context.fillText('y = 10', 157, 10);
	    context.fillText('y = 140', 157, 140);
	    
	    let {x, y} = agent.game.hero;
	    context.fillText(`Hero: (x=${x}, y=${y})`, 5, 10);
	    
		resolve();
	}
}();
