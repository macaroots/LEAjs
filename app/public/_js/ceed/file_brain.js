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


export function FileBrain(path) {
    this.set = function(s) {
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
    };
    this.tie = function(l) {
		return new Promise((resolve, reject) => {
            resolve();
        });
    };
    this.untie = function(l) {
		return new Promise((resolve, reject) => {
            resolve();
        });
    };
    this.reason = function(l) {
		return new Promise((resolve, reject) => {
            resolve();
        });
    };
}
