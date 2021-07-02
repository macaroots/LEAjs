/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
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
	host: process.env.MYSQL_HOST || 'localhost',
	database: process.env.MYSQL_DATABASE || 'mind',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || '',
    // debug: true
}).then(() => {
/**/
	lea.see('listen', {
		hostname: process.env.HOSTNAME || '127.0.0.1', 
		port: process.env.PORT || 3000
	});
}).catch(e => {
	console.error('ERROR LEA APP', e);
});
