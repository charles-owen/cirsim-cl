const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
    Cirsim: {
      import: path.resolve(__dirname, 'index.js'),
      dependOn: ['Course', 'Users', 'Site']
    }
	},
	plugins: [
		new CopyWebpackPlugin(
			{
				patterns: [
					{
						from: path.resolve(
							path.dirname(require.resolve(`cirsim/package.json`)),
							'src', 'img', '*.png').replace(/\\/g, '/'),
						to: 'cirsim/img/[name][ext]'
					},
					{
						from: path.resolve(
							path.dirname(require.resolve(`cirsim/package.json`)),
							'src', 'img', '*.ico').replace(/\\/g, '/'),
						to: 'cirsim/img/[name][ext]'
					},
					{
						from: path.resolve(
							path.dirname(require.resolve(`cirsim/package.json`)),
							'src', 'help', '*').replace(/\\/g, '/'),
						to: 'cirsim/help/[name][ext]'
					},
					{
						from: path.resolve(
							path.dirname(require.resolve(`cirsim/package.json`)),
							'src', 'help', 'img', '*').replace(/\\/g, '/'),
						to: 'cirsim/help/img/[name][ext]'
					}
				]
			})
	]
}
