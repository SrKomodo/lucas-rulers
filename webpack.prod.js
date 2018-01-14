const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const path = require("path");

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
    new ExtractTextPlugin("bundle.[contenthash].css"),
    new WebpackPwaManifest({
      name: "Genaille-Lucas rulers",
      short_name: "Lucas Rulers",
      description: "An HTML5 visualization of Genaille-Lucas rulers",
      background_color: "#483220",
      theme_color: "#A07942",
      "theme-color": "#A07942",
      start_url: "./",
      display: "standalone",
      icons: [{
        src: path.resolve("src/assets/icon.png"),
        sizes: [96, 128, 192, 256, 484, 512]
      }]
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: "lucas-rulers",
      filename: "service-worker.js",
      minify: true,
      dontCacheBustUrlsMatching: /\.\w{8,}\./,
      navigateFallback: "https://srkomodo.github.io/lucas-rulers/index.html"
    })
  ]
});