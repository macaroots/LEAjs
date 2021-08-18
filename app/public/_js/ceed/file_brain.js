/** 
 * LEA - Live Environment for Agents
 * 
 * Copyright Renato Lenz Costalima
 * Released under the AGPL-3.0 License
 * https://github.com/macaroots/LEAjs/blob/main/LICENSE
 */
/**
 * FileBrain - A file system implementation of Brain
 * Created on 02/10/2020
 */
import {Symbol, Link} from './brain.js';
import fs from 'fs';
import path from 'path';

export function FileBrain(rootPath) {
    /*this.set = function(s) {
		return new Promise((resolve, reject) => {
            resolve();
        });
    };
    this.forget = function(s) {
		return new Promise((resolve, reject) => {
            resolve();
        });
    };*/
    const self = this;
    this.get = function(s) { 
		return new Promise(async (resolve, reject) => {
            let symbols = [];
            let links = await self.reason();
            for (let l of links) {
                if (symbolsEqual(l.a, s)) {
                    symbols.push(l.a);
                }
                if (symbolsEqual(l.r, s)) {
                    symbols.push(l.r);
                }
                if (symbolsEqual(l.b, s)) {
                    symbols.push(l.b);
                }
            }
            resolve(symbols);
        });
    };
    function symbolsEqual(a, search) {
        let equals = true;
        if (search) {/*
            if (search.id && search.id != a.id) {
                equals = false;
            }
            if (search.type && search.type != a.type) {
                equals = false;
            }*/
            if (search.info && search.info != a.info) {
                equals = false;
            }
            
        }
        return equals;
    }
    function symbol2Name(s, createId=false) {
//console.log('FILE symbol2Name', s);
        let name = '';
        if (!s) {
            return '';
        }
        else {/*
            if (s.type) {
                name += s.type + '-';
            }*/
            if (s.info) {
                name += s.info;
            }/*
            if (!s.id) {
                if (createId) {
                    s.id = MD5(name);
                }
                else {
                    s.id = '';
//console.log('FILE NAME, FALTA TYPE OU INFO');
                }
            }
            name = s.id + '-' + name;
//console.log('FILE NAME', name);*/
            return name;
        }
    }
    function getFolderName(l, createId) {
        return symbol2Name(l?.a, createId);
    }
    function getFolderPath(l) {
        return path.join(rootPath, getFolderName(l));
    }
    function getFileName(l, createId) {
        return symbol2Name(l?.r, createId);
    }
    function getData(l) {
        return l?.b?.info ?? '';
    }
    function getType(l) {
        return l?.b?.type ?? '';
    }
    this.tie = function(l) {
		return new Promise((resolve, reject) => {
            //console.log('FILE_BRAIN.tie', l);
            let version = 0;
            let folderPath = path.join(rootPath, getFolderName(l, true));
            let filename = getFileName(l, true);
            let data = getData(l);
            let type = getType(l);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true })
            }
            let filePath;
            //do {
                //version++;
            version = MD5(type + '-' + data);
                filePath = path.join(folderPath, filename + '-' + version + '.' + type);
            //} while (fs.existsSync(filePath));
            /*if (version > 1) {
                let lastVersion = path.join(folderPath, filename + '-' + (version-1) + '.' + type);
                if (data != fs.readFileSync(lastVersion, 'utf8')) {
                    fs.writeFile(filePath, data, (err) => {
                        if (err) throw reject(err);
                        //console.log('The file has been saved!', l, filePath);
                        resolve(l);
                    });
                }
                else {
                    //console.log('The file unchanged!', l, filePath);
                    resolve(l);
                }
            }
            else {*/
                fs.writeFile(filePath, data, (err) => {
                    if (err) throw reject(err);
                    //console.log('The file has been saved!', l, filePath);
                    resolve(l);
                });
            //}
            
        });
    };
    this.untie = function(l) {
		return new Promise((resolve, reject) => {
            resolve();
        });
    };
    function splitAt(value, separator, first=true) {
        let index = first ?
            value.indexOf(separator)
            : value.lastIndexOf(separator);
        if (index == -1) {
            index = value.length;
        }
        return [value.substring(0, index), value.substring(index + 1)];
    }
    this.reason = function(l) {
		return new Promise((resolve, reject) => {
//console.log('REASON', l);
            let links = [];
            
            let dirName = getFolderName(l);
            let filename = getFileName(l);
            if (filename[filename.length-1] != '-') {
                filename += '-';
            }
            let extention = getType(l);
            let data = getData(l);
            
            let books = fs.readdirSync(rootPath);
            //console.log('BOOKS', books);
            books = books.filter(name => name.indexOf(dirName)>=0);
            //console.log('BOOKS FILTERED', books);
            
            for (let book of books) {
                let dir = path.join(rootPath, book);
                let keys = fs.readdirSync(dir);
//console.log('KEYS', filename, keys);
                keys = keys.filter(name => name.indexOf(filename)>=0);
//console.log('KEYS FILTERED', keys);
                keys = keys.filter(name => name.indexOf('.' + extention)>=0);
                //console.log('B TYPES FILTERED', keys);
                
                // ordena por última modificação
                keys = keys
                    .map(fileName => ({
                        name: fileName,
                        time: fs.statSync(`${dir}/${fileName}`).mtime.getTime(),
                    }))
                    .sort((a, b) => b.time - a.time)
                    .map(file => file.name);
                
                let a = new Symbol(book);
//console.log('FILE REASONa', a);
                for (let key of keys) {
                    let b = new Symbol();
                    let filename;
                    [filename, b.type] = splitAt(key, '.', false);
                    [filename, b.id] = splitAt(filename, '-', false);
                    let r = new Symbol(filename);
                    let filePath = path.join(dir, key);
                    b.info = fs.readFileSync(filePath, 'utf8');

//console.log('FILE REASONr', r);                    
                    if (b.info.indexOf(data)>=0) {
                        let link = new Link(a, r, b);
                        links.push(link);
                    }
                }
                
            }
            
//console.log('FILE REASONl', links); 
            resolve(links);
        });
    };
}

/**
 * Nov 2 '15 at 20:15 - valdeci - Stackoverflow
 */
var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_};
