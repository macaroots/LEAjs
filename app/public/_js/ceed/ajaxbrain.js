/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
import {HTTPAgent} from './agent.js';
export function AjaxBrain(endereco) {
    const self = this;
	if (endereco == null) {
		this.endereco = '/LEA/ce/brain/';
	}
	else {
		this.endereco = endereco;
	}

	this.agent = new HTTPAgent(this.endereco);
    this.cached = false;
	let responses = {};
	this.responses = responses;
    this.setCache = function (text, response) {
//         responses[text] = response;
        sessionStorage.setItem(text, JSON.stringify(response));
    }
    this.getCache = function (text) {
//         return responses[text];
        return JSON.parse(sessionStorage.getItem(text));
    }
    
	this.get = function (symbol) {
		return new Promise((resolve, reject) => {
            if (symbol == null) {
                symbol = {};
            }
            if (typeof symbol == 'string') {
                symbol = {
                    info: symbol
                };
            }
            
            // cache simples
            let text;
            if (self.cached) {
                text = JSON.stringify(symbol);
                let oldResponse = self.getCache(text);
                if (oldResponse) {
                    resolve(oldResponse);
                    return;
                }
            }
            
            $.post(this.endereco + "gets", {
                impl: symbol.impl,
                id: symbol.id,
                type: symbol.type,
                info: symbol.info,
                busca: symbol.busca,
                ordem: symbol.ordem
            }, function (response) {
                if (self.cached) {
                    self.setCache(text, response);
                }
                resolve(response);
            });
        });
	};
	this.set = function (symbol) {
		return new Promise((resolve, reject) => {
            $.post(this.endereco + "sets", {
                impl: symbol.impl,
                id: symbol.id,
                type: symbol.type,
                info: symbol.info
            }, function (s) {
                symbol.id = s.id;
                resolve(s);
            });
        });
	};
	this.tie = function (no) {
		return new Promise((resolve, reject) => {
            $.post(this.endereco + "tie", {
                a: no.a,
                b: no.b,
                r: no.r
            }, resolve);
        });
	};
	this.untie = function (no) {
		return new Promise((resolve, reject) => {
            this.clearLink(no);
            $.post(this.endereco + "untie", {
                a: no.a,
                b: no.b,
                r: no.r
            }, resolve);
        });
	};
	this.reason = function (no) {
        return new Promise((resolve, reject) => {
            // cache simples
            let text;
            if (self.cached) {
                text = JSON.stringify(no);
                let oldResponse = self.getCache(text);
                if (oldResponse) {
                    resolve(oldResponse);
                    return;
                }
            }
            
            no = this.getClearLink(no);
            $.get(this.endereco + "reason", no, function (response) {
                if (self.cached) {
                    self.setCache(text, response);
                }
                resolve(response);
            });
        });
	};
	this.getClearLink = function (no) {
		var n = {};
		n.a = this.getClearSymbol(no.a);
		n.r = this.getClearSymbol(no.r);
		n.b = this.getClearSymbol(no.b);
		if (no.ordem != null) {
			n.ordem = no.ordem;
		}
		return n;
	};
	this.getClearSymbol = function (s) {
		var symbol = {};
		try {
			if (s.id != null && s.id != 0) {
				symbol.id = s.id;
			}
		} catch (e) {}
		try {
			if (s.type != null) {
				symbol.type = s.type;
			}
		} catch (e) {}
		try {
			if (s.info != null) {
				symbol.info = s.info;
			}
		} catch (e) {}
		return symbol;
	};
}
