var path = require('path');

module.exports = {
  title: 'TVEpisodes',
  skipComponentsWithoutExample: true,
  components: 'src/components/**/*.{ts,tsx}',
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: require('react-scripts-ts/config/webpack.config.dev.js'),
  styleguideComponents: {
		Wrapper: path.join(__dirname, 'src/styleguide/Wrapper'),
	},
  sections: [{
    name: 'UI Components',
    components: 'src/components/UI/**/*.{ts,tsx}'
  }]
}