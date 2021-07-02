/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
import {SocketAgent} from './../agents/agent.js';
export function SocketBrain(io, name='brain') {
    this.agent = new SocketAgent(name, io);

	let responses = {};
	this.responses = responses;
	
	this.get = function (symbol, callback) {
		let s = this.getClearSymbol(symbol);
		this.agent.see('brainGet', s).then(callback);
	};
	this.set = function (symbol, callback) {
		let s = this.getClearSymbol(symbol);
		this.agent.see('brainGet', s).then(function (s) {
			symbol.id = s.id;
			callback(s);
		});
	};
	this.tie = function (no, callback) {
		this.agent.see('tie', {
			a: no.a,
			b: no.b,
			r: no.r
		}).then(callback);
	};
	this.untie = function (no, callback) {
		this.clearLink(no);
		this.agent.see('untie', {
			a: no.a,
			b: no.b,
			r: no.r
		}).then(callback);
	};
	this.reason = function (no, callback) {
		let l = this.getClearLink(no);
        
		this.agent.see('reason', l).then(function (response) {
			callback(response);
		});
	};
	this.getClearLink = function (no) {
		var n = {};
		let a = this.getClearSymbol(no.a);
		let r = this.getClearSymbol(no.r);
		let b = this.getClearSymbol(no.b);
        if (Object.keys(a).length !== 0) {
            n.a = a;
        }
        if (Object.keys(r).length !== 0) {
            n.r = r;
        }
        if (Object.keys(b).length !== 0) {
            n.b = b;
        }
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
