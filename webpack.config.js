const htmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new htmlWebPackPlugin({
	template: './src/index.html',
	filename: './index.html'
});

const path = require('path');

const cssLoader = {
    loader: "css-loader",
    options: {
      modules: true,
      importLoaders: 1,
      localIdentName: "[name]_[local]_[hash:base64]",
      sourceMap: true,
      minimize: true
     }
};
const styleLoader = {
	loader: "style-loader"
};

module.exports = {
	entry: { main: './src/index.js' },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundled.js'
	},
	module: {
		rules:[
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}, {
				test: /\.css$/,
				use: [ styleLoader, cssLoader ]
			}
		]
	},
	plugins: [htmlPlugin]
};