import {Symbol, Link} from './../public/_js/ceed/brain.js';
import {JSBrain} from './../public/_js/ceed/jsbrain.js';
import {MySQLBrain} from './../public/_js/ceed/mysql_brain.js';
import {AjaxBrain} from './../public/_js/ceed/ajaxbrain.js';
import {Ceed} from './../public/_js/ceed/ceed.js';
import {AgentBrain} from './../public/_js/ceed/agent_brain.js';
import {DummyBrain} from './dummy_brain.js';
import assert from 'assert';


import {AskAgent} from './../public/_js/agents/lea_client.js';

describe('Brain', async function () {
	//const brain = new AjaxBrain();
	//const brain = new MySQLBrain({database: 'test_mind'});
	const brain = new JSBrain();
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
				let s2 = brain.set(s);
				assertSymbol(s, s2);
			});
		});
		context('if callback is not null', function () {
			it('should callback the Symbol with an id', function (done) {
				let s = new Symbol(0, 'oi', 'mundo');
				brain.set(s, function (s2) {
					assertSymbol(s, s2);
					done();
				});
			});
		});
	});
	describe('#tie/reason', function () {
		for (let i = 0; i < 3; i++) {
			let a = new Symbol(0, 't' + (i%2), 'i1');
			let r = new Symbol(0, 't' + i, 'i' + (i%2));
			let b = new Symbol(0, 't' + (2-i), 'i' + i);
			let link = new Link(a, r, b);
			brain.tie(link);
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
		context('if callback is null', function () {
			it('should search for a.type', async function () {
				let links = await brain.reason(new Link(new Symbol(0, 't0', null), null, null));
				assertSearchA(links);
			});
			it('should search for a.type and b.info', async function () {
				let links = await brain.reason(new Link(new Symbol(0, 't0', null), null, new Symbol(0, null, 'i0')));
				assertSearchAB(links);
			});
			it('should search for r.info', async function () {
				let links = await brain.reason(new Link(null, new Symbol(0, null, 'i0'), null, null));
				assertSearchR(links);
			});
			it('should search for r.type and r.info', async function () {
				let links = await brain.reason(new Link(null, new Symbol(0, 't0', 'i0'), null, null));
				assertSearchRR(links);
			});
		});
		/**/
		context('if callback is not null', function () {
			it('should search for a.type', function (done) {
				brain.reason(new Link(new Symbol(0, 't0', null), null, null), function(links) {
					assertSearchA(links);
					done();
				});
			});
			it('should search for a.type and b.info', function (done) {
				brain.reason(new Link(new Symbol(0, 't0', null), null, new Symbol(0, null, 'i0')), function(links) {
					assertSearchAB(links);
					done();
				});
			});
			it('should search for r.info', function (done) {
				brain.reason(new Link(null, new Symbol(0, null, 'i0'), null, null), function(links) {
					assertSearchR(links);
					done();
				});
			});
			it('should search for r.type and r.info', function (done) {
				brain.reason(new Link(null, new Symbol(0, 't0', 'i0'), null, null), function(links) {
					assertSearchRR(links);
					done();
				});
			});
		});
		/**/
	});
});