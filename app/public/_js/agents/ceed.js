import {Ceed} from './../ceed/ceed.js';
import {Symbol} from './../ceed/brain.js';

Ceed().then(async agent => {
	await Promise.all([
		agent.see('write', ['Ceed.connect', new Symbol(0, 'js', `new (function connect() {
	this.act = async function (args, resolve, reject) {
		var socket = io();
		var agent = this.agent;
		agent.socket = socket;
		socket.on('question', function (data) {
		  agent.see('onQuestion', data);
		});
		resolve();
	};
})();`)]),
		agent.see('write', ['Ceed.onQuestion', new Symbol(0, 'js', `new (function onQuestion() {
	this.act = async function (data, callback) {
		console.log(data);
		let name = data[0];
		let key = data[1];
		let lea = this.agent;
		
		let agent = await lea.see('getSocketAgent', name);
		lea.see('notify', ['question', [agent, key]]);
		callback(true); 
	};
})();`)]),
		agent.see('write', ['Ceed.getSocketAgent', new Symbol(0, 'js', `new (function getSocketAgent() {
	this.act = function (name, resolve, reject) {
		const agent = this.agent;
		const socket = agent.socket;
		if (!agent.agents) {
			agent.agents = {};
		}
		let agents = agent.agents;
		let newAgent;
		try {
		    name = name.charAt(0).toUpperCase() + name.slice(1);
			newAgent = agents[name][0];
		} catch (e) {
			newAgent = new Promise((res, rej) => {
			    let socketAgent = new SocketAgent(name, socket);
    			agent.see('notify', ['newAgent', socketAgent]);
			    res(socketAgent);
			});
			agents[name] = [newAgent];
			agent.see('registerAgent', newAgent);
		}
		newAgent.then(resolve);
	};
})();`)]),
		agent.see('write', ['Ceed.registerAgent', new Symbol(0, 'js', `new (function registerAgent() {
	this.act = function (newAgent, resolve, reject) {
		const agent = this.agent;
		if (!agent.agents) {
			agent.agents = {};
		}
		let agents = agent.agents;
		newAgent.then(async function (a) {
			let names = (await a.see('getNames')).split(' ');
			// referência a partir do nome completo
			names.push(names.join(' '));
			for (let n of names) {
				if (!agents[n]) {
					agents[n] = [];
				}
				agents[n].unshift(newAgent);
			}
		});
		resolve();
	};
})();`)]),
	]);
});
