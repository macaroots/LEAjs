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
        
        let config = function (url='https://cdnjs.cloudflare.com/ajax/libs/ace/1.8.1/') { 
			ace.config.set('modePath', url);
			ace.config.set('workerPath', url);
			ace.config.set('themePath', url);
			
			
			for (let div of document.querySelectorAll('.codigo')) {
			    console.log(div);
                div.editor = ace.edit(div, {
                    mode: "ace/mode/javascript"
                });
			}
			
			resolve(true);
		};
	    let loadAce = new Promise((resolve, reject) => {
			$.ajax({
				type: "GET",
				url: 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.8.1/ace.min.js',
				dataType: "script",
				cache: true,
				success: config,
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    console.log("Couldn't load ace. Trying another source..."); 
                    $.ajax({
        				type: "GET",
        				url: '/_js/lib/ace.min.js',
        				dataType: "script",
        				cache: true,
        				success: () => config('/_js/lib/ace/')
                    });
                }     
			});
	    });
		resolve();
	}
}();
