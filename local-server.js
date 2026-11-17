const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const envFile = path.join(root, 'backend', '.env');
if (fs.existsSync(envFile)) {
    for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
        const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
        if (!match || match[1] in process.env) continue;
        let value = match[2];
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        process.env[match[1]] = value;
    }
}

const contactHandler = require('./api/contact');
const mimeTypes = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp'
};

const server = http.createServer(async (req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if (pathname === '/api/contact') {
        let rawBody = '';
        try {
            for await (const chunk of req) {
                rawBody += chunk;
                if (rawBody.length > 20_000) {
                    res.writeHead(413, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Request is too large' }));
                }
            }
            req.body = rawBody ? JSON.parse(rawBody) : {};
        } catch {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Invalid request body' }));
        }

        res.status = (statusCode) => {
            res.statusCode = statusCode;
            return res;
        };
        res.json = (body) => {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify(body));
        };
        return contactHandler(req, res);
    }

    const cleanRoutes = {
        '/privacy-policy': '/privacy-policy.html',
        '/terms': '/terms.html'
    };
    const requestedPath = pathname === '/'
        ? '/index.html'
        : cleanRoutes[pathname] || decodeURIComponent(pathname);
    const filePath = path.resolve(root, `.${requestedPath}`);
    if (!filePath.startsWith(`${root}${path.sep}`) && filePath !== path.join(root, 'index.html')) {
        res.writeHead(403);
        return res.end('Forbidden');
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('Not found');
        }
        res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
        res.end(content);
    });
});

const port = Number(process.env.PORT) || 8000;
server.listen(port, () => console.log(`RestroMind local server running at http://localhost:${port}`));
