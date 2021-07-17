
import {Symbol, Link} from './../public/_js/ceed/brain.js';
import {shouldBehaveLikeABrain} from './test_brain.js';
import {MySQLBrain} from './../public/_js/ceed/mysql_brain.js';
import mysql from 'mysql';

describe('MySQLBrain', function() {
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
    shouldBehaveLikeABrain(() => brain);
});
