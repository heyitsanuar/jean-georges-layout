const path = require('path');

module.exports = {
	entry: {
		App: "./app/assets/js/App.js",
		Vendor: "./app/assets/js/Vendor.js",
		Slider: "./app/assets/js/Slider.js"
	},
	output: {
		path: path.resolve(__dirname, "./app/temp/js"),
		filename: "[name].js"
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query:{
				presets:['es2015']
			}
		}]
	}
}