/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
/** 
 * Ciclo básico Clever Editing.
 */

import {NaiveMind} from './mind.js';
import {Symbol} from './brain.js';
import {JSBrain} from './jsbrain.js';

function Live() {
	this.act = function (args, resolve, reject) {
//console.log('LIVE');
		const skills = {};
		let agent = this.agent;
		agent.skills = skills;
		
		// habilidades básicas para o ciclo Clever Editing
		skills['dontKnow'] = new DontKnow();
		skills['study'] = new Study();
		skills['getLibraries'] = new GetLibraries();
		skills['addLibrary'] = new AddLibrary();
		skills['setLibrary'] = new SetLibrary();
		skills['getLibrary'] = new GetLibrary();
		skills['read'] = new CERead();
		skills['understand'] = new Understand();
		
		// linguagens para interpretação de Symbols
		skills['js'] = new JS();

		// habilidades podem ser estudadas para o ciclo Clever Editing
		skills['ask'] = new AskListeners();
		skills['askFor'] = new AskFor();
		skills['hear'] = new Hear();
		skills['write'] = new CEWrite();	
		
		// não essenciais para o ciclo Clever Editing
		// skills['live'] = new NaiveLive();
		
		skills['getAgent'] = new GetAgent();
		skills['newAgent'] = new NewChildAgent();
		skills['initAgent'] = new InitAgentSameLibrary();
		// TODO publish/subscribe?
		skills['addListener'] = new AddListener();
		skills['notify'] = new Notify();
		skills['subscribe'] = new AddListener();
		skills['publish'] = new Notify();
        
		skills['help'] = new Help();
		
		agent.see('set', ['teach', new Teach()]).then(() => {
            agent.see('teach', agent).then(() => {
console.log(agent + ' - Ceed().live');
                resolve(agent);
            });
        });
	}
}

function DontKnow() {
	this.act = function(perception, callback, reject) {
		let concept = perception.type;
		let agent = this.agent;
		let mind = this.mind;
		let learned = false;
		let fullname = mind.toString();
		
		// check for infinite loops
		mind.getAllBehavior.act('unkowns', function (dontKnow) {
			if (dontKnow.indexOf(concept) != -1) {
				console.debug(fullname + ' - Don\'t know "' + concept + '"! Ignoring');
				// Acho que tem que callback para destravar
				return callback(); 
			}
			console.log(fullname + ' - Don\'t know "' + concept + '"! Searching');
			mind.set('unkowns', concept).then(function () {

                // search in books
                agent.see('study', concept).then(function (learned) {
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

//console.log('STUDY', concept);
		agent.see('read', concept).then(function (representations) {
//console.log('STUDY2', concept);
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

                console.debug(agent + ' - Studied "' + concept + '": ' + (representations.length > 0));
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
function GetLibraries() {
	this.act = function(args, resolve, reject) {
		let agent = this.agent;
		let libraries = agent.libraries;
		if (!this.agent.libraries) {
            libraries = [new JSBrain()];
			this.agent.libraries = libraries;
		}
        resolve(libraries);
	};
}
function GetLibrary() {
	this.act = function(args, resolve, reject) {
		this.agent.see('getLibraries').then(libraries => {
		    let library = libraries[libraries.length - 1];
            resolve(library);
        });
	};
}

function AddLibrary() {
	this.act = function (library, resolve, reject) {
		this.agent.see('getLibraries').then(libraries => {
            libraries.push(library);
            resolve(libraries);
        });
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
	this.act = function(concept, resolve, reject) {
//console.log('CEREAD', concept);
		let representations = [];
		
		let agent = this.agent;
		let mind = this.mind;
		
		agent.see("getLibraries").then(function (brains) {
//console.log('CEREAD2', agent.toString(), concept, brains);
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
			
            /*/
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
							resolve(r);
						}
					}})(totalBooks - i - 1), reject);
				}
			}
            /*/
//console.log('CEREAD3', concept, brains);
            
            for (let i = booknames.length - 1; i >= 0; i--) {
                for (let j in brains) {
                    let brain = brains[j];
					let bookname = booknames[i];
					let argsRead = [brain, bookname, concept];
                    
                    representations.push(mind.read(argsRead));
                }
            }
//console.log('CEREAD3');// brains, representations);
            Promise.all(representations).then(meanings => {
//console.log('CEREAD4', meanings);
                let r = meanings.flat();
//console.log('CEREAD5', r);
                resolve(r);
			});
        /**/
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
	this.act = function(args, resolve) {	
		let concept = args[0];
		
		let agent = this.agent;
		let mind = this.mind;
		agent.see("getLibrary").then(function (brain) {
			let brains = [brain];
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
				mind.write([brain, bookname, args]).then(resolve);
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
			asker.see('hear', [a.key.val(), answer]).then(function (learned) {
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
function Hear() {
	/**
	 * args = [concept: String, answer: Symbol]
	 */
	this.act = function(args, callback) {
		let agent = this.agent;
console.log(agent + ' - HEAR', args);
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
			
			agent.see('set', [concept, interpretedMeaning]).then(function () {
// console.log('UNDER', concept, interpretedMeaning.act.toString());
                callback(learned);
            });
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
        let promises = []
		for (let name in skills) {
			let skill = skills[name];
//console.log('TEACH', name);
			promises.push(agent.see('set', [name, skill]));
		}
		
		Promise.all(promises).then(callback);
	};
}

function NaiveLive() {
	this.act = function (args, callback) {
		console.log(this.agent + ' - Ceed.live');
		callback(this.agent);
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
		let [event, info] = args;
		let agent = this.agent;
		try {
			let capitalized = event.charAt(0).toUpperCase() + event.slice(1);
			for (let observer of agent.observers[event]) {
				observer.see('on' + capitalized, info);
			}
		} catch {}
		resolve();
	};
}
function NewAgent() {
	this.act = function (fullname, callback) {
		let ceed = this.agent;
		let agent = new NaiveMind(fullname).body;
        ceed.see('teach', agent).then(function () {
            ceed.see('initAgent', agent).then(function () {
                callback(agent);
                ceed.see('notify', ['newAgent', agent]);
            });
        });
	}
}
function NewChildAgent() {
	this.act = async function (name, callback) {
		let ceed = this.agent;
		
        var capitalized = name.charAt(0).toUpperCase() + name.slice(1);
        var firstName = capitalized.split(' ')[0];
		let childName = (await ceed.see('getName')) + '/' + firstName + ' ' + name;
		Ceed(childName).then(function (agent) {
			agent.see('set', ['parent', ceed]);
			callback(agent);
		});
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
            let promises = [];
            for (let library of libraries) {
                promises.push(agent.see('addLibrary', library));
            }
            Promise.all(promises).then(() => {
				//callback(agent);
                // TODO será que deve chamar logo o live!
				// ou a aplicação deve ter o controle?
				agent.see('live').then(() => {
					callback(true);
				});
			});
		});
		/**/
	}
}

function GetAgent() {
	this.act = async function (fullname, callback) {
		// Talvez o próprio agente devesse lidar com o nome
		// só que o Ceed precisa anotar já o nome em maiúsculo
		try {
			fullname = fullname.toString();
			fullname = fullname.charAt(0).toUpperCase() + fullname.slice(1);
		} catch {
			fullname = 'Ceed';
		}
		
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
		this.see = function (type, info, callback, fallback) {
            if (callback) {
console.trace('@Deprecated CEED', this + '.see(' + type + ') should use Promise');
			}
			return this.mind.see(new Symbol(0, type, info), callback, fallback);
		}
	};
	toString() {
		return this.mind.toString();
	};
	
	static ceed;
	static async getInstance() {
		if (!CeedAgent.ceed) {
			let agent = new NaiveMind('Ceed').body;
			CeedAgent.ceed = agent;
			agent.agents = {Ceed: [new Promise ((res, rej) => { res(agent); })]};
			
			await agent.see('set', ['live', new Live()]);
			await agent.see('live');
//console.log('GET_INSTANCE0', CeedAgent.ceed.mind.getBrain().toString());
			await agent.see('set', ['newAgent', new NewAgent()]);
			
			/**/
			await agent.see('read', 'Naive.EmptyAction').then(async function (meanings) {
//console.log('GET_INSTANCE', meanings);
				if (meanings.length == 0) {
					await agent.see('write', [
						'Naive.EmptyAction', 
						new Symbol(0, 'js', 'new (' + EmptyAction.toString() + ')();')
					]);
				}
			});
			await agent.see('read', 'Naive.live').then(async function (meanings) {
//console.log('GET_INSTANCE2', meanings);
				if (meanings.length == 0) {
					await agent.see('write', [
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
export const Ceed = (function () {
	const ceed = CeedAgent.getInstance();
	
	return async function (names) {
		if (!names) {
			return ceed;
		}
		else {
			return (await ceed).see('getAgent', names);
		}	
	};
})();

export function AskListeners(helperName) {
    this.act = function (key, resolve, reject) {
		console.log(this.agent + ' - Asking: ' + key);
		var agent = this.agent;
		Ceed(helperName).then(helper => {
            helper.see('notify', ['question', [agent, key]]);
        });
    };
}

export function AskAgent(helperName) {
	this.act = async function (key, callback) {
		console.log(this.agent + ' - Asking: ' + key);
		var agent = this.agent;
		Ceed(helperName).then(helper => {
			helper.see('askFor', [agent, key]).then(callback);
			
			agent.see('addListener', ['answer', helper]);
		});
	};
}
export function HearNotify() {
	/**
	 * args = [concept: String, answer: Symbol]
	 */
	this.act = function(args, callback) {
		let agent = this.agent;
console.log(agent + ' - HEAR_NOTIFY', args);
		agent.see('write', args);
		agent.see('understand', args).then((learned) => {
			if (learned) {
				agent.see('notify', ['answer', [agent, args]]);
			}
			callback(learned);
		});
	};
}

function Help() {
	this.act = async function (args, resolve, reject) {
		const agent = this.agent;
		const agents = {
		    'known': {},
		    'learnable': {}
		};
		{
    		const brain = agent.mind.getBrain();
    		const links = await brain.reason(null);
  		
    		for (let i in links) {
    		    let link = links[i];
    		    let actions = agents['known'][link.a.info];
    		    if (!actions) {
    		        actions = [];
    		        agents['known'][link.a.info] = actions;
    		    }
    		    if (!actions.includes(link.r.info)) {
    		        actions.push(link.r.info);
    		    }
    		    
    		}
		}
		
		const brains = await agent.see('getLibraries');
        agents.libraries = brains;
		for (let brain of brains) {
    		const links = await brain.reason();
    		
    		for (let i in links) {
    		    let link = links[i];
    		    let actions = agents['learnable'][link.a.info];
    		    if (!actions) {
    		        actions = [];
    		        agents['learnable'][link.a.info] = actions;
    		    }
    		    if (!actions.includes(link.r.info)) {
    		        actions.push(link.r.info);
    		    }
    		    
    		}
		}
		
		console.log('help', agents);
		resolve(agents);
	};
}