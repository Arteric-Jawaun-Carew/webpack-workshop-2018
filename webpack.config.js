const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({mode}) => {
  return{
    mode,
    output: {
      filename: "bundle.js"
    },
    plugins: [new htmlWebpackPlugin(), new webpack.ProgressPlugin()]
  }
};
