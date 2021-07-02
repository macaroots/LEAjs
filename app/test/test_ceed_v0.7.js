/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
import {Ceed, InitAgentSameLibrary} from './../public/_js/ceed/ceed2.js';
import {Symbol} from './../public/_js/ceed/brain.js';
import assert from 'assert';


function AskFor() {
	this.act = async function (args, resolve, reject) {
		let name = await this.agent.see('getFullName');
		console.log(name + ' - Asking: ' + args);
		resolve();
	};
}
let ceed = Ceed();
ceed.see('set', ['setSkill', new (function () {
	this.act = function (args, resolve, reject) {
		let key = args[0];
		let info = args[1];
		this.agent.skills[key] = info;
	}
})()]);

ceed.see('setSkill', ['ask', new AskFor()]);

describe('Ceed', function () {
  describe('#getAgent(names)', function () {
    it('should Promise an agent', function (done) {
		const name = 'Test';
		Ceed(name).see('getName').then(function (n) {
			assert.equal(n, name);
			done();
		});
    });
    it('should await an agent', async function () {
		const name = 'Test2';
		let front = Ceed(name);
		let n = await front.see('getName');
		assert.equal(n, name);
		
    });
  });
  describe('#getInstance(names)', function () {
    it('should Promise the agent Ceed', function (done) {
		const name = 'Ceed';
		const front = Ceed();
		front.see('getName').then(function (n) {
			assert.equal(n, name);
			done();
		});
		front.see('set', ['a', 12]);
    });
  });
});
describe('Ceed', function () {
  describe('#getInstance(names) - Singleton', function () {
    it('should Promise the same agent Ceed', function (done) {
		const name = 'Ceed';
		Ceed().see('get', 'a').then(function (n) {
			assert.equal(n, 12);
			done();
		});
    });
  });
});

describe('Ceed behaviors', function () {
	context('*getName', async function () {
		let agent = Ceed('Joe');
		context('when callback is not null', function () {
			it('should callback the name', function (done) {
				agent.see('getName', 0, (name) => {
					assert.equal(name, 'Joe');
					done();
				});
			});
		});
		describe('when using then', function () {
			it('should resolve the name', function () {
				agent.see('getName', 0).then((name) => {
					assert.equal(name, 'Joe');
				});
			});
		});
		describe('when using await', function () {
			it('should return the name', async function () {
				let name = await agent.see('getName', 0);
				assert.equal(name, 'Joe');
			});
		});
		describe('when callback is null', function () {
			it('should return a Promise', function () {
				let promise = agent.see('getName', 0)
				assert(promise instanceof Promise);
			});
		});
	});
	context('when dontKnow', async function () {
		function Bye() {
			this.act = function (args, resolve, reject) {
				resolve(args + ' Bye!');
			};
		}
		function Hello() {
			this.act = function (args, resolve, reject) {
				this.agent.see('bye', 'Hello, ' + args + '!', resolve, reject);
			};
		}
		function HelloTimeout() {
			this.act = function (args, resolve, reject) {
				setTimeout(() => {
					this.agent.see('bye', 'Hello, ' + args + '!', resolve, reject);
				}, 300);
			};
		}
		
		let writer = Ceed('Writer');
		
		writer.see('write', ['Naive.hello', new Symbol(0, 'js', 'new (' + Hello.toString() + ')();')]);
		writer.see('write', ['Naive.bye', new Symbol(0, 'js', 'new (' + Bye.toString() + ')();')]);
		writer.see('write', ['Naive.timeout', new Symbol(0, 'js', 'new (' + HelloTimeout.toString() + ')();')]);
			
		/*agent.see('getLibraries').then(l => {
			console.log(l[0].toString());
		});*/
		// TODO testar pedir várias vezes a mesma ação, enquanto ainda tá estudando
		describe('*study (read key from brain)', function () {
			it('should work with Promise', function (done) {
				Ceed('Joe').see('hello', 'world').then(r => {
					assert.equal(r, 'Hello, world! Bye!');
					done();
				});
			});
			it('should work with await', async function () {
				let agent = Ceed('Moe');
				let r = await agent.see('hello', 'world');
				assert.equal(r, 'Hello, world! Bye!');
			});
			it('should work with callback', function (done) {
				Ceed('Noe').see('hello', 'world', r => {
					assert.equal(r, 'Hello, world! Bye!');
					done();
				});
			});
			it('should work with timeout', function (done) {
				Ceed('Poe').see('timeout', 'world').then(r => {
					assert.equal(r, 'Hello, world! Bye!');
					done();
				});
			});
		});
		describe('*ask', function() {
			it('should ask the meaning of the key', async function () {
				function Ask(r) {
					this.act = async function (args, resolve, reject) {
						r.key = args;
						resolve();
					};
				}
				let r = {};
				let agent = Ceed('Noe');
				agent.see('set', ['ask', new Ask(r)]);
				
				await agent.see('hello2', 'world');
				assert.equal(r.key, 'hello2');
			});
		});
	});
});
