/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
import {HTTPAgentFactory} from './../public/_js/ceed/agent.js';
import assert from 'assert';

describe('HTTPAgent', function () {
	it('should newAgent(url, "http") and Promise a String with the HTTP response'/*/, async function () {
        let http = await HTTPAgentFactory.newAgent('http://127.0.0.1/', {}, 'http');
        let r = await http.see('health');
		assert.equal(r, 'ok');
		
	}/**/);
	it('should newAgent(url, info, "post") and Promise a String with the HTTP response'/**/, async function () {
        let http = await HTTPAgentFactory.newAgent('http://127.0.0.1/', {
			method: 'POST'
		}, 'http');
        let r = await http.see('health', {id:1});
		assert.equal(r, '{"ok":true,"post":{"id":"1"}}');
		
	}/**/);
	it('should newAgent(url, "https") and Promise a String with the HTTP response'/*/, async function () {
        let http = await HTTPAgentFactory.newAgent('https://tiia.com.br/LEA/ce/brain/');
        let r = await http.see('gets?id=1');
		assert.equal(r, '[{"z":"book","id":1,"info":"ce"}]\n');
		
	}/**/);
	it('should newAgent(url, {id:1}, "https") and Promise a String with the HTTP response'/**/, async function () {
        let http = await HTTPAgentFactory.newAgent('https://tiia.com.br/LEA/ce/brain/', {
			method: 'POST'
		});
        let r = await http.see('gets', {id: 1});
		assert.equal(r, '[{"z":"book","id":1,"info":"ce"}]\n');
		
	}/**/);
	it('should newAgent(url, id=1, "post") and Promise a String with the HTTP response'/*/, async function () {
        let http = await HTTPAgentFactory.newAgent('https://tiia.com.br/LEA/ce/brain/', {
			method: 'POST'
		});
        let r = await http.see('gets', 'id=1');
		assert.equal(r, '[{"z":"book","id":1,"info":"ce"}]');
		
	}/**/);
});
