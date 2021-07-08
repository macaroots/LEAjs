/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
import {SocketAgent} from './../ceed/agent.js';
export function SocketBrain(io, name='brain') {
    const self = this;
    this.agent = new SocketAgent(name, io);

	let responses = {};
	this.responses = responses;
	
	this.get = function (symbol) {
		let p = new Promise((resolve, reject) => {
            let s = self.getClearSymbol(symbol);
            self.agent.see('brainGet', s).then(resolve);
        });
        return p;
	};
	this.set = function (symbol) {
		let p = new Promise((resolve, reject) => {
            let s = self.getClearSymbol(symbol);
            self.agent.see('brainSet', s).then(function (s) {
                symbol.id = s.id;
                resolve(s);
            });
        });
        return p;
	};
	this.tie = function (link) {
		let p = new Promise((resolve, reject) => {
            self.agent.see('tie', {
                a: link.a,
                b: link.b,
                r: link.r
            }).then(resolve);
        });
        return p;
	};
	this.untie = function (link) {
		let p = new Promise((resolve, reject) => {
            self.clearLink(link);
            self.agent.see('untie', {
                a: link.a,
                b: link.b,
                r: link.r
            }).then(resolve);
        });
        return p;
	};
	this.reason = function (link) {
		let p = new Promise((resolve, reject) => {
            let l = self.getClearLink(link);
            
            self.agent.see('reason', l).then(resolve);
        });
        return p;
	};
	this.getClearLink = function (link) {
		var l = {};
        try {
            let a = self.getClearSymbol(link.a);
            if (Object.keys(a).length !== 0) {
                l.a = a;
            }
        } catch {}
        try {
            let r = self.getClearSymbol(link.r);
            if (Object.keys(r).length !== 0) {
                l.r = r;
            }
        } catch {}
        try {
            let b = self.getClearSymbol(link.b);
            if (Object.keys(b).length !== 0) {
                l.b = b;
            }
        } catch {}
		return l;
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
