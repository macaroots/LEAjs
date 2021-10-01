new (function addName () {
	this.act = function (args, resolve, reject) {
	    var agent = this.agent;
	    var names = agent.mind.names;
	    var name, relativeName, index;
	    if (typeof args == 'string') {
	        if (args.indexOf(':') == -1) {
    	        name = args;
    	        relativeName = agent.mind.getName();
    	        index = 1;
	        }
	        else {
	            args = args.split(':');
    	        name = args[0];
    	        relativeName = args[1];
    	        index = parseInt(args[2] || 1);
	        }
	    } 
	    else {
	        name = args[0];
	        relativeName = args[1];
	        index = args[2] || 1;
	    }
	    
	    var newNames = name.split(' ');
	    var indexRelative = names.indexOf(relativeName);
	    var indexFinal = index + indexRelative;
	    for (var i in newNames) {
	        name = newNames[i];
	        var indexNew = names.indexOf(name);
    		if (indexNew != -1) {
    		        indexFinal = indexNew + 1;
    		        continue;
    		}
    	    
	        names.splice(indexFinal, 0, name);
	        indexFinal++;
	    }

	    resolve(names);
	};
})();