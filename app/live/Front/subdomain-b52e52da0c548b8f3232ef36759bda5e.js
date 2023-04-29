new class subdomain {
	async act(args, resolve, reject) {
	    let agent = this.agent;
        let express = (await import('express')).default;
        let vhost = (await import('vhost')).default;
        let app = await agent.see('get', 'expressApp');
        
        var routerUsers = await agent.see('getRouter');
        var routerGessica = express.static('public_gessica');
         
        app.use(vhost('gessicapsicologa.com.br', routerGessica));
        app.use(vhost('www.gessicapsicologa.com.br', routerGessica));
        app.use(vhost('www.tiia.com.br', routerUsers));
        app.use(vhost('*.tiia.com.br', routerUsers));
        app.use(vhost('*.localhost', routerUsers));
        console.log('Setting subdomains');
        
		resolve();
	}
}();
