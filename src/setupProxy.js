const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        proxy('//manage/?$/', {
            target: 'https://admin.poemhub.top/',
            changeOrigin: true
        })
    )
}
