const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
	entry: {
		Cirsim: path.resolve(__dirname, 'index.js')
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: 'node_modules/cirsim/src/img/*.png',
				to: 'cirsim/img',
				flatten: true
			},
			{
				from: 'node_modules/cirsim/src/img/*.ico',
				to: 'cirsim/img',
				flatten: true
			},
			{
				from: 'node_modules/cirsim/src/help',
				to: 'cirsim/help',
				flatten: false
			}
		]),
		new FileManagerPlugin({
			onEnd: {
				copy: [
					{source: path.resolve(__dirname, '../../../cl/dist/cirsim.*'), destination: path.resolve(__dirname, 'dist') },
					{source: path.resolve(__dirname, '../../../cl/dist/cirsim/'), destination: path.resolve(__dirname, 'dist/cirsim') }
				]
			}
		})
	]
}
