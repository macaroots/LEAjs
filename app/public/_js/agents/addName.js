/** 
 * LEA - Live Environment for Agents
 * by Renato Lenz Costalima
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
new (function addName () {
	this.act = function (args, callback) {
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
        indexRelative = names.indexOf(relativeName);
	    indexFinal = index + indexRelative;
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
		callback(names); // return statement
	};
})();