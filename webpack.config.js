const path = require("path")
// 导入html-webpack-plugin 之后，就得到一个构造函数
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlConfig = new HtmlWebpackPlugin({
    template:path.join(__dirname,'./src/index.html'),
    filename:'index.html'
})

module.exports = {
    // 指定入口和出口
    entry: path.join(__dirname,'./src/main.js'),
    output: {
        path: path.join(__dirname,'./dist'),
        filename: 'bundle.js'
    },
    plugins:[htmlConfig],//这个节点，是专门来放置webpack相关的插件的
    module: {//modules节点，可以配置好多第三方loader模块
        rules:[//rules第三方文件后缀名的匹配规则，通过后缀名匹配
            // 注意：如果有多个loader，则loader的调用顺序是从后往前，依次调用
            { test:/\.css$/,use:['style-loader','css-loader'] },
            { test:/\.less$/,use:['style-loader','css-loader','less-loader'] },//less-loader 依赖于 less
            { test:/\.scss$/,use:['style-loader','css-loader','sass-loader'] },//sass-loader 依赖于 node-sass
            { test:/\.jpg|png|gif|bmp$/,use:'url-loader?limit=1&name=[hash:8]-[name].[ext]' },//url-loader 依赖于 file-loader
            { test:/\.ttf|eot|svg|woff|woff2$/,use:'url-loader' },
            // 要把node_modules目录，添加到排除项这样就不会转换node_modules目录下的所有js文件了，只转换自己写的js文件
            { test:/.js$/,use:'babel-loader',exclude:/node_modules/ },//这个选项一定要添加
            { test:/.vue$/,use:'vue-loader' }
        ]
    }
}