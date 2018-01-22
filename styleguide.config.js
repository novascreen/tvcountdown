var path = require('path');

module.exports = {
  title: 'TVEpisodes',
  components: 'src/components/**/*.{ts,tsx}',
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: require('react-scripts-ts/config/webpack.config.dev.js'),
  styleguideComponents: {
		Wrapper: path.join(__dirname, 'src/styleguide/Wrapper'),
	},
}