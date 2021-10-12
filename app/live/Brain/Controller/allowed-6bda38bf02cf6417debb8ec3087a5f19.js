new (function allowed() {
	this.act = function (args, resolve, reject) {
	    let [link, user] = args;
	    
		let allow = false;
console.log('Checking Permission: ', args);
	    if (link.a.info.startsWith(user + '/')) {
	        allow = true;
	    }
	    else {
            console.log('Permission denied:', user, link);
	    }
		resolve(allow);
	};
})();