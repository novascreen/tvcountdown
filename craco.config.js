const CracoWorkboxPlugin = require('craco-workbox');

module.exports = {
  babel: {
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
  },
  plugins: [
    {
      plugin: CracoWorkboxPlugin,
    },
  ],
};
