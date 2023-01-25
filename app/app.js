/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
import {Ceed} from './public/_js/ceed/ceed.js';
import {FileBrain} from './public/_js/ceed/file_brain.js';
let library = new FileBrain('./live');
const ceed = await Ceed();
await ceed.see('addLibrary', library);

const lea = await Ceed('Front');
try {
    // Add HTTP Brain
    /*/
    await lea.see('initHttpBrain', {
        host: process.env.BRAIN_HOST || 'http://localhost/brain',
        protocol: process.env.BRAIN_PROTOCOL || 'http'
    });
    /**/
    // Add MySQL Brain
    /*/
    await lea.see('initBrain', {
        host: process.env.MYSQL_HOST || 'localhost',
        database: process.env.MYSQL_DATABASE || 'leajs',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'admin',
        // debug: true
    });
    /**/

    await lea.see('listen');
} catch(e) {
	console.error('ERROR LEA APP', e);
}
