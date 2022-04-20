new (function getRouter() {
	this.act = async function (args, resolve, reject) {
        const agent = this.agent;
        let express = (await import('express')).default;
        
        let router = express.Router();
        router.all([
            '/',
            '/:agent',
            '/:agent/:action',
            '/:agent/:action/*'
        ], (req, res) => {
            agent.see('http', [req, res]);
        });
        
		resolve(router);
	};
})();