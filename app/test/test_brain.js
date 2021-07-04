/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
import {Symbol, Link} from './../public/_js/ceed/brain.js';
import {JSBrain} from './../public/_js/ceed/jsbrain.js';
import mysql from 'mysql';
import {MySQLBrain} from './../public/_js/ceed/mysql_brain.js';
import {AjaxBrain} from './../public/_js/ceed/ajaxbrain.js';
//import {Ceed, AskAgent} from './../public/_js/ceed/ceed.js';
import {AgentBrain} from './../public/_js/ceed/agent_brain.js';
import {DummyBrain} from './dummy_brain.js';
import assert from 'assert';

describe('Brain', async function () {
	//const brain = new AjaxBrain();
    /**/
    const pool = mysql.createPool({
        database: 'test',
        host: 'localhost',
        port: 3307,
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'admin'
        //debug: true
    });
	const brain = new MySQLBrain(pool);
    after(async function () {
        await brain.clear();
        pool.end(function (err) {
            if (err) throw err;

            console.log('Pool ended');
        });
    });
    /*/
	const brain = new JSBrain();
    /**/
    
	//const brain = new DummyBrain();
	/*/
	lea.see('live').then(function () {
		lea.see('listen', {port: 3000});
	});

	let agent = Ceed.getAgent('Brain');
	//agent.see('set', ['ask', new AskAgent('LEA')]);
	agent.see('setLibrary', new MySQLBrain());
	const brain = new AgentBrain(agent);
	/**/
	describe('#set', function () {
		function assertSymbol(s, s2) {
			assert.notEqual(s.id, 0);
			assert.notEqual(s2.id, 0);
			assert.equal(s, s2);		
		}
		context('if callback is null', function () {
			it('should return the Symbol with an id', async function () {
				let s = new Symbol(0, 'oi', 'mundo');
				let s2 = await brain.set(s).catch(e => { console.error('ERROR Test-tie-reason', e); });
				assertSymbol(s, s2);
			});
		});
		context('if callback is null - Promise', function () {
			it('should promise the Symbol with an id', function (done) {
				let s = new Symbol(0, 'oi', 'mundo');
				brain.set(s).then(function (s2) {
					assertSymbol(s, s2);
					done();
				}).catch(e => { console.error('ERROR Test-tie-reason', e); });
			});
		});
	});
	describe('#tie-reason', function () {
		for (let i = 0; i < 3; i++) {
			let a = new Symbol(0, 't' + (i%2), 'i1');
			let r = new Symbol(0, 't' + i, 'i' + (i%2));
			let b = new Symbol(0, 't' + (2-i), 'i' + i);
			let link = new Link(a, r, b);
			brain.tie(link).catch(e => { console.error('ERROR Test-tie-reason', e); });
		}
		function assertSearchA(links) {			
			assert.notEqual(links.length, 0);
			try {
				for (let link of links) {
					assert.equal(link.a.type, 't0');		
				}
			}
			catch (e) {
				assert.fail(e);
			}
		}
		function assertSearchAB(links) {	
			assert.notEqual(links.length, 0);
			for (let link of links) {
				assert.equal(link.a.type, 't0');	
				assert.equal(link.b.info, 'i0');		
			}
		}
		function assertSearchR(links) {		
			assert.notEqual(links.length, 0);
			for (let link of links) {
				assert.equal(link.r.info, 'i0');
			}
		}
		function assertSearchRR(links) {
			assert.notEqual(links.length, 0);
			for (let link of links) {
				assert.equal(link.r.type, 't0');
				assert.equal(link.r.info, 'i0');
			}
		}
		context('await', function () {
			it('should search for a.type', async function () {
				let links = await brain.reason(new Link(new Symbol(0, 't0', null), null, null)).catch(e => { console.error('ERROR Test-tie-reason', e); });
				assertSearchA(links);
			});
			it('should search for a.type and b.info', async function () {
				let links = await brain.reason(new Link(new Symbol(0, 't0', null), null, new Symbol(0, null, 'i0'))).catch(e => { console.error('ERROR Test-tie-reason', e); });
				assertSearchAB(links);
			});
			it('should search for r.info', async function () {
				let links = await brain.reason(new Link(null, new Symbol(0, null, 'i0'), null, null)).catch(e => { console.error('ERROR Test-tie-reason', e); });
				assertSearchR(links);
			});
			it('should search for r.type and r.info', async function () {
				let links = await brain.reason(new Link(null, new Symbol(0, 't0', 'i0'), null, null)).catch(e => { console.error('ERROR Test-tie-reason', e); });
				assertSearchRR(links);
                
//console.log(brain);
			});
		});
		/**/
		context('then', function () {
			it('should search for a.type', function (done) {
				brain.reason(new Link(new Symbol(0, 't0', null), null, null)).then(function(links) {
					assertSearchA(links);
					done();
				}).catch(e => { console.error('ERROR Test-tie-reason', e); });
			});
			it('should search for a.type and b.info', function (done) {
				brain.reason(new Link(new Symbol(0, 't0', null), null, new Symbol(0, null, 'i0'))).then(function(links) {
					assertSearchAB(links);
					done();
				}).catch(console.error);
			});
			it('should search for r.info', function (done) {
				brain.reason(new Link(null, new Symbol(0, null, 'i0'), null, null)).then(function(links) {
					assertSearchR(links);
					done();
				}).catch(e => { console.error('ERROR Test-tie-reason', e); });
			});
			it('should search for r.type and r.info', function (done) {
				brain.reason(new Link(null, new Symbol(0, 't0', 'i0'), null, null)).then(function(links) {
					assertSearchRR(links);
					done();
				}).catch(e => { console.error('ERROR Test-tie-reason', e); });
			});
		});
		/**/
	});
});
