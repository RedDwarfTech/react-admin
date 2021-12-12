const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        createProxyMiddleware('//manage/?$/', {
            target: 'https://admin.poemhub.top/',
            changeOrigin: true
        })
    )
}
