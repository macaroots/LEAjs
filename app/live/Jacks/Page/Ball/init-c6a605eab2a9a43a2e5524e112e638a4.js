new class init {
	act(args, resolve, reject) {
		var agent = this.agent;
		agent.y0 = 300;
		agent.v0 = -200;
		agent.gravidade = $('input[name=skill]').val();
		agent.y = 300;
		agent.x = 100;
		agent.body = $('#ball');
		if (agent.body.length == 0) {
		    agent.body = $('<canvas id="ball" width="50" height="50" style="position: absolute;" />').appendTo('body');
            var ctx = agent.body[0].getContext("2d");
            ctx.beginPath();
            ctx.arc(25, 25, 25, 0, 2 * Math.PI);
            ctx.stroke();
            
            var style = $('<style id="mystyle" />').appendTo('head');
            style.append('@keyframes launch {');
            for (let i = 0; i <= 100; i += 25) {
                let x = i * 3;
                style.append(i + '% {top: ' + x + 'px;}');
            }
            style.append('}');
            style.append('.animate { animation: launch 5s linear; }');
		}
		let clicks = 0;
        agent.body.unbind().click((e) => {
            if (clicks % 2 == 0) {
                agent.see('launch', e);
            }
            else {
                agent.see('hold', e);
            }
            clicks++;
        });
        agent.body.css('top', agent.y + 'px');
        agent.body.css('left', agent.x + 'px');
        agent.body.removeClass('animate');
        
        agent.body.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
            agent.parent.see('fault', 'Failed to catch the ball!');
        });
		resolve();
	}
}();
