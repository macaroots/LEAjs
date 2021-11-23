/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
/*
 * Tentativa de evitar await Ceed(), adicionando o método see() na promessa.
 */

import {Ceed, CeedAgent} from './ceed.js';

export const Ceed2 = function (names) {
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
