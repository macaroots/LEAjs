/**
 * Formata parecido como o python {chave}
 * */
new class format {
	act(args, resolve, reject) {
	    let [str, replaces] = args;
        resolve(str.replace(/{\w+}/g, function (match, index) {
            let key = match.slice(1, -1);
            return typeof replaces[key] == 'undefined' ? match : replaces[key];
        }));
	}
}();
