/** 
 * LEA - Live Environment for Agents
 * by Renato Lenz Costalima
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import {Ceed} from './public/_js/ceed/ceed.js';
import {} from './lib/lea.js';

const lea = await Ceed('LEA');

/*/
lea.see('initHttpBrain', {
	host: process.env.BRAIN_HOST,
	protocol: process.env.BRAIN_PROTOCOL
}).then(() => {
/*/
lea.see('initBrain', {
	host: process.env.DB_HOST || 'localhost',
	database: process.env.DB || 'mind',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || ''
}).then(() => {
/**/
	lea.see('listen', {
		hostname: process.env.HOSTNAME || '127.0.0.1', 
		port: process.env.PORT || 3000
	});
});