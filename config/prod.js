const path = require("path")
const webpack = require('webpack')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const es3ifyPlugin = require("es3ify-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const merge = require('webpack-merge')
const base = require("./base")
const package = require('../package.json')

let staticPath = "static/"

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: staticPath + 'js/[name].[chunkhash:8].js',
    chunkFilename: staticPath + 'js/[name].[chunkhash:8].js',
    path: path.resolve('dist'),
    publicPath: '/',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: true,
        },
      }),
    ],
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        loader: "url-loader",
        options: {
          esModule: false,
          limit: 10000,
          name: '[hash:16].[ext]',
          outputPath: staticPath + 'images'
        }
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[hash:16].[ext]',
              outputPath: staticPath + 'images'
            },
          },
        ]
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false,
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  overrideBrowserslist: [
                    ">1%",
                    "not dead",
                    "not op_mini all",
                    "last 2 versions",
                    "Android >= 5.0",
                    "IOS >= 8.0",
                  ]
                }),
                require("postcss-pxtorem")({
                  rootValue: 20,
                  propList: ["*"],
                  selectorBlackList: ["html"],
                  exclude: 'index.less' //需要排除转rem的文件，如果有多个文件用正则或函数
                }),
              ],
            }
          },
          "less-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new es3ifyPlugin(),
    new MiniCssExtractPlugin({
      filename: staticPath + "css/[name].[chunkhash:8].css",
      allChunks: true,
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
    new webpack.BannerPlugin({
      banner: `version: ${package.version}, update：${new Date().toLocaleString()}`
    })
  ],
})

