/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
import {Ceed} from './public/_js/ceed/ceed.js';
import {FileBrain} from './public/_js/ceed/file_brain.js';
import {} from './lib/lea.js';
/*/
let library = new FileBrain('./live');
const ceed = await Ceed();
ceed.see('addLibrary', library).then(async () => {
/**/

const lea = await Ceed('LEA');
/**/
/*/
lea.see('initHttpBrain', {
	host: process.env.BRAIN_HOST,
	protocol: process.env.BRAIN_PROTOCOL
}).then(() => {
/*/
lea.see('initBrain', {
	host: process.env.MYSQL_HOST || 'localhost',
	database: process.env.MYSQL_DATABASE || 'leajs',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || 'admin',
    // debug: true
}).then(async () => {
/**/

    lea.see('listen', {
        hostname: process.env.HOSTNAME || '127.0.0.1', 
        port: process.env.PORT || 3000
    });
/**/
}).catch(e => {
	console.error('ERROR LEA APP', e);
});/**/
