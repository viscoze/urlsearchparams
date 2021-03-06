module.exports = {
  presets: ['@babel/preset-typescript', ['@babel/env', { targets: '> 0.25%, not dead' }]],
  plugins: ['@babel/plugin-proposal-class-properties', 'lodash'],
}
