/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
function BrainTest(debug) {
	this.debug = (debug == true);
	this.ds = '';
	this.tests = 0;
	this.points = 0;
	this.errors = [];
	this.test_set_get_string = function(brain) {
		var keys = [];
		var values = {};
		for (var i = 0; i < 10; i++) {
			var key = 'x' + (i % 3) + 1;
			var value = (i % 5);
			if (!(key in values)) {		
				keys.push(key);
				values[key] = [];
			}
			values[key].push(value);
			brain.set(new Symbol(0, key, value));
		}
		for (var i in keys) {
			var key = keys[i];
			var symbols = brain.get(new Symbol(0, key));
			if (this.debug) {
				this.ds += '\n' + 'key:', key;
				this.ds += '\n' + 'values:', values[key];
				this.ds += '\n' + 'symbols:', symbols;
				this.ds += '\n' + '\n';
			}
			this.assertEqual(values[key].length, symbols.length);
			for (var j in symbols) {
				s = symbols[j];
				this.assertIn(s.info, values[key]);
			}
		}
		
		this.showResult();
		if (this.debug) {
			this.ds += '\n' + values;
			this.ds += '\n' + brain;
			alert(this.ds);
		}
	};
	this.showResult = function() {
		alert(this.points + "/" + this.tests);
		alert("Errors: \n" + this.errors.join('\n'));
	};
	this.assertEqual = function(a, b) {
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
	this.test_tie_reason = function(brain) {
		var iss = new Symbol(0, 'relation', 'is');
		brain.set(iss);
		var keys = [];
		var values = {};
		for (var i = 0; i < 10; i++) {
			var key = 'x' + (i % 3) + 1;
			var value = (i % 5);
			if (!(key in values)) {		
				keys.push(key);
				values[key] = [];
			}
			values[key].push(value);
			brain.tie(new Knot(new Symbol(0, 'key', key), iss, new Symbol(0, 'value', value)));
		}
		
		for (var i in keys) {
			var key = keys[i];
			var knotsGot = brain.reason(new Knot(new Symbol(0, 'key', key), iss));
			for (var j in knotsGot) {
				knot = knotsGot[j];
				this.assertIn(knot.b.info, values[key]);
				this.assertEqual(knotsGot.length, values[key].length);
			}
		}
		this.showResult();
		if (this.debug) {
			this.ds += '\n' + brain;
			alert(this.ds);
		}
	};
}
