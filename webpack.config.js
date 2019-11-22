const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');


module.exports = {
  mode: process.env.NODE_ENV || "development",
  devtool: "inline-source-map",
  entry: {
    main: path.join(__dirname, "src", "popup.js"),
    background: path.join(__dirname, "src", "background.js"),
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(["build"]),
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new CopyWebpackPlugin([{
      from: "src/manifest.json",
      transform: function (content, path) {
        // generates the manifest file using the package.json information

        const manifest = JSON.parse(content.toString());

        return Buffer.from(JSON.stringify({
          ...manifest,
          version: process.env.npm_package_version,
        }))
      }
    }, {
      from: "src/img/",
      to: 'img/'
    }, {
      from: "src/css/",
      to: 'css/'
    }]),
  ]
};