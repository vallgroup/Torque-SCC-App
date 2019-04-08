const projectConfig = require("../../../config");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const srcDir = path.join(__dirname, "src");
const buildDir = path.join(projectConfig.root, "wp-content/themes/scc-child");

const config = {
  context: srcDir,

  entry: {
    main: ["@babel/polyfill/noConflict", "./index.js"]
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
    overlay: true,
    port: 8100
  },

  output: {
    path: path.join(buildDir, "./bundles/app"),
    publicPath: "/",
    filename: "[name].[hash].js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader?sourceMap",
          use: [
            'css-loader?modules&importLoaders=1&localIdentName="[local]__[hash:base64:5]"',
            "postcss-loader"
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader?sourceMap",
          // resolve-url-loader may be chained before sass-loader if necessary
          use: [
            'css-loader?modules&importLoaders=1&localIdentName="[local]__[hash:base64:5]"',
            "sass-loader?sourceMap",
            "postcss-loader"
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: "file-loader"
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "SCC",
      template: path.join(srcDir, "index.html")
    }),
    new ExtractTextPlugin({
      filename: "main.css",
      publicPath: "/",
      allChunks: true,
      ignoreOrder: true
    })
  ],

  devtool: "source-map"
};

module.exports = config;
