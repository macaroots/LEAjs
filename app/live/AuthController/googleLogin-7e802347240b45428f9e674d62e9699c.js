new (function googleLogin() {
	this.act = async function (args, resolve, reject) {
		let req = args[0];
		let res = args[1];
		let agent = this.agent;
		const token = req.body.id;
console.log('TOKEN', token);
		
		const CLIENT_ID = await agent.see('CLIENT_ID');
		
		const {OAuth2Client} = (await import('google-auth-library')).default;
        const client = new OAuth2Client(CLIENT_ID);
        async function verify() {
            const ticket = await client.verifyIdToken({
              idToken: token,
              audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
              // Or, if multiple clients access the backend:
              //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const user = payload['email'].split('@')[0];
          
console.log('GOOGLE_LOGIN', user);
		    req.session.user = user;
		    res.json({ok: true});
        }
        verify().catch(e => {
		    req.session.destroy();
            res.json({ok: false, error: 'Invalid ID token.', e: e});
        });
		
		resolve();
	};
})();