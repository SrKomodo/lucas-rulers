const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./src",
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader",   options: { sourceMap: true } },
          { loader: "css-loader",     options: { sourceMap: true } },
          { loader: "postcss-loader", options: { sourceMap: true, plugins: [require("autoprefixer")] } },
          { loader: "sass-loader",    options: { sourceMap: true } }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});