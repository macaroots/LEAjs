/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
import {NaiveMind} from './../public/_js/ceed/mind.js';
import assert from 'assert';

describe('NaiveMind', function () {
	it('should get/set');
	it('should see');
	it('should inherit');
	describe('*intelligence', function () {
		it('should be able to acquire and apply knowledge', async function () {
			let agent = new NaiveMind('Joe').body;
			await agent.see('hello', 'world').then(r => {
				assert.equal(r, null);
			});
			function Hello() {
				this.act = function (args, resolve, reject) {
					resolve('Hello, ' + args + '!');
				};
			}
			let hello = new Hello();
			await agent.see('set', ['hello', hello]);
            let hello2 = await agent.see('get', 'hello');
            assert.equal(hello, hello2);
            let hellos = await agent.see('getAll', 'hello');
            assert.equal(hello, hellos[0]);
			let r = await agent.see('hello', 'world');
			assert.equal(r, 'Hello, world!');
			let r2 = await agent.see('hello', 'Joe');
			assert.equal(r2, 'Hello, Joe!');
			
		});
	});
});


describe('Ceed', function () {
  describe('#getInstance(names) - Singleton', function () {
    it('should Promise the same agent Ceed'/*, function (done) {
		const name = 'Ceed';
		Ceed().then(front => {
			front.see('get', 'a').then(function (n) {
				assert.equal(n, 12);
				done();
			});
		});
    }*/);
  });
});
