const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            //target: 'jdbc:mysql://localhost:3306/project final year',  
            taget: 'http://localhost:8082',
            changeOrigin: true,
        })
    );
};
