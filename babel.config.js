module.exports = {
  plugins: [
    '@babel/plugin-transform-typescript',
    '@babel/plugin-proposal-class-properties',
    'lodash',
  ],
  presets: [['@babel/env', { targets: { node: 6 } }]],
}
