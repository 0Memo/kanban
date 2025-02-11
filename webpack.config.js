const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv({
      path: './.env',
    }),
  ],
  module: {
    rules: [
      // Add file loader rules if you need to handle image or font files
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/,
        use: [
          {
            loader: 'url-loader', // Use url-loader to inline images if below a certain size
            options: {
              limit: 8192, // Inline images smaller than 8KB, for larger ones use file-loader
              name: 'assets/[name].[hash:8].[ext]', // Specify the naming format for assets
            },
          },
        ],
      },
    ],
  },
};
