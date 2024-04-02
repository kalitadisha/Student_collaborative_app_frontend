const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'jdbc:mysql://localhost:3306/project_final_year24',  
            changeOrigin: true,
        })
    );
};
