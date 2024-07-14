const { override, adjustStyleLoaders } = require('customize-cra');

module.exports = function override(config, env) {
	// webpack resolve for path browserify
	//config.resolve.fallback = { path: require.resolve('path-browserify') };
	
	// If it's production build, modify the file naming to exclude hashes
	if (env === 'production') {
		config.output.filename = 'static/js/[name].js';
		config.output.chunkFilename = 'static/js/[name].chunk.js';

		// Optionally, adjust CSS filenames (if using MiniCssExtractPlugin)
		config.plugins = config.plugins.map(plugin => {
			if (plugin.constructor.name === 'MiniCssExtractPlugin') {
				return new plugin.constructor({
					filename: 'static/css/[name].css',
					chunkFilename: 'static/css/[name].chunk.css',
				});
			}
			return plugin;
		});
	}

	return config;
};

