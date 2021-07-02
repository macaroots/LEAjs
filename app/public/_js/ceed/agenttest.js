/** 
 * LEA - Live Environment for Agents
 * by Renato Lenz Costalima
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
function AgentTest(debug) {
	this.debug = (debug == true);
	this.ds = '';
	this.tests = 0;
	this.totalTests = 0;
	this.points = 0;
	this.errors = [];
	this.train_agent = function(agent) {
		function S() {
			this.act = function(numbers, callback) {
				var s = 0;
				for (var i in numbers) {
					n = numbers[i];
					s += n;
				}
				callback(s);
			};
		};
		function M() {
			this.act = function(numbers, callback) {
				var s = 1;
				for (var i in numbers) {
					n = numbers[i];
					s *= n;
				}
				callback(s);
			};
		};
		agent.see('set', ['sum', new S()]);
		agent.see('set', ['mult', new M()]);
	};
	this.test_math = function(agent, train_agent) {
		var este = this;
		este.totalTests = 3;
		var a = 1;
		var b = 2;
		agent.see('sum', [a, b], function (s) {
			este.assertEquals(s, null);
		});
		agent.see('mult', [a, b], function (s) {
			este.assertEquals(s, null);
		});
		if (train_agent) {
			this.train_agent(agent);
		}
		for (var i = 1; i < 3; i++) {
			alert(train_agent);
			var numbers = [];
			var total = 0;
			var mult = 1;
			var tam = i;
			for (var j = 1; j < tam; j++) {
				n = j;
				total += n;
				mult *= n;
				numbers.push(n);
			}
			s = agent.see('sum', numbers, function (s) {
				este.assertEquals(s, total);
			});
			m = agent.see('mult', numbers, function (s) {
				este.assertEquals(s, mult);
			});
		}
		
		this.showResult();
	};
	this.showResult = function() {
		if (this.tests >= this.totalTests) {
			alert(this.points + "/" + this.tests);
			alert("Errors: \n" + this.errors.join('\n'));
		}
		else {
			setTimeout(this.showResult, 3000);
		}
	};
	this.assertEquals = function(a, b) {
		if (a == b) {
			this.points++;
		}
		else {
			this.errors.push(a + ' != ' + b);
		}
		this.tests++;
	};
	this.assertIn = function(a, b) {
		if (b.indexOf(a) != -1) {
			this.points++;
		}
		else {
			this.errors.push(a + ' not in ' + b);
		}
		this.tests++;
	};
}
