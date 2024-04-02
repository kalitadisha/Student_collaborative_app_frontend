const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'jdbc:mysql://localhost:3306/project final year',  
            changeOrigin: true,
        })
    );
};
