const path = require('path');

module.exports = [
  {
    mode: 'none',
    name: 'default',
    entry: './dist/index.mjs',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs'
    }
  }, {
    mode: 'production',
    name: 'minimize',
    entry: './dist/index.mjs',
    output: {
      filename: 'index.min.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs'
    }
  }
];