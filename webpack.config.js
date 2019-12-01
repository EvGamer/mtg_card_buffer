const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');


module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    popup: path.join(__dirname, "src", "popup", "index.js"),
    background: path.join(__dirname, "src", "background", "index.js"),
    insertListAtCursor: path.join(__dirname, "src", "activeTab", "insertListAtCursor.js")
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
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['build/*']
    }),
    new CopyWebpackPlugin([
      { from: "src/manifest.json", to: "manifest.json" },
      { from: "src/icons/", to: 'icons/' },
      { from: "src/css/", to: 'css/' },
      { from: "src/html/", to: 'html/' },
    ]),
  ]
};