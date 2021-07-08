/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
/*
LEA
	ouve o socket e cria servidores HTTP com o Front
	
	+ Argumento a favor
	O trabalho do LEA é:
		permitir que o Ceed interaja com outras aplicações
			através de sockets
			respondendo perguntas pelo ambiente HTTP.
		colocar o Ceed na Internet.	Isso quer dizer:
			- 
*/
//import ejs from 'ejs';
import {Ceed, AskAgent, HearAnswerNotify} from './../public/_js/ceed/ceed.js';
import {Symbol} from './../public/_js/ceed/brain.js';
import {MySQLBrain} from './../public/_js/ceed/mysql_brain.js';
import {AgentBrain} from './../public/_js/ceed/agent_brain.js';

export const LEA = function (name) {
	if (!name) {
		name = 'LEA';
	}
	const agent = Ceed(name);
	return agent;
}

/*
Muda o comportamento que o Ceed deve ensinar aos agentes;
 */
function Live() {
	this.act = async function(args, resolve, reject) {
		console.log(this.agent + '- LEA.live');
		
		// estuda enquanto tem o Ceed.JSBrain
		let lea = this.agent;
		// servidor HTTP
		await Promise.all([
            lea.see('study', 'listen'),
            lea.see('study', 'http'),
            // servidor Socket
            lea.see('study', 'onSocketConnection'),
            lea.see('study', 'onSocketSee'),
            // concentra perguntas
            lea.see('study', 'askFor'),
            lea.see('study', 'onAnswer')
        ]);
		
		// todos os agentes a partir de agora perguntam pro LEA
		// TODO efeito colateral!? talvez, all over the place.
		let ceed = await Ceed();
        /*/
        // não mudaria o que tem dentro. mas adiciona burocracia.
        //ceed.see('addListener', ['question', lea]);
        /**/
		ceed.skills['ask'] = new AskAgent('LEA');
		ceed.skills['hearAnswer'] = new HearAnswerNotify();
        /**/
		resolve(true);
	};
}

function InitHttpBrain() {
	this.act = async function(options, resolve, reject) {
		let lea = this.agent;
		
		try {
			const HTTPBrain = (await import('./http_brain.js')).HTTPBrain;
			let brain = new HTTPBrain(options.host, options.protocol);
			(await Ceed()).see('setLibrary', brain);
			await lea.see('setLibrary', brain);
		}
		catch (e) {
			reject(e);
		}
		
		resolve(true);
	}
}

function ConfigMySQLBrain() {
	this.act = async function(options, resolve, reject) {
        const mysql = (await import('mysql'));
		const MySQLBrain = (await import('./mysql_brain.js')).MySQLBrain;
		const AgentBrain = (await import('./agent_brain.js')).AgentBrain;

		const lea = this.agent;
		
		// configura o agente brain
		try {
console.log('Initializing server...');
            
            const pool = mysql.createPool(options);
			const mysqlBrain = new MySQLBrain(pool);
			await mysqlBrain.createTables();
            await lea.see('set', ['onServerInitialized', new (function () {
                this.act = function () {
                    lea.server.on('close', function() {
                        console.log('Ending server...');
                        pool.end(function (err) {
                            if (err) throw err;

                            console.log('Pool ended');
                        });
                    });
                }
            })()]);
            lea.see('addListener', ['serverInitialized', lea]);
            
			/**/
            const brain = await Ceed('Brain');
            await brain.see('setLibrary', mysqlBrain);
			await brain.see('study', 'reason');
			const library = new AgentBrain(brain);
			/*/
            const library = mysqlBrain;
            /**/
            
			(await Ceed()).see('addLibrary', library);
			await lea.see('addLibrary', library);
		}
		catch (e) {
			reject(e);
		}
		
		resolve(true);
	};
}

function InitBrain() {
	this.act = async function(options, resolve, reject) {
		const lea = this.agent;
		
		let ok;
		do {
			try {
				await lea.see('configMySQLBrain', options);
				ok = true;
			} catch (e) {
				ok = false;
				console.log('InitBrain Error on Connect to DB', e);
				console.log('Trying again in 1s');
				await new Promise(resolve => setTimeout(resolve, 1000));
			}
		} while (!ok);		
		
		resolve(true);
	};
}

function Heared() {
	this.act = function (args, callback) {
		let lea = this.agent;
		let agent = args[0];
		let key = args[1][0];
		agent.see('getFullName').then(function (name) {
			delete lea.questions[name];
		});
		callback();
	}
}
function OnQuestion() {
	this.act = function([agent, key], callback) {
		let lea = this.agent;
		if (!lea.agents) {
			lea.agents = {};
		}
		if (!lea.questions) {
			lea.questions = {};
		}
		agent.see('getFullName').then(function (name) {
			if (!lea.agents[name]) {
				lea.agents[name] = agent;
			}
			if (!lea.questions[name]) {
				lea.questions[name] = [];
			}
			lea.questions[name].push(key);
			
			console.log(lea.toString() + ' asking for ' + agent.toString() + ' "' + key + '"');
			if (lea.io) {
				lea.io.emit('question', [name, key]);
			}
		});
		// quer dizer que quem pergunta já fica com "não aprendeu", pra não ficar sem resposta
		callback();
	};
}

/*
Servidor HTTP
*/
 
function Listen() {
	this.act = async function(options, callback) {
		let defaults = {
			hostname: '127.0.0.1',
			port: 3000,
			dir: 'public'
		};
		options = Object.assign(defaults, options);

		let agent = this.agent;
		
		let http = await import('http');
		let express = (await import('express')).default;
		const app = express();
		const server = http.createServer(app);
        // TODO não deixa ligar vários servidores
		agent.app = app;
		agent.server = server;
        
		// Setting up the public directory
		app.use(express.static(options.dir));
		
		// Setting up POST parser
		let bodyParser = (await import('body-parser')).default;
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
		
		let io = (await import('socket.io')).default;
		let sio = io(server);
		agent.io = sio;
		sio.on('connection', (socket) => {
			agent.see('onSocketConnection', socket);
		});

		// Rotas
        // TODO colocar numa ação
		/**/
		app.get('/*', (req, res) => {
			agent.see('http', [req, res]);
		});
		/**/
		app.post('/*', (req, res) => {
			agent.see('http', [req, res]);
		});
		/**/

		server.listen(options.port, options.hostname, () => {
		  console.log(`Server running at http://${options.hostname}:${options.port}/`);
		});
        
        agent.see('notify', 'serverInitialized');
		
		callback();
	}
}

function Http() {
	this.act = async function (args, callback) {
		let req = args[0];
		let res = args[1];
		
		let url = await import('url');
		let path = new url.URL(req.url, `http://${req.headers.host}`).pathname.split('/');
		let agentName = 'index';
		let actionName = 'index';
		switch (path.length) {
		    case 0:
		    case 1:
        		break;
		    default:
		    case 3:
		        actionName = path[2];
		    case 2:
		        agentName = path[1];
		}
		Ceed(agentName + 'Controller Controller').then(async agent => {
			try {
				//await agent.see('live');
				await agent.see('preDispatch', args);
				await agent.see(actionName, args);
				await agent.see('postDispatch', args);
			} catch(e) {
				console.log('ERRO HTTP', e);
			};
		});
		
		callback(true); // return statement
	};
}

function OnSocketConnection() {
	this.act = function(socket, callback) {
		console.log('connected #' + socket.id);
		let lea = this.agent;
		
		socket.on('see', (agent, action, args, callback) => {
			lea.see('onSocketSee', [agent, action, args]).then(callback);
		});
		
		//socket.join('/lea')
		let questions = this.agent.questions;
		for (let agent in questions) {
			for (let i in questions[agent]) {
				let key = questions[agent][i];
				socket.emit('question', [agent, key]);
			}
			
		}
		
		callback(true);
	};
}

function OnSocketSee() {
	this.act = async function(args, callback) {
		let agentName = args[0];
		let action = args[1];
		let target = args[2];
		let lea = this.agent;
		if (!lea.agents) {
			lea.agents = {};
		}
		let agent = lea.agents[agentName];
		if (!agent) {
			agent = await Ceed(agentName);
			lea.agents[agentName] = agent;
		}
		//console.log('socketSee', agentName, action, target);
		agent.see(action, target).then(callback).catch(e => {
            console.log('ERRO SOCKET', e);
        });
	}
}

export function EmptyAction() {
	this.act = function (args, resolve, reject) {
		let req = args[0];
		let res = args[1];
		// your code here
		resolve();
	};
}
/**/
let ceed = await Ceed();
await Promise.all([
	ceed.see('write', ['LEA.live', new Symbol(0, 'js', 'new (' + Live.toString() + ')();')]),
	ceed.see('write', ['LEA.configMySQLBrain', new Symbol(0, 'js', 'new (' + ConfigMySQLBrain.toString() + ')();')]),
	ceed.see('write', ['LEA.initBrain', new Symbol(0, 'js', 'new (' + InitBrain.toString() + ')();')]),
	ceed.see('write', ['LEA.initHttpBrain', new Symbol(0, 'js', 'new (' + InitHttpBrain.toString() + ')();')]),
	ceed.see('write', ['LEA.http', new Symbol(0, 'js', 'new (' + Http.toString() + ')();')]),
	ceed.see('write', ['LEA.listen', new Symbol(0, 'js', 'new (' + Listen.toString() + ')();')]),
	ceed.see('write', ['LEA.onSocketConnection', new Symbol(0, 'js', 'new (' + OnSocketConnection.toString() + ')();')]),
	ceed.see('write', ['LEA.onSocketSee', new Symbol(0, 'js', 'new (' + OnSocketSee.toString() + ')();')]),
	ceed.see('write', ['LEA.askFor', new Symbol(0, 'js', 'new (' + OnQuestion.toString() + ')();')]),
	ceed.see('write', ['LEA.onAnswer', new Symbol(0, 'js', 'new (' + Heared.toString() + ')();')]),
	// Controller
	ceed.see('write', ['Controller.EmptyAction', new Symbol(0, 'js', 'new (' + EmptyAction.toString() + ')();')]),
	ceed.see('write', ['Controller.preDispatch', new Symbol(0, 'js', 'new (' + EmptyAction.toString() + ')();')]),
	ceed.see('write', ['Controller.postDispatch', new Symbol(0, 'js', 'new (' + EmptyAction.toString() + ')();')])
]);
console.log('Writing server...');
//console.log((await ceed.see('getLibraries'))[0].toString());
/**/
//lea.see('set', ['live', new Live()]);
