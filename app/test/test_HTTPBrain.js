/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
import {HTTPBrain} from './../public/_js/ceed/http_brain.js';
import {Symbol, Link} from './../public/_js/ceed/brain.js';
import assert from 'assert';

describe('HTTPBrain', function () {
	it('should gets(symbol) and callback a String'/**/, function (done) {
        let brain = new HTTPBrain('http://127.0.0.1:8080/brain/', 'http');
        brain.get(new Symbol(1, null, null), r => {
			let a = r[0];
			let b = r.length;
			assert.equal(a.id, 1);
			assert.equal(b, 1);
			done();
		});
		
	}/**/);
	it('should reason(link) and callback a String'/**/, function (done) {
        let brain = new HTTPBrain('http://127.0.0.1:8080/brain/', 'http');
        brain.reason(new Link(null, new Symbol(2, null, null), null), r => {
			assert.equal(r, '[{"z":"book","id":1,"info":"ce"}]\n');
			done();
		});
		
	}/**/);
});
