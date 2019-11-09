module.exports = {
    lintOnSave : false,
    productionSourceMap:false,
    publicPath: process.env.NODE_ENV === 'production' ? 'dist/' : '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://newhr.t.ok.wang',
                changeOrigin: true
            }
        }
    }
}