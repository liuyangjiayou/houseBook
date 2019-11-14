module.exports = {
    lintOnSave : false,
    productionSourceMap:false,
    publicPath: process.env.NODE_ENV === 'production' ? 'dist/' : '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://ts.local.esez.cn:8080',
                changeOrigin: true
            }
        }
    }
}