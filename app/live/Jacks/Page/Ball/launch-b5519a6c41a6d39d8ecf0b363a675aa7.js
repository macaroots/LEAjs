new class launch {
	act(args, resolve, reject) {
        $('.jack').unbind().click(function (e) {
            e.currentTarget.agent.see('click', e);
        });
        
        $('#ball').removeClass('animate');
        $('#ball').addClass('animate');
		resolve();
	}
}();
