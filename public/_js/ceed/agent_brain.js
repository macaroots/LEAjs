/** 
 * LEA - Live Environment for Agents
 * by Renato Lenz Costalima
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
/**
 * MySQLBrain - A javascript implementation of MySQLBrain
 * Created on 02/10/2020
 */
import {Symbol, Link} from './brain.js';

export function AgentBrain(agent) {
	this.agent = agent;
	this.createTables = function() {
		agent.see('createTables');
	};	
    this.set = function(s, callback) {
		return agent.see('brainSet', s, callback);
    };
    this.forget = function(s, callback) {
		return agent.see('forget', s, callback);
    };
    this.get = function(s, callback) {
		return agent.see('brainGet', s, callback);
    };
    this.tie = function(l, callback) {
		return agent.see('tie', l, callback);
    };
    this.untie = function(l, callback) {
		return agent.see('untie', l, callback);
    };
    this.reason = function(l, callback) {
		return agent.see('reason', l, callback);
    };
	
	//this.createTables();
}

/*/
import {Ceed} from './ceed.js';
import {MySQLBrain} from './mysql_brain.js';
const agent = Ceed.getAgent('Brain');
const library = new MySQLBrain();
agent.see('setLibrary', library);

const brain = new AgentBrain(agent);
let i = 0;
let a = new Symbol(0, 't' + (i%2), 'i1');
let r = new Symbol(0, 't' + i, 'i' + (i%2));
let b = new Symbol(0, 't' + (2-i), 'i' + i);
let link = new Link(a, r, b);
//brain.tie(link);

//console.log(await brain.reason(new Link(new Symbol(0, 't0', null), null, null)));


/*
console.log(agent.see('write', [
	'NaiveAgent.EmptyAction', 
	new Symbol(0, 'js', 'new (function EmptyAction() {\n\tthis.act = function (args, callback) {\n\t\t// your code here\n\t\tcallback(true); // return statement\n\t};\n})(3);')
]));
/*
brain.reason(null, function (links) {
	console.log(links);
});
let s = new Symbol(0, 'oi', 'mundo');
function x() {
	let s2 = brain.set(s);

	setTimeout(() => {
		console.log(1, s);
		console.log(1, s2);
	}, 100);
}
x();

brain.set(s, function (s2) {
	console.log(2, s);
	console.log(2, s2);
});
/**/