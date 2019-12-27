module.exports = {
    lintOnSave : false,
    productionSourceMap:false,
    publicPath: process.env.NODE_ENV === 'production' ? 'dist/' : '/',
    outputDir : "./../dist",
    devServer: {
        host : "tss.erp.com",
        proxy: {
            '/api': {
                target: 'http://ts.erp.com/',
                changeOrigin: true
            }
        }
    }
}