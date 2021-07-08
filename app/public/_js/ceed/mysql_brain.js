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

export function MySQLBrain(pool) {
	this.debug = false;
    const self = this;
    this.connect = function () {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, con) => {
				if (err) {
					return reject(err);
				}
				resolve(con);
			});
		});
	}
	
	this.createTables = function() {
		return new Promise((resolve, reject) => {
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
			let connection = self.connect();
			connection.then(c => {c.query(sqlSymbols, function (error, results, fields) {
				if (error)
					return reject(error);
				c.query(sqlLinks, function (error, results, fields) {
					if (error)
						return reject(error);
					c.release();
					resolve(true);
				});
			})}).catch(reject);
		});
	}
	this.clear = function() {
		return new Promise((resolve, reject) => {
			let sqlSymbols = "TRUNCATE symbols";

			let sqlLinks = "TRUNCATE links";
			let connection = self.connect();
			connection.then(c => {c.query(sqlLinks, function (error, results, fields) {
				if (error)
					return reject(error);
				c.query(sqlSymbols, function (error, results, fields) {
					if (error)
						return reject(error);
					c.release();
					resolve(true);
				});
			})}).catch(reject);
		});
	}
	
	
    this.set = function(s) {
        return new Promise((resolve, reject) => {
            let connection = self.connect();
            
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
                    if (error) return reject(error);
                    s.id = results.insertId;
                    c.commit();
                    c.release();
                    
                    resolve(s);
                })}).catch(console.error);
            }
            else {
console.trace('MySQLBrain.set()', s);
                /*/
                let sql = "update symbols set ? where id = ?";
                if (self.debug) {
                    console.log(sql);
                }
                connection.then(c => {c.query(sql, [json, s.id], function (error, results, fields) {
                    if (error) return reject(error);
                    c.commit();
                    c.release();
                            
                    resolve(s);
                })}).catch(console.error);
                /**/
            }
        });
    };
    this.forget = function(s) {
        return new Promise(async (resolve, reject) => {
            let sql = "DELETE FROM symbols WHERE id=?";
            let connection = self.connect();
            connection.then(c => {c.query(sql, [s.id], function (error, results, fields) {
                if (error) return reject(error);
                c.commit();
                c.release();
                            
                resolve();
            })}).catch(console.error);
        });
    };
    this.get = function(s) {
        return new Promise((resolve, reject) => {
            let symbols = [];

            let connection = self.connect();
            
            let args = self.__symbolToSql(s);
            let sql = args[0];
            let values = args[1];
            
            connection.then(c => {c.query(sql, values, function (error, results, fields) {
                if (error) return reject(error);
                for (let rs of results) {
                    let symbol = self.__getSymbolFromRS(rs);
                    symbols.push(symbol);
                }
                c.release();
                
                resolve(symbols);
            })}).catch(console.error);
        });
    };
    this.tie = function(l) {
        return new Promise(async (resolve, reject) => {
            let symbolsA = await self.get(l.a);
            if (symbolsA.length != 0) {
                l.a = symbolsA[0];
            }
            else {
                await self.set(l.a);
            }
            let symbolsR = await self.get(l.r);
            if (symbolsR.length != 0) {
                l.r = symbolsR[0];
            }
            else {
                await self.set(l.r);
            }
            let symbolsB = await self.get(l.b);
            if (symbolsB.length != 0) {
                l.b = symbolsB[0];
            }
            else {
                await self.set(l.b);
            }         
            
            let sql = "insert into links (a, r, b) values (?, ?, ?)";
            let connection = self.connect();
            connection.then(c => {c.query(sql, [l.a.id, l.r.id, l.b.id], function (error, results, fields) {
                if (error) return reject(error);
                c.commit();
                c.release();

console.debug('MySQLBrain.tie()', l);                            
                resolve(l);
            })}).catch(console.error);
            
        });
    };
    this.untie = function(l) {
        return new Promise(async (resolve, reject) => {
            let sql = "DELETE FROM links WHERE id=? AND a=? AND r=? AND b=?";
            let connection = self.connect();
            connection.then(c => {c.query(sql, [l.id, l.a.id, l.r.id, l.b.id], function (error, results, fields) {
                if (error) return reject(error);
                c.commit();
                c.release();
                            
                resolve();
            })}).catch(console.error); 
        });
    };
    this.reason = function(l) {
        return new Promise(async (resolve, reject) => {
            try {
                let links = [];

                let args = self.__linkToSql(l);
                let sql = args[0];
                let values = args[1];
                
                let connection = self.connect();
                connection.then(c => {c.query(sql, values, function (error, results, fields) {
                    try {
                        if (error) return reject(error);
                        for (let rs of results) {
                            let link = new Link();
                            link.a = self.__getSymbolFromRS(rs, "a");
                            link.r = self.__getSymbolFromRS(rs, "r");
                            link.b = self.__getSymbolFromRS(rs, "b");
                            links.push(link);
                        }
                    } finally {
                        c.release();
                    }
                    
                    resolve(links);
                })}).catch(console.error);
            } catch (e) {
                reject(e);
            }
        });
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
				let args = self.__symbolToReasonSql(l[p], p);
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
        for (let i in self.links) {
        	let link = self.links[i];
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
