/** 
 * LEA - Live Environment for Agents
 * by Renato Lenz Costalima
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import {HTTPAgent} from './agent.js';
export function AjaxBrain(endereco) {
	if (endereco == null) {
		this.endereco = '/LEA/ce/brain/';
	}
	else {
		this.endereco = endereco;
	}

	this.agent = new HTTPAgent(this.endereco);
	this.get = function (symbol, callback) {
		if (symbol == null) {
			symbol = {};
		}
		if (typeof symbol == 'string') {
			symbol = {
				info: symbol
			};
		}
		$.post(this.endereco + "gets", {
			impl: symbol.impl,
			id: symbol.id,
			type: symbol.type,
			info: symbol.info,
			busca: symbol.busca,
			ordem: symbol.ordem
	    }, callback);
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
	};
	this.tie = function (no, callback) {
		$.post(this.endereco + "tie", {
			a: no.a,
			b: no.b,
			r: no.r
		}, callback);
	};
	this.untie = function (no, callback) {
		this.clearLink(no);
		$.post(this.endereco + "untie", {
			a: no.a,
			b: no.b,
			r: no.r
		}, callback);
	};
	this.reason = function (no, callback) {
		no = this.getClearLink(no);
		$.get(this.endereco + "reason", no, callback);
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
