new (function OnSocketSee() {
	this.act = async function(args, callback) {
		let lea = this.agent;
		
		if (await lea.see('checkPermission', args)) {
		    let [agentName, action, target] = args;
		    let agent = await Ceed(agentName);
		//console.log('socketSee', agentName, action, target);
    		agent.see(action, target).then(callback).catch(e => {
                console.log('ERRO SOCKET', e);
            });
		}
		else {
            console.log('Socket action not allowed!', args.slice(0, 3));
		}
	}
})();