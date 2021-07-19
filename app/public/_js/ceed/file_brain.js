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
    };
    this.get = function(s) { 
		return new Promise((resolve, reject) => {
            resolve();
        });
    };*/
    function getFolderName(l) {
        return /**/(l?.a?.type ?? '') + '-' +/**/ (l?.a?.info ?? '');
    }
    function getFolderPath(l) {
        return path.join(rootPath, getFolderName(l));
    }
    function getFileName(l) {
        return /**/(l?.r?.type ?? '') + '-' +/**/ (l?.r?.info ?? '');
    }
    function getData(l) {
        return l?.b?.info ?? '';
    }
    function getType(l) {
        return l?.b?.type ?? '';
    }
    function getFilePath(l) {
        let filename = getFileName(l);
        let data = getData(l);
        let type = getType(l);
        return path.join(rootPath, getFolderName(l), filename + '.' + type);
    }
    this.tie = function(l) {
		return new Promise((resolve, reject) => {
            //console.log('FILE_BRAIN.tie', l);
            let version = 0;
            let folderPath = path.join(rootPath, getFolderName(l));
            let filename = getFileName(l);
            let data = getData(l);
            let type = getType(l);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath)
            }
            let filePath;
            do {
                version++;
                filePath = path.join(folderPath, filename + '-' + version + '.' + type);
            } while (fs.existsSync(filePath));
            if (version > 1) {
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
            else {
                fs.writeFile(filePath, data, (err) => {
                    if (err) throw reject(err);
                    //console.log('The file has been saved!', l, filePath);
                    resolve(l);
                });
            }
            
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
        return [value.substring(0, index), value.substring(index + 1)];
    }
    this.reason = function(l) {
		return new Promise((resolve, reject) => {
            //console.log('REASON', l);
            let links = [];
            
            let folderName = getFolderName(l);
            let filename = getFileName(l);
            let extention = getType(l);
            let data = getData(l);
            
            let books = fs.readdirSync(rootPath);
            //console.log('BOOKS', books);
            books = books.filter(name => name.indexOf(folderName)>=0);
            //console.log('BOOKS FILTERED', books);
            
            for (let book of books) {
                let folderPath = path.join(rootPath, book);
                let keys = fs.readdirSync(folderPath);
                //console.log('KEYS', keys);
                keys = keys.filter(name => name.indexOf(filename)>=0);
                //console.log('KEYS FILTERED', keys);
                keys = keys.filter(name => name.indexOf('.' + extention)>=0);
                //console.log('B TYPES FILTERED', keys);
                
                let a = new Symbol();
                [a.type, a.info] = splitAt(book, '-');
                for (let key of keys) {
                    let r = new Symbol();
                    let b = new Symbol();
                    let filename;
                    [filename, b.type] = splitAt(key, '.', false);
                    [filename, b.id] = splitAt(filename, '-', false);
                    [r.type, r.info] = splitAt(filename, '-');
                    let filePath = path.join(folderPath, key);
                    b.info = fs.readFileSync(filePath, 'utf8');
                    
                    if (b.info.indexOf(data)>=0) {
                        let link = new Link(a, r, b);
                        links.push(link);
                    }
                }
                
            }
            
            resolve(links);
        });
    };
}
