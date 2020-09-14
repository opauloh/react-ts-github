const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // "production" | "development" | "none"
  entry: './src/index.tsx', // string | object | array
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, 'dist'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: 'index_bundle.js', // string
    // the filename template for entry chunks
    publicPath: '/' // string
    // the url to the output directory resolved relative to the HTML page
    // library: "MyLibrary", // string,
    // the name of the exported library
    // libraryTarget: "umd", // universal module definition
    // the type of the exported library
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules', path.join(__dirname, 'src')]
  },
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.module\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { modules: true }
          }
        ]
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
    /* Advanced module configuration (click to show) */
  },
  devServer: {
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    port: 3000,
    onListening: function (server) {
      const port = server.listeningApp.address().port;
      console.log('Listening on port:', port);
    }, //Provides an option to execute a custom function when webpack-dev-server starts listening for connections on a port.
    open: true // Tells dev-server to open the browser after server had been started. Set it to true to open your default browser.
  }, // list of additional plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
