/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
function connect() {
	this.act = function (args, callback) {
		var socket = io();
		var agent = this.agent;
		agent.socket = socket;
		socket.on('question', function (data) {
		  agent.see('onQuestion', data);
		});
		callback(true);
	};
};

function onQuestion() {
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
		this.agent.see('study', 'onQuestion', callback);
	}
}

import {Ceed} from './../ceed/ceed.js';
import {Symbol} from './../ceed/brain.js';

Ceed().then(ceed => {
	ceed.see('write', ['LEAClient.live', new Symbol(0, 'js', 'new (' + live.toString() + ')();')]);
	ceed.see('write', ['LEAClient.connect', new Symbol(0, 'js', 'new (' + connect.toString() + ')();')]);
	ceed.see('write', ['LEAClient.onQuestion', new Symbol(0, 'js', 'new (' + onQuestion.toString() + ')();')]);
});


