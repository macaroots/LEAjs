import {Ceed} from './../ceed/ceed.js';
import {Symbol} from './../ceed/brain.js';

Ceed().then(async agent => {
	await Promise.all([
		agent.see('write', ['Naive.EmptyAction', new Symbol(0, 'js', `new (function EmptyAction() {
	this.act = function (args, callback, reject) {
		// your code here
		callback(true); // return statement
	};
})();`)]),
		agent.see('write', ['Naive.EmptyAction', new Symbol(0, 'js', `new (function EmptyAction() {
	this.act = function (args, resolve, reject) {
		// your code here
		resolve();
	};
})();`)]),
		agent.see('write', ['Naive.live', new Symbol(0, 'js', `new (function live() {
	this.act = function (args, callback) {
		console.log('NAIVE LIVING', this.agent.toString());
		callback(this.agent);
	}
})();`)]),
		agent.see('write', ['Naive.html', new Symbol(0, 'js', `new (function html() {
	this.act = function (args, resolve, reject) {
    	var returnFunction = new (function innerObject () {
        	this.act = function (innerTarget, innerCallback) {
        		innerCallback(target);
        	};
        })();
        resolve(returnFunction);
	};
})();`)]),
		agent.see('write', ['Naive.html', new Symbol(0, 'js', `new (function html() {
	this.act = function (args, resolve, reject) {
    	var returnFunction = new (function innerObject () {
        	this.act = function (innerTarget, innerCallback) {
        		innerCallback(args);
        	};
        })();
        resolve(returnFunction);
	};
})();`)]),
		agent.see('write', ['Naive.html', new Symbol(0, 'js', `new (function object() {
	this.act = function (args, resolve, reject) {
    	var returnFunction = new (function innerObject () {
        	this.act = function (innerTarget, innerCallback) {
        		innerCallback(args);
        	};
        })();
        resolve(returnFunction);
	};
})();`)]),
		agent.see('write', ['Naive.object', new Symbol(0, 'js', `new (function object() {
	this.act = function (args, resolve, reject) {
    	var returnFunction = new (function innerObject () {
        	this.act = function (innerTarget, innerCallback) {
        		innerCallback(args);
        	};
        })();
        resolve(returnFunction);
	};
})();`)]),
		agent.see('write', ['Naive.string', new Symbol(0, 'js', `new (function object() {
	this.act = function (args, resolve, reject) {
    	var returnFunction = new (function innerObject () {
        	this.act = function (innerTarget, innerCallback) {
        		innerCallback(args);
        	};
        })();
        resolve(returnFunction);
	};
})();`)]),
		agent.see('write', ['Naive.css', new Symbol(0, 'js', `new (function object() {
	this.act = function (args, resolve, reject) {
    	var returnFunction = new (function innerObject () {
        	this.act = function (innerTarget, innerCallback) {
        		innerCallback(args);
        	};
        })();
        resolve(returnFunction);
	};
})();`)]),
		agent.see('write', ['Naive.addName', new Symbol(0, 'js', `new (function addName () {
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
})();`)]),
	]);
});
