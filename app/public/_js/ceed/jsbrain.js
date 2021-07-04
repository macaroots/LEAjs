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
    const self = this;
    this.symbols = symbols;
    this.links = links;
    
    this.set = function(s) {
        const promise = new Promise((resolve, reject) => {
            if (s.id == 0) {
                s.id = Object.keys(self.symbols).length + 1;
            }
            while (s.id in self.symbols) {
                s.id++;
            }
            self.symbols[s.id] = s;
            
// console.debug('JsBrain.set', s);
            resolve(s);
        });
        return promise;
    };
    this.forget = function(s) {
        const promise = new Promise((resolve, reject) => {
            let esquecidos = self.get(s);
            for (let e in esquecidos) {
                delete(self.symbols[esquecidos[e].id]);
            }
            resolve(esquecidos);
        });
        return promise;
    };
    this.get = function(s) { 
        const promise = new Promise((resolve, reject) => {
            let lembrados = [];
            if (s != null && s.id != 0) {
                lembrados.push(self.symbols[s.id]);
            }
            else {
                for (let i in self.symbols) {
                    let symbol = self.symbols[i];
                    if (self.__symbolsMatch(symbol, s)) {
                        lembrados.push(symbol);
                    }
                }
            }
//console.debug('JsBrain.get', s, lembrados);
            resolve(lembrados);
        });
        return promise;
    };
    this.tie = function(link) {
        const promise = new Promise(async (resolve, reject) => {
            await self.get(link.a).then(async symbols => {
//console.debug('JsBrain.tie(a)', link.a, symbols);
                if (symbols.length != 0) {
                    link.a = symbols[0];
                }
                else {
                    return await self.set(link.a);
                }
            });
            await self.get(link.r).then(async symbols => {
//console.debug('JsBrain.tie(r)', link.r, symbols);
                if (symbols.length != 0) {
                    link.r = symbols[0];
                }
                else {
                    return await self.set(link.r);
                }
            });
            await self.get(link.b).then(async symbols => {
// console.debug('JsBrain.tie(b)', link.b, symbols);
                if (symbols.length != 0) {
                    link.b = symbols[0];
                }
                else {
                    return await self.set(link.b);
                }
            });
            self.links.push(link);
            resolve(link);
            
// console.debug('JsBrain.tie', link);
        });
        return promise;
    };
    this.untie = function(link) {
        const promise = new Promise((resolve, reject) => {
            let esquecidos = self.reason(link);
            for (let e in esquecidos) {
                //self.links.remove(e);
            }
            
            resolve(esquecidos);
        });
        return promise;
    };
    this.reason = function(link) {
        const promise = new Promise((resolve, reject) => {
            let links = [];
            for (let l of self.links) {
                if (self.__linksMatch(l, link)) {
                    links.push(l);
                }
            }
            
//console.debug('JsBrain.reason', link, links);
            resolve(links);
        });
        return promise;
    };
    this.__linksMatch = function (local, search) {
    	let equals = false;
    	if (search == null) {
    		equals = true;
    	}
    	else if (
            (search.a == null || self.__symbolsMatch(local.a, search.a)) &&
            (search.r == null || self.__symbolsMatch(local.r, search.r)) &&
            (search.b == null || self.__symbolsMatch(local.b, search.b))
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
