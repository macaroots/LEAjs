new (function allowed() {
	this.act = function (args, resolve, reject) {
	    let [link, user] = args;
	    
	    // descomente para restringir
		let allow = true; //false;
console.log('Checking Permission: ', args);
	    if (link.a.info.toLowerCase().startsWith(user + '/')) {
	        allow = true;
	    }
	    else {
            console.log('Permission denied:', user, link);
	    }
		resolve(allow);
	};
})();