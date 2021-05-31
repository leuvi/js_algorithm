const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const package = require('../package.json')
const isProd = process.env.NODE_ENV == 'production'

module.exports = {
  entry: {
    index: ["@babel/polyfill", "./src"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
      favicon: "public/favicon.ico",
      inject: true,
      chunks: ["index"],
      banner: `version: ${package.version}, update：${new Date().toLocaleString()}`,
      minify: isProd ? {
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      } : {}
    })
  ],
  resolve: {
    alias: {
      "@less": path.resolve(__dirname, "../assets/css"),
      "@images": path.resolve(__dirname, "../assets/images"),
      "@utils": path.resolve(__dirname, "../assets/utils"),
    },
  }
}