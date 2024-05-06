const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8000',
            pathRewrite: { '^/api': '' },
            changeOrigin: true,
        })
    );
    app.use(
        '/assets',
        createProxyMiddleware({
            target: 'http://localhost:8000/assets',
            pathRewrite: { '^/assets': '' },
            changeOrigin: true,
        })
    );
};
