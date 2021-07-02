/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
export class Symbol {
	constructor(id, type, info/*, date*/) {
		if (id !== undefined && type === undefined && info === undefined/* && date == null*/) {
			info = id;
			type = typeof info;
			id = 0;
		}
		else if (id == null) {
			id = 0;
		}
		else if (typeof id == 'object') {
			info = id.info;
			type = id.type;
			id = id.id;
		}
		/*if (date == null) {
			date = new Date();
		}*/
		this.id = id;
		this.type = type;
		this.info = info;
		//this.date = date;
		this.toString = function() {
			if (!this) {
				return this;
			}
			return this.id + ': ' + this.type + ' | ' + this.info;
		};
	}
}
export class Link {
	constructor(a, r, b) {
		this.a = a;
		this.r = r;
		this.b = b;
		this.toString = function() {
			return this.a + ' (' + this.r + ') ' + this.b + '\n';
		};
	}
}
