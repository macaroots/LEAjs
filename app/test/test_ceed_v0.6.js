/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
import {Ceed, InitAgentSameLibrary} from './../public/_js/ceed/ceed.js';
import {Symbol} from './../public/_js/ceed/brain.js';
import assert from 'assert';


function AskFor() {
	this.act = async function (args, resolve, reject) {
		let name = await this.agent.see('getFullName');
		console.log(name + ' - Asking: ' + args);
		resolve();
	};
}
let ceed = await Ceed();
ceed.skills['ask'] = new AskFor();

describe('Ceed', function () {
  describe('#getAgent(names)', function () {
    it('should Promise an agent', function (done) {
		const name = 'PromiseAgent';
		Ceed(name).then(front => {
			front.see('getName').then(function (n) {
				assert.equal(n, name);
				done();
			});
		});
    });
    it('should await an agent', function (done) { (async function () {
		const name = 'AwaitAgent';
		let front = await Ceed(name);
		let n = await front.see('getName');
		assert.equal(n, name);
        done();
    })()});
  });
  describe('#getInstance(names)', function () {
    it('should Promise the agent Ceed', function (done) {
		const name = 'Ceed';
		Ceed().then(front => {
			front.see('getName').then(function (n) {
				assert.equal(n, name);
				done();
			});
			front.see('set', ['a', 12]);
		});
    });
  });
  describe('#getInstance(names) - Singleton', function () {
    it('should Promise the same agent Ceed', function (done) {
		const name = 'Ceed';
		Ceed().then(front => {
			front.see('get', 'a').then(function (n) {
				assert.equal(n, 12);
				done();
			});
		});
    });
  });
});

describe('Ceed behaviors', function () {
	describe('*getName', function () {
        let agentName = 'GetName';
		let agent;
        before(async function () {
            agent = await Ceed(agentName);
        });
/** @deprecated */
		describe('when using callback', function () {
			it('should callback the name', function (done) {
				agent.see('getName', 0, (name) => {
					assert.equal(name, agentName);
					done();
				});
			});
		});
        /**/
		describe('when using then', function () {
			it('should resolve the name', function () {
				agent.see('getName', 0).then((name) => {
					assert.equal(name, agentName);
				});
			});
		});
		describe('when using await', function () {
			it('should return the name', async function () {
				let name = await agent.see('getName', 0);
				assert.equal(name, agentName);
			});
		});
		describe('when callback is null', function () {
			it('should return a Promise', function () {
				let promise = agent.see('getName', 0)
				assert(promise instanceof Promise);
			});
		});
	});
	context('if dontKnow', function () {
		function Bye() {
			this.act = function (args, resolve, reject) {
				resolve(args + ' Bye!');
			};
		}
		function Hello() {
			this.act = function (args, resolve, reject) {
				this.agent.see('bye', 'Hello, ' + args + '!').then(resolve).catch(reject);
			};
		}
		function HelloTimeout() {
			this.act = function (args, resolve, reject) {
				setTimeout(() => {
					this.agent.see('bye', 'Hello, ' + args + '!').then(resolve).catch(reject);
				}, 300);
			};
		}
		before(async function() {
            let writer = await Ceed('Writer');
            
            await writer.see('write', ['Naive.hello', new Symbol(0, 'js', 'new (' + Hello.toString() + ')();')]);
            await writer.see('write', ['Naive.bye', new Symbol(0, 'js', 'new (' + Bye.toString() + ')();')]);
            await writer.see('write', ['Naive.timeout', new Symbol(0, 'js', 'new (' + HelloTimeout.toString() + ')();')]);
        });
			
/*agent.see('getLibraries').then(l => {
    console.log(l[0].toString());
});*/
		// TODO testar pedir várias vezes a mesma ação, enquanto ainda tá estudando
		describe('*study (read key from brain)', function () {
			it('should work with Promise', function (done) {
				Ceed('PromiseStudy').then(agent => {
                    let promises = [];
                    for (let i = 0; i < 10; i++) {
                        promises.push(agent.see('hello', 'world').then(r => {
                            assert.equal(r, 'Hello, world! Bye!');
                        }));
                    }
                    Promise.all(promises).then(() => {
                        done()
                    });
				});
			});
			it('should work with await', async function () {
				let agent = await Ceed('AwaitStudy');
				let r = await agent.see('hello', 'world');
				assert.equal(r, 'Hello, world! Bye!');
			});
/** @deprecated */
			it('should work with callback', function (done) {
				Ceed('CallbackStudy').then(agent => {
					agent.see('hello', 'world', r => {
						assert.equal(r, 'Hello, world! Bye!');
						done();
					});
				});
			});
            /**/
			it('should work if action delays', function (done) {
				Ceed('DelayStudy').then(agent => {
					agent.see('timeout', 'world').then(r => {
						assert.equal(r, 'Hello, world! Bye!');
						done();
					});
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
				let agent = await Ceed('Ask');
				agent.see('set', ['ask', new Ask(r)]);
				
				await agent.see('hello2', 'world');
				assert.equal(r.key, 'hello2');
			});
            /*/
			it('Ceed should notify questions', async function (done) {
				
				let r = {};
				let agent = await Ceed('Roe');
                agent.see('set', ['onQuestion', (function OnQuestion(r) {
					this.act = function ([agent, key], resolve, reject) {
                        assert.equal(key, r);
                        done();
						resolve();
					};
				})('b')]);
                (await Ceed()).see('addListener', ['question', agent]);
				agent.see('ask', 'a');
                
			});
            /**/
		});
		describe('*study from multiple libraries', function() {
            it('should');
        });
		describe('*extend super behaviors', function() {
            it('should');
            /*
            a.see('set', ['print', (() => {
                a.see('super.print')
                ...
            })()]);
             * */
        });
	});
    
});
