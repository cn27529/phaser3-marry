//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log('__dirname=', path.resolve('__dirname', __dirname));
console.log('NODE_ENV=', process.env.NODE_ENV);
const devMode = process.env.NODE_ENV !== "production";
console.log('devMode=', devMode);

module.exports = {
  mode: process.env.NODE_ENV,
  //mode: process.env.NODE_ENV, //值為'production'則會自動壓縮檔案
  //context: path.resolve(__dirname, './src'), //設定起始資料夾
  entry: {
    index: './src2/index.js', //bundle的進入點
  },

  output: {
    path: path.resolve(__dirname, 'dist'), //打包後放置的資料夾
    //filename: '[name].[hash].js' //打包後的檔案名稱
    filename: '[name].bundle.js' //打包後的檔案名稱
  },
  module: {
    rules: [{
        test: /\.css$/i,
        //將css載入js裡，見index.js的import
        use: ['style-loader', 'css-loader'],
        //使用獨立的css檔案
        //use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'myapp', //page title
      //filename: 'index.html',
      //template: './index.html' //指定HTML模板的位置
    }),
    // //獨立產生css檔時使用
    // new MiniCssExtractPlugin({
    //   //filename: '[name].[hash].css',
    //   filename: '[name].bundle.css',
    // }),

  ],



};
