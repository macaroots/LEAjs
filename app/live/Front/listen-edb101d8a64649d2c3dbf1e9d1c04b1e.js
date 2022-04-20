new (function Listen() {
    this.act = async function(options, callback) {
        let agent = this.agent;
        let express = (await import('express')).default;
        const app = express();

        // Escolhe HTTPS ou HTTP
        /**/
        let fs = await import('fs');
        let certFilename = process.env.CERT_FILENAME || 'server.cert';
        let keyFilename = process.env.KEY_FILENAME || 'server.key';
        let defaults = {
            hostname: process.env.HOST || '127.0.0.1',
            port: process.env.PORT || 3000,
            dir: process.env.PUBLIC_DIR || 'public',
            key: fs.readFileSync(keyFilename),
            cert: fs.readFileSync(certFilename),
            ca: [fs.readFileSync(certFilename)],
            requestCert: true,
            rejectUnauthorized: false
        };
        options = {...defaults, ...options};
        let http = await import('https');
        const server = http.createServer(options, app);
        /*/
        let defaults = {
            hostname: process.env.HOST || '127.0.0.1',
            port: process.env.PORT || 3000,
            dir: process.env.PUBLIC_DIR || 'public'
        };
        options = {...defaults, ...options};
        let http = await import('http');
        const server = http.createServer(app);
        /**/
        
        agent.see('set', ['expressApp', app]);
        agent.see('set', ['httpServer', server]);
        
        // Setting up the public directory
        app.use(express.static(options.dir 
            // TODO: habilitar CORS
            /*/
            , {setHeaders: function (res, path, stat) {
                res.set('Access-Control-Allow-Origin', '*');
            }}
            /**/
        ));
        /**/
        // Sessão
        const session = (await import('express-session')).default;
        const sessionParser = session({
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET || 'segredo',
            resave: false,
            //cookie: { secure: false }
        });
        app.use(sessionParser);
        /**/
        
        // Setting up POST parser
        // body-parser ou express-fileupload
        /*/
        let bodyParser = (await import('body-parser')).default;
        app.use(express.json());
        /*/
        app.use(express.urlencoded({ extended: true }));
        let upload = (await import('express-fileupload')).default;
        app.use(upload());
        /**/
        
        let IoServer = (await import('socket.io')).Server;
        let sio = new IoServer(server);
        agent.see('set', ['ioServer', sio]);
        sio.on('connection', (socket) => {
            agent.see('onSocketConnection', socket);
        });
        sio.use(function(socket, next) {
            sessionParser(socket.request, socket.request.res || {}, next);
        });

        // Rotas
        let router = await agent.see('getRouter');
        app.use('/', router);

        server.listen(options.port, options.hostname, () => {
        console.log(`Server running at http://${options.hostname}:${options.port}/`);
        });
        
        agent.see('notify', 'serverInitialized');
        
        callback();
    }
})();
