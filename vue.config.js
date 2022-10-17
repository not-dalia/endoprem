const path = require("path");
const webpack = require('webpack')

module.exports = {
  outputDir: path.resolve(__dirname + "/docs"),
  configureWebpack: {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          stylus: {
            import: [path.resolve(__dirname, './src/theme/variables.styl')]
          }
        }
      })
    ]
  }
};