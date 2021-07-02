/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
/**
 * JSBrain - A javascript implementation of Brain
 * Created on 16/10/2014
 */
import {Symbol, Link} from './brain.js';
export function JSBrain(symbols, links) {
    if (symbols == null) {
        symbols = {};
    }
    if (links == null) {
        links = [];
    }
    this.symbols = symbols;
    this.links = links;
    
    this.set = function(s, callback) {
        if (s.id == 0) {
        	s.id = Object.keys(this.symbols).length + 1;
        }
    	while (s.id in this.symbols) {
    		s.id++;
    	}
        this.symbols[s.id] = s;
		
		if (callback != null) {
			return callback(s);
		}
		else {
			return s;
		}
    };
    this.forget = function(s, callback) {
    	let esquecidos = this.get(s);
    	for (let e in esquecidos) {
    		delete(this.symbols[esquecidos[e].id]);
    	}
		if (callback != null) {
			return callback(esquecidos);
		}
		else {
			return esquecidos;
		}
    };
    this.get = function(s, callback) { 
        let lembrados = [];
        if (s != null && s.id != 0) {
            lembrados.push(this.symbols[s.id]);
        }
        else {
            for (let i in this.symbols) {
                let symbol = this.symbols[i];
                if (this.__symbolsMatch(symbol, s)) {
                    lembrados.push(symbol);
            	}
        	}
        }
		if (callback != null) {
			return callback(lembrados);
		}
		else {
			return lembrados;
		}
    };
    this.tie = function(n, callback) {
    	let aS = this.get(n.a);
        if (aS.length != 0) {
        	n.a = aS[0];
        }
        else {
            this.set(n.a);
        }
    	let rS = this.get(n.r);
        if (rS.length != 0) {
        	n.r = rS[0];
        }
        else {
            this.set(n.r);
        }
    	let bS = this.get(n.b);
        if (bS.length != 0) {
        	n.b = bS[0];
        }
        else {
            this.set(n.b);
        }
        this.links.push(n);
		
		if (callback != null) {
			return callback(n);
		}
    };
    this.untie = function(n, callback) {
        let esquecidos = this.reason(n);
        for (let e in esquecidos) {
            //this.links.remove(e);
        }
		if (callback != null) {
			return callback(esquecidos);
		}
		else {
			return esquecidos;
		}
    };
    this.reason = function(n, callback) {
        let links = [];
        for (let i in this.links) {
        	let link = this.links[i];
            if (this.__linksMatch(link, n)) {
                links.push(link);
            }
        }
		if (callback != null) {
			return callback(links);
		}
		else {
			return links;
		}
    };
    this.__linksMatch = function (local, search) {
    	let equals = false;
    	if (search == null) {
    		equals = true;
    	}
    	else if (
            (search.a == null || this.__symbolsMatch(local.a, search.a)) &&
            (search.r == null || this.__symbolsMatch(local.r, search.r)) &&
            (search.b == null || this.__symbolsMatch(local.b, search.b))
        ) {
            equals = true;
        }
        return equals;
    };
    this.__symbolsMatch = function(a, b) {
        let equals = false;
        if (b == null) {
        	equals = true;
        }
        else if (a != null && b != null) {
            if (
                (b.id != 0 && b.id == a.id)
                && (b.type == null || b.type == a.type)
                && (b.info == null || b.info == a.info)
            ) {
                equals = true;
            }
            else {
                if (b.info == null) {
                    if (b.type != null && b.type == a.type) {
                        equals = true;
                    }
                }
                else {
                    if (b.type == null && b.info == a.info) {
                        equals = true;
                    }
                    else {
                        if (b.type == a.type && b.info == a.info) {
                            equals = true;
                        }
                    }
                }
            }
        }
        
        return equals;
    };

}
JSBrain.prototype.toString = function dogToString() {
	let string = '';
        for (let i in this.links) {
        	let link = this.links[i];
		string += link;
	}
	return string;
}
