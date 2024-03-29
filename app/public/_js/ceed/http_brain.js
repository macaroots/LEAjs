/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
import {HTTPAgentFactory} from './agent.js';
export function HTTPBrain(url, protocol) {

	const post = HTTPAgentFactory.newAgent(url, {
		method: 'POST'
	}, protocol);
	//const get = await HTTPAgentFactory.newAgent(url);
	
	this.get = function (symbol) {
		return new Promise(async (resolve, reject) => {
            let s = this.getClearSymbol(symbol);
            post.then(a => { a.see("gets", s).then(JSON.parse).then(resolve)});
        });
	};
	this.set = function (symbol) {
		return new Promise(async (resolve, reject) => {
            let s = this.getClearSymbol(symbol);
            post.then(a => { a.see("sets", s).then(JSON.parse).then(function (s) {
                symbol.id = s.id;
                resolve(s);
            })});
        });
	};
	this.tie = function (l) {
		return new Promise(async (resolve, reject) => {
            l = this.getClearLink(l);
            post.then(a => { a.see("tie", l).then(JSON.parse).then(resolve)});
        });
	};
	this.untie = function (l) {
		return new Promise(async (resolve, reject) => {
            l = this.getClearLink(l);
            post.then(a => { a.see("untie", l).then(JSON.parse).then(resolve)});
        });
	};
	this.reason = function (l) {
		return new Promise(async (resolve, reject) => {
            l = this.getClearLink(l);
            post.then(a => { a.see("reason", l).then(JSON.parse).then(resolve)});
        });
	};
	this.getClearLink = function (no) {
		var n = {};
		for (let i of ['a', 'r', 'b']) {
			let s = this.getClearSymbol(no[i]);
			for (let p in s) {
				n[i + '[' + p + ']'] = s[p];
			}
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
