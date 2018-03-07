const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

module.exports = merge(require("./webpack.base"), {
  entry: "./src/distMenu.vue",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "vue-distmenu.min.js",
    library: "vue-distmenu",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.js$/,
      minimize: true
    })
  ]
});
