new (function upload() {
    /**
     * file: express-fileupload
     */
	this.act = function (file, resolve, reject) {
	    if (!file) {
	        resolve();
	    }
	    else {
    		file.mv('./public/uploads/' + file.name, function (err) {
    		    if (err) {
    		        reject(err);
    		    }
    		    resolve(file.name);
    		});
	    }
	};
})();