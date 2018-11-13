const handler = require('serve-handler');
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    res.writeHead(302, {
      Location: ['https://', req.headers.host, req.url].join(''),
    });
    return res.end();
  }
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  return handler(req, res, {
    public: 'build',
    rewrites: [{ source: '**', destination: '/index.html' }],
    directoryListing: false,
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Running at http://localhost:3000');
});
