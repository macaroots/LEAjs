/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */

import {NaiveMind} from './mind.js';
import {Symbol} from './brain.js';
import {JSBrain} from './jsbrain.js';
import {AjaxBrain} from './ajaxbrain.js';

function DontKnow() {
	this.act = function(perception, callback, reject) {
		let concept = perception.type;
		let agent = this.agent;
		let mind = this.mind;
		let learned = false;
		let fullname = mind.getFullName();
		
		// check for infinite loops
		mind.getAllBehavior.act('unkowns', function (dontKnow) {
			if (dontKnow.indexOf(concept) != -1) {
				console.log(mind.getFullName() + ' - Don\'t know "' + concept + '"! Ignoring');
				// Acho que tem que callback para destravar
				return callback(); 
			}
			console.log(fullname + ' - Don\'t know "' + concept + '"! Searching');
			mind.set('unkowns', concept);

/*/			
Ceed().then(ceed => {
	ceed.see('getLibraries').then(brains => {
		console.log('DONTKNOW', brains);
	});
});
/**/

			// search in books
			agent.see('study', concept).then(function (learned) {
				console.log(fullname + ' - Studied "' + concept + '": ' + learned);
				if (learned) {
					mind.see(perception).then(callback).catch(reject);
				}
				else {
				// ask programmer
					agent.see('ask', concept).then(function (learned) {
						console.log(fullname + ' - Asked "' + concept + '": ' + learned);
						if (learned) {
							mind.see(perception).then(callback).catch(reject);
						}
						else {
							callback();
						}
					});
				}
			});
		});
	};
}
function Study() {
	this.act = function(concept, callback) {
		//print 'studing: ' + str(concept)
		let agent = this.agent;
		// tenta ler no banco de dados

		let override = undefined;
		if (typeof concept != 'string') {
			override = concept[1];
			concept = concept[0];
			if (override === true) {
				override = agent.mind.getName();
			}
		}

		agent.see('read', concept).then(function (representations) {
			if (representations != null && representations.length > 0) {
				let representation = representations[representations.length - 1];
				representation.id = 0;

				if (override != undefined) {
					console.log('Changing concept!', concept, override);
					console.log('before', concept);
					if (concept.indexOf('.') != -1) {
						concept = override + '.' + concept.substring(concept.lastIndexOf('.')+1);
					}
					else {
						concept = override + '.' + concept;
					}
					console.log('after', concept);
				}

				agent.see('understand', [concept, representation]).then(callback); /*, function (learned) {
					callback(learned);
				});*/
			}
			else {
				callback(false);
			}
		});
		
	};
}
function GetLibraries0() {
	this.act = function(args, callback) {
		let mind = this.mind;
		mind.get('library', function (library) {
			if (library == null) {
				//library = new AjaxBrain();
				library = new JSBrain();
				mind.set('library', library);
			}
			callback([library]);
		});
	};
}
function GetLibraries() {
	this.act = function(args, callback) {
		let agent = this.agent;
		let libraries = agent.libraries;
		if (!libraries || libraries.length == 0) {
			let library = new JSBrain();
			agent.see('addLibrary', library).then(callback);
		}
		else {
			callback(libraries);
		}
	};
}
function AddLibrary() {
	this.act = function (library, callback) {
		if (!this.agent.libraries) {
			this.agent.libraries = [];
		}
		this.agent.libraries.push(library);
		callback(this.agent.libraries);
	};
}
function SetLibrary() {
	this.act = function (library, callback) {
		this.agent.libraries = [];
		this.agent.libraries.push(library);
		callback(this.agent.libraries);
	};
}
function CERead() {
	this.act = function(concept, callback) {
		let representations;
		
		let agent = this.agent;
		let mind = this.mind;
		
		agent.see("getLibraries").then(function (brains) {
			let booknames;
			if (concept.indexOf('.') == -1) {	
				booknames = mind.getNames();
			}
			else {
				let type = concept.split('.');
				if (type[0] == 'super') {
					booknames = mind.getNames();
					booknames = booknames.slice(1);
				}
				else {
					booknames = [type[0]];
				}
				concept = type[1];
			}
			
			representations = {};
			let totalBooks = brains.length * booknames.length;
			let booksRead = 0;
			for (let j in brains) {
				let brain = brains[j];
				for (let i = totalBooks - 1; i >= 0; i--) {
				//for (let i in booknames) {
					let bookname = booknames[i];
					let argsRead = [brain, bookname, concept];
					mind.readBehavior.act(argsRead, new (function (index) { return function (symbolsRead) {
						representations[index] = symbolsRead;
						booksRead++;
						if (booksRead >= totalBooks) {
							let r = [];
							for (let i in representations) {
								r = r.concat(representations[i]);
							}
							callback(r);
						}
					}})(totalBooks - i - 1));
				}
			}
		});
	};
}
/**
 * Escolhe o contexto do agente ou com a sintaxe '.'
 * @returns
 */
function CEWrite() {
	/**
	 * args = [concept: String, answer: Symbol]
	 */
	this.act = function(args, callback) {	
		let concept = args[0];
		
		let agent = this.agent;
		let mind = this.mind;
		agent.see("getLibraries").then(function (brains) {
			//let brain = brains[0];
			let bookname;
			if (concept.indexOf('.') == -1) {	
				bookname = mind.getName();
			}
			else {
				let type = concept.split('.');
				bookname = type[0];
				args[0] = type[1];
			}
			
			for (let brain of brains) {
				mind.writeBehavior.act([brain, bookname, args], callback);
			}
		});
	};
}

function Ask() {
	this.act = async function (key, callback) {
		let agent = this.agent;
		agent.see('askFor', [agent, key]).then(callback);
	};
}
		
function AskFor() {
	this.act = function ([asker, key], callback) {
// TODO tirar o jQuery
	/*
	Vamos tentar pedir web.askView e adicionar o javascript 
		carrega uma página
		delega os sensores para o agente
	*/		
		let form = $('<form><span class="names" /> - What is the meaning of </form>');
		let a = form;
		a.key = $('<input name="key" value="' + key + '" />');
		a.type = $('<input name="type" />');
		a.info = $('<textarea name="info" rows="6" cols="57"></textarea>');
		a.bt = $('<input type="submit" value="ok" />');
		a.btCancelar = $('<input type="button" value="cancelar" />');
		a.btCancelar.click(function () { form.remove(); callback(false); });
		form.submit(function () {
			let answer = new Symbol(0, a.type.val(), a.info.val());
			asker.see('hearAnswer', [a.key.val(), answer]).then(function (learned) {
				if (learned) {
					form.remove();
				}
				callback(learned);
			});
			return false;
		});
		$('body').prepend(form);
		a.append(a.key);
		a.append('?<br/>');
		a.append(a.info);
		a.append(a.type);
		a.append('<br/>');
		a.append(a.bt);
		a.append(a.btCancelar);
		asker.see('getNames', 0).then(function (names) { a.children('.names').text(names); });
		
		asker.see('read', key).then(function (representations) {
			let type = 'js';
			let info = '';
			if (representations != null && representations.length > 0) {
				let representation = representations[representations.length - 1];
				type = representation.type;
				info = representation.info;
				a.type.val(type);
				a.info.val(info);
			}
			else {
				asker.see('read', 'EmptyAction').then(function (representations) {
					if (representations != null && representations.length > 0) {
						let representation = representations[representations.length - 1];
						type = representation.type;
						info = representation.info;
						info = info.replace(new RegExp('EmptyAction', 'g'), key);
					}
					a.type.val(type);
					a.info.val(info);
				});
			}
		});
		callback(false);
	};
}
function HearAnswer() {
	/**
	 * args = [concept: String, answer: Symbol]
	 */
	this.act = function(args, callback) {
		let agent = this.agent;
		agent.see('write', args);
		agent.see('understand', args).then(callback);
	};
}
function Understand() {
	/**
	 * args = [concept: String, answer: Symbol]
	 */
	this.act = function(args, callback) {	
		let concept = args[0];
		let answer = args[1];
		
		let agent = this.agent;
		let mind = this.mind;
		
		// tenta interpretar o que o outro falou
		let learned = true;
		mind.see(answer).then(function (interpretedMeaning) {
			if (interpretedMeaning == null) {
				interpretedMeaning = answer.info;
				learned = false;
			}
			
			agent.see('set', [concept, interpretedMeaning]);
// console.log('UNDER', concept, interpretedMeaning.act.toString());
			callback(learned);
		});
	};
}
		
function JS() {
	this.act = function (args, callback) {
		// eval é perigoso, mas permite comentário antes
		callback(eval(args, this));
		// Function parece mais seguro, precisa desse return
		//callback(Function('return ' + args)());
		/*/
		//const Module = require('module')
		var m = new Module();
		m._compile(args);
		m.loaded = true;
		console.log('js', m.exports);
		callback(m.exports);
		/**/
	};
}

function Teach() {
	this.act = function (agent, callback) {	
		const skills = this.agent.skills;
		for (let name in skills) {
			let skill = skills[name];
			agent.see('set', [name, skill]);
		}
		
		callback(true);
	};
}

function NaiveLive() {
	this.act = function (args, callback) {
		console.log('NAIVE LIVING', this.agent.toString());
		callback(this.agent);
	}
}

function Live() {
	this.act = function (args, callback) {
		const skills = {};
		let agent = this.agent;
		agent.skills = skills;
		
		// habilidades básicas para o ciclo Clever Editing
		skills['dontKnow'] = new DontKnow();
		skills['study'] = new Study();
		skills['getLibraries'] = new GetLibraries();
		skills['addLibrary'] = new AddLibrary();
		skills['setLibrary'] = new SetLibrary();
		skills['read'] = new CERead();
		skills['ask'] = new Ask();
		skills['askFor'] = new AskFor();
		skills['hearAnswer'] = new HearAnswer();
		skills['write'] = new CEWrite();
		skills['understand'] = new Understand();
		
		// linguagens para interpretação de Symbols
		skills['js'] = new JS();
		
		// não essenciais para o ciclo Clever Editing
		// skills['live'] = new NaiveLive();
		
		skills['getAgent'] = new GetAgent();
		skills['newAgent'] = new NewAgent();
		skills['initAgent'] = new InitAgentSameLibrary();
		skills['addListener'] = new AddListener();
		skills['notify'] = new Notify();
		
		agent.see('set', ['teach', new Teach()]);
		agent.see('teach', agent);
		
		callback(agent);
	}
}

export function InitAgentSameLibrary() {
	this.act = async function (agent, callback) {
		let ceed = this.agent;
		/*/
		let libraries = await ceed.see('getLibraries');
		await agent.see('setLibrary', libraries[0]);
		
		callback(agent);		
		/*/
		
		ceed.see('getLibraries').then(libraries => {
			agent.see('setLibrary', libraries[0]).then(() => {
				callback(agent);
				/*agent.see('live').then(() => {
					callback(agent);
				});*/
			});
		});
		/**/
	}
}

function AddListener() {
	this.act = async function (args, resolve, reject) {
		let event = args[0];
		let listener = args[1];
		let agent = this.agent;
		if (!agent.observers) {
			agent.observers = {};
		}
		if (!agent.observers[event]) {
			agent.observers[event] = [];
		}
		agent.observers[event].push(listener);
		
		resolve();
	};
}
function Notify() {
	this.act = async function (args, resolve, reject) {
		let event = args[0];
		let agent = this.agent;
		try {
			let capitalized = event.charAt(0).toUpperCase() + event.slice(1);
			for (let observer of agent.observers[event]) {
				observer.see('on' + capitalized, args[1]);
			}
		} catch {}
	};
}
function NewAgent() {
	this.act = async function (fullname, callback) {
		let ceed = this.agent;
		let agent = new NaiveMind(fullname).body;
		ceed.see('teach', agent);
		/*/
		ceed.see('initAgent', agent);
		
		callback(agent);
		/*/
		
		ceed.see('initAgent', agent).then(function () {
			callback(agent);
		});
		ceed.see('notify', ['newAgent', agent]);
		/**/
	}
}
function NewChildAgent() {
	this.act = async function (name, callback) {
		let ceed = this.agent;
		
        var capitalized = name.charAt(0).toUpperCase() + name.slice(1);
        var firstName = capitalized.split(' ')[0];
		let childName = (await ceed.see('getName')) + '/' + firstName + ' ' + name;
		callback(Ceed(childName));
	}
}
function GetAgent() {
	this.act = async function (fullname, callback) {
		// Talvez o próprio agente devesse lidar com o nome
		// só que o Ceed precisa anotar já o nome em maiúsculo
		var fullname = fullname.charAt(0).toUpperCase() + fullname.slice(1);
		
		const ceed = this.agent;
		if (!ceed.agents) {
			ceed.agents = {};
		}
		let agents = ceed.agents;
		let agent;
		try {
			agent = agents[fullname][0];
		} catch (e) {
			agent = ceed.see('newAgent', fullname);
			agents[fullname] = [agent];
			
			agent.then(function (a) {
				let names = a.mind.getNames().slice();
				// referência a partir do nome completo
				names.push(names.join(' '));
				if (!names.includes(fullname)) {
					names.push(fullname);
				}
				for (let i in names) {
					let n = names[i];
					if (!agents[n]) {
						agents[n] = [];
					}
					agents[n].unshift(agent);
				}
			});
		}
		//callback(await agent);
		agent.then(callback);
	};
}
export function EmptyAction() {
	this.act = function (args, resolve, reject) {
		// your code here
		resolve();
	};
}

export class CeedAgent {
	constructor(mind) {
		this.mind = mind;
		this.see = function (action, args) {
			return this.mind.see(new Symbol(0, action, args));
		}
	};
	toString() {
		return this.mind.getFullName();
	};
	
	static ceed;
	static async getInstance() {
		if (!CeedAgent.ceed) {
			let agent = new NaiveMind('Ceed').body;
			CeedAgent.ceed = agent;
			
			agent.see('set', ['live', new Live()]);
			await agent.see('live');
			//await agent.see('set', ['newAgent', new NewAgent()]);
			
			/**/
			agent.see('read', 'Naive.EmptyAction').then(function (meanings) {
				if (meanings.length == 0) {
					agent.see('write', [
						'Naive.EmptyAction', 
						new Symbol(0, 'js', 'new (' + EmptyAction.toString() + ')();')
					]);
				}
			});
			await agent.see('read', 'Naive.live').then(function (meanings) {
				if (meanings.length == 0) {
					agent.see('write', [
						'Naive.live', 
						new Symbol(0, 'js', 'new (' + NaiveLive.toString() + ')();')
					]);
				}
			});
			/**/
		}
		return CeedAgent.ceed;
	}
}
export const Ceed = function (names) {
	let promise;
	if (!names) {
		promise = CeedAgent.getInstance();
	}
	else {
		promise = Ceed().see('getAgent', names);
	}	
	promise.see = function (action, args, resolve, reject) {
		return promise.then(agent => {
			return agent.see(action, args, resolve, reject);
		});
	};
	return promise;
};

export function AskAgent(helperName) {
	this.act = async function (key, callback) {
		console.log(this.agent.mind.getName() + ' - Asking: ' + key);
		var agent = this.agent;
		Ceed(helperName).then(helper => {
			helper.see('askFor', [agent, key], callback);
			if (!agent.hearObservers) {
				agent.hearObservers = [];
			}
			agent.hearObservers.push(helper);
		});
	}
}
export function HearAnswerNotify() {
	/**
	 * args = [concept: String, answer: Symbol]
	 */
	this.act = function(args, callback) {
		let agent = this.agent;
		agent.see('write', args);
		agent.see('understand', args).then((learned) => {
			if (learned) {
				for (let observer of agent.hearObservers) {
					observer.see('heared', [agent, args]);
				}
			}
			callback(learned);
		});
	};
}
