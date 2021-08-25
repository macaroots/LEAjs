new (function signIn() {
	this.act = function (googleUser, resolve, reject) {
	    var id_token = googleUser.getAuthResponse().id_token;
	    document.getElementById('id').value = id_token;
	    if (window.clicked) {
            document.getElementById('google').submit();
        }
		resolve();
	};
})();