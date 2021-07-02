/** 
 * LEA - Live Environment for Agents
 * by Renato Lenz Costalima
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import {SocketAgent} from './../agents/lea_client.js';
export function SocketBrain(io, name='brain') {
    this.agent = new SocketAgent(name, io);

	let responses = {};
	this.responses = responses;
	/*
	this.get = function (symbol, callback) {
		if (symbol == null) {
			symbol = {};
		}
		if (typeof symbol == 'string') {
			symbol = {
				info: symbol
			};
		}
		let text = JSON.stringify(symbol);
		let oldResponse = responses[text];
		if (oldResponse) {
			callback(oldResponse);
			return;
		}
		$.post(this.endereco + "gets", {
			impl: symbol.impl,
			id: symbol.id,
			type: symbol.type,
			info: symbol.info,
			busca: symbol.busca,
			ordem: symbol.ordem
	    }, function (response) {
			responses[text] = response;
			callback(response);
		});
	};
	this.set = function (symbol, callback) {
		$.post(this.endereco + "sets", {
			impl: symbol.impl,
			id: symbol.id,
			type: symbol.type,
			info: symbol.info
		}, function (s) {
			symbol.id = s.id;
			callback(s);
		});
	};*/
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
		let text = JSON.stringify(no);
		let oldResponse = responses[text];
		if (oldResponse) {
			callback(oldResponse);
			return;
		}
		no = this.getClearLink(no);
        
		this.agent.see('reason', no).then(function (response) {
			responses[text] = response;
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
