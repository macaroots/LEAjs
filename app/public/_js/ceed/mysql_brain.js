/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
/**
 * MySQLBrain - A javascript implementation of MySQLBrain
 * Created on 02/10/2020
 */
import {Symbol, Link} from './brain.js';
import mysql from 'mysql';
/*/
// mysql mock
let mysql = {createConnection: (options) => {
	return {
		query: function (sql, values, callback) {
			console.log('QUERY', sql, values, callback);
		},
		end: function () {
			console.log('END');
		}
	};
}};
/**/

export function MySQLBrain(options) {
	this.debug = false;
	const pool = mysql.createPool(options);
    this.connect = function () {
		let p = new Promise((resolve, reject) => {
			pool.getConnection((err, con) => {
				if (err) {
					return reject(err);
				}
				resolve(con);
			});
		});

		return p;
	}
	
	this.createTables = function() {
		let p = new Promise((resolve, reject) => {
			let sqlSymbols = "CREATE TABLE IF NOT EXISTS `symbols` ("
				+ "`id` int(11) NOT NULL AUTO_INCREMENT,"
				+ "`type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,"
				+ "`info` mediumtext COLLATE utf8_unicode_ci,"
				+ "`data` timestamp NULL DEFAULT CURRENT_TIMESTAMP,"
				+ "PRIMARY KEY (`id`))";

			let sqlLinks = "CREATE TABLE IF NOT EXISTS `links` ("
				+ "`id` int(11) NOT NULL AUTO_INCREMENT,"
				+ "`a` int(11) DEFAULT NULL,"
				+ "`r` int(11) DEFAULT NULL,"
				+ "`b` int(11) DEFAULT NULL,"
				+ "`data` timestamp NULL DEFAULT CURRENT_TIMESTAMP,"
				+ "PRIMARY KEY (`id`),"
				+ "KEY `idx_nodes_a` (`a`),"
				+ "KEY `idx_nodes_r` (`r`),"
				+ "KEY `idx_nodes_b` (`b`))";
			let connection = this.connect();
			connection.then(c => {c.query(sqlSymbols, function (error, results, fields) {
				if (error)
					return reject(error);
				c.query(sqlLinks, function (error, results, fields) {
					if (error)
						return reject(error);
					resolve(true);
					c.release();
				});
			})}).catch(reject);
		});
		return p;
	}
	
    this.set = function(s, callback) {
		let connection = this.connect();
		
		let json = {};
		if (s.id != 0 && s.id != null) {
			json.id = s.id;
		}
		if (s.type != null) {
			json.type = s.type;
		}
		if (s.info != null) {
			json.info = s.info;
		}
	
		if (s.id == 0) {
			let sql = "insert into symbols set ?";
			
			connection.then(c => {c.query(sql, json, function (error, results, fields) {
				if (error) throw error;
				s.id = results.insertId;
				c.commit();
				c.release();
				
				if (callback != null) {
					return callback(s);
				}
			})});
		}
		else {
			let sql = "update symbols set ? where id = ?";
			if (this.debug) {
				console.log(sql);
			}
			connection.then(c => {c.query(sql, [json, s.id], function (error, results, fields) {
				if (error) throw error;
				c.commit();
				c.release();
						
				if (callback != null) {
					return callback(s);
				}
			})});
		}
		
		return s;
    };
    this.forget = function(s, callback) {
    	let esquecidos = this.get(s);
    	for (let e in esquecidos) {
    		//delete(this.symbols[esquecidos[e].id]);
    	}
		if (callback != null) {
			return callback(esquecidos);
		}
		else {
			return esquecidos;
		}
    };
    this.get = function(s, callback) {
		let symbols = [];
		let brain = this;

		let connection = this.connect();
		
		let args = this.__symbolToSql(s);
		let sql = args[0];
		let values = args[1];
		
		connection.then(c => {c.query(sql, values, function (error, results, fields) {
			if (error) throw error;
			for (let rs of results) {
				let symbol = brain.__getSymbolFromRS(rs);
				symbols.push(symbol);
			}
			c.release();
			
			if (callback != null) {
				return callback(symbols);
			}
		})});
		
		return symbols;
    };
    this.tie = function(l, callback) {
		let brain = this;
		let sent = false;
		function sendQuery() {
			if (sent || l.a.id == 0 || l.r.id == 0 || l.b.id == 0) {
				return;
			}
			sent = true;
			let sql = "insert into links (a, r, b) values (?, ?, ?)";
			let connection = brain.connect();
			connection.then(c => {c.query(sql, [l.a.id, l.r.id, l.b.id], function (error, results, fields) {
				if (error) throw error;
				c.commit();
				c.release();
							
				if (callback != null) {
					return callback(l);
				}

			})});
			//connection.commit();
			//connection.end();
		}
		
		if (l.a.id == 0) {
			this.set(l.a, sendQuery);
		}
		if (l.r.id == 0) {
			this.set(l.r, sendQuery);
		}
		if (l.b.id == 0) {
			this.set(l.b, sendQuery);
		}
		sendQuery();
		return l;
    };
    this.untie = function(n, callback) {
        let esquecidos = this.reason(n);
        for (let e in esquecidos) {
            //this.links.remove(e);
        }
		if (callback != null) {
			return callback(esquecidos);
		}
		else {
			return esquecidos;
		}
    };
    this.reason = function(l, callback) {
		let brain = this;
        let links = [];

		let args = this.__linkToSql(l);
		let sql = args[0];
		let values = args[1];
		
		let connection = this.connect();
		connection.then(c => {c.query(sql, values, function (error, results, fields) {
			if (error) throw error;
			for (let rs of results) {
				let link = new Link();
				link.a = brain.__getSymbolFromRS(rs, "a");
				link.r = brain.__getSymbolFromRS(rs, "r");
				link.b = brain.__getSymbolFromRS(rs, "b");
				links.push(link);
			}
			c.release();
			
			if (callback != null) {
				return callback(links);
			}
		})});
		//connection.end();
		return links;
    };
	this.__symbolToSql = function (s, select) {
		if (!select) {
			select = '*';
		}
		let sql = "select " + select + " from symbols where 1=1";
		let values = [];
		if (s != null) {
			if (s.id != 0 && s.id != null) {
				sql += " and id = ?";
				values.push(s.id);
			}
			if (s.type != null) {
				sql += " and type like ?";
				values.push(s.type);
			}
			if (s.info != null) {
				sql += " and info like ?";
				values.push(s.info);
			}
		}
		return [sql, values];
	};
	this.__linkToSql = function (l, select) {
		if (!select) {
			select = "a.id as a_id, a.type as a_type, a.info as a_info,"
				+ "r.id as r_id, r.type as r_type, r.info as r_info,"
				+ "b.id as b_id, b.type as b_type, b.info as b_info, l.*";
		}
		let sql = "select " + select + " from links l "
				+ "inner join symbols a on l.a = a.id "
				+ "inner join symbols b on l.b = b.id "
				+ "inner join symbols r on l.r = r.id where 1=1";
		let values = [];
		if (l != null) {
			for (let p of ['a', 'r', 'b']) {
				let args = this.__symbolToReasonSql(l[p], p);
				sql += args[0];
				values = values.concat(args[1]);
			}
		}
		return [sql, values];
	};
	this.__symbolToReasonSql = function (s, role) {
		let sql = "";
		let values = [];
		if (s != null) {
			if (s.id != 0 && s.id != null) {
				sql += " and " + role + ".id = ?";
				values.push(s.id);
			}
			if (s.type != null) {
				sql += " and " + role + ".type like ?";
				values.push(s.type);
			}
			if (s.info != null) {
				sql += " and " + role + ".info like ?";
				values.push(s.info);
			}
		}
		return [sql, values];
	};
	this.__getSymbolFromRS = function (rs, role) {
		if (!role) {
			role = '';
		}
		else {
			role += '_';
		}
		let symbol = new Symbol();
		symbol.id = rs[role + "id"];
		symbol.type = rs[role + "type"];
		symbol.info = rs[role + "info"];
		return symbol;
	};
}
MySQLBrain.prototype.toString = function dogToString() {
	let string = '';
        for (let i in this.links) {
        	let link = this.links[i];
		string += link;
	}
	return string;
}

/*
import {Ceed} from './ceed.js';
const agent = Ceed.getAgent('Brain');
const brain = new MySQLBrain({debug: ['ComQueryPacket', 'RowDataPacket']});

agent.see('setLibrary', brain);
console.log(agent.see('write', [
	'NaiveAgent.EmptyAction', 
	new Symbol(0, 'js', 'new (function EmptyAction() {\n\tthis.act = function (args, callback) {\n\t\t// your code here\n\t\tcallback(true); // return statement\n\t};\n})(3);')
]));
/*
brain.reason(null, function (links) {
	console.log(links);
});
let s = new Symbol(0, 'oi', 'mundo');
function x() {
	let s2 = brain.set(s);

	setTimeout(() => {
		console.log(1, s);
		console.log(1, s2);
	}, 100);
}
x();

brain.set(s, function (s2) {
	console.log(2, s);
	console.log(2, s2);
});*/
