/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
export function HTTPAgent(endereco) {
	if (endereco == null) {
		endereco = 'Agent';
	}
	if (endereco.charAt(endereco.length - 1) != '/') {
		endereco += '/';
	}
	this.endereco = endereco;
	//this.name = name;
	
	this.see = function (type, info, callback, answerType) {
		$.post(endereco + type, info, callback, answerType);
	};
}

export function SocketAgent(name, socket) {
	//var socket = io();
	//socket.join(name);
    const self = this;
	this.socket = socket;
	
	this.see = function (action, args) {
		return new Promise((resolve, reject) => {
            /*/
            if (!callback) {
                callback = (response) => {
                    resolve(response);
                };			
            }
            if (!fallback) {
                fallback = (response) => {
                    reject(response);
                };
            }
            /**/

            console.log(name, action, args);
            if (!self.socket) {
                console.error('Socket missing!');
            }
            else {
                self.socket.emit('see', name, action, args, resolve);
            }

		});
	};
}

export function FetchAgent(endereco) {
	if (endereco == null) {
		endereco = 'Agent';
	}
	if (endereco.charAt(endereco.length - 1) != '/') {
		endereco += '/';
	}
	this.endereco = endereco;
	
	this.see = function (type, info) {
		return fetch(endereco + type, info);
	};
}
export const HTTPAgentFactory = {newAgent: async function (baseUrl, options, protocol) {
	let http = await import(protocol || 'https');
	let querystring = await import('querystring');
	return new (function HTTPAgent2() {
		let agent = this;
		const defaults = Object.assign({
		  method: 'GET'
		}, options);
		baseUrl = baseUrl.toString();
		if (baseUrl.charAt(baseUrl.length - 1) != '/') {
			baseUrl += '/';
		}
		
			
		this.see = function (type, info) {
			return new Promise((resolve, reject) => {
				//const postData = JSON.stringify(info) || '';
				const postData = querystring.stringify(info);
				
				let url = baseUrl + type;
console.log('HTTP Agent Request', url, postData);
						
				const options = (defaults.method == 'POST') ?
					Object.assign(defaults, {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',//'application/json',
							'Content-Length': postData.length
						}
					}) : defaults;
				const req = http.request(url, options, (resp) => {
					let data = '';
					
					// A chunk of data has been received.
					resp.on('data', (chunk) => {
						data += chunk;
					});
					
					// The whole response has been received. Print out the result.
					resp.on('end', () => {
//console.log('HTTP Agent Response', data);
						resolve(data);
					});
					
				});
				req.on("error", (err) => {
					reject(err);
				});
				if (options.method == 'POST') {
//console.log('HTTP Agent Post', postData);
					req.write(postData);
				}
				req.end();
			});
		};
	});
}};
/*
// Interface
function Agent() {
	this.see = function (type, info, callback) {};
}
// Ceed implements Agent
function Ceed(mind) {
	this.mind = mind;
	this.see = function (type, info, callback) {
		this.mind.see(new Symbol(0, type, info), callback);
	};
}
*/
