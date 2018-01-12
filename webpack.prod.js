const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            { loader: "postcss-loader", options: { plugins: [ require("autoprefixer"), require("cssnano") ] } },
            "sass-loader"
          ]
        })
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new ExtractTextPlugin("bundle.[contenthash].css")
  ]
});