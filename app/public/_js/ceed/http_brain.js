/** 
 * LEA - Live Environment for Agents
 * by Renato Lenz Costalima
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import {HTTPAgentFactory} from './agent.js';
export function HTTPBrain(url, protocol) {

	const post = HTTPAgentFactory.newAgent(url, {
		method: 'POST'
	}, protocol);
	//const get = await HTTPAgentFactory.newAgent(url);
	
	this.get = function (symbol, callback) {
		let s = this.getClearSymbol(symbol);
		post.then(a => { a.see("gets", s).then(JSON.parse).then(callback)});
	};
	this.set = function (symbol, callback) {
		let s = this.getClearSymbol(symbol);
		post.then(a => { a.see("sets", s).then(JSON.parse).then(function (s) {
			symbol.id = s.id;
			callback(s);
		})});
	};
	this.tie = function (l, callback) {
		l = this.getClearLink(l);
		post.then(a => { a.see("tie", l).then(JSON.parse).then(callback)});
	};
	this.untie = function (l, callback) {
		l = this.getClearLink(l);
		post.then(a => { a.see("untie", l).then(JSON.parse).then(callback)});
	};
	this.reason = function (l, callback) {
		l = this.getClearLink(l);
		post.then(a => { a.see("reason", l).then(JSON.parse).then(callback)});
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
