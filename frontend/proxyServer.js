const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const backendUrl = `http://localhost:8006`;

// Proxy middleware for API requests
const apiProxy = createProxyMiddleware({
  target: backendUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // rewrite path
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    res.end('Something went wrong with the proxy.');
  },
});

// Proxy middleware for WebSocket requests
const wsProxy = createProxyMiddleware({
  target: backendUrl,
  changeOrigin: true,
  ws: true, // enable websocket proxying
  pathRewrite: {
    '^/ws': '', // remove /ws from the path
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[WebSocket Proxy] Original request URL: ${req.originalUrl}`);
    console.log(`[WebSocket Proxy] Forwarding request: ${req.method} ${req.url} -> ${backendUrl}${proxyReq.path}`);
  },
  onError: (err, req, res) => {
    console.error('WebSocket Proxy Error:', err);
    res.writeHead(500, {
      'Content-Type': 'text/plain',
    });
    res.end('Something went wrong with the WebSocket proxy.');
  },
});

app.use('/api', apiProxy);
app.use('/ws', wsProxy);

const port = 8007;
app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});