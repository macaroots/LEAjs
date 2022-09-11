new class OnLoad {
	async act(args, resolve, reject) {
	    let page = document.querySelector('.Page');
        page.onscroll = (e) => {
            let logo = document.querySelector(".logo");
            if (page.scrollTop > window.innerHeight) {
                logo.classList.add('second-page');
            } else {
                logo.classList.remove('second-page');
            }
        };
		resolve();
	}
}();
