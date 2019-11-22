const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');


module.exports = {
  mode: "development",
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
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['build/*']
    }),
    new CopyWebpackPlugin([
      { from: "src/manifest.json" },
      { from: "src/img/", to: 'img/' },
      { from: "src/css/", to: 'css/' },
      { from: "src/html/", to: 'html/' },
    ]),
  ]
};