new (function Listen() {
    this.act = async function(options, callback) {
        let agent = this.agent;
        let express = (await import('express')).default;
        const app = express();
        agent.see('set', ['expressApp', app]);

        let defaults = {
            hostname: process.env.HOSTNAME || '127.0.0.1',
            port: process.env.PORT || 443,
            http_port: process.env.HTTP_PORT || 80,
            dir: process.env.PUBLIC_DIR || 'public',
            certsFolder: process.env.CERT_FOLDER || '/var/lib/leajs/certs/',
            certFilename: process.env.CERT_FILENAME || 'server.cert',
            keyFilename: process.env.KEY_FILENAME || 'server.key',
            requestCert: true,
            rejectUnauthorized: false
        };
        options = {...defaults, ...options};

        // Escolhe HTTPS ou HTTP
        let fs = await import('fs');
        let server;
        let error;
        try {
            let http = await import('https');
            server = http.createServer({
                key: fs.readFileSync(options.certsFolder + options.keyFilename),
                cert: fs.readFileSync(options.certsFolder + options.certFilename),
                ca: [fs.readFileSync(options.certsFolder + options.certFilename)],
                requestCert: options.requestCert,
                rejectUnauthorized: options.rejectUnauthorized
            }, app);
        } catch (e) {
            error = e;
        }
        
        let http = await import('http');
        let nonSecureServer;
        let protocol = 'https';
        if (!server) {
            protocol = 'http';
            options.port = options.http_port;
            console.log(`Error while creating secure server: ${error.message}`);
            console.log('Creating non-secure server');
            nonSecureServer = http.createServer(app);
            server = nonSecureServer;
        }
        else {
            console.log('Secure server created successfully!');
            console.log('Redirecting HTTP requests to HTTPS');
            nonSecureServer = http.createServer(function (req, res) {
                res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
                res.end();
            }).listen(options.http_port, () => {
                console.log(`Non-secure Server running at http://${options.hostname}:${options.http_port}/`);
            });
        }

        agent.see('set', ['httpServer', server]);
        
        // Setting up the public directory
        app.use(express.static(options.dir));
        /**/
        // TODO: habilitar CORS
        app.use(function setHeaders(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
        });
        /**/
        
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
        await agent.see('subdomain');
        let router = await agent.see('getRouter');
        app.use('/', router);

        server.listen(options.port, options.hostname, () => {
            console.log(`Server running at ${protocol}://${options.hostname}:${options.port}/`);
        });
        
        agent.see('notify', 'serverInitialized');
        
        callback();
    }
})();
