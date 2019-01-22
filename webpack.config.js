var webpack = require('webpack'),
    path = require('path'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var config = {
    entry: { // 打包入口
        index: path.resolve(__dirname, "client/src/index.js"),
        vendor: [  // 将react和react-dom这些单独打包出来，减小打包文件体积
            "react",
            "react-dom",
        ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "initial",
            test: "vendor",
            name: "vendor",
            enforce: true
          }
        }
      },
      minimizer: [ // 压缩打包后的代码
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: false,
            ecma: 6,
            mangle: true
          },
          sourceMap: true
        })
      ]
    },
    output: { // 打包目标路径
        path: path.resolve(__dirname, "client/dist"),
        filename: "js/[name].bundle.js"
    },
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js','.jsx'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
          'components': path.resolve(__dirname,'src/components')
        }
    },
    module: {
      rules: [{
          test: /\.js|.jsx$/,
          exclude: /node_modules/,
          loader: "babel-loader",
      }, {
          test: /\.(less|css)$/,  // 打包less和css文件
          use: [
            "style-loader",
            "css-loader",
            "less-loader",
          ]
      }, {
          test: /\.(png|jpg|jpng|eot|ttf)$/, // 打包图片和字体文件
          loader: 'url-loader?limit=8192&name=images/[name].[ext]'
      }]
    },
    plugins: [
      new webpack.DefinePlugin({
          "process.env": { 
              NODE_ENV: JSON.stringify("production") 
          }
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, "client/dist"),
      port: 8000,
      host: 'localhost',
      historyApiFallback: true,
      open: true,
      hot: true,
      proxy: {
        '/api/*': {
          target: 'http://10.10.12.199:3000',
          secure: false,
        }
      },
    },
}

module.exports = config;