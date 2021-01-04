/** 
 * LEA - Live Environment for Agents
 * by Renato Lenz Costalima
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Outra opção de corpo.
*/
export function SocketAgent(name, socket) {
	//var socket = io();
	//socket.join(name);
	
	this.see = function (action, args, callback, reject) {
		let r = {response: null};
		r.response = new Promise((resolve, reject) => {
			r.resolve = resolve;
			r.reject = reject;
		});
		if (!callback) {
			callback = (response) => {
				r.resolve(response);
			};			
		}
		if (!reject) {
			reject = (response) => {
				r.reject(response);
			};
		}

		console.log(name, action, args);
		socket.emit('see', name, action, args, callback);

		return r.response;
	};
}

function connect() {
	this.act = function (args, callback) {
		var socket = io();
		var agent = this.agent;
		agent.socket = socket;
		socket.on('question', function (data) {
		  agent.see('question', data);
		});
		callback(true);
	};
};

function question() {
	this.act = async function (data, callback) {
		console.log(data);
		let socket = this.agent.socket;
		let name = data[0];
		let key = data[1];
		let script = await Ceed('Script');
		if (!this.agent.agents) {
			this.agent.agents = {};
		}
		let agent = this.agent.agents[name];
		if (!agent) {
			agent = new SocketAgent(name, socket);
			this.agent.agents[name] = agent;
		}
		script.see('askFor', [agent, key]);
		callback(true); 
	};
};
function live() {
	this.act = function (data, callback) {
		console.log('LEAClient LIVE', this.agent.toString());
		this.agent.see('study', 'question', callback);
	}
}

import {Ceed} from './../ceed/ceed.js';
import {Symbol} from './../ceed/brain.js';

Ceed().then(ceed => {
	ceed.see('write', ['LEAClient.live', new Symbol(0, 'js', 'new (' + live.toString() + ')();')]);
	ceed.see('write', ['LEAClient.connect', new Symbol(0, 'js', 'new (' + connect.toString() + ')();')]);
	ceed.see('write', ['LEAClient.question', new Symbol(0, 'js', 'new (' + question.toString() + ')();')]);
});


