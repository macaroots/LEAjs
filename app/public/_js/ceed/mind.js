/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
/**
 * Created on 16/10/2014
 *	Works with BRAIN - Brain Representation for Artificial Intelligence Network
 
 Modified on 27/01/2017:
	- Qualquer reaÃ§Ã£o do agente partirÃ¡ dele. NÃ£o Ã© possÃ­vel extrair nada do agente. Portanto, a interface Agent antiga:
		Agent
			Object see(Object perception)
		Action
			Object act(Object perception, Action callback)
	deverÃ¡ ficar:
		Agent
			void see(Object perception, String callback)
			void see(Object perception, Action callback)
			
		Action
			void act(Object perception, Action callback)
	
Futuros
	Podemos implementar um conceito de genes recessivos e dominantes na hora da heranÃ§a e nÃ­veis de recessividade. Vale a pena?
 */
 
import {CeedAgent} from './ceed.js';
import {Symbol, Link} from './brain.js';
import {JSBrain} from './jsbrain.js';
export function NaiveMind(name, brain) {
    const self = this;
	this.setName = function(name) {
		let names = name.split(' ');
		names.push('Naive');
		this.names = names;
	};
	this.getName = function(i) {
		if (i == null) {
			i = 0;
		}
		return this.names[i];
	};
	this.getNames = function() {
		return this.names;
	};
	this.getFullName = function() {
		return this.names.join(' ');
	};
	this.setName(name);

	if (!brain) {
		brain = new JSBrain();
	}
	this.setBrain = function(brain) {
		this.setBrains([brain]);
	};
	this.getBrain = function() {
		return this.getBrains(0);
	};
	this.setBrains = function(brains) {
		this.brains = brains;
	};
	this.getBrains = function(i) {
		if (i == null) {
			return this.brains;
		}
		else {
			return this.brains[i];
		}
	};
	this.setBrain(brain);
	
	this.seeBehavior = new See(this);
	this.setBehavior = new Set(this);
	this.getBehavior = new Get(this);
	this.getAllBehavior = new GetAll(this);
	this.actBehavior = new Act(this);

	this.readBehavior = new ReadBrain(this);
	this.writeBehavior = new WriteBrain(this);

	this.errorBehavior = new Error(this);

	this.see = function(perception, callback, fallback) {
		return new Promise((resolve, reject) => {
            /**/
            if (!callback) {
				callback = resolve;
			}
			else {
console.trace('@Deprecated MIND', self.toString() + '.see(' + perception + ') should use Promise');
				callback = ((call) => { return (response) => {
					resolve(call(response));
				}})(callback);
			}
			if (!fallback) {
				fallback = reject;
			}
			else {
//console.trace('@Deprecated see() should use Promise');
				fallback = ((call) => { return (response) => {
					reject(call(response));
				}})(fallback);
			}
			/**/
            self.seeBehavior.act(perception, callback, fallback);
        });
	};
	this.set = function(name, concept) {
		return new Promise((resolve, reject) => {
			if (concept == null) {
				concept = name;
				name = typeof(concept);
			}
			self.setBehavior.act([name, concept], resolve, reject);
		});
	};
	this.get = function(concept) {
		return new Promise((resolve, reject) => {
            self.getBehavior.act(concept, resolve, reject);
        });
	};
	this.act = function(action, object) {
		return new Promise((resolve, reject) => {
            self.actBehavior.act([action, object], resolve, reject);
        });
	};
    
    
	this.read = function(args) {
		return new Promise((resolve, reject) => {
            self.readBehavior.act(args, resolve, reject);
        });
	};
	this.write = function(args) {
		return new Promise((resolve, reject) => {
            self.writeBehavior.act(args, resolve, reject);
        });
	};

	let body = new CeedAgent(this);
	// TODO a mente tem um corpo?
	this.body = body;

	this.set('set', this.setBehavior);
	body.see('set', [this.getName(), body]);
	body.see('set', ['self', body]);
	body.see('set', ['parent', body]);
	body.see('set', ['get', this.getBehavior]);
	body.see('set', ['getAll', this.getAllBehavior]);
	body.see('set', ['getName', new GetName(this)]);
	body.see('set', ['getNames', new GetFullName(this)]);
	body.see('set', ['getFullName', new GetFullName(this)]);
	body.see('set', ['error', this.errorBehavior]);
	
	body.see('set', ['readBrain', this.readBehavior]);
	body.see('set', ['writeBrain', this.writeBehavior]);
	
	body.see('set', ['dontKnow', new DontKnow()]);
	body.see('set', ['notAction', new NotAction()]);
	
	this.context = {};
	
    this.id = new Date().getTime();
	this.toString = function() {
		return this.getName() + '@' + this.id;
	};
}

function GetName(mind) {
	this.mind = mind;
	this.act = function(i, resolve) {
		let mind = this.mind;
		let name = mind.getName(i);
		resolve(name);
	}
}
function GetFullName(mind) {
	this.mind = mind;
	this.act = function(p, resolve) {
		let mind = this.mind;
		resolve(mind.getFullName());
	}
}
function See(mind) {
	this.mind = mind;
	this.act = function(perception, resolve, reject) {
        let mind = this.mind;
        
        try {
            let type = perception.type;
            
            // procura uma acao
            mind.get(type).then(function (action) {
                if (action != null) {
                    // act() já lida com os erros
                    try {
                        mind.act(action, perception.info).then(resolve).catch(reject);
                    }
                    catch (e) {
                        mind.errorBehavior.act([args, e], resolve, reject);
                    }
                }
                else {
                    /*
                        se nao, procura o que fazer quando nao sabe, que deve
                        de alguma forma tentar aprender.
                        Bem, isso pode ser decidido depois.
                        That's the hook!
                    */
                    if (type != null && type != 'dontKnow') {
                        mind.see(new Symbol(0, "dontKnow", perception)).then(resolve).catch(reject);
                    }
                }
            }).catch(reject);
        } catch (e) {
            reject(e);
        }
	};
}

function DontKnow() {
	this.act = function(perception, resolve) {
		resolve();
	}
}
function NotAction() {
	this.act = function(perception, resolve, reject) {
		let fullname = this.agent.toString();
		console.log(fullname + ' - Could not execute action.', perception);
		resolve();
	}
}

function Set(mind) {
	this.mind = mind;
	/*
		args = [name: String, concept: Object]
	 */
	this.act = function(args, resolve, reject) {
		let mind = this.mind;
		let body = mind.body;
		let brain = mind.getBrain();
		let bookname;

		if (args[0].indexOf('.') == -1) {	
			bookname = mind.getName();
		}
		else {
			let type = args[0].split('.');
			bookname = type[0];
			if (bookname == "super") {
				// TODO o ideal era descobrir em qual nome ele achou a resposta.
				bookname = mind.getName(1);
			}
/*			if (!mind.getNames().includes(bookname)) {
				bookname = mind.getName();
			}
*/			args[0] = type[1];
		}
		
		// aproveita a flexibilidade do Javascript para melhorar a performance
		// TODO tirar daqui, colocar num Decorator
		if (bookname == mind.getName() || body[args[0]] == null) {
			body[args[0]] = args[1];
		}
		mind.write([brain, bookname, args]).then(resolve).catch(reject);
	};
}

function GetAll(mind) {
	this.mind = mind;
	this.act = function(concept, callback, reject) {		
		let mind = this.mind;
		let brain = mind.getBrain();
//console.log('GetAll1', brain, brain.toString(), 1);
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
		// TODO atualizar Promise
		let promises = [];
		for (let i = booknames.length - 1; i >= 0; i--) {
			let bookname = booknames[i];
			let args = [brain, bookname, concept];
            
            promises.push(mind.read(args).then(symbols => {
//console.log('GetAll2', symbols);
                let meanings = [];
				for (let j in symbols) {
					let s = symbols[j];
					meanings.push(s.info);
				}
				return meanings;
            }));
        }
//console.log('GetAll3', concept, promises);
        Promise.all(promises).then(meanings => {
            let r = [];
            for (let i in meanings) {
                r = r.concat(meanings[i]);
            }
//console.log('GetAll4', meanings);
//console.log('GetAll5', r);
            callback(r);
        }).catch(e => {
            console.error('ERROR GetAll', e);
        });
	};
}
function Get(mind) {
	this.mind = mind;
	this.act = function (key, callback, reject) {
		let mind = this.mind;
		let body = mind.body;
		if (body[key] != null) {
			callback(body[key]);
		}
		else {
			// TODO atualizar Promise
			mind.getAllBehavior.act(key, function (meanings) {
				let meaning = null;
				if (meanings != null && meanings.length > 0) {
					let context = 1;
					if (key in mind.context) {
						context = mind.context[key];
					}
					let iContext = meanings.length - context;
					meaning = meanings[iContext];
				}
				callback(meaning);
			});
		}
	}	
}

function Error(mind) {
	this.mind = mind;
	this.act = function(args, resolve, reject) {
		try {
			let e = args[1];
			let action = args[0][0];
			let target = args[0][1];
			console.trace(mind + " - ERROR:", action, "(" + target + ") - ", typeof(e), ':', e);
		} catch (e) {
			console.error('CRITICAL ERROR', e);
            reject(e)
		}
		// TODO rejeita ou não? Deu uma destravada rejeitando
		resolve();
	};
}

function Act(mind) {
	// TODO é estranho a mente ter um corpo!
	this.mind = mind;
	let este = this;
	este.log = false;
	this.act = function(args, resolve, reject) {
		try {
			let action = args[0];
			let target = args[1];
			action.mind = mind;
			action.agent = mind.body;
			// resolve.agent = mind.body;
			if (este.log) {
				console.log('Act!', mind.toString(), action);
			}
			action.act(target, resolve, reject);
		}
		catch (e) {
			// TODO acho que é algo como o de baixo, mas tem que evitar repetição
			// agent.see('error', [args, e], resolve, reject);
			mind.errorBehavior.act([args, e], resolve, reject);
		}
	};
}
	
function WriteBrain() {
	this.act = function(args, resolve, reject) {
		let brain = args[0];
		let keyname = args[1];
		let name = args[2][0];
		let value = args[2][1];
		let key;
		let relation;
		// o cerebro funciona com simbolos, portanto cria símbolos para key, relation e value
		if (!(keyname instanceof Symbol || (keyname.type && keyname.info))) {
			key = new Symbol(0, typeof(keyname), keyname);
		}
		else {
			key = keyname;
		}
		if (!(name instanceof Symbol)) {
			relation = new Symbol(0, typeof(name), name);
		}
		else {
			relation = name;
		}
		if (!(value instanceof Symbol || (value.type && value.info))) {
			value = new Symbol(0, typeof(value), value);
		}
		brain.tie(new Link(key, relation, value)).then(resolve);/*
	};
}
	
function ReadBrain() {
	this.act = function(args, resolve, reject) {

		let brain = args[0];
		let bookname = args[1];
		let concept = args[2];

		let book = new Symbol(0, typeof(bookname), bookname);
		
		let relation = new Symbol(0, null, concept);
		// TODO atualizar Promise
		brain.reason(new Link(book, relation)).then(function (links) {
//console.log('READ_BRAIN1', bookname, concept, links);
			let meanings = [];
			for (let i in links) {
				let link = links[i];
				let meaning = link.b;
				meanings.push(meaning);
			}
//console.log('READ_BRAIN', bookname, concept, meanings);
			resolve(meanings);
		});
	};
}
