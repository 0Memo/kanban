const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv({
      path: './.env',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
};
